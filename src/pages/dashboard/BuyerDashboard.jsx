import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoiceRecognition } from '../../hooks/UseVoiceRecognition';
import { toast } from 'react-toastify';
import { FaMicrophone, FaStop, FaShoppingCart, FaChartLine, FaTruck, FaWarehouse } from 'react-icons/fa';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PostsFeed from "../../components/PostsFeed";
import VoicePostCreator from "../../components/VoicePostCreator";

const BuyerDashboard = () => {
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
      buyerDashboard: "Buyer Dashboard",
      aiAssistantActive: "AI Procurement Assistant Active",
      realTimeInsights: "Smart sourcing and market intelligence for better deals",
      activeOrders: "Active Orders",
      monthlySpend: "Monthly Spend",
      supplierRating: "Supplier Rating",
      savingsRate: "Savings Rate",
      currentOrders: "Current Orders",
      supplier: "Supplier",
      status: "Status",
      deliveryDate: "Delivery Date",
      aiSupplierRecommendations: "AI Supplier Recommendations",
      rating: "Rating",
      deliveryTime: "Delivery Time",
      connectSupplier: "Connect Supplier",
      aiPriceIntelligence: "AI Price Intelligence",
      marketAvg: "Market Avg",
      bestDeal: "Best Deal",
      viewAllPrices: "View All Market Prices",
      aiQualityAlerts: "AI Quality Alerts",
      qualityIssue: "Quality Issue",
      reportedBy: "Reported by",
      actionRequired: "Action Required",
      resolution: "Resolution",
      uploadQualityCheck: "Upload Quality Check Photo",
      analyzingQuality: "Analyzing Quality",
      aiMarketTrends: "AI Market Trends",
      smartSuggestion: "Smart Suggestion",
      demandTrend: "Demand Trend",
      supplyLevel: "Supply Level",
      priceOutlook: "Price Outlook",
      aiProcurementAssistant: "AI Procurement Assistant",
      askAbout: "Ask about supplier ratings, prices, quality, delivery...",
      askAI: "Ask AI",
      speakNow: "Speak now...",
      quickActions: "Quick Actions",
      findSuppliers: "Find Suppliers",
      priceComparison: "Price Comparison",
      qualityReports: "Quality Reports",
      logisticsTracking: "Logistics Tracking"
    },
    hi: {
      welcome: "वापस स्वागत है",
      buyerDashboard: "खरीदार डैशबोर्ड",
      aiAssistantActive: "एआई खरीद सहायक सक्रिय",
      realTimeInsights: "बेहतर सौदों के लिए स्मार्ट सोर्सिंग और बाजार खुफिया",
      activeOrders: "सक्रिय ऑर्डर",
      monthlySpend: "मासिक खर्च",
      supplierRating: "आपूर्तिकर्ता रेटिंग",
      savingsRate: "बचत दर",
      currentOrders: "वर्तमान ऑर्डर",
      supplier: "आपूर्तिकर्ता",
      status: "स्थिति",
      deliveryDate: "वितरण तिथि",
      aiSupplierRecommendations: "एआई आपूर्तिकर्ता सिफारिशें",
      rating: "रेटिंग",
      deliveryTime: "वितरण समय",
      connectSupplier: "आपूर्तिकर्ता से जुड़ें",
      aiPriceIntelligence: "एआई मूल्य खुफिया",
      marketAvg: "बाजार औसत",
      bestDeal: "सर्वोत्तम सौदा",
      viewAllPrices: "सभी बाजार मूल्य देखें",
      aiQualityAlerts: "एआई गुणवत्ता अलर्ट",
      qualityIssue: "गुणवत्ता समस्या",
      reportedBy: "द्वारा रिपोर्ट किया गया",
      actionRequired: "कार्रवाई आवश्यक",
      resolution: "समाधान",
      uploadQualityCheck: "गुणवत्ता जांच फोटो अपलोड करें",
      analyzingQuality: "गुणवत्ता का विश्लेषण कर रहा है",
      aiMarketTrends: "एआई बाजार रुझान",
      smartSuggestion: "स्मार्ट सुझाव",
      demandTrend: "मांग रुझान",
      supplyLevel: "आपूर्ति स्तर",
      priceOutlook: "मूल्य दृष्टिकोण",
      aiProcurementAssistant: "एआई खरीद सहायक",
      askAbout: "आपूर्तिकर्ता रेटिंग, कीमतें, गुणवत्ता, वितरण... के बारे में पूछें",
      askAI: "एआई से पूछें",
      speakNow: "अब बोलें...",
      quickActions: "त्वरित कार्य",
      findSuppliers: "आपूर्तिकर्ता ढूंढें",
      priceComparison: "मूल्य तुलना",
      qualityReports: "गुणवत्ता रिपोर्ट",
      logisticsTracking: "लॉजिस्टिक्स ट्रैकिंग"
    },
    mr: {
      welcome: "पुन्हा स्वागत आहे",
      buyerDashboard: "खरेदीदार डॅशबोर्ड",
      aiAssistantActive: "AI खरेदी सहाय्यक सक्रिय",
      realTimeInsights: "चांगल्या सौद्यांसाठी स्मार्ट सोर्सिंग आणि बाजार माहिती",
      activeOrders: "सक्रिय ऑर्डर",
      monthlySpend: "मासिक खर्च",
      supplierRating: "पुरवठादार रेटिंग",
      savingsRate: "बचत दर",
      currentOrders: "सध्याचे ऑर्डर",
      supplier: "पुरवठादार",
      status: "स्थिती",
      deliveryDate: "वितरण तारीख",
      aiSupplierRecommendations: "AI पुरवठादार शिफारसी",
      rating: "रेटिंग",
      deliveryTime: "वितरण वेळ",
      connectSupplier: "पुरवठादाराशी कनेक्ट करा",
      aiPriceIntelligence: "AI किंमत माहिती",
      marketAvg: "बाजार सरासरी",
      bestDeal: "सर्वोत्तम सौदा",
      viewAllPrices: "सर्व बाजार किंमती पहा",
      aiQualityAlerts: "AI गुणवत्ता अलर्ट",
      qualityIssue: "गुणवत्ता समस्या",
      reportedBy: "यांनी नोंदवले",
      actionRequired: "कृती आवश्यक",
      resolution: "निराकरण",
      uploadQualityCheck: "गुणवत्ता तपासणी फोटो अपलोड करा",
      analyzingQuality: "गुणवत्तेचे विश्लेषण करत आहे",
      aiMarketTrends: "AI बाजार कल",
      smartSuggestion: "स्मार्ट सूचना",
      demandTrend: "मागणी कल",
      supplyLevel: "पुरवठा स्तर",
      priceOutlook: "किंमत दृष्टीकोन",
      aiProcurementAssistant: "AI खरेदी सहाय्यक",
      askAbout: "पुरवठादार रेटिंग, किंमती, गुणवत्ता, वितरण... याबद्दल विचारा",
      askAI: "AI ला विचारा",
      speakNow: "आता बोला...",
      quickActions: "द्रुत क्रिया",
      findSuppliers: "पुरवठादार शोधा",
      priceComparison: "किंमत तुलना",
      qualityReports: "गुणवत्ता अहवाल",
      logisticsTracking: "लॉजिस्टिक्स ट्रॅकिंग"
    }
  };

  const content = dashboardContent[language] || dashboardContent.en;

  // Real AI Data for Buyer
  const [aiData, setAiData] = useState({
    supplierRecommendations: [
      { 
        name: 'Green Valley Farms', 
        rating: 4.8, 
        specialty: language === 'hi' ? 'जैविक टमाटर और शिमला मिर्च' : 
                 language === 'mr' ? 'ऑर्गेनिक टोमॅटो आणि बेल पेप्पर' :
                 'Organic Tomatoes & Bell Peppers',
        deliveryTime: '24-48 hours',
        priceAdvantage: language === 'hi' ? 'बाजार से 12% कम' : 
                       language === 'mr' ? 'बाजारापेक्षा 12% कम' :
                       '12% below market',
        reliability: '98%'
      },
      { 
        name: 'Fresh Harvest Co-op', 
        rating: 4.6, 
        specialty: language === 'hi' ? 'ताजी सब्जियां - बल्क ऑर्डर' : 
                 language === 'mr' ? 'ताज्या भाज्या - मोठ्या प्रमाणात ऑर्डर' :
                 'Fresh Vegetables - Bulk Orders',
        deliveryTime: '48-72 hours',
        priceAdvantage: language === 'hi' ? 'मोटे ऑर्डर पर 15% छूट' : 
                       language === 'mr' ? 'मोठ्या ऑर्डरवर 15% सूट' :
                       '15% discount on bulk orders',
        reliability: '95%'
      }
    ],
    priceIntelligence: [
      { product: 'Tomatoes', marketAvg: 28, bestDeal: 22, supplier: 'Green Valley', savings: '21%' },
      { product: 'Potatoes', marketAvg: 20, bestDeal: 16, supplier: 'Farm Fresh', savings: '20%' },
      { product: 'Onions', marketAvg: 35, bestDeal: 28, supplier: 'Veggie Mart', savings: '20%' }
    ],
    qualityAlerts: [
      { 
        product: 'Tomatoes Batch #T234', 
        issue: language === 'hi' ? 'कुछ यूनिट्स में नरम स्थान' : 
              language === 'mr' ? 'काही युनिटमध्ये मऊ ठिकाणे' :
              'Soft spots in some units',
        severity: 'medium',
        reportedBy: 'Quality Team',
        resolution: language === 'hi' ? 'आपूर्तिकर्ता से 15% क्रेडिट की मांग करें' : 
                   language === 'mr' ? 'पुरवठादाराकडून 15% क्रेडिट मागा' :
                   'Request 15% credit from supplier'
      }
    ],
    marketTrends: {
      suggestion: language === 'hi' ? 'अगले सप्ताह आलू की खरीद बढ़ाएं - कीमतें 18% गिरने की उम्मीद' : 
                 language === 'mr' ? 'पुढील आठवड्यात बटाटा खरेदी वाढवा - किंमती 18% खाली येण्याची शक्यता' :
                 'Increase potato purchases next week - prices expected to drop 18%',
      demand: language === 'hi' ? 'उच्च (टमाटर)' : language === 'mr' ? 'उच्च (टोमॅटो)' : 'High (Tomatoes)',
      supply: language === 'hi' ? 'पर्याप्त (आलू)' : language === 'mr' ? 'पुरेसे (बटाटा)' : 'Adequate (Potatoes)',
      outlook: language === 'hi' ? 'स्थिर से गिरावट' : language === 'mr' ? 'स्थिर ते घट' : 'Stable to Decreasing'
    }
  });

  // Sample order data
  const [currentOrders] = useState([
    { 
      id: 'ORD-001', 
      product: 'Tomatoes', 
      supplier: 'Green Valley Farms', 
      quantity: '500 kg', 
      status: language === 'hi' ? 'वितरण के लिए तैयार' : language === 'mr' ? 'वितरणासाठी तयार' : 'Ready for Delivery', 
      deliveryDate: '2024-01-15',
      value: '₹14,000'
    },
    { 
      id: 'ORD-002', 
      product: 'Potatoes', 
      supplier: 'Farm Fresh', 
      quantity: '300 kg', 
      status: language === 'hi' ? 'प्रसंस्करण' : language === 'mr' ? 'प्रक्रिया करत आहे' : 'Processing', 
      deliveryDate: '2024-01-18',
      value: '₹5,400'
    }
  ]);

  // AI Chat Responses
  const aiResponses = {
    'supplier': {
      tomatoes: language === 'hi' ? "🍅 टमाटर के लिए शीर्ष आपूर्तिकर्ता: ग्रीन वैली फार्म्स (4.8⭐), 24-48 घंटे वितरण, बाजार से 12% कम कीमत। विश्वसनीयता: 98%" :
               language === 'mr' ? "🍅 टोमॅटोसाठी टॉप पुरवठादार: ग्रीन व्हॅली फार्म्स (4.8⭐), 24-48 तास वितरण, बाजारापेक्षा 12% कम किंमत. विश्वासार्हता: 98%" :
               "🍅 Top supplier for tomatoes: Green Valley Farms (4.8⭐), 24-48hr delivery, 12% below market. Reliability: 98%",
      potatoes: language === 'hi' ? "🥔 आलू के लिए सर्वोत्तम सौदा: फार्म फ्रेश, ₹16/किग्रा (बाजार: ₹20), 95% विश्वसनीयता। बल्क ऑर्डर के लिए 10% अतिरिक्त छूट।" :
               language === 'mr' ? "🥔 बटाट्यासाठी सर्वोत्तम सौदा: फार्म फ्रेश, ₹16/किग्रा (बाजार: ₹20), 95% विश्वासार्हता. मोठ्या ऑर्डरसाठी 10% अतिरिक्त सूट." :
               "🥔 Best deal for potatoes: Farm Fresh, ₹16/kg (Market: ₹20), 95% reliability. 10% extra discount on bulk orders."
    },
    'price': language === 'hi' ? "💰 वर्तमान थोक मूल्य: टमाटर ₹25-28/किग्रा, आलू ₹18-20/किग्रा, प्याज ₹30-35/किग्रा। अगले सप्ताह आलू की कीमतों में 15-20% गिरावट की उम्मीद।" :
             language === 'mr' ? "💰 सध्याचे घाऊक दर: टोमॅटो ₹25-28/किग्रा, बटाटा ₹18-20/किग्रा, कांदा ₹30-35/किग्रा. पुढील आठवड्यात बटाट्याच्या किंमती 15-20% खाली येण्याची शक्यता." :
             "💰 Current wholesale prices: Tomatoes ₹25-28/kg, Potatoes ₹18-20/kg, Onions ₹30-35/kg. Potato prices expected to drop 15-20% next week.",
    'quality': language === 'hi' ? "🔍 गुणवत्ता अलर्ट: टमाटर बैच #T234 में नरम स्थानों की सूचना। 15% क्रेडिट के लिए ग्रीन वैली से संपर्क करें। नए बैच की जांच अनिवार्य है।" :
               language === 'mr' ? "🔍 गुणवत्ता अलर्ट: टोमॅटो बॅच #T234 मध्ये मऊ ठिकाणांची नोंद. 15% क्रेडिटसाठी ग्रीन व्हॅलीशी संपर्क साधा. नवीन बॅच तपासणी अनिवार्य." :
               "🔍 Quality alert: Soft spots reported in Tomato Batch #T234. Contact Green Valley for 15% credit. New batch inspection mandatory.",
    'default': language === 'hi' ? "🤖 मैं आपूर्तिकर्ता रेटिंग, मूल्य तुलना, गुणवत्ता अलर्ट और बाजार रुझान में मदद कर सकता हूं। आप क्या जानना चाहते हैं?" :
               language === 'mr' ? "🤖 मी पुरवठादार रेटिंग, किंमत तुलना, गुणवत्ता अलर्ट आणि बाजार कल मध्ये मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?" :
               "🤖 I can help with supplier ratings, price comparisons, quality alerts, and market trends. What would you like to know?"
  };

  // Initialize chat
  useEffect(() => {
    const greeting = language === 'hi' 
      ? "👋 नमस्ते! मैं आपका AI खरीद सहायक हूं। मैं आपूर्तिकर्ता ढूंढने, मूल्य तुलना, गुणवत्ता जांच और बाजार विश्लेषण में मदद कर सकता हूं।"
      : language === 'mr'
      ? "👋 नमस्कार! मी तुमचा AI खरेदी सहाय्यक आहे. मी पुरवठादार शोधणे, किंमत तुलना, गुणवत्ता तपासणी आणि बाजार विश्लेषणात मदत करू शकतो."
      : "👋 Hello! I'm your AI Procurement Assistant. I can help you find suppliers, compare prices, check quality, and analyze market trends.";
    
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
    
    if (userMessage.includes('supplier') || userMessage.includes('vendor') || userMessage.includes('आपूर्तिकर्ता') || userMessage.includes('पुरवठादार')) {
      if (userMessage.includes('tomato') || userMessage.includes('टमाटर') || userMessage.includes('टोमॅटो')) {
        aiResponse = aiResponses.supplier.tomatoes;
      } else if (userMessage.includes('potato') || userMessage.includes('आलू') || userMessage.includes('बटाटा')) {
        aiResponse = aiResponses.supplier.potatoes;
      } else {
        aiResponse = language === 'hi' 
          ? "🏪 मेरे पास टमाटर, आलू, प्याज, गेहूं के आपूर्तिकर्ता डेटा है। आप किस उत्पाद में रुचि रखते हैं?"
          : language === 'mr'
          ? "🏪 माझ्याकडे टोमॅटो, बटाटा, कांदा, गहू यांचे पुरवठादार डेटा आहे. तुम्हाला कोणत्या उत्पादनात रस आहे?"
          : "🏪 I have supplier data for tomatoes, potatoes, onions, wheat. Which product are you interested in?";
      }
    }
    else if (userMessage.includes('price') || userMessage.includes('rate') || userMessage.includes('कीमत') || userMessage.includes('किंमत')) {
      aiResponse = aiResponses.price;
    }
    else if (userMessage.includes('quality') || userMessage.includes('गुणवत्ता')) {
      aiResponse = aiResponses.quality;
    }

    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
    }, 1000);

    setChatMessage('');
  };

  // Quick actions
  const quickActions = {
    en: ['Tomato suppliers?', 'Current prices', 'Quality issues', 'Market trends'],
    hi: ['टमाटर आपूर्तिकर्ता?', 'वर्तमान कीमतें', 'गुणवत्ता समस्याएं', 'बाजार रुझान'],
    mr: ['टोमॅटो पुरवठादार?', 'सध्याच्या किंमती', 'गुणवत्ता समस्या', 'बाजार कल']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{content.welcome}, {user?.name}!</h1>
              <p className="text-blue-200 text-xl mt-2 flex items-center">
                <span className="mr-2">🛒</span> {content.buyerDashboard}
              </p>
            </div>
            <div className="text-right">
              <div className="text-blue-200">{user?.businessType || 'Retail Store'}</div>
              <div className="text-blue-200">{user?.location || 'Mumbai'}</div>
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
            { icon: '📦', value: currentOrders.length, label: content.activeOrders, color: 'blue' },
            { icon: '💰', value: '₹85,400', label: content.monthlySpend, color: 'green' },
            { icon: '⭐', value: '4.7/5', label: content.supplierRating, color: 'yellow' },
            { icon: '📈', value: '12%', label: content.savingsRate, color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className={`bg-white p-6 rounded-xl shadow-md border-l-4 border-${stat.color}-500`}>
              <div className={`text-2xl text-${stat.color}-600 mb-2`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Current Orders Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-blue-600 mr-2">📋</span>
            {content.currentOrders}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">{content.supplier}</th>
                  <th className="px-4 py-2 text-left">{content.status}</th>
                  <th className="px-4 py-2 text-left">{content.deliveryDate}</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{order.product}</td>
                    <td className="px-4 py-3">{order.supplier}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status.includes('Ready') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{order.deliveryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AI Supplier Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-green-600 mr-2">🏆</span>
              {content.aiSupplierRecommendations}
            </h3>
            <div className="space-y-4">
              {aiData.supplierRecommendations.map((supplier, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{supplier.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{supplier.specialty}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                        <span className="text-yellow-800 font-semibold">{supplier.rating}</span>
                        <span className="text-yellow-600 ml-1">⭐</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                    <div>🚚 {content.deliveryTime}: {supplier.deliveryTime}</div>
                    <div>💵 {supplier.priceAdvantage}</div>
                    <div>📊 {language === 'hi' ? 'विश्वसनीयता' : language === 'mr' ? 'विश्वासार्हता' : 'Reliability'}: {supplier.reliability}</div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    {content.connectSupplier}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Price Intelligence */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-purple-600 mr-2">💡</span>
              {content.aiPriceIntelligence} (₹/kg)
            </h3>
            <div className="space-y-3">
              {aiData.priceIntelligence.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">
                      {item.product === 'Tomatoes' ? '🍅' : item.product === 'Potatoes' ? '🥔' : '🧅'}
                    </span>
                    <div>
                      <span className="font-semibold">{item.product}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 line-through">₹{item.marketAvg}</div>
                    <div className="font-semibold text-green-600 text-lg">₹{item.bestDeal}</div>
                    <div className="text-xs text-green-600">Save {item.savings}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 border-2 border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition duration-300">
              {content.viewAllPrices}
            </button>
          </div>

          {/* Quality Alerts */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              {content.aiQualityAlerts}
            </h3>
            <div className="space-y-4">
              {aiData.qualityAlerts.map((alert, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-red-800">{alert.product}</h4>
                      <p className="text-red-600">{content.qualityIssue}: {alert.issue}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      alert.severity === 'high' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {alert.severity} risk
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">{content.reportedBy}:</span>
                      <span className="text-sm text-gray-700 ml-2">{alert.reportedBy}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">{content.resolution}:</span>
                      <p className="text-sm text-gray-700">{alert.resolution}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-center text-red-600 font-semibold">
                    {content.actionRequired}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-cyan-600 mr-2">📊</span>
              {content.aiMarketTrends}
            </h3>
            <div className="bg-cyan-50 rounded-lg p-4 mb-4 border border-cyan-200">
              <div className="flex items-center mb-2">
                <span className="text-cyan-600 mr-2">💡</span>
                <span className="font-semibold">{content.smartSuggestion}</span>
              </div>
              <p className="text-cyan-800">{aiData.marketTrends.suggestion}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '📈', label: content.demandTrend, value: aiData.marketTrends.demand },
                { icon: '📦', label: content.supplyLevel, value: aiData.marketTrends.supply },
                { icon: '💰', label: content.priceOutlook, value: aiData.marketTrends.outlook, colSpan: 'col-span-2' }
              ].map((item, index) => (
                <div key={index} className={`text-center p-3 bg-gray-50 rounded-lg ${item.colSpan || ''}`}>
                  <div className="text-lg">{item.icon}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                  <div className={`font-semibold ${
                    item.label.includes('Demand') ? 'text-green-600' : 
                    item.label.includes('Outlook') ? 'text-blue-600' : 'text-gray-700'
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
            {content.aiProcurementAssistant}
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
                    ? 'bg-blue-600 text-white rounded-br-none' 
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={isListening ? stopVoiceInput : startVoiceInput}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : voiceRecognition.isSupported
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!voiceRecognition.isSupported}
              >
                {isListening ? <FaStop className="w-4 h-4" /> : <FaMicrophone className="w-4 h-4" />}
              </button>
            </div>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
            >
              {content.askAI}
            </button>
          </form>
        </div>
      </div>

      {/* Posts Section */}
      <div className="container mx-auto px-4 pb-8">
        <h3 className="text-2xl font-semibold mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📝</span>
          {language === 'hi' ? 'खरीदारों की पोस्ट' : language === 'mr' ? 'खरेदीदारांच्या पोस्ट' : 'Buyers Posts'}
        </h3>
        <PostsFeed userType="buyer" />
      </div>
      <VoicePostCreator onPostCreated={() => { /* optional refresh */ }} />
      <Footer />
    </div>
  );
};

export default BuyerDashboard;