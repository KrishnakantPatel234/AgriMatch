// components/VoiceInput.js
import React, { useState, useRef, useEffect } from 'react';

const VoiceInput = ({ onTextChange, placeholder = "Click to speak" }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState('');
  const [browserInfo, setBrowserInfo] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    checkBrowserSupport();
  }, []);

  const checkBrowserSupport = () => {
    // Check for browser support
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isEdge = /Edg/.test(navigator.userAgent);
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      setError('Voice input not supported in this browser. Please use Chrome or Edge.');
      setBrowserInfo('Unsupported Browser');
      return;
    }

    if (!isChrome && !isEdge) {
      setBrowserInfo('Works best in Chrome/Edge');
    }

    setIsSupported(true);
    initializeSpeechRecognition();
  };

  const initializeSpeechRecognition = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRefoustic = true;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError('');
        console.log('🎤 Speech recognition started');
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        console.log('🎤 Voice input:', transcript);
        
        if (event.results[0].isFinal) {
          onTextChange(transcript);
          setError('');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('🎤 Speech recognition error:', event.error);
        setIsListening(false);
        
        switch (event.error) {
          case 'not-allowed':
          case 'permission-denied':
            setError('Microphone permission denied. Please allow microphone access in browser settings.');
            setPermissionGranted(false);
            break;
          case 'no-speech':
            setError('No speech detected. Please try speaking again.');
            break;
          case 'audio-capture':
            setError('No microphone found. Please check your microphone connection.');
            break;
          case 'network':
            setError('Network error occurred during speech recognition.');
            break;
          default:
            setError('Speech recognition error. Please try again.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        console.log('🎤 Speech recognition ended');
      };

    } catch (err) {
      console.error('🎤 Error initializing speech recognition:', err);
      setIsSupported(false);
      setError('Failed to initialize voice input.');
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      console.log('🎤 Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false 
      });
      
      // Stop all tracks immediately after getting permission
      stream.getTracks().forEach(track => track.stop());
      
      setPermissionGranted(true);
      setError('');
      console.log('🎤 Microphone permission granted');
      return true;
    } catch (err) {
      console.error('🎤 Microphone permission denied:', err);
      setPermissionGranted(false);
      
      if (err.name === 'NotAllowedError') {
        setError('Microphone access blocked. Please allow microphone permissions in your browser settings and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please check if your microphone is connected properly.');
      } else {
        setError('Failed to access microphone. Please check your browser settings.');
      }
      return false;
    }
  };

  const startListening = async () => {
    if (!isSupported) {
      setError('Voice input not supported in this browser.');
      return;
    }

    // First request permission
    if (!permissionGranted) {
      const granted = await requestMicrophonePermission();
      if (!granted) return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error('🎤 Error starting speech recognition:', err);
      setError('Failed to start voice recognition. Please try again.');
    }
  };

  const stopListening = () => {
    try {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    } catch (err) {
      console.error('🎤 Error stopping speech recognition:', err);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // If not supported, show disabled button
  if (!isSupported) {
    return (
      <div className="relative">
        <button
          type="button"
          className="p-2 text-gray-400 cursor-not-allowed bg-gray-100 rounded-full"
          title="Voice input not supported"
          disabled
        >
          🎤
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
          Not supported
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleListening}
        className={`p-2 rounded-full transition-all duration-300 ${
          isListening 
            ? 'bg-red-100 text-red-600 animate-pulse shadow-lg border-2 border-red-400' 
            : permissionGranted 
              ? 'bg-green-100 text-green-600 hover:bg-green-200 hover:shadow-md border-2 border-green-400'
              : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border-2 border-yellow-400'
        }`}
        title={isListening ? "Listening... Click to stop" : "Click to speak"}
      >
        {isListening ? (
          <div className="flex items-center justify-center w-6 h-6">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
          </div>
        ) : (
          <span className="text-lg">🎤</span>
        )}
      </button>

      {/* Error Tooltip */}
      {error && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-50 max-w-xs shadow-lg">
          <div className="flex items-start space-x-2">
            <span className="text-base">⚠️</span>
            <div>
              <p className="font-semibold">Voice Input Error</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-red-500"></div>
        </div>
      )}

      {/* Listening Tooltip */}
      {isListening && !error && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-4 py-3 rounded-lg whitespace-nowrap z-50 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
            <div>
              <p className="font-semibold">Listening...</p>
              <p className="text-xs text-gray-300">Speak now</p>
            </div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}

      {/* Browser Info Tooltip */}
      {browserInfo && !isListening && !error && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
          {browserInfo}
        </div>
      )}
    </div>
  );
};

export default VoiceInput;