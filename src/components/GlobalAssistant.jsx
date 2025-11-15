import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useVoiceRecognition } from "../hooks/UseVoiceRecognition";

const GlobalAssistant = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState([
    {
      type: "ai",
      message: getWelcomeMessage(language, user?.role),
      timestamp: new Date(),
    },
  ]);
  const [msg, setMsg] = useState("");
  const chatEndRef = useRef(null);

  const getLangCode = (lang) =>
    ({ en: "en-US", hi: "hi-IN", mr: "mr-IN" }[lang] || "en-US");
  const vr = useVoiceRecognition(getLangCode(language));

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (vr.transcript) setMsg(vr.transcript);
  }, [vr.transcript]);

  // Comprehensive knowledge database
  const knowledgeBase = {
    // Market Prices - Updated with real-time like data
    prices: {
      en: {
        vegetables: [
          {
            crop: "Tomato",
            price: "₹25-32/kg",
            trend: "↗️ Rising",
            market: "Pune APMC",
          },
          {
            crop: "Potato",
            price: "₹18-22/kg",
            trend: "➡️ Stable",
            market: "Delhi Azadpur",
          },
          {
            crop: "Onion",
            price: "₹30-38/kg",
            trend: "↗️ Rising",
            market: "Lasalgaon",
          },
          {
            crop: "Cabbage",
            price: "₹12-15/kg",
            trend: "➡️ Stable",
            market: "Bengaluru",
          },
          {
            crop: "Cauliflower",
            price: "₹20-25/kg",
            trend: "↘️ Falling",
            market: "Kolkata",
          },
        ],
        fruits: [
          {
            crop: "Mango (Alphonso)",
            price: "₹400-600/kg",
            trend: "↗️ Seasonal",
            market: "Ratnagiri",
          },
          {
            crop: "Banana",
            price: "₹25-35/kg",
            trend: "➡️ Stable",
            market: "Tamil Nadu",
          },
          {
            crop: "Grapes",
            price: "₹50-70/kg",
            trend: "↗️ Rising",
            market: "Nashik",
          },
        ],
      },
      hi: {
        vegetables: [
          {
            crop: "टमाटर",
            price: "₹25-32/किग्रा",
            trend: "↗️ बढ़ रहा",
            market: "पुणे APMC",
          },
          {
            crop: "आलू",
            price: "₹18-22/किग्रा",
            trend: "➡️ स्थिर",
            market: "दिल्ली आजादपुर",
          },
          {
            crop: "प्याज",
            price: "₹30-38/किग्रा",
            trend: "↗️ बढ़ रहा",
            market: "लसलगांव",
          },
        ],
        fruits: [
          {
            crop: "आम (अल्फोंसो)",
            price: "₹400-600/किग्रा",
            trend: "↗️ मौसमी",
            market: "रत्नागिरि",
          },
        ],
      },
      mr: {
        vegetables: [
          {
            crop: "टोमॅटो",
            price: "₹25-32/किग्रा",
            trend: "↗️ वाढत आहे",
            market: "पुणे APMC",
          },
          {
            crop: "बटाटा",
            price: "₹18-22/किग्रा",
            trend: "➡️ स्थिर",
            market: "दिल्ली आजादपुर",
          },
          {
            crop: "कांदा",
            price: "₹30-38/किग्रा",
            trend: "↗️ वाढत आहे",
            market: "लसलगांव",
          },
        ],
        fruits: [
          {
            crop: "आंबा (अल्फोंसो)",
            price: "₹400-600/किग्रा",
            trend: "↗️ हंगामी",
            market: "रत्नागिरि",
          },
        ],
      },
    },

    // Weather forecasts
    weather: {
      en: {
        current: "🌤️ Partly cloudy, 28°C, Humidity 65%",
        forecast: [
          "Tomorrow: 🌦️ Light rain, 26-32°C",
          "Day 3: ☀️ Sunny, 25-33°C",
          "Day 4: ⛈️ Thunderstorms, 24-30°C",
        ],
        advisory:
          "Good for vegetable growth. Consider harvesting before thunderstorms.",
      },
      hi: {
        current: "🌤️ आंशिक बादल, 28°C, आर्द्रता 65%",
        forecast: [
          "कल: 🌦️ हल्की बारिश, 26-32°C",
          "दिन 3: ☀️ धूप, 25-33°C",
          "दिन 4: ⛈️ आंधी-तूफान, 24-30°C",
        ],
        advisory: "सब्जी वृद्धि के लिए अच्छा। आंधी से पहले कटाई पर विचार करें।",
      },
      mr: {
        current: "🌤️ अंशतः ढगाळ, 28°C, आर्द्रता 65%",
        forecast: [
          "उद्या: 🌦️ हलका पाऊस, 26-32°C",
          "दिवस 3: ☀️ सूर्यप्रकाश, 25-33°C",
          "दिवस 4: ⛈️ वादळ, 24-30°C",
        ],
        advisory: "भाजीपाला वाढीसाठी चांगले. वादळापूर्वी कापणीचा विचार करा.",
      },
    },

    // Pest and disease management
    pests: {
      en: {
        common: [
          {
            pest: "Aphids",
            symptoms: "Curled leaves, sticky residue",
            treatment: "Neem oil spray (2%) every 7 days",
            prevention: "Companion planting with marigold",
          },
          {
            pest: "Powdery Mildew",
            symptoms: "White powdery spots on leaves",
            treatment: "Sulfur-based fungicide",
            prevention: "Proper spacing and air circulation",
          },
        ],
      },
      hi: {
        common: [
          {
            pest: "एफिड",
            symptoms: "मुड़ी हुई पत्तियां, चिपचिपा अवशेष",
            treatment: "नीम तेल स्प्रे (2%) हर 7 दिन",
            prevention: "गेंदे के साथ सहयोगी रोपण",
          },
        ],
      },
      mr: {
        common: [
          {
            pest: "अॅफिड",
            symptoms: "वाकडी पाने, चिकट अवशेष",
            treatment: "कडुलिंब तेल स्प्रे (2%) दर 7 दिवसांनी",
            prevention: "झेंडूसह सहयोगी लागवड",
          },
        ],
      },
    },

    // Cold storage information
    coldStorage: {
      en: {
        rates: "₹50-80/kg per month depending on crop",
        locations: [
          "Pune Cold Storage: 80% capacity available",
          "Nashik Unit: 65% capacity available",
          "Nagpur Facility: 90% capacity available",
        ],
        tips: [
          "Potatoes: Store at 4°C, 90% humidity",
          "Tomatoes: Store at 12°C, 85% humidity",
          "Onions: Store at 0°C, 65% humidity",
        ],
      },
      hi: {
        rates: "₹50-80/किग्रा प्रति माह फसल के आधार पर",
        locations: [
          "पुणे कोल्ड स्टोरेज: 80% क्षमता उपलब्ध",
          "नासिक यूनिट: 65% क्षमता उपलब्ध",
          "नागपुर सुविधा: 90% क्षमता उपलब्ध",
        ],
        tips: [
          "आलू: 4°C, 90% आर्द्रता पर संग्रहित करें",
          "टमाटर: 12°C, 85% आर्द्रता पर संग्रहित करें",
          "प्याज: 0°C, 65% आर्द्रता पर संग्रहित करें",
        ],
      },
      mr: {
        rates: "₹50-80/किग्रा दरमहा पिकावर अवलंबून",
        locations: [
          "पुणे कोल्ड स्टोरेज: 80% क्षमता उपलब्ध",
          "नाशिक युनिट: 65% क्षमता उपलब्ध",
          "नागपूर सुविधा: 90% क्षमता उपलब्ध",
        ],
        tips: [
          "बटाटा: 4°C, 90% आर्द्रतेवर साठवा",
          "टोमॅटो: 12°C, 85% आर्द्रतेवर साठवा",
          "कांदा: 0°C, 65% आर्द्रतेवर साठवा",
        ],
      },
    },

    // Transport and logistics
    transport: {
      en: {
        routes: [
          "Pune-Mumbai: ₹3-4/kg, 4-6 hours",
          "Nashik-Pune: ₹2-3/kg, 3-5 hours",
          "Nagpur-Mumbai: ₹5-6/kg, 12-14 hours",
        ],
        tips: [
          "Refrigerated trucks: ₹1-2/kg extra",
          "Document requirements: Waybill, FSSAI license",
          "Insurance: 0.5% of goods value",
        ],
      },
      hi: {
        routes: [
          "पुणे-मुंबई: ₹3-4/किग्रा, 4-6 घंटे",
          "नासिक-पुणे: ₹2-3/किग्रा, 3-5 घंटे",
          "नागपुर-मुंबई: ₹5-6/किग्रा, 12-14 घंटे",
        ],
        tips: [
          "रेफ्रिजरेटेड ट्रक: ₹1-2/किग्रा अतिरिक्त",
          "दस्तावेज़ आवश्यकताएं: वेबिल, FSSAI लाइसेंस",
          "बीमा: माल का 0.5%",
        ],
      },
      mr: {
        routes: [
          "पुणे-मुंबई: ₹3-4/किग्रा, 4-6 तास",
          "नाशिक-पुणे: ₹2-3/किग्रा, 3-5 तास",
          "नागपूर-मुंबई: ₹5-6/किग्रा, 12-14 तास",
        ],
        tips: [
          "रेफ्रिजरेटेड ट्रक: ₹1-2/किग्रा अतिरिक्त",
          "कागदपत्र आवश्यकता: वेबिल, FSSAI परवाना",
          "विमा: मालाच्या मूल्याचे 0.5%",
        ],
      },
    },

    // Buyer information
    buyers: {
      en: {
        current: [
          "Reliance Fresh: Seeking tomato, potato (1000kg/day)",
          "Big Basket: Organic vegetables premium rates",
          "Local Mandi: Best prices for onions this week",
        ],
        requirements: [
          "Quality: Grade A, no bruises",
          "Packaging: Standard crates",
          "Certification: FSSAI preferred",
        ],
      },
      hi: {
        current: [
          "रिलायंस फ्रेश: टमाटर, आलू की तलाश (1000kg/दिन)",
          "बिग बास्केट: जैविक सब्जियां प्रीमियम दर",
          "स्थानीय मंडी: इस सप्ताह प्याज के सर्वोत्तम भाव",
        ],
        requirements: [
          "गुणवत्ता: ग्रेड A, कोई चोट नहीं",
          "पैकेजिंग: मानक टोकरा",
          "प्रमाणन: FSSAI पसंदीदा",
        ],
      },
      mr: {
        current: [
          "रिलायन्स फ्रेश: टोमॅटो, बटाटा शोधत आहे (1000kg/दिवस)",
          "बिग बास्केट: ऑर्गेनिक भाजी प्रीमियम दर",
          "स्थानीय मंडी: या आठवड्यात कांद्यासाठी सर्वोत्तम किंमत",
        ],
        requirements: [
          "गुणवत्ता: ग्रेड A, कोणतेही नुकसान नाही",
          "पॅकेजिंग: मानक खोके",
          "प्रमाणन: FSSAI प्राधान्य",
        ],
      },
    },
  };

  // Enhanced response function with AI-like behavior
  const respond = async (userMessage) => {
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    const lower = userMessage.toLowerCase();
    const langData = knowledgeBase[language] || knowledgeBase.en;

    // Price queries
    if (
      lower.includes("price") ||
      lower.includes("कीमत") ||
      lower.includes("किंमत") ||
      lower.includes("rate")
    ) {
      const priceList =
        langData.prices?.vegetables
          ?.map(
            (item) =>
              `${item.crop}: ${item.price} ${item.trend} (${item.market})`
          )
          .join("\n") || "";

      return `💰 Current Market Prices:\n${priceList}\n\n📊 Source: Latest APMC data`;
    }

    // Weather queries
    if (
      lower.includes("weather") ||
      lower.includes("मौसम") ||
      lower.includes("हवामान") ||
      lower.includes("rain")
    ) {
      const forecast = langData.weather?.forecast?.join("\n") || "";
      return `🌤️ Weather Update:\n${langData.weather?.current}\n\n📅 Forecast:\n${forecast}\n\n💡 Advisory: ${langData.weather?.advisory}`;
    }

    // Pest and disease queries
    if (
      lower.includes("pest") ||
      lower.includes("कीट") ||
      lower.includes("किडी") ||
      lower.includes("disease") ||
      lower.includes("रोग")
    ) {
      const pestInfo =
        langData.pests?.common
          ?.map(
            (pest) =>
              `🦠 ${pest.pest}\nSymptoms: ${pest.symptoms}\nTreatment: ${pest.treatment}\nPrevention: ${pest.prevention}`
          )
          .join("\n\n") || "";

      return `🐛 Pest & Disease Management:\n\n${pestInfo}`;
    }

    // Cold storage queries
    if (
      lower.includes("cold storage") ||
      lower.includes("storage") ||
      lower.includes("कोल्ड") ||
      lower.includes("स्टोरेज") ||
      lower.includes("साठवण")
    ) {
      const locations = langData.coldStorage?.locations?.join("\n") || "";
      const tips = langData.coldStorage?.tips?.join("\n") || "";

      return `❄️ Cold Storage Information:\n\n💰 Rates: ${langData.coldStorage?.rates}\n\n📍 Available Locations:\n${locations}\n\n💡 Storage Tips:\n${tips}`;
    }

    // Transport queries
    if (
      lower.includes("transport") ||
      lower.includes("ट्रांसपोर्ट") ||
      lower.includes("वाहतूक") ||
      lower.includes("delivery") ||
      lower.includes("मार्ग")
    ) {
      const routes = langData.transport?.routes?.join("\n") || "";
      const tips = langData.transport?.tips?.join("\n") || "";

      return `🚚 Transport & Logistics:\n\n🛣️ Route Rates:\n${routes}\n\n📋 Important Tips:\n${tips}`;
    }

    // Buyer queries
    if (
      lower.includes("buyer") ||
      lower.includes("खरीददार") ||
      lower.includes("खरेदीदार") ||
      lower.includes("seller") ||
      lower.includes("vendor")
    ) {
      const currentBuyers = langData.buyers?.current?.join("\n") || "";
      const requirements = langData.buyers?.requirements?.join("\n") || "";

      return `🏪 Current Buyers:\n\n${currentBuyers}\n\n📋 Requirements:\n${requirements}`;
    }

    // Role-specific responses
    if (
      user?.role === "transport" &&
      (lower.includes("route") ||
        lower.includes("return") ||
        lower.includes("मार्ग"))
    ) {
      return language === "hi"
        ? "🚚 स्मार्ट रिटर्न सुझाव:\n• गंतव्य के 50किमी के भीतर लोड लें\n• बिछाने की दिशा के अनुरूप रास्ता चुनें\n• रिटर्न ट्रिप पर 12-18% समय बचाएं\n• वास्तविक समय ट्रैफिक अपडेट के लिए ऐप का उपयोग करें"
        : language === "mr"
        ? "🚚 स्मार्ट रिटर्न सूचना:\n• गंतव्यापासून 50किमी आत लोड घ्या\n• परतीच्या दिशेला जुळणारा मार्ग निवडा\n• परतीच्या प्रवासावर 12-18% वेळ वाचवा\n• रिअल-टाइम ट्रॅफिक अपडेट्ससाठी अॅप वापरा"
        : "🚚 Smart Return Tips:\n• Pick loads within 50km of destination\n• Align route with return direction\n• Save 12-18% time on return trips\n• Use app for real-time traffic updates";
    }

    if (
      user?.role === "coldstorage" &&
      (lower.includes("capacity") ||
        lower.includes("कैपेसिटी") ||
        lower.includes("क्षमता"))
    ) {
      return language === "hi"
        ? "❄️ कोल्ड स्टोरेज क्षमता:\n• वर्तमान उपयोग: 75%\n• उपलब्ध: 25%\n• अगले 7 दिनों में आने वाला स्टॉक: 1500kg\n• सुझाव: आलू के लिए 4°C सेक्शन में जगह उपलब्ध"
        : language === "mr"
        ? "❄️ कोल्ड स्टोरेज क्षमता:\n• सध्याचा वापर: 75%\n• उपलब्ध: 25%\n• पुढील 7 दिवसात येणारी स्टॉक: 1500kg\n• शिफारस: बटाट्यासाठी 4°C विभागात जागा उपलब्ध"
        : "❄️ Cold Storage Capacity:\n• Current Usage: 75%\n• Available: 25%\n• Incoming stock next 7 days: 1500kg\n• Recommendation: Space available in 4°C section for potatoes";
    }

    // Default intelligent response
    return getDefaultResponse(language, userMessage);
  };

  const send = async (e) => {
    e?.preventDefault?.();
    if (!msg.trim()) return;

    const userMessage = msg;
    setMsg("");
    setChat((prev) => [
      ...prev,
      { type: "user", message: userMessage, timestamp: new Date() },
    ]);

    // Try real AI service first
    try {
      setIsTyping(true);
      const { aiAPI } = await import("../api/api");
      const res = await aiAPI.chat({
        message: userMessage,
        language,
        role: user?.role,
      });
      const reply = res.data?.reply;
      if (reply) {
        setIsTyping(false);
        setChat((prev) => [
          ...prev,
          { type: "ai", message: reply, timestamp: new Date() },
        ]);
        return;
      }
    } catch (err) {
      console.error("AI chat error:", err);
      // fall through to local responder
    }

    // Fallback to local responder
    const response = await respond(userMessage);
    setIsTyping(false);
    setChat((prev) => [
      ...prev,
      { type: "ai", message: response, timestamp: new Date() },
    ]);
  };

  const clearChat = () => {
    setChat([
      {
        type: "ai",
        message: getWelcomeMessage(language, user?.role),
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center gap-2 animate-bounce"
        >
          <span className="text-xl">🤖</span>
          <span>AI Assistant</span>
        </button>
      )}

      {open && (
        <div className="w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <div className="font-semibold">FarmAI Assistant</div>
                <div className="text-xs text-green-100">
                  Always here to help
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-1 hover:bg-green-500 rounded transition-colors"
                title="Clear chat"
              >
                🗑️
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-green-500 rounded transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="h-96 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {chat.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    m.type === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.message}</div>
                  <div
                    className={`text-xs mt-1 ${
                      m.type === "user" ? "text-green-100" : "text-gray-500"
                    }`}
                  >
                    {m.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={send}
            className="p-4 border-t border-gray-200 bg-white"
          >
            <div className="flex items-center gap-2">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={getPlaceholder(language)}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                type="button"
                onClick={vr.isListening ? vr.stopListening : vr.startListening}
                className={`p-3 rounded-xl transition-all ${
                  vr.isListening
                    ? "bg-red-100 text-red-600 animate-pulse"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                disabled={isTyping}
              >
                🎤
              </button>
              <button
                type="submit"
                disabled={!msg.trim() || isTyping}
                className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Ask about prices, weather, pests, storage, transport, or buyers
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// Helper functions
function getWelcomeMessage(lang, role) {
  const messages = {
    en: `👋 Welcome to FarmAI Assistant! I can help you with:
• 📊 Current market prices
• 🌤️ Weather forecasts
• 🐛 Pest management
• ❄️ Cold storage info
• 🚚 Transport logistics
• 🏪 Buyer information

What would you like to know today?`,

    hi: `👋 फार्मएआई सहायक में आपका स्वागत है! मैं आपकी सहायता कर सकता हूं:
• 📊 वर्तमान बाजार मूल्य
• 🌤️ मौसम पूर्वानुमान
• 🐛 कीट प्रबंधन
• ❄️ कोल्ड स्टोरेज जानकारी
• 🚚 परिवहन लॉजिस्टिक्स
• 🏪 खरीदार जानकारी

आज आप क्या जानना चाहेंगे?`,

    mr: `👋 फार्मएआई सहायकात आपले स्वागत आहे! मी आपली मदत करू शकतो:
• 📊 चालू बाजारभाव
• 🌤️ हवामान अंदाज
• 🐛 किडी नियंत्रण
• ❄️ कोल्ड स्टोरेज माहिती
• 🚚 वाहतूक लॉजिस्टिक्स
• 🏪 खरेदीदार माहिती

आज तुम्हाला काय जाणून घ्यायचे आहे?`,
  };

  return messages[lang] || messages.en;
}

function getPlaceholder(lang) {
  const placeholders = {
    en: "Type your question...",
    hi: "अपना प्रश्न टाइप करें...",
    mr: "तुमचा प्रश्न टाइप करा...",
  };
  return placeholders[lang] || placeholders.en;
}

function getDefaultResponse(lang, userMessage) {
  const responses = {
    en: [
      "I understand you're asking about farming. Could you be more specific about prices, weather, pests, storage, transport, or buyers?",
      "I'd love to help! Tell me if you need information on crop prices, weather forecasts, pest control, cold storage, transport routes, or current buyers.",
      "As your farming assistant, I can provide real-time market data, weather updates, and logistics information. What specific area do you need help with?",
    ],
    hi: [
      "मैं समझता हूं कि आप कृषि के बारे में पूछ रहे हैं। क्या आप कीमतों, मौसम, कीटों, भंडारण, परिवहन या खरीदारों के बारे में और विशिष्ट हो सकते हैं?",
      "मैं मदद करना चाहूंगा! मुझे बताएं कि क्या आपको फसल की कीमतों, मौसम पूर्वानुमान, कीट नियंत्रण, कोल्ड स्टोरेज, परिवहन मार्गों या वर्तमान खरीदारों की जानकारी चाहिए।",
      "आपके कृषि सहायक के रूप में, मैं रीयल-टाइम मार्केट डेटा, मौसम अपडेट और लॉजिस्टिक्स जानकारी प्रदान कर सकता हूं। आपको किस विशिष्ट क्षेत्र में मदद चाहिए?",
    ],
    mr: [
      "मला समजले की तुम्ही शेतीबद्दल विचारत आहात. किंमत, हवामान, किडी, साठवणूक, वाहतूक किंवा खरेदीदार याबद्दल तुम्ही अधिक विशिष्ट असू शकता का?",
      "मदत करायला आवडेल! मला सांगा की तुम्हाला पीक किंमत, हवामान अंदाज, किडी नियंत्रण, कोल्ड स्टोरेज, वाहतूक मार्ग किंवा चालू खरेदीदार याबद्दल माहिती हवी आहे का?",
      "तुमच्या शेती सहाय्यक म्हणून, मी रिअल-टाइम मार्केट डेटा, हवामान अपडेट्स आणि लॉजिस्टिक्स माहिती देऊ शकतो. तुम्हाला कोणत्या विशिष्ट क्षेत्रात मदत हवी आहे?",
    ],
  };

  const langResponses = responses[lang] || responses.en;
  return langResponses[Math.floor(Math.random() * langResponses.length)];
}

export default GlobalAssistant;
