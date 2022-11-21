CREATE PROCEDURE insertTodo(@id VARCHAR(100) , @title VARCHAR(150) , @description VARCHAR(300) , @date DATE)
AS
BEGIN

INSERT INTO TodosTable(id, title,description,date) VALUES(@id,@title,@description, @date)
END