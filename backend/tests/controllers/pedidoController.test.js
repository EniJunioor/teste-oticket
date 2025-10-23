import request from 'supertest';
import app from '../../src/app.js';

// Mock dos services
jest.mock('../../src/services/pedidoService.js', () => ({
  pedidoService: {
    listar: jest.fn(),
    criar: jest.fn(),
  },
}));

import { pedidoService } from '../../src/services/pedidoService.js';

describe('PedidoController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /pedidos', () => {
    it('deve retornar lista de pedidos', async () => {
      const pedidosMock = [
        {
          id: 1,
          clienteId: 1,
          status: 'PENDENTE',
          cliente: { id: 1, nome: 'João Silva', email: 'joao@email.com' },
          produtos: [
            { produto: { id: 1, nome: 'Produto 1', preco: 10.50 } }
          ],
        },
      ];

      pedidoService.listar.mockResolvedValue(pedidosMock);

      const response = await request(app)
        .get('/pedidos')
        .expect(200);

      expect(response.body).toEqual(pedidosMock);
      expect(pedidoService.listar).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /pedidos', () => {
    it('deve criar um novo pedido', async () => {
      const pedidoData = { clienteId: 1, produtos: [1, 2] };
      const pedidoCriado = {
        id: 1,
        clienteId: 1,
        status: 'PENDENTE',
        cliente: { id: 1, nome: 'João Silva', email: 'joao@email.com' },
        produtos: [
          { produto: { id: 1, nome: 'Produto 1', preco: 10.50 } },
          { produto: { id: 2, nome: 'Produto 2', preco: 25.99 } },
        ],
      };

      pedidoService.criar.mockResolvedValue(pedidoCriado);

      const response = await request(app)
        .post('/pedidos')
        .send(pedidoData)
        .expect(201);

      expect(response.body).toEqual(pedidoCriado);
      expect(pedidoService.criar).toHaveBeenCalledWith(pedidoData);
    });

    it('deve retornar erro 400 quando falhar ao criar pedido', async () => {
      pedidoService.criar.mockRejectedValue(new Error('Erro no banco'));

      const response = await request(app)
        .post('/pedidos')
        .send({ clienteId: 1, produtos: [1, 2] })
        .expect(400);

      expect(response.body).toEqual({ error: 'Erro ao criar pedido' });
    });
  });
});
