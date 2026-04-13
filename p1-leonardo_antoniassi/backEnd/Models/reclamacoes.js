import mongoose, { Schema } from "mongoose";
import "../db/conn.js"; // Conexão com o Banco de Dados

const ReclamacoesSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    morador: {
      type: String,
      required: true,
    },
    dataReclamacao: {
      type: Date,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Reclamacao = mongoose.model("Reclamacoes", ReclamacoesSchema);
export default Reclamacao;
