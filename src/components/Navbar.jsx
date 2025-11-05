import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, languages, changeLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    closeMenu();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl text-green-600">🌱</span>
            <span className="ml-2 text-xl font-bold text-green-800">AgriMatch</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* FIXED: Using Link instead of anchor tags */}
            <Link to="/farmers" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">
              {t('nav.farmers')}
            </Link>
            <Link to="/transport" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">
              {t('nav.transport')}
            </Link>
            <Link to="/cold-storage" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">
              {t('nav.coldStorage')}
            </Link>
            <Link to="/buyers" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">
              {t('nav.buyers')}
            </Link>
            
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300">
                <span>{languages[language].flag}</span>
                <span className="text-sm">{languages[language].name}</span>
                <span>▼</span>
              </button>
              
              {/* Language Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    className={`w-full text-left px-4 py-3 hover:bg-green-50 transition duration-200 flex items-center space-x-3 ${
                      language === code ? 'bg-green-50 text-green-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium transition duration-300">
                {t('nav.login')}
              </Link>
              <Link 
                to="/signup" 
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300 shadow-md"
              >
                {t('nav.signup')}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col space-y-1.5 w-6 h-6 justify-center items-center z-50"
            onClick={toggleMenu}
          >
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-500 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-500 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-500 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40">
            <div 
              className="fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-500"
              onClick={closeMenu}
            />
            
            <div className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-in-out">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-green-50">
                <Link to="/" className="flex items-center" onClick={closeMenu}>
                  <span className="text-2xl text-green-600">🌱</span>
                  <span className="ml-2 text-xl font-bold text-green-800">AgriMatch</span>
                </Link>
                <button onClick={closeMenu} className="p-2 rounded-lg hover:bg-green-100 transition duration-300">
                  ✕
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="p-6 h-full overflow-y-auto bg-white">
                <div className="space-y-8">
                  {/* Navigation Links - FIXED: Using Link */}
                  <div className="space-y-4">
                    <Link to="/farmers" className="block text-lg font-medium text-gray-700 hover:text-green-600 py-3 transition-all duration-300 hover:pl-4 hover:bg-green-50 rounded-lg" onClick={closeMenu}>
                      👨‍🌾 {t('nav.farmers')}
                    </Link>
                    <Link to="/transport" className="block text-lg font-medium text-gray-700 hover:text-green-600 py-3 transition-all duration-300 hover:pl-4 hover:bg-green-50 rounded-lg" onClick={closeMenu}>
                      🚚 {t('nav.transport')}
                    </Link>
                    <Link to="/cold-storage" className="block text-lg font-medium text-gray-700 hover:text-green-600 py-3 transition-all duration-300 hover:pl-4 hover:bg-green-50 rounded-lg" onClick={closeMenu}>
                      ❄️ {t('nav.coldStorage')}
                    </Link>
                    <Link to="/buyers" className="block text-lg font-medium text-gray-700 hover:text-green-600 py-3 transition-all duration-300 hover:pl-4 hover:bg-green-50 rounded-lg" onClick={closeMenu}>
                      👨‍💼 {t('nav.buyers')}
                    </Link>
                  </div>

                  {/* Language Selector */}
                  <div className="pt-6 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      🌐 भाषा / Language
                    </label>
                    <div className="space-y-2">
                      {Object.entries(languages).map(([code, lang]) => (
                        <button
                          key={code}
                          onClick={() => handleLanguageChange(code)}
                          className={`w-full text-left px-4 py-3 rounded-lg border transition duration-200 flex items-center space-x-3 ${
                            language === code 
                              ? 'bg-green-100 border-green-500 text-green-700' 
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Auth Buttons */}
                  <div className="pt-6 border-t border-gray-200 space-y-4">
                    <Link to="/login" className="block w-full text-green-600 hover:text-green-700 font-medium py-3 text-lg transition-all duration-300 hover:bg-green-50 rounded-lg border-2 border-green-600 text-center" onClick={closeMenu}>
                      🔑 {t('nav.login')}
                    </Link>
                    <Link to="/signup" className="block w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 shadow-lg text-lg hover:shadow-xl text-center" onClick={closeMenu}>
                      ✨ {t('nav.signup')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;