// components/OrganicFarmers.js
import React from 'react';

const OrganicFarmers = () => {
  const farmers = [
    {
      name: 'Rajesh Kumar',
      farm: 'Green Valley Organics',
      location: 'Punjab',
      crops: ['Organic Wheat', 'Basmati Rice'],
      rating: 4.9,
      image: '👨‍🌾',
      certified: true
    },
    {
      name: 'Priya Sharma',
      farm: 'Nature\'s Blessing Farm',
      location: 'Maharashtra',
      crops: ['Organic Vegetables', 'Herbs'],
      rating: 4.8,
      image: '👩‍🌾',
      certified: true
    },
    {
      name: 'Arun Patel',
      farm: 'Eco Harvest',
      location: 'Gujarat',
      crops: ['Organic Cotton', 'Groundnuts'],
      rating: 4.7,
      image: '👨‍🌾',
      certified: true
    }
  ];

  return (
    <section id="farmers" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Featured <span className="text-green-600">Organic Farmers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our certified organic farmers who are producing high-quality, sustainable crops
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farmers.map((farmer, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{farmer.image}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{farmer.name}</h3>
                    <p className="text-green-600 font-medium">{farmer.farm}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    {farmer.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🌾</span>
                    {farmer.crops.join(', ')}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="ml-1 font-semibold">{farmer.rating}</span>
                  </div>
                  {farmer.certified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      Certified Organic
                    </span>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganicFarmers;