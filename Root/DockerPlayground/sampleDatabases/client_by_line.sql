

use classicmodels;

DROP PROCEDURE IF EXISTS client_by_line;

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
