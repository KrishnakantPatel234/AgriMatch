import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoiceRecognition } from '../../hooks/UseVoiceRecognition';
import { toast } from 'react-toastify';
import { FaMicrophone, FaStop, FaUpload, FaPlus, FaSync } from 'react-icons/fa';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PostsFeed from "../../components/PostsFeed";
import VoicePostCreator from "../../components/VoicePostCreator";
import PlantixDiagnosis from "../../components/PlantixDiagnosis";
import axios from "axios";
import PostCard from "../../components/PostCard";
import FarmerPostCard from "../../components/FarmerPostCard";


const FarmerDashboard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { startVoice } = useVoiceRecognition(); 
  const [activeTab, setActiveTab] = useState('overview');
  const [farmData, setFarmData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostCreator, setShowPostCreator] = useState(false);
  // CHAT SYSTEM STATES
  const [chatWith, setChatWith] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  const [realTimeStats, setRealTimeStats] = useState({
    activeCrops: 0,
    monthlyRevenue: 0,
    buyerRating: 0,
    growthRate: 0
  });

  // Fetch farmer data from backend
  const fetchFarmData = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:5000/api/users/${user._id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setFarmData(response.data.user || response.data);

    // Stats fallback
    setRealTimeStats({
      activeCrops: response.data.user?.mainCrops?.length || 0,
      monthlyRevenue: response.data.user?.stats?.monthlyRevenue || 0,
      buyerRating: response.data.user?.rating || 4.5,
      growthRate: 0
    });

  } catch (error) {
    console.error("Error fetching farm data:", error);
    toast.error("Failed to load farm data");
  } finally {
    setLoading(false);
  }
};


  // Fetch farmer's posts
  const fetchPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:5000/api/posts/farmer/${user._id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setPosts(response.data.posts || []);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};


  useEffect(() => {
    if (user) {
      fetchFarmData();
      fetchPosts();
    }
  }, [user]);

  // Real-time updates (simulated with interval)
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats in real-time
      setRealTimeStats(prev => ({
        ...prev,
        monthlyRevenue: prev.monthlyRevenue + Math.random() * 100,
        growthRate: prev.growthRate + Math.random() * 0.1
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Dashboard content translations
  const dashboardContent = {
    en: {
      welcome: "Welcome back",
      farmerDashboard: "Farmer Dashboard",
      realTimeInsights: "Real-time insights to maximize your yield and profits",
      activeCrops: "Active Crops",
      monthlyRevenue: "Monthly Revenue",
      buyerRating: "Buyer Rating",
      growthRate: "Growth Rate",
      yourFarmDetails: "Your Farm Details",
      createPost: "Create Post",
      sellYourProduce: "Sell Your Produce",
      recentPosts: "Your Recent Posts",
      noPosts: "No posts yet. Create your first post to sell your produce!",
      cropDiseaseDiagnosis: "Crop Disease Diagnosis",
      refreshData: "Refresh Data",
      farmOverview: "Farm Overview",
      marketPlace: "Market Place",
      analytics: "Analytics"
    },
    hi: {
      welcome: "वापस स्वागत है",
      farmerDashboard: "किसान डैशबोर्ड",
      realTimeInsights: "अपनी उपज और मुनाफे को अधिकतम करने के लिए रीयल-टाइम जानकारी",
      activeCrops: "सक्रिय फसलें",
      monthlyRevenue: "मासिक आय",
      buyerRating: "खरीदार रेटिंग",
      growthRate: "विकास दर",
      yourFarmDetails: "आपके फार्म का विवरण",
      createPost: "पोस्ट बनाएं",
      sellYourProduce: "अपनी उपज बेचें",
      recentPosts: "आपकी हाल की पोस्ट",
      noPosts: "अभी तक कोई पोस्ट नहीं। अपनी उपज बेचने के लिए अपनी पहली पोस्ट बनाएं!",
      cropDiseaseDiagnosis: "फसल रोग निदान",
      refreshData: "डेटा रिफ्रेश करें",
      farmOverview: "फार्म अवलोकन",
      marketPlace: "मार्केट प्लेस",
      analytics: "विश्लेषण"
    },
    mr: {
      welcome: "पुन्हा स्वागत आहे",
      farmerDashboard: "शेतकरी डॅशबोर्ड",
      realTimeInsights: "तुमची उत्पादन आणि नफा वाढवण्यासाठी रिअल-टाइम माहिती",
      activeCrops: "सक्रिय पिके",
      monthlyRevenue: "मासिक उत्पन्न",
      buyerRating: "खरेदीदार रेटिंग",
      growthRate: "वाढ दर",
      yourFarmDetails: "तुमचे शेत तपशील",
      createPost: "पोस्ट तयार करा",
      sellYourProduce: "तुमची उत्पादने विका",
      recentPosts: "तुमच्या अलीकडील पोस्ट",
      noPosts: "अद्याप कोणतीही पोस्ट नाही. तुमची उत्पादने विकण्यासाठी तुमची पहिली पोस्ट तयार करा!",
      cropDiseaseDiagnosis: "पिक रोग निदान",
      refreshData: "डेटा रिफ्रेश करा",
      farmOverview: "शेताचा आढावा",
      marketPlace: "मार्केट प्लेस",
      analytics: "विश्लेषण"
    }
  };

  const content = dashboardContent[language] || dashboardContent.en;

  // SEND MESSAGE FUNCTION — For ChatWindow.jsx
const sendMessage = (text, resetInput) => {
  if (!text.trim()) return;

  // Add message from USER
  setMessages(prev => [...prev, {
    message: text,
    fromSelf: true,
    timestamp: new Date()
  }]);

  resetInput(""); // Clear input box

  // Fake receiver typing
  setTyping(true);
  setTimeout(() => {
    setTyping(false);
    setMessages(prev => [
      ...prev,
      {
        message: "Thanks! I will reply shortly.",
        fromSelf: false
      }
    ]);
  }, 1500);
};

const startVoiceRecognition = () => {
  setTyping(true);

  setTimeout(() => {
    setTyping(false);

    setMessages(prev => [
      ...prev,
      {
        message: "🎤 Voice message feature coming soon...",
        fromSelf: false
      }
    ]);
  }, 2000);
};

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
    setShowPostCreator(false);
    toast.success(
      language === 'hi' ? 'पोस्ट सफलतापूर्वक बनाई गई!' :
      language === 'mr' ? 'पोस्ट यशस्वीरित्या तयार केली!' :
      'Post created successfully!'
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your farm data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">{content.welcome}, {user?.name}!</h1>
              <p className="text-green-200 text-xl mt-2 flex items-center">
                <span className="mr-2">👨‍🌾</span> {content.farmerDashboard}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <button
                onClick={fetchFarmData}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition duration-200"
              >
                <FaSync className="w-4 h-4" />
                <span>{content.refreshData}</span>
              </button>
              <button
                onClick={() => setShowPostCreator(true)}
                className="flex items-center space-x-2 bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-semibold transition duration-200"
              >
                <FaPlus className="w-4 h-4" />
                <span>{content.createPost}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              icon: '🌾', 
              value: realTimeStats.activeCrops, 
              label: content.activeCrops, 
              color: 'green',
              format: (val) => val
            },
            { 
              icon: '💰', 
              value: realTimeStats.monthlyRevenue, 
              label: content.monthlyRevenue, 
              color: 'blue',
              format: formatCurrency
            },
            { 
              icon: '⭐', 
              value: realTimeStats.buyerRating, 
              label: content.buyerRating, 
              color: 'yellow',
              format: (val) => `${val}/5`
            },
            { 
              icon: '📈', 
              value: realTimeStats.growthRate, 
              label: content.growthRate, 
              color: 'purple',
              format: (val) => `${(val * 100).toFixed(1)}%`
            }
          ].map((stat, index) => (
            <div key={index} className={`bg-white p-6 rounded-xl shadow-md border-l-4 border-${stat.color}-500`}>
              <div className={`text-2xl text-${stat.color}-600 mb-2`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.format(stat.value)}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Farm Details & Disease Diagnosis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Plantix Disease Diagnosis - Top on mobile */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-red-600 mr-2">🌿</span>
                {content.cropDiseaseDiagnosis}
              </h2>
              <PlantixDiagnosis />
            </div>

            {/* Farm Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-green-600 mr-2">🏞️</span>
                {content.yourFarmDetails}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 border-b pb-2">Basic Information</h3>
                  
                  {user?.name && (
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  )}
                  
                  {user?.phone && (
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  )}
                  
                  {user?.email && (
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  )}
                  
                  {user?.role && (
                    <div>
                      <label className="text-sm text-gray-500">Role</label>
                      <p className="font-medium capitalize">{user.role}</p>
                    </div>
                  )}
                </div>

                {/* Farm Specific Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 border-b pb-2">Farm Details</h3>
                  
                  {user?.landArea && (
                    <div>
                      <label className="text-sm text-gray-500">Farm Size</label>
                      <p className="font-medium">{user.landArea} {user.landAreaUnit || 'acres'}</p>
                    </div>
                  )}
                  
                  {user?.farmLocation && (
                    <div>
                      <label className="text-sm text-gray-500">Location</label>
                      <p className="font-medium">{user.farmLocation}</p>
                    </div>
                  )}
                  
                  {user?.soilType && (
                    <div>
                      <label className="text-sm text-gray-500">Soil Type</label>
                      <p className="font-medium">{user.soilType}</p>
                    </div>
                  )}
                  
                  {user?.farmingExperience && (
                    <div>
                      <label className="text-sm text-gray-500">Experience</label>
                      <p className="font-medium">{user.farmingExperience}</p>
                    </div>
                  )}
                  
                  {user?.irrigationType && (
                    <div>
                      <label className="text-sm text-gray-500">Irrigation</label>
                      <p className="font-medium">{user.irrigationType}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Crops Section */}
              {user?.mainCrops && user.mainCrops.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-gray-700 mb-3">Crops You Grow</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.mainCrops.map((crop, index) => (
                      <span
                        key={index}
                        className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recent Posts */}
            {posts.slice(0, 3).map((post) => (
            <div 
              key={post._id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{post.title}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 mb-3">{post.description}</p>

              {/* IMAGE */}
              {post.media && (
                <img 
                  src={post.media} 
                  alt="Post media" 
                  className="rounded-lg w-full max-h-48 object-cover mb-3"
                />
              )}

              {/* PRICE + QUANTITY */}
              <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                <span className="font-medium">Price: ₹{post.price}</span>
                <span>Quantity: {post.quantity} {post.unit}</span>
              </div>

              {/* LOCATION */}
              <p className="text-sm text-gray-500 mb-3">📍 {post.location}</p>

              {/* CHAT BUTTON */}
              <button
                onClick={() =>
                  setChatWith({
                    farmerId: post.farmerId,
                    farmerName: post.farmerName || user.name,
                  })
                }
                className="w-full py-2 mt-1 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                💬 Chat with Buyer
              </button>
            </div>
          ))}

          </div>

          {/* Right Column - Quick Actions & Analytics */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-purple-600 mr-2">⚡</span>
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowPostCreator(true)}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-semibold flex items-center justify-center space-x-2"
                >
                  <FaPlus className="w-4 h-4" />
                  <span>{content.sellYourProduce}</span>
                </button>
                
                <button className="w-full border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition duration-200 font-semibold">
                  View Market Prices
                </button>
                
                <button className="w-full border-2 border-purple-600 text-purple-600 py-3 px-4 rounded-lg hover:bg-purple-50 transition duration-200 font-semibold">
                  Crop Health Analysis
                </button>
                
                <button className="w-full border-2 border-orange-600 text-orange-600 py-3 px-4 rounded-lg hover:bg-orange-50 transition duration-200 font-semibold">
                  Financial Reports
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">New buyer inquiry</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Price alert: Tomatoes</p>
                    <p className="text-sm text-gray-600">5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Weather advisory</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Post Creator Modal */}
      {showPostCreator && (
        <VoicePostCreator 
          onPostCreated={handlePostCreated}
          onClose={() => setShowPostCreator(false)}
        />
      )}

       {/* CHAT WINDOW POPUP */}
      {chatWith && (
        <div className="fixed bottom-4 right-4 w-full md:w-[450px] shadow-2xl rounded-xl z-50">
          <ChatWindow
            chat={chatWith}
            messages={messages}
            isTyping={typing}
            onSend={sendMessage}
            startVoice={startVoice}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FarmerDashboard;