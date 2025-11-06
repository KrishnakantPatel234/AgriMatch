// components/VoicePostCreator.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import VoiceForm from './VoiceForm';
import axios from 'axios';

const VoicePostCreator = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [showCreator, setShowCreator] = useState(false);

  // Fields based on user role
  const getPostFields = () => {
    const baseFields = {
      farmer: [
        {
          name: 'cropName',
          label: 'फसल का नाम | Crop Name',
          placeholder: 'जैसे: टमाटर, आलू, गेहूं',
          voiceInstruction: 'अपनी फसल का नाम बोलें, जैसे टमाटर या आलू'
        },
        {
          name: 'quantity',
          label: 'मात्रा | Quantity',
          placeholder: 'किलोग्राम या टन में',
          voiceInstruction: 'फसल की मात्रा बोलें, जैसे पचास किलो या दो टन'
        },
        {
          name: 'price',
          label: 'कीमत | Price',
          placeholder: 'प्रति किलो कीमत',
          voiceInstruction: 'प्रति किलो कीमत बोलें, जैसे बीस रुपये'
        }
      ],
      buyer: [
        {
          name: 'product',
          label: 'उत्पाद की आवश्यकता | Product Required',
          placeholder: 'जैसे: टमाटर, चावल, आलू',
          voiceInstruction: 'आपको कौन सा उत्पाद चाहिए, बोलें'
        },
        {
          name: 'quantity',
          label: 'आवश्यक मात्रा | Required Quantity',
          placeholder: 'कितनी मात्रा चाहिए',
          voiceInstruction: 'कितनी मात्रा चाहिए, बोलें'
        },
        {
          name: 'budget',
          label: 'बजट | Budget',
          placeholder: 'अधिकतम बजट',
          voiceInstruction: 'आपका बजट क्या है, बोलें'
        }
      ]
    };

    return baseFields[user?.userType] || [];
  };

  const handlePostSubmit = async (formData) => {
    try {
      const postData = {
        userId: user._id,
        userType: user.userType,
        type: user.userType,
        ...formData
      };

      const response = await axios.post('http://localhost:5000/api/posts', postData);
      
      if (response.data.success) {
        alert('आपकी पोस्ट सफलतापूर्वक बनाई गई! | Post created successfully!');
        setShowCreator(false);
        onPostCreated?.();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('पोस्ट बनाने में त्रुटि | Error creating post');
    }
  };

  if (!showCreator) {
    return (
      <button
        onClick={() => setShowCreator(true)}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-40"
      >
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🎤</span>
          <span>Voice Post</span>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative">
        <button
          onClick={() => setShowCreator(false)}
          className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full z-10"
        >
          ✕
        </button>
        <VoiceForm
          fields={getPostFields()}
          onSubmit={handlePostSubmit}
          title={`Create ${user?.userType} Post`}
        />
      </div>
    </div>
  );
};

export default VoicePostCreator;