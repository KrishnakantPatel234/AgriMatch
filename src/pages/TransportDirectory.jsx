// pages/TransportDirectory.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TransportDirectory = () => {
  const [transports] = useState([
    {
      _id: '1',
      companyName: "Swift Logistics",
      userId: { name: "Amit Sharma" },
      vehicleType: "truck",
      location: { city: "Mumbai", state: "Maharashtra" },
      capacity: { weight: 10 },
      services: ["perishable", "grains"],
      availability: "available",
      pricePerKm: 15,
      rating: { average: 4.7 }
    },
    {
      _id: '2',
      companyName: "Cold Express",
      userId: { name: "Priya Patel" },
      vehicleType: "refrigerated", 
      location: { city: "Pune", state: "Maharashtra" },
      capacity: { weight: 8 },
      services: ["perishable"],
      availability: "available",
      pricePerKm: 20,
      rating: { average: 4.9 }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
       
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Transport Partners</h1>
          <p className="text-xl mb-8">Reliable logistics for your agricultural needs</p>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold">200+</div>
              <div className="text-blue-200">Verified Vehicles</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-blue-200">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-blue-200">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <select className="border border-gray-300 rounded-lg px-4 py-3">
              <option>Vehicle Type</option>
              <option>Truck</option>
              <option>Refrigerated Van</option>
            </select>
            
            <input type="text" placeholder="From City" className="border border-gray-300 rounded-lg px-4 py-3" />
            
            <input type="text" placeholder="To City" className="border border-gray-300 rounded-lg px-4 py-3" />
            
            <button className="bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700">
              Find Transport
            </button>
          </div>
        </div>

        {/* Transport Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transports.map(transport => (
            <div key={transport._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 bg-blue-100 relative flex items-center justify-center">
                <span className="text-6xl">🚚</span>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="text-yellow-400">⭐</span>
                  <span className="ml-1 font-semibold">{transport.rating.average}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{transport.companyName}</h3>
                <p className="text-blue-600 font-medium mb-3">{transport.userId.name}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    <span>{transport.location.city}, {transport.location.state}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🚛</span>
                    <span className="capitalize">{transport.vehicleType}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">⚖️</span>
                    <span>Capacity: {transport.capacity.weight} tons</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {transport.services.map((service, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    Available
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    ₹{transport.pricePerKm}/km
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
                    Book Now
                  </button>
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                    💬
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default TransportDirectory;