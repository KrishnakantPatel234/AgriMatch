// pages/dashboard/FarmerDashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { toast } from 'react-toastify';
import { FaMicrophone, FaStop, FaUpload, FaDownload, FaShare, FaSync } from 'react-icons/fa';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer"

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
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
      farmerDashboard: "Farmer Dashboard",
      aiAssistantActive: "AI Farming Assistant Active",
      realTimeInsights: "Real-time insights to maximize your yield and profits",
      activeCrops: "Active Crops",
      monthlyRevenue: "Monthly Revenue",
      buyerRating: "Buyer Rating",
      growthRate: "Growth Rate",
      yourCurrentCrops: "Your Current Crops",
      area: "Area",
      stage: "Stage",
      expectedYield: "Expected Yield",
      aiCropRecommendations: "AI Crop Recommendations",
      season: "Season",
      investment: "Investment",
      profit: "Profit",
      getDetailedAnalysis: "Get Detailed Analysis",
      aiPricePredictions: "AI Price Predictions",
      current: "Current",
      viewAllPriceTrends: "View All Price Trends",
      aiPestDetection: "AI Pest Detection",
      alert: "Alert",
      detectedOn: "Detected on",
      solution: "Solution",
      prevention: "Prevention",
      uploadCropPhoto: "Upload Crop Photo for AI Analysis",
      analyzingImage: "Analyzing Image",
      aiWeatherInsights: "AI Weather Insights",
      smartRecommendation: "Smart Recommendation",
      rainChance: "Rain Chance",
      tempRange: "Temp Range",
      soilMoisture: "Soil Moisture",
      irrigation: "Irrigation",
      aiFarmingAssistant: "AI Farming Assistant",
      askAbout: "Ask about crop prices, weather, pests, fertilizers...",
      askAI: "Ask AI",
      speakNow: "Speak now...",
      quickActions: "Quick Actions",
      marketTrends: "Market Trends",
      cropHealth: "Crop Health",
      financialOverview: "Financial Overview",
      exportOpportunities: "Export Opportunities"
    },
    hi: {
      welcome: "वापस स्वागत है",
      farmerDashboard: "किसान डैशबोर्ड",
      aiAssistantActive: "एआई फार्मिंग असिस्टेंट सक्रिय",
      realTimeInsights: "अपनी उपज और मुनाफे को अधिकतम करने के लिए रीयल-टाइम जानकारी",
      activeCrops: "सक्रिय फसलें",
      monthlyRevenue: "मासिक आय",
      buyerRating: "खरीदार रेटिंग",
      growthRate: "विकास दर",
      yourCurrentCrops: "आपकी वर्तमान फसलें",
      area: "क्षेत्र",
      stage: "चरण",
      expectedYield: "अनुमानित उपज",
      aiCropRecommendations: "एआई फसल सिफारिशें",
      season: "मौसम",
      investment: "निवेश",
      profit: "लाभ",
      getDetailedAnalysis: "विस्तृत विश्लेषण प्राप्त करें",
      aiPricePredictions: "एआई मूल्य भविष्यवाणी",
      current: "वर्तमान",
      viewAllPriceTrends: "सभी मूल्य रुझान देखें",
      aiPestDetection: "एआई कीट पहचान",
      alert: "चेतावनी",
      detectedOn: "पर पाया गया",
      solution: "समाधान",
      prevention: "रोकथाम",
      uploadCropPhoto: "एआई विश्लेषण के लिए फसल फोटो अपलोड करें",
      analyzingImage: "छवि का विश्लेषण कर रहा है",
      aiWeatherInsights: "एआई मौसम जानकारी",
      smartRecommendation: "स्मार्ट सिफारिश",
      rainChance: "बारिश की संभावना",
      tempRange: "तापमान सीमा",
      soilMoisture: "मिट्टी की नमी",
      irrigation: "सिंचाई",
      aiFarmingAssistant: "एआई फार्मिंग असिस्टेंट",
      askAbout: "फसल की कीमतें, मौसम, कीट, उर्वरक... के बारे में पूछें",
      askAI: "एआई से पूछें",
      speakNow: "अब बोलें...",
      quickActions: "त्वरित कार्य",
      marketTrends: "बाजार के रुझान",
      cropHealth: "फसल स्वास्थ्य",
      financialOverview: "वित्तीय अवलोकन",
      exportOpportunities: "निर्यात के अवसर"
    },
    mr: {
      welcome: "पुन्हा स्वागत आहे",
      farmerDashboard: "शेतकरी डॅशबोर्ड",
      aiAssistantActive: "AI शेती सहाय्यक सक्रिय",
      realTimeInsights: "तुमची उत्पादन आणि नफा वाढवण्यासाठी रिअल-टाइम माहिती",
      activeCrops: "सक्रिय पिके",
      monthlyRevenue: "मासिक उत्पन्न",
      buyerRating: "खरेदीदार रेटिंग",
      growthRate: "वाढ दर",
      yourCurrentCrops: "तुमची सध्याची पिके",
      area: "क्षेत्र",
      stage: "टप्पा",
      expectedYield: "अपेक्षित उत्पादन",
      aiCropRecommendations: "AI पिक शिफारसी",
      season: "हंगाम",
      investment: "गुंतवणूक",
      profit: "नफा",
      getDetailedAnalysis: "तपशीलवार विश्लेषण मिळवा",
      aiPricePredictions: "AI किंमत अंदाज",
      current: "सध्याचे",
      viewAllPriceTrends: "सर्व किंमत कल पहा",
      aiPestDetection: "AI किडी ओळख",
      alert: "सतर्कता",
      detectedOn: "वर आढळले",
      solution: "उपाय",
      prevention: "प्रतिबंध",
      uploadCropPhoto: "AI विश्लेषणासाठी पिक फोटो अपलोड करा",
      analyzingImage: "प्रतिमेचे विश्लेषण करत आहे",
      aiWeatherInsights: "AI हवामान माहिती",
      smartRecommendation: "स्मार्ट शिफारस",
      rainChance: "पाऊस संधी",
      tempRange: "तापमान श्रेणी",
      soilMoisture: "मातीतील ओलावा",
      irrigation: "सिंचन",
      aiFarmingAssistant: "AI शेती सहाय्यक",
      askAbout: "पिक किमती, हवामान, किडी, खते... याबद्दल विचारा",
      askAI: "AI ला विचारा",
      speakNow: "आता बोला...",
      quickActions: "द्रुत क्रिया",
      marketTrends: "बाजारातील कल",
      cropHealth: "पिक आरोग्य",
      financialOverview: "आर्थिक आढावा",
      exportOpportunities: "निर्यात संधी"
    }
  };

  const content = dashboardContent[language] || dashboardContent.en;

  // Real AI Data with dynamic updates
  const [aiData, setAiData] = useState({
    cropRecommendations: [
      { 
        crop: 'Tomatoes', 
        confidence: 92, 
        reason: language === 'hi' ? 'उच्च बाजार मांग (₹32-38/किग्रा), आपकी मिट्टी pH 6.5 के लिए उपयुक्त' : 
               language === 'mr' ? 'उच्च बाजार माग (₹32-38/किग्रा), आपल्या माती pH 6.5 साठी योग्य' :
               'High market demand (₹32-38/kg), suitable for your soil pH 6.5',
        season: language === 'hi' ? 'साल भर' : language === 'mr' ? 'संपूर्ण वर्ष' : 'Year-round',
        investment: '₹15,000/acre',
        profit: '₹45,000-60,000/acre'
      },
      { 
        crop: 'Bell Peppers', 
        confidence: 85, 
        reason: language === 'hi' ? 'निर्यात मांग बढ़ रही है, पिछले सीजन से 25% अधिक मार्जिन' :
               language === 'mr' ? 'निर्यात माग वाढत आहे, मागील हंगामापेक्षा 25% जास्त मार्जिन' :
               'Export demand growing, 25% higher margins than last season',
        season: language === 'hi' ? 'सर्दी' : language === 'mr' ? 'हिवाळा' : 'Winter',
        investment: '₹18,000/acre', 
        profit: '₹50,000-70,000/acre'
      }
    ],
    pricePredictions: [
      { crop: 'Tomatoes', current: 25, predicted: 32, trend: 'up', timeframe: '2 weeks' },
      { crop: 'Potatoes', current: 18, predicted: 15, trend: 'down', timeframe: '1 month' }
    ],
    pestAlerts: [
      { 
        crop: 'Tomatoes', 
        pest: 'Aphids', 
        severity: 'medium', 
        solution: language === 'hi' ? 'नीम ऑयल स्प्रे (2ml/लीटर) हर 7 दिन में लगाएं' :
                language === 'mr' ? 'कडूनिंब तेल स्प्रे (2ml/लीटर) दर 7 दिवसांनी लावा' :
                'Apply neem oil spray (2ml/liter) every 7 days',
        prevention: language === 'hi' ? 'पीले स्टिकी ट्रैप का उपयोग करें, उचित दूरी बनाए रखें' :
                   language === 'mr' ? 'पिवळे स्टिकी ट्रॅप वापरा, योग्य अंतर राखा' :
                   'Use yellow sticky traps, maintain proper spacing'
      }
    ],
    weatherInsights: {
      recommendation: language === 'hi' ? 'कटाई 2 दिन के लिए स्थगित करें - भारी बारिश की संभावना (45mm)' :
                     language === 'mr' ? 'कापणी 2 दिवसांसाठी पुढे ढकला - जोरदार पाऊसाची शक्यता (45mm)' :
                     'Delay harvesting by 2 days - heavy rain predicted (45mm)',
      risk: 'medium',
      soilMoisture: language === 'hi' ? 'इष्टतम (65%)' : language === 'mr' ? 'इष्टतम (65%)' : 'Optimal (65%)',
      irrigation: language === 'hi' ? 'इस सप्ताह पानी 20% कम करें' : 
                 language === 'mr' ? 'या आठवड्यात पाणी 20% कमी करा' :
                 'Reduce watering by 20% this week'
    }
  });

  // Sample crop data for the farmer
  const [farmerCrops] = useState([
    { 
      name: 'Tomatoes', 
      area: language === 'hi' ? '2 एकड़' : language === 'mr' ? '2 एकर' : '2 acres', 
      stage: language === 'hi' ? 'फूल आना' : language === 'mr' ? 'फुलोरा येणे' : 'Flowering', 
      health: language === 'hi' ? 'अच्छा' : language === 'mr' ? 'चांगले' : 'Good', 
      yield: '8 tons/acre' 
    },
    { 
      name: 'Potatoes', 
      area: language === 'hi' ? '1.5 एकड़' : language === 'mr' ? '1.5 एकर' : '1.5 acres', 
      stage: language === 'hi' ? 'कंद बनना' : language === 'mr' ? 'कंद तयार होणे' : 'Tuber Formation', 
      health: language === 'hi' ? 'उत्कृष्ट' : language === 'mr' ? 'उत्तम' : 'Excellent', 
      yield: '12 tons/acre' 
    }
  ]);

  // AI Chat Responses Database with multilingual support
  const aiResponses = {
    'price': {
      tomatoes: language === 'hi' ? "🍅 टमाटर की कीमतें अगले 2 हफ्तों में ₹32-38/किग्रा तक बढ़ने की उम्मीद है। वर्तमान थोक: ₹25-28/किग्रा।" :
               language === 'mr' ? "🍅 टोमॅटोच्या किंमती पुढील 2 आठवड्यात ₹32-38/किग्रा पर्यंत वाढण्याची शक्यता आहे. सध्याचे घाऊक: ₹25-28/किग्रा." :
               "🍅 Tomato prices are expected to rise to ₹32-38/kg in the next 2 weeks. Current wholesale: ₹25-28/kg.",
      potatoes: language === 'hi' ? "🥔 आलू की कीमतें एक महीने में ₹15-18/किग्रा तक गिर सकती हैं। संग्रहित स्टॉक अभी बेचने पर विचार करें।" :
               language === 'mr' ? "🥔 बटाट्याच्या किंमती एका महिन्यात ₹15-18/किग्रा पर्यंत खाली येऊ शकतात. साठवलेला स्टॉक आत्ताच विकण्याचा विचार करा." :
               "🥔 Potato prices may drop to ₹15-18/kg in a month. Consider selling stored stock now."
    },
    'weather': language === 'hi' ? "🌤️ अगले 7 दिन: हल्की बारिश की उम्मीद (15mm), तापमान 24°-32°C। सब्जी की फसलों के लिए अच्छा। मिट्टी की नमी इष्टतम।" :
              language === 'mr' ? "🌤️ पुढील 7 दिवस: हलका पाऊस अपेक्षित (15mm), तापमान 24°-32°C। भाजीपाला पिकांसाठी चांगले. मातीतील ओलावा इष्टतम." :
              "🌤️ Next 7 days: Light rain expected (15mm), temperatures 24°-32°C. Good for vegetable crops. Soil moisture optimal.",
    'pest': language === 'hi' ? "🐛 इस सीजन के सामान्य कीट: टमाटर पर एफिड्स, चावल पर लीफ फोल्डर। एकीकृत कीट प्रबंधन का उपयोग करें। विशिष्ट निदान के लिए फोटो अपलोड करें।" :
            language === 'mr' ? "🐛 या हंगामातील सामान्य किडी: टोमॅटोवर एफिड्स, तांदूळावर लीफ फोल्डर. एकात्मिक किडी व्यवस्थापन वापरा. विशिष्ट निदानासाठी फोटो अपलोड करा." :
            "🐛 Common pests this season: Aphids on tomatoes, Leaf folder on rice. Use integrated pest management. Upload photos for specific diagnosis.",
    'default': language === 'hi' ? "🤖 मैं मदद कर सकता हूं: फसल की कीमतें, मौसम का पूर्वानुमान, कीट नियंत्रण, उर्वरक सिफारिशें, बाजार के रुझान। कुछ भी पूछें!" :
               language === 'mr' ? "🤖 मी मदत करू शकतो: पिक किमती, हवामान अंदाज, किडी नियंत्रण, खत शिफारसी, बाजार कल. काहीही विचारा!" :
               "🤖 I can help with: crop prices, weather forecasts, pest control, fertilizer recommendations, market trends. Ask me anything!"
  };

  // Initialize chat with multilingual greeting
  useEffect(() => {
    const greeting = language === 'hi' 
      ? "👋 नमस्ते! मैं आपका AI फार्मिंग असिस्टेंट हूं। मैं फसल सलाह, बाजार मूल्य, मौसम की जानकारी और कीट प्रबंधन में मदद कर सकता हूं। आप क्या जानना चाहेंगे?"
      : language === 'mr'
      ? "👋 नमस्कार! मी तुमचा AI शेती सहाय्यक आहे. मी पिक सल्ला, बाजारभाव, हवामान माहिती आणि किडी व्यवस्थापनात मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?"
      : "👋 Hello! I'm your AI Farming Assistant. I can help with crop advice, market prices, weather insights, and pest management. What would you like to know?";
    
    setChatHistory([{ type: 'ai', message: greeting }]);
  }, [language]);

  // Auto-scroll chat to bottom
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

  // Simulate AI Analysis
  const analyzeCropImage = (image) => {
    setIsAnalyzing(true);
    toast.info(language === 'hi' ? 'आपकी फसल छवि का AI विश्लेषण कर रहा है...' : 
               language === 'mr' ? 'तुमच्या पिक प्रतिमेचे AI विश्लेषण करत आहे...' :
               'AI is analyzing your crop image...');
    
    setTimeout(() => {
      const results = {
        en: [
          { health: 'Good', issues: 'Minor nutrient deficiency detected', recommendation: 'Apply balanced NPK fertilizer', confidence: 87 },
          { health: 'Excellent', issues: 'No significant issues found', recommendation: 'Continue current practices', confidence: 92 },
          { health: 'Needs Attention', issues: 'Early signs of fungal infection', recommendation: 'Apply fungicide and improve drainage', confidence: 78 }
        ],
        hi: [
          { health: 'अच्छा', issues: 'मामूली पोषक तत्व की कमी का पता चला', recommendation: 'संतुलित NPK उर्वरक लगाएं', confidence: 87 },
          { health: 'उत्कृष्ट', issues: 'कोई महत्वपूर्ण समस्या नहीं मिली', recommendation: 'वर्तमान प्रथाएं जारी रखें', confidence: 92 },
          { health: 'ध्यान देने की आवश्यकता', issues: 'फंगल संक्रमण के शुरुआती लक्षण', recommendation: 'फफूंदनाशक लगाएं और जल निकासी में सुधार करें', confidence: 78 }
        ],
        mr: [
          { health: 'चांगले', issues: 'किरकोळ पोषक तुटपुंजे आढळले', recommendation: 'संतुलित NPK खत लावा', confidence: 87 },
          { health: 'उत्तम', issues: 'काही महत्वाच्या समस्या आढळल्या नाहीत', recommendation: 'सध्याच्या पद्धती चालू ठेवा', confidence: 92 },
          { health: 'लक्ष देणे आवश्यक', issues: 'बुरशीजन्य संसर्गाची लक्षणे', recommendation: 'फंगिसायड लावा आणि ड्रेनेज सुधारा', confidence: 78 }
        ]
      };

      const langResults = results[language] || results.en;
      const result = langResults[Math.floor(Math.random() * langResults.length)];
      
      const analysisMessage = language === 'hi' 
        ? `🔍 विश्लेषण पूरा!\nस्वास्थ्य: ${result.health}\nसमस्याएं: ${result.issues}\nसिफारिश: ${result.recommendation}\nविश्वास: ${result.confidence}%`
        : language === 'mr'
        ? `🔍 विश्लेषण पूर्ण!\nआरोग्य: ${result.health}\nसमस्या: ${result.issues}\nशिफारस: ${result.recommendation}\nआत्मविश्वास: ${result.confidence}%`
        : `🔍 Analysis Complete!\nHealth: ${result.health}\nIssues: ${result.issues}\nRecommendation: ${result.recommendation}\nConfidence: ${result.confidence}%`;
      
      setChatHistory(prev => [...prev, 
        { type: 'user', message: `📸 Uploaded crop image for analysis` },
        { type: 'ai', message: analysisMessage }
      ]);
      
      setIsAnalyzing(false);
      toast.success(language === 'hi' ? 'फसल विश्लेषण पूरा हुआ!' : 
                   language === 'mr' ? 'पिक विश्लेषण पूर्ण झाले!' :
                   'Crop analysis completed!');
    }, 3000);
  };

  // Handle AI Chat
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage.toLowerCase();
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);

    // AI Response Logic
    let aiResponse = aiResponses.default;
    
    if (userMessage.includes('price') || userMessage.includes('rate') || userMessage.includes('कीमत') || userMessage.includes('किंमत')) {
      if (userMessage.includes('tomato') || userMessage.includes('टमाटर') || userMessage.includes('टोमॅटो')) {
        aiResponse = aiResponses.price.tomatoes;
      } else if (userMessage.includes('potato') || userMessage.includes('आलू') || userMessage.includes('बटाटा')) {
        aiResponse = aiResponses.price.potatoes;
      } else {
        aiResponse = language === 'hi' 
          ? "💰 मेरे पास टमाटर, आलू, प्याज, गेहूं की कीमत डेटा है। आप किस फसल में रुचि रखते हैं?"
          : language === 'mr'
          ? "💰 माझ्याकडे टोमॅटो, बटाटा, कांदा, गहू यांच्या किंमतींचा डेटा आहे. तुम्हाला कोणत्या पिकात रस आहे?"
          : "💰 I have price data for tomatoes, potatoes, onions, wheat. Which crop are you interested in?";
      }
    }
    else if (userMessage.includes('weather') || userMessage.includes('rain') || userMessage.includes('मौसम') || userMessage.includes('हवामान')) {
      aiResponse = aiResponses.weather;
    }
    else if (userMessage.includes('pest') || userMessage.includes('disease') || userMessage.includes('कीट') || userMessage.includes('किडी')) {
      aiResponse = aiResponses.pest;
    }
    else if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('नमस्ते') || userMessage.includes('नमस्कार')) {
      aiResponse = language === 'hi' 
        ? "👋 नमस्ते! मैं आपका AI फार्मिंग असिस्टेंट हूं। आज मैं आपकी कैसे मदद कर सकता हूं?"
        : language === 'mr'
        ? "👋 नमस्कार! मी तुमचा AI शेती सहाय्यक आहे. आज मी तुमची कशी मदत करू शकतो?"
        : "👋 Hello! I'm your AI farming assistant. How can I help you today?";
    }

    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
    }, 1000);

    setChatMessage('');
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        analyzeCropImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick actions in multiple languages
  const quickActions = {
    en: ['Tomato prices?', 'Weather forecast', 'Pest control', 'Fertilizer advice'],
    hi: ['टमाटर की कीमत?', 'मौसम पूर्वानुमान', 'कीट नियंत्रण', 'उर्वरक सलाह'],
    mr: ['टोमॅटो किंमत?', 'हवामान अंदाज', 'किडी नियंत्रण', 'खत सल्ला']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{content.welcome}, {user?.name}!</h1>
              <p className="text-green-200 text-xl mt-2 flex items-center">
                <span className="mr-2">👨‍🌾</span> {content.farmerDashboard}
              </p>
            </div>
            <div className="text-right">
              <div className="text-green-200">{user?.farmSize || '4 acres'}</div>
              <div className="text-green-200">{user?.location || 'Maharashtra'}</div>
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
            { icon: '🌾', value: farmerCrops.length, label: content.activeCrops, color: 'green' },
            { icon: '💰', value: '₹45,600', label: content.monthlyRevenue, color: 'blue' },
            { icon: '⭐', value: '4.8/5', label: content.buyerRating, color: 'yellow' },
            { icon: '📈', value: '+15%', label: content.growthRate, color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className={`bg-white p-6 rounded-xl shadow-md border-l-4 border-${stat.color}-500`}>
              <div className={`text-2xl text-${stat.color}-600 mb-2`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Your Crops Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-green-600 mr-2">🏞️</span>
            {content.yourCurrentCrops}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {farmerCrops.map((crop, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">{crop.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    crop.health === 'Excellent' || crop.health === 'उत्कृष्ट' || crop.health === 'उत्तम' 
                      ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {crop.health}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>📍 {content.area}: {crop.area}</div>
                  <div>🌱 {content.stage}: {crop.stage}</div>
                  <div>📦 {content.expectedYield}: {crop.yield}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AI Crop Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-green-600 mr-2">🌱</span>
              {content.aiCropRecommendations}
            </h3>
            <div className="space-y-4">
              {aiData.cropRecommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{rec.crop}</h4>
                      <p className="text-sm text-gray-600 mt-1">{rec.reason}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {rec.confidence}% match
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                    <div>📅 {content.season}: {rec.season}</div>
                    <div>💵 {content.investment}: {rec.investment}</div>
                    <div>💰 {content.profit}: {rec.profit}</div>
                  </div>
                  <button 
                    onClick={() => getDetailedAnalysis(rec.crop)}
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 text-sm"
                  >
                    {content.getDetailedAnalysis}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Price Predictions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-blue-600 mr-2">📊</span>
              {content.aiPricePredictions} (₹/kg)
            </h3>
            <div className="space-y-3">
              {aiData.pricePredictions.map((pred, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">
                      {pred.crop === 'Tomatoes' ? '🍅' : '🥔'}
                    </span>
                    <div>
                      <span className="font-semibold">{pred.crop}</span>
                      <div className="text-xs text-gray-500">
                        {content.current}: ₹{pred.current}/kg
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold text-lg ${pred.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{pred.predicted}/kg
                    </div>
                    <div className={`text-xs ${pred.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {pred.trend === 'up' ? '↗️ ' : '↘️ '}{pred.timeframe}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition duration-300">
              {content.viewAllPriceTrends}
            </button>
          </div>

          {/* Pest & Disease Alerts */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              {content.aiPestDetection}
            </h3>
            <div className="space-y-4">
              {aiData.pestAlerts.map((alert, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-red-800 text-lg">{alert.pest} {content.alert}!</h4>
                      <p className="text-red-600">{content.detectedOn} {alert.crop} plants</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      alert.severity === 'high' ? 'bg-red-500 text-white' : 
                      alert.severity === 'medium' ? 'bg-orange-500 text-white' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {alert.severity} risk
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">{content.solution}:</span>
                      <p className="text-sm text-gray-700">{alert.solution}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">{content.prevention}:</span>
                      <p className="text-sm text-gray-700">{alert.prevention}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden" 
                id="crop-image"
              />
              <label 
                htmlFor="crop-image"
                className="block w-full border-2 border-dashed border-green-600 text-green-600 py-3 rounded-lg text-center hover:bg-green-50 transition duration-300 cursor-pointer"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {content.analyzingImage}
                  </span>
                ) : (
                  `📸 ${content.uploadCropPhoto}`
                )}
              </label>
            </div>
          </div>

          {/* Weather Insights */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-cyan-600 mr-2">🌤️</span>
              {content.aiWeatherInsights}
            </h3>
            <div className="bg-cyan-50 rounded-lg p-4 mb-4 border border-cyan-200">
              <div className="flex items-center mb-2">
                <span className="text-cyan-600 mr-2">💡</span>
                <span className="font-semibold">{content.smartRecommendation}</span>
              </div>
              <p className="text-cyan-800">{aiData.weatherInsights.recommendation}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { icon: '🌧️', label: content.rainChance, value: '70%' },
                { icon: '🌡️', label: content.tempRange, value: '24°-32°' },
                { icon: '💧', label: content.soilMoisture, value: aiData.weatherInsights.soilMoisture },
                { icon: '🚿', label: content.irrigation, value: aiData.weatherInsights.irrigation }
              ].map((item, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg">{item.icon}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                  <div className="font-semibold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Chat Assistant */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-purple-600 mr-2">💬</span>
            {content.aiFarmingAssistant}
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
                    ? 'bg-green-600 text-white rounded-br-none' 
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
              />
              <button
                type="button"
                onClick={isListening ? stopVoiceInput : startVoiceInput}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : voiceRecognition.isSupported
                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!voiceRecognition.isSupported}
                title={voiceRecognition.isSupported ? 'Voice Input' : 'Voice not supported'}
              >
                {isListening ? <FaStop className="w-4 h-4" /> : <FaMicrophone className="w-4 h-4" />}
              </button>
            </div>
            <button 
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-medium flex items-center space-x-2"
            >
              <span>{content.askAI}</span>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmerDashboard;