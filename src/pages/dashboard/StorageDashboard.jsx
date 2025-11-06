// pages/dashboard/StorageDashboard.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const StorageDashboard = () => {
  const { user } = useAuth();
  const [aiData] = useState({
    capacityOptimization: {
      suggestion: 'Convert Zone B to frozen storage - 40% higher demand',
      projectedRevenue: '+₹25,000/month'
    },
    energyOptimization: {
      suggestion: 'Reduce temperature by 2°C during night - save ₹8,000/month',
      impact: 'No quality loss'
    },
    clientPredictions: [
      { client: 'FreshMart', likelyToBook: '85%', suggestedDiscount: '5%' }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-cyan-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}!
            <span className="text-cyan-200 block text-xl mt-2">❄️ Storage Dashboard</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* AI Banner */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">🤖 AI Storage Optimizer</h2>
              <p className="opacity-90">Smart capacity and energy management</p>
            </div>
            <div className="text-4xl">⚡</div>
          </div>
        </div>

        {/* AI Capacity Optimization */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">📦 AI Capacity Suggestions</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <span className="text-green-600 mr-2">💡</span>
              <span className="font-semibold">Optimization Opportunity</span>
            </div>
            <p className="text-green-800 mb-2">{aiData.capacityOptimization.suggestion}</p>
            <div className="text-green-700 font-semibold">
              Projected: {aiData.capacityOptimization.projectedRevenue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageDashboard;