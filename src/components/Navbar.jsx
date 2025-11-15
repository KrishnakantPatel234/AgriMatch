import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { language, languages, changeLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    closeMenu();
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
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

            {/* --- NEW MARKETPLACE LINK --- */}
            <Link
              to="/marketplace"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              🛒 Marketplace
            </Link>

            {/* Farmers Directory */}
            <Link to="/farmers" className="text-gray-700 hover:text-green-600 font-medium transition">
              👨‍🌾 {t('nav.farmers')}
            </Link>

            {/* Buyers */}
            <Link to="/buyers" className="text-gray-700 hover:text-green-600 font-medium transition">
              👨‍💼 {t('nav.buyers')}
            </Link>

            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
                <span>{languages[language].flag}</span>
                <span className="text-sm">{languages[language].name}</span>
                <span>▼</span>
              </button>

              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    className={`w-full px-4 py-3 flex items-center space-x-3 text-left hover:bg-green-50 ${
                      language === code ? "bg-green-50 text-green-600" : "text-gray-700"
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile */}
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <img
                    src={user.profilePicture || "https://i.pravatar.cc/300"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-green-500"
                  />

                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-green-600 capitalize">{user.role}</p>
                  </div>

                  <span className="text-gray-600">▼</span>
                </button>

                {/* Profile Dropdown */}
                <div
                  className={`absolute top-full right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg transition ${
                    isProfileOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <div className="p-4 border-b">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>

                  <div className="p-2">

                    {/* --- NEW DASHBOARD LINK --- */}
                    <Link
                      to={`/dashboard/${user.role}`}
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      📊 Dashboard
                    </Link>

                  </div>

                  <div className="p-2 border-t">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 shadow-md"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col space-y-1.5 w-6 h-6 justify-center"
            onClick={toggleMenu}
          >
            <span className={`w-6 h-0.5 bg-gray-700 transition ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>

        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg p-6 space-y-6">

            {/* --- NEW MARKETPLACE MOBILE LINK --- */}
            <Link to="/marketplace" onClick={closeMenu} className="block text-lg py-2">
              🛒 Marketplace
            </Link>

            <Link to="/farmers" onClick={closeMenu} className="block text-lg py-2">
              👨‍🌾 {t('nav.farmers')}
            </Link>

            <Link to="/transport" onClick={closeMenu} className="block text-lg py-2">
              🚚 {t('nav.transport')}
            </Link>

            <Link to="/cold-storage" onClick={closeMenu} className="block text-lg py-2">
              ❄️ {t('nav.coldStorage')}
            </Link>

            <Link to="/buyers" onClick={closeMenu} className="block text-lg py-2">
              👨‍💼 {t('nav.buyers')}
            </Link>

            {user && (
              <Link
                to={`/dashboard/${user.role}`}
                onClick={closeMenu}
                className="block text-lg py-2"
              >
                📊 Dashboard
              </Link>
            )}

            {!user ? (
              <>
                <Link to="/login" onClick={closeMenu} className="block text-lg text-green-600 py-2">
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="block text-lg bg-green-600 text-white py-2 rounded-lg text-center"
                >
                  {t('nav.signup')}
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600 py-2 text-lg"
              >
                🚪 Logout
              </button>
            )}

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
