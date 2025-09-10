# കൃഷി സഖി (Krishi Sakhi) 🌾

**Malayalam-first AI-powered farming assistant for Kerala farmers**

A comprehensive React MVP demonstrating an intelligent farming companion that helps Kerala farmers with personalized recommendations, voice interactions, disease detection, market prices, and government schemes - all in Malayalam.

## ✨ Features

### 🏠 **Core MVP Features**
- **Malayalam-first UI** with lovable, simple design
- **Voice-enabled interface** using Web Speech API with Malayalam support
- **Conversational AI chat** with rule-based responses in Malayalam
- **Farmer profile management** with onboarding and personalization
- **Weather-based recommendations** for irrigation and farming activities

### 🔧 **Smart Farming Tools**
- **AI Leaf Disease Detection** - Upload leaf images for disease diagnosis
- **Market Price Monitoring** - Real-time mandi prices with trend analysis
- **Activity Logging** - Track irrigation, fertilizer, pesticide, and harvest activities
- **Smart Reminders** - SMS/WhatsApp notifications for farming tasks
- **Government Schemes Database** - Kerala and Central scheme information with eligibility

### 📱 **User Experience**
- **Mobile-first responsive design** optimized for field use
- **Large, touch-friendly buttons** suitable for outdoor conditions
- **Accessible typography** with clear Malayalam fonts
- **Offline-capable demo data** - works without internet for demonstrations
- **Progressive Web App ready** - can be installed on mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd krishi-sakhi

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser to `http://localhost:5173` to see the app.

### Demo Account
The app loads with a pre-configured demo farmer profile:
- **Name**: രാജേഷ് (Rajesh)
- **Location**: Thrissur, Kerala
- **Farm Size**: 1.5 acres
- **Crops**: Rice, Banana, Coconut

## 📱 How to Use

### 1. **Voice Interaction**
- Press the green microphone button on the home page
- Speak in Malayalam: "എനിക്ക് നാളെ മഴ ഉണ്ടോ?" (Will it rain tomorrow?)
- The AI will respond with weather-based farming advice

### 2. **Leaf Disease Scanning**
- Go to "ലീഫ് സ്കാൻ" tab
- Upload a leaf image or use demo images
- Get disease diagnosis with confidence score and Malayalam treatment advice

### 3. **Market Price Monitoring**
- Check "മാർക്കറ്റ് വില" for current mandi prices
- Enable price alerts for your crops
- View price trends and market analysis

### 4. **Activity Tracking**
- Log farming activities in "ആക്റ്റിവിറ്റി" tab
- Track irrigation, fertilizer application, pesticide use
- View activity timeline and farming patterns

### 5. **Smart Reminders**
- Set farming reminders with SMS notifications
- Get weather-based irrigation alerts
- Receive government scheme deadlines

## 🔧 Technical Architecture

### Frontend Stack
- **React 18** with TypeScript and functional components
- **Tailwind CSS** for styling with Kerala-inspired color palette
- **Lucide React** for beautiful, consistent icons
- **React Router** for seamless navigation
- **Web Speech API** for voice input with Malayalam language support

### Mock Data & Services
All features work with comprehensive demo data stored in `src/mocks/`:
- `demoData.ts` - Farmer profiles, weather, prices, diseases, schemes
- `chatResponses.ts` - Rule-based conversational AI responses

### File Structure
```
src/
├── components/           # React components
│   ├── Home.tsx         # Main dashboard with voice button
│   ├── VoiceButton.tsx  # Voice input component
│   ├── ChatPanel.tsx    # Conversational interface
│   ├── Profile.tsx      # Farmer profile management
│   ├── ActivityLog.tsx  # Farming activity tracking
│   ├── LeafScan.tsx     # Disease detection with image upload
│   ├── MarketPrices.tsx # Mandi price monitoring
│   ├── Schemes.tsx      # Government schemes database
│   ├── Reminders.tsx    # Smart reminder system
│   └── Navigation.tsx   # Bottom navigation
├── mocks/               # Demo data and mock services
│   ├── demoData.ts      # Core demo data
│   └── chatResponses.ts # AI chat responses
└── App.tsx              # Main app component with routing
```

## 🔌 API Integration Points

The app is architected for easy API integration. Here's where to plug real services:

### 🌤️ **Weather API**
```typescript
// TODO: Replace in src/mocks/demoData.ts
// Current: Mock weather data
// Replace with: IMD API or OpenWeatherMap
const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Thrissur,Kerala&appid=YOUR_API_KEY';
```

### 🗣️ **Speech Recognition**
```typescript
// TODO: Replace in src/components/VoiceButton.tsx
// Current: Browser Web Speech API + fallback
// Replace with: Google Speech-to-Text API for better Malayalam support
const speechAPI = 'https://speech.googleapis.com/v1/speech:recognize';
```

### 🏥 **Disease Detection**
```typescript
// TODO: Replace in src/components/LeafScan.tsx
// Current: Mock AI responses
// Replace with: TensorFlow/PyTorch model API
const diseaseAPI = 'https://your-ml-api.com/predict-disease';

// Example integration:
const detectDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch(diseaseAPI, {
    method: 'POST',
    body: formData,
    headers: { 'Authorization': `Bearer ${AI_API_KEY}` }
  });
  
  return response.json();
};
```

### 💰 **Market Prices**
```typescript
// TODO: Replace in src/mocks/demoData.ts
// Current: Static demo prices
// Replace with: ICAR/NARS market data API
const marketAPI = 'https://api.data.gov.in/resource/market-prices';
```

