use classicmodels;


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
