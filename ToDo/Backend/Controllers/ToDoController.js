import ToDo from "../Models/ToDo.js";
import { get, Types } from "mongoose";
export default class ToDoController {
  static async Create(req, res) {
    const { titulo, descricao, dataLimite, situacao } = req.body;
    if (!titulo) {
      res.status(422).json({ message: "o titulo é obrigatorio" });
      return;
    }
    if (!descricao || !dataLimite || !situacao) {
      res.status(422).json({ message: "todos os campos são obrigatorio" });
      return;
    }
    const tarefa = new ToDo({
      titulo,
      descricao,
      dataLimite,
      situacao,
    });
    try {
      const novaTarefa = await tarefa.save();
      res
        .status(200)
        .json({ message: "tarefa inserida com sucesso", novaTarefa });
    } catch (error) {
      res
        .status(500)
        .json({ message: "problema ao inserir a tarefa", novaTarefa });
    }
  } // fim do create
  static async getAll(get, res) {
    try {
      const tarefas = await ToDo.find({});
      console.log(tarefas);
      res.status(200).json({ tarefas });
    } catch (error) {
      res
        .status(500)
        .json({ message: "problema ao buscar todas as tarefas", error });
    }
  } // Fim do getAll

  static async delete(req, res) {
    try {
      const id = req.params.id;
      if (!Types.ObjectId.isValid(id)) {
        res.status(422).json({ message: "Identificador da tarefa é inválido" });
        return;
      }
      // Deletar tarefa
      const tarefa = await ToDo.findOne({ _id: id });
      if (!tarefa) {
        res.status(422).json({ message: "Tarefa não foi encontrada" });
        return;
      }
      await ToDo.findByIdAndDelete(id);
      res.status(200).json({ message: "Tarefa excluida com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "problema ao excluir a tarefa", error });
    }
  } // Fim Delete

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const ObjectId = Types.ObjectId;

      // 1. Validação do ID (Evita que o Mongoose quebre antes de buscar)
      if (!ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ message: "Identificador da tarefa inválido" });
      }

      // 2. Busca no Banco de Dados
      const tarefa = await ToDo.findById(id);

      // 3. Verificação de existência
      if (!tarefa) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      // 4. Retorno de sucesso
      return res.status(200).json({ tarefa });
    } catch (error) {
      // 5. Tratamento de erro genérico
      return res.status(500).json({
        message: "Problema ao buscar a tarefa",
        error: error.message,
      });
    }
  } // Fim do getOne

  static async updateAll(req, res) {
    const id = req.params.id;
    const { titulo, descricao, dataLimite, situacao } = req.body;
    const ObjectId = Types.ObjectId;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Identificador da tarefa é inválido" });
      return;
    }
    if (!titulo || !descricao || !dataLimite || !situacao) {
      res.status(422).json({ message: "todos os dados são obrigatorios" });
      return;
    }
    const updateData = {
      titulo,
      descricao,
      dataLimite,
      situacao,
    };
    try {
      const updateTarefa = await ToDo.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updateTarefa) {
        res.status(422).json({ message: "Tarefa não encontrada" });
        return;
      }
      res
        .status(200)
        .json({ message: "Tarefa alterada com sucesso", tarefa: updateTarefa });
    } catch (error) {
      res
        .status(500)
        .json({ message: "problema ao alterar uma tarefa", error });
      return;
    }
  } // fim do updateAll

  static async updatePartial(req, res) {
    const id = req.params.id;
    const { situacao } = req.body;
    const ObjectId = Types.ObjectId;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Identificador da tarefa é inválido" });
      return;
    }
    if (!situacao) {
      res.status(422).json({ message: "situação não informada" });
      return;
    }
    try {
      const updateSituacao = await ToDo.findByIdAndUpdate(id, situacao, {
        new: true,
        runValidators: true,
      });
      if (!updateSituacao) {
        res.status(422).json({
          message: "Tarefa para alteração da situação não encontrada",
        });
        return;
      }
      res.status(200).json({
        message: "Situação da tarefa alterada com sucesso",
        tarefa: updateSituacao,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "problema ao alterar a situação da tarefa", error });
      return;
    }
  } // Fim do updatePartial
}
