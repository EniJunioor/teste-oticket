const { clienteService } = require('../../src/services/clienteService.js');

// Mock do Prisma
const mockPrisma = {
  cliente: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
};

// Mock do módulo prisma/client
jest.mock('../../src/prisma/client.js', () => ({
  prisma: mockPrisma,
}));

describe('ClienteService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listar', () => {
    it('deve retornar lista de clientes', async () => {
      const clientesMock = [
        { id: 1, nome: 'João Silva', email: 'joao@email.com' },
        { id: 2, nome: 'Maria Santos', email: 'maria@email.com' },
      ];

      mockPrisma.cliente.findMany.mockResolvedValue(clientesMock);

      const result = await clienteService.listar();

      expect(mockPrisma.cliente.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(clientesMock);
    });
  });

  describe('criar', () => {
    it('deve criar um novo cliente', async () => {
      const clienteData = { nome: 'João Silva', email: 'joao@email.com' };
      const clienteCriado = { id: 1, ...clienteData };

      mockPrisma.cliente.create.mockResolvedValue(clienteCriado);

      const result = await clienteService.criar(clienteData);

      expect(mockPrisma.cliente.create).toHaveBeenCalledWith({ data: clienteData });
      expect(result).toEqual(clienteCriado);
    });
  });
});
