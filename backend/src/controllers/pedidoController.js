import { pedidoService } from "../services/pedidoService.js";

export const pedidoController = {
  async listar(req, res) {
    const pedidos = await pedidoService.listar();
    res.json(pedidos);
  },
  async criar(req, res) {
    try {
      const { clienteId, produtos } = req.body;
      const pedido = await pedidoService.criar({ clienteId, produtos });
      res.status(201).json(pedido);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Erro ao criar pedido" });
    }
  },
};
