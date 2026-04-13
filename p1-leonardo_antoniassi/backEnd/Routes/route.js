import { Router } from "express";
import ReclamacoesController from "../Controllers/reclamacoesController.js";

const routes = Router();

routes.post("/Create", ReclamacoesController.Create);
routes.get("/getAll", ReclamacoesController.getAll);
routes.get("/tipo/:tipo", ReclamacoesController.buscarPorTipo);

export default routes;