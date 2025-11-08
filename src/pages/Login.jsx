import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useVoiceRecognition } from "../hooks/UseVoiceRecognition";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff, HiMicrophone } from "react-icons/hi";
import { authAPI } from "../services/Api";

const Login = () => {
  const [formData, setFormData] = useState({ 
    phone: "", // Only phone number for login
    password: "" 
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState(null);

  const { login } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Multilingual content
  const content = {
    en: {
      title: "Sign in to AgriMatch",
      newHere: "New here?",
      createAccount: "Create an account",
      demoAccess: "Quick Demo Access:",
      voiceHelp: "Voice input available! Click microphone icons to speak instead of type.",
      phoneLabel: "Phone Number *",
      phonePlaceholder: "+91 XXXXX XXXXX",
      phoneHelp: "Enter your 10-digit Indian phone number",
      passwordLabel: "Password *",
      passwordPlaceholder: "Enter your password",
      passwordHelp: "Spaces will be automatically removed",
      forgotPassword: "Forgot your password?",
      signingIn: "Signing in...",
      signIn: "Sign in with Phone",
      or: "or",
      googleLogin: "Continue with Google",
      welcome: "👋 Welcome back! Use your phone number to sign in or continue with Google.",
      noAccount: "Don't have an account?",
      signUp: "Sign up with your phone number",
      securityNote: "🔒 Your phone number is secure and will be used for login and important updates.",
      speakNow: "Speak now...",
      listening: "Listening for",
      voiceCaptured: "Voice input captured!",
      invalidCredentials: "Invalid phone number or password",
      loginSuccess: "Logged in successfully",
      googleSuccess: "Google login successful!",
      fieldsRequired: "Phone number and password are required",
      invalidPhone: "Please enter a valid Indian phone number (+91 XXXXXXXXXX)",
      passwordSpaces: "Password cannot contain spaces"
    },
    hi: {
      title: "AgriMatch में साइन इन करें",
      newHere: "नए हैं?",
      createAccount: "खाता बनाएं",
      demoAccess: "त्वरित डेमो एक्सेस:",
      voiceHelp: "वॉयस इनपुट उपलब्ध! टाइप करने के बजाय बोलने के लिए माइक्रोफोन आइकन पर क्लिक करें।",
      phoneLabel: "फोन नंबर *",
      phonePlaceholder: "+91 XXXXX XXXXX",
      phoneHelp: "अपना 10-अंकीय भारतीय फोन नंबर दर्ज करें",
      passwordLabel: "पासवर्ड *",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      passwordHelp: "स्पेस स्वचालित रूप से हटा दिए जाएंगे",
      forgotPassword: "पासवर्ड भूल गए?",
      signingIn: "साइन इन हो रहा है...",
      signIn: "फोन से साइन इन करें",
      or: "या",
      googleLogin: "Google के साथ जारी रखें",
      welcome: "👋 वापस स्वागत है! साइन इन करने के लिए अपना फोन नंबर यूज़ करें या Google के साथ जारी रखें।",
      noAccount: "खाता नहीं है?",
      signUp: "अपने फोन नंबर से साइन अप करें",
      securityNote: "🔒 आपका फोन नंबर सुरक्षित है और लॉगिन और महत्वपूर्ण अपडेट के लिए उपयोग किया जाएगा।",
      speakNow: "अब बोलें...",
      listening: "सुन रहा हूं",
      voiceCaptured: "वॉयस इनपुट कैप्चर हो गया!",
      invalidCredentials: "अमान्य फोन नंबर या पासवर्ड",
      loginSuccess: "सफलतापूर्वक लॉग इन हो गया",
      googleSuccess: "Google लॉगिन सफल!",
      fieldsRequired: "फोन नंबर और पासवर्ड आवश्यक हैं",
      invalidPhone: "कृपया एक वैध भारतीय फोन नंबर दर्ज करें (+91 XXXXXXXXXX)",
      passwordSpaces: "पासवर्ड में स्पेस नहीं हो सकते"
    },
    mr: {
      title: "AgriMatch मध्ये साइन इन करा",
      newHere: "नवीन आहात?",
      createAccount: "खाते तयार करा",
      demoAccess: "द्रुत डेमो प्रवेश:",
      voiceHelp: "व्हॉइस इनपुट उपलब्ध! टाइप करण्याऐवजी बोलण्यासाठी मायक्रोफोन आयकॉन वर क्लिक करा.",
      phoneLabel: "फोन नंबर *",
      phonePlaceholder: "+91 XXXXX XXXXX",
      phoneHelp: "तुमचा 10-अंकीय भारतीय फोन नंबर टाका",
      passwordLabel: "पासवर्ड *",
      passwordPlaceholder: "तुमचा पासवर्ड टाका",
      passwordHelp: "स्पेस स्वयंचलितपणे काढल्या जातील",
      forgotPassword: "पासवर्ड विसरलात?",
      signingIn: "साइन इन होत आहे...",
      signIn: "फोन द्वारे साइन इन करा",
      or: "किंवा",
      googleLogin: "Google सह सुरू ठेवा",
      welcome: "👋 पुन्हा स्वागत आहे! साइन इन करण्यासाठी तुमचा फोन नंबर वापरा किंवा Google सह सुरू ठेवा.",
      noAccount: "खाते नाही?",
      signUp: "तुमच्या फोन नंबरसह साइन अप करा",
      securityNote: "🔒 तुमचा फोन नंबर सुरक्षित आहे आणि लॉगिन आणि महत्वाच्या अद्यतनांसाठी वापरला जाईल.",
      speakNow: "आता बोला...",
      listening: "ऐकत आहे",
      voiceCaptured: "व्हॉइस इनपुट कॅप्चर झाले!",
      invalidCredentials: "अवैध फोन नंबर किंवा पासवर्ड",
      loginSuccess: "यशस्वीरित्या लॉग इन झाले",
      googleSuccess: "Google लॉगिन यशस्वी!",
      fieldsRequired: "फोन नंबर आणि पासवर्ड आवश्यक आहे",
      invalidPhone: "कृपया एक वैध भारतीय फोन नंबर टाका (+91 XXXXXXXXXX)",
      passwordSpaces: "पासवर्डमध्ये स्पेस असू शकत नाहीत"
    }
  };

  const t = content[language] || content.en;

  // Voice recognition setup
  const getLanguageCode = (lang) => {
    const codes = { en: 'en-US', hi: 'hi-IN', mr: 'mr-IN' };
    return codes[lang] || 'en-US';
  };

  const voiceRecognition = useVoiceRecognition(getLanguageCode(language));

  // Handle voice input
  React.useEffect(() => {
    if (voiceRecognition.transcript && activeVoiceField) {
      const processedValue = activeVoiceField === 'password' 
        ? voiceRecognition.transcript.replace(/\s/g, '') // Remove spaces for password
        : voiceRecognition.transcript;
      
      setFormData(prev => ({
        ...prev,
        [activeVoiceField]: processedValue
      }));
      setActiveVoiceField(null);
      toast.success(t.voiceCaptured);
    }
  }, [voiceRecognition.transcript, activeVoiceField, t]);

  const handleVoiceInput = (fieldName) => {
    if (voiceRecognition.isListening && activeVoiceField === fieldName) {
      voiceRecognition.stopListening();
      setActiveVoiceField(null);
    } else {
      setActiveVoiceField(fieldName);
      voiceRecognition.startListening();
      toast.info(t.speakNow);
    }
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
  
  // Auto-format phone number
  if (name === "phone") {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");
    
    // If the input is empty or only contains +91, clear it
    if (cleaned === '' || cleaned === '91') {
      setFormData(prev => ({ ...prev, [name]: '' }));
      return;
    }
    
    let formatted = '';
    
    // If the number starts with 91, remove it and format the rest
    if (cleaned.startsWith('91') && cleaned.length > 2) {
      const withoutCountryCode = cleaned.slice(2);
      if (withoutCountryCode.length <= 5) {
        formatted = `+91 ${withoutCountryCode}`;
      } else if (withoutCountryCode.length <= 10) {
        formatted = `+91 ${withoutCountryCode.slice(0, 5)} ${withoutCountryCode.slice(5)}`;
      } else {
        formatted = `+91 ${withoutCountryCode.slice(0, 5)} ${withoutCountryCode.slice(5, 10)} ${withoutCountryCode.slice(10, 15)}`;
      }
    } 
    // If number doesn't start with 91, format as Indian number
    else if (cleaned.length > 0) {
      if (cleaned.length <= 5) {
        formatted = `+91 ${cleaned}`;
      } else if (cleaned.length <= 10) {
        formatted = `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
      } else {
        formatted = `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5, 10)} ${cleaned.slice(10, 15)}`;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: formatted }));
  } else if (name === "password") {
    // Remove spaces from password
    const cleanedPassword = value.replace(/\s/g, '');
    setFormData(prev => ({ ...prev, [name]: cleanedPassword }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

  // Function to redirect based on user role
  const redirectToDashboard = (userRole) => {
    const dashboardRoutes = {
      farmer: '/dashboard/farmer',
      buyer: '/dashboard/buyer',
      transport: '/dashboard/transport',
      storage: '/dashboard/storage',
      admin: '/dashboard',
      default: '/dashboard'
    };

    const route = dashboardRoutes[userRole] || dashboardRoutes.default;
    navigate(route);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { phone, password } = formData;

    // Basic validation
    if (!phone || !password) {
      return toast.error(t.fieldsRequired);
    }

    // Validate Indian phone number
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 12 || !phoneDigits.startsWith('91')) {
      return toast.error(t.invalidPhone);
    }

    // Validate password has no spaces
    if (password.includes(' ')) {
      return toast.error(t.passwordSpaces);
    }

    setLoading(true);
    try {
      const result = await login(formData);
      if (result.success) {
        toast.success(t.loginSuccess);
        
        // Get user role from result or from AuthContext
        const userRole = result.user?.role || 'farmer'; // Default to farmer if not specified
        
        // Redirect to appropriate dashboard
        redirectToDashboard(userRole);
      }
    } catch (err) {
      console.error(err);
      toast.error(t.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // For demo purposes, create a Google user and log them in
    setLoading(true);
    setTimeout(() => {
      // Simulate Google login success
      toast.success(t.googleSuccess);
      setLoading(false);
      
      // For demo, redirect to farmer dashboard by default
      // You can modify this based on your Google login logic
      navigate("/dashboard/farmer");
    }, 1500);
  };

  // Demo accounts for quick testing - UPDATED with roles
  const demoAccounts = [
    { phone: "+91 98765 43210", password: "demo123", role: "farmer" },
    { phone: "+91 87654 32109", password: "demo123", role: "buyer" },
    { phone: "+91 76543 21098", password: "demo123", role: "transport" },
    { phone: "+91 65432 10987", password: "demo123", role: "storage" }
  ];

  const fillDemoAccount = (account) => {
    setFormData({
      phone: account.phone,
      password: account.password
    });
    toast.info(`Demo ${account.role} account filled`);
  };

  // Handle demo account login directly
  const handleDemoLogin = async (account) => {
    setLoading(true);
    try {
      // Simulate login with demo account
      const result = await login({
        phone: account.phone,
        password: account.password
      });
      
      if (result.success) {
        toast.success(`Demo ${account.role} login successful!`);
        // Redirect to the specific dashboard based on demo account role
        redirectToDashboard(account.role);
      }
    } catch (err) {
      console.error(err);
      toast.error(t.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    
    if (response.data) {
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect based on role
      const role = response.data.user.role;
      navigate(`/dashboard/${role}`);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">{t.title}</h2>
        <p className="text-center text-sm mt-2 text-gray-600">
          {t.newHere}{" "}
          <Link to="/signup" className="text-green-600 font-medium hover:underline">
            {t.createAccount}
          </Link>
        </p>

        {/* Demo Accounts - UPDATED with direct login */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 text-center mb-2">{t.demoAccess}</p>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => handleDemoLogin(account)}
                disabled={loading}
                className="text-xs py-2 px-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Demo {account.role}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Help */}
        {voiceRecognition.isSupported && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 text-center">
              {t.voiceHelp}
            </p>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          
          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t.phoneLabel}
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder={t.phonePlaceholder}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                value={formData.phone}
                onChange={handleChange}
                maxLength={17}
              />
              <button
                type="button"
                onClick={() => handleVoiceInput('phone')}
                disabled={!voiceRecognition.isSupported}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                  voiceRecognition.isListening && activeVoiceField === 'phone'
                    ? 'bg-red-100 text-red-600 animate-pulse'
                    : voiceRecognition.isSupported
                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <HiMicrophone size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t.phoneHelp}
            </p>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder={t.passwordPlaceholder}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => handleVoiceInput('password')}
                  disabled={!voiceRecognition.isSupported}
                  className={`p-1 rounded-full ${
                    voiceRecognition.isListening && activeVoiceField === 'password'
                      ? 'bg-red-100 text-red-600 animate-pulse'
                      : voiceRecognition.isSupported
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <HiMicrophone size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  {showPass ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t.passwordHelp}
            </p>
          </div>

          {/* Voice Listening Indicator */}
          {voiceRecognition.isListening && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-pulse">
                  <HiMicrophone className="h-4 w-4 text-yellow-600" />
                </div>
                <p className="text-sm text-yellow-700">
                  {t.listening} {activeVoiceField}... {t.speakNow}
                </p>
              </div>
            </div>
          )}

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-green-600 hover:text-green-700 hover:underline"
              onClick={() => toast.info("Password reset feature coming soon")}
            >
              {t.forgotPassword}
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.signingIn}
              </span>
            ) : (
              t.signIn
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-[1px] bg-gray-300 w-full"></div>
            <span className="text-gray-500 text-sm">{t.or}</span>
            <div className="h-[1px] bg-gray-300 w-full"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle size={22} /> 
            {loading ? t.signingIn : t.googleLogin}
          </button>
        </form>

        {/* Additional Help */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            {t.welcome}
          </p>
          <p className="text-xs text-gray-500 text-center mt-2">
            {t.noAccount} <Link to="/signup" className="text-green-600 hover:underline">{t.signUp}</Link>
          </p>
        </div>

        {/* Security Note */}
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xs text-yellow-700 text-center">
            {t.securityNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;