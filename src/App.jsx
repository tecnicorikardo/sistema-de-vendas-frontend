import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PDV from './pages/PDV';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Sales from './pages/Sales';
import './App.css';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/pdv" element={
        <ProtectedRoute>
          <Layout>
            <PDV />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/produtos" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <Products />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/categorias" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <Categories />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/usuarios" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <Users />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/vendas" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <Sales />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

