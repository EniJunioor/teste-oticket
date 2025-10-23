'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    
    if (auth === 'true') {
      setIsAuthenticated(true);
      setUserEmail(email || '');
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  if (!isAuthenticated) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Mini Sistema de Pedidos
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Logado como: {userEmail}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link
              href="/dashboard"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-1 pt-1 pb-4 text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/clientes"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-1 pt-1 pb-4 text-sm font-medium"
            >
              Clientes
            </Link>
            <Link
              href="/produtos"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-1 pt-1 pb-4 text-sm font-medium"
            >
              Produtos
            </Link>
            <Link
              href="/pedidos"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-1 pt-1 pb-4 text-sm font-medium"
            >
              Pedidos
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>
    </div>
  );
}
