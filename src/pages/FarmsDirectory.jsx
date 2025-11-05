// pages/FarmersDirectory.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FarmersDirectory = () => {
  const { t } = useLanguage();
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    crop: '',
    organic: '',
    minRating: ''
  });

  useEffect(() => {
    // For now, use mock data. Replace with actual API call later
    setFarmers(mockFarmers);
    setLoading(false);
  }, []);

  const mockFarmers = [
    {
      _id: '1',
      farmName: "Green Valley Organics",
      userId: { name: "Rajesh Kumar", profileImage: "" },
      location: { city: "Nashik", state: "Maharashtra" },
      crops: [
        { name: "Tomatoes", isOrganic: true },
        { name: "Grapes", isOrganic: true }
      ],
      farmSize: 10,
      certifications: ["Organic"],
      rating: { average: 4.8, count: 45 },
      availability: "available",
      farmImage: ""
    },
    {
      _id: '2', 
      farmName: "Punjab Wheat Fields",
      userId: { name: "Simran Singh", profileImage: "" },
      location: { city: "Amritsar", state: "Punjab" },
      crops: [
        { name: "Wheat", isOrganic: false },
        { name: "Basmati Rice", isOrganic: false }
      ],
      farmSize: 25,
      certifications: [],
      rating: { average: 4.5, count: 32 },
      availability: "available",
      farmImage: ""
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      < Navbar />
      {/* Hero Section */}
      <div className="bg-green-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Find Local Farmers</h1>
          <p className="text-xl mb-8">Connect directly with verified farmers across India</p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-green-200">Verified Farmers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-green-200">Crop Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold">25+</div>
              <div className="text-green-200">States</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <select className="border border-gray-300 rounded-lg px-4 py-3">
              <option>Select State</option>
              <option>Maharashtra</option>
              <option>Punjab</option>
            </select>
            
            <input type="text" placeholder="Enter City" className="border border-gray-300 rounded-lg px-4 py-3" />
            
            <input type="text" placeholder="Crop Name" className="border border-gray-300 rounded-lg px-4 py-3" />
            
            <select className="border border-gray-300 rounded-lg px-4 py-3">
              <option>All Types</option>
              <option>Organic Only</option>
            </select>
            
            <select className="border border-gray-300 rounded-lg px-4 py-3">
              <option>Any Rating</option>
              <option>4+ Stars</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700">
              Search Farmers
            </button>
            <span className="text-gray-600">{farmers.length} farmers found</span>
          </div>
        </div>

        {/* Farmers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {farmers.map(farmer => (
            <div key={farmer._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              {/* Farmer Image */}
              <div className="h-48 bg-green-100 relative flex items-center justify-center">
                <span className="text-6xl">🌾</span>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center">
                  <span className="text-yellow-400 text-sm">⭐</span>
                  <span className="text-sm font-semibold ml-1">{farmer.rating.average}</span>
                </div>
              </div>

              {/* Farmer Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{farmer.farmName}</h3>
                <p className="text-green-600 font-medium mb-3">{farmer.userId.name}</p>

                <div className="flex items-center text-gray-600 mb-3">
                  <span className="mr-2">📍</span>
                  <span>{farmer.location.city}, {farmer.location.state}</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Main Crops:</p>
                  <div className="flex flex-wrap gap-1">
                    {farmer.crops.slice(0, 3).map((crop, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {crop.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>🏞️ {farmer.farmSize} acres</span>
                  <span className="text-green-600">✅ Available</span>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300">
                    View Profile
                  </button>
                  <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                    💬
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      < Footer />
    </div>
  );
};

export default FarmersDirectory;