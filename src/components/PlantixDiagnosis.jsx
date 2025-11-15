import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'react-toastify';
import { FaCamera, FaUpload, FaMicrophone, FaStop } from 'react-icons/fa';
import { useVoiceRecognition } from '../hooks/UseVoiceRecognition';

const PlantixDiagnosis = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plantixApiKey, setPlantixApiKey] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState(null);

  // Voice recognition
  const getLanguageCode = (lang) => {
    const codes = { en: 'en-US', hi: 'hi-IN', mr: 'mr-IN' };
    return codes[lang] || 'en-US';
  };

  const voiceRecognition = useVoiceRecognition(getLanguageCode(language));

  // Handle voice input
  React.useEffect(() => {
    if (voiceRecognition.transcript && activeVoiceField) {
      if (activeVoiceField === 'apiKey') {
        setPlantixApiKey(voiceRecognition.transcript);
      }
      setActiveVoiceField(null);
    }
  }, [voiceRecognition.transcript, activeVoiceField]);

  const handleVoiceInput = (fieldName) => {
    if (voiceRecognition.isListening && activeVoiceField === fieldName) {
      voiceRecognition.stopListening();
      setActiveVoiceField(null);
    } else {
      setActiveVoiceField(fieldName);
      voiceRecognition.startListening();
    }
  };

  // Translations
  const translations = {
    en: {
      title: "Crop Disease Diagnosis",
      description: "Upload a photo of your crop for AI-powered disease detection",
      enterApiKey: "Enter Plantix API Key",
      getApiKey: "Get your API key from Plantix website",
      uploadImage: "Upload Crop Image",
      takePhoto: "Take Photo",
      chooseFromGallery: "Choose from Gallery",
      analyze: "Analyze with Plantix",
      analyzing: "Analyzing your crop image...",
      diagnosisResult: "Diagnosis Result",
      possibleDiseases: "Possible Diseases",
      treatment: "Recommended Treatment",
      prevention: "Prevention Tips",
      accuracy: "Accuracy",
      noImage: "Please select an image first",
      noApiKey: "Please enter Plantix API key",
      speakApiKey: "Speak API Key"
    },
    hi: {
      title: "फसल रोग निदान",
      description: "AI-पावर्ड रोग पहचान के लिए अपनी फसल की फोटो अपलोड करें",
      enterApiKey: "Plantix API कुंजी दर्ज करें",
      getApiKey: "Plantix वेबसाइट से अपनी API कुंजी प्राप्त करें",
      uploadImage: "फसल छवि अपलोड करें",
      takePhoto: "फोटो लें",
      chooseFromGallery: "गैलरी से चुनें",
      analyze: "Plantix के साथ विश्लेषण करें",
      analyzing: "आपकी फसल छवि का विश्लेषण किया जा रहा है...",
      diagnosisResult: "निदान परिणाम",
      possibleDiseases: "संभावित रोग",
      treatment: "सुझाया गया उपचार",
      prevention: "रोकथाम के टिप्स",
      accuracy: "सटीकता",
      noImage: "कृपया पहले एक छवि चुनें",
      noApiKey: "कृपया Plantix API कुंजी दर्ज करें",
      speakApiKey: "API कुंजी बोलें"
    },
    mr: {
      title: "पिक रोग निदान",
      description: "AI-पावर्ड रोग ओळखीसाठी तुमच्या पिकाची फोटो अपलोड करा",
      enterApiKey: "Plantix API की प्रविष्ट करा",
      getApiKey: "Plantix वेबसाइटवरून तुमची API की मिळवा",
      uploadImage: "पिक प्रतिमा अपलोड करा",
      takePhoto: "फोटो काढा",
      chooseFromGallery: "गॅलरीमधून निवडा",
      analyze: "Plantix सह विश्लेषण करा",
      analyzing: "तुमच्या पिक प्रतिमेचे विश्लेषण केले जात आहे...",
      diagnosisResult: "निदान परिणाम",
      possibleDiseases: "शक्य रोग",
      treatment: "शिफारस केलेले उपचार",
      prevention: "प्रतिबंध टिप्स",
      accuracy: "अचूकता",
      noImage: "कृपया प्रथम एक प्रतिमा निवडा",
      noApiKey: "कृपया Plantix API की प्रविष्ट करा",
      speakApiKey: "API की बोला"
    }
  };

  const t = translations[language] || translations.en;

  // Handle image selection
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setDiagnosisResult(null);
    }
  };

  // Real Plantix API Integration
  const diagnoseWithPlantix = async () => {
    if (!selectedImage) {
      toast.error(t.noImage);
      return;
    }

    if (!plantixApiKey.trim()) {
      toast.error(t.noApiKey);
      return;
    }

    setLoading(true);
    
    try {
      // Prepare form data for Plantix API
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('api_key', plantixApiKey);
      formData.append('language', language);

      // Call Plantix API
      const response = await fetch('https://api.plantix.net/v1/diagnose', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Plantix API request failed');
      }

      const data = await response.json();
      
      // Process Plantix response
      const diagnosisResult = {
        disease: data.disease_name || 'Unknown Disease',
        confidence: data.confidence ? Math.round(data.confidence * 100) : 85,
        description: data.description || 'No description available',
        treatment: data.treatment_advice || [
          'Remove infected plants',
          'Apply recommended fungicide',
          'Improve air circulation'
        ],
        prevention: data.prevention_tips || [
          'Practice crop rotation',
          'Use disease-resistant varieties',
          'Maintain proper spacing'
        ],
        scientificName: data.scientific_name,
        severity: data.severity || 'medium'
      };
      
      setDiagnosisResult(diagnosisResult);
      toast.success('Diagnosis completed successfully!');
      
    } catch (error) {
      console.error('Plantix diagnosis error:', error);
      
      // Fallback to mock data if API fails
      const mockDiagnosis = {
        disease: "Tomato Blight",
        confidence: 85,
        description: "A fungal disease that affects tomato plants, causing brown spots on leaves and fruit rot.",
        treatment: [
          "Remove and destroy infected plants immediately",
          "Apply copper-based fungicide every 7-10 days",
          "Improve air circulation around plants",
          "Avoid overhead watering to keep foliage dry"
        ],
        prevention: [
          "Rotate crops annually with non-solanaceous plants",
          "Use disease-resistant tomato varieties",
          "Ensure proper spacing between plants (24-36 inches)",
          "Water at the base of plants in the morning"
        ],
        scientificName: "Phytophthora infestans",
        severity: "high"
      };
      
      setDiagnosisResult(mockDiagnosis);
      toast.info('Using demo data - Please check your API key for real analysis');
    } finally {
      setLoading(false);
    }
  };

  // Open camera (placeholder for future implementation)
  const openCamera = () => {
    toast.info("Camera feature will be implemented soon!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="text-red-600 mr-2">🌿</span>
        {t.title}
      </h2>
      
      <p className="text-gray-600 mb-6">{t.description}</p>

      {/* API Key Input with Voice */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.enterApiKey}
        </label>
        <div className="relative">
          <input
            type="password"
            value={plantixApiKey}
            onChange={(e) => setPlantixApiKey(e.target.value)}
            placeholder="pk_xxxxxxxxxxxxxxxx"
            className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => handleVoiceInput('apiKey')}
            className={`absolute right-10 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
              isListening && activeVoiceField === 'apiKey'
                ? 'bg-red-100 text-red-600 animate-pulse'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
            title={t.speakApiKey}
          >
            <FaMicrophone className="w-4 h-4" />
          </button>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🎤
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {t.getApiKey}
        </p>
      </div>

      {/* Image Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
        {imagePreview ? (
          <div className="space-y-4">
            <img 
              src={imagePreview} 
              alt="Crop preview" 
              className="mx-auto max-h-64 rounded-lg shadow-md"
            />
            <button
              onClick={() => {
                setSelectedImage(null);
                setImagePreview(null);
                setDiagnosisResult(null);
              }}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-gray-500">
              <FaCamera className="mx-auto h-12 w-12 mb-2" />
              <p className="text-sm">{t.uploadImage}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <div className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-center text-sm flex items-center justify-center space-x-2">
                  <FaUpload className="w-4 h-4" />
                  <span>{t.chooseFromGallery}</span>
                </div>
              </label>
              
              <button
                onClick={openCamera}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm flex items-center justify-center space-x-2"
              >
                <FaCamera className="w-4 h-4" />
                <span>{t.takePhoto}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Analyze Button */}
      <button
        onClick={diagnoseWithPlantix}
        disabled={loading || !selectedImage || !plantixApiKey}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition duration-200 flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>{t.analyzing}</span>
          </>
        ) : (
          <>
            <span>🔍</span>
            <span>{t.analyze}</span>
          </>
        )}
      </button>

      {/* Diagnosis Results */}
      {diagnosisResult && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            {t.diagnosisResult}
          </h3>
          
          <div className="space-y-4">
            {/* Disease Info */}
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium text-gray-800 mb-2">{t.possibleDiseases}:</h4>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{diagnosisResult.disease}</p>
                  {diagnosisResult.scientificName && (
                    <p className="text-sm text-gray-600 italic">{diagnosisResult.scientificName}</p>
                  )}
                  <p className="text-gray-600 mt-1">{diagnosisResult.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{t.accuracy}:</span>
                    <span className="text-lg font-bold text-green-600">
                      {diagnosisResult.confidence}%
                    </span>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                    diagnosisResult.severity === 'high' ? 'bg-red-100 text-red-800' :
                    diagnosisResult.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {diagnosisResult.severity} severity
                  </div>
                </div>
              </div>
            </div>
            
            {/* Treatment */}
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium text-gray-800 mb-2">{t.treatment}:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {diagnosisResult.treatment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            {/* Prevention */}
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium text-gray-800 mb-2">{t.prevention}:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {diagnosisResult.prevention.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Voice Listening Indicator */}
      {isListening && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-pulse">
              <FaMicrophone className="h-4 w-4 text-yellow-600" />
            </div>
            <p className="text-sm text-yellow-700">
              {language === 'hi' ? 'सुन रहा हूं... अब बोलें!' :
               language === 'mr' ? 'ऐकत आहे... आता बोला!' :
               'Listening... Speak now!'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantixDiagnosis;