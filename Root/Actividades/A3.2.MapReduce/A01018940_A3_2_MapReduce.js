
//1.	Cuántos restaurantes hay por ZipCode
db.restaurants.group({key:
  {'address.zipcode':1}, reduce: function( curr, result )
  { result.total += 1;}, initial: { total : 0 }})



//snippet de resultados obtenidos
{
		"address.zipcode" : "11225",
		"total" : 112
	},
	{
		"address.zipcode" : "11224",
		"total" : 72
	},
	{
		"address.zipcode" : "10019",
		"total" : 675
	},
	{
		"address.zipcode" : "11374",
		"total" : 88
	},
	{
		"address.zipcode" : "10314",
		"total" : 189
	},
	{
		"address.zipcode" : "11369",
		"total" : 99
	},
	{
		"address.zipcode" : "11234",
		"total" : 157
	},
	{
		"address.zipcode" : "10462",
		"total" : 150
	},


//2.	¿Cuántos grades hay por usuario?

db.restaurants.aggregate({$project:
  {name:"$name",count:
  {$size:"$grades"}}});




//snippet de resultados obtenidos

{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbbd"), "name" : "White Castle", "count" : 4 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbbe"), "name" : "Ho Mei Restaurant", "count" : 8 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbbf"), "name" : "The Country Cafe", "count" : 4 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbc0"), "name" : "Glorious Food", "count" : 5 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbc1"), "name" : "Shashemene Int'L Restaura", "count" : 4 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbc2"), "name" : "Carvel Ice Cream", "count" : 5 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbc3"), "name" : "Downtown Deli", "count" : 6 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbc4"), "name" : "Mejlander & Mulgannon", "count" : 4 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbc5"), "name" : "Happy Garden", "count" : 3 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbc6"), "name" : "Cafe Metro", "count" : 5 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbc7"), "name" : "Dunkin' Donuts", "count" : 4 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbc8"), "name" : "Olive'S", "count" : 5 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbc9"), "name" : "Tony'S Deli", "count" : 6 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbca"), "name" : "Lexler Deli", "count" : 5 }
{ "_id" : ObjectId("5ab2c7875f2005ca7e9cdbcb"), "name" : "Snack Time Grill", "count" : 6 }




//3.	Cuál es el total de scores por usuario

db.restaurants.aggregate(
  [{$unwind: "$grades"},
  {"$group":
  {"_id": "$name","total":
  {"$sum": "$grades.score"}}},
  {$project: {total:1}}]);

//4.	Cuántos restaurantes obtuvieron el grade A, Grade B y Grade C
db.restaurants.mapReduce(
    function() {
        var gradeA = 0;
        var gradeB = 0;
        var gradeC = 0;
        this.grades.forEach((value)=>{
        if(value.grade === "A"){
          gradeA += 1;
        }else if(value.grade === "B"){
          gradeB += 1;
        }else if(value.grade === "C"){
          gradeC += 1;
        }
      });
      emit("A", gradeA);
      emit("B", gradeB);
      emit("C", gradeC);
    },
    function(name, count) {
      return Array.sum(count);
    },
    {out:"res"}
)

//5.	Agrupa los restaurantes por “cuisine” y cuenta cuántos restaurantes hay por cada categoría
db.restaurants.mapReduce(
    function(){
        emit(this.cuisine, 1)
    },
    function(name, count){
        return Array.sum(count);
    },
    {out:"res"}
);
