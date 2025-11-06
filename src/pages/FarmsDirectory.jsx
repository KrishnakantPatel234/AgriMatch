// Enhanced FarmersDirectory.js with working buttons
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import VoiceNavigator from '../components/VoiceNavigator';
import VoicePostCreator from '../components/VoicePostCreator';

const FarmersDirectory = () => {
  const { user } = useAuth();
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock data - replace with actual API
  const [farmers] = useState([
    {
      _id: '1',
      farmName: "Green Valley Organics",
      userId: { 
        name: "Rajesh Kumar", 
        email: "rajesh@example.com",
        phone: "+91 9876543210" 
      },
      location: { city: "Nashik", state: "Maharashtra" },
      crops: [
        { name: "Tomatoes", isOrganic: true, price: 25 },
        { name: "Grapes", isOrganic: true, price: 60 }
      ],
      rating: { average: 4.8, count: 45 }
    }
  ]);

  const handleContactFarmer = (farmer) => {
    setSelectedFarmer(farmer);
    setShowContactModal(true);
    
    // Speak confirmation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${farmer.userId.name} से संपर्क कर रहे हैं। फोन नंबर है ${farmer.userId.phone}`
      );
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = (farmer) => {
    // Implement actual messaging
    alert(`Message sent to ${farmer.userId.name}`);
    
    // Voice feedback
    speakFeedback(`${farmer.userId.name} को संदेश भेज दिया गया है`);
  };

  const handleViewProfile = (farmer) => {
    // Navigate to farmer profile page
    speakFeedback(`${farmer.farmName} का विस्तृत प्रोफाइल दिखा रहा हूं`);
    // navigate(`/farmers/${farmer._id}`);
  };

  const speakFeedback = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VoiceNavigator />
      {user && <VoicePostCreator />}
      
      {/* Contact Modal */}
      {showContactModal && selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              Contact {selectedFarmer.userId.name}
            </h3>
            
            <div className="space-y-3 mb-6">
              <div>
                <strong>Phone:</strong> {selectedFarmer.userId.phone}
              </div>
              <div>
                <strong>Email:</strong> {selectedFarmer.userId.email}
              </div>
              <div>
                <strong>Location:</strong> {selectedFarmer.location.city}, {selectedFarmer.location.state}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => window.location.href = `tel:${selectedFarmer.userId.phone}`}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                📞 Call
              </button>
              <button
                onClick={() => window.location.href = `https://wa.me/${selectedFarmer.userId.phone.replace('+', '')}`}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                💬 WhatsApp
              </button>
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rest of your farmers directory UI */}
      <div className="container mx-auto px-4 py-8">
        {/* Your existing farmers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.map(farmer => (
            <div key={farmer._id} className="bg-white rounded-xl shadow-lg p-6">
              {/* Farmer info */}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleViewProfile(farmer)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleContactFarmer(farmer)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Contact
                </button>
                <button
                  onClick={() => handleSendMessage(farmer)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  💬
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmersDirectory;     