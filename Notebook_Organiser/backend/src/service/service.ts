import { sqlConfiguration } from "../config/configure.database";
import { Notebook } from "../interfaces/notebook.interface";
import mssql from "mssql";
import { v4 } from "uuid";
import lodash from "lodash";
import { Helper } from "../dbhelper/db.helper";

export default class NoteBookClass {
  async createNoteBook(notebook: Notebook) {
    let pool = await mssql.connect(sqlConfiguration);

    let response = (await Helper.execute("create_notebook", { notebook_id: v4(), notebook_title: notebook.notebook_title, notebook_content: notebook.notebook_content, notebook_date_created: notebook.notebook_date_created })).rowsAffected;

    console.log(response);
    

    if (response[0] < 1) {
      return {
        error: "There was a problem saving the notebook ...",
      };
    } else {
      return {
        message: "Notebook was created successfully.",
      };
    }
  }

  async getAllNotebooks() {
    let pool = await mssql.connect(sqlConfiguration);

    let response = (await pool.request().query("SELECT * FROM notebook_table"))
      .recordset;

    return {
      projects: response,
    };
  }

  async updateNotebook(notebook_id: string, notebook: Notebook) {
    let pool = await mssql.connect(sqlConfiguration);

    let update_note_book = await (
      await pool
        .request()
        .query(
          `SELECT * FROM notebook_table WHERE notebook_id = '${notebook_id}'`
        )
    ).recordset;

    if (lodash.isEmpty(update_note_book)) {
      return {
        error: "Sorry, notebook with that id was not found ...",
      };
    } else {
      let response = (
        await pool
          .request()
          .input("notebook_id", update_note_book[0].notebook_id)
          .input("notebook_title", notebook.notebook_title)
          .input("notebook_content", notebook.notebook_content)
          .input("notebook_date_created", notebook.notebook_date_created)
          .execute("update_existing_notebook")
      ).rowsAffected;

      if (response[0] < 1) {
        return {
          error: "Unable to create notebook at the moment",
        };
      } else {
        return {
          message: "Notebook updated successfully ...",
        };
      }
    }
  }

  async deleteNoteBook(notebook_id: string) {
    let pool = await mssql.connect(sqlConfiguration);

    let response = await (
      await pool
        .request()
        .query(
          `SELECT * FROM notebook_table WHERE notebook_id = '${notebook_id}'`
        )
    ).recordset;

    if (response.length < 1) {
      return {
        error: "The notebook you have specified was not found ...",
      };
    } else {
      await pool
        .request()
        .query(
          `DELETE FROM notebook_table WHERE notebook_id = '${notebook_id}'`
        );
      return {
        message: "Notebook(s) deleted successfully ...",
      };
    }
  }

  async getNotebookByID(notebook_id: string) {
    let pool = await mssql.connect(sqlConfiguration);

    let response = await (
      await pool
        .request()
        .query(
          `SELECT * FROM notebook_table WHERE notebook_id = '${notebook_id}'`
        )
    ).recordset;

    if (response.length < 1) {
      return {
        error: "Sorry there are no results for the notebook specified.",
      };
    } else {
      return {
        project: response[0],
      };
    }
  }
}
