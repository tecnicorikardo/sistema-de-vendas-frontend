// Configuração da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

console.log('API Base URL:', API_BASE_URL);

// Instância do axios
import axios from 'axios';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request:', {
      url: config.url,
      method: config.method,
      hasToken: !!token
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get Current User Error:', error);
      throw error;
    }
  },
};

// Serviços de usuários
export const userService = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  
  updateUser: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },
  
  deleteUser: async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },
};

// Serviços de categorias
export const categoryService = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },
  
  updateCategory: async (categoryId, categoryData) => {
    const response = await api.put(`/categories/${categoryId}`, categoryData);
    return response.data;
  },
  
  deleteCategory: async (categoryId) => {
    const response = await api.delete(`/categories/${categoryId}`);
    return response.data;
  },
};

// Serviços de produtos
export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  updateProduct: async (productId, productData) => {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  },
  
  deleteProduct: async (productId) => {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  },
  
  updateStock: async (productId, stock) => {
    const response = await api.put(`/products/${productId}/stock`, { stock });
    return response.data;
  },
};

// Serviços de vendas
export const salesService = {
  getSales: async (params = {}) => {
    const response = await api.get('/sales', { params });
    return response.data;
  },
  
  createSale: async (saleData) => {
    const response = await api.post('/sales', saleData);
    return response.data;
  },
  
  getSale: async (saleId) => {
    const response = await api.get(`/sales/${saleId}`);
    return response.data;
  },
  
  getSalesSummary: async () => {
    const response = await api.get('/sales/reports/summary');
    return response.data;
  },
};

export default api;

