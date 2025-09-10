import React, { useState } from 'react';
import { Gift, ExternalLink, Bookmark, BookmarkCheck, FileText, Users, Calendar } from 'lucide-react';
import { schemes } from '../mocks/demoData';

interface SchemeDetailsProps {
  scheme: any;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

const SchemeDetails: React.FC<SchemeDetailsProps> = ({ scheme, onClose, isBookmarked, onToggleBookmark }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl h-5/6 flex flex-col">
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold text-gray-800 flex-1 pr-4">{scheme.title_ml}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600">{scheme.category_ml}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-blue-600" />
              വിശദാംശങ്ങൾ
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{scheme.description_ml}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2 text-green-600" />
              യോഗ്യത
            </h3>
            <div className="space-y-2">
              {scheme.eligibility_criteria.map((criteria: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">{criteria}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-orange-600" />
              അപേക്ഷ നൽകാനുള്ള ഘട്ടങ്ങൾ
            </h3>
            <div className="space-y-3">
              {scheme.application_steps.map((step: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-semibold text-blue-800 mb-2">ആനുകൂല്യം</h3>
            <p className="text-blue-700 text-sm">{scheme.benefit_ml}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2">കൂടുതൽ വിവരങ്ങൾ</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>വെബ്സൈറ്റ്:</strong> {scheme.website || 'ലഭ്യമല്ല'}</p>
              <p><strong>ഫോൺ:</strong> {scheme.helpline || 'ലഭ്യമല്ല'}</p>
              <p><strong>അവസാന തീയതി:</strong> {scheme.deadline_ml || 'വ്യക്തമാക്കിയിട്ടില്ല'}</p>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 p-4 border-t border-gray-200 space-y-3">
          <div className="flex space-x-3">
            <button
              onClick={() => onToggleBookmark(scheme.id)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                isBookmarked
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 inline mr-2" />
              ) : (
                <Bookmark className="w-4 h-4 inline mr-2" />
              )}
              {isBookmarked ? 'സേവ് ചെയ്തു' : 'സേവ് ചെയ്യൂ'}
            </button>
            <button
              onClick={() => {
                // TODO: Implement application redirect
                alert('ഡെമോ: യഥാർത്ഥ ആപ്പിൽ സർക്കാർ വെബ്സൈറ്റിലേക്ക് റീഡയറക്ട് ചെയ്യും');
              }}
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600"
            >
              <ExternalLink className="w-4 h-4 inline mr-2" />
              അപേക്ഷിക്കൂ
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            ഡെമോ: യഥാർത്ഥ ആപ്പിൽ ഗവൺമെന്റ് പോർട്ടലിലേക്ക് ലിങ്ക് ചെയ്യും
          </p>
        </div>
      </div>
    </div>
  );
};

const Schemes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    const saved = localStorage.getItem('krishiSakhiBookmarkedSchemes');
    if (saved) {
      setBookmarkedSchemes(JSON.parse(saved));
    }
  }, []);

  const categories = ['all', 'കേന്ദ്ര', 'സംസ്ഥാന', 'ബാങ്ക്', 'ഇൻഷുറൻസ്'];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category_ml === selectedCategory;
    const matchesSearch = scheme.title_ml.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description_ml.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (schemeId: string) => {
    const updated = bookmarkedSchemes.includes(schemeId)
      ? bookmarkedSchemes.filter(id => id !== schemeId)
      : [...bookmarkedSchemes, schemeId];
    
    setBookmarkedSchemes(updated);
    localStorage.setItem('krishiSakhiBookmarkedSchemes', JSON.stringify(updated));
  };

  return (
    <div className="p-6 pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">സർക്കാർ സ്കീമുകൾ</h1>
        <p className="text-gray-600">കർഷകർക്കുള്ള സർക്കാർ പദ്ധതികൾ</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="സ്കീമുകൾ തിരയൂ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-green-50'
              }`}
            >
              {category === 'all' ? 'എല്ലാം' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const isBookmarked = bookmarkedSchemes.includes(scheme.id);
          
          return (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedScheme(scheme)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Gift className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <h3 className="font-semibold text-gray-800">{scheme.title_ml}</h3>
                  </div>
                  <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">
                    {scheme.category_ml}
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(scheme.id);
                  }}
                  className={`p-2 rounded-full ${
                    isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                  }`}
                >
                  {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{scheme.description_ml}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="text-green-600 font-medium">
                  {scheme.benefit_ml.split(' ').slice(0, 4).join(' ')}...
                </div>
                <span className="text-blue-600 hover:text-blue-700 flex items-center">
                  വിശദാംശങ്ങൾ കാണൂ
                  <ExternalLink className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          );
        })}

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">സ്കീമുകൾ കണ്ടെത്തിയില്ല</p>
            <p className="text-sm text-gray-400">മറ്റ് കാറ്റഗറി തിരഞ്ഞെടുക്കൂ</p>
          </div>
        )}
      </div>

      {/* Bookmarked Count */}
      {bookmarkedSchemes.length > 0 && (
        <div className="fixed bottom-20 right-6 bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg">
          <span className="text-sm font-medium">
            {bookmarkedSchemes.length} സേവ് ചെയ്തു
          </span>
        </div>
      )}

      {/* Scheme Details Modal */}
      {selectedScheme && (
        <SchemeDetails
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
          isBookmarked={bookmarkedSchemes.includes(selectedScheme.id)}
          onToggleBookmark={toggleBookmark}
        />
      )}
    </div>
  );
};

export default Schemes;