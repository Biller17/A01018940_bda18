//1. Cuantos actores


// 2: R=8


// 3: R=28


// 4: R=32
match (m:Movie) return m, count(m)

// 5: R=Lilly Wachowski y Lana Wachowski con 2
match (p:Person)-[r:WROTE]->() return p,count(r) order by count(r) desc

// 6
MATCH p=()-[r:REVIEWED]->(m:Movie) RETURN m, avg(r.rating) AS rating order by rating desc limit 5

// 7
match t=(p:Person)-[r1:ACTED_IN]->(:Movie)<-[r2:PRODUCED]-(p) return p



// 1. ¿Cuántos actores hay?
match (v:Person)-[a:ACTED_IN]->() return v

// 2. ¿cuántos productores hay?
match (v:Person)-[p:PRODUCED]->() return v

// 3. ¿cuántos directores hay?
match (v:Person)-[d:DIRECTED]->() return v

// 4. ¿cuántas películas hay?
match (v:Movie) return v, count(v)

// 5. ¿Quién ha escrito más películas?
// 6. El top 5 de películas con el mejor Rating
// 7. ¿Qué personas debería conocer Al Pacino para que le presentaran a
// Audrey Tautou?
// 8. ¿Qué actores que han producido y actuado en la misma película?
