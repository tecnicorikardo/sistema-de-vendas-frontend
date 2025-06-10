import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { salesService } from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Package 
} from 'lucide-react';

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin()) {
      loadSummary();
    }
  }, []);

  const loadSummary = async () => {
    try {
      const data = await salesService.getSalesSummary();
      setSummary(data);
    } catch (error) {
      console.error('Erro ao carregar resumo:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin()) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Acesso Restrito
        </h2>
        <p className="text-gray-600">
          Esta página é apenas para administradores.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Vendas Hoje',
      value: `R$ ${summary?.today_sales?.toFixed(2) || '0,00'}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Vendas do Mês',
      value: `R$ ${summary?.month_sales?.toFixed(2) || '0,00'}`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total de Vendas',
      value: `R$ ${summary?.total_sales?.toFixed(2) || '0,00'}`,
      icon: BarChart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Vendas Hoje (Qtd)',
      value: summary?.today_count || 0,
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Visão geral das vendas e estatísticas do sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Products */}
      {summary?.top_products && summary.top_products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Produtos Mais Vendidos (Últimos 30 dias)
            </CardTitle>
            <CardDescription>
              Ranking dos produtos com maior volume de vendas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summary.top_products}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total_sold" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesse rapidamente as principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/pdv"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium">Abrir PDV</h3>
              <p className="text-sm text-gray-600">
                Realizar nova venda
              </p>
            </a>
            <a
              href="/produtos"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Package className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium">Gerenciar Produtos</h3>
              <p className="text-sm text-gray-600">
                Adicionar ou editar produtos
              </p>
            </a>
            <a
              href="/vendas"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BarChart className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-medium">Ver Relatórios</h3>
              <p className="text-sm text-gray-600">
                Analisar vendas e relatórios
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

