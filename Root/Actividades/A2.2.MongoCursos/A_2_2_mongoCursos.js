

db.dropDatabase()
use UABA
db.createCollection("cursos")

 db.cursos.insert({titulo:"Meta-programacion", profesor: "Ariel", año:2018})


 db.cursos.update({"titulo":"Meta-programacion"}, {"$set":{"evaluaciones-escritas":{"preguntas-teoricas":10, "preguntas-practicas":10}}})

db.cursos.update({"titulo":"Meta-programacion"}, {"$set":{"alumnos":[{"matricula":"A01018940", "nombre":"AdrianBiller", "direccion":"cale falsa 123", "genero":"masculino"}]}})

db.cursos.update({"titulo":"Meta-programacion"}, {"$push":{"alumnos":{"matricula":"A01023488", "nombre":"Edgaruru", "direccion":"cale falsa 444", "genero":"masculino"}}})



db.cursos.update({titulo:"Meta-programacion", "alumnos.matricula":"A01018940"}, {$set:{"alumnos.$.cursos-inscritos":[{"titulo":"Metodos","año-inscripcion":"2018","calificaciones":{"primer-parcial":100, "segundo-parcial":100, "tercer-parcial":100, "cuarto-pacial":100}, "calificacion-final":100}]}})


db.cursos.update({"titulo":"Meta-programacion"}, {"$set":{"profesores":[{"nombre":"Don Falso", "nomina":"milchocomil", "direccion":"cale falsa 674", "genero":"masculino"}]}})

db.cursos.update({"titulo":"Meta-programacion"}, {"$push":{"profesores":{"nombre":"Doña Falsa", "nomina":"80000", "direccion":"cale falsa 786", "genero":"femenino"}}})

db.cursos.update({titulo:"Meta-programacion", "profesores.nombre":"Don Falso"}, {$set:{"profesores.$.cursos-impartidos":[{"titulo":"Metodos","año-impartido":"2018"}, {"titulo":"Graficas computacionales","año-impartido":"2018"}]}})



//para buscar algun alumno en especifico por matricula
db.cursos.find({"alumnos.matricula": "A01018940"}, {_id: 0, alumnos: {$elemMatch: {matricula: "A01018940"}}}).pretty()
