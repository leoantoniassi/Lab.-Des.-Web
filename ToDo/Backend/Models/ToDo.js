import { Schema } from "mongoose";
import mongoose from "../db/conn.js";

const { schema } = mongoose;
const ToDoSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    dataLimite: {
      type: Date,
      required: true,
    },
    situacao: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ToDo = mongoose.model("ToDo", ToDoSchema);
export default ToDo;