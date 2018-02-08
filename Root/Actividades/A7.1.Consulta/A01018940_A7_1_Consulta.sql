

-- consulta que muestra todas las product lines  que ha comprado el cliente
explain
select l.textdescription
  from products
  inner join productlines l
  on products.productline = l.productline
  inner join orderdetails d
  on products.productcode = d.productcode
  inner join orders o
  on d.ordernumber = o.ordernumber
  where o.customernumber = 112
