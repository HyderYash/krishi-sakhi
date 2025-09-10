// Demo farmer profile
export const farmerProfile = {
  id: "demo-1",
  name_ml: "രാജേഷ്",
  name_en: "Rajesh",
  phone: "+91-98765XXXXX",
  district: "Thrissur",
  farmSizeAcres: 1.5,
  soilType: "Clay",
  mainCrops: ["Rice", "Banana", "Coconut"],
};

// Mock weather data
export const weatherMock = {
  location: "Thrissur",
  today: { tempC: 29, condition: "Cloudy", rainTomorrow: false },
  tomorrow: { tempC: 26, condition: "Rain", rainProbability: 0.8, rainTomorrow: true },
  forecast: [
    { date: "Today", temp: 29, condition: "Cloudy", rain: 0.1 },
    { date: "Tomorrow", temp: 26, condition: "Rain", rain: 0.8 },
    { date: "Day 3", temp: 28, condition: "Partly cloudy", rain: 0.3 }
  ]
};

// Weather-based recommendations
export const getWeatherRecommendation = (weather: any, farmer: any) => {
  if (weather.tomorrow.rainTomorrow) {
    return `നാളെ ${Math.round(weather.tomorrow.rainProbability * 100)}% മഴ സാധ്യത. ജലസേചനം ഒഴിവാക്കാം. വിളവെടുപ്പ് മാറ്റിവെക്കുക.`;
  }

  if (weather.today.tempC > 30) {
    return "ഇന്ന് ചൂട് കൂടുതലാണ്. വൈകിട്ട് ജലസേചനം നടത്തൂ. ചെടികൾക്ക് നിഴൽ നൽകൂ.";
  }

  return "കാലാവസ്ഥ അനുകൂലമാണ്. പതിവ് കൃഷിപ്പണികൾ തുടരാം. ജലസേചനം സമയത്ത് നടത്തൂ.";
};

// Mock mandi prices
export const mandiPrices = [
  {
    mandi: "Thrissur Mandi",
    crop: "Rice",
    pricePerQuintal: 2300,
    lastWeek: 2150,
    unit: "ക്വിന്റൽ",
    trend: "up"
  },
  {
    mandi: "Kozhikode Mandi",
    crop: "Banana",
    pricePerDozen: 48,
    lastWeek: 45,
    unit: "ഡസൻ",
    trend: "up"
  },
  {
    mandi: "Kochi Mandi",
    crop: "Coconut",
    pricePerDozen: 25,
    lastWeek: 28,
    unit: "ഡസൻ",
    trend: "down"
  },
  {
    mandi: "Palakkad Mandi",
    crop: "Pepper",
    pricePerQuintal: 45000,
    lastWeek: 43500,
    unit: "ക്വിന്റൽ",
    trend: "up"
  }
];

// Mock disease data
export const diseaseMocks = [
  {
    id: "d1",
    name_ml: "ശീതളക്കുരു",
    name_en: "Rice Blast",
    confidence: 0.89,
    fix_ml: "കാർബെൻഡാസിം 50 WP @ 1 ഗ്രാം/ലിറ്റർ സ്പ്രേ ചെയ്യുക",
    severity: "medium",
    prevention: "വയലിൽ വെള്ളം കെട്ടി നിൽക്കാതിരിക്കുക"
  },
  {
    id: "d2",
    name_ml: "ഇല പൂപ്പൽ",
    name_en: "Leaf Blight",
    confidence: 0.76,
    fix_ml: "മാൻകോസെബ് 75 WP @ 2 ഗ്രാം/ലിറ്റർ സ്പ്രേ ചെയ്യുക",
    severity: "low",
    prevention: "ചെടികൾക്കിടയിൽ അകലം പാലിക്കുക"
  },
  {
    id: "d3",
    name_ml: "ആരോഗ്യമുള്ള ഇല",
    name_en: "Healthy Leaf",
    confidence: 0.95,
    fix_ml: "ഈ ഇല ആരോഗ്യകരമാണ്. നിലവിലുള്ള പരിചരണം തുടരുക",
    severity: "none",
    prevention: "നല്ല കൃഷിരീതികൾ പിന്തുടരുക"
  }
];

