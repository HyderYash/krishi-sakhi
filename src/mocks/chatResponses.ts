// Simple rule-based chat responses for demo
export const getChatResponse = async (userInput: string, farmer: any): Promise<string> => {
  const input = userInput.toLowerCase();

  // Weather queries
  if (input.includes('മഴ') || input.includes('കാലാവസ്ഥ') || input.includes('നാളെ')) {
    return `ശരി ${farmer.name_ml} സാർ! നാളെ ${farmer.district} ൽ 80% മഴ സാധ്യതയുണ്ട്. ജലസേചനം ഒഴിവാക്കാൻ ശുപാർശ ചെയ്യുന്നു. വിളവെടുപ്പ് മാറ്റിവെക്കുക.`;
  }

  // Irrigation queries
  if (input.includes('ജലസേചനം') || input.includes('വെള്ളം')) {
    return `${farmer.name_ml} സാർ, നിങ്ങളുടെ ${farmer.soilType} മണ്ണിൽ ${farmer.farmSizeAcres} ഏക്കറിന് ഇന്ന് വൈകീട്ട് ജലസേചനം നടത്താം. നാളെ മഴ വരാൻ സാധ്യതയുള്ളതിനാൽ അധികം വെള്ളം വേണ്ട.`;
  }

  // Market price queries
  if (input.includes('വില') || input.includes('മാർക്കറ്റ്')) {
    const crops = farmer.mainCrops.join(', ');
    return `ഇന്നത്തെ ${farmer.district} മാർക്കറ്റ് വിലകൾ: നെൽ - ₹2,300/ക്വിന്റൽ (↑7%), ബനാന - ₹48/ഡസൻ (↑6.7%). നിങ്ങളുടെ വിളകൾ (${crops}) നല്ല വിലയിലാണ് പോകുന്നത്!`;
  }

  // Disease/pest queries
  if (input.includes('രോഗം') || input.includes('പുഴു') || input.includes('കീട')) {
    return `${farmer.name_ml} സാർ, ഏത് ഇലയിൽ പ്രശ്നം കണ്ടു? ലീഫ് സ്കാൻ ഫീച്ചർ ഉപയോഗിച്ച് ഫോട്ടോ അപ്‌ലോഡ് ചെയ്താൽ AI വിശകലനം നൽകാം. അല്ലെങ്കിൽ രോഗത്തിന്റെ വിവരണം പറയൂ.`;
  }

  // Fertilizer queries
  if (input.includes('വള') || input.includes('വളം')) {
    return `നിങ്ങളുടെ ${farmer.mainCrops[0]} വിളയ്ക്ക് ഇപ്പോൾ NPK 19:19:19 @ 25 കി.ഗ്രാം/ഏക്കർ പ്രയോഗിക്കാം. മഴയ്ക്ക് മുമ്പ് പ്രയോഗിക്കുന്നത് നല്ലതാണ്.`;
  }

  // Scheme queries
  if (input.includes('സ്കീം') || input.includes('സബ്സിഡി') || input.includes('സഹായം')) {
    return `${farmer.name_ml} സാർ, നിങ്ങൾക്ക് ഉപയോഗപ്പെടാവുന്ന സ്കീമുകൾ: 1) കിസാൻ സമ്മാൻ നിധി - ₹6000/വർഷം 2) ക്രോപ്പ് ഇൻഷുറൻസ് 3) കേരള കാർഷിക ബോണസ്. 'സ്കീമുകൾ' ടാബിൽ കൂടുതൽ വിവരങ്ങൾ കാണൂ.`;
  }

  // General farming advice
  if (input.includes('എന്ത് ചെയ്യണം') || input.includes('ജോലി')) {
    return `ഇന്നത്തെ ശുപാർശകൾ: 1) പുലർച്ചെ വയൽ പരിശോധിക്കുക 2) വൈകീട്ട് ജലസേചനം 3) കീടങ്ങൾക്കായി നിരീക്ഷണം 4) നാളെ മഴ വരുമെന്നതിനാൽ വിളവെടുപ്പ് മാറ്റിവെക്കുക.`;
  }

  // Greetings
  if (input.includes('നമസ്കാരം') || input.includes('ഹലോ') || input.includes('കുശലം')) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'സുപ്രഭാതം' : hour < 17 ? 'നമസ്കാരം' : 'സുസന്ധ്യ';
    return `${greeting} ${farmer.name_ml} സാർ! എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും? കാലാവസ്ഥ, വിള വില, കൃഷി ടിപ്സ് - എന്തു വേണമെങ്കിലും ചോദിക്കൂ.`;
  }

  // Default response
  return `${farmer.name_ml} സാർ, നിങ്ങളുടെ ചോദ്യം മനസ്സിലായില്ല. ദയവായി ഇങ്ങനെ ചോദിക്കൂ: "നാളെ മഴ ഉണ്ടോ?", "നെൽ വില എന്താണ്?", "ജലസേചനം എപ്പോൾ വേണം?" എന്നിങ്ങനെ. ഞാൻ കൂടുതൽ പഠിച്ചു മെച്ചപ്പെടുത്താം! 🌾`;
};

// Voice input processing helper
export const processVoiceInput = (text: string): string => {
  // Simple text cleaning for Malayalam voice input
  return text
    .trim()
    .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
    .toLowerCase();
};

export default {
  getChatResponse,
  processVoiceInput
};