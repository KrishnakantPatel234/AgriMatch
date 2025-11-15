import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useVoiceRecognition } from "../hooks/UseVoiceRecognition";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff, HiMicrophone } from "react-icons/hi";

const Login = () => {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState(null);

  const { login } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  /* ============================================================
     MULTILINGUAL TEXT
  ============================================================ */
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

  /* ============================================================
     VOICE RECOGNITION
  ============================================================ */
  const getLangCode = (lang) => ({ en: "en-US", hi: "hi-IN", mr: "mr-IN" }[lang] || "en-US");

  const voiceRecognition = useVoiceRecognition(getLangCode(language));

  useEffect(() => {
    if (voiceRecognition.transcript && activeVoiceField) {
      const value =
        activeVoiceField === "password"
          ? voiceRecognition.transcript.replace(/\s/g, "")
          : voiceRecognition.transcript;

      setFormData((prev) => ({ ...prev, [activeVoiceField]: value }));
      setActiveVoiceField(null);

      toast.success(t.voiceCaptured);
    }
  }, [voiceRecognition.transcript]);

  const handleVoiceInput = (field) => {
    if (voiceRecognition.isListening) {
      voiceRecognition.stopListening();
      setActiveVoiceField(null);
    } else {
      setActiveVoiceField(field);
      voiceRecognition.startListening();
      toast.info(t.speakNow);
    }
  };

  /* ============================================================
     INPUT HANDLERS
  ============================================================ */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length === 0) {
        setFormData((p) => ({ ...p, phone: "" }));
        return;
      }

      let formatted = "";

      const num = digits.startsWith("91") ? digits.slice(2) : digits;

      if (num.length <= 5) formatted = `+91 ${num}`;
      else if (num.length <= 10)
        formatted = `+91 ${num.slice(0, 5)} ${num.slice(5)}`;
      else
        formatted = `+91 ${num.slice(0, 5)} ${num.slice(5, 10)} ${num.slice(
          10,
          15
        )}`;

      setFormData((p) => ({ ...p, phone: formatted }));
    } else if (name === "password") {
      setFormData((p) => ({ ...p, password: value.replace(/\s/g, "") }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  /* ============================================================
     ROLE-BASED REDIRECTION
  ============================================================ */
  const redirectToDashboard = (role) => {
    const routes = {
      farmer: "/dashboard/farmer",
      buyer: "/dashboard/buyer",
      transport: "/dashboard/transport",
      storage: "/dashboard/storage",
      admin: "/dashboard"
    };
    navigate(routes[role] || "/dashboard");
  };

  /* ============================================================
     HANDLE LOGIN
  ============================================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone, password } = formData;

    if (!phone || !password) return toast.error(t.fieldsRequired);

    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 12 || !digits.startsWith("91"))
      return toast.error(t.invalidPhone);

    if (password.includes(" ")) return toast.error(t.passwordSpaces);

    setLoading(true);

    try {
      const result = await login(formData);

      if (result.success) {
        toast.success(t.loginSuccess);
        redirectToDashboard(result.user.role);
      }
    } catch (err) {
      console.error(err);
      toast.error(t.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     DEMO ACCOUNTS
  ============================================================ */
  const demoAccounts = [
    { phone: "+91 98765 43210", password: "demo123", role: "farmer" },
    { phone: "+91 87654 32109", password: "demo123", role: "buyer" },
    { phone: "+91 76543 21098", password: "demo123", role: "transport" },
    { phone: "+91 65432 10987", password: "demo123", role: "storage" }
  ];

  const handleDemoLogin = async (acct) => {
    setLoading(true);
    try {
      const result = await login(acct);
      if (result.success) {
        toast.success(`Demo ${acct.role} login successful`);
        redirectToDashboard(acct.role);
      }
    } catch {
      toast.error(t.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     GOOGLE LOGIN (DEMO)
  ============================================================ */
  const handleGoogleLogin = () => {
    toast.success("Google login simulated!");
    navigate("/dashboard/farmer");
  };

  /* ============================================================
     UI RETURN
  ============================================================ */
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

        {/* DEMO ACCOUNTS */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 text-center mb-2">{t.demoAccess}</p>

          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((acct, i) => (
              <button
                key={i}
                disabled={loading}
                onClick={() => handleDemoLogin(acct)}
                className="text-xs py-2 px-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50"
              >
                Demo {acct.role}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Help */}
        {voiceRecognition.isSupported && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 text-center">{t.voiceHelp}</p>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {/* PHONE INPUT */}
          <div>
            <label className="block text-sm font-medium">{t.phoneLabel}</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t.phonePlaceholder}
                className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() => handleVoiceInput("phone")}
                disabled={!voiceRecognition.isSupported}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-100 p-1 rounded-full"
              >
                <HiMicrophone size={16} />
              </button>
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <label className="block text-sm font-medium">{t.passwordLabel}</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t.passwordPlaceholder}
                className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring-green-500"
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <button
                  type="button"
                  onClick={() => handleVoiceInput("password")}
                  disabled={!voiceRecognition.isSupported}
                  className="bg-green-100 p-1 rounded-full"
                >
                  <HiMicrophone size={16} />
                </button>

                <button type="button" onClick={() => setShowPass((p) => !p)}>
                  {showPass ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? t.signingIn : t.signIn}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-[1px] bg-gray-300 w-full"></div>
            <span className="text-gray-500 text-sm">{t.or}</span>
            <div className="h-[1px] bg-gray-300 w-full"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg"
          >
            <FcGoogle size={22} />
            {t.googleLogin}
          </button>
        </form>

        {/* Additional Help */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
          {t.welcome}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border rounded-lg text-xs text-yellow-700 text-center">
          {t.securityNote}
        </div>
      </div>
    </div>
  );
};

export default Login;
