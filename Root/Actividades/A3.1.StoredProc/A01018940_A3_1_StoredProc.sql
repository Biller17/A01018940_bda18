use classicmodels;




DROP PROCEDURE IF EXISTS product_by_line;
DROP PROCEDURE IF EXISTS client_by_line;
DROP PROCEDURE IF EXISTS show_clients;


delimiter $$
CREATE PROCEDURE product_by_line
(
	IN linea varchar(50)
)
BEGIN
	SELECT *
    FROM products
    WHERE productLine like concat(linea, "%");
END$$







delimiter $$
CREATE PROCEDURE client_by_line
(
	IN linea varchar(50)
)
BEGIN
	SELECT *
    FROM customers
    WHERE customerName like concat(linea, "%");
END$$






delimiter $$
create procedure show_clients(
  IN inicial varchar(50))

BEGIN
 declare line varchar(50);
 set line = concat(inicial, "%");
 select* from customers
 where customerName like line;
END$$

delimiter ;



DROP PROCEDURE IF EXISTS max_min;

delimiter $$
create procedure max_min()

BEGIN
	declare min int;
	declare max int;
 select	MIN(buyPrice)into min from products;
 select MAX(buyPrice)into max from products;
 select min, max;
END$$

delimiter ;
