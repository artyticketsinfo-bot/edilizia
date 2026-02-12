
import React from 'react';

interface AboutProps {
  city: string;
}

export const About: React.FC<AboutProps> = ({ city }) => {
  return (
    <section id="azienda" className="py-24 px-4 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-construction-brick font-black uppercase tracking-[0.3em] text-xs">Chi Siamo</span>
            <h2 className="text-4xl md:text-5xl font-black text-construction-deep leading-none uppercase tracking-tighter">
              Ristrutturazioni <span className="text-construction-sage">Chiavi in Mano</span>
            </h2>
            <div className="w-20 h-1.5 bg-construction-sage mx-auto mt-4"></div>
          </div>
          
          <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
            <p>
              Siamo un’impresa edile specializzata in <strong>ristrutturazioni complete di appartamenti, rifacimento bagni, lavori di muratura e riqualificazione energetica</strong>.
            </p>
            <p>
              Operiamo a <strong>{city} e provincia</strong> offrendo soluzioni su misura, materiali di qualità e massima attenzione ai dettagli.
            </p>
            <p>
              Seguiamo ogni fase del lavoro: dal sopralluogo iniziale fino alla consegna finale, garantendo tempi certi, preventivi trasparenti e assistenza continua. 
              La nostra esperienza ci permette di trasformare ogni ambiente in uno spazio funzionale, moderno e duraturo nel tempo.
            </p>
          </div>
          
          <div className="pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="text-3xl font-black text-construction-deep tracking-tighter">100%</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Qualità</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-construction-deep tracking-tighter">24h</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Risposta</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-construction-deep tracking-tighter">Zero</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Imprevisti</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-construction-deep tracking-tighter">Top</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Materiali</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
