const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock database (replace with real database later)
const users = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'farmer@demo.com',
    phone: '+919876543210',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: demo123
    role: 'farmer',
    farmSize: '4 acres',
    location: 'Nashik, Maharashtra',
    isVerified: true
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'buyer@demo.com',
    phone: '+918765432109',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: demo123
    role: 'buyer',
    businessName: 'FreshMart Supermarket',
    businessType: 'Retail Chain',
    location: 'Pune, Maharashtra',
    isVerified: true
  },
  {
    id: 3,
    name: 'Amit Patel',
    email: 'transport@demo.com',
    phone: '+917654321098',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: demo123
    role: 'transport',
    companyName: 'Swift Agri Logistics',
    vehicleTypes: ['Truck', 'Tempo', 'Refrigerated Van'],
    serviceAreas: ['Maharashtra', 'Gujarat', 'Madhya Pradesh'],
    isVerified: true
  },
  {
    id: 4,
    name: 'Sanjay Singh',
    email: 'storage@demo.com',
    phone: '+916543210987',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: demo123
    role: 'storage',
    storageName: 'CoolStore Facilities',
    capacity: '500 tons',
    storageTypes: ['Cold Storage', 'Warehouse'],
    isVerified: true
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthController {
  // Login user
  async login(req, res) {
    try {
      const { email, phone, password } = req.body;

      // Find user by email or phone
      const user = users.find(u => 
        (email && u.email === email) || 
        (phone && u.phone === phone)
      );

      if (!user) {
        return res.status(401).json({ 
          message: 'Invalid credentials - User not found' 
        });
      }

      // In real app, use bcrypt.compare(password, user.password)
      // For demo, we'll use a simple check
      const isValidPassword = password === 'demo123';
      
      if (!isValidPassword) {
        return res.status(401).json({ 
          message: 'Invalid credentials - Wrong password' 
        });
      }

      // Create token
      const token = jwt.sign(
        { 
          userId: user.id, 
          role: user.role,
          email: user.email 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        message: 'Login successful',
        token,
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Register new user
  async register(req, res) {
    try {
      const { name, email, phone, password, role } = req.body;

      // Check if user already exists
      const existingUser = users.find(u => 
        u.email === email || u.phone === phone
      );

      if (existingUser) {
        return res.status(400).json({ 
          message: 'User already exists with this email or phone' 
        });
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        name,
        email,
        phone,
        password: bcrypt.hashSync(password, 10),
        role: role || 'farmer',
        isVerified: false,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);

      // Create token
      const token = jwt.sign(
        { 
          userId: newUser.id, 
          role: newUser.role,
          email: newUser.email 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Remove password from response
      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        message: 'Registration successful',
        token,
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get current user
  async getMe(req, res) {
    try {
      const user = users.find(u => u.id === req.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });

    } catch (error) {
      console.error('Get me error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Validate token
  async validateToken(req, res) {
    try {
      const user = users.find(u => u.id === req.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ valid: true, user: userWithoutPassword });

    } catch (error) {
      console.error('Validate token error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Logout (client-side token removal)
  async logout(req, res) {
    res.json({ message: 'Logout successful' });
  }
}

module.exports = new AuthController();