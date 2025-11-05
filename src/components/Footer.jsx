// components/Footer.js
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl text-green-400">🌱</span>
              <span className="ml-2 text-xl font-bold">AgriMatch</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-green-400 transition duration-300">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition duration-300">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition duration-300">
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><a href="#farmers" className="text-gray-300 hover:text-green-400 transition duration-300">{t('nav.farmers')}</a></li>
              <li><a href="#buyers" className="text-gray-300 hover:text-green-400 transition duration-300">{t('nav.buyers')}</a></li>
              <li><a href="#transport" className="text-gray-300 hover:text-green-400 transition duration-300">{t('nav.transport')}</a></li>
              <li><a href="#cold-storage" className="text-gray-300 hover:text-green-400 transition duration-300">{t('nav.coldStorage')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition duration-300">{t('footer.contact')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition duration-300">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <span className="mr-2">📧</span>
                <span>support@agrimatch.com</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+91 1800-AGR-HELP</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 AgriMatch. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;