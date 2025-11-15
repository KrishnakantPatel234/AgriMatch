import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-green-400 mb-4">AgriMatch</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-green-400 transition duration-200">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition duration-200">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition duration-200">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition duration-200">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-green-400 transition duration-200">{t('footer.home')}</Link></li>
              <li><Link to="/farmers" className="text-gray-300 hover:text-green-400 transition duration-200">{t('footer.farmers')}</Link></li>
              <li><Link to="/buyers" className="text-gray-300 hover:text-green-400 transition duration-200">{t('footer.buyers')}</Link></li>
              <li><Link to="/transport" className="text-gray-300 hover:text-green-400 transition duration-200">{t('footer.transport')}</Link></li>
              <li><Link to="/storage" className="text-gray-300 hover:text-green-400 transition duration-200">{t('footer.storage')}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition duration-200">{t('footer.help')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition duration-200">{t('footer.contact')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition duration-200">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition duration-200">{t('footer.terms')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition duration-200">{t('footer.faq')}</a></li>
            </ul>
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