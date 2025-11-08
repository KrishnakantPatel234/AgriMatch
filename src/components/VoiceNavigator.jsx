// components/VoiceNavigator.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const VoiceNavigator = () => {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const getLangCode = (lang) => ({ en: 'en-US', hi: 'hi-IN', mr: 'mr-IN' }[lang] || 'en-US');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = getLangCode(language);

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      handleVoiceCommand(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, language]);

  const clickPrimarySubmit = () => {
    const submit = document.querySelector('button[type="submit"], .btn-primary, [data-primary="true"]');
    submit?.click();
  };

  const handleVoiceCommand = (command) => {
    const cmd = command.toLowerCase();
    console.log('Voice command:', cmd);
    
    // Navigation commands
    if (command.includes('home') || command.includes('घर')) {
      navigate('/');
      speakFeedback('होम पेज खोल रहा हूं');
    }
    else if (command.includes('farmers') || command.includes('किसान')) {
      navigate('/farmers');
      speakFeedback('किसानों की सूची दिखा रहा हूं');
    }
    else if (command.includes('buyers') || command.includes('खरीदार')) {
      navigate('/buyers');
      speakFeedback('खरीदारों की सूची दिखा रहा हूं');
    }
    else if (command.includes('transport') || command.includes('परिवहन')) {
      navigate('/transport');
      speakFeedback('परिवहन सेवाएं दिखा रहा हूं');
    }
    else if (command.includes('storage') || command.includes('भंडारण')) {
      navigate('/cold-storage');
      speakFeedback('कोल्ड स्टोरेज दिखा रहा हूं');
    }
    else if (cmd.includes('login') || cmd.includes('लॉगिन') || cmd.includes('sign in')) {
      navigate('/login');
      speakFeedback('लॉगिन पेज खोल रहा हूं');
    }
    else if (cmd.includes('signup') || cmd.includes('साइन अप') || cmd.includes('register')) {
      navigate('/signup');
      speakFeedback('साइन अप पेज खोल रहा हूं');
    }
    else if (cmd.includes('submit') || cmd.includes('जमा') || cmd.includes('भेजो')) {
      clickPrimarySubmit();
      speakFeedback('फॉर्म सबमिट कर रहा हूं');
    }
    else if (cmd.includes('logout') || cmd.includes('लॉग आउट')) {
      const logoutBtn = Array.from(document.querySelectorAll('button, a'))
        .find(el => /logout|लॉग आउट/i.test(el.textContent || ''));
      logoutBtn?.click();
      speakFeedback('लॉग आउट कर रहा हूं');
    }
    else if (cmd.includes('help') || cmd.includes('मदद')) {
      speakHelp();
    }
  };

  const speakFeedback = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLangCode(language);
      speechSynthesis.speak(utterance);
    }
  };

  const speakHelp = () => {
    const helpText = `
      आप इन कमांड्स का उपयोग कर सकते हैं:
      होम या घर - होम पेज के लिए
      किसान - किसानों की सूची देखने के लिए
      खरीदार - खरीदारों की सूची देखने के लिए
      परिवहन - परिवहन सेवाओं के लिए
      भंडारण - कोल्ड स्टोरेज के लिए
      लॉगिन - लॉगिन पेज के लिए
      साइन अप - नया अकाउंट बनाने के लिए
    `;
    speakFeedback(helpText);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        onClick={() => setIsListening(!isListening)}
        className={`p-4 rounded-full shadow-lg transition duration-300 ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        {isListening ? '🔴 Voice Active' : '🎤 Voice Command'}
      </button>
      
      {isListening && (
        <div className="absolute bottom-full mb-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm">
          बोलिए... मैं सुन रहा हूं
        </div>
      )}
    </div>
  );
};

export default VoiceNavigator;