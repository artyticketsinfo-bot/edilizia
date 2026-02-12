
import React, { useState } from 'react';

interface ContactFormProps {
  onQuoteClick?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onQuoteClick }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 px-4 bg-construction-deep scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <div className="w-20 h-20 bg-construction-sage rounded-full flex items-center justify-center mx-auto text-4xl shadow-2xl">✓</div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Messaggio Inviato</h2>
          <p className="text-xl text-slate-300 leading-relaxed font-medium">
            Ti ricontatteremo il prima possibile per fissare un sopralluogo.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-10 py-4 bg-construction-sage text-white rounded font-black hover:bg-construction-brick transition-all shadow-xl uppercase"
          >
            Invia un altro messaggio
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-4 bg-construction-deep relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 relative z-10">
        <div className="flex-1 space-y-10 text-white self-center">
          <div className="space-y-6">
            <span className="text-construction-sage font-black uppercase tracking-[0.4em] text-xs">Contatti</span>
            <h2 className="text-5xl md:text-6xl font-black leading-none uppercase tracking-tighter">
              Parla con i <br/><span className="text-construction-sage">Nostri Tecnici</span>
            </h2>
            <p className="text-slate-300 text-lg font-medium leading-relaxed">
              Hai bisogno di una consulenza su misura o vuoi fissare un sopralluogo? 
              Compila il modulo o apri il nostro generatore di preventivi istantaneo.
            </p>
            {onQuoteClick && (
              <button 
                onClick={onQuoteClick}
                className="inline-block px-8 py-4 border-2 border-construction-sage text-construction-sage rounded font-black hover:bg-construction-sage hover:text-white transition-all uppercase tracking-widest text-sm"
              >
                Apri Generatore Preventivi PDF
              </button>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border-t-8 border-construction-sage">
            <h3 className="text-2xl font-black text-construction-deep mb-8 uppercase tracking-tighter">Inviaci un Messaggio</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome e Cognome *</label>
                  <input required type="text" placeholder="Es: Mario Rossi" className="w-full px-4 py-4 bg-slate-50 border-b-2 border-slate-200 focus:border-construction-sage outline-none text-slate-900 font-bold transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telefono *</label>
                  <input required type="tel" placeholder="+39" className="w-full px-4 py-4 bg-slate-50 border-b-2 border-slate-200 focus:border-construction-sage outline-none text-slate-900 font-bold transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email *</label>
                <input required type="email" placeholder="mario@email.it" className="w-full px-4 py-4 bg-slate-50 border-b-2 border-slate-200 focus:border-construction-sage outline-none text-slate-900 font-bold transition-all" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Messaggio</label>
                <textarea rows={3} placeholder="Descrivi brevemente la tua richiesta..." className="w-full px-4 py-4 bg-slate-50 border-b-2 border-slate-200 focus:border-construction-sage outline-none text-slate-900 font-bold transition-all resize-none"></textarea>
              </div>

              <button type="submit" className="w-full py-5 bg-construction-sage text-white font-black text-xl hover:bg-construction-deep transition-all shadow-2xl uppercase tracking-tighter rounded-sm">
                Invia Messaggio
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
