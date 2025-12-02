import React from 'react';
import { Zap } from 'lucide-react';
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
          <div className="flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-10 h-10 shadow-lg shadow-primary/20 rounded-xl">
              <defs>
                <linearGradient id="header-logo-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <rect width="24" height="24" rx="6" fill="url(#header-logo-gradient)" />
              <g fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(12 12) scale(0.65) translate(-12 -12)">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </g>
            </svg>
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