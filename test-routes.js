import http from 'http';

const API_BASE = 'http://localhost:3001';

// Função para fazer requisições HTTP
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const jsonBody = body ? JSON.parse(body) : null;
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: jsonBody
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      const jsonData = JSON.stringify(data);
      req.setHeader('Content-Length', Buffer.byteLength(jsonData));
      req.write(jsonData);
    }
    
    req.end();
  });
}

// Testes das rotas
async function testRoutes() {
  console.log('🧪 Testando todas as rotas da API...\n');

  try {
    // 1. Testar rota principal
    console.log('1️⃣ Testando rota principal (GET /)');
    const mainResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/',
      method: 'GET'
    });
    console.log(`   Status: ${mainResponse.statusCode}`);
    console.log(`   Response: ${mainResponse.body}\n`);

    // 2. Testar listar clientes
    console.log('2️⃣ Testando listar clientes (GET /clientes)');
    const clientesResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/clientes',
      method: 'GET'
    });
    console.log(`   Status: ${clientesResponse.statusCode}`);
    console.log(`   Response:`, clientesResponse.body);
    console.log(`   Total de clientes: ${Array.isArray(clientesResponse.body) ? clientesResponse.body.length : 'N/A'}\n`);

    // 3. Testar criar cliente
    console.log('3️⃣ Testando criar cliente (POST /clientes)');
    const timestamp = Date.now();
    const novoCliente = {
      nome: 'Cliente Teste',
      email: `teste${timestamp}@email.com`
    };
    const criarClienteResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/clientes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, novoCliente);
    console.log(`   Status: ${criarClienteResponse.statusCode}`);
    console.log(`   Response:`, criarClienteResponse.body);
    const clienteId = criarClienteResponse.body?.id;
    console.log(`   ID do cliente criado: ${clienteId}\n`);

    // 4. Testar listar produtos
    console.log('4️⃣ Testando listar produtos (GET /produtos)');
    const produtosResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/produtos',
      method: 'GET'
    });
    console.log(`   Status: ${produtosResponse.statusCode}`);
    console.log(`   Response:`, produtosResponse.body);
    console.log(`   Total de produtos: ${Array.isArray(produtosResponse.body) ? produtosResponse.body.length : 'N/A'}\n`);

    // 5. Testar criar produto
    console.log('5️⃣ Testando criar produto (POST /produtos)');
    const novoProduto = {
      nome: 'Produto Teste',
      preco: 25.99
    };
    const criarProdutoResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/produtos',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, novoProduto);
    console.log(`   Status: ${criarProdutoResponse.statusCode}`);
    console.log(`   Response:`, criarProdutoResponse.body);
    const produtoId = criarProdutoResponse.body?.id;
    console.log(`   ID do produto criado: ${produtoId}\n`);

    // 6. Testar listar pedidos
    console.log('6️⃣ Testando listar pedidos (GET /pedidos)');
    const pedidosResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/pedidos',
      method: 'GET'
    });
    console.log(`   Status: ${pedidosResponse.statusCode}`);
    console.log(`   Response:`, pedidosResponse.body);
    console.log(`   Total de pedidos: ${Array.isArray(pedidosResponse.body) ? pedidosResponse.body.length : 'N/A'}\n`);

    // 7. Testar criar pedido (se temos cliente e produto)
    if (clienteId && produtoId) {
      console.log('7️⃣ Testando criar pedido (POST /pedidos)');
      const novoPedido = {
        clienteId: clienteId,
        produtos: [produtoId]
      };
      const criarPedidoResponse = await makeRequest({
        hostname: 'localhost',
        port: 3001,
        path: '/pedidos',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }, novoPedido);
      console.log(`   Status: ${criarPedidoResponse.statusCode}`);
      console.log(`   Response:`, criarPedidoResponse.body);
      console.log(`   ID do pedido criado: ${criarPedidoResponse.body?.id}\n`);
    } else {
      console.log('7️⃣ Pulando teste de pedido (cliente ou produto não criado)\n');
    }

    // 8. Testar Swagger
    console.log('8️⃣ Testando documentação Swagger (GET /api-docs/)');
    const swaggerResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api-docs/',
      method: 'GET'
    });
    console.log(`   Status: ${swaggerResponse.statusCode}`);
    console.log(`   Content-Type: ${swaggerResponse.headers['content-type']}`);
    console.log(`   Swagger disponível: ${swaggerResponse.statusCode === 200 ? '✅' : '❌'}\n`);

    console.log('🎉 Teste de rotas concluído!');

  } catch (error) {
    console.error('❌ Erro durante os testes:', error.message);
    console.log('\n💡 Certifique-se de que o servidor está rodando:');
    console.log('   docker compose up --build db backend -d');
    console.log('   ou');
    console.log('   cd backend && npm run dev');
  }
}

// Executar os testes
testRoutes();
