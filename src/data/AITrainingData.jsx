// AI Training Data for Farmer Dashboard - Enhanced
export const cropData = {
  tomatoes: {
    seasons: ['Year-round', 'Best: Oct-Mar'],
    soil: 'Well-drained loamy soil, pH 6.0-6.8',
    water: '4-5 cm/week, drip irrigation recommended',
    temperature: '20-30°C',
    harvest: '70-90 days',
    yield: '25-30 tons/acre',
    commonPests: ['Aphids', 'Whiteflies', 'Tomato Hornworm', 'Fruit Borer'],
    diseases: ['Early Blight', 'Late Blight', 'Bacterial Spot', 'Powdery Mildew'],
    fertilizers: ['NPK 10:26:26', 'Compost @ 2 tons/acre', 'Calcium nitrate for fruit quality'],
    companionPlants: ['Basil', 'Marigold', 'Carrots'],
    rotation: 'Avoid planting after potatoes or brinjal',
    marketDemand: 'High year-round, peaks in winter',
    exportPotential: 'Good for Middle East, Europe'
  },
  potatoes: {
    seasons: ['Oct-Dec', 'Jan-Mar'],
    soil: 'Sandy loam, pH 5.0-6.5, well-drained',
    water: '2-3 cm/week, avoid waterlogging',
    temperature: '15-20°C',
    harvest: '90-120 days',
    yield: '15-20 tons/acre',
    commonPests: ['Potato Beetle', 'Aphids', 'Cutworms'],
    diseases: ['Late Blight', 'Early Blight', 'Black Scurf'],
    fertilizers: ['NPK 12:32:16', 'Well-decomposed FYM @ 10 tons/acre'],
    companionPlants: ['Horseradish', 'Beans', 'Cabbage'],
    rotation: '3-4 year rotation with legumes',
    marketDemand: 'Stable, high during festivals',
    exportPotential: 'Limited due to competition'
  },
  rice: {
    seasons: ['Kharif (Jun-Nov)', 'Rabi (Nov-Apr)'],
    soil: 'Clay loam, pH 6.0-7.0, water-retaining',
    water: 'Continuous flooding 5-7 cm',
    temperature: '20-35°C',
    harvest: '120-150 days',
    yield: '4-6 tons/acre (basmati), 6-8 tons/acre (regular)',
    commonPests: ['Leaf Folder', 'Stem Borer', 'Brown Plant Hopper'],
    diseases: ['Blast', 'Sheath Blight', 'Bacterial Leaf Blight'],
    fertilizers: ['NPK 20:10:10', 'Zinc sulfate @ 25kg/acre'],
    varieties: ['Basmati 370', 'Pusa 44', 'Sona Masoori'],
    marketDemand: 'High domestic consumption',
    exportPotential: 'Excellent for basmati varieties'
  },
  wheat: {
    seasons: ['Rabi (Nov-Apr)'],
    soil: 'Well-drained loam, pH 6.5-7.5',
    water: '4-6 irrigations, 5-7 cm each',
    temperature: '10-25°C',
    harvest: '110-130 days',
    yield: '4-5 tons/acre',
    commonPests: ['Aphids', 'Termites', 'Army Worm'],
    diseases: ['Rust', 'Karnal Bunt', 'Powdery Mildew'],
    fertilizers: ['NPK 18:18:18', 'Urea @ 100kg/acre'],
    varieties: ['HD 2967', 'PBW 550', 'DBW 17'],
    marketDemand: 'Stable government procurement',
    exportPotential: 'Growing international demand'
  },
  cotton: {
    seasons: ['Kharif (May-Dec)'],
    soil: 'Black cotton soil, pH 6.5-8.0',
    water: 'Drip irrigation, 6-8 irrigations',
    temperature: '25-35°C',
    harvest: '150-180 days',
    yield: '8-12 quintals/acre',
    commonPests: ['Bollworm', 'Aphids', 'Whitefly'],
    diseases: ['Fusarium Wilt', 'Bacterial Blight'],
    fertilizers: ['NPK 20:10:10', 'Potash @ 40kg/acre'],
    varieties: ['BT Cotton', 'Organic varieties'],
    marketDemand: 'High for textile industry',
    exportPotential: 'Major export crop'
  },
  sugarcane: {
    seasons: ['Year-round', 'Best: Feb-Apr'],
    soil: 'Deep loamy soil, pH 6.5-7.5',
    water: 'Heavy water requirement, flood irrigation',
    temperature: '20-35°C',
    harvest: '12-18 months',
    yield: '70-100 tons/acre',
    commonPests: ['Top Borer', 'Stem Borer', 'White Grub'],
    diseases: ['Red Rot', 'Smut', 'Yellow Leaf'],
    fertilizers: ['NPK 25:10:10', 'Organic manure @ 10 tons/acre'],
    marketDemand: 'Stable for sugar industry',
    exportPotential: 'Raw sugar exports growing'
  },
  onions: {
    seasons: ['Kharif (Jun-Oct)', 'Rabi (Nov-Apr)'],
    soil: 'Sandy loam, pH 6.0-7.0',
    water: 'Light irrigation, avoid overwatering',
    temperature: '15-25°C',
    harvest: '90-120 days',
    yield: '20-25 tons/acre',
    commonPests: ['Thrips', 'Onion Fly', 'Maggots'],
    diseases: ['Purple Blotch', 'Stemphylium Blight'],
    fertilizers: ['NPK 12:32:16', 'Sulfur @ 20kg/acre'],
    marketDemand: 'High price volatility',
    exportPotential: 'Good for Middle East markets'
  },
  mangoes: {
    seasons: ['Mar-Jul'],
    soil: 'Deep well-drained soil, pH 5.5-7.5',
    water: 'Moderate, critical during fruit development',
    temperature: '24-30°C',
    harvest: '4-5 years for fruiting',
    yield: '8-10 tons/acre (mature trees)',
    commonPests: ['Fruit Fly', 'Mango Hopper', 'Mealybug'],
    diseases: ['Anthracnose', 'Powdery Mildew'],
    fertilizers: ['NPK 6:6:12', 'Farmyard manure @ 20kg/tree'],
    varieties: ['Alphonso', 'Kesar', 'Dashehari'],
    marketDemand: 'High domestic and export',
    exportPotential: 'Excellent for premium varieties'
  }
};

