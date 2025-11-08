import axios from 'axios';

// Check if we're in development mode and backend might not be available (Vite)
const isDevelopment = typeof import.meta !== 'undefined' ? !!import.meta.env?.DEV : false;

// Create API instance with better error handling
const API = axios.create({
  // Use Vite proxy by default; allow override via VITE_API_URL
  baseURL: (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : undefined) || '/api',
  timeout: 15000, // Increased timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (isDevelopment) {
      console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('🚨 Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => {
    // Log successful response in development
    if (isDevelopment) {
      console.log(`✅ API Success: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('🚨 API Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url
    });

    // Handle different types of errors
    if (error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
      console.error('🔌 Backend server is not running or not accessible');
      // You can show a user-friendly message or use mock data here
    }

    if (error.response?.status === 401) {
      console.warn('🔐 Authentication failed, clearing local storage');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Use window.location instead of navigate for interceptor
      if (window.location.pathname !== '/login') {
        setTimeout(() => {
          window.location.href = '/login?session=expired';
        }, 100);
      }
    }
    
    return Promise.reject(error);
  }
);

// Enhanced mock data with better structure
const createMockUser = (baseUser, roleSpecificData) => ({
  ...baseUser,
  ...roleSpecificData,
  profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(baseUser.name)}&background=10B981&color=fff`,
  joinedDate: new Date().toISOString(),
  isVerified: true,
  lastLogin: new Date().toISOString()
});

const mockUsers = {
  farmer: createMockUser(
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      email: 'farmer@demo.com', 
      role: 'farmer',
      phone: '+919876543210'
    },
    {
      farmSize: '4 acres',
      location: 'Nashik, Maharashtra',
      crops: ['Tomatoes', 'Potatoes', 'Spinach'],
      rating: 4.8
    }
  ),
  buyer: createMockUser(
    { 
      id: 2, 
      name: 'Priya Sharma', 
      email: 'buyer@demo.com', 
      role: 'buyer',
      phone: '+918765432109'
    },
    {
      businessName: 'FreshMart Supermarket',
      businessType: 'Retail Chain',
      location: 'Pune, Maharashtra',
      rating: 4.9
    }
  ),
  transport: createMockUser(
    { 
      id: 3, 
      name: 'Amit Patel', 
      email: 'transport@demo.com', 
      role: 'transport',
      phone: '+917654321098'
    },
    {
      companyName: 'Swift Agri Logistics',
      vehicleTypes: ['Truck', 'Tempo', 'Refrigerated Van'],
      serviceAreas: ['Maharashtra', 'Gujarat', 'Madhya Pradesh'],
      rating: 4.7
    }
  ),
  storage: createMockUser(
    { 
      id: 4, 
      name: 'Sanjay Singh', 
      email: 'storage@demo.com', 
      role: 'storage',
      phone: '+916543210987'
    },
    {
      storageName: 'CoolStore Facilities',
      capacity: '500 tons',
      storageTypes: ['Cold Storage', 'Warehouse'],
      rating: 4.6
    }
  )
};

// Enhanced mock authentication with better validation
const mockAuthResponse = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Handle both phone and email login
        let userKey = null;
        
        if (credentials.phone) {
          const phoneDigits = credentials.phone.replace(/\D/g, "");
          const normalizedPhone = `+91${phoneDigits.slice(phoneDigits.startsWith('91') ? 2 : 0)}`;
          userKey = Object.keys(mockUsers).find(key => 
            mockUsers[key].phone === normalizedPhone
          );
        } else if (credentials.email) {
          userKey = Object.keys(mockUsers).find(key => 
            mockUsers[key].email === credentials.email
          );
        }

        // Default demo password
        const validPassword = credentials.password === 'demo123';
        
        if (userKey && validPassword) {
          const user = mockUsers[userKey];
          const token = `mock-jwt-token-${userKey}`;
          
          resolve({ 
            data: { 
              user, 
              token,
              message: 'Login successful'
            } 
          });
        } else {
          reject(new Error('Invalid credentials. Use phone numbers from mock users with password "demo123"'));
        }
      } catch (error) {
        reject(new Error('Authentication failed: ' + error.message));
      }
    }, 1000);
  });
};

// Enhanced mock registration
const mockRegisterResponse = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Check if user already exists (basic validation)
        const existingUser = Object.values(mockUsers).find(user => 
          user.email === userData.email || user.phone === userData.phone
        );
        
        if (existingUser) {
          reject(new Error('User already exists with this email or phone'));
          return;
        }

        // Create new user
        const newUser = createMockUser(
          {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            role: userData.role || 'farmer'
          },
          {}
        );

        const token = `mock-jwt-token-new-${userData.role}`;
        
        resolve({
          data: {
            user: newUser,
            token,
            message: 'Registration successful'
          }
        });
      } catch (error) {
        reject(new Error('Registration failed: ' + error.message));
      }
    }, 1000);
  });
};

