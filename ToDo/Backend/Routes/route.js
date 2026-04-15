import { Router } from "express";
import ToDoController from "../Controllers/ToDoController.js";
import ToDo from "../Models/ToDo.js";

const routes = Router();

routes.post("/Create", ToDoController.Create);
routes.get("/getAll", ToDoController.getAll);
routes.delete("/:id", ToDoController.delete);
routes.get("/:id", ToDoController.getOne);
routes.put("/:id", ToDoController.updateAll);
routes.patch("/:id", ToDoController.updatePartial);

export default routes;
