// pages/dashboard/TransportDashboard.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const TransportDashboard = () => {
  const { user } = useAuth();
  const [aiData] = useState({
    routeOptimization: {
      currentRoute: 'Mumbai → Pune → Mumbai',
      optimizedRoute: 'Mumbai → Pune → Nashik → Mumbai',
      savings: '₹2,500',
      timeSaved: '3 hours'
    },
    loadMatching: [
      { from: 'Pune', to: 'Mumbai', weight: '2 tons', match: '95%' }
    ],
    maintenancePredictions: [
      { vehicle: 'Truck MH-12-AB-1234', issue: 'Brake pads', urgency: 'medium', predictedDate: '15 days' }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}!
            <span className="text-blue-200 block text-xl mt-2">🚚 Transport Dashboard</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* AI Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">🤖 AI Logistics Optimizer</h2>
              <p className="opacity-90">Smart routing and vehicle management</p>
            </div>
            <div className="text-4xl">🗺️</div>
          </div>
        </div>

        {/* AI Route Optimization */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">🗺️ AI Route Optimization</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Current Route</h4>
              <p className="text-red-700">{aiData.routeOptimization.currentRoute}</p>
              <div className="text-sm text-red-600 mt-2">Inefficient return trip</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">AI Optimized Route</h4>
              <p className="text-green-700">{aiData.routeOptimization.optimizedRoute}</p>
              <div className="text-sm text-green-600 mt-2">
                Save {aiData.routeOptimization.savings} • {aiData.routeOptimization.timeSaved} saved
              </div>
            </div>
          </div>
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Apply AI Optimization
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransportDashboard;