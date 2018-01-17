


delimiter $$

BEGIN
  declare contador int default 0;
  select count(*) into contador from customers;
  select contador;
END$$

delimiter;
