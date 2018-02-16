


-- explain
-- format = json
-- select count(*) from orderdetails
-- where orderLineNumber = 1 and quantity
--



create index idxuno on orderdetails(orderLineNumber);

create index idxdos on orderdetails(quantityOrdered, orderLineNumber);

create index idxtres on orderdetails(orderLineNumber, quantityOrdered);



create index idxcuatro on orderdetails(orderLineNumber, quantityOrdered) using hash;


explain
format = json
select * from orderdetails force index(idxcuatro)
where orderLineNumber = 1 and quantityOrdered > 50;


explain
format = json
select productCode from orderdetails force index(idxtres)
where orderLineNumber = 1 and quantityOrdered > 50;


explain
format = json
select orderLineNumber, count(*) from orderdetails force index(idxcuatro)
where orderLineNumber = 1 and quantityOrdered > 50;
