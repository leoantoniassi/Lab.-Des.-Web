import Reclamacao from "../Models/reclamacoes.js";
import { get, Types } from "mongoose";
export default class ReclamacoesController {
  static async Create(req, res) {
    const { titulo, descricao, morador, dataReclamacao, tipo } = req.body;

    if (!titulo || !descricao || !morador || !dataReclamacao || !tipo) {
      return res
        .status(422)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    try {
      // 1. cria uma nova reclamação
      const reclamacao = new Reclamacao({
        titulo,
        descricao,
        morador,
        dataReclamacao,
        tipo,
      });

      const novaReclamacao = await reclamacao.save();
      return res.status(201).json({
        message: "Reclamação registrada com sucesso",
        reclamacao: novaReclamacao,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Problema ao inserir reclamação",
        error: error.message,
      });
    }
  } // fim do create

  static async getAll(get, res) {
    try {
      const reclamacoes = await Reclamacao.find({});
      console.log(reclamacoes);
      res.status(200).json({ reclamacoes });
    } catch (error) {
      res
        .status(500)
        .json({ message: "problema ao buscar as reclamações", error });
    }
  } // Fim do getAll

  static buscarPorTipo = async (req, res) => {
    try {
      // Pegamos o tipo o usuário vai digitar na URL
      const tipoReclamacao = req.params.tipo;

      const reclamacao = await Reclamacao.find({ tipo: tipoReclamacao });
      // verificando se a lista está vazia
      if (reclamacao.length === 0) {
        return res.status(404).json({
          message: "Não há reclamações desse tipo no momento",
        });
      }

      // Se achou, devolvemos a lista de reclamações!
      res.status(200).json(reclamacao);
    } catch (erro) {
      res.status(500).json({
        mensagem: "Erro interno ao buscar reclamações desse tipo.",
        erro,
      });
    }
  };
}