export const priceTrends = {
  tomatoes: {
    seasonal: { high: 'Dec-Feb', low: 'Jun-Aug' },
    factors: ['Monsoon intensity', 'Transport costs', 'Market demand', 'Cold storage availability'],
    prediction: '15-20% increase in winter',
    currentWholesale: '₹25-35/kg',
    retailRange: '₹40-60/kg',
    exportPrice: '₹45-55/kg'
  },
  potatoes: {
    seasonal: { high: 'Mar-May', low: 'Sep-Nov' },
    factors: ['Storage capacity', 'Import policies', 'Festival demand', 'Seed quality'],
    prediction: 'Stable with 5-8% fluctuations',
    currentWholesale: '₹15-20/kg',
    retailRange: '₹25-35/kg',
    exportPrice: '₹18-22/kg'
  },
  rice: {
    seasonal: { high: 'Sep-Dec', low: 'Mar-Jun' },
    factors: ['Monsoon performance', 'Government MSP', 'Export demand', 'Stock levels'],
    prediction: '5-10% annual increase',
    currentWholesale: '₹25-40/kg (basmati)',
    retailRange: '₹50-80/kg (basmati)',
    exportPrice: '₹45-65/kg'
  },
  wheat: {
    seasonal: { high: 'Jan-Mar', low: 'Jul-Sep' },
    factors: ['Government procurement', 'International prices', 'Stock levels', 'Quality'],
    prediction: 'Stable with MSP support',
    currentWholesale: '₹20-25/kg',
    retailRange: '₹28-35/kg',
    exportPrice: '₹22-27/kg'
  },
  cotton: {
    seasonal: { high: 'Oct-Dec', low: 'Mar-May' },
    factors: ['International prices', 'Textile demand', 'Monsoon', 'Quality'],
    prediction: '10-15% volatility expected',
    currentWholesale: '₹6,000-7,500/quintal',
    retailRange: 'N/A',
    exportPrice: '₹6,500-8,000/quintal'
  },
  onions: {
    seasonal: { high: 'Aug-Oct', low: 'Dec-Feb' },
    factors: ['Monsoon damage', 'Storage losses', 'Export bans', 'Transport costs'],
    prediction: 'High volatility (30-50% swings)',
    currentWholesale: '₹15-25/kg',
    retailRange: '₹30-50/kg',
    exportPrice: '₹20-30/kg'
  }
};

