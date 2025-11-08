// Mock directory data
const directoryData = {
  farmers: [
    {
      id: 1,
      name: 'Rajesh Kumar',
      farmSize: '4 acres',
      location: 'Nashik, Maharashtra',
      crops: ['Tomatoes', 'Potatoes', 'Spinach'],
      rating: 4.8,
      experience: '8 years',
      contact: '+919876543210'
    },
    {
      id: 2,
      name: 'Suresh Nair',
      farmSize: '6 acres',
      location: 'Pune, Maharashtra',
      crops: ['Wheat', 'Rice', 'Pulses'],
      rating: 4.6,
      experience: '12 years',
      contact: '+919776543211'
    }
  ],
  buyers: [
    {
      id: 1,
      name: 'Priya Sharma',
      businessName: 'FreshMart Supermarket',
      businessType: 'Retail Chain',
      location: 'Pune, Maharashtra',
      purchaseVolume: '2-5 tons weekly',
      preferredProducts: ['Vegetables', 'Fruits', 'Grains'],
      rating: 4.9,
      contact: '+918765432109'
    }
  ],
  transport: [
    {
      id: 1,
      name: 'Amit Patel',
      companyName: 'Swift Agri Logistics',
      vehicleTypes: ['Truck', 'Tempo', 'Refrigerated Van'],
      serviceAreas: ['Maharashtra', 'Gujarat', 'Madhya Pradesh'],
      capacity: '5-10 tons per vehicle',
      rating: 4.7,
      contact: '+917654321098'
    }
  ],
  storage: [
    {
      id: 1,
      name: 'Sanjay Singh',
      storageName: 'CoolStore Facilities',
      capacity: '500 tons',
      storageTypes: ['Cold Storage', 'Warehouse', 'Controlled Atmosphere'],
      locations: ['Nashik', 'Pune', 'Nagpur'],
      rating: 4.6,
      contact: '+916543210987'
    }
  ]
};

class DirectoryController {
  async getFarmers(req, res) {
    try {
      res.json(directoryData.farmers);
    } catch (error) {
      console.error('Get farmers error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getBuyers(req, res) {
    try {
      res.json(directoryData.buyers);
    } catch (error) {
      console.error('Get buyers error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTransport(req, res) {
    try {
      res.json(directoryData.transport);
    } catch (error) {
      console.error('Get transport error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getStorage(req, res) {
    try {
      res.json(directoryData.storage);
    } catch (error) {
      console.error('Get storage error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new DirectoryController();