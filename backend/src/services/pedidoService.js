import { prisma } from "../prisma/client.js";

export const pedidoService = {
  async listar() {
    return prisma.pedido.findMany({
      include: {
        cliente: true,
        produtos: { include: { produto: true } },
      },
    });
  },

  async criar({ clienteId, produtos }) {
    return prisma.pedido.create({
      data: {
        clienteId,
        status: "PENDENTE",
        produtos: {
          create: produtos.map((id) => ({
            produto: { connect: { id } },
          })),
        },
      },
      include: { cliente: true, produtos: { include: { produto: true } } },
    });
  },
};