export const pestSolutions = {
  aphids: {
    organic: 'Neem oil spray (2ml/liter), Ladybird beetles, Garlic-chili spray',
    chemical: 'Imidacloprid 17.8% SL @ 0.3ml/liter, Acetamiprid 20% SP @ 0.2g/liter',
    biological: 'Release Chrysoperla larvae @ 10,000/acre',
    prevention: 'Yellow sticky traps, proper spacing, remove weed hosts',
    impact: 'Sucks sap, transmits viruses, reduces yield by 20-40%'
  },
  'leaf folder': {
    organic: 'NSKE 5%, Pheromone traps @ 15/acre, Bird perches',
    chemical: 'Chlorantraniliprole 18.5% SC @ 0.3ml/liter, Flubendiamide 20% WG @ 0.2g/liter',
    biological: 'Trichogramma wasps @ 50,000/acre',
    prevention: 'Avoid excess nitrogen, timely sowing, field sanitation',
    impact: 'Reduces photosynthesis, yield loss 15-30%'
  },
  'fruit borer': {
    organic: 'NSKE 5%, Pheromone traps, Neem seed extract',
    chemical: 'Emamectin benzoate 5% SG @ 0.25g/liter, Spinosad 45% SC @ 0.3ml/liter',
    biological: 'Nuclear Polyhedrosis Virus (NPV) @ 250 LE/acre',
    prevention: 'Deep summer plowing, crop rotation, destroy infected fruits',
    impact: 'Direct fruit damage, 30-60% yield loss'
  },
  'brown plant hopper': {
    organic: 'Neem oil, Garlic extract, Maintain water level',
    chemical: 'Buprofezin 25% SC @ 1.6ml/liter, Pymetrozine 50% WG @ 0.3g/liter',
    biological: 'Mirid bugs, Spiders',
    prevention: 'Avoid close planting, balanced fertilization, drainage',
    impact: 'Sucks sap, causes hopper burn, total crop loss possible'
  },
  'termites': {
    organic: 'Neem cake @ 200kg/acre, Deep summer plowing',
    chemical: 'Chlorpyriphos 20% EC @ 4ml/liter soil drenching',
    biological: 'Entomopathogenic fungi',
    prevention: 'Timely irrigation, remove crop residues, soil solarization',
    impact: 'Damages roots and stems, plant wilting'
  }
};

export const weatherPatterns = {
  maharashtra: {
    kharif: 'Jun-Sep: Heavy rainfall (600-800mm), humid, 25-35°C',
    rabi: 'Oct-Mar: Cool, dry, minimal rainfall, 15-30°C',
    summer: 'Apr-Jun: Hot, dry, 30-42°C, occasional thunderstorms',
    recommendations: {
      kharif: 'Sow rice, cotton, soybeans, pulses. Ensure drainage.',
      rabi: 'Sow wheat, onions, tomatoes, vegetables. Irrigation critical.',
      summer: 'Mango orchards, water conservation, mulching.'
    },
    risks: ['Erratic monsoon', 'Water scarcity', 'Heat waves'],
    opportunities: ['Multiple cropping', 'Horticulture development']
  },
  punjab: {
    kharif: 'Jun-Sep: Moderate rainfall (400-600mm), 25-35°C',
    rabi: 'Oct-Mar: Cold, dry, 5-25°C, occasional winter rains',
    summer: 'Apr-Jun: Hot, dry, 30-45°C',
    recommendations: {
      kharif: 'Rice, cotton, maize. Timely sowing crucial.',
      rabi: 'Wheat, mustard, vegetables. Protect from frost.',
      summer: 'Moong, maize, fodder crops.'
    },
    risks: ['Declining water table', 'Soil degradation', 'Climate change'],
    opportunities: ['Diversification to fruits/vegetables', 'Precision farming']
  },
  karnataka: {
    kharif: 'Jun-Sep: South-west monsoon, 600-1200mm, 22-32°C',
    rabi: 'Oct-Mar: North-east monsoon, moderate rains, 20-30°C',
    summer: 'Apr-Jun: Hot, humid, 25-38°C',
    recommendations: {
      kharif: 'Ragi, jowar, cotton, pulses. Soil conservation.',
      rabi: 'Sunflower, Bengal gram, vegetables.',
      summer: 'Millets, pulses, horticulture crops.'
    },
    risks: ['Soil erosion', 'Pest outbreaks', 'Water management'],
    opportunities: ['Organic farming', 'Coffee plantations', 'Floriculture']
  },
  westBengal: {
    kharif: 'Jun-Sep: Heavy rainfall (1200-1500mm), humid, 25-35°C',
    rabi: 'Oct-Mar: Cool, dry, 15-28°C',
    summer: 'Apr-Jun: Hot, humid, 28-38°C, pre-monsoon showers',
    recommendations: {
      kharif: 'Aman rice, jute, vegetables. Flood management.',
      rabi: 'Boro rice, potatoes, mustard, vegetables.',
      summer: 'Aus rice, summer vegetables.'
    },
    risks: ['Floods', 'Cyclones', 'Waterlogging'],
    opportunities: ['Aquaculture', 'Multiple rice crops', 'Horticulture']
  }
};

