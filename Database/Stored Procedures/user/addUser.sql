CREATE PROCEDURE addUser (@email VARCHAR(200), @username VARCHAR(200),@password VARCHAR(200))
AS
BEGIN
INSERT INTO UserTable (email, username, password) VALUES(@email, @username,@password)

END