// pages/dashboard/BuyerDashboard.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [aiData] = useState({
    supplierRecommendations: [
      { name: 'Green Valley Organics', score: 95, reason: 'Best quality, on-time delivery' },
      { name: 'Fresh Farm Co.', score: 88, reason: 'Competitive pricing, organic certified' }
    ],
    marketTrends: [
      { product: 'Tomatoes', trend: 'rising', change: '+12%', recommendation: 'Buy now' },
      { product: 'Potatoes', trend: 'falling', change: '-8%', recommendation: 'Wait 3 days' }
    ],
    qualityPredictions: [
      { supplier: 'Rajesh Farms', predictedQuality: 'A+', confidence: 92 }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}!
            <span className="text-purple-200 block text-xl mt-2">👨‍💼 Buyer Dashboard</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* AI Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">🤖 AI Procurement Assistant</h2>
              <p className="opacity-90">Smart sourcing and market intelligence</p>
            </div>
            <div className="text-4xl">📈</div>
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Supplier Intelligence */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">🏆 AI Supplier Recommendations</h3>
            {aiData.supplierRecommendations.map((supplier, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-4 py-3 mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{supplier.name}</h4>
                    <p className="text-sm text-gray-600">{supplier.reason}</p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                    {supplier.score} pts
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Market Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">📊 AI Market Predictions</h3>
            {aiData.marketTrends.map((trend, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2">
                <div>
                  <span className="font-semibold">{trend.product}</span>
                  <div className="text-sm text-gray-600">{trend.recommendation}</div>
                </div>
                <div className={`font-semibold ${trend.trend === 'rising' ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;