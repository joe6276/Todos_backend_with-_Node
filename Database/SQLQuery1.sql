

CREATE TABLE TodosTable(
id VARCHAR(100),
title VARCHAR(150),
description  VARCHAR(300),
date DATE)



CREATE PROCEDURE getTodos
AS
BEGIN
SELECT * FROM TodosTable

END

CREATE PROCEDURE getTodo(@id VARCHAR(100))
AS
BEGIN
SELECT * FROM TodosTable WHERE id= @id

END


CREATE PROCEDURE insertTodo(@id VARCHAR(100) , @title VARCHAR(150) , @description VARCHAR(300) , @date DATE)
AS
BEGIN

INSERT INTO TodosTable(id, title,description,date) VALUES(@id,@title,@description, @date)
END


EXEC insertTodo 'sdfhdhdhvjfdh', 'Title one', 'Description Here ' , '2022-12-12'

CREATE PROCEDURE updateTodo(@id VARCHAR(100) , @title VARCHAR(150) , @description VARCHAR(300) , @date DATE)
AS
BEGIN

UPDATE TodosTable SET  id=@id, title=@title,description=@description, date=@date
END



CREATE PROCEDURE deleteTodo(@id VARCHAR(100))
AS
BEGIN
DELETE FROM TodosTable WHERE id =@id
END


EXEC getTodos

EXEC deleteTodo 'sdfhdhdhvjfdh'


CREATE DATABASE HospitalRs