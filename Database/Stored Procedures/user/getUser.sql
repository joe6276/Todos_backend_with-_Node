CREATE PROC getUser (@email VARCHAR(200))
AS
BEGIN
SELECT * FROM UserTable WHERE email = @email
END
