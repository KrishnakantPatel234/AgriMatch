import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const OrganicFarmers = () => {
  const { t } = useLanguage();

  // Sample farmer data
  const farmers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      experience: "8 years",
      location: "Nashik, Maharashtra",
      crops: ["Tomatoes", "Potatoes", "Spinach"],
      rating: 4.8,
      certified: true,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=150"
    },
    {
      id: 2,
      name: "Priya Sharma",
      experience: "5 years",
      location: "Pune, Maharashtra", 
      crops: ["Rice", "Wheat", "Pulses"],
      rating: 4.9,
      certified: true,
      image: "https://images.unsplash.com/photo-1593115077063-4ec76b1b7763?w=150"
    }
  ];

  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t('organicFarmers.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('organicFarmers.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farmers.map((farmer) => (
            <div key={farmer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={farmer.image} 
                    alt={farmer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{farmer.name}</h3>
                    {farmer.certified && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {t('organicFarmers.certified')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">{t('organicFarmers.experience')}:</span>
                    <span>{farmer.experience}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">{t('organicFarmers.location')}:</span>
                    <span>{farmer.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">{t('organicFarmers.crops')}:</span>
                    <span>{farmer.crops.join(', ')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">{t('organicFarmers.rating')}:</span>
                    <span className="text-yellow-500">⭐ {farmer.rating}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 text-sm">
                    {t('organicFarmers.contact')}
                  </button>
                  <button className="flex-1 border border-green-600 text-green-600 py-2 px-4 rounded-md hover:bg-green-50 transition duration-200 text-sm">
                    {t('organicFarmers.viewProfile')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganicFarmers;