import { clienteService } from "../services/clienteService.js";

export const clienteController = {
  async listar(req, res) {
    const clientes = await clienteService.listar();
    res.json(clientes);
  },
  async criar(req, res) {
    try {
      const { nome, email } = req.body;
      const cliente = await clienteService.criar({ nome, email });
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar cliente" });
    }
  },
};
