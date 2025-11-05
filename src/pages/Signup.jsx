// pages/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VoiceInput from '../components/VoiceInput';
import { useLanguage } from '../context/LanguageContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userType: 'farmer',
    password: '',
    confirmPassword: ''
  });
  const { t } = useLanguage();

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-4xl text-green-600">🌱</span>
            <span className="ml-3 text-3xl font-bold text-green-800">AgriMatch</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {t('auth.signup.title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('auth.signup.orContinue')}{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
              {t('auth.signup.existingAccount')}
            </Link>
          </p>
        </div>

        {/* Signup Form */}
        <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.signup.fullName')}
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={t('auth.placeholders.enterFullName')}
                />
                <div className="absolute right-3 top-3">
                  <VoiceInput 
                    onTextChange={(text) => handleChange('fullName', text)}
                    placeholder={t('auth.voice.sayFullName')}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.signup.email')}
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={t('auth.placeholders.enterEmail')}
                />
                <div className="absolute right-3 top-3">
                  <VoiceInput 
                    onTextChange={(text) => handleChange('email', text)}
                    placeholder={t('auth.voice.sayEmail')}
                  />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.signup.phone')}
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={t('auth.placeholders.enterPhone')}
                />
                <div className="absolute right-3 top-3">
                  <VoiceInput 
                    onTextChange={(text) => handleChange('phone', text)}
                    placeholder={t('auth.voice.sayPhone')}
                  />
                </div>
              </div>
            </div>

            {/* User Type */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.signup.userType')}
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={(e) => handleChange('userType', e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="farmer">👨‍🌾 {t('auth.signup.userTypes.farmer')}</option>
                <option value="buyer">👨‍💼 {t('auth.signup.userTypes.buyer')}</option>
                <option value="transporter">🚚 {t('auth.signup.userTypes.transporter')}</option>
                <option value="storage">❄️ {t('auth.signup.userTypes.storage')}</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.signup.password')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={t('auth.placeholders.createPassword')}
                />
                <div className="absolute right-3 top-3">
                  <VoiceInput 
                    onTextChange={(text) => handleChange('password', text)}
                    placeholder={t('auth.voice.sayPassword')}
                  />
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.signup.confirmPassword')}
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={t('auth.placeholders.confirmPassword')}
                />
                <div className="absolute right-3 top-3">
                  <VoiceInput 
                    onTextChange={(text) => handleChange('confirmPassword', text)}
                    placeholder={t('auth.voice.sayPassword')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              {t('auth.signup.terms')}
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 transform hover:scale-105"
            >
              {t('auth.signup.createAccount')}
            </button>
          </div>
        </form>

        {/* Voice Assistance Info */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('auth.signup.voiceHelp')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;