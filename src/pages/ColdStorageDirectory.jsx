// pages/ColdStorageDirectory.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ColdStorageDirectory = () => {
  const [storages] = useState([
    {
      _id: '1',
      storageName: "FreshKeep Cold Storage",
      userId: { name: "Rahul Verma" },
      location: { city: "Bangalore", state: "Karnataka" },
      capacity: { total: 100, available: 35 },
      services: ["fruits", "vegetables"],
      pricing: { perDayPerKg: 2 },
      rating: { average: 4.8 }
    },
    {
      _id: '2',
      storageName: "AgriCold Solutions", 
      userId: { name: "Neha Reddy" },
      location: { city: "Hyderabad", state: "Telangana" },
      capacity: { total: 150, available: 80 },
      services: ["dairy", "meat"],
      pricing: { perDayPerKg: 3 },
      rating: { average: 4.6 }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      < Navbar />  
      {/* Hero Section */}
      <div className="bg-cyan-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Cold Storage Facilities</h1>
          <p className="text-xl mb-8">Professional storage solutions for perishable goods</p>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold">150+</div>
              <div className="text-cyan-200">Storage Facilities</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5000+</div>
              <div className="text-cyan-200">Tons Capacity</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99%</div>
              <div className="text-cyan-200">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Booking */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Quick Storage Booking</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="border border-gray-300 rounded-lg px-4 py-3">
              <option>Product Type</option>
              <option>Fruits</option>
              <option>Vegetables</option>
            </select>
            
            <input type="number" placeholder="Quantity (kg)" className="border border-gray-300 rounded-lg px-4 py-3" />
            
            <input type="number" placeholder="Days" className="border border-gray-300 rounded-lg px-4 py-3" />
            
            <button className="bg-cyan-600 text-white rounded-lg px-4 py-3 hover:bg-cyan-700">
              Check Availability
            </button>
          </div>
        </div>

        {/* Storage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storages.map(storage => {
            const availablePercentage = (storage.capacity.available / storage.capacity.total) * 100;
            
            return (
              <div key={storage._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className="h-48 bg-cyan-100 relative flex items-center justify-center">
                  <span className="text-6xl">❄️</span>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-yellow-400">⭐</span>
                    <span className="ml-1 font-semibold">{storage.rating.average}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{storage.storageName}</h3>
                  <p className="text-cyan-600 font-medium mb-3">{storage.userId.name}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📍</span>
                      <span>{storage.location.city}, {storage.location.state}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📦</span>
                      <span>Capacity: {storage.capacity.total} tons</span>
                    </div>
                  </div>

                  {/* Availability Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Available Space</span>
                      <span>{storage.capacity.available} tons ({Math.round(availablePercentage)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          availablePercentage > 30 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${availablePercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {storage.services.map((service, idx) => (
                      <span key={idx} className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-800">
                      ₹{storage.pricing.perDayPerKg}/kg/day
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-cyan-600 text-white py-2 rounded-lg font-medium hover:bg-cyan-700 transition duration-300">
                      Book Storage
                    </button>
                    <button className="px-4 py-2 border border-cyan-600 text-cyan-600 rounded-lg hover:bg-cyan-50">
                      💬
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ColdStorageDirectory;