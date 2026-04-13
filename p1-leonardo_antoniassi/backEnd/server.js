import express from "express";
import cors from "cors";
import routes from "./Routes/route.js";

const app = new express();
//respostas para o frontend serão em formato json
app.use(express.json());
//comunicação com frontend. A origin é onde está rodando o front
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

app.use("/Reclamacoes", routes);
//porta onde o backend está rodando
app.listen(5000);
