import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useVoiceRecognition } from '../hooks/UseVoiceRecognition';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { HiMicrophone, HiEye, HiEyeOff } from 'react-icons/hi';

// Translation objects (same as before)
const translations = {
  en: {
    // Navbar and general
    createAccount: "Create your AgriMatch account",
    signIn: "sign in to your existing account",
    or: "Or",
    
    // Steps
    basicInfo: "Basic Info",
    roleDetails: "Role Details",
    
    // Form labels
    fullName: "Full Name *",
    phoneNumber: "Phone Number *",
    emailAddress: "Email Address (Optional)",
    iAmA: "I am a *",
    password: "Password *",
    confirmPassword: "Confirm Password *",
    continue: "Continue to Role Details",
    back: "Back",
    createAccountBtn: "Create Account",
    
    // Placeholders
    enterFullName: "Enter your full name",
    enterEmail: "Enter your email (if available)",
    createPassword: "Create a password (min. 6 characters)",
    confirmPasswordPlaceholder: "Confirm your password",
    
    // Descriptions
    phoneDescription: "We'll use this for login and important updates",
    emailDescription: "Not required. Only for important communications.",
    
    // Role descriptions
    farmerDesc: "Sell your farm produce directly to buyers",
    buyerDesc: "Buy fresh produce directly from farmers",
    transportDesc: "Provide logistics and transportation services",
    storageDesc: "Offer cold storage and warehousing solutions",
    
    // Voice features
    voiceAvailable: "🎤 Voice input available! Click microphone icons to speak instead of type.",
    listening: "Listening... Speak now!",
    voiceCaptured: "Voice input captured!",
    speakNow: "Speak now...",
    stopListening: "Stop listening",
    
    // Validation messages
    fillAllFields: "Please fill in all required fields",
    validPhone: "Please enter a valid Indian phone number",
    passwordLength: "Password must be at least 6 characters long",
    passwordMatch: "Passwords do not match",
    fillField: "Please fill in",
    addCrop: "Please add at least one crop you grow",
    
    // Role details
    roleDetailsTitle: "Details",
    roleDetailsDesc: "Please provide some details about your activities",
    cropsYouGrow: "Crops You Grow *",
    selectedCrops: "Selected crops:",
    typeOrSpeak: "Type or speak crop name",
    addCropBtn: "Add Crop",
    quickSelect: "Quick select:",
    remove: "Remove",
    
    // Loading
    creatingAccount: "Creating account...",
    
    // Google
    signUpWithGoogle: "Sign up with Google",
    
    // Buttons
    add: "Add",
    removeCrop: "Remove crop",
    
    // Success messages
    cropAdded: "Crop added!",
    cropRemoved: "Crop removed!",
    googleSignupComing: "Google sign-up will be implemented soon!",
    registrationFailed: "Registration failed. Please try again.",
    welcomeMessage: "Welcome to AgriMatch! Your account has been created."
  },
  hi: {
    // Navbar and general
    createAccount: "अपना AgriMatch अकाउंट बनाएं",
    signIn: "अपने मौजूदा अकाउंट में साइन इन करें",
    or: "या",
    
    // Steps
    basicInfo: "मूल जानकारी",
    roleDetails: "भूमिका विवरण",
    
    // Form labels
    fullName: "पूरा नाम *",
    phoneNumber: "फोन नंबर *",
    emailAddress: "ईमेल पता (वैकल्पिक)",
    iAmA: "मैं एक *",
    password: "पासवर्ड *",
    confirmPassword: "पासवर्ड की पुष्टि करें *",
    continue: "भूमिका विवरण पर जारी रखें",
    back: "पीछे",
    createAccountBtn: "अकाउंट बनाएं",
    
    // Placeholders
    enterFullName: "अपना पूरा नाम दर्ज करें",
    enterEmail: "अपना ईमेल दर्ज करें (यदि उपलब्ध हो)",
    createPassword: "पासवर्ड बनाएं (न्यूनतम 6 अक्षर)",
    confirmPasswordPlaceholder: "अपने पासवर्ड की पुष्टि करें",
    
    // Descriptions
    phoneDescription: "हम इसे लॉगिन और महत्वपूर्ण अपडेट के लिए उपयोग करेंगे",
    emailDescription: "आवश्यक नहीं। केवल महत्वपूर्ण संचार के लिए।",
    
    // Role descriptions
    farmerDesc: "खरीदारों को सीधे अपनी फार्म उपज बेचें",
    buyerDesc: "किसानों से सीधे ताजा उत्पाद खरीदें",
    transportDesc: "लॉजिस्टिक्स और परिवहन सेवाएं प्रदान करें",
    storageDesc: "कोल्ड स्टोरेज और वेयरहाउसिंग समाधान प्रदान करें",
    
    // Voice features
    voiceAvailable: "🎤 वॉइस इनपुट उपलब्ध! टाइप करने के बजाय बोलने के लिए माइक्रोफोन आइकन पर क्लिक करें।",
    listening: "सुन रहा हूं... अब बोलें!",
    voiceCaptured: "वॉइस इनपुट कैप्चर हो गया!",
    speakNow: "अब बोलें...",
    stopListening: "सुनना बंद करें",
    
    // Validation messages
    fillAllFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
    validPhone: "कृपया एक वैध भारतीय फोन नंबर दर्ज करें",
    passwordLength: "पासवर्ड कम से कम 6 अक्षर लंबा होना चाहिए",
    passwordMatch: "पासवर्ड मेल नहीं खाते",
    fillField: "कृपया भरें",
    addCrop: "कृपया कम से कम एक फसल जोड़ें जो आप उगाते हैं",
    
    // Role details
    roleDetailsTitle: "विवरण",
    roleDetailsDesc: "कृपया अपनी गतिविधियों के बारे में कुछ विवरण प्रदान करें",
    cropsYouGrow: "आपकी फसलें *",
    selectedCrops: "चयनित फसलें:",
    typeOrSpeak: "फसल का नाम टाइप करें या बोलें",
    addCropBtn: "फसल जोड़ें",
    quickSelect: "त्वरित चयन:",
    remove: "हटाएं",
    
    // Loading
    creatingAccount: "अकाउंट बनाया जा रहा है...",
    
    // Google
    signUpWithGoogle: "Google के साथ साइन अप करें",
    
    // Buttons
    add: "जोड़ें",
    removeCrop: "फसल हटाएं",
    
    // Success messages
    cropAdded: "फसल जोड़ दी गई!",
    cropRemoved: "फसल हटा दी गई!",
    googleSignupComing: "Google साइन-अप जल्द ही लागू किया जाएगा!",
    registrationFailed: "पंजीकरण विफल। कृपया पुनः प्रयास करें।",
    welcomeMessage: "AgriMatch में आपका स्वागत है! आपका खाता बन गया है।"
  },
  mr: {
    // Navbar and general
    createAccount: "तुमचे AgriMatch खाते तयार करा",
    signIn: "तुमच्या विद्यमान खात्यात साइन इन करा",
    or: "किंवा",
    
    // Steps
    basicInfo: "मूल माहिती",
    roleDetails: "भूमिका तपशील",
    
    // Form labels
    fullName: "पूर्ण नाव *",
    phoneNumber: "फोन नंबर *",
    emailAddress: "ईमेल पत्ता (पर्यायी)",
    iAmA: "मी एक *",
    password: "पासवर्ड *",
    confirmPassword: "पासवर्डची पुष्टी करा *",
    continue: "भूमिका तपशीलांवर सुरू ठेवा",
    back: "मागे",
    createAccountBtn: "खाते तयार करा",
    
    // Placeholders
    enterFullName: "तुमचे पूर्ण नाव प्रविष्ट करा",
    enterEmail: "तुमचा ईमेल प्रविष्ट करा (उपलब्ध असल्यास)",
    createPassword: "पासवर्ड तयार करा (किमान ६ वर्ण)",
    confirmPasswordPlaceholder: "तुमच्या पासवर्डची पुष्टी करा",
    
    // Descriptions
    phoneDescription: "आम्ही हे लॉगिन आणि महत्वाच्या अद्यतनांसाठी वापरू",
    emailDescription: "आवश्यक नाही. केवळ महत्वाच्या संप्रेषणांसाठी.",
    
    // Role descriptions
    farmerDesc: "खरेदीदारांना थेट तुमची शेती उत्पादने विका",
    buyerDesc: "शेतकऱ्यांकडून थेट ताजे उत्पादने खरेदी करा",
    transportDesc: "लॉजिस्टिक्स आणि वाहतूक सेवा प्रदान करा",
    storageDesc: "कोल्ड स्टोरेज आणि वेअरहाउसिंग सोल्यूशन्स ऑफर करा",
    
    // Voice features
    voiceAvailable: "🎤 व्हॉइस इनपुट उपलब्ध! टाइप करण्याऐवजी बोलण्यासाठी मायक्रोफोन आयकॉनवर क्लिक करा.",
    listening: "ऐकत आहे... आता बोला!",
    voiceCaptured: "व्हॉइस इनपुट कॅप्चर केला गेला!",
    speakNow: "आता बोला...",
    stopListening: "ऐकणे बंद करा",
    
    // Validation messages
    fillAllFields: "कृपया सर्व आवश्यक फील्ड भरा",
    validPhone: "कृपया एक वैध भारतीय फोन नंबर प्रविष्ट करा",
    passwordLength: "पासवर्ड किमान ६ वर्ण लांब असणे आवश्यक आहे",
    passwordMatch: "पासवर्ड जुळत नाहीत",
    fillField: "कृपया भरा",
    addCrop: "कृपया किमान एक पीक जोडा जे आपण वाढवता",
    
    // Role details
    roleDetailsTitle: "तपशील",
    roleDetailsDesc: "कृपया आपल्या क्रियाकलापांबद्दल काही तपशील प्रदान करा",
    cropsYouGrow: "तुमची पिके *",
    selectedCrops: "निवडलेली पिके:",
    typeOrSpeak: "पिकाचे नाव टाइप करा किंवा बोला",
    addCropBtn: "पीक जोडा",
    quickSelect: "द्रुत निवड:",
    remove: "काढा",
    
    // Loading
    creatingAccount: "खाते तयार केले जात आहे...",
    
    // Google
    signUpWithGoogle: "Google सह साइन अप करा",
    
    // Buttons
    add: "जोडा",
    removeCrop: "पीक काढा",
    
    // Success messages
    cropAdded: "पीक जोडले गेले!",
    cropRemoved: "पीक काढले गेले!",
    googleSignupComing: "Google साइन-अप लवकरच लागू केले जाईल!",
    registrationFailed: "नोंदणी अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    welcomeMessage: "AgriMatch मध्ये आपले स्वागत आहे! आपले खाते तयार केले गेले आहे."
  }
};


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'farmer',
    // Farmer specific fields
    landArea: '',
    landAreaUnit: 'acres',
    mainCrops: [],
    farmingExperience: '',
    irrigationType: '',
    soilType: '',
    farmLocation: '',
    // Buyer specific fields
    businessName: '',
    businessType: '',
    purchaseVolume: '',
    businessLocation: '',
    // Transport specific fields
    vehicleType: '',
    serviceArea: '',
    capacity: '',
    vehicleCount: '',
    // Storage specific fields
    storageType: '',
    storageCapacity: '',
    facilities: '',
    storageLocation: ''
  });

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeVoiceField, setActiveVoiceField] = useState(null);
  const [tempCrop, setTempCrop] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { register } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const t = translations[language] || translations.en;

  // Voice recognition setup
  const getLanguageCode = (lang) => {
    const codes = { en: 'en-US', hi: 'hi-IN', mr: 'mr-IN' };
    return codes[lang] || 'en-US';
  };

  const voiceRecognition = useVoiceRecognition(getLanguageCode(language));

  // Handle voice input
  React.useEffect(() => {
    if (voiceRecognition.transcript && activeVoiceField) {
      if (activeVoiceField === 'mainCrops') {
        setTempCrop(voiceRecognition.transcript);
      } else {
        setFormData(prev => ({
          ...prev,
          [activeVoiceField]: voiceRecognition.transcript
        }));
      }
      setActiveVoiceField(null);
      toast.success(t.voiceCaptured);
    }
  }, [voiceRecognition.transcript, activeVoiceField, t.voiceCaptured]);

  const handleVoiceInput = (fieldName) => {
    if (voiceRecognition.isListening && activeVoiceField === fieldName) {
      voiceRecognition.stopListening();
      setActiveVoiceField(null);
      toast.info(t.stopListening);
    } else {
      setActiveVoiceField(fieldName);
      voiceRecognition.startListening();
      toast.info(t.speakNow);
    }
  };

  // FIXED: Phone number input handler
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    
    // Clear errors when user starts typing
    if (formErrors.phone) {
      setFormErrors(prev => ({ ...prev, phone: '' }));
    }
    
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");
    
    // If empty, set empty string
    if (cleaned === '') {
      setFormData(prev => ({ ...prev, phone: '' }));
      return;
    }
    
    // If starts with 91 and length is 12, it's already with country code
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      const formatted = `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7, 12)}`;
      setFormData(prev => ({ ...prev, phone: formatted }));
      return;
    }
    
    // If 10 digits, assume Indian number and format with +91
    if (cleaned.length === 10) {
      const formatted = `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5, 10)}`;
      setFormData(prev => ({ ...prev, phone: formatted }));
      return;
    }
    
    // For partial input, just show the digits without formatting
    setFormData(prev => ({ ...prev, phone: cleaned }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Special handling for phone input
    if (name === "phone") {
      handlePhoneChange(e);
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle password change - remove spaces
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\s/g, '');
    setFormData(prev => ({ ...prev, [name]: cleanedValue }));
    
    // Clear errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Add crop to mainCrops array
  const addCrop = () => {
    if (tempCrop.trim() && !formData.mainCrops.includes(tempCrop.trim())) {
      setFormData(prev => ({
        ...prev,
        mainCrops: [...prev.mainCrops, tempCrop.trim()]
      }));
      setTempCrop('');
      toast.success(t.cropAdded);
    }
  };

  // Remove crop from mainCrops array
  const removeCrop = (cropToRemove) => {
    setFormData(prev => ({
      ...prev,
      mainCrops: prev.mainCrops.filter(crop => crop !== cropToRemove)
    }));
    toast.success(t.cropRemoved);
  };

  // Voice command handler for buttons
  const handleVoiceCommand = (command) => {
    const normalizedCommand = command.toLowerCase().trim();
    
    switch (normalizedCommand) {
      case 'next':
      case 'continue':
      case 'proceed':
        if (currentStep === 1) {
          handleNextStep();
        }
        break;
      case 'back':
      case 'previous':
      case 'return':
        if (currentStep === 2) {
          handlePrevStep();
        }
        break;
      case 'submit':
      case 'create account':
      case 'register':
        if (currentStep === 2) {
          document.querySelector('form').requestSubmit();
        }
        break;
      case 'add crop':
      case 'add':
        if (tempCrop.trim()) {
          addCrop();
        }
        break;
      case 'google signup':
      case 'sign up with google':
        handleGoogleSignup();
        break;
      default:
        if (commonCrops.some(crop => crop.toLowerCase() === normalizedCommand)) {
          const crop = commonCrops.find(c => c.toLowerCase() === normalizedCommand);
          if (!formData.mainCrops.includes(crop)) {
            setFormData(prev => ({
              ...prev,
              mainCrops: [...prev.mainCrops, crop]
            }));
            toast.success(`${crop} ${t.cropAdded}`);
          }
        }
        break;
    }
  };

  // Handle voice input for buttons and commands
  React.useEffect(() => {
    if (voiceRecognition.transcript && !activeVoiceField) {
      handleVoiceCommand(voiceRecognition.transcript);
    }
  }, [voiceRecognition.transcript, activeVoiceField]);

  // Role-specific field configurations
  const roleFields = {
    farmer: [
      { name: 'landArea', label: 'Land Area', type: 'number', placeholder: 'Enter land area' },
      { name: 'landAreaUnit', label: 'Unit', type: 'select', options: ['acres', 'hectares', 'bigha'] },
      { name: 'farmLocation', label: 'Farm Location', type: 'text', placeholder: 'Village, District, State' },
      { name: 'soilType', label: 'Soil Type', type: 'select', options: ['Black Soil', 'Red Soil', 'Alluvial', 'Laterite', 'Mountain', 'Desert'] },
      { name: 'irrigationType', label: 'Irrigation Type', type: 'select', options: ['Rain-fed', 'Well', 'Canal', 'Drip', 'Sprinkler', 'Tube Well'] },
      { name: 'farmingExperience', label: 'Farming Experience', type: 'select', options: ['Less than 1 year', '1-5 years', '5-10 years', '10-20 years', '20+ years'] }
    ],
    buyer: [
      { name: 'businessName', label: 'Business Name', type: 'text', placeholder: 'Your business or shop name' },
      { name: 'businessType', label: 'Business Type', type: 'select', options: ['Retail Store', 'Restaurant', 'Export Company', 'Processing Unit', 'Wholesaler', 'Supermarket'] },
      { name: 'purchaseVolume', label: 'Monthly Purchase Volume', type: 'text', placeholder: 'e.g., 2 tons, 500 kg weekly' },
      { name: 'businessLocation', label: 'Business Location', type: 'text', placeholder: 'City, State' }
    ],
    transport: [
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', options: ['Truck', 'Tempo', 'Refrigerated Van', 'Tractor Trailer', 'Mini Truck', 'Container'] },
      { name: 'vehicleCount', label: 'Number of Vehicles', type: 'number', placeholder: 'How many vehicles?' },
      { name: 'capacity', label: 'Vehicle Capacity', type: 'text', placeholder: 'e.g., 5 tons, 10 tons' },
      { name: 'serviceArea', label: 'Service Area', type: 'text', placeholder: 'e.g., Maharashtra, Multiple states' }
    ],
    storage: [
      { name: 'storageType', label: 'Storage Type', type: 'select', options: ['Cold Storage', 'Warehouse', 'Controlled Atmosphere', 'Silo', 'Godown'] },
      { name: 'storageCapacity', label: 'Storage Capacity', type: 'text', placeholder: 'e.g., 100 tons, 5000 sq ft' },
      { name: 'facilities', label: 'Available Facilities', type: 'text', placeholder: 'e.g., Temperature control, Pest control' },
      { name: 'storageLocation', label: 'Storage Location', type: 'text', placeholder: 'City, State' }
    ]
  };

  const roleDescriptions = {
    farmer: t.farmerDesc,
    buyer: t.buyerDesc,
    transport: t.transportDesc,
    storage: t.storageDesc
  };

  // FIXED: Phone validation function
  const validatePhone = (phone) => {
    const phoneDigits = phone.replace(/\D/g, "");
    
    // Check if it's a 10-digit Indian number
    if (phoneDigits.length === 10 && ['6','7','8','9'].includes(phoneDigits[0])) {
      return true;
    }
    
    // Check if it's a 12-digit number starting with 91 (country code)
    if (phoneDigits.length === 12 && phoneDigits.startsWith('91') && ['6','7','8','9'].includes(phoneDigits[2])) {
      return true;
    }
    
    return false;
  };

  const validateStep1 = () => {
    const errors = {};
    const { name, phone, password, confirmPassword } = formData;
    
    // Name validation
    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }
    
    // Phone validation
    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      errors.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    
    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    const fields = roleFields[formData.role];
    
    for (let field of fields) {
      if (!formData[field.name] || formData[field.name].toString().trim() === '') {
        errors[field.name] = `${field.label} is required`;
      }
    }

    // Additional validation for farmer - must have at least one crop
    if (formData.role === 'farmer' && formData.mainCrops.length === 0) {
      toast.error(t.addCrop);
      return false;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    console.log('Next button clicked');
    if (validateStep1()) {
      console.log('Validation passed, moving to step 2');
      setCurrentStep(2);
    } else {
      console.log('Validation failed', formErrors);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  // FIXED: Handle form submission with proper phone formatting
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    
    if (!validateStep2()) {
      console.log('Step 2 validation failed');
      return;
    }

    setLoading(true);
    console.log('Starting registration process');
    
    try {
      // Prepare data for registration
      const { confirmPassword, phone, ...registerData } = formData;
      
      // Normalize phone number for backend
      const phoneDigits = phone.replace(/\D/g, "");
      let normalizedPhone;
      
      if (phoneDigits.length === 10) {
        normalizedPhone = `+91${phoneDigits}`;
      } else if (phoneDigits.length === 12 && phoneDigits.startsWith('91')) {
        normalizedPhone = `+${phoneDigits}`;
      } else {
        throw new Error('Invalid phone number format');
      }
      
      const finalData = {
        ...registerData,
        phone: normalizedPhone
      };
      
      console.log('Registration data:', finalData);
      
      const result = await register(finalData);
      console.log('Registration result:', result);
      
      if (result.success) {
        toast.success(t.welcomeMessage);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || t.registrationFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.info(t.googleSignupComing);
  };

  const commonCrops = ['Rice', 'Wheat', 'Tomato', 'Potato', 'Onion', 'Cotton', 'Sugarcane', 'Maize', 'Pulses', 'Vegetables', 'Fruits'];

  // Voice input component for any field
  const VoiceInputButton = ({ fieldName, className = "" }) => (
    <button
      type="button"
      onClick={() => handleVoiceInput(fieldName)}
      disabled={!voiceRecognition.isSupported}
      className={`p-1 rounded-full ${
        voiceRecognition.isListening && activeVoiceField === fieldName
          ? 'bg-red-100 text-red-600 animate-pulse'
          : voiceRecognition.isSupported
          ? 'bg-green-100 text-green-600 hover:bg-green-200'
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      } ${className}`}
      title={voiceRecognition.isListening && activeVoiceField === fieldName ? t.stopListening : t.speakNow}
    >
      <HiMicrophone size={14} />
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Progress Bar */}
        <div className="bg-green-600 py-4">
          <div className="flex justify-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-white' : 'text-green-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-white text-green-600' : 'bg-green-500 text-white'}`}>
                1
              </div>
              <span className="ml-2 text-sm">{t.basicInfo}</span>
            </div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-white' : 'text-green-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-white text-green-600' : 'bg-green-500 text-white'}`}>
                2
              </div>
              <span className="ml-2 text-sm">{t.roleDetails}</span>
            </div>
          </div>
        </div>

        <div className="py-8 px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {t.createAccount}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t.or}{' '}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              {t.signIn}
            </Link>
          </p>

          {/* Voice Help */}
          {voiceRecognition.isSupported && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700 text-center">
                {t.voiceAvailable}
              </p>
              <p className="text-xs text-green-600 text-center mt-1">
                Try voice commands: "next", "back", "submit", "add crop", "rice", "wheat", etc.
              </p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t.fullName}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className={`block w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm ${
                        formErrors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                      }`}
                      placeholder={t.enterFullName}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <VoiceInputButton fieldName="name" />
                    </div>
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>

                {/* FIXED: Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t.phoneNumber}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className={`block w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm ${
                        formErrors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                      }`}
                      placeholder="Enter 10-digit phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={17}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <VoiceInputButton fieldName="phone" />
                    </div>
                  </div>
                  {formErrors.phone ? (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      {t.phoneDescription} (Format: +91 XXXXX XXXXX or 10 digits)
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t.emailAddress}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder={t.enterEmail}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <VoiceInputButton fieldName="email" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{t.emailDescription}</p>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    {t.iAmA}
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="role"
                      name="role"
                      required
                      className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="farmer">Farmer</option>
                      <option value="buyer">Buyer/Business</option>
                      <option value="transport">Transport Provider</option>
                      <option value="storage">Storage Provider</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <VoiceInputButton fieldName="role" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">{roleDescriptions[formData.role]}</p>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t.password}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className={`block w-full px-3 py-2 pr-20 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm ${
                        formErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                      }`}
                      placeholder={t.createPassword}
                      value={formData.password}
                      onChange={handlePasswordChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <HiEyeOff size={16} /> : <HiEye size={16} />}
                      </button>
                      <VoiceInputButton fieldName="password" />
                    </div>
                  </div>
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    {t.confirmPassword}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      className={`block w-full px-3 py-2 pr-20 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm ${
                        formErrors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                      }`}
                      placeholder={t.confirmPasswordPlaceholder}
                      value={formData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                        title={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <HiEyeOff size={16} /> : <HiEye size={16} />}
                      </button>
                      <VoiceInputButton fieldName="confirmPassword" />
                    </div>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium transition duration-200"
                >
                  {t.continue}
                </button>
              </div>
            )}

            {/* Step 2: Role-specific Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800">
                    {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} {t.roleDetailsTitle}
                  </h3>
                  <p className="text-sm text-green-600">
                    {t.roleDetailsDesc}
                  </p>
                </div>

                {roleFields[formData.role].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      {field.label} *
                    </label>
                    <div className="mt-1 relative">
                      {field.type === 'select' ? (
                        <select
                          id={field.name}
                          name={field.name}
                          required
                          className={`block w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm ${
                            formErrors[field.name] ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                          }`}
                          value={formData[field.name]}
                          onChange={handleChange}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required
                          className={`block w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm ${
                            formErrors[field.name] ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                          }`}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                        />
                      )}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <VoiceInputButton fieldName={field.name} />
                      </div>
                    </div>
                    {formErrors[field.name] && (
                      <p className="mt-1 text-sm text-red-600">{formErrors[field.name]}</p>
                    )}
                  </div>
                ))}

                {/* Special field for farmer - Crops Grown */}
                {formData.role === 'farmer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.cropsYouGrow}
                    </label>
                    
                    {/* Selected Crops */}
                    {formData.mainCrops.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">{t.selectedCrops}</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.mainCrops.map((crop, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {crop}
                              <button
                                type="button"
                                onClick={() => removeCrop(crop)}
                                className="ml-2 text-red-500 hover:text-red-700"
                                title={t.removeCrop}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add Crop Input */}
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={tempCrop}
                          onChange={(e) => setTempCrop(e.target.value)}
                          placeholder={t.typeOrSpeak}
                          className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <VoiceInputButton fieldName="mainCrops" />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={addCrop}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                      >
                        {t.addCropBtn}
                      </button>
                    </div>

                    {/* Quick Crop Selection */}
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">{t.quickSelect}</p>
                      <div className="flex flex-wrap gap-1">
                        {commonCrops.map((crop) => (
                          <button
                            key={crop}
                            type="button"
                            onClick={() => {
                              if (!formData.mainCrops.includes(crop)) {
                                setFormData(prev => ({
                                  ...prev,
                                  mainCrops: [...prev.mainCrops, crop]
                                }));
                                toast.success(`${crop} ${t.cropAdded}`);
                              }
                            }}
                            disabled={formData.mainCrops.includes(crop)}
                            className={`px-2 py-1 text-xs rounded ${
                              formData.mainCrops.includes(crop)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {crop}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Voice Listening Indicator */}
                {voiceRecognition.isListening && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-pulse">
                        <HiMicrophone className="h-4 w-4 text-yellow-600" />
                      </div>
                      <p className="text-sm text-yellow-700">
                        {t.listening}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium transition duration-200"
                  >
                    {t.back}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition duration-200"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t.creatingAccount}
                      </span>
                    ) : (
                      `${t.createAccountBtn}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Only show Google signup on first step */}
          {currentStep === 1 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t.or}</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
                >
                  <FcGoogle className="w-5 h-5 mr-2" />
                  {t.signUpWithGoogle}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;