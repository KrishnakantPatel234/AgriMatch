// components/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Connecting 
              <span className="text-green-600"> Farmers </span>
              with 
              <span className="text-green-600"> Opportunities</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              AgriMatch bridges the gap between local farmers and potential buyers, investors, 
              and service providers. Empower your agricultural journey with direct market access, 
              reliable transport, cold storage solutions, and fair pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105">
                Join as Farmer
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 hover:text-white transition duration-300">
                Join as Buyer
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-green-600">5000+</div>
                <div className="text-gray-600">Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-green-600">1000+</div>
                <div className="text-gray-600">Buyers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-green-600">50+</div>
                <div className="text-gray-600">Cities</div>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="bg-green-200 rounded-2xl p-8 transform rotate-3">
                <div className="bg-white rounded-xl p-6 shadow-2xl transform -rotate-3">
                  <div className="text-center">
                    <span className="text-6xl">🌾</span>
                    <h3 className="text-xl font-semibold text-gray-800 mt-4">Direct Farmer-Buyer Connection</h3>
                    <p className="text-gray-600 mt-2">No middlemen, better prices</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-yellow-100 rounded-full p-4 shadow-lg">
                <span className="text-2xl">🚚</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-100 rounded-full p-4 shadow-lg">
                <span className="text-2xl">❄️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;