// components/Features.js
import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '🤝',
      title: 'Smart Matching',
      description: 'AI-powered matching connects farmers with the most suitable buyers and service providers'
    },
    {
      icon: '💸',
      title: 'Fair Pricing',
      description: 'Transparent pricing without middlemen, ensuring farmers get what they deserve'
    },
    {
      icon: '🚚',
      title: 'Logistics Support',
      description: 'Integrated transport and cold storage solutions for seamless delivery'
    },
    {
      icon: '📊',
      title: 'Market Insights',
      description: 'Real-time market data and trends to help make informed decisions'
    },
    {
      icon: '⭐',
      title: 'Rating System',
      description: 'Trust-based rating system for all stakeholders in the ecosystem'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Safe and secure payment gateway with multiple payment options'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-green-600">AgriMatch</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive solutions to transform agricultural supply chains and empower farming communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-green-50 rounded-xl p-6 hover:shadow-lg transition duration-300 border border-green-100 group hover:bg-white"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;    