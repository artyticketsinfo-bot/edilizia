
import React from 'react';

interface HeroProps {
  city: string;
  onQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ city, onQuoteClick }) => {
  return (
    <header className="hero-section">
      <div className="overlay"></div>
      <div className="relative z-10 max-w-4xl px-4 space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="inline-block px-4 py-1.5 bg-construction-brick/20 backdrop-blur-md border border-construction-brick/30 rounded text-construction-brick font-black text-xs tracking-[0.3em] uppercase">
          Opere Strutturali & Murarie
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] uppercase tracking-tighter text-white">
          Realizziamo edifici <br/>solidi e duraturi
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
          Esperienza, qualità e professionalità in ogni progetto edile a {city}. <br/>
          Affidabilità certificata per strutture residenziali e commerciali.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
          <button 
            onClick={onQuoteClick}
            className="px-10 py-5 btn-sage text-white rounded-lg font-black text-lg shadow-2xl uppercase tracking-widest"
          >
            👉 Richiedi Preventivo
          </button>
          <a href="#azienda" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-lg font-black text-lg hover:bg-white/20 transition-all uppercase tracking-widest">
            Scopri l'Azienda
          </a>
        </div>
      </div>
    </header>
  );
};
