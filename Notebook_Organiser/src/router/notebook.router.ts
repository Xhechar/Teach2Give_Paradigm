import { Router } from "express";
import { fetchAllNotebooks, fetchNotebookByID, removeNotebook, saveNoteBook, updateExistingNotebook } from "../controller/controller";

export let my_route = Router();

my_route.post('/new-notebook', saveNoteBook);
my_route.get("/all-notebooks", fetchAllNotebooks);
my_route.post("/update-notebook/:notebook_id", updateExistingNotebook);
my_route.delete("/delete-notebook/:notebook_id", removeNotebook);
my_route.get("/get-one-notebook", fetchNotebookByID);