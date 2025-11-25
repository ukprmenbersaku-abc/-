import React from 'react';
import { Layers, Zap } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['ja'];
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
  return (
    <header className="w-full py-6 px-4 border-b border-gray-800 bg-dark/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg shadow-primary/20">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {t.title}
            </h1>
            <p className="text-xs text-gray-500">{t.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-surface/50 px-3 py-1 rounded-full border border-gray-700 hidden sm:flex">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>Fast & Local</span>
          </div>
          
          <div className="flex items-center bg-surface border border-gray-700 rounded-lg p-1">
            <button
              onClick={() => setLanguage('ja')}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${language === 'ja' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200'}`}
            >
              JP
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${language === 'en' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;