export const soilHealthData = {
  'blackCottonSoil': {
    composition: 'High clay content, rich in iron, lime, magnesia',
    pH: '7.5-8.5',
    nutrients: 'Rich in calcium, potassium, magnesium',
    deficiencies: 'Nitrogen, phosphorus, zinc, iron',
    suitableCrops: ['Cotton', 'Soybean', 'Wheat', 'Jowar'],
    improvement: 'Add organic matter, gypsum for sodic soils, green manuring'
  },
  'redSoil': {
    composition: 'Sandy to clay-loam, rich in iron oxide',
    pH: '6.0-7.5',
    nutrients: 'Rich in iron, aluminum',
    deficiencies: 'Nitrogen, phosphorus, organic matter',
    suitableCrops: ['Groundnut', 'Ragi', 'Millets', 'Pulses'],
    improvement: 'Add organic manure, lime for acidic soils, contour bunding'
  },
  'alluvialSoil': {
    composition: 'Sand, silt, clay mixture, river-deposited',
    pH: '6.5-8.4',
    nutrients: 'Rich in potash, lime',
    deficiencies: 'Nitrogen, phosphorus, humus',
    suitableCrops: ['Rice', 'Wheat', 'Sugarcane', 'Jute'],
    improvement: 'Green manuring, balanced fertilization, proper drainage'
  }
};

export const governmentSchemes = {
  'PMKSY': {
    name: 'Pradhan Mantri Krishi Sinchayee Yojana',
    benefits: ['Drip irrigation subsidy', 'Sprinkler systems', 'Water harvesting'],
    eligibility: 'All farmers, priority to small/marginal',
    subsidy: '55-100% depending on category',
    contact: 'State agriculture department'
  },
  'PMFBY': {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    benefits: ['Crop insurance', 'Weather damage cover', 'Prevented sowing'],
    eligibility: 'All farmers growing notified crops',
    premium: '1.5-5% of sum insured',
    contact: 'Empanelled insurance companies'
  },
  'SoilHealthCard': {
    name: 'Soil Health Card Scheme',
    benefits: ['Free soil testing', 'Nutrient recommendations', 'Fertilizer advice'],
    eligibility: 'All farmers',
    frequency: 'Every 3 years',
    contact: 'State soil testing laboratories'
  },
  'NeemCoatedUrea': {
    name: 'Neem Coated Urea Subsidy',
    benefits: ['Reduced urea consumption', 'Better nitrogen efficiency', 'Cost saving'],
    eligibility: 'All farmers',
    subsidy: '50% on MRP',
    contact: 'Fertilizer retailers'
  }
};

export const marketIntelligence = {
  exportOpportunities: {
    'Basmati Rice': ['Iran', 'Saudi Arabia', 'UAE', 'USA'],
    'Mangoes': ['USA', 'UK', 'Japan', 'Australia'],
    'Grapes': ['Netherlands', 'UK', 'Germany', 'Russia'],
    'Marine Products': ['USA', 'China', 'Japan', 'EU'],
    'Spices': ['USA', 'Vietnam', 'UAE', 'Malaysia']
  },
  emergingTrends: {
    'Organic Farming': '20% annual growth, premium prices',
    'Precision Agriculture': 'Technology adoption increasing',
    'Contract Farming': 'Corporate partnerships growing',
    'Direct Marketing': 'Farmers markets, online platforms',
    'Value Addition': 'Processing, packaging opportunities'
  },
  priceForecast: {
    'shortTerm': 'Vegetable prices to remain volatile',
    'mediumTerm': 'Cereal prices stable with government support',
    'longTerm': 'Horticulture products demand growing faster'
  }
};

