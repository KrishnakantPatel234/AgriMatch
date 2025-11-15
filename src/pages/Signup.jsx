// PART 1 / 3  --------------------------------------------------

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useVoiceRecognition } from "../hooks/UseVoiceRecognition";
import { toast } from "react-toastify";
import { HiMicrophone, HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

/* -----------------------------------------------
   TRANSLATIONS (shortened but same meaning)
------------------------------------------------ */
const translations = {
  en: {
    createAccount: "Create your AgriMatch account",
    signIn: "sign in to your existing account",
    or: "Or",

    basicInfo: "Basic Info",
    roleDetails: "Role Details",

    fullName: "Full Name *",
    phoneNumber: "Phone Number *",
    emailAddress: "Email Address (Optional)",
    iAmA: "I am a *",
    password: "Password *",
    confirmPassword: "Confirm Password *",

    continue: "Continue to Role Details",
    back: "Back",
    createAccountBtn: "Create Account",

    enterFullName: "Enter your full name",
    enterEmail: "Enter your email (if available)",
    createPassword: "Create a password (min. 6 characters)",
    confirmPasswordPlaceholder: "Confirm your password",

    phoneDescription: "We'll use this for login and important updates",

    farmerDesc: "Sell your farm produce directly to buyers",
    buyerDesc: "Buy fresh produce directly from farmers",
    transportDesc: "Provide logistics & transport services",
    storageDesc: "Offer cold storage & warehousing",

    voiceAvailable: "🎤 Voice input available! Click microphone icons to speak.",
    listening: "Listening... Speak now!",
    voiceCaptured: "Voice input captured!",
    speakNow: "Speak now...",
    stopListening: "Stop listening",

    fillAllFields: "Please fill all required fields",
    validPhone: "Enter a valid Indian phone number",
    passwordLength: "Password must be at least 6 characters",
    passwordMatch: "Passwords do not match",

    cropsYouGrow: "Crops You Grow *",
    selectedCrops: "Selected crops:",
    typeOrSpeak: "Type or speak crop name",
    addCropBtn: "Add Crop",
    cropAdded: "Crop added!",
    cropRemoved: "Crop removed!",

    creatingAccount: "Creating account...",
    signUpWithGoogle: "Sign up with Google",
    googleSignupComing: "Google signup coming soon!",

    registrationFailed: "Registration failed. Try again.",
    welcomeMessage: "Welcome to AgriMatch! Your account is ready.",
  }
};

// Hindi & Marathi left out here BUT will be included in PART 3 EXACTLY as needed.
// (They cause message-size overflow if included in this part)
// -------------------------------------------------------------

/* ------------------------------------------------------------
   COMPONENT START
------------------------------------------------------------- */
const Register = () => {
  const { register } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const t = translations[language] || translations.en;

  /* --------------------------------
        STATE
  -------------------------------- */
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",

    role: "farmer",

    // farmer
    landArea: "",
    landAreaUnit: "acres",
    farmLocation: "",
    soilType: "",
    irrigationType: "",
    farmingExperience: "",
    mainCrops: [],

    // buyer
    businessName: "",
    businessType: "",
    purchaseVolume: "",
    businessLocation: "",

    // transport
    vehicleType: "",
    serviceArea: "",
    capacity: "",
    vehicleCount: "",

    // storage
    storageType: "",
    storageCapacity: "",
    facilities: "",
    storageLocation: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [tempCrop, setTempCrop] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);


  /* -------------------------------
   Voice recognition
  -------------------------------- */
  const langCode = { en: "en-US", hi: "hi-IN", mr: "mr-IN" }[language] || "en-US";
  const voice = useVoiceRecognition(langCode);

  // Handle text-to-field updates
  useEffect(() => {
    if (!voice.transcript) return;
    if (!activeVoiceField) return;

    const spoken = voice.transcript.trim();

    if (activeVoiceField === "mainCrops") {
      setTempCrop(spoken);
    } else {
      setFormData((prev) => ({ ...prev, [activeVoiceField]: spoken }));
    }

    toast.success(t.voiceCaptured);
    setActiveVoiceField(null);
  }, [voice.transcript, activeVoiceField, t.voiceCaptured]);


  const startVoice = (field) => {
    if (voice.isListening && activeVoiceField === field) {
      voice.stopListening();
      setActiveVoiceField(null);
      return;
    }
    setActiveVoiceField(field);
    voice.startListening();
    toast.info(t.speakNow);
  };

  const VoiceButton = ({ field, className = "" }) => (
    <button
      type="button"
      onClick={() => startVoice(field)}
      disabled={!voice.isSupported}
      className={`p-1 rounded-full ${className} ${
        voice.isListening && activeVoiceField === field
          ? "bg-red-100 text-red-600 animate-pulse"
          : "bg-green-100 text-green-600 hover:bg-green-200"
      }`}
    >
      <HiMicrophone size={14} />
    </button>
  );

// PART 2 / 3  --------------------------------------------------

  /* --------------------------------------------------
      ROLE FIELD DEFINITIONS
  ----------------------------------------------------- */
  const roleFields = {
    farmer: [
      { name: "landArea", label: "Land Area", placeholder: "Enter land area", type: "number" },
      { name: "landAreaUnit", label: "Unit", type: "select", options: ["acres", "hectares", "bigha"] },
      { name: "farmLocation", label: "Farm Location", placeholder: "Village, District, State" },
      { name: "soilType", label: "Soil Type", type: "select", options: ["Black Soil", "Red Soil", "Alluvial", "Laterite", "Mountain", "Desert"] },
      { name: "irrigationType", label: "Irrigation Type", type: "select", options: ["Rain-fed", "Well", "Canal", "Drip", "Sprinkler", "Tube Well"] },
      { name: "farmingExperience", label: "Farming Experience", type: "select", options: ["<1 year", "1–5 years", "5–10 years", "10–20 years", "20+ years"] },
    ],

    buyer: [
      { name: "businessName", label: "Business Name", placeholder: "Shop name" },
      { name: "businessType", label: "Business Type", type: "select", options: ["Retail Store", "Restaurant", "Exporter", "Wholesaler", "Supermarket"] },
      { name: "purchaseVolume", label: "Purchase Volume", placeholder: "e.g., 1 ton/month" },
      { name: "businessLocation", label: "Business Location", placeholder: "City, State" },
    ],

    transport: [
      { name: "vehicleType", label: "Vehicle Type", type: "select", options: ["Truck", "Tempo", "Refrigerated Van", "Mini Truck", "Container"] },
      { name: "vehicleCount", label: "Vehicle Count", type: "number", placeholder: "How many vehicles?" },
      { name: "capacity", label: "Capacity", placeholder: "5 tons, 10 tons..." },
      { name: "serviceArea", label: "Service Area", placeholder: "Which states you serve" },
    ],

    storage: [
      { name: "storageType", label: "Storage Type", type: "select", options: ["Cold Storage", "Warehouse", "Silo", "Godown"] },
      { name: "storageCapacity", label: "Capacity", placeholder: "100 tons etc." },
      { name: "facilities", label: "Facilities", placeholder: "Temperature control, pest control..." },
      { name: "storageLocation", label: "Storage Location", placeholder: "City, State" },
    ],
  };

  const roleDescriptions = {
    farmer: t.farmerDesc,
    buyer: t.buyerDesc,
    transport: t.transportDesc,
    storage: t.storageDesc,
  };

  /* --------------------------------------------------
      COMMON CROPS
  ----------------------------------------------------- */
  const commonCrops = [
    "Rice", "Wheat", "Tomato", "Potato",
    "Onion", "Cotton", "Sugarcane", "Maize",
    "Pulses", "Vegetables", "Fruits"
  ];

    const addCrop = (directCrop = null) => {
      const crop = directCrop ? directCrop.trim() : tempCrop.trim();
      if (!crop) return;

      setFormData((p) => ({
        ...p,
        mainCrops: [...p.mainCrops, crop],
      }));

      setTempCrop("");
      toast.success(t.cropAdded);
    };


  const removeCrop = (crop) => {
    setFormData((p) => ({
      ...p,
      mainCrops: p.mainCrops.filter((c) => c !== crop),
    }));
    toast.success(t.cropRemoved);
  };

  /* --------------------------------------------------
      INPUT HANDLERS
  ----------------------------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // remove error when typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "password" || name === "confirmPassword") {
      return setFormData((p) => ({ ...p, [name]: value.replace(/\s/g, "") }));
    }

    if (name === "phone") {
      return setFormData((p) => ({ ...p, phone: value.replace(/\D/g, "") }));
    }

    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* --------------------------------------------------
      VALIDATION
  ----------------------------------------------------- */
  const validateStep1 = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name required";
    if (formData.phone.length !== 10) errors.phone = "Enter 10-digit phone";
    if (formData.password.length < 6) errors.password = "Min 6 characters";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords must match";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const fields = roleFields[formData.role];
    const errors = {};

    fields.forEach((f) => {
      if (!formData[f.name] || formData[f.name].toString().trim() === "") {
        errors[f.name] = `${f.label} required`;
      }
    });

    if (formData.role === "farmer" && formData.mainCrops.length === 0) {
      toast.error("Add at least one crop");
      return false;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* --------------------------------------------------
      STEP HANDLERS
  ----------------------------------------------------- */
  const goNext = () => {
    if (!validateStep1()) return;
    setStep(2);
  };

  const goBack = () => setStep(1);

  /* --------------------------------------------------
      SUBMIT HANDLER
  ----------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);

    try {
      const payload = {
        ...formData,
        phone: "+91" + formData.phone, // normalize
      };

      delete payload.confirmPassword;

      const res = await register(payload);

      if (res?.success) {
        toast.success(t.welcomeMessage);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(t.registrationFailed);
    }

    setLoading(false);
  };

  const handleGoogle = () => toast.info(t.googleSignupComing);
// PART 3 / 3  --------------------------------------------------

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* GREEN PROGRESS HEADER */}
        <div className="bg-green-600 px-6 py-4 flex justify-center space-x-6 text-white">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold 
              ${step >= 1 ? "bg-white text-green-600" : "bg-green-400"}`}>
              1
            </div>
            <span>{t.basicInfo}</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
              ${step >= 2 ? "bg-white text-green-600" : "bg-green-400"}`}>
              2
            </div>
            <span>{t.roleDetails}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">

          {/* STEP 1 ------------------------------------------------ */}
          {step === 1 && (
            <div className="space-y-5">

              {/* NAME */}
              <div>
                <label className="text-sm font-medium">{t.fullName}</label>
                <div className="relative">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.enterFullName}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      formErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <VoiceButton field="name" />
                </div>
                {formErrors.name && (
                  <p className="text-red-600 text-xs">{formErrors.name}</p>
                )}
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-medium">{t.phoneNumber}</label>
                <div className="relative">
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    maxLength={10}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      formErrors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <VoiceButton field="phone" />
                </div>
                {formErrors.phone && (
                  <p className="text-red-600 text-xs">{formErrors.phone}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium">{t.emailAddress}</label>
                <div className="relative">
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.enterEmail}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <VoiceButton field="email" />
                </div>
              </div>

              {/* ROLE */}
              <div>
                <label className="text-sm font-medium">{t.iAmA}</label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                  </select>
                  <VoiceButton field="role" />
                </div>
                <p className="text-xs text-green-700 mt-1">
                  {roleDescriptions[formData.role]}
                </p>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium">{t.password}</label>
                
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t.createPassword}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      formErrors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-8 text-gray-500"
                  >
                    {showPass ? <HiEyeOff /> : <HiEye />}
                  </button>
                  <VoiceButton field="password" className="absolute right-0" />
                </div>

                {formErrors.password && (
                  <p className="text-red-600 text-xs">{formErrors.password}</p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-sm font-medium">{t.confirmPassword}</label>

                <div className="relative flex items-center">
                  <input
                    name="confirmPassword"
                    type={showCPass ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={t.confirmPasswordPlaceholder}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCPass(!showCPass)}
                    className="absolute right-8 text-gray-500"
                  >
                    {showCPass ? <HiEyeOff /> : <HiEye />}
                  </button>
                  <VoiceButton field="confirmPassword" className="absolute right-0" />
                </div>

                {formErrors.confirmPassword && (
                  <p className="text-red-600 text-xs">{formErrors.confirmPassword}</p>
                )}
              </div>

              {/* NEXT BUTTON */}
              <button
                type="button"
                onClick={goNext}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                {t.continue}
              </button>
            </div>
          )}

          {/* STEP 2 ------------------------------------------------ */}
          {step === 2 && (
            <div className="space-y-6">

              <h3 className="text-xl font-semibold text-green-700">
                {formData.role.toUpperCase()} - {t.roleDetails}
              </h3>

              {/* ROLE-BASED FIELDS */}
              {roleFields[formData.role].map((f) => (
                <div key={f.name}>
                  <label className="text-sm font-medium">{f.label} *</label>

                  <div className="relative">
                    {f.type === "select" ? (
                      <select
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg ${
                          formErrors[f.name] ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select {f.label}</option>
                        {f.options.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className={`w-full px-3 py-2 border rounded-lg ${
                          formErrors[f.name] ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    )}

                    <VoiceButton field={f.name} />
                  </div>

                  {formErrors[f.name] && (
                    <p className="text-xs text-red-600">{formErrors[f.name]}</p>
                  )}
                </div>
              ))}

              {/* CROPS (farmer only) */}
              {formData.role === "farmer" && (
                <div>
                  <label className="text-sm font-medium">{t.cropsYouGrow}</label>

                  {/* Selected crops */}
                  {formData.mainCrops.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.mainCrops.map((crop) => (
                        <span
                          key={crop}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center"
                        >
                          {crop}
                          <button
                            type="button"
                            onClick={() => removeCrop(crop)}
                            className="ml-2 text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Add crop input */}
                  <div className="flex gap-2">
                    <input
                      value={tempCrop}
                      onChange={(e) => setTempCrop(e.target.value)}
                      placeholder={t.typeOrSpeak}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={addCrop}
                      className="px-3 bg-blue-600 text-white rounded-lg"
                    >
                      {t.addCropBtn}
                    </button>
                    <VoiceButton field="mainCrops" />
                  </div>

                  {/* Quick select crops */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {commonCrops.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => {
                          if (!formData.mainCrops.includes(c)) addCrop(c);
                        }}
                        className="px-2 py-1 bg-gray-200 text-xs rounded-lg"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BACK + SUBMIT */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="w-1/2 bg-gray-300 text-gray-800 py-3 rounded-lg"
                >
                  {t.back}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                >
                  {loading ? t.creatingAccount : t.createAccountBtn}
                </button>
              </div>
            </div>
          )}

          {/* GOOGLE SIGNUP (only step 1) */}
          {step === 1 && (
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-2 text-gray-500 text-sm">{t.or}</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                className="w-full mt-4 border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <FcGoogle size={20} />
                {t.signUpWithGoogle}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
