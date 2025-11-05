// components/Features.js
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: '🤝',
      titleKey: 'features.matching',
      descKey: 'features.matchingDesc'
    },
    {
      icon: '💸',
      titleKey: 'features.pricing',
      descKey: 'features.pricingDesc'
    },
    {
      icon: '🚚',
      titleKey: 'features.logistics',
      descKey: 'features.logisticsDesc'
    },
    {
      icon: '📊',
      titleKey: 'features.insights',
      descKey: 'features.insightsDesc'
    },
    {
      icon: '⭐',
      titleKey: 'features.rating',
      descKey: 'features.ratingDesc'
    },
    {
      icon: '🔒',
      titleKey: 'features.payments',
      descKey: 'features.paymentsDesc'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('features.subtitle')}
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
                {t(feature.titleKey)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;