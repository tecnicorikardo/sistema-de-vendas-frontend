import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingCart, Lock } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.7), rgba(147, 51, 234, 0.7))',
    zIndex: 1,
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    zIndex: 2,
    margin: '16px',
  }
};

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
    <div style={styles.container}>
      <div style={styles.gradient} />
      
      <div style={styles.card}>
        <div style={{ padding: '32px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ 
              display: 'inline-flex',
              padding: '16px',
              background: 'linear-gradient(135deg, #2563eb, #9333ea)',
              borderRadius: '50%',
              marginBottom: '24px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <ShoppingCart style={{ width: '32px', height: '32px', color: 'white' }} />
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #2563eb, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              Sistema de Vendas
            </h1>
            <p style={{ color: '#6b7280', fontSize: '18px' }}>
              Faça login para acessar o sistema
            </p>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {error && (
              <div style={{ 
                backgroundColor: '#fef2f2', 
                borderColor: '#f87171',
                borderWidth: '1px',
                borderRadius: '6px',
                padding: '12px',
                color: '#dc2626'
              }}>
                {error}
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label 
                htmlFor="username" 
                style={{ 
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                required
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '16px',
                  color: '#1f2937',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label 
                htmlFor="password"
                style={{ 
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '16px',
                  color: '#1f2937',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                height: '44px',
                background: 'linear-gradient(135deg, #2563eb, #9333ea)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'opacity 0.2s',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }} />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <Lock style={{ width: '20px', height: '20px' }} />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>
          
          <div style={{ 
            marginTop: '32px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: '#4b5563',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Credenciais de teste:
            </p>
            <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p>
                Usuário: 
                <span style={{ 
                  fontFamily: 'monospace',
                  backgroundColor: '#e5e7eb',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginLeft: '4px'
                }}>
                  admin
                </span>
              </p>
              <p>
                Senha: 
                <span style={{ 
                  fontFamily: 'monospace',
                  backgroundColor: '#e5e7eb',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginLeft: '4px'
                }}>
                  admin123
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

