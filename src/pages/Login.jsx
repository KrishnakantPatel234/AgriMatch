import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { FaUser, FaLock, FaMicrophone, FaStop, FaPlay } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState(null);
  
  const { login, user } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Get appropriate language code for speech recognition
  const getLanguageCode = (lang) => {
    const codes = { en: 'en-US', hi: 'hi-IN', mr: 'mr-IN' };
    return codes[lang] || 'en-US';
  };

  const voiceRecognition = useVoiceRecognition(getLanguageCode(language));

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  // Update form field with voice transcript
  useEffect(() => {
    if (voiceRecognition.transcript && activeVoiceField) {
      setFormData(prev => ({
        ...prev,
        [activeVoiceField]: voiceRecognition.transcript
      }));
      toast.success('Voice input captured!');
      setActiveVoiceField(null);
    }
  }, [voiceRecognition.transcript, activeVoiceField]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const result = await login(formData);
      if (result.success) {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = (fieldName) => {
    if (voiceRecognition.isListening && activeVoiceField === fieldName) {
      voiceRecognition.stopListening();
      setActiveVoiceField(null);
      toast.info('Voice input stopped');
    } else {
      setActiveVoiceField(fieldName);
      voiceRecognition.startListening();
      toast.info(`Speak your ${fieldName} now...`);
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Google sign-in will be implemented soon!');
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@agrimatch.com',
      password: 'demo123'
    });
    toast.info('Demo credentials filled. Click Login to continue.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-green-600 py-6 px-8">
          <h2 className="text-center text-3xl font-bold text-white">
            {t('auth.login.title')}
          </h2>
          <p className="mt-2 text-center text-green-100">
            {t('auth.login.createAccount')}{' '}
            <Link to="/signup" className="font-semibold underline hover:text-white">
              {t('nav.signup')}
            </Link>
          </p>
        </div>
        
        <div className="py-8 px-8">
          {/* Voice Help Text */}
          {voiceRecognition.isSupported && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                🎤 {t('auth.login.voiceHelp')}
              </p>
            </div>
          )}

          {/* Voice Not Supported Warning */}
          {!voiceRecognition.isSupported && (
            <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-700 text-center">
                ⚠️ Voice input not supported in your browser. Try Chrome or Edge.
              </p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.login.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  placeholder={t('auth.placeholders.enterEmail')}
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('email')}
                    disabled={!voiceRecognition.isSupported}
                    className={`p-2 rounded-full transition duration-200 ${
                      voiceRecognition.isListening && activeVoiceField === 'email'
                        ? 'bg-red-100 text-red-600 animate-pulse'
                        : voiceRecognition.isSupported
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    title={voiceRecognition.isSupported ? t('auth.voice.sayEmail') : 'Voice not supported'}
                  >
                    {voiceRecognition.isListening && activeVoiceField === 'email' ? (
                      <FaStop className="h-4 w-4" />
                    ) : (
                      <FaMicrophone className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  placeholder={t('auth.placeholders.enterPassword')}
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('password')}
                    disabled={!voiceRecognition.isSupported}
                    className={`p-2 rounded-full transition duration-200 ${
                      voiceRecognition.isListening && activeVoiceField === 'password'
                        ? 'bg-red-100 text-red-600 animate-pulse'
                        : voiceRecognition.isSupported
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    title={voiceRecognition.isSupported ? t('auth.voice.sayPassword') : 'Voice not supported'}
                  >
                    {voiceRecognition.isListening && activeVoiceField === 'password' ? (
                      <FaStop className="h-4 w-4" />
                    ) : (
                      <FaMicrophone className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Voice Listening Indicator */}
            {voiceRecognition.isListening && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-pulse">
                    <FaPlay className="h-4 w-4 text-yellow-600" />
                  </div>
                  <p className="text-sm text-yellow-700">
                    Listening for {activeVoiceField}... Speak now!
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {t('auth.login.remember')}
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500 transition duration-200">
                  {t('auth.login.forgotPassword')}
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-105"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('common.loading')}
                  </span>
                ) : (
                  t('auth.login.signin')
                )}
              </button>

              {/* Demo Login Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
              >
                Try Demo Account
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t('auth.login.orContinue')}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
                >
                  <FcGoogle className="w-5 h-5 mr-2" />
                  {t('auth.login.google')}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-green-600 hover:text-green-500 transition duration-200"
              >
                {t('nav.signup')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;