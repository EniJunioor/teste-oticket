import { prisma } from "../prisma/client.js";

export const produtoService = {
  async listar() {
    return prisma.produto.findMany();
  },
  async criar(data) {
    return prisma.produto.create({ data });
  },
};
