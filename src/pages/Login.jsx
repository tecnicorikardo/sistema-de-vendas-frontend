import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      padding: '16px'
    }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.7), rgba(147, 51, 234, 0.7))',
        zIndex: 1
      }} />
      
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}>
        <div style={{ padding: '32px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ 
              width: '64px',
              height: '64px',
              margin: '0 auto 24px',
              background: 'linear-gradient(135deg, #2563eb, #9333ea)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #2563eb, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
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
                name="username"
                type="text"
                autoComplete="username"
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
                  color: '#1f2937'
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
                name="password"
                type="password"
                autoComplete="current-password"
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
                  color: '#1f2937'
                }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                height: '44px',
                background: loading 
                  ? '#9ca3af'
                  : 'linear-gradient(135deg, #2563eb, #9333ea)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
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
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
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

