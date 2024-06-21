import { Request, Response } from "express";
import NoteBookClass from "../service/service";

let notebookClass = new NoteBookClass;

export const saveNoteBook = async (req: Request, res: Response) => {
  
  try {
    let { notebook_title, notebook_content, notebook_date_created } = req.body;

    // let saved_notebook = {
    //   notebook_title,
    //   notebook_content,
    //   notebook_date_created
    // }    

    let response = await notebookClass.createNoteBook(req.body);

    return res.json(response)
  } catch (error) {
    return res.json({
      error: error,
    });
  }

};

export let fetchAllNotebooks = async (req: Request, res: Response) => {
  try {
    let response = await notebookClass.getAllNotebooks();

    return res.status(201).json(
      response
    )
  } catch (error) {
    return res.json({
      error: error
    })
  }
} 

export let updateExistingNotebook = async (req: Request, res: Response) => {
  
  try {
    let notebook_id = req.params.notebook_id;

    let { notebook_title, notebook_content, notebook_date_created } = req.body;

    console.log(req.body);
    

    let response = await notebookClass.updateNotebook(notebook_id, req.body);

    return res.json(response)
  } catch (error) {
    return res.json({
      error: error
    })
  }

}

export const removeNotebook = async(req: Request, res: Response) => {
  
  try {

    let notebook_id = req.params.notebook_id;

    let response = await notebookClass.deleteNoteBook(notebook_id);

    return res.json(response);
    
  } catch (error) {
    return res.json({
      error: error
    })
  }

}

export const fetchNotebookByID = async (req: Request, res: Response) => {
  
  try {
    let notebook_id = req.params.notebook_id;

    let result = await notebookClass.getNotebookByID(notebook_id);

    return res.json(result)
  } catch (error) {
    return res.json({
      error: error
    })
  }

}