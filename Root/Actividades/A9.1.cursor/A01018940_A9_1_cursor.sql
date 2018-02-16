--Adrian Biller A01018940
delimiter //
DROP FUNCTION IF EXISTS getCategory;
CREATE FUNCTION getCategory
(
	filmid int
)RETURNS varchar(20)
BEGIN
  DECLARE cat VARCHAR(20);
  SET cat = (
    SELECT c.name
    FROM category c
    INNER JOIN film_category l
    ON c.category_id = l.category_id
    WHERE l.film_id = filmid
  );
  RETURN cat;
END//


select * from category;

delimiter //
DROP PROCEDURE IF EXISTS film_cursor;

create procedure film_cursor()

BEGIN
  declare ids int;
  declare done int default false;
  declare cursor1 cursor for select film_id from film;
  declare continue handler for not found set done = true;

  open cursor1;
  read_loop: loop
    fetch cursor1 into ids;
    IF done THEN
          LEAVE read_loop;
    END IF;
      UPDATE film SET title = CONCAT(getCategory(ids), '_', title)
    WHERE film_id = ids;
  end loop;
    select ids;
  close cursor1;
END //

CALL film_cursor();
