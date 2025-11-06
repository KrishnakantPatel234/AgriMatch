import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Demo data for different user roles
const demoUserData = {
  farmer: {
    farmSize: '4 acres',
    location: 'Nashik, Maharashtra',
    soilType: 'Black cotton soil',
    experience: '8 years',
    crops: ['Tomatoes', 'Potatoes', 'Spinach'],
    equipment: ['Tractor', 'Drip irrigation', 'Sprayer'],
    rating: 4.8,
    totalSales: '₹2,45,600',
    monthlyRevenue: '₹45,600'
  },
  buyer: {
    businessName: 'FreshMart Supermarket',
    businessType: 'Retail Chain',
    location: 'Pune, Maharashtra',
    purchaseVolume: '2-5 tons weekly',
    preferredProducts: ['Vegetables', 'Fruits', 'Grains'],
    rating: 4.9,
    totalOrders: 156,
    monthlySpending: '₹3,20,000'
  },
  transport: {
    companyName: 'Swift Agri Logistics',
    vehicleTypes: ['Truck', 'Tempo', 'Refrigerated Van'],
    serviceAreas: ['Maharashtra', 'Gujarat', 'Madhya Pradesh'],
    capacity: '5-10 tons per vehicle',
    rating: 4.7,
    totalDeliveries: 289,
    deliverySuccessRate: '98.5%'
  },
  storage: {
    storageName: 'CoolStore Facilities',
    capacity: '500 tons',
    storageTypes: ['Cold Storage', 'Warehouse', 'Controlled Atmosphere'],
    locations: ['Nashik', 'Pune', 'Nagpur'],
    services: ['Short-term', 'Long-term', 'Value-added'],
    rating: 4.6,
    occupancyRate: '85%',
    totalClients: 67
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = localStorage.getItem('agrimatch_user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('agrimatch_user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo validation - replace with actual authentication
      if (!credentials.email || !credentials.password) {
        throw new Error('Please fill in all fields');
      }

      // Demo accounts for testing
      const demoAccounts = {
        'farmer@agrimatch.com': { password: 'demo123', role: 'farmer', name: 'Rajesh Kumar' },
        'buyer@agrimatch.com': { password: 'demo123', role: 'buyer', name: 'FreshMart Stores' },
        'transport@agrimatch.com': { password: 'demo123', role: 'transport', name: 'Swift Logistics' },
        'storage@agrimatch.com': { password: 'demo123', role: 'storage', name: 'CoolStore Facilities' }
      };

      // Check if it's a demo account
      const demoAccount = demoAccounts[credentials.email];
      if (demoAccount && credentials.password === demoAccount.password) {
        const userData = createUserData(demoAccount.role, demoAccount.name, credentials.email);
        localStorage.setItem('agrimatch_user', JSON.stringify(userData));
        setUser(userData);
        toast.success(`Welcome back, ${demoAccount.name}!`);
        return { success: true, user: userData };
      }

      // Regular login - create user based on email
      const role = determineRoleFromEmail(credentials.email);
      const name = credentials.email.split('@')[0];
      const userData = createUserData(role, name, credentials.email);

      localStorage.setItem('agrimatch_user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success('Login successful!');
      return { success: true, user: userData };
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validation
      if (!userData.name || !userData.email || !userData.password) {
        throw new Error('Please fill in all required fields');
      }

      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Create user with role-specific data
      const newUser = createUserData(
        userData.role || 'buyer', 
        userData.name, 
        userData.email, 
        userData.phone
      );

      localStorage.setItem('agrimatch_user', JSON.stringify(newUser));
      setUser(newUser);
      
      toast.success(`Registration successful! Welcome to AgriMatch, ${userData.name}!`);
      return { success: true, user: newUser };
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      return { success: false, message: error.message };
    }
  };

  // Helper function to create user data with role-specific information
  const createUserData = (role, name, email, phone = '') => {
    const baseUser = {
      id: Date.now(),
      name: name,
      email: email,
      phone: phone,
      role: role,
      profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10B981&color=fff`,
      joinedDate: new Date().toISOString(),
      isVerified: true,
      lastLogin: new Date().toISOString()
    };

    // Add role-specific data
    const roleData = demoUserData[role] || {};
    
    return {
      ...baseUser,
      ...roleData,
      // Add additional role-specific fields
      stats: generateRoleStats(role),
      preferences: generateRolePreferences(role)
    };
  };

  // Helper function to determine role from email (for demo purposes)
  const determineRoleFromEmail = (email) => {
    if (email.includes('farmer')) return 'farmer';
    if (email.includes('buyer')) return 'buyer';
    if (email.includes('transport')) return 'transport';
    if (email.includes('storage')) return 'storage';
    return 'farmer'; // default role
  };

  // Generate role-specific statistics
  const generateRoleStats = (role) => {
    const stats = {
      farmer: {
        activeCrops: 3,
        totalHarvest: '45 tons',
        successRate: '92%',
        buyersConnected: 24
      },
      buyer: {
        activeSuppliers: 15,
        ordersThisMonth: 23,
        fulfillmentRate: '96%',
        favoriteFarmers: 8
      },
      transport: {
        activeVehicles: 6,
        onTimeDelivery: '94%',
        distanceCovered: '12,456 km',
        happyClients: 89
      },
      storage: {
        availableCapacity: '75 tons',
        temperatureZones: 4,
        securityLevel: 'High',
        clientSatisfaction: '95%'
      }
    };
    return stats[role] || {};
  };

  // Generate role-specific preferences
  const generateRolePreferences = (role) => {
    const preferences = {
      farmer: {
        preferredBuyers: ['Organic stores', 'Export companies'],
        communication: ['In-app messaging', 'Phone calls'],
        payment: ['UPI', 'Bank transfer'],
        notifications: ['Price alerts', 'Weather updates']
      },
      buyer: {
        productQuality: ['Organic', 'Fresh harvest'],
        delivery: ['Next day', 'Scheduled'],
        payment: ['Credit terms', 'UPI'],
        notifications: ['New farmers', 'Price drops']
      },
      transport: {
        vehiclePreference: ['Refrigerated', 'Large capacity'],
        routes: ['Highway preferred', 'Toll roads okay'],
        payment: ['Per trip', 'Monthly contract'],
        notifications: ['New bookings', 'Route changes']
      },
      storage: {
        storageType: ['Temperature controlled', 'Humidity controlled'],
        clients: ['Farmers', 'Exporters'],
        payment: ['Monthly', 'Per pallet'],
        notifications: ['Capacity alerts', 'Maintenance']
      }
    };
    return preferences[role] || {};
  };

  const logout = () => {
    localStorage.removeItem('agrimatch_user');
    setUser(null);
    toast.info('Logged out successfully');
    // Optional: Redirect to home page
    window.location.href = '/';
  };

  const updateUser = (updatedUser) => {
    const newUserData = { ...user, ...updatedUser };
    setUser(newUserData);
    localStorage.setItem('agrimatch_user', JSON.stringify(newUserData));
    toast.success('Profile updated successfully!');
  };

  // New function to update user preferences
  const updatePreferences = (newPreferences) => {
    const updatedUser = {
      ...user,
      preferences: { ...user.preferences, ...newPreferences }
    };
    setUser(updatedUser);
    localStorage.setItem('agrimatch_user', JSON.stringify(updatedUser));
    toast.success('Preferences updated!');
  };

  // New function to update user stats
  const updateStats = (newStats) => {
    const updatedUser = {
      ...user,
      stats: { ...user.stats, ...newStats }
    };
    setUser(updatedUser);
    localStorage.setItem('agrimatch_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    updatePreferences,
    updateStats,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};