// Mock government schemes
export const schemes = [
  {
    id: "s1",
    title_ml: "കിസാൻ സമ്മാൻ നിധി",
    category_ml: "കേന്ദ്ര",
    description_ml: "എല്ലാ ഭൂമി ഉടമകളായ കർഷകർക്കും വർഷത്തിൽ ₹6000 സാമ്പത്തിക സഹായം",
    eligibility_criteria: [
      "ഭൂമി ഉടമസ്ഥതയുള്ള കർഷകർ",
      "2 ഹെക്ടർ വരെ ഭൂമിയുള്ളവർ",
      "ആധാർ കാർഡും ബാങ്ക് അക്കൗണ്ടും ആവശ്യം"
    ],
    application_steps: [
      "PM-KISAN പോർട്ടലിൽ രജിസ്റ്റർ ചെയ്യുക",
      "ആധാർ, ബാങ്ക് വിശദാംശങ്ങൾ നൽകുക",
      "ഭൂമി രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക",
      "വില്ലേജ് ഓഫീസറിൽ നിന്ന് സാക്ഷ്യപ്പെടുത്തുക"
    ],
    benefit_ml: "വർഷത്തിൽ ₹6000 (3 ഗഡുക്കളായി ₹2000 വീതം)",
    website: "pmkisan.gov.in",
    helpline: "155261",
    deadline_ml: "തുടർച്ചയായി ലഭിക്കും"
  },
  {
    id: "s2",
    title_ml: "കേരള കാർഷിക ബോണസ്",
    category_ml: "സംസ്ഥാന",
    description_ml: "നെൽകൃഷിക്കാർക്കുള്ള പ്രോത്സാഹന ബോണസ് പദ്ധതി",
    eligibility_criteria: [
      "കേരളത്തിലെ നെൽകൃഷിക്കാർ",
      "മിനിമം 10 സെൻറ് നെൽകൃഷി",
      "കർഷക സംഘത്തിൽ അംഗത്വം"
    ],
    application_steps: [
      "കൃഷി വകുപ്പ് ഓഫീസിൽ അപേക്ഷ",
      "ഭൂമി രേഖകൾ സമർപ്പിക്കുക",
      "കൃഷി ഓഫീസർ പരിശോധന",
      "ബാങ്ക് അക്കൗണ്ടിൽ തുക ലഭിക്കും"
    ],
    benefit_ml: "ഏക്കറിന് ₹3000 വരെ ബോണസ്",
    website: "keralaagriculture.gov.in",
    helpline: "0471-2305293",
    deadline_ml: "വിള കാലം അനുസരിച്ച്"
  },
  {
    id: "s3",
    title_ml: "ക്രോപ്പ് ഇൻഷുറൻസ് സ്കീം",
    category_ml: "ഇൻഷുറൻസ്",
    description_ml: "വിള നാശത്തിൽ നിന്നുള്ള സംരക്ഷണത്തിനുള്ള ഇൻഷുറൻസ് പദ്ധതി",
    eligibility_criteria: [
      "എല്ലാ കർഷകരും",
      "വായ്പയെടുത്ത കർഷകർക്ക് നിർബന്ധം",
      "അനുവദനീയമായ വിളകൾ മാത്രം"
    ],
    application_steps: [
      "ബാങ്കിൽ അല്ലെങ്കിൽ ഓൺലൈൻ അപേക്ഷ",
      "വിള വിവരങ്ങൾ നൽകുക",
      "പ്രീമിയം അടയ്ക്കുക",
      "പോളിസി സ്വീകരിക്കുക"
    ],
    benefit_ml: "വിള നാശത്തിൽ വരെ 200% വരെ നഷ്ടപരിഹാരം",
    website: "pmfby.gov.in",
    helpline: "14447",
    deadline_ml: "വിതയ്ക്കുന്ന സമയം"
  },
  {
    id: "s4",
    title_ml: "സോളാർ പാനൽ സബ്സിഡി",
    category_ml: "കേന്ദ്ര",
    description_ml: "കർഷകർക്കുള്ള സോളാർ പമ്പ് സെറ്റ് സബ്സിഡി",
    eligibility_criteria: [
      "2 ഹെക്ടർ വരെ ഭൂമിയുള്ള കർഷകർ",
      "വൈദ്യുതി കണക്ഷനില്ലാത്ത പ്രദേശങ്ങൾ",
      "കർഷക കമ്മിറ്റി അംഗീകാരം"
    ],
    application_steps: [
      "സോളാർ പോർട്ടലിൽ രജിസ്റ്റർ ചെയ്യുക",
      "ടെക്നിക്കൽ സർവ്വേ നടത്തുക",
      "സബ്സിഡി അപേക്ഷ സമർപ്പിക്കുക",
      "ഇൻസ്റ്റലേഷൻ പൂർത്തിയാക്കുക"
    ],
    benefit_ml: "മൊത്തം ചെലവിന്റെ 60% വരെ സബ്സിഡി",
    website: "solarrooftop.gov.in",
    helpline: "1800-180-3333",
    deadline_ml: "വർഷം മുഴുവനും"
  },
  {
    id: "s5",
    title_ml: "കിസാൻ ക്രെഡിറ്റ് കാർഡ്",
    category_ml: "ബാങ്ക്",
    description_ml: "കർഷകർക്കുള്ള എളുപ്പത്തിലുള്ള കടം സൗകര്യം",
    eligibility_criteria: [
      "കൃഷിയിൽ ഏർപ്പെട്ടിരിക്കുന്ന കർഷകർ",
      "ഭൂമി ഉടമസ്ഥതയുള്ളവർ അല്ലെങ്കിൽ കുടിയാന്മാർ",
      "18-75 വയസ് പ്രായ പരിധി"
    ],
    application_steps: [
      "അടുത്തുള്ള ബാങ്ക് ശാഖയിൽ പോകുക",
      "KCC അപേക്ഷാ ഫോം പൂരിപ്പിക്കുക",
      "ഭൂമി രേഖകളും ഐഡന്റിറ്റി പ്രൂഫും നൽകുക",
      "കാർഡ് അനുമതി ലഭിക്കുക"
    ],
    benefit_ml: "4% പലിശ നിരക്കിൽ ₹3 ലക്ഷം വരെ ലോൺ",
    website: "kcc.gov.in",
    helpline: "1800-180-1111",
    deadline_ml: "എപ്പോൾ വേണമെങ്കിലും അപേക്ഷിക്കാം"
  }
];

export default {
  farmerProfile,
  weatherMock,
  getWeatherRecommendation,
  mandiPrices,
  diseaseMocks,
  schemes
};