export const bestPractices = {
  waterConservation: [
    'Drip irrigation for water-intensive crops',
    'Mulching to reduce evaporation',
    'Rainwater harvesting structures',
    'Scheduled irrigation based on soil moisture',
    'Use of drought-resistant varieties'
  ],
  soilManagement: [
    'Crop rotation to maintain soil health',
    'Green manuring with legumes',
    'Integrated nutrient management',
    'Conservation tillage practices',
    'Regular soil testing and amendment'
  ],
  pestManagement: [
    'Integrated Pest Management (IPM)',
    'Biological control methods',
    'Pest-resistant varieties',
    'Sanitation and field hygiene',
    'Regular monitoring and early detection'
  ],
  postHarvest: [
    'Proper cleaning and grading',
    'Appropriate storage conditions',
    'Value addition through processing',
    'Quality standards maintenance',
    'Timely marketing strategies'
  ]
};

// Multilingual responses for AI assistant
export const multilingualResponses = {
  en: {
    greeting: "👋 Hello! I'm your AI Farming Assistant. How can I help you today?",
    priceQuery: "Here are the current market prices for {crop}:",
    weatherAdvice: "Based on current weather patterns, I recommend:",
    pestSolution: "For {pest} management, consider these solutions:",
    fertilizerAdvice: "For {crop}, recommended fertilizers are:",
    marketTrend: "Current market trends show:",
    governmentScheme: "You may be eligible for these government schemes:"
  },
  hi: {
    greeting: "👋 नमस्ते! मैं आपका AI फार्मिंग असिस्टेंट हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    priceQuery: "{crop} की वर्तमान बाजार कीमतें यहां हैं:",
    weatherAdvice: "वर्तमान मौसम पैटर्न के आधार पर, मेरी सिफारिश है:",
    pestSolution: "{pest} प्रबंधन के लिए, इन समाधानों पर विचार करें:",
    fertilizerAdvice: "{crop} के लिए, अनुशंसित उर्वरक हैं:",
    marketTrend: "वर्तमान बाजार के रुझान दिखाते हैं:",
    governmentScheme: "आप इन सरकारी योजनाओं के लिए पात्र हो सकते हैं:"
  },
  mr: {
    greeting: "👋 नमस्कार! मी तुमचा AI शेती सहाय्यक आहे. आज मी तुमची कशी मदत करू शकतो?",
    priceQuery: "{crop} च्या सध्याच्या बाजारभाव येथे आहेत:",
    weatherAdvice: "सध्याच्या हवामानाच्या आधारे, मी शिफारस करतो:",
    pestSolution: "{pest} व्यवस्थापनासाठी, या उपायांचा विचार करा:",
    fertilizerAdvice: "{crop} साठी, शिफारस केलेली खते आहेत:",
    marketTrend: "सध्याचे बाजारातील कल दर्शवितात:",
    governmentScheme: "तुम्ही या सरकारी योजनांसाठी पात्र असू शकता:"
  }
};

export const cropCalendars = {
  maharashtra: {
    january: ['Wheat harvesting', 'Onion planting', 'Vegetable cultivation'],
    february: ['Summer crop preparation', 'Mango flowering', 'Irrigation management'],
    march: ['Summer crop sowing', 'Mango fruit development', 'Water conservation'],
    april: ['Kharif preparation', 'Mango harvesting', 'Soil testing'],
    may: ['Kharif sowing begins', 'Cotton planting', 'Monsoon preparation'],
    june: ['Kharif sowing peak', 'Rice transplantation', 'Pest monitoring'],
    july: ['Kharif crop care', 'Weed management', 'Nutrient application'],
    august: ['Kharif crop growth', 'Disease control', 'Intercultural operations'],
    september: ['Kharif harvesting begins', 'Rabi preparation', 'Market planning'],
    october: ['Rabi sowing', 'Wheat planting', 'Post-monsoon care'],
    november: ['Rabi crop establishment', 'Irrigation scheduling', 'Frost protection'],
    december: ['Rabi crop growth', 'Winter management', 'Year-end planning']
  }
};

export default {
  cropData,
  priceTrends,
  pestSolutions,
  weatherPatterns,
  soilHealthData,
  governmentSchemes,
  marketIntelligence,
  bestPractices,
  multilingualResponses,
  cropCalendars
};