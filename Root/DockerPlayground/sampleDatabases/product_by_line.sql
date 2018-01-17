

use classicmodels;

DROP PROCEDURE IF EXISTS product_by_line;

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
