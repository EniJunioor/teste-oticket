import { produtoService } from "../services/produtoService.js";

export const produtoController = {
  async listar(req, res) {
    const produtos = await produtoService.listar();
    res.json(produtos);
  },
  async criar(req, res) {
    try {
      const { nome, preco } = req.body;
      const produto = await produtoService.criar({ nome, preco: parseFloat(preco) });
      res.status(201).json(produto);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar produto" });
    }
  },
};
