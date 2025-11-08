import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoiceRecognition } from '../../hooks/UseVoiceRecognition';
import { toast } from 'react-toastify';
import { FaMicrophone, FaStop, FaWarehouse, FaTemperatureLow, FaBox } from 'react-icons/fa';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PostsFeed from "../../components/PostsFeed";
import VoicePostCreator from "../../components/VoicePostCreator"

const StorageDashboard = () => {
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
      storageDashboard: "Storage Dashboard",
      aiAssistantActive: "AI Storage Manager Active",
      realTimeInsights: "Smart storage optimization and facility management",
      totalCapacity: "Total Capacity",
      utilization: "Utilization",
      activeContracts: "Active Contracts",
      revenue: "Monthly Revenue",
      currentStorage: "Current Storage",
      product: "Product",
      quantity: "Quantity",
      storedSince: "Stored Since",
      aiCapacityOptimization: "AI Capacity Optimization",
      availableSpace: "Available Space",
      recommended: "Recommended",
      optimizeNow: "Optimize Now",
      aiClimateControl: "AI Climate Control",
      currentTemp: "Current Temp",
      optimalRange: "Optimal Range",
      viewAllZones: "View All Climate Zones",
      aiMaintenanceAlerts: "AI Maintenance Alerts",
      equipment: "Equipment",
      lastMaintenance: "Last Maintenance",
      scheduleMaintenance: "Schedule Maintenance",
      uploadInspection: "Upload Equipment Photo",
      analyzingEquipment: "Analyzing Equipment",
      aiRevenueForecast: "AI Revenue Forecast",
      smartSuggestion: "Smart Suggestion",
      demandForecast: "Demand Forecast",
      capacityTrend: "Capacity Trend",
      rateOptimization: "Rate Optimization",
      aiStorageAssistant: "AI Storage Assistant",
      askAbout: "Ask about capacity, climate control, maintenance, pricing...",
      askAI: "Ask AI",
      speakNow: "Speak now...",
      quickActions: "Quick Actions",
      capacityPlanning: "Capacity Planning",
      climateMonitoring: "Climate Monitoring",
      maintenanceSchedule: "Maintenance Schedule",
      revenueAnalysis: "Revenue Analysis"
    },
    hi: {
      welcome: "वापस स्वागत है",
      storageDashboard: "स्टोरेज डैशबोर्ड",
      aiAssistantActive: "एआई स्टोरेज मैनेजर सक्रिय",
      realTimeInsights: "स्मार्ट स्टोरेज ऑप्टिमाइजेशन और सुविधा प्रबंधन",
      totalCapacity: "कुल क्षमता",
      utilization: "उपयोग",
      activeContracts: "सक्रिय अनुबंध",
      revenue: "मासिक आय",
      currentStorage: "वर्तमान स्टोरेज",
      product: "उत्पाद",
      quantity: "मात्रा",
      storedSince: "से संग्रहित",
      aiCapacityOptimization: "एआई क्षमता अनुकूलन",
      availableSpace: "उपलब्ध स्थान",
      recommended: "अनुशंसित",
      optimizeNow: "अभी अनुकूलित करें",
      aiClimateControl: "एआई जलवायु नियंत्रण",
      currentTemp: "वर्तमान तापमान",
      optimalRange: "इष्टतम सीमा",
      viewAllZones: "सभी जलवायु क्षेत्र देखें",
      aiMaintenanceAlerts: "एआई रखरखाव अलर्ट",
      equipment: "उपकरण",
      lastMaintenance: "अंतिम रखरखाव",
      scheduleMaintenance: "रखरखाव शेड्यूल करें",
      uploadInspection: "उपकरण फोटो अपलोड करें",
      analyzingEquipment: "उपकरण का विश्लेषण कर रहा है",
      aiRevenueForecast: "एआई राजस्व पूर्वानुमान",
      smartSuggestion: "स्मार्ट सुझाव",
      demandForecast: "मांग पूर्वानुमान",
      capacityTrend: "क्षमता रुझान",
      rateOptimization: "दर अनुकूलन",
      aiStorageAssistant: "एआई स्टोरेज सहायक",
      askAbout: "क्षमता, जलवायु नियंत्रण, रखरखाव, मूल्य निर्धारण... के बारे में पूछें",
      askAI: "एआई से पूछें",
      speakNow: "अब बोलें...",
      quickActions: "त्वरित कार्य",
      capacityPlanning: "क्षमता योजना",
      climateMonitoring: "जलवायु निगरानी",
      maintenanceSchedule: "रखरखाव कार्यक्रम",
      revenueAnalysis: "राजस्व विश्लेषण"
    },
    mr: {
      welcome: "पुन्हा स्वागत आहे",
      storageDashboard: "स्टोरेज डॅशबोर्ड",
      aiAssistantActive: "AI स्टोरेज व्यवस्थापक सक्रिय",
      realTimeInsights: "स्मार्ट स्टोरेज ऑप्टिमायझेशन आणि सुविधा व्यवस्थापन",
      totalCapacity: "एकूण क्षमता",
      utilization: "वापर",
      activeContracts: "सक्रिय करार",
      revenue: "मासिक उत्पन्न",
      currentStorage: "सध्याचे स्टोरेज",
      product: "उत्पादन",
      quantity: "प्रमाण",
      storedSince: "पासून साठवले",
      aiCapacityOptimization: "AI क्षमता ऑप्टिमायझेशन",
      availableSpace: "उपलब्ध जागा",
      recommended: "शिफारस केलेले",
      optimizeNow: "आत्ता ऑप्टिमायझ करा",
      aiClimateControl: "AI हवामान नियंत्रण",
      currentTemp: "सध्याचे तापमान",
      optimalRange: "इष्टतम श्रेणी",
      viewAllZones: "सर्व हवामान झोन पहा",
      aiMaintenanceAlerts: "AI देखभाल अलर्ट",
      equipment: "उपकरणे",
      lastMaintenance: "शेवटची देखभाल",
      scheduleMaintenance: "देखभाल शेड्यूल करा",
      uploadInspection: "उपकरण फोटो अपलोड करा",
      analyzingEquipment: "उपकरणाचे विश्लेषण करत आहे",
      aiRevenueForecast: "AI उत्पन्न अंदाज",
      smartSuggestion: "स्मार्ट सूचना",
      demandForecast: "मागणी अंदाज",
      capacityTrend: "क्षमता कल",
      rateOptimization: "दर ऑप्टिमायझेशन",
      aiStorageAssistant: "AI स्टोरेज सहाय्यक",
      askAbout: "क्षमता, हवामान नियंत्रण, देखभाल, किंमत... याबद्दल विचारा",
      askAI: "AI ला विचारा",
      speakNow: "आता बोला...",
      quickActions: "द्रुत क्रिया",
      capacityPlanning: "क्षमता नियोजन",
      climateMonitoring: "हवामान मॉनिटरिंग",
      maintenanceSchedule: "देखभाल वेळापत्रक",
      revenueAnalysis: "उत्पन्न विश्लेषण"
    }
  };

  const content = dashboardContent[language] || dashboardContent.en;

  // Real AI Data for Storage
  const [aiData, setAiData] = useState({
    capacityOptimization: [
      { 
        zone: 'Cold Storage A', 
        currentUsage: '75%', 
        available: '25%', 
        recommendation: language === 'hi' ? 'टमाटर को जोन बी में स्थानांतरित करें - बेहतर तापमान नियंत्रण' : 
                       language === 'mr' ? 'टोमॅटो झोन बी मध्ये हलवा - चांगले तापमान नियंत्रण' :
                       'Move tomatoes to Zone B - better temperature control',
        efficiencyGain: '15%'
      },
      { 
        zone: 'Warehouse 2', 
        currentUsage: '60%', 
        available: '40%', 
        recommendation: language === 'hi' ? 'आलू भंडारण के लिए उपलब्ध - उच्च मांग अवधि के लिए तैयार' : 
                       language === 'mr' ? 'बटाटा साठवणुकीसाठी उपलब्ध - उच्च मागणी कालावधीसाठी तयार' :
                       'Available for potato storage - ready for high demand period',
        efficiencyGain: '12%'
      }
    ],
    climateControl: [
      { zone: 'Cold Storage A', currentTemp: '4°C', optimal: '2-5°C', humidity: '85%', status: 'Optimal' },
      { zone: 'Cold Storage B', currentTemp: '6°C', optimal: '1-3°C', humidity: '82%', status: 'Needs Adjustment' },
      { zone: 'Dry Storage', currentTemp: '18°C', optimal: '15-20°C', humidity: '65%', status: 'Optimal' }
    ],
    maintenanceAlerts: [
      { 
        equipment: 'Compressor Unit A', 
        issue: language === 'hi' ? 'असामान्य कंपन का पता चला' : 
              language === 'mr' ? 'असामान्य कंपन आढळले' :
              'Unusual vibration detected',
        severity: 'high',
        lastMaintenance: '45 days ago',
        recommendation: language === 'hi' ? '24 घंटे के भीतर तकनीकी जांच की आवश्यकता' : 
                       language === 'mr' ? '24 तासांत तांत्रिक तपासणी आवश्यक' :
                       'Technical inspection required within 24 hours'
      }
    ],
    revenueForecast: {
      suggestion: language === 'hi' ? 'अगले महीने आलू भंडारण दर 15% बढ़ाएं - मांग में 25% वृद्धि की उम्मीद' : 
                 language === 'mr' ? 'पुढील महिन्यात बटाटा स्टोरेज दर 15% वाढवा - मागणीत 25% वाढीची शक्यता' :
                 'Increase potato storage rates by 15% next month - 25% demand surge expected',
      demand: language === 'hi' ? 'उच्च (आलू)' : language === 'mr' ? 'उच्च (बटाटा)' : 'High (Potatoes)',
      capacity: language === 'hi' ? '75% भरा हुआ' : language === 'mr' ? '75% भरलेले' : '75% Filled',
      rates: language === 'hi' ? 'बढ़ाने का अवसर' : language === 'mr' ? 'वाढवण्याची संधी' : 'Opportunity to Increase'
    }
  });

  // Sample storage data
  const [currentStorage] = useState([
    { 
      product: 'Tomatoes', 
      quantity: '2,000 kg', 
      storedSince: '2024-01-05', 
      zone: 'Cold Storage A',
      client: 'Fresh Mart'
    },
    { 
      product: 'Potatoes', 
      quantity: '5,000 kg', 
      storedSince: '2024-01-08', 
      zone: 'Cold Storage B',
      client: 'Veggie King'
    },
    { 
      product: 'Onions', 
      quantity: '3,000 kg', 
      storedSince: '2024-01-10', 
      zone: 'Dry Storage',
      client: 'Spice World'
    }
  ]);

  // AI Chat Responses
  const aiResponses = {
    'capacity': language === 'hi' ? "📊 वर्तमान क्षमता उपयोग: 72%। शीत भंडारण A में 25% उपलब्ध स्थान। अनुशंसा: टमाटर को जोन बी में स्थानांतरित करने से 15% दक्षता लाभ।" :
               language === 'mr' ? "📊 सध्याची क्षमता वापर: 72%. कोल्ड स्टोरेज A मध्ये 25% उपलब्ध जागा. शिफारस: टोमॅटो झोन बी मध्ये हलवल्याने 15% कार्यक्षमता फायदा." :
               "📊 Current capacity utilization: 72%. 25% available space in Cold Storage A. Recommendation: Moving tomatoes to Zone B provides 15% efficiency gain.",
    'climate': language === 'hi' ? "🌡️ जलवायु स्थिति: शीत भंडारण A (4°C) इष्टतम, शीत भंडारण B (6°C) समायोजन की आवश्यकता। आर्द्रता सभी क्षेत्रों में स्थिर।" :
              language === 'mr' ? "🌡️ हवामान स्थिती: कोल्ड स्टोरेज A (4°C) इष्टतम, कोल्ड स्टोरेज B (6°C) समायोजन आवश्यक. आर्द्रता सर्व झोनमध्ये स्थिर." :
              "🌡️ Climate status: Cold Storage A (4°C) optimal, Cold Storage B (6°C) needs adjustment. Humidity stable across all zones.",
    'maintenance': language === 'hi' ? "🔧 रखरखाव अलर्ट: कंप्रेसर यूनिट A में असामान्य कंपन। 24 घंटे के भीतर तकनीकी जांच की सिफारिश। अंतिम रखरखाव: 45 दिन पहले।" :
                   language === 'mr' ? "🔧 देखभाल अलर्ट: कंप्रेसर युनिट A मध्ये असामान्य कंपन. 24 तासांत तांत्रिक तपासणीची शिफारस. शेवटची देखभाल: 45 दिवसांपूर्वी." :
                   "🔧 Maintenance alert: Unusual vibration in Compressor Unit A. Technical inspection recommended within 24 hours. Last maintenance: 45 days ago.",
    'revenue': language === 'hi' ? "💰 राजस्व अवसर: आलू भंडारण दर 15% बढ़ाएं (वर्तमान ₹50/किग्रा/माह)। अगले महीने 25% मांग वृद्धि की उम्मीद। संभावित लाभ: ₹37,500/माह" :
               language === 'mr' ? "💰 उत्पन्न संधी: बटाटा स्टोरेज दर 15% वाढवा (सध्याचे ₹50/किग्रा/महिना). पुढील महिन्यात 25% मागणी वाढीची शक्यता. संभाव्य नफा: ₹37,500/महिना" :
               "💰 Revenue opportunity: Increase potato storage rates by 15% (current ₹50/kg/month). 25% demand surge expected next month. Potential profit: ₹37,500/month",
    'default': language === 'hi' ? "🤖 मैं भंडारण क्षमता, जलवायु नियंत्रण, रखरखाव और राजस्व अनुकूलन में मदद कर सकता हूं। आप क्या जानना चाहते हैं?" :
               language === 'mr' ? "🤖 मी स्टोरेज क्षमता, हवामान नियंत्रण, देखभाल आणि उत्पन्न ऑप्टिमायझेशन मध्ये मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?" :
               "🤖 I can help with storage capacity, climate control, maintenance, and revenue optimization. What would you like to know?"
  };

  // Initialize chat
  useEffect(() => {
    const greeting = language === 'hi' 
      ? "👋 नमस्ते! मैं आपका AI स्टोरेज मैनेजर हूं। मैं भंडारण क्षमता, जलवायु नियंत्रण, रखरखाव और राजस्व प्रबंधन में मदद कर सकता हूं।"
      : language === 'mr'
      ? "👋 नमस्कार! मी तुमचा AI स्टोरेज व्यवस्थापक आहे. मी स्टोरेज क्षमता, हवामान नियंत्रण, देखभाल आणि उत्पन्न व्यवस्थापनात मदत करू शकतो."
      : "👋 Hello! I'm your AI Storage Manager. I can help with storage capacity, climate control, maintenance, and revenue management.";
    
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
    
    if (userMessage.includes('capacity') || userMessage.includes('space') || userMessage.includes('क्षमता') || userMessage.includes('जागा')) {
      aiResponse = aiResponses.capacity;
    }
    else if (userMessage.includes('climate') || userMessage.includes('temperature') || userMessage.includes('जलवायु') || userMessage.includes('तापमान')) {
      aiResponse = aiResponses.climate;
    }
    else if (userMessage.includes('maintenance') || userMessage.includes('repair') || userMessage.includes('रखरखाव') || userMessage.includes('देखभाल')) {
      aiResponse = aiResponses.maintenance;
    }
    else if (userMessage.includes('revenue') || userMessage.includes('income') || userMessage.includes('राजस्व') || userMessage.includes('उत्पन्न')) {
      aiResponse = aiResponses.revenue;
    }

    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
    }, 1000);

    setChatMessage('');
  };

  // Quick actions
  const quickActions = {
    en: ['Capacity status?', 'Climate control', 'Maintenance alerts', 'Revenue opportunities'],
    hi: ['क्षमता स्थिति?', 'जलवायु नियंत्रण', 'रखरखाव अलर्ट', 'राजस्व अवसर'],
    mr: ['क्षमता स्थिती?', 'हवामान नियंत्रण', 'देखभाल अलर्ट', 'उत्पन्न संधी']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{content.welcome}, {user?.name}!</h1>
              <p className="text-purple-200 text-xl mt-2 flex items-center">
                <span className="mr-2">🏭</span> {content.storageDashboard}
              </p>
            </div>
            <div className="text-right">
              <div className="text-purple-200">{user?.storageType || 'Cold Storage'}</div>
              <div className="text-purple-200">{user?.location || 'Pune'}</div>
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
            { icon: '📦', value: '500 tons', label: content.totalCapacity, color: 'purple' },
            { icon: '📊', value: '72%', label: content.utilization, color: 'blue' },
            { icon: '📝', value: '8', label: content.activeContracts, color: 'green' },
            { icon: '💰', value: '₹2.8L', label: content.revenue, color: 'yellow' }
          ].map((stat, index) => (
            <div key={index} className={`bg-white p-6 rounded-xl shadow-md border-l-4 border-${stat.color}-500`}>
              <div className={`text-2xl text-${stat.color}-600 mb-2`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Current Storage Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-purple-600 mr-2">🏪</span>
            {content.currentStorage}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">{content.product}</th>
                  <th className="px-4 py-2 text-left">{content.quantity}</th>
                  <th className="px-4 py-2 text-left">Storage Zone</th>
                  <th className="px-4 py-2 text-left">{content.storedSince}</th>
                  <th className="px-4 py-2 text-left">Client</th>
                </tr>
              </thead>
              <tbody>
                {currentStorage.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.product}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.zone.includes('Cold') ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.zone}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.storedSince}</td>
                    <td className="px-4 py-3">{item.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Capacity Optimization */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-green-600 mr-2">📈</span>
              {content.aiCapacityOptimization}
            </h3>
            <div className="space-y-4">
              {aiData.capacityOptimization.map((zone, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{zone.zone}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <div>
                          <div className="text-sm text-gray-600">Current Usage</div>
                          <div className="font-semibold">{zone.currentUsage}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">{content.availableSpace}</div>
                          <div className="font-semibold text-green-600">{zone.available}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">{content.recommended}:</div>
                    <p className="text-sm text-gray-700">{zone.recommendation}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600">Efficiency Gain: {zone.efficiencyGain}</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 text-sm">
                      {content.optimizeNow}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Climate Control */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-cyan-600 mr-2">🌡️</span>
              {content.aiClimateControl}
            </h3>
            <div className="space-y-3">
              {aiData.climateControl.map((zone, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  zone.status === 'Optimal' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{zone.zone}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      zone.status === 'Optimal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {zone.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">{content.currentTemp}:</span>
                      <span className="font-semibold ml-1">{zone.currentTemp}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{content.optimalRange}:</span>
                      <span className="font-semibold ml-1">{zone.optimal}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Humidity:</span>
                      <span className="font-semibold ml-1">{zone.humidity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 border-2 border-cyan-600 text-cyan-600 py-2 rounded-lg hover:bg-cyan-50 transition duration-300">
              {content.viewAllZones}
            </button>
          </div>

          {/* Maintenance Alerts */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              {content.aiMaintenanceAlerts}
            </h3>
            <div className="space-y-4">
              {aiData.maintenanceAlerts.map((alert, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-red-800">{alert.equipment}</h4>
                      <p className="text-red-600">{alert.issue}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      alert.severity === 'high' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {alert.severity} priority
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">{content.lastMaintenance}:</span>
                      <span className="text-sm text-gray-700 ml-2">{alert.lastMaintenance}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">{content.recommended}:</span>
                      <p className="text-sm text-gray-700">{alert.recommendation}</p>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300">
                    {content.scheduleMaintenance}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Forecast */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-green-600 mr-2">💰</span>
              {content.aiRevenueForecast}
            </h3>
            <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
              <div className="flex items-center mb-2">
                <span className="text-green-600 mr-2">💡</span>
                <span className="font-semibold">{content.smartSuggestion}</span>
              </div>
              <p className="text-green-800">{aiData.revenueForecast.suggestion}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '📈', label: content.demandForecast, value: aiData.revenueForecast.demand },
                { icon: '📦', label: content.capacityTrend, value: aiData.revenueForecast.capacity },
                { icon: '💵', label: content.rateOptimization, value: aiData.revenueForecast.rates, colSpan: 'col-span-2' }
              ].map((item, index) => (
                <div key={index} className={`text-center p-3 bg-gray-50 rounded-lg ${item.colSpan || ''}`}>
                  <div className="text-lg">{item.icon}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                  <div className={`font-semibold ${
                    item.label.includes('Demand') ? 'text-green-600' : 
                    item.label.includes('Rate') ? 'text-blue-600' : 'text-gray-700'
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
            {content.aiStorageAssistant}
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
                    ? 'bg-purple-600 text-white rounded-br-none' 
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
              />
              <button
                type="button"
                onClick={isListening ? stopVoiceInput : startVoiceInput}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : voiceRecognition.isSupported
                    ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!voiceRecognition.isSupported}
              >
                {isListening ? <FaStop className="w-4 h-4" /> : <FaMicrophone className="w-4 h-4" />}
              </button>
            </div>
            <button 
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 font-medium"
            >
              {content.askAI}
            </button>
          </form>
        </div>
      </div>

      {/* Posts Section */}
      <div className="container mx-auto px-4 pb-8">
        <h3 className="text-2xl font-semibold mb-4 flex items-center">
          <span className="text-purple-600 mr-2">📝</span>
          {language === 'hi' ? 'स्टोरेज पोस्ट' : language === 'mr' ? 'स्टोरेज पोस्ट' : 'Storage Posts'}
        </h3>
        <PostsFeed userType="storage" />
      </div>
      <VoicePostCreator onPostCreated={() => { /* optional refresh */ }} />
      <Footer />
    </div>
  );
};

export default StorageDashboard;