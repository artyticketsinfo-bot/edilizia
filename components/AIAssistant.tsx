
import React, { useState, useRef } from 'react';
import { GeminiService } from '../geminiService';

export const AIAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const service = useRef(new GeminiService());

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const advice = await service.current.getRenovationAdvice(prompt);
      setResponse(advice);
    } catch (e) {
      setResponse("Errore nella comunicazione tecnica. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700">
      <div className="space-y-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-construction-brick/20 rounded-lg flex items-center justify-center text-construction-brick border border-construction-brick/30">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-3.566 0l-.727-2.903a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-2.387 2.387a2 2 0 11-2.828-2.828l2.387-2.387a2 2 0 00.547-1.022l.477-2.387a2 2 0 00-1.414-1.96L4.053 9.428a2 2 0 010-3.566l2.903-.727a2 2 0 001.414-1.96L8.847 1.022a2 2 0 112.828 0l.727 2.903a2 2 0 001.96 1.414l2.903.727a2 2 0 010 3.566l-2.903.727a2 2 0 00-1.414 1.96l-.727 2.903a2 2 0 01-3.566 0l-.727-2.903a2 2 0 00-1.414-1.96l-2.903-.727a2 2 0 010-3.566l2.903-.727a2 2 0 001.414-1.96l.727-2.903a2 2 0 013.566 0l.727 2.903a2 2 0 001.96 1.414l2.387.477z" /></svg>
          </div>
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Ingegnere AI</h3>
            <p className="text-slate-400 text-sm font-medium">Consulenza tecnica immediata per i tuoi dubbi costruttivi.</p>
          </div>
        </div>

        <div className="relative group">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Esempio: Vantaggi delle fondamenta a platea rispetto a quelle a trave?"
            className="w-full px-8 py-5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-construction-sage transition-all font-medium placeholder:text-slate-600"
          />
          <button 
            onClick={handleAsk}
            disabled={loading}
            className="absolute right-3 top-3 bottom-3 px-8 bg-construction-sage text-white rounded font-black hover:bg-construction-deep transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
          >
            {loading ? "..." : "Analizza"}
          </button>
        </div>

        {response && (
          <div className="p-8 bg-slate-900/80 border border-slate-700 rounded-xl animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 bg-construction-brick rounded-full animate-pulse"></span>
              <span className="text-xs font-black text-construction-brick uppercase tracking-[0.3em]">Relazione Tecnica</span>
            </div>
            <p className="text-slate-200 leading-relaxed text-base whitespace-pre-line italic font-medium">
              "{response}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
