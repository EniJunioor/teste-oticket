'use client';

import { useState, useEffect } from 'react';
import { Produto, CreateProdutoData } from '@/types';
import api from '@/lib/api';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateProdutoData>({
    nome: '',
    preco: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/produtos');
      setProdutos(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao carregar produtos' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await api.post('/produtos', formData);
      setMessage({ type: 'success', text: 'Produto criado com sucesso!' });
      setFormData({ nome: '', preco: 0 });
      setShowForm(false);
      fetchProdutos();
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Erro ao criar produto' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="mt-2 text-gray-600">
            Gerencie os produtos do sistema
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          {showForm ? 'Cancelar' : 'Novo Produto'}
        </button>
      </div>

      {/* Mensagem de feedback */}
      {message && (
        <div className={`rounded-md p-4 ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {message.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${
                message.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {message.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Formulário de criação */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Novo Produto
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="preco" className="block text-sm font-medium text-gray-700">
                Preço
              </label>
              <input
                type="number"
                id="preco"
                step="0.01"
                min="0"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Criando...' : 'Criar Produto'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de produtos */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Lista de Produtos ({produtos.length})
          </h2>
        </div>
        <div className="overflow-hidden">
          {produtos.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum produto</h3>
              <p className="mt-1 text-sm text-gray-500">Comece criando um novo produto.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {produtos.map((produto) => (
                    <tr key={produto.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {produto.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {produto.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        R$ {produto.preco.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
