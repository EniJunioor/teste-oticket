import { prisma } from "../prisma/client.js";

export const clienteService = {
  async listar() {
    return prisma.cliente.findMany();
  },
  async criar(data) {
    return prisma.cliente.create({ data });
  },
};
