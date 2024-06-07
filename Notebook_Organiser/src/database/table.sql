CREATE TABLE notebook_table (
  notebook_id VARCHAR(255) PRIMARY KEY,
  notebook_title VARCHAR(50) NOT NULL,
  notebook_content VARCHAR(255),
  notebook_date_created DATE DEFAULT GETDATE()
);

SELECT * FROM notebook_table;