
import React from 'react';

interface FooterProps {
  city: string;
  onQuoteClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ city, onQuoteClick }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-construction-deep rounded flex items-center justify-center text-white font-black text-xl">E</div>
              <span className="text-2xl font-black text-construction-deep tracking-tighter uppercase">Edil<span className="text-construction-sage">Modern</span></span>
            </div>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
              General Contractor specializzato in nuove costruzioni e strutture pesanti a {city}. Qualità certificata, trasparenza e sicurezza strutturale dal 1995.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-black text-construction-deep uppercase text-xs tracking-[0.2em]">Navigazione</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-bold">
              <li><a href="#azienda" className="hover:text-construction-sage transition-colors">Azienda</a></li>
              <li><a href="#servizi" className="hover:text-construction-sage transition-colors">Costruzioni</a></li>
              <li><a href="#advantages" className="hover:text-construction-sage transition-colors">Perché Noi</a></li>
              <li>
                <button 
                  onClick={onQuoteClick}
                  className="hover:text-construction-sage transition-colors text-construction-brick uppercase text-left"
                >
                  Richiedi Preventivo PDF
                </button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-black text-construction-deep uppercase text-xs tracking-[0.2em]">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-500 hover:bg-construction-sage hover:text-white transition-all font-black">FB</a>
              <a href="#" className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-500 hover:bg-construction-sage hover:text-white transition-all font-black">IG</a>
              <a href="#" className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-500 hover:bg-construction-sage hover:text-white transition-all font-black">LI</a>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black">
          <div>© {new Date().getFullYear()} EdilModern Strutture S.r.l. - P.IVA 12345678901</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-construction-deep transition-colors">Privacy</a>
            <a href="#" className="hover:text-construction-deep transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
