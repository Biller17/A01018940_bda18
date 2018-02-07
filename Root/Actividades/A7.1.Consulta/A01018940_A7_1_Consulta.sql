


-- consulta que muestra todas las product lines  que ha comprado el cliente

SELECT  textdescription
   FROM customers c
   INNER JOIN orders o
   on c.customerNumber = o.customerNumber
   INNER JOIN orderdetails d
   ON o.orderNumber = d.orderNumber
   INNER JOIN products p
   ON d.productcode = p.productcode
   INNER JOIN productlines l
   ON p.productcode = l.productline
   where c.customerNumber = 112;
