CREATE OR ALTER PROCEDURE create_notebook (
  @notebook_id VARCHAR(255),
  @notebook_title VARCHAR(255),
  @notebook_content VARCHAR(255),
  @notebook_date_created VARCHAR(255)
)
AS
BEGIN
    INSERT INTO notebook_table (notebook_id, notebook_title, notebook_content, notebook_date_created)
    VALUES(@notebook_id, @notebook_title, @notebook_content, @notebook_date_created)
END

DROP PROCEDURE create_notebook;