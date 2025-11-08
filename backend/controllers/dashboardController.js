// Mock dashboard data
const dashboardData = {
  farmer: {
    stats: {
      activeCrops: 3,
      totalHarvest: '45 tons',
      successRate: '92%',
      buyersConnected: 24,
      monthlyRevenue: '₹45,600',
      pendingOrders: 5
    },
    recentActivity: [
      { id: 1, type: 'order', message: 'New order for 100kg Tomatoes', time: '2 hours ago' },
      { id: 2, type: 'payment', message: 'Payment received ₹15,000', time: '1 day ago' },
      { id: 3, type: 'crop', message: 'Potatoes ready for harvest', time: '2 days ago' }
    ]
  },
  buyer: {
    stats: {
      activeSuppliers: 15,
      ordersThisMonth: 23,
      fulfillmentRate: '96%',
      favoriteFarmers: 8,
      monthlySpending: '₹3,20,000',
      pendingDeliveries: 3
    },
    recentActivity: [
      { id: 1, type: 'order', message: 'Order placed for Organic Tomatoes', time: '1 hour ago' },
      { id: 2, type: 'delivery', message: 'Delivery received from Rajesh Kumar', time: '5 hours ago' },
      { id: 3, type: 'payment', message: 'Payment processed ₹25,000', time: '1 day ago' }
    ]
  },
  transport: {
    stats: {
      activeVehicles: 6,
      onTimeDelivery: '94%',
      distanceCovered: '12,456 km',
      happyClients: 89,
      monthlyTrips: 45,
      currentDeliveries: 2
    },
    recentActivity: [
      { id: 1, type: 'delivery', message: 'Delivery completed to FreshMart', time: '3 hours ago' },
      { id: 2, type: 'booking', message: 'New booking received', time: '6 hours ago' },
      { id: 3, type: 'vehicle', message: 'Vehicle maintenance completed', time: '1 day ago' }
    ]
  },
  storage: {
    stats: {
      availableCapacity: '75 tons',
      temperatureZones: 4,
      securityLevel: 'High',
      clientSatisfaction: '95%',
      totalCapacity: '500 tons',
      currentClients: 12
    },
    recentActivity: [
      { id: 1, type: 'storage', message: 'New storage booking from Priya Sharma', time: '4 hours ago' },
      { id: 2, type: 'maintenance', message: 'Cooling system maintenance scheduled', time: '1 day ago' },
      { id: 3, type: 'payment', message: 'Monthly payment received ₹1,20,000', time: '2 days ago' }
    ]
  }
};

class DashboardController {
  // Get dashboard stats
  async getStats(req, res) {
    try {
      const { role } = req.params;
      
      if (!dashboardData[role]) {
        return res.status(404).json({ message: 'Dashboard data not found for this role' });
      }

      res.json(dashboardData[role].stats);

    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get recent activity
  async getRecentActivity(req, res) {
    try {
      const { role } = req.params;
      
      if (!dashboardData[role]) {
        return res.status(404).json({ message: 'Dashboard data not found for this role' });
      }

      res.json(dashboardData[role].recentActivity);

    } catch (error) {
      console.error('Get activity error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new DashboardController();