import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Sistema de Pedidos API',
      version: '1.0.0',
      description: 'API REST para gerenciamento de clientes, produtos e pedidos',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Cliente: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do cliente',
            },
            nome: {
              type: 'string',
              description: 'Nome do cliente',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do cliente',
            },
          },
        },
        Produto: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do produto',
            },
            nome: {
              type: 'string',
              description: 'Nome do produto',
            },
            preco: {
              type: 'number',
              format: 'float',
              description: 'Preço do produto',
            },
          },
        },
        Pedido: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do pedido',
            },
            clienteId: {
              type: 'integer',
              description: 'ID do cliente',
            },
            status: {
              type: 'string',
              enum: ['PENDENTE', 'PAGO'],
              description: 'Status do pedido',
            },
            data: {
              type: 'string',
              format: 'date-time',
              description: 'Data do pedido',
            },
            cliente: {
              $ref: '#/components/schemas/Cliente',
            },
            produtos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  produto: {
                    $ref: '#/components/schemas/Produto',
                  },
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
