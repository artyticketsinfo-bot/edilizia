
import React, { useState } from 'react';
import { Worker } from '../../types';

interface WorkersListProps {
  workers: Worker[];
  onUpdate: (newWorkers: Worker[]) => void;
}

export const WorkersList: React.FC<WorkersListProps> = ({ workers, onUpdate }) => {
  const [newWorker, setNewWorker] = useState<Partial<Worker>>({
    firstName: '', lastName: '', role: '', isEmployer: false
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorker.firstName || !newWorker.lastName) return;
    
    const worker: Worker = {
      id: Date.now().toString(),
      firstName: newWorker.firstName || '',
      lastName: newWorker.lastName || '',
      role: newWorker.role || 'Operaio',
      phone: '',
      email: '',
      isEmployer: !!newWorker.isEmployer
    };
    
    onUpdate([...workers, worker]);
    setNewWorker({ firstName: '', lastName: '', role: '', isEmployer: false });
  };

  const removeWorker = (id: string) => {
    if (window.confirm("Rimuovere definitivamente questo lavoratore dalla squadra?")) {
      onUpdate(workers.filter(w => w.id !== id));
    }
  };

  const handleExportWorkersPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; color: #2F3E46;">
        <div style="border-bottom: 4px solid #52796F; padding-bottom: 15px; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px;">Report Personale Organico</h1>
          <p style="margin: 5px 0; color: #666; font-size: 12px;">EdilModern ERP - Situazione aggiornata</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
          <thead>
            <tr style="background: #f8f9fa; text-align: left;">
              <th style="padding: 12px; border-bottom: 2px solid #ddd;">Cognome e Nome</th>
              <th style="padding: 12px; border-bottom: 2px solid #ddd;">Qualifica / Ruolo</th>
              <th style="padding: 12px; border-bottom: 2px solid #ddd; text-align: center;">Datore</th>
            </tr>
          </thead>
          <tbody>
            ${workers.map(w => `
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><b>${w.lastName} ${w.firstName}</b></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${w.role}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${w.isEmployer ? '✓' : '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div style="margin-top: 40px; border-top: 1px solid #eee; pt: 15px; font-size: 10px; color: #999;">
          Totale Dipendenti/Collaboratori: ${workers.length} | Data Export: ${new Date().toLocaleDateString('it-IT')}
        </div>
      </div>
    `;

    const opt = {
      margin: 10,
      filename: `Report_Personale_EdilModern.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-2xl font-black text-construction-deep uppercase tracking-tighter">Squadra & Personale</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Gestione dipendenti e ruoli operativi di cantiere.</p>
        </div>
        <button 
          onClick={handleExportWorkersPDF}
          className="w-full md:w-auto px-6 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3 h-12"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Esporta Lista PDF
        </button>
      </div>

      <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
        <h4 className="font-black text-construction-deep uppercase text-sm mb-6">Aggiungi Nuovo Profilo</h4>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome</label>
            <input required type="text" value={newWorker.firstName} onChange={e => setNewWorker({...newWorker, firstName: e.target.value})}
              placeholder="Mario" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm h-14" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cognome</label>
            <input required type="text" value={newWorker.lastName} onChange={e => setNewWorker({...newWorker, lastName: e.target.value})}
              placeholder="Rossi" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm h-14" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ruolo</label>
            <input required type="text" value={newWorker.role} onChange={e => setNewWorker({...newWorker, role: e.target.value})}
              placeholder="Es: Capocantiere" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm h-14" />
          </div>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={newWorker.isEmployer} onChange={e => setNewWorker({...newWorker, isEmployer: e.target.checked})}
                className="w-5 h-5 text-construction-brick rounded focus:ring-construction-brick" />
              <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">È Datore di Lavoro</span>
            </label>
            <button type="submit" className="w-full py-4 bg-construction-deep text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl h-14 hover:bg-construction-sage transition-all">
              Salva Profilo
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Nominativo Organico</th>
              <th className="pb-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Inquadramento</th>
              <th className="pb-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest text-center">Resp. Legale</th>
              <th className="pb-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {workers.map(w => (
              <tr key={w.id} className="group hover:bg-slate-50 transition-colors">
                <td className="py-6">
                  <div className="font-black text-construction-deep uppercase text-sm">{w.lastName} {w.firstName}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">ID: {w.id.slice(-6)}</div>
                </td>
                <td className="py-6">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    {w.role}
                  </span>
                </td>
                <td className="py-6 text-center">
                  {w.isEmployer ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Sì
                    </span>
                  ) : (
                    <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">-</span>
                  )}
                </td>
                <td className="py-6 text-right">
                  <button onClick={() => removeWorker(w.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {workers.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
            <div className="text-4xl mb-4 grayscale opacity-30">👷</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Nessun lavoratore registrato nell'organico.</div>
          </div>
        )}
      </div>
    </div>
  );
};