// Enhanced API functions with better fallback handling
export const authAPI = {
  login: async (credentials) => {
    try {
      // First try the real API
      const response = await API.post('/auth/login', credentials);
      return response;
    } catch (error) {
      // If backend is not available and we're in development, use mock data
      if ((error.code === 'ECONNREFUSED' || error.message === 'Network Error' || error.response?.status >= 500) && isDevelopment) {
        console.warn('⚠️ Backend not available, using mock data for login');
        return mockAuthResponse(credentials);
      }
      // Re-throw authentication errors (400, 401, etc.)
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      return response;
    } catch (error) {
      if ((error.code === 'ECONNREFUSED' || error.message === 'Network Error' || error.response?.status >= 500) && isDevelopment) {
        console.warn('⚠️ Backend not available, using mock registration');
        return mockRegisterResponse(userData);
      }
      throw error;
    }
  },
  
  getMe: async () => {
    try {
      const response = await API.get('/auth/me');
      return response;
    } catch (error) {
      if ((error.code === 'ECONNREFUSED' || error.message === 'Network Error' || error.response?.status >= 500) && isDevelopment) {
        console.warn('⚠️ Backend not available, using mock user data');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user) {
          return { data: { user } };
        }
        throw new Error('No user data available');
      }
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await API.post('/auth/logout');
      return response;
    } catch (error) {
      // For logout, we always clear local storage regardless of API call success
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { data: { message: 'Logged out successfully' } };
    }
  },

  validateToken: async (token) => {
    try {
      const response = await API.get('/auth/validate', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response;
    } catch (error) {
      if ((error.code === 'ECONNREFUSED' || error.message === 'Network Error') && isDevelopment) {
        console.warn('⚠️ Backend not available, validating mock token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user && token?.startsWith('mock-jwt-token-')) {
          return { data: { valid: true, user } };
        }
        throw new Error('Invalid token');
      }
      throw error;
    }
  }
};

// Enhanced mock data for other APIs
const mockProducts = [
  { id: 1, name: 'Organic Tomatoes', price: 50, category: 'vegetables', farmer: 'Rajesh Kumar' },
  { id: 2, name: 'Basmati Rice', price: 80, category: 'grains', farmer: 'Suresh Nair' },
  { id: 3, name: 'Fresh Apples', price: 120, category: 'fruits', farmer: 'Priya Deshmukh' },
  { id: 4, name: 'Organic Potatoes', price: 30, category: 'vegetables', farmer: 'Rajesh Kumar' },
];

export const productAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await API.get('/products', { params });
      return response;
    } catch (error) {
      if ((error.code === 'ECONNREFUSED' || error.message === 'Network Error') && isDevelopment) {
        console.warn('⚠️ Backend not available, using mock products');
        // Basic filtering for mock data
        let filteredProducts = [...mockProducts];
        if (params.category) {
          filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase().includes(params.category.toLowerCase())
          );
        }
        if (params.search) {
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(params.search.toLowerCase())
          );
        }
        return { data: filteredProducts };
      }
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await API.get(`/products/${id}`);
      return response;
    } catch (error) {
      if ((error.code === 'ECONNREFUSED' || error.message === 'Network Error') && isDevelopment) {
        console.warn('⚠️ Backend not available, using mock product');
        const product = mockProducts.find(p => p.id === parseInt(id));
        if (product) {
          return { data: product };
        }
        throw new Error('Product not found');
      }
      throw error;
    }
  },
  
  create: async (productData) => {
    try {
      const response = await API.post('/products', productData);
      return response;
    } catch (error) {
      if ((error.code === 'ECONNREFUSED' || error.message === 'Network Error') && isDevelopment) {
        console.warn('⚠️ Backend not available, simulating product creation');
        const newProduct = {
          id: Math.max(...mockProducts.map(p => p.id)) + 1,
          ...productData,
          createdAt: new Date().toISOString()
        };
        mockProducts.push(newProduct);
        return { data: newProduct };
      }
      throw error;
    }
  },
  
  update: (id, productData) => API.put(`/products/${id}`, productData),
  delete: (id) => API.delete(`/products/${id}`),
};

// Directory APIs for different user types
export const directoryAPI = {
  getFarmers: (params) => API.get('/directory/farmers', { params }),
  getBuyers: (params) => API.get('/directory/buyers', { params }),
  getTransport: (params) => API.get('/directory/transport', { params }),
  getStorage: (params) => API.get('/directory/storage', { params }),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: (role) => API.get(`/dashboard/${role}/stats`),
  getRecentActivity: (role) => API.get(`/dashboard/${role}/activity`),
};

export const postsAPI = {
  list: (params) => API.get('/posts', { params }),
  create: (data) => API.post('/posts', data),
  mine: () => API.get('/posts/my'),
  forUser: (userId) => API.get(`/posts/user/${userId}`),
};

// Dedicated AI Axios (proxied to FastAPI on :8000 by Vite)
const AI = axios.create({
  baseURL: '/ai',
  timeout: 30000, // Increased timeout for AI operations
});

export const aiAPI = {
  chat: (payload) => AI.post('/chat', payload),
  analyzeImage: (payload) => AI.post('/analyze-image', payload),
  getSuggestions: (payload) => AI.post('/suggestions', payload),
};

// Utility function to check backend connectivity
export const checkBackendHealth = async () => {
  try {
    const response = await API.get('/health');
    return { status: 'connected', data: response.data };
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
      return { status: 'disconnected', error: 'Backend server is not running' };
    }
    return { status: 'error', error: error.message };
  }
};

// Export mock users for development/testing
export { mockUsers };

export default API;