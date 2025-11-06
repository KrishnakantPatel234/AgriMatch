// components/VoiceInput.js
import React, { useState, useRef, useEffect } from 'react';

const VoiceInput = ({ onTextChange, disabled = false }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    // Initialize speech recognition
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'hi-IN'; // Hindi for Indian users

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTextChange(transcript);
      setIsListening(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access for voice input.');
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTextChange]);

  const startListening = () => {
    if (!isSupported || disabled) return;

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <button
        type="button"
        disabled
        className="p-2 text-gray-400 cursor-not-allowed"
        title="Voice input not supported"
      >
        🎤
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        className={`p-3 rounded-full transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse shadow-lg' 
            : 'bg-green-500 text-white hover:bg-green-600 shadow-md'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        title={isListening ? "Listening... Click to stop" : "Click to speak"}
      >
        {isListening ? (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full animate-ping mr-2"></div>
            🔴
          </div>
        ) : (
          '🎤'
        )}
      </button>

      {/* Voice Instructions */}
      {isListening && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap z-50">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>बोलिए... Speak now</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;