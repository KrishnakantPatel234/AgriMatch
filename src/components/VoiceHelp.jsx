// components/VoiceHelp.js
import React, { useState } from 'react';

const VoiceHelp = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-blue-800 flex items-center">
          🎤 Voice Input Help
        </h3>
        <button className="text-blue-600 hover:text-blue-800">
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-3 text-sm text-blue-700 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-2">✅ Supported Browsers:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Google Chrome (Best)</li>
                <li>Microsoft Edge</li>
                <li>Safari (Limited)</li>
              </ul>
            </div>
            
            <div>
              <p className="font-semibold mb-2">🔧 If it doesn't work:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Allow microphone permissions when prompted</li>
                <li>Check browser settings for microphone access</li>
                <li>Ensure microphone is connected and working</li>
                <li>Speak clearly and slowly</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded border border-blue-300">
            <p className="font-semibold text-red-600 mb-1">⚠️ Important:</p>
            <p>Voice input works only on <strong>HTTPS</strong> or <strong>localhost</strong>. 
            For production, your site must use HTTPS.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceHelp;