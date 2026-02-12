
import React from 'react';

interface NavbarProps {
  onLoginClick: () => void;
  onQuoteClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onQuoteClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-construction-deep rounded flex items-center justify-center text-white font-black text-xl">
                E
              </div>
              <span className="text-2xl font-black tracking-tighter text-construction-deep">
                EDIL<span className="text-construction-sage">MODERN</span>
              </span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#azienda" className="text-sm font-bold text-slate-600 hover:text-construction-sage transition-colors uppercase tracking-widest">Azienda</a>
            <a href="#servizi" className="text-sm font-bold text-slate-600 hover:text-construction-sage transition-colors uppercase tracking-widest">Servizi</a>
            <a href="#advantages" className="text-sm font-bold text-slate-600 hover:text-construction-sage transition-colors uppercase tracking-widest">Perché Noi</a>
            <button 
              onClick={onLoginClick}
              className="text-sm font-bold text-slate-500 hover:text-construction-deep transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
              AREA CLIENTI
            </button>
            <button 
              onClick={onQuoteClick}
              className="px-6 py-3 bg-construction-sage text-white rounded font-extrabold text-sm hover:bg-construction-deep transition-all shadow-lg uppercase tracking-tight"
            >
              Richiedi Preventivo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
