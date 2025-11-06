import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t('common.welcome')}, {user?.name}!
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Profile Card */}
            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('common.profile')}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <img 
                    src={user?.profilePicture} 
                    alt={user?.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                    <p className="text-sm text-green-600 capitalize">{user?.role}</p>
                  </div>
                </div>
                
                {user?.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Phone: {user.phone}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-600">
                    Member since: {new Date(user?.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left hover:bg-gray-50 transition duration-200">
                  <p className="font-medium text-gray-900">{t('common.completeProfile')}</p>
                </button>
                
                <button className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left hover:bg-gray-50 transition duration-200">
                  <p className="font-medium text-gray-900">{t('common.viewMatches')}</p>
                </button>
                
                <button className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left hover:bg-gray-50 transition duration-200">
                  <p className="font-medium text-gray-900">{t('common.checkMessages')}</p>
                </button>
              </div>
            </div>
          </div>

          {/* User Data Display */}
          <div className="mt-6 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Account Information
            </h3>
            <pre className="bg-white p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;