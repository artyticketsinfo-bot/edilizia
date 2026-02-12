
import React from 'react';

const AdvantageItem: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="flex gap-4 items-start">
    <div className="w-8 h-8 rounded bg-construction-sage/10 flex items-center justify-center flex-shrink-0 text-construction-sage">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <h4 className="font-black text-construction-deep mb-1 uppercase text-sm tracking-tight">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="advantages" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <span className="text-construction-sage font-black uppercase tracking-[0.3em] text-xs">Perché EdilModern</span>
              <h2 className="text-4xl font-black text-construction-deep uppercase tracking-tighter">Affidabilità Certificata</h2>
              <p className="text-slate-500 text-lg font-medium">
                Affidarsi a noi significa scegliere un partner che mette la qualità strutturale e la sicurezza al primo posto.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <AdvantageItem 
                title="Materiali Certificati" 
                desc="Utilizziamo solo calcestruzzi e acciai di classe superiore per garantire la massima longevità." 
              />
              <AdvantageItem 
                title="Preventivi Traspareni" 
                desc="Dettagliamo ogni singola voce di spesa. Nessun costo imprevisto o "fuori preventivo"." 
              />
              <AdvantageItem 
                title="Rispetto dei Tempi" 
                desc="Pianificazione rigorosa del cantiere per rispettare le date di consegna concordate." 
              />
              <AdvantageItem 
                title="Sopralluoghi Tecnici" 
                desc="Valutiamo il terreno e il contesto con analisi ingegneristiche approfondite." 
              />
            </div>
          </div>
          
          <div className="flex-1 w-full lg:px-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-construction-sage to-construction-deep rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white p-12 rounded-xl border border-slate-100 shadow-2xl space-y-8">
                <div className="text-6xl text-construction-brick">🏗️</div>
                <h3 className="text-2xl font-black text-construction-deep uppercase tracking-tighter leading-none">La nostra priorità è <br/><span className="text-construction-sage">la tua sicurezza</span></h3>
                <p className="text-slate-600 leading-relaxed text-xl font-medium italic">
                  "Ogni costruzione è una promessa di futuro che onoriamo con serietà."
                </p>
                <div className="flex items-center gap-4 py-6 border-t border-slate-100">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 border-2 border-construction-sage">
                    <img src="https://picsum.photos/id/64/100/100" alt="Responsabile Tecnico" />
                  </div>
                  <div>
                    <div className="font-black text-construction-deep uppercase text-sm">Ing. Marco Rossi</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fondatore & Direttore Tecnico</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
