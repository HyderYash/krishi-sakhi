import React, { useState } from 'react';
import { Camera, Upload, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { diseaseMocks } from '../mocks/demoData';

interface ScanResult {
  disease: {
    id: string;
    name_ml: string;
    name_en: string;
    confidence: number;
    fix_ml: string;
  };
  confidence: number;
  recommendation: string;
}

const LeafScan: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const demoImages = [
    {
      url: 'https://images.pexels.com/photos/1410226/pexels-photo-1410226.jpeg?auto=compress&cs=tinysrgb&w=400',
      disease: 'ശീതളക്കുരു',
      description: 'Rice blast disease'
    },
    {
      url: 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=400',
      disease: 'ഇല പൂപ്പൽ',
      description: 'Leaf blight'
    },
    {
      url: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=400',
      disease: 'ആരോഗ്യമുള്ള ഇല',
      description: 'Healthy leaf'
    }
  ];

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setScanResult(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) return;

    setIsScanning(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Mock AI disease detection
      const randomDisease = diseaseMocks[Math.floor(Math.random() * diseaseMocks.length)];
      const confidence = 0.75 + Math.random() * 0.25; // 75-100% confidence
      
      const result: ScanResult = {
        disease: randomDisease,
        confidence,
        recommendation: `${randomDisease.fix_ml}. ${confidence > 0.9 ? 'ഉയർന്ന' : 'മധ്യം'} വിശ്വാസ്യത.`
      };

      setScanResult(result);
      setIsScanning(false);
    }, 3000);
  };

  const handleRetry = () => {
    setSelectedImage(null);
    setScanResult(null);
  };

  return (
    <div className="p-6 pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">AI ലീഫ് സ്കാൻ</h1>
        <p className="text-gray-600">ഇലയുടെ ഫോട്ടോ എടുത്ത് രോഗം കണ്ടെത്തൂ</p>
      </div>

      {!selectedImage ? (
        <div className="space-y-6">
          {/* Upload Options */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യൂ</h2>
            
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-300 rounded-xl cursor-pointer hover:bg-green-50 transition-colors">
                <div className="flex flex-col items-center">
                  <Camera className="w-8 h-8 text-green-500 mb-2" />
                  <span className="text-sm font-medium text-gray-700">ക്യാമറ / ഗാലറി</span>
                  <span className="text-xs text-gray-500">ഇല ഫോട്ടോ തിരഞ്ഞെടുക്കൂ</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Demo Images */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ഡെമോ ഇമേജുകൾ (ടെസ്റ്റിനായി)
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {demoImages.map((demo, index) => (
                <div
                  key={index}
                  onClick={() => handleImageSelect(demo.url)}
                  className="flex items-center space-x-4 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-green-300 hover:bg-green-50 transition-all"
                >
                  <img
                    src={demo.url}
                    alt={demo.description}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{demo.disease}</h3>
                    <p className="text-sm text-gray-500">{demo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-medium text-blue-800 mb-2">നല്ല ഫലത്തിനുള്ള നിർദ്ദേശങ്ങൾ:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• വ്യക്തമായ, നല്ല വെളിച്ചത്തിൽ ഫോട്ടോ എടുക്കൂ</li>
              <li>• ഇലയുടെ രോഗബാധിതമായ ഭാഗം കാണിക്കൂ</li>
              <li>• ക്യാമറ സ്ഥിരമായി പിടിക്കൂ</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Selected Image */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">തിരഞ്ഞെടുത്ത ഇമേജ്</h2>
              <button
                onClick={handleRetry}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected leaf"
                className="w-full h-64 object-cover rounded-xl"
              />
              {scanResult && (
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">സ്കാൻ പൂർത്തിയായി!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scan Button or Results */}
          {!scanResult && !isScanning && (
            <button
              onClick={handleScan}
              className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 flex items-center justify-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>AI വഴി സ്കാൻ ചെയ്യൂ</span>
            </button>
          )}

          {isScanning && (
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-800 mb-2">AI വിശകലനം...</h3>
              <p className="text-sm text-gray-600">ദയവായി കാത്തിരിക്കൂ, ഇല പരിശോധിക്കുന്നു</p>
            </div>
          )}

          {/* Results */}
          {scanResult && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  സ്കാൻ ഫലം
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">കണ്ടെത്തിയ രോഗം:</h3>
                    <p className="text-xl font-bold text-red-600">{scanResult.disease.name_ml}</p>
                    <p className="text-sm text-gray-500">{scanResult.disease.name_en}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">വിശ്വാസ്യത:</h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${scanResult.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {Math.round(scanResult.confidence * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                    <h3 className="font-medium text-orange-800 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      ശുപാർശ:
                    </h3>
                    <p className="text-orange-700">{scanResult.recommendation}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleRetry}
                  className="py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
                >
                  വീണ്ടും സ്കാൻ
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement save functionality
                    alert('ഡെമോ: ഫലം സേവ് ചെയ്തു! യഥാർത്ഥ ആപ്പിൽ ഇത് ഡാറ്റാബേസിൽ സേവ് ചെയ്യും.');
                  }}
                  className="py-3 px-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600"
                >
                  ഫലം സേവ് ചെയ്യൂ
                </button>
              </div>
            </div>
          )}

          {/* Technical Note */}
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-700">
              <strong>ഡെവലപ്പർ കുറിപ്പ്:</strong> ഇത് ഡെമോ AI മോഡലാണ്. യഥാർത്ഥ പ്രോജക്റ്റിൽ 
              TensorFlow/PyTorch മോഡൽ API എൻഡ്‌പോയിന്റ് ബന്ധിപ്പിക്കുക.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeafScan;