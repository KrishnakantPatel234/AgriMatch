const express = require('express');
const router = express.Router();
// Use native fetch if available, otherwise lazy-load node-fetch (ESM)
const doFetch = globalThis.fetch ? globalThis.fetch.bind(globalThis) : (...args) => import('node-fetch').then(({ default: f }) => f(...args));

// Cache for rate limiting and temporary storage
const analysisCache = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

// Plant disease database with detailed information
const PLANT_DISEASE_DATABASE = {
  // Fungal Diseases
  'powdery_mildew': {
    names: { en: 'Powdery Mildew', hi: 'पाउडरी मिल्ड्यू', mr: 'पावडेरी मिल्ड्यू' },
    symptoms: {
      en: 'White powdery spots on leaves and stems',
      hi: 'पत्तियों और तनों पर सफेद पाउडर जैसे धब्बे',
      mr: 'पानावर आणि खोडावर पांढरे पावडरसारखे डाग'
    },
    causes: {
      en: 'High humidity, poor air circulation',
      hi: 'उच्च आर्द्रता, खराब वायु संचरण',
      mr: 'उच्च आर्द्रता, खराब हवा संचरण'
    },
    treatments: {
      en: 'Apply sulfur-based fungicide, improve air circulation',
      hi: 'सल्फर आधारित फफूंदनाशक लगाएं, वायु संचरण सुधारें',
      mr: 'सल्फर-आधारित फंगिसाईड लावा, हवा संचरण सुधारा'
    },
    prevention: {
      en: 'Proper spacing, morning watering, resistant varieties',
      hi: 'उचित दूरी, सुबह पानी देना, प्रतिरोधी किस्में',
      mr: 'योग्य अंतर, सकाळी पाणी देणे, प्रतिरोधक प्रजाती'
    },
    severity: 'medium',
    affectedPlants: ['cucumber', 'squash', 'grapes', 'roses']
  },
  
  'leaf_spot': {
    names: { en: 'Leaf Spot Disease', hi: 'लीफ स्पॉट रोग', mr: 'लीफ स्पॉट रोग' },
    symptoms: {
      en: 'Circular brown or black spots on leaves',
      hi: 'पत्तियों पर गोलाकार भूरे या काले धब्बे',
      mr: 'पानावर वर्तुळाकार तपकिरी किंवा काळे डाग'
    },
    causes: {
      en: 'Fungal or bacterial infection, overhead watering',
      hi: 'फंगल या बैक्टीरियल संक्रमण, ऊपर से पानी देना',
      mr: 'बुरशीजन्य किंवा जीवाणू संसर्ग, वरून पाणी देणे'
    },
    treatments: {
      en: 'Copper-based fungicide, remove affected leaves',
      hi: 'कॉपर आधारित फफूंदनाशक, प्रभावित पत्तियां हटाएं',
      mr: 'तांबे-आधारित फंगिसाईड, प्रभावित पाने काढा'
    },
    prevention: {
      en: 'Avoid overhead watering, proper sanitation',
      hi: 'ऊपर से पानी देने से बचें, उचित स्वच्छता',
      mr: 'वरून पाणी देणे टाळा, योग्य स्वच्छता'
    },
    severity: 'low',
    affectedPlants: ['tomato', 'pepper', 'lettuce', 'spinach']
  },

  'blight': {
    names: { en: 'Blight', hi: 'ब्लाइट', mr: 'ब्लाइट' },
    symptoms: {
      en: 'Rapid wilting, dark lesions on stems and leaves',
      hi: 'तेजी से मुरझाना, तनों और पत्तियों पर काले घाव',
      mr: 'वेगाने कोमेजणे, खोड आणि पानावर गडद घाव'
    },
    causes: {
      en: 'Fungal pathogens, wet conditions',
      hi: 'फंगल रोगजनक, गीली परिस्थितियां',
      mr: 'बुरशीजन्य रोगजनक, ओल्या परिस्थिती'
    },
    treatments: {
      en: 'Systemic fungicides, destroy infected plants',
      hi: 'सिस्टमिक फफूंदनाशक, संक्रमित पौधों को नष्ट करें',
      mr: 'सिस्टमिक फंगिसाईड, संसर्गित रोपे नष्ट करा'
    },
    prevention: {
      en: 'Crop rotation, proper spacing, fungicide sprays',
      hi: 'फसल चक्र, उचित दूरी, फफूंदनाशक स्प्रे',
      mr: 'पीक फेरबदल, योग्य अंतर, फंगिसाईड स्प्रे'
    },
    severity: 'high',
    affectedPlants: ['potato', 'tomato']
  },

  // Nutrient Deficiencies
  'nitrogen_deficiency': {
    names: { en: 'Nitrogen Deficiency', hi: 'नाइट्रोजन की कमी', mr: 'नायट्रोजनची कमतरता' },
    symptoms: {
      en: 'Yellowing of older leaves, stunted growth',
      hi: 'पुरानी पत्तियों का पीला पड़ना, विकास रुकना',
      mr: 'जुन्या पानांचे पिवळे पडणे, वाढ अडकणे'
    },
    causes: {
      en: 'Poor soil, inadequate fertilization',
      hi: 'खराब मिट्टी, अपर्याप्त उर्वरक',
      mr: 'खराब माती, अपुरे खत'
    },
    treatments: {
      en: 'Apply nitrogen-rich fertilizer, compost',
      hi: 'नाइट्रोजन युक्त उर्वरक डालें, कम्पोस्ट',
      mr: 'नायट्रोजनयुक्त खत लावा, कंपोस्ट'
    },
    prevention: {
      en: 'Regular soil testing, balanced fertilization',
      hi: 'नियमित मिट्टी परीक्षण, संतुलित उर्वरक',
      mr: 'नियमित माती चाचणी, संतुलित खत'
    },
    severity: 'medium',
    affectedPlants: ['all']
  },

  // Pest Problems
  'aphid_infestation': {
    names: { en: 'Aphid Infestation', hi: 'एफिड संक्रमण', mr: 'अॅफिड संसर्ग' },
    symptoms: {
      en: 'Curled leaves, sticky residue, ant activity',
      hi: 'मुड़ी हुई पत्तियां, चिपचिपा अवशेष, चींटी गतिविधि',
      mr: 'वाकडी पाने, चिकट अवशेष, मुंग्यांची हालचाल'
    },
    causes: {
      en: 'Aphid insects, weak plants',
      hi: 'एफिड कीट, कमजोर पौधे',
      mr: 'अॅफिड कीट, कमकुवत रोपे'
    },
    treatments: {
      en: 'Neem oil, insecticidal soap, ladybugs',
      hi: 'नीम तेल, कीटनाशक साबुन, लेडीबग',
      mr: 'कडुलिंब तेल, कीटकनाशक साबण, लेडीबग'
    },
    prevention: {
      en: 'Companion planting, regular inspection',
      hi: 'सहयोगी रोपण, नियमित निरीक्षण',
      mr: 'सहयोगी लागवड, नियमित तपासणी'
    },
    severity: 'low',
    affectedPlants: ['rose', 'cabbage', 'pepper', 'fruit_trees']
  }
};

