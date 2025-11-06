// components/LanguageSelector.js
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { changeLanguage, languages } = useLanguage();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has already selected language
    const hasSelectedLanguage = localStorage.getItem('agrimatch-language');
    if (!hasSelectedLanguage) {
      setShowPopup(true);
    }
  }, []);

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    localStorage.setItem('agrimatch-language-selected', 'true');
    setShowPopup(false);
    
    // Welcome message in selected language
    speakWelcomeMessage(langCode);
  };

  const speakWelcomeMessage = (langCode) => {
    const messages = {
      en: "Welcome to AgriMatch! We're happy to help you connect with farmers and buyers.",
      hi: "AgriMatch में आपका स्वागत है! हम आपको किसानों और खरीदारों से जोड़ने में मदद करेंगे।",
      mr: "AgriMatch मध्ये आपले स्वागत आहे! आम्ही आपल्याला शेतकऱ्यांना आणि खरेदीदारांशी जोडण्यास मदत करू."
    };
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(messages[langCode]);
      utterance.lang = langCode === 'en' ? 'en-US' : 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🌍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            भाषा चुनें | Choose Language
          </h2>
          <p className="text-gray-600">
            कृपया अपनी पसंदीदा भाषा चुनें | Please select your preferred language
          </p>
        </div>

        <div className="space-y-3">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => handleLanguageSelect(code)}
              className="w-full flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-500 transition duration-200"
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <div className="font-semibold text-gray-800">{lang.name}</div>
                <div className="text-sm text-gray-600">
                  {code === 'en' && 'English'}
                  {code === 'hi' && 'हिन्दी - Hindi'}
                  {code === 'mr' && 'मराठी - Marathi'}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            आप बाद में सेटिंग्स में भाषा बदल सकते हैं | You can change language later in settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;