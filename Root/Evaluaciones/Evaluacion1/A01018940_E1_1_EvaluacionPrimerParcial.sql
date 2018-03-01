



CREATE TABLE LOG_FILM(
  Id INT NOT NULL AUTO_INCREMENT,
  Tipo VARCHAR(10) DEFAULT 'update',
  Film_id smallint(5) UNSIGNED,
  Last_value VARCHAR(255),
  New_value VARCHAR(255),
  Timestamp DATETIME,
  PRIMARY KEY (Id)
);


-- procedure que actualiza la tabla de log film


DROP PROCEDURE update_log;
DELIMITER //
CREATE PROCEDURE update_log
(IN
  filmid SMALLINT(5),
  newValue INT
)

BEGIN
  INSERT INTO LOG_FILM(Film_id, New_value, Timestamp)
    VALUES(filmid, newValue);
END //





--trigger que llama el procedure


CREATE TRIGGER updateLogTrigger
    AFTER UPDATE ON film
    FOR EACH ROW
    CALL update_log(NEW.film_id, NEW.language_id);





-- cursor que actualiza el lenguaje de las peliculas


delimiter //
DROP PROCEDURE IF EXISTS get_original_language;

create procedure get_original_language()

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
    IF(SELECT * FROM category WHERE category_id = (
                                  SELECT category_id
                                  from film_category
                                  WHERE film_id = ids
      )) = 'Documentary' THEN
      UPDATE film SET original_language_id = 2 WHERE film_id = ids;

    ELSEIF (SELECT * FROM category WHERE category_id = (
                                  SELECT category_id
                                  from film_category
                                  WHERE film_id = ids
      )) = 'Foreign' THEN
      UPDATE film SET original_language_id = 3 WHERE film_id = ids;
    ELSEIF (SELECT * FROM actor WHERE actor_id = (
                                SELECT actor_id
                                from film_actor
                                WHERE film_id = ids
    )) = 'SISSI SOBIESKI' THEN
    UPDATE film SET original_language_id = 6 WHERE film_id = ids;
    ELSEIF (SELECT * FROM actor WHERE actor_id = (
                                SELECT actor_id
                                from film_actor
                                WHERE film_id = ids
    )) = 'ED CHASE' THEN
    UPDATE film SET original_language_id = 4 WHERE film_id = ids;
    ELSEIF (SELECT * FROM actor WHERE actor_id = (
                                SELECT actor_id
                                from film_actor
                                WHERE film_id = ids
    )) = 'AUDREY OLIVIER' THEN
    UPDATE film SET original_language_id = 5 WHERE film_id = ids;
    ELSE
      UPDATE film SET original_language_id = 1 WHERE film_id = ids;
    END IF;
  end loop;
    select ids;
  close cursor1;
END //


CALL get_original_language();










-- ejercicio de las gomitas




CREATE TABLE gomitas (
  gomita_id INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 0, INCREMENT BY 1),
  nombre VARCHAR(25) NOT NULL,
  precio DECIMAL(6,2) NOT NULL,
  cstart DATE NOT NULL,
  cend DATE NOT NULL,
  period business_time(cstart, cend),
  PRIMARY KEY (gomita_id, business_time WITHOUT overlaps)
);

INSERT into gomitas(nombre, precio, cstart, cend)
    VALUES('gomita_uno', 10, '2018-1-1', '2019-1-1'),
    ('gomita_dos', 15, '2018-1-1', '2019-1-1'),
    ('gomita_tres', 7, '2018-1-1', '2019-1-1'),
    ('gomita_cuatro', 9, '2018-1-1', '2019-1-1'),
    ('gomita_cinco', 7, '2018-1-1', '2019-1-1'),
    ('gomita_seis', 16, '2018-1-1', '2019-1-1'),
    ('gomita_siete', 16, '2018-1-1', '2019-1-1'),
    ('gomita_ocho', 20, '2018-1-1', '2019-1-1'),
    ('gomita_nueve', 11, '2018-1-1', '2019-1-1'),
    ('gomita_diez', 13, '2018-1-1', '2019-1-1'),
    ('gomita_once', 9, '2018-1-1', '2019-1-1'),
    ('gomita_doce', 8, '2018-1-1', '2019-1-1');


UPDATE gomitas
FOR PORTION OF BUSINESS_TIME FROM '2018-2-1' to '2018-4-25'
  SET precio = precio*1.45;

UPDATE gomitas
FOR PORTION OF BUSINESS_TIME FROM '2018-4-25' to '2018-11-25'
  SET precio = precio*1.45;

UPDATE gomitas
FOR PORTION OF BUSINESS_TIME FROM '2018-1-30' to '2018-1-15'
  SET precio = precio*1.1;

UPDATE gomitas
FOR PORTION OF BUSINESS_TIME FROM '2018-1-30' to '2018-5-5'
  SET precio = precio*1.1;

UPDATE gomitas
FOR PORTION OF BUSINESS_TIME FROM '2018-1-30' to '2018-10-5'
  SET precio = precio*1.1;


SELECT AVG(precio)
  FROM gomitas
  where nombre = 'gomita_uno';


SELECT MAX(precio) as MAX from gomitas where nombre='gomita_uno';

SELECT MIN(precio) as MAX from gomitas where nombre='gomita_uno';