// Rate limiting middleware
const checkRateLimit = (ip) => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  // Clean old entries
  for (const [key, timestamps] of analysisCache.entries()) {
    if (key.startsWith('rate:')) {
      analysisCache.set(key, timestamps.filter(time => time > windowStart));
    }
  }

  const key = `rate:${ip}`;
  const requests = analysisCache.get(key) || [];
  
  if (requests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  requests.push(now);
  analysisCache.set(key, requests);
  return true;
};

// Enhanced image validation
const validateImage = (dataUrl) => {
  if (!dataUrl || typeof dataUrl !== 'string') {
    return { valid: false, error: 'Image data URL is required' };
  }

  const match = dataUrl.match(/^data:(image\/(jpeg|png|jpg|gif));base64,(.+)$/);
  if (!match) {
    return { valid: false, error: 'Invalid image format. Supported: JPEG, PNG, GIF' };
  }

  const base64Data = match[3];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const sizeInBytes = (base64Data.length * 3) / 4; // Approximate byte size

  if (sizeInBytes > maxSize) {
    return { valid: false, error: 'Image too large. Maximum size: 10MB' };
  }

  return { valid: true, mimeType: match[1], base64Data };
};

// Helper: convert data URL -> Buffer
const toBuffer = (base64Data) => {
  return Buffer.from(base64Data, 'base64');
};

// Enhanced disease detection with confidence scoring
const detectDiseaseFromLabels = (labels, confidenceThreshold = 0.3) => {
  const highConfidenceLabels = labels.filter(label => label.score >= confidenceThreshold);
  
  const detectedDiseases = [];
  
  highConfidenceLabels.forEach(label => {
    const labelText = label.label.toLowerCase();
    
    // Match against known diseases
    for (const [diseaseKey, diseaseInfo] of Object.entries(PLANT_DISEASE_DATABASE)) {
      const diseaseNames = Object.values(diseaseInfo.names).map(name => name.toLowerCase());
      
      if (diseaseNames.some(name => labelText.includes(name.toLowerCase())) || 
          labelText.includes(diseaseKey)) {
        detectedDiseases.push({
          disease: diseaseKey,
          confidence: label.score,
          info: diseaseInfo
        });
      }
    }
  });

  return detectedDiseases.length > 0 ? detectedDiseases : null;
};