### 📱 **SMS/WhatsApp Notifications**
```typescript
// TODO: Replace SMS mocks throughout the app
// Use Twilio for SMS:
const twilioAPI = 'https://api.twilio.com/2010-04-01/Accounts/YOUR_SID/Messages.json';

// Example Twilio integration:
const sendSMS = async (phone, message) => {
  await fetch(twilioAPI, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(TWILIO_SID + ':' + TWILIO_TOKEN)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      From: TWILIO_PHONE,
      To: phone,
      Body: message
    })
  });
};

// For WhatsApp Business API:
const whatsappAPI = 'https://graph.facebook.com/v17.0/YOUR_PHONE_ID/messages';
```

### 🗄️ **Database Integration**
```typescript
// TODO: Replace localStorage with Supabase
// Current: Browser localStorage for demo
// Replace with: Supabase for production data

// Example Supabase setup:
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Save farmer profile:
const saveProfile = async (profile) => {
  const { data, error } = await supabase
    .from('farmer_profiles')
    .insert([profile]);
  return data;
};
```

## 🎨 Design System

### Color Palette
- **Primary Green**: #22C55E (Kerala agriculture)
- **Earth Orange**: #D97706 (soil/harvest)
- **Sky Blue**: #3B82F6 (water/weather)
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444

### Typography
- **Malayalam Text**: System fonts with fallback to web-safe fonts
- **Spacing System**: 8px base unit for consistent spacing
- **Font Sizes**: 12px-32px range optimized for mobile reading

### Mobile-First Design
- **Breakpoints**: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- **Touch Targets**: Minimum 44px for comfortable finger tapping
- **Accessibility**: WCAG 2.1 AA compliant color contrast ratios

## 🔐 Security & Authentication

### Current (Demo)
- Simple localStorage-based session management
- No real authentication required for demo

### Production Ready
```typescript
// TODO: Implement proper authentication
// Recommended: Supabase Auth or AWS Cognito

// Example Supabase Auth:
const { data, error } = await supabase.auth.signUp({
  email: farmer.email,
  password: farmer.password,
  options: {
    data: {
      name: farmer.name_ml,
      district: farmer.district
    }
  }
});
```

## 🌍 Localization

### Current Support
- **Malayalam (Primary)**: Complete UI in Malayalam script
- **English (Secondary)**: Fallback and technical terms

### Adding More Languages
```typescript
// TODO: Add i18n support for other Indian languages
// Recommended: react-i18next

const translations = {
  ml: { // Malayalam
    'home.greeting': 'നമസ്കാരം',
    'voice.listening': 'കേൾക്കുന്നു...'
  },
  hi: { // Hindi
    'home.greeting': 'नमस्ते',
    'voice.listening': 'सुन रहे हैं...'
  }
};
```

## 📊 Analytics & Performance

### Recommended Tracking
```typescript
// TODO: Add analytics for user behavior insights
// Track: Voice usage, feature adoption, farmer success metrics

// Example with Google Analytics:
gtag('event', 'voice_interaction', {
  'event_category': 'farmer_engagement',
  'event_label': 'weather_query',
  'language': 'malayalam'
});
```

## 🚀 Deployment

### Development
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

### Production Deployment
The app is ready for deployment on:
- **Vercel** (Recommended for React apps)
- **Netlify** (Great for static sites)
- **AWS Amplify** (Full-stack with easy backend integration)

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod

# Deploy to Netlify
npx netlify deploy --prod --dir=dist
```

### Environment Variables
Create `.env.local` for production:
```env
VITE_WEATHER_API_KEY=your_openweather_key
VITE_GOOGLE_SPEECH_API_KEY=your_google_speech_key
VITE_TWILIO_SID=your_twilio_sid
VITE_TWILIO_TOKEN=your_twilio_token
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make changes following the code style
4. Test thoroughly on mobile devices
5. Submit a pull request with Malayalam and English descriptions

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and accessibility
- **Prettier**: Consistent code formatting
- **Comments**: Important logic explained in both English and Malayalam

## 📋 Roadmap

### Phase 1 (Current MVP) ✅
- Malayalam UI with voice interaction
- Basic farming features with demo data
- Mobile-responsive design

### Phase 2 (Real API Integration)
- Weather API integration (IMD/OpenWeather)
- Real market price feeds
- Google Speech-to-Text for better Malayalam support
- SMS/WhatsApp notifications via Twilio

### Phase 3 (Advanced AI)
- Custom disease detection model training
- Crop yield prediction
- Personalized recommendation engine
- Multi-language support (Hindi, Tamil, Telugu)

### Phase 4 (Community Platform)
- Farmer-to-farmer knowledge sharing
- Expert consultation booking
- Cooperative farming features
- Government scheme application assistance

## 🛠️ Troubleshooting

### Common Issues

**Voice recognition not working?**
- Ensure microphone permissions are granted
- Use HTTPS (required for Web Speech API)
- Try the demo fallback if API is unavailable

**Malayalam text not displaying correctly?**
- Check browser font support
- Install Malayalam fonts on the system
- Use Chrome/Firefox for better Unicode support

**Mobile layout issues?**
- Clear browser cache
- Disable browser zoom
- Test on actual mobile devices, not just desktop responsive mode

### Browser Support
- **Chrome**: Full support including Web Speech API
- **Firefox**: Good support, limited voice features
- **Safari**: iOS Safari supported, desktop Safari limited
- **Edge**: Full support on Windows

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Kerala farmers** who inspired this project
- **Pexels** for providing demo images
- **Lucide** for beautiful icons
- **Tailwind CSS** for the design system
- **React community** for excellent tools and libraries

---

**കൃഷി സഖി - നിങ്ങളുടെ സ്മാർട്ട് കൃഷി സഹായി** 🌾

*Made with ❤️ for Kerala farmers*

For support or questions, create an issue in this repository or contact the development team.