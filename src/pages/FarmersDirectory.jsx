import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PostsFeed from '../components/PostsFeed';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FarmersDirectory = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [refresh, setRefresh] = useState(false);

  const translations = {
    en: {
      title: "Farmers Marketplace",
      description: "Connect directly with farmers and buy fresh produce",
      searchPlaceholder: "Search for crops, vegetables, fruits...",
      categoryPlaceholder: "All Categories",
      locationPlaceholder: "Any Location",
      search: "Search",
      reset: "Reset Filters"
    },
    hi: {
      title: "किसान मार्केटप्लेस",
      description: "सीधे किसानों से जुड़ें और ताजा उपज खरीदें",
      searchPlaceholder: "फसलें, सब्जियां, फल खोजें...",
      categoryPlaceholder: "सभी श्रेणियां",
      locationPlaceholder: "कोई भी स्थान",
      search: "खोजें",
      reset: "फिल्टर रीसेट करें"
    },
    mr: {
      title: "शेतकरी मार्केटप्लेस",
      description: "थेट शेतकऱ्यांशी जोडा आणि ताजी उत्पादने खरेदी करा",
      searchPlaceholder: "पिके, भाज्या, फळे शोधा...",
      categoryPlaceholder: "सर्व वर्ग",
      locationPlaceholder: "कोणतेही स्थान",
      search: "शोधा",
      reset: "फिल्टर रीसेट करा"
    }
  };

  const t = translations[language] || translations.en;

  const handleSearch = (e) => {
    e.preventDefault();
    setRefresh(!refresh);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCategory('');
    setLocation('');
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-green-100">{t.description}</p>
        </div>
      </div>

      {/* Search Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">{t.categoryPlaceholder}</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains</option>
                <option value="spices">Spices</option>
                <option value="organic">Organic</option>
              </select>
            </div>
            
            <div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.locationPlaceholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
              >
                {t.search}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
              >
                {t.reset}
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <PostsFeed userType="all" refresh={refresh} />
      </div>
    </div>
  );
};

export default FarmersDirectory;