// Generate comprehensive analysis report
const generateAnalysisReport = (detectedDiseases, labels, language = 'en') => {
  const lang = ['en', 'hi', 'mr'].includes(language) ? language : 'en';
  
  if (!detectedDiseases || detectedDiseases.length === 0) {
    const healthyMessages = {
      en: '✅ Plant appears healthy! No major issues detected.',
      hi: '✅ पौधा स्वस्थ प्रतीत होता है! कोई बड़ी समस्या नहीं पाई गई।',
      mr: '✅ रोपे निरोगी दिसते! कोणतीही मोठी समस्या आढळली नाही.'
    };
    
    const topLabels = labels.slice(0, 3).map(l => `${l.label} (${Math.round(l.score * 100)}%)`).join(', ');
    
    return {
      healthStatus: 'healthy',
      confidence: Math.round(labels[0]?.score * 100 || 0),
      summary: healthyMessages[lang],
      detectedIssues: [],
      recommendations: {
        general: {
          en: 'Continue regular care and monitoring',
          hi: 'नियमित देखभाल और निगरानी जारी रखें',
          mr: 'नियमित काळजी आणि निरीक्षण सुरू ठेवा'
        }[lang]
      },
      identifiedLabels: topLabels
    };
  }

  // Handle detected diseases
  const primaryDisease = detectedDiseases[0];
  const healthStatus = primaryDisease.info.severity === 'high' ? 'critical' : 
                      primaryDisease.info.severity === 'medium' ? 'needs_attention' : 'monitor';

  const statusMessages = {
    critical: { en: '🚨 Critical Condition', hi: '🚨 गंभीर स्थिति', mr: '🚨 गंभीर स्थिती' },
    needs_attention: { en: '⚠️ Needs Attention', hi: '⚠️ ध्यान देने की आवश्यकता', mr: '⚠️ लक्ष देणे आवश्यक' },
    monitor: { en: '🔍 Monitor Closely', hi: '🔍 बारीकी से निगरानी करें', mr: '🔍 काळजीपूर्वक निरीक्षण करा' }
  };

  const issues = detectedDiseases.map(disease => ({
    disease: disease.info.names[lang],
    confidence: Math.round(disease.confidence * 100),
    symptoms: disease.info.symptoms[lang],
    causes: disease.info.causes[lang]
  }));

  const recommendations = {
    immediate: detectedDiseases.map(disease => disease.info.treatments[lang]),
    preventive: detectedDiseases.map(disease => disease.info.prevention[lang])
  };

  return {
    healthStatus,
    confidence: Math.round(primaryDisease.confidence * 100),
    summary: `${statusMessages[healthStatus][lang]}: ${primaryDisease.info.names[lang]}`,
    detectedIssues: issues,
    recommendations,
    identifiedLabels: labels.slice(0, 3).map(l => `${l.label} (${Math.round(l.score * 100)}%)`).join(', ')
  };
};

