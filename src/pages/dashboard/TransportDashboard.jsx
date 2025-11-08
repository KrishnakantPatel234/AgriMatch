import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoiceRecognition } from '../../hooks/UseVoiceRecognition';
import { toast } from 'react-toastify';
import { FaMicrophone, FaStop, FaTruck, FaRoute, FaGasPump } from 'react-icons/fa';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PostsFeed from "../../components/PostsFeed";
import VoicePostCreator from "../../components/VoicePostCreator";

const TransportDashboard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const chatContainerRef = useRef(null);

  // Voice recognition hook
  const getLanguageCode = (lang) => {
    const codes = { en: 'en-US', hi: 'hi-IN', mr: 'mr-IN' };
    return codes[lang] || 'en-US';
  };

  const voiceRecognition = useVoiceRecognition(getLanguageCode(language));

  // Multilingual content
  const dashboardContent = {
    en: {
      welcome: "Welcome back",
      transportDashboard: "Transport Dashboard",
      aiAssistantActive: "AI Logistics Assistant Active",
      realTimeInsights: "Smart route optimization and fleet management",
      activeTrips: "Active Trips",
      monthlyRevenue: "Monthly Revenue",
      vehicleUtilization: "Vehicle Utilization",
      onTimeRate: "On-time Rate",
      currentTrips: "Current Trips",
      route: "Route",
      status: "Status",
      estimatedArrival: "ETA",
      aiRouteOptimization: "AI Route Optimization",
      distance: "Distance",
      timeSaved: "Time Saved",
      applyRoute: "Apply Route",
      aiVehicleHealth: "AI Vehicle Health",
      currentHealth: "Current Health",
      maintenanceDue: "Maintenance Due",
      viewAllVehicles: "View All Vehicles",
      aiLoadMatching: "AI Load Matching",
      availableLoad: "Available Load",
      matchScore: "Match Score",
      acceptLoad: "Accept Load",
      uploadVehicleCheck: "Upload Vehicle Inspection",
      analyzingVehicle: "Analyzing Vehicle",
      aiFuelOptimization: "AI Fuel Optimization",
      smartSuggestion: "Smart Suggestion",
      fuelEfficiency: "Fuel Efficiency",
      costSavings: "Cost Savings",
      routeConditions: "Route Conditions",
      aiLogisticsAssistant: "AI Logistics Assistant",
      askAbout: "Ask about routes, vehicle health, loads, fuel efficiency...",
      askAI: "Ask AI",
      speakNow: "Speak now...",
      quickActions: "Quick Actions",
      routePlanning: "Route Planning",
      vehicleMaintenance: "Vehicle Maintenance",
      loadMatching: "Load Matching",
      fuelManagement: "Fuel Management"
    },
    hi: {
      welcome: "वापस स्वागत है",
      transportDashboard: "परिवहन डैशबोर्ड",
      aiAssistantActive: "एआई लॉजिस्टिक्स सहायक सक्रिय",
      realTimeInsights: "स्मार्ट रूट ऑप्टिमाइजेशन और बेड़े प्रबंधन",
      activeTrips: "सक्रिय यात्राएं",
      monthlyRevenue: "मासिक आय",
      vehicleUtilization: "वाहन उपयोग",
      onTimeRate: "समय पर दर",
      currentTrips: "वर्तमान यात्राएं",
      route: "मार्ग",
      status: "स्थिति",
      estimatedArrival: "अनुमानित आगमन",
      aiRouteOptimization: "एआई मार्ग अनुकूलन",
      distance: "दूरी",
      timeSaved: "समय बचाया",
      applyRoute: "मार्ग लागू करें",
      aiVehicleHealth: "एआई वाहन स्वास्थ्य",
      currentHealth: "वर्तमान स्वास्थ्य",
      maintenanceDue: "रखरखाव देय",
      viewAllVehicles: "सभी वाहन देखें",
      aiLoadMatching: "एआई लोड मिलान",
      availableLoad: "उपलब्ध लोड",
      matchScore: "मिलान स्कोर",
      acceptLoad: "लोड स्वीकार करें",
      uploadVehicleCheck: "वाहन निरीक्षण अपलोड करें",
      analyzingVehicle: "वाहन का विश्लेषण कर रहा है",
      aiFuelOptimization: "एआई ईंधन अनुकूलन",
      smartSuggestion: "स्मार्ट सुझाव",
      fuelEfficiency: "ईंधन दक्षता",
      costSavings: "लागत बचत",
      routeConditions: "मार्ग स्थितियां",
      aiLogisticsAssistant: "एआई लॉजिस्टिक्स सहायक",
      askAbout: "मार्ग, वाहन स्वास्थ्य, लोड, ईंधन दक्षता... के बारे में पूछें",
      askAI: "एआई से पूछें",
      speakNow: "अब बोलें...",
      quickActions: "त्वरित कार्य",
      routePlanning: "मार्ग योजना",
      vehicleMaintenance: "वाहन रखरखाव",
      loadMatching: "लोड मिलान",
      fuelManagement: "ईंधन प्रबंधन"
    },
    mr: {
      welcome: "पुन्हा स्वागत आहे",
      transportDashboard: "वाहतूक डॅशबोर्ड",
      aiAssistantActive: "AI लॉजिस्टिक्स सहाय्यक सक्रिय",
      realTimeInsights: "स्मार्ट मार्ग ऑप्टिमायझेशन आणि वाहनताडण व्यवस्थापन",
      activeTrips: "सक्रिय प्रवास",
      monthlyRevenue: "मासिक उत्पन्न",
      vehicleUtilization: "वाहन वापर",
      onTimeRate: "वेळेवर दर",
      currentTrips: "सध्याचे प्रवास",
      route: "मार्ग",
      status: "स्थिती",
      estimatedArrival: "अंदाजे आगमन",
      aiRouteOptimization: "AI मार्ग ऑप्टिमायझेशन",
      distance: "अंतर",
      timeSaved: "वेळ वाचली",
      applyRoute: "मार्ग लागू करा",
      aiVehicleHealth: "AI वाहन आरोग्य",
      currentHealth: "सध्याचे आरोग्य",
      maintenanceDue: "देखभाल देय",
      viewAllVehicles: "सर्व वाहने पहा",
      aiLoadMatching: "AI लोड जुळणी",
      availableLoad: "उपलब्ध लोड",
      matchScore: "जुळणी स्कोर",
      acceptLoad: "लोड स्वीकारा",
      uploadVehicleCheck: "वाहन तपासणी अपलोड करा",
      analyzingVehicle: "वाहनाचे विश्लेषण करत आहे",
      aiFuelOptimization: "AI इंधन ऑप्टिमायझेशन",
      smartSuggestion: "स्मार्ट सूचना",
      fuelEfficiency: "इंधन कार्यक्षमता",
      costSavings: "खर्च बचत",
      routeConditions: "मार्ग परिस्थिती",
      aiLogisticsAssistant: "AI लॉजिस्टिक्स सहाय्यक",
      askAbout: "मार्ग, वाहन आरोग्य, लोड, इंधन कार्यक्षमता... याबद्दल विचारा",
      askAI: "AI ला विचारा",
      speakNow: "आता बोला...",
      quickActions: "द्रुत क्रिया",
      routePlanning: "मार्ग नियोजन",
      vehicleMaintenance: "वाहन देखभाल",
      loadMatching: "लोड जुळणी",
      fuelManagement: "इंधन व्यवस्थापन"
    }
  };

  const content = dashboardContent[language] || dashboardContent.en;

  // Real AI Data for Transport
  const [aiData, setAiData] = useState({
    routeOptimization: [
      { 
        route: 'Pune → Mumbai', 
        currentTime: '3h 30m', 
        optimizedTime: '2h 45m', 
        distance: '150 km',
        savings: language === 'hi' ? 'टोल ₹120 बचत, ईंधन 8% कम खपत' : 
                language === 'mr' ? 'टोल ₹120 बचत, इंधन 8% कम वापर' :
                '₹120 toll savings, 8% less fuel',
        reason: language === 'hi' ? 'यातायात से बचने के लिए वैकल्पिक मार्ग' : 
               language === 'mr' ? 'रहदारी टाळण्यासाठी पर्यायी मार्ग' :
               'Alternative route to avoid traffic'
      }
    ],
    vehicleHealth: [
      { vehicle: 'Truck MH12AB1234', health: 'Good', maintenance: '15 days', issues: 'None', efficiency: '92%' },
      { vehicle: 'Tempo MH12CD5678', health: 'Fair', maintenance: '5 days', issues: 'Brake pads worn', efficiency: '78%' },
      { vehicle: 'Trailer MH12EF9012', health: 'Excellent', maintenance: '30 days', issues: 'None', efficiency: '95%' }
    ],
    loadMatching: [
      { 
        load: 'Tomatoes', 
        route: 'Nashik → Pune', 
        weight: '2 tons', 
        match: '95%',
        rate: '₹4,500',
        urgency: language === 'hi' ? '24 घंटे के भीतर' : language === 'mr' ? '24 तासांत' : 'Within 24 hours'
      },
      { 
        load: 'Potatoes', 
        route: 'Pune → Mumbai', 
        weight: '3 tons', 
        match: '88%',
        rate: '₹6,200',
        urgency: language === 'hi' ? '48 घंटे के भीतर' : language === 'mr' ? '48 तासांत' : 'Within 48 hours'
      }
    ],
    fuelOptimization: {
      suggestion: language === 'hi' ? 'वाहन #MH12CD5678 के टायर दबाव बढ़ाएं - 5% ईंधन दक्षता सुधार संभव' : 
                 language === 'mr' ? 'वाहन #MH12CD5678 च्या टायर प्रेशर वाढवा - 5% इंधन कार्यक्षमता सुधारणे शक्य' :
                 'Increase tire pressure for vehicle #MH12CD5678 - 5% fuel efficiency improvement possible',
      efficiency: language === 'hi' ? 'औसत 8.5 km/l' : language === 'mr' ? 'सरासरी 8.5 km/l' : 'Average 8.5 km/l',
      savings: language === 'hi' ? 'मासिक ₹8,400 बचत' : language === 'mr' ? 'मासिक ₹8,400 बचत' : 'Monthly ₹8,400 savings',
      conditions: language === 'hi' ? 'मध्यम यातायात' : language === 'mr' ? 'मध्यम रहदारी' : 'Moderate traffic'
    }
  });

  // Sample trip data
  const [currentTrips] = useState([
    { 
      id: 'TRIP-001', 
      route: 'Pune → Mumbai', 
      vehicle: 'Truck MH12AB1234', 
      driver: 'Raj Kumar',
      status: language === 'hi' ? 'चल रहा है' : language === 'mr' ? 'चालू आहे' : 'In Transit', 
      eta: '2:30 PM',
      progress: '65%'
    },
    { 
      id: 'TRIP-002', 
      route: 'Nashik → Pune', 
      vehicle: 'Tempo MH12CD5678', 
      driver: 'Suresh Patil',
      status: language === 'hi' ? 'लोड हो रहा है' : language === 'mr' ? 'लोड होत आहे' : 'Loading', 
      eta: '4:00 PM',
      progress: '20%'
    }
  ]);

  // AI Chat Responses
  const aiResponses = {
    'route': language === 'hi' ? "🗺️ मार्ग अनुकूलन: पुणे → मुंबई। वर्तमान: 3h 30m, अनुकूलित: 2h 45m। बचत: ₹120 टोल, 8% ईंधन। कारण: यातायात से बचने के लिए वैकल्पिक मार्ग।" :
             language === 'mr' ? "🗺️ मार्ग ऑप्टिमायझेशन: पुणे → मुंबई. सध्याचे: 3h 30m, ऑप्टिमायझ्ड: 2h 45m. बचत: ₹120 टोल, 8% इंधन. कारण: रहदारी टाळण्यासाठी पर्यायी मार्ग." :
             "🗺️ Route optimization: Pune → Mumbai. Current: 3h 30m, Optimized: 2h 45m. Savings: ₹120 toll, 8% fuel. Reason: Alternative route to avoid traffic.",
    'vehicle': language === 'hi' ? "🚛 वाहन स्वास्थ्य: ट्रक MH12AB1234 (अच्छा), टेम्पो MH12CD5678 (निष्पक्ष - ब्रेक पैड घिसे हुए)। अनुशंसा: टेम्पो की 5 दिनों में सेवा करवाएं।" :
               language === 'mr' ? "🚛 वाहन आरोग्य: ट्रक MH12AB1234 (चांगले), टेम्पो MH12CD5678 (सामान्य - ब्रेक पॅड घसरलेले). शिफारस: टेम्पो ची 5 दिवसांत सेवा करा." :
               "🚛 Vehicle health: Truck MH12AB1234 (Good), Tempo MH12CD5678 (Fair - Brake pads worn). Recommendation: Service Tempo in 5 days.",
    'load': language === 'hi' ? "📦 लोड मिलान: नासिक → पुणे (टमाटर, 2 टन, 95% मिलान, ₹4,500)। तत्काल आवश्यकता: 24 घंटे। उच्च मार्जिन लोड।" :
            language === 'mr' ? "📦 लोड जुळणी: नाशिक → पुणे (टोमॅटो, 2 टन, 95% जुळणी, ₹4,500). तातडीची गरज: 24 तास. उच्च मार्जिन लोड." :
            "📦 Load matching: Nashik → Pune (Tomatoes, 2 tons, 95% match, ₹4,500). Urgent: 24 hours. High margin load.",
    'fuel': language === 'hi' ? "⛽ ईंधन अनुकूलन: वाहन #MH12CD5678 के टायर दबाव बढ़ाएं - 5% दक्षता सुधार संभव। मासिक बचत: ₹8,400। वर्तमान औसत: 8.5 km/l।" :
             language === 'mr' ? "⛽ इंधन ऑप्टिमायझेशन: वाहन #MH12CD5678 च्या टायर प्रेशर वाढवा - 5% कार्यक्षमता सुधारणे शक्य. मासिक बचत: ₹8,400. सध्याची सरासरी: 8.5 km/l." :
             "⛽ Fuel optimization: Increase tire pressure for vehicle #MH12CD5678 - 5% efficiency improvement possible. Monthly savings: ₹8,400. Current average: 8.5 km/l.",
    'default': language === 'hi' ? "🤖 मैं मार्ग अनुकूलन, वाहन स्वास्थ्य, लोड मिलान और ईंधन प्रबंधन में मदद कर सकता हूं। आप क्या जानना चाहते हैं?" :
               language === 'mr' ? "🤖 मी मार्ग ऑप्टिमायझेशन, वाहन आरोग्य, लोड जुळणी आणि इंधन व्यवस्थापन मध्ये मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?" :
               "🤖 I can help with route optimization, vehicle health, load matching, and fuel management. What would you like to know?"
  };

  // Initialize chat
  useEffect(() => {
    const greeting = language === 'hi' 
      ? "👋 नमस्ते! मैं आपका AI लॉजिस्टिक्स सहायक हूं। मैं मार्ग अनुकूलन, वाहन प्रबंधन, लोड मिलान और ईंधन दक्षता में मदद कर सकता हूं।"
      : language === 'mr'
      ? "👋 नमस्कार! मी तुमचा AI लॉजिस्टिक्स सहाय्यक आहे. मी मार्ग ऑप्टिमायझेशन, वाहन व्यवस्थापन, लोड जुळणी आणि इंधन कार्यक्षमतेत मदत करू शकतो."
      : "👋 Hello! I'm your AI Logistics Assistant. I can help with route optimization, vehicle management, load matching, and fuel efficiency.";
    
    setChatHistory([{ type: 'ai', message: greeting }]);
  }, [language]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Handle voice input
  useEffect(() => {
    if (voiceRecognition.transcript) {
      setChatMessage(voiceRecognition.transcript);
      setIsListening(false);
    }
  }, [voiceRecognition.transcript]);

  const startVoiceInput = () => {
    if (voiceRecognition.isSupported) {
      setIsListening(true);
      voiceRecognition.startListening();
      toast.info(content.speakNow);
    } else {
      toast.error("Voice input not supported in your browser");
    }
  };

  const stopVoiceInput = () => {
    setIsListening(false);
    voiceRecognition.stopListening();
  };

  // Handle AI Chat
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage.toLowerCase();
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);

    // AI Response Logic
    let aiResponse = aiResponses.default;
    
    if (userMessage.includes('route') || userMessage.includes('मार्ग')) {
      aiResponse = aiResponses.route;
    }
    else if (userMessage.includes('vehicle') || userMessage.includes('truck') || userMessage.includes('वाहन')) {
      aiResponse = aiResponses.vehicle;
    }
    else if (userMessage.includes('load') || userMessage.includes('cargo') || userMessage.includes('लोड')) {
      aiResponse = aiResponses.load;
    }
    else if (userMessage.includes('fuel') || userMessage.includes('petrol') || userMessage.includes('ईंधन') || userMessage.includes('इंधन')) {
      aiResponse = aiResponses.fuel;
    }

    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
    }, 1000);

    setChatMessage('');
  };

  // Quick actions
  const quickActions = {
    en: ['Route to Mumbai?', 'Vehicle health', 'Available loads', 'Fuel efficiency'],
    hi: ['मुंबई का मार्ग?', 'वाहन स्वास्थ्य', 'उपलब्ध लोड', 'ईंधन दक्षता'],
    mr: ['मुंबईचा मार्ग?', 'वाहन आरोग्य', 'उपलब्ध लोड', 'इंधन कार्यक्षमता']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{content.welcome}, {user?.name}!</h1>
              <p className="text-orange-200 text-xl mt-2 flex items-center">
                <span className="mr-2">🚚</span> {content.transportDashboard}
              </p>
            </div>
            <div className="text-right">
              <div className="text-orange-200">{user?.vehicleType || 'Truck Fleet'}</div>
              <div className="text-orange-200">{user?.location || 'Maharashtra'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* AI Insights Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">🤖 {content.aiAssistantActive}</h2>
              <p className="opacity-90">{content.realTimeInsights}</p>
            </div>
            <div className="text-4xl animate-pulse">⚡</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: '🚛', value: currentTrips.length, label: content.activeTrips, color: 'orange' },
            { icon: '💰', value: '₹1.2L', label: content.monthlyRevenue, color: 'green' },
            { icon: '📊', value: '78%', label: content.vehicleUtilization, color: 'blue' },
            { icon: '⏱️', value: '94%', label: content.onTimeRate, color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className={`bg-white p-6 rounded-xl shadow-md border-l-4 border-${stat.color}-500`}>
              <div className={`text-2xl text-${stat.color}-600 mb-2`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Current Trips Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-orange-600 mr-2">🛣️</span>
            {content.currentTrips}
          </h3>
          <div className="space-y-4">
            {currentTrips.map((trip, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{trip.route}</h4>
                    <p className="text-sm text-gray-600">{trip.vehicle} • {trip.driver}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    trip.status.includes('Transit') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {trip.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">{content.estimatedArrival}</div>
                    <div className="font-semibold">{trip.eta}</div>
                  </div>
                  <div className="w-32">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{trip.progress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: trip.progress }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Route Optimization */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-green-600 mr-2">🗺️</span>
              {content.aiRouteOptimization}
            </h3>
            <div className="space-y-4">
              {aiData.routeOptimization.map((route, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{route.route}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <div>
                          <div className="text-sm text-gray-600">Current</div>
                          <div className="font-semibold line-through text-red-600">{route.currentTime}</div>
                        </div>
                        <div className="text-2xl text-gray-400">→</div>
                        <div>
                          <div className="text-sm text-gray-600">Optimized</div>
                          <div className="font-semibold text-green-600">{route.optimizedTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">{content.distance}: {route.distance}</div>
                    <div className="text-sm text-gray-600 mb-1">{content.timeSaved}: {route.timeSaved}</div>
                    <p className="text-sm text-gray-700">{route.reason}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600">{route.savings}</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 text-sm">
                      {content.applyRoute}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Health */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-blue-600 mr-2">🚛</span>
              {content.aiVehicleHealth}
            </h3>
            <div className="space-y-3">
              {aiData.vehicleHealth.map((vehicle, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  vehicle.health === 'Excellent' ? 'bg-green-50 border border-green-200' :
                  vehicle.health === 'Good' ? 'bg-blue-50 border border-blue-200' :
                  'bg-yellow-50 border border-yellow-200'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{vehicle.vehicle}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      vehicle.health === 'Excellent' ? 'bg-green-100 text-green-800' :
                      vehicle.health === 'Good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vehicle.health}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">{content.maintenanceDue}:</span>
                      <span className="font-semibold ml-1">{vehicle.maintenance}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Efficiency:</span>
                      <span className="font-semibold ml-1">{vehicle.efficiency}</span>
                    </div>
                    {vehicle.issues !== 'None' && (
                      <div className="col-span-2">
                        <span className="text-gray-600">Issues:</span>
                        <span className="text-red-600 ml-1">{vehicle.issues}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition duration-300">
              {content.viewAllVehicles}
            </button>
          </div>

          {/* Load Matching */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-purple-600 mr-2">📦</span>
              {content.aiLoadMatching}
            </h3>
            <div className="space-y-4">
              {aiData.loadMatching.map((load, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{load.load}</h4>
                      <p className="text-sm text-gray-600">{load.route} • {load.weight}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                        {load.match} {content.matchScore}
                      </div>
                      <div className="font-semibold text-lg mt-1">{load.rate}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{load.urgency}</span>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 text-sm">
                      {content.acceptLoad}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fuel Optimization */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-green-600 mr-2">⛽</span>
              {content.aiFuelOptimization}
            </h3>
            <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
              <div className="flex items-center mb-2">
                <span className="text-green-600 mr-2">💡</span>
                <span className="font-semibold">{content.smartSuggestion}</span>
              </div>
              <p className="text-green-800">{aiData.fuelOptimization.suggestion}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '📊', label: content.fuelEfficiency, value: aiData.fuelOptimization.efficiency },
                { icon: '💰', label: content.costSavings, value: aiData.fuelOptimization.savings },
                { icon: '🛣️', label: content.routeConditions, value: aiData.fuelOptimization.conditions, colSpan: 'col-span-2' }
              ].map((item, index) => (
                <div key={index} className={`text-center p-3 bg-gray-50 rounded-lg ${item.colSpan || ''}`}>
                  <div className="text-lg">{item.icon}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                  <div className={`font-semibold ${
                    item.label.includes('Efficiency') ? 'text-green-600' : 
                    item.label.includes('Savings') ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Chat Assistant */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-purple-600 mr-2">💬</span>
            {content.aiLogisticsAssistant}
          </h3>
          
          {/* Chat History */}
          <div 
            ref={chatContainerRef}
            className="bg-gray-50 rounded-lg p-4 mb-4 h-64 overflow-y-auto"
          >
            {chatHistory.map((chat, index) => (
              <div key={index} className={`mb-3 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  chat.type === 'user' 
                    ? 'bg-orange-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 rounded-bl-none'
                }`}>
                  {chat.message.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
            {isListening && (
              <div className="text-center p-2">
                <div className="inline-flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-yellow-800">{content.speakNow}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600 mr-2">{content.quickActions}:</span>
            {(quickActions[language] || quickActions.en).map((action, index) => (
              <button
                key={index}
                onClick={() => setChatMessage(action)}
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Chat Input with Voice */}
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder={content.askAbout}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-12"
              />
              <button
                type="button"
                onClick={isListening ? stopVoiceInput : startVoiceInput}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : voiceRecognition.isSupported
                    ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!voiceRecognition.isSupported}
              >
                {isListening ? <FaStop className="w-4 h-4" /> : <FaMicrophone className="w-4 h-4" />}
              </button>
            </div>
            <button 
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition duration-300 font-medium"
            >
              {content.askAI}
            </button>
          </form>
        </div>
      </div>

      {/* Posts Section */}
      <div className="container mx-auto px-4 pb-8">
        <h3 className="text-2xl font-semibold mb-4 flex items-center">
          <span className="text-orange-600 mr-2">📝</span>
          {language === 'hi' ? 'परिवहन पोस्ट' : language === 'mr' ? 'वाहतूक पोस्ट' : 'Transport Posts'}
        </h3>
        <PostsFeed userType="transport" />
      </div>
      <VoicePostCreator onPostCreated={() => { /* optional refresh */ }} />
      <Footer />
    </div>
  );
};

export default TransportDashboard;