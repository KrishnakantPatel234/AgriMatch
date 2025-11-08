// pages/BuyersDirectory.js
import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const BuyersDirectory = () => {
  const [buyers] = useState([
    {
      _id: '1',
      businessName: "FreshMart Supermarket",
      userId: { name: "Vikram Mehta" },
      businessType: "retailer",
      location: { city: "Delhi", state: "Delhi" },
      requirements: [
        { product: "Tomatoes", quantity: 100 },
        { product: "Potatoes", quantity: 200 }
      ],
      paymentTerms: "advance",
      rating: { average: 4.9 }
    },
    {
      _id: '2',
      businessName: "Export Quality Foods",
      userId: { name: "Anita Desai" },
      businessType: "exporter", 
      location: { city: "Mumbai", state: "Maharashtra" },
      requirements: [
        { product: "Basmati Rice", quantity: 500 },
        { product: "Spices", quantity: 100 }
      ],
      paymentTerms: "letter_of_credit",
      rating: { average: 4.7 }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Verified Buyers</h1>
          <p className="text-xl mb-8">Connect with genuine buyers for your products</p>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-purple-200">Active Buyers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">₹50Cr+</div>
              <div className="text-purple-200">Monthly Volume</div>
            </div>
            <div>
              <div className="text-3xl font-bold">95%</div>
              <div className="text-purple-200">Verified</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Buyer Requirements */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">What are buyers looking for?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl">🍅</div>
              <div className="font-semibold">Tomatoes</div>
              <div className="text-sm text-gray-600">50+ requests</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl">🍚</div>
              <div className="font-semibold">Rice</div>
              <div className="text-sm text-gray-600">30+ requests</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl">🥔</div>
              <div className="font-semibold">Potatoes</div>
              <div className="text-sm text-gray-600">40+ requests</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl">🌶️</div>
              <div className="font-semibold">Spices</div>
              <div className="text-sm text-gray-600">25+ requests</div>
            </div>
          </div>
        </div>

        {/* Buyers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buyers.map(buyer => (
            <div key={buyer._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 bg-purple-100 relative flex items-center justify-center">
                <span className="text-6xl">👨‍💼</span>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="text-yellow-400">⭐</span>
                  <span className="ml-1 font-semibold">{buyer.rating.average}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{buyer.businessName}</h3>
                <p className="text-purple-600 font-medium mb-3">{buyer.userId.name}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    <span>{buyer.location.city}, {buyer.location.state}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🏢</span>
                    <span className="capitalize">{buyer.businessType}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Looking for:</p>
                  <div className="flex flex-wrap gap-1">
                    {buyer.requirements.slice(0, 3).map((req, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {req.product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <span className="mr-2">💰</span>
                  <span className="capitalize">Payment: {buyer.paymentTerms.replace('_', ' ')}</span>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition duration-300">
                    Contact
                  </button>
                  <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50">
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

export default BuyersDirectory;