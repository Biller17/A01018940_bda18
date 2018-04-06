
// Evaluacion Adrian Biller A01018940
//mongoimport --db evaluacion_dos --collection grades --drop --file database.json



// 1. ¿Cuál es el total de alumnos inscritos?
db.grades.aggregate(
  [
    {
      $count: "Numero de alumnos"
    }
  ]
)



// 2.¿Cuántos cursos se han impartido?

db.grades.group({key:
  {'class_id':1}, reduce: function( curr, result )
  { result.total += 1;}, initial: { total : 0 }}).length



// 3.Encuentra, para cada alumno, su promedio obtenido en cada una de las clases en las que fue inscrito (promedia exámenes, quizes, tareas y todas las actividades realizadas que contenga un grade)
//
// db.promedios.drop()
// db.grades.mapReduce(
//     function() {
//       emit(this.student_id, {scores:[this.scores]});
//     },
//     function(studentId, scores) {
//       var promedio = 0
//       var calificaciones = 0
//       scores.forEach(function(value){
//         promedio += value.score;
//         calificaciones += 1;
//       });
//
//       promedio = promedio/calificaciones;
//       return {
//         student: studentId,
//         mean: promedio
//       };
//     },
//     {out:"promedios"}
// )

db.grades.aggregate( [
  { $unwind : "$scores" } ,
  { $group:
         {
           _id: {student:"$student_id",class: "$class_id"},
           avg: { $avg: "$scores.score" }
         }
  },
  {$sort:{"avg":1}}

])


// 4. ¿Cuál fue la materia que tiene la calificación más baja (muestra el id de la materia, el id del alumno y la calificación)?

db.grades.mapReduce(
    function() {
      minStudent = 0
      minScore = 100
      minClass = 0
      this.scores.forEach((value)=>{
        if(value.score < minScore){
          minScore = value.score;
          minClass = this.class_id;
          minStudent = this.student_id;
        }
      });
      emit(minStudent, {score: minScore, class: minClass});
    },
    function(studentId, scores) {
      return{
        student: studentId,
        class: scores.minClass,
        minScore: scores.minScore
      }
    },
    {out:"min"}
)

db.min.aggregate( [
  { $group:
         {
           _id: {value:"$value.score",class: "$value.class"},
         }
  },
  {
      "$match": {
          "_id.class": { "$exists": true, "$ne": null }
      }
  },
  {$sort:{"_id.value":1}},
  {$limit:1}

])


// 5. ¿para cada materia el maximo de tareas entregadas?

// db.grades.mapReduce(
//     function() {
//       homework = 0
//       this.scores.forEach((value)=>{
//         if(value.type ==  "homework"){
//           homework += 1
//         }
//       });
//       emit(this.class_id, homework);
//     },
//     function(class_id, hm) {
//       return{
//         class: class_id,
//         homework: hm
//       }
//     },
//     {out:"hm"}
// )

db.grades.mapReduce(
  function(){
    homework = 0
    this.scores.forEach((value)=>{
      if(value.type ==  "homework"){
        homework += 1
      }
    });
    emit(this.class_id, homework);
  },
  function(key, values){
    return Array.sum(values);
  },
  {
    out:"hm"
  }
)


// 6. ¿Qué alumno se inscribió en más cursos?


db.grades.aggregate([
   {$group: {
       _id: {student: "$student_id"},
       count: {$sum: 1}
       }
   },
   {$match: {
       count: {"$gt": 1}
       }
   },
   {$sort: {
       count: -1
       }
   },
   {$limit:1}
]).pretty();

// ¿Cuál fue el curso que tuvo más reprobados?
//
//
// db.grades.aggregate( [
//   { $unwind : "$scores" } ,
//   { $group:
//          {
//            _id: {class: "$class_id"},
//            avg: { $avg: "$scores.score" }
//          }
//   },
//   {$sort:{"avg":1}},
//   {$limit:1}
// ])


db.grades.aggregate( [
  { $unwind : "$scores" } ,
  { $group:
         {
           _id: {student:"$student_id",class: "$class_id"},
           avg: { $avg: "$scores.score" }
         }
  },
  {
    $match:{
      avg:{$lt: 70}
    }
  },
  {
    $group:{
      _id:{class:"$_id.class"},
      count:{$sum:1}
    }
  },
  {$sort:{"count":-1}},
  {$limit:1}

])
