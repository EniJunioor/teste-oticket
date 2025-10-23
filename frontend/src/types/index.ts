export interface Cliente {
  id: number;
  nome: string;
  email: string;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
}

export interface Pedido {
  id: number;
  clienteId: number;
  status: string;
  data: string;
  cliente: Cliente;
  produtos: Array<{
    id: number;
    pedidoId: number;
    produtoId: number;
    produto: Produto;
  }>;
}

export interface CreateClienteData {
  nome: string;
  email: string;
}

export interface CreateProdutoData {
  nome: string;
  preco: number;
}

export interface CreatePedidoData {
  clienteId: number;
  produtos: number[];
}
