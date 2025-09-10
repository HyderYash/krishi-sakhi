import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceButtonProps {
  onVoiceInput: (text?: string) => void;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'ml-IN'; // Malayalam (India)
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Speech recognized:', transcript);
        onVoiceInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        // Fallback to mock input
        handleMockVoiceInput();
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    } else {
      setIsSupported(false);
    }
  }, [onVoiceInput]);

  const handleMockVoiceInput = () => {
    // Mock voice inputs for demo
    const mockInputs = [
      'എനിക്ക് നാളെ മഴ ഉണ്ടോ?',
      'ഇറിഗേഷൻ എപ്പോൾ വേണം?',
      'നെല്ലിന്റെ വില എന്താണ്?',
      'ഇന്ന് എന്ത് ജോലി ചെയ്യണം?'
    ];
    const randomInput = mockInputs[Math.floor(Math.random() * mockInputs.length)];
    
    setTimeout(() => {
      onVoiceInput(randomInput);
      setIsListening(false);
    }, 2000); // Simulate 2 second listening
  };

  const handleVoiceButtonClick = () => {
    if (isListening) {
      // Stop listening
      if (recognition) {
        recognition.stop();
      }
      setIsListening(false);
    } else {
      // Start listening
      if (isSupported && recognition) {
        try {
          recognition.start();
        } catch (error) {
          console.error('Failed to start speech recognition:', error);
          handleMockVoiceInput();
        }
      } else {
        // Fallback to mock
        setIsListening(true);
        handleMockVoiceInput();
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleVoiceButtonClick}
        className={`w-20 h-20 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110'
            : 'bg-green-500 hover:bg-green-600 hover:scale-105'
        }`}
        disabled={false}
      >
        {isListening ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>
      
      {isListening && (
        <div className="mt-3 flex items-center space-x-2 text-red-600">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <span className="text-sm font-medium ml-2">കേൾക്കുന്നു...</span>
        </div>
      )}
      
      {!isSupported && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          വോയ്സ് API ലഭ്യമല്ല - ഡെമോ മോഡ്
        </p>
      )}
    </div>
  );
};

export default VoiceButton;