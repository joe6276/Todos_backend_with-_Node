
CREATE PROCEDURE updateTodo(@id VARCHAR(100) , @title VARCHAR(150) , 
@description VARCHAR(300) , @date DATE)
AS
BEGIN

UPDATE TodosTable SET  id=@id, title=@title,description=@description, date=@date
END
