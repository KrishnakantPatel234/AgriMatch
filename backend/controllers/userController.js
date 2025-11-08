// Mock users data (same as in authController)
const users = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'farmer@demo.com',
    phone: '+919876543210',
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
    role: 'buyer',
    businessName: 'FreshMart Supermarket',
    businessType: 'Retail Chain',
    location: 'Pune, Maharashtra',
    isVerified: true
  }
];

class UserController {
  async getProfile(req, res) {
    try {
      const user = users.find(u => u.id === req.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateProfile(req, res) {
    try {
      const userIndex = users.findIndex(u => u.id === req.userId);
      
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user data
      users[userIndex] = { ...users[userIndex], ...req.body };

      res.json({ 
        message: 'Profile updated successfully',
        user: users[userIndex] 
      });

    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new UserController();