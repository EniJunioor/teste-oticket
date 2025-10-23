import request from 'supertest';
import app from '../../src/app.js';

// Mock dos services
jest.mock('../../src/services/produtoService.js', () => ({
  produtoService: {
    listar: jest.fn(),
    criar: jest.fn(),
  },
}));

import { produtoService } from '../../src/services/produtoService.js';

describe('ProdutoController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /produtos', () => {
    it('deve retornar lista de produtos', async () => {
      const produtosMock = [
        { id: 1, nome: 'Produto 1', preco: 10.50 },
        { id: 2, nome: 'Produto 2', preco: 25.99 },
      ];

      produtoService.listar.mockResolvedValue(produtosMock);

      const response = await request(app)
        .get('/produtos')
        .expect(200);

      expect(response.body).toEqual(produtosMock);
      expect(produtoService.listar).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /produtos', () => {
    it('deve criar um novo produto', async () => {
      const produtoData = { nome: 'Produto Teste', preco: '15.99' };
      const produtoCriado = { id: 1, nome: 'Produto Teste', preco: 15.99 };

      produtoService.criar.mockResolvedValue(produtoCriado);

      const response = await request(app)
        .post('/produtos')
        .send(produtoData)
        .expect(201);

      expect(response.body).toEqual(produtoCriado);
      expect(produtoService.criar).toHaveBeenCalledWith({ nome: 'Produto Teste', preco: 15.99 });
    });

    it('deve retornar erro 400 quando falhar ao criar produto', async () => {
      produtoService.criar.mockRejectedValue(new Error('Erro no banco'));

      const response = await request(app)
        .post('/produtos')
        .send({ nome: 'Produto Teste', preco: '15.99' })
        .expect(400);

      expect(response.body).toEqual({ error: 'Erro ao criar produto' });
    });
  });
});
