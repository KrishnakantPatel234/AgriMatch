// pages/Dashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Please log in to view dashboard</p>
          <Link to="/login" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            {t('nav.login')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl text-green-600">🌱</span>
            <span className="ml-2 text-xl font-bold text-green-800">AgriMatch</span>
          </div>
          <div className="flex items-center space-x-4">
            <img 
              src={user.profileImage} 
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700">{user.name}</span>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              {t('common.logout')}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('common.welcome')}, {user.name}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('common.profile')}</h3>
            <p className="text-gray-600">{t('common.completeProfile')}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('common.matches')}</h3>
            <p className="text-gray-600">{t('common.viewMatches')}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('common.messages')}</h3>
            <p className="text-gray-600">{t('common.checkMessages')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;