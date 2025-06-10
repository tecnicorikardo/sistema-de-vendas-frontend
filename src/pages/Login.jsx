import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingCart, Lock } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-50" />
      
      <Card className="w-full max-w-md shadow-2xl bg-white/95 backdrop-blur-sm relative z-10 mx-4">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-xl">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sistema de Vendas
          </CardTitle>
          <CardDescription className="text-gray-500 text-lg">
            Faça login para acessar o sistema
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-600 font-medium">{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium text-sm">
                Usuário
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                required
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-lg" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Entrar
                </div>
              )}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <div className="bg-gray-100 rounded-lg p-4 shadow-inner">
              <p className="text-gray-600 font-medium mb-1">Credenciais de teste:</p>
              <div className="space-y-1 text-sm">
                <p>Usuário: <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">admin</span></p>
                <p>Senha: <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">admin123</span></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

