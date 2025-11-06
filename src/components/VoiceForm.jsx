// components/VoiceForm.js
import React, { useState } from 'react';
import VoiceInput from './VoiceInput';

const VoiceForm = ({ fields, onSubmit, title }) => {
  const [formData, setFormData] = useState({});
  const [currentField, setCurrentField] = useState(0);

  const handleVoiceInput = (text) => {
    const fieldName = fields[currentField].name;
    setFormData(prev => ({
      ...prev,
      [fieldName]: text
    }));

    // Move to next field or submit
    if (currentField < fields.length - 1) {
      setCurrentField(currentField + 1);
    } else {
      onSubmit(formData);
    }
  };

  const speakInstruction = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN'; // Hindi
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.name} className={`p-4 rounded-lg border-2 ${
            index === currentField ? 'border-green-500 bg-green-50' : 'border-gray-200'
          }`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            
            <div className="flex items-center space-x-3">
              <input
                type={field.type || 'text'}
                value={formData[field.name] || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  [field.name]: e.target.value
                }))}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={field.placeholder}
              />
              
              <VoiceInput 
                onTextChange={handleVoiceInput}
                disabled={index !== currentField}
              />
              
              <button
                type="button"
                onClick={() => speakInstruction(field.voiceInstruction)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                🔊
              </button>
            </div>

            {index === currentField && (
              <p className="text-sm text-green-600 mt-2">
                👆 माइक्रोफोन बटन दबाएं और बोलें | Press microphone and speak
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentField(Math.max(0, currentField - 1))}
          disabled={currentField === 0}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
        >
          पिछला | Previous
        </button>
        
        <button
          type="button"
          onClick={() => onSubmit(formData)}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          भेजें | Submit
        </button>
      </div>
    </div>
  );
};

export default VoiceForm;