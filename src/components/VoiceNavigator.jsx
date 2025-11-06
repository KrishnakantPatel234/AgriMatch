// components/VoiceNavigator.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceNavigator = () => {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'hi-IN';

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
  }, [isListening]);

  const handleVoiceCommand = (command) => {
    console.log('Voice command:', command);
    
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
    else if (command.includes('login') || command.includes('लॉगिन')) {
      navigate('/login');
      speakFeedback('लॉगिन पेज खोल रहा हूं');
    }
    else if (command.includes('signup') || command.includes('साइन अप')) {
      navigate('/signup');
      speakFeedback('साइन अप पेज खोल रहा हूं');
    }
    else if (command.includes('help') || command.includes('मदद')) {
      speakHelp();
    }
  };

  const speakFeedback = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
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