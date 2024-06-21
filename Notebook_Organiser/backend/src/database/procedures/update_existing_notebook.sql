CREATE OR ALTER PROCEDURE update_existing_notebook (
  @notebook_id VARCHAR(255),
  @notebook_title VARCHAR(255),
  @notebook_content VARCHAR(255),
  @notebook_date_created VARCHAR(255)
)
AS
BEGIN
    UPDATE notebook_table SET notebook_id = @notebook_id, notebook_title = @notebook_title, notebook_content = @notebook_content, 
    notebook_date_created = @notebook_date_created WHERE notebook_id = @notebook_id
END

DROP PROCEDURE update_existing_notebook;