// POST /api/ai/analyze-image
// Body: { image: "data:image/png;base64,...", language?: "en", detailed?: boolean }
router.post('/analyze-image', async (req, res) => {
  const startTime = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress;

  try {
    // Rate limiting
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }

    const { image, language = 'en', detailed = false } = req.body || {};
    
    // Validate image
    const validation = validateImage(image);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.error
      });
    }

    const hfKey = process.env.HUGGINGFACE_API_KEY;
    const imageBuffer = toBuffer(validation.base64Data);

    // If HF key provided, call inference API
    if (hfKey) {
      const model = process.env.HF_VISION_MODEL || 'google/vit-base-patch16-224';
      
      const response = await doFetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${hfKey}`,
          'Content-Type': 'application/octet-stream'
        },
        body: imageBuffer
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`HuggingFace API error: ${response.status}`, errText);
        
        // Provide specific error messages for common HTTP statuses
        if (response.status === 401) {
          return res.status(502).json({
            success: false,
            message: 'AI service configuration error',
            detail: 'Invalid API key'
          });
        } else if (response.status === 503) {
          return res.status(502).json({
            success: false,
            message: 'AI service temporarily unavailable',
            detail: 'Model is loading, please try again in a few moments'
          });
        }
        
        return res.status(502).json({
          success: false,
          message: 'AI provider error',
          detail: errText.substring(0, 200) // Limit error text length
        });
      }

      const result = await response.json();
      
      if (!Array.isArray(result)) {
        throw new Error('Unexpected response format from AI service');
      }

      // Sort by confidence score descending
      const sortedLabels = result.sort((a, b) => (b.score || 0) - (a.score || 0));
      const detectedDiseases = detectDiseaseFromLabels(sortedLabels);
      
      const analysis = generateAnalysisReport(detectedDiseases, sortedLabels, language);

      const responseData = {
        success: true,
        provider: 'huggingface',
        analysis: {
          ...analysis,
          processingTime: Date.now() - startTime,
          imageType: validation.mimeType
        }
      };

      // Include raw labels if detailed response requested
      if (detailed) {
        responseData.analysis.rawLabels = sortedLabels.slice(0, 5);
      }

      return res.json(responseData);
    }

    // Fallback: simulated analysis when no API key configured
    const fallbackAnalysis = {
      en: {
        healthStatus: 'needs_attention',
        confidence: 78,
        summary: '⚠️ Early signs of fungal infection detected',
        detectedIssues: [{
          disease: 'Powdery Mildew',
          confidence: 78,
          symptoms: 'White powdery spots on leaves and stems',
          causes: 'High humidity, poor air circulation'
        }],
        recommendations: {
          immediate: ['Apply sulfur-based fungicide', 'Improve air circulation'],
          preventive: ['Proper spacing between plants', 'Morning watering routine']
        },
        identifiedLabels: 'plant leaf, fungus, disease'
      },
      hi: {
        healthStatus: 'needs_attention',
        confidence: 78,
        summary: '⚠️ फंगल संक्रमण के शुरुआती लक्षण पाए गए',
        detectedIssues: [{
          disease: 'पाउडरी मिल्ड्यू',
          confidence: 78,
          symptoms: 'पत्तियों और तनों पर सफेद पाउडर जैसे धब्बे',
          causes: 'उच्च आर्द्रता, खराब वायु संचरण'
        }],
        recommendations: {
          immediate: ['सल्फर आधारित फफूंदनाशक लगाएं', 'वायु संचरण सुधारें'],
          preventive: ['पौधों के बीच उचित दूरी', 'सुबह पानी देने की दिनचर्या']
        },
        identifiedLabels: 'पौधे की पत्ती, फंगस, रोग'
      },
      mr: {
        healthStatus: 'needs_attention',
        confidence: 78,
        summary: '⚠️ बुरशीजन्य संक्रमणाची प्रारंभिक चिन्हे आढळली',
        detectedIssues: [{
          disease: 'पावडेरी मिल्ड्यू',
          confidence: 78,
          symptoms: 'पानावर आणि खोडावर पांढरे पावडरसारखे डाग',
          causes: 'उच्च आर्द्रता, खराब हवा संचरण'
        }],
        recommendations: {
          immediate: ['सल्फर-आधारित फंगिसाईड लावा', 'हवा संचरण सुधारा'],
          preventive: ['रोपे दरम्यान योग्य अंतर', 'सकाळी पाणी देण्याची दिनचर्या']
        },
        identifiedLabels: 'रोपे पान, बुरशी, रोग'
      }
    };

    const analysis = fallbackAnalysis[language] || fallbackAnalysis.en;

    return res.json({
      success: true,
      provider: 'local',
      analysis: {
        ...analysis,
        processingTime: Date.now() - startTime,
        imageType: validation.mimeType,
        note: 'This is a simulated analysis. Configure HUGGINGFACE_API_KEY for real AI analysis.'
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error during image analysis',
      detail: process.env.NODE_ENV === 'development' ? error.message : undefined,
      processingTime: Date.now() - startTime
    });
  }
});

// GET /api/ai/diseases - Get list of known plant diseases
router.get('/diseases', (req, res) => {
  const { language = 'en' } = req.query;
  const lang = ['en', 'hi', 'mr'].includes(language) ? language : 'en';
  
  const diseasesList = Object.entries(PLANT_DISEASE_DATABASE).map(([key, disease]) => ({
    id: key,
    name: disease.names[lang],
    symptoms: disease.symptoms[lang],
    severity: disease.severity,
    affectedPlants: disease.affectedPlants
  }));

  res.json({
    success: true,
    count: diseasesList.length,
    language: lang,
    diseases: diseasesList
  });
});

// GET /api/ai/health - Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'operational',
    timestamp: new Date().toISOString(),
    features: {
      imageAnalysis: true,
      multiLanguage: true,
      diseaseDatabase: Object.keys(PLANT_DISEASE_DATABASE).length,
      rateLimiting: true
    }
  });
});

module.exports = router;