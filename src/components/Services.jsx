// components/Services.js
import React from 'react';

const Services = () => {
  const services = [
    {
      category: 'Top Rated Farmers',
      icon: '👨‍🌾',
      items: [
        { name: 'Suresh Reddy', rating: 5.0, specialty: 'Vegetables' },
        { name: 'Meena Patel', rating: 4.9, specialty: 'Fruits' },
        { name: 'Amit Singh', rating: 4.9, specialty: 'Grains' }
      ]
    },
    {
      category: 'Transport Partners',
      icon: '🚚',
      items: [
        { name: 'Swift Logistics', rating: 4.8, specialty: 'Refrigerated' },
        { name: 'Green Transport', rating: 4.7, specialty: 'Pan India' },
        { name: 'Agri Movers', rating: 4.8, specialty: 'Express' }
      ]
    },
    {
      category: 'Cold Storage',
      icon: '❄️',
      items: [
        { name: 'FreshKeep Storage', rating: 4.8, specialty: '2000 Tons' },
        { name: 'CoolChain Solutions', rating: 4.9, specialty: 'Automated' },
        { name: 'AgriCold Units', rating: 4.7, specialty: 'Multi-city' }
      ]
    },
    {
      category: 'Verified Buyers',
      icon: '👨‍💼',
      items: [
        { name: 'Organic Mart', rating: 4.9, specialty: 'Retail Chain' },
        { name: 'FreshDirect', rating: 4.8, specialty: 'Export Quality' },
        { name: 'Local Bazaar', rating: 4.7, specialty: 'Local Markets' }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-green-600">Ecosystem</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with trusted partners across the agricultural value chain
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-green-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800">{service.category}</h3>
              </div>
              
              <div className="space-y-4">
                {service.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.specialty}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="font-semibold">{item.rating}</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition duration-300">
                      Connect Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;