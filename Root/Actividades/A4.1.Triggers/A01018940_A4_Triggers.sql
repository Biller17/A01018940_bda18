--Code written By Adrian Biller


-- 1. trigger para el salario mayor a 30%


create trigger incremento_salario before update on employee referencing old as old_values new as new_values for each row mode db2sql when(new_values.SALARY > (old_values.SALARY * 1.3) ) begin atomic SIGNAL SQLSTATE '75001' ('No se le puede incrementar arriba del 30% a un empleado'); end





  --2. trigger para colocar ordenes de compra cuando hay suficientes productos


create trigger pedir_orden before insert on orders referencing new as new_values for each row mode db2sql when(new_values.cantidad_producto   > (select QUANTITY from inventory where(new_values.producto_id = PID))) begin atomic SIGNAL SQLSTATE '75001' ('No hay suficiente producto en stock'); end



-- 3. trigger que reduce la cantidad de productos cuando la orden se cambia a delivered


create trigger delivered_order after update on orders referencing old as old_values new as new_values for each row mode db2sql when(new_values.estado = 'delivered') begin atomic update inventory set QUANTITY = QUANTITY- old_values.cantidad_producto where PID = old_values.producto_id; end
