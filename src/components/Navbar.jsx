// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="transparent backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl text-green-600">🌱</span>
            <Link to='/' className="ml-2 text-xl font-bold text-green-800">AgriMatch</Link>
            {/* <span className="ml-2 text-xl font-bold text-green-800">AgriMatch</span> */}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#farmers" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">Farmers</a>
            <a href="#transport" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">Transport</a>
            <a href="#cold-storage" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">Cold Storage</a>
            <a href="#buyers" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">Buyers</a>
            
            {/* Language Selector */}
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="EN">English</option>
              <option value="HI">Hindi</option>
              <option value="TE">Telugu</option>
              <option value="TA">Tamil</option>
            </select>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
                <Link to="/login" className="text-green-600 hover:text-green-700 font-medium transition duration-300">
                    Login
                </Link>
                <Link 
                    to="/signup" 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300 shadow-md"
                >
                    Sign Up
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

        {/* Mobile Menu Overlay and Sidebar - Only render when menu is open */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40">
            {/* Semi-transparent Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-500"
              onClick={closeMenu}
            />
            
            {/* Sidebar */}
            <div 
              className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-in-out"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-green-50">
                <div className="flex items-center">
                  <span className="text-2xl text-green-600">🌱</span>
                  <span className="ml-2 text-xl font-bold text-green-800">AgriMatch</span>
                </div>
                <button 
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-green-100 transition duration-300"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="p-6 h-full overflow-y-auto bg-white">
                <div className="space-y-8">
                  {/* Navigation Links */}
                  <div className="space-y-4">
                    <a 
                      href="#farmers" 
                      className="block text-lg font-medium text-gray-700 hover:text-green-600 py-3 transition-all duration-300 hover:pl-4 hover:bg-green-50 rounded-lg"
                      onClick={closeMenu}
                    >
                      👨‍🌾 Farmers
                    </a>
                    <a 
                      href="#transport" 
                      className="block text-lg font-medium text-gray-700 hover:text-green-600 py-3 transition-all duration-300 hover:pl-4 hover:bg-green-50 rounded-lg"
                      onClick={closeMenu}
                    >
                      🚚 Transport
                    </a>
                    <a 
                      href="#cold-storage" 
                      className="block text-lg font-medium text-gray-700 hover:text-green-600 py-3 transition-all duration-300 hover:pl-4 hover:bg-green-50 rounded-lg"
                      onClick={closeMenu}
                    >
                      ❄️ Cold Storage
                    </a>
                    <a 
                      href="#buyers" 
                      className="block text-lg font-medium text-gray-700 hover:text-green-600 py-3 transition-all duration-300 hover:pl-4 hover:bg-green-50 rounded-lg"
                      onClick={closeMenu}
                    >
                      👨‍💼 Buyers
                    </a>
                  </div>

                  {/* Language Selector */}
                  <div className="pt-6 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      🌐 Language
                    </label>
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                    >
                      <option value="EN">English</option>
                      <option value="HI">Hindi</option>
                      <option value="TE">Telugu</option>
                      <option value="TA">Tamil</option>
                    </select>
                  </div>

                  {/* Auth Buttons */}
                  <div className="pt-6 border-t border-gray-200 space-y-4">
                    <button 
                      className="w-full text-green-600 hover:text-green-700 font-medium py-3 text-lg transition-all duration-300 hover:bg-green-50 rounded-lg border-2 border-green-600"
                      onClick={closeMenu}
                    >
                      Login
                    </button>
                    <button 
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 shadow-lg text-lg hover:shadow-xl"
                      onClick={closeMenu}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Additional Info */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600 space-y-3">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span className="mr-3 text-lg">📞</span>
                        <span>+91 1800-AGR-HELP</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span className="mr-3 text-lg">📧</span>
                        <span>support@agrimatch.com</span>
                      </div>
                    </div>
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