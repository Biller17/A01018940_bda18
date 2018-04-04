
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
    function(value){
      return value;
    },
    {out:"min"}
)





// 5. ¿para cada materia el maximo de tareas entregadas?

db.grades.mapReduce(
    function() {
      homework = 0
      this.scores.forEach((value)=>{
        if(value.type ==  "homework"){
          homework += 1
        }
      });
      emit(this.class_id, homework);
    },
    function(class_id, hm) {
      return{
        class: class_id,
        homework: hm
      }
    },
    {out:"hm"}
)




// 6. ¿Qué alumno se inscribió en más cursos?






// ¿Cuál fue el curso que tuvo más reprobados?
