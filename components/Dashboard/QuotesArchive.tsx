
import React, { useState } from 'react';
import { Quote, CompanyData, QuoteStatus } from '../../types';
import html2pdf from 'html2pdf.js';

interface QuotesArchiveProps {
  quotes: Quote[];
  onDelete: (id: string) => void;
  companyData: CompanyData;
  onUpdateStatus: (id: string, status: QuoteStatus) => void;
  onNewQuote: () => void;
}

export const QuotesArchive: React.FC<QuotesArchiveProps> = ({ quotes, onDelete, companyData, onUpdateStatus, onNewQuote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'ALL'>('ALL');

  const filteredQuotes = quotes.filter(q => {
    const searchLower = searchTerm.toLowerCase().trim();
    const matchesSearch = q.clientName.toLowerCase().includes(searchLower) || 
                          q.number.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: QuoteStatus) => {
    switch (status) {
      case 'BOZZA': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'INVIATO': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'ACCETTATO': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'RESPINTO': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-100';
    }
  };

  const handleExportArchivePDF = () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; color: #333;">
        <div style="border-bottom: 3px solid #52796F; padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="margin: 0; color: #2F3E46;">Report Archivio Preventivi</h1>
            <p style="margin: 5px 0; font-size: 12px; color: #666;">${companyData.name} - P.IVA ${companyData.vat}</p>
          </div>
          <div style="text-align: right; font-size: 10px; color: #999; text-transform: uppercase;">
            Generato il: ${new Date().toLocaleDateString('it-IT')}
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
          <thead>
            <tr style="background: #f8f9fa; text-align: left;">
              <th style="padding: 10px; border-bottom: 1px solid #ddd;">N°</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd;">Cliente</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd;">Data</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd;">Stato</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">Totale</th>
            </tr>
          </thead>
          <tbody>
            ${filteredQuotes.map(q => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${q.number}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${q.clientName}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${q.date}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${q.status}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">€ ${q.total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" style="padding: 20px 10px; text-align: right; font-weight: bold;">TOTALE LORDO:</td>
              <td style="padding: 20px 10px; text-align: right; font-weight: bold; font-size: 14px; border-top: 2px solid #52796F;">
                € ${filteredQuotes.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;

    const opt = {
      margin: 10,
      filename: `Report_Archivio_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const handleDownloadSingle = (quote: Quote) => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; color: #333; max-width: 800px; margin: auto;">
        <div style="display: flex; justify-content: space-between; border-bottom: 4px solid #52796F; padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            ${companyData.logo ? `<img src="${companyData.logo}" style="max-height: 50px; margin-bottom: 10px;" />` : `<h1 style="margin: 0; color: #2F3E46; font-size: 24px;">${companyData.name}</h1>`}
            <p style="font-size: 11px; color: #666; margin: 5px 0;">${companyData.address}<br/>P.IVA ${companyData.vat}<br/>Tel: ${companyData.phone}</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; color: #C97B36; font-size: 20px;">PREVENTIVO</h2>
            <p style="font-size: 14px; font-weight: bold; margin: 5px 0;">N° ${quote.number}</p>
            <p style="font-size: 11px; color: #666; margin: 0;">Data emissione: ${quote.date}</p>
          </div>
        </div>
        <div style="margin-bottom: 40px; background: #fcfcfc; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <p style="font-size: 10px; font-weight: bold; color: #999; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Cliente:</p>
          <p style="font-size: 16px; font-weight: bold; margin: 0;">${quote.clientName}</p>
          <p style="font-size: 12px; color: #555; margin: 5px 0 0 0;">${quote.clientAddress}</p>
          ${quote.clientPhone ? `<p style="font-size: 12px; color: #555; margin: 2px 0 0 0;">Tel: ${quote.clientPhone}</p>` : ''}
        </div>
        <div style="margin-bottom: 40px;">
          <p style="font-size: 10px; font-weight: bold; color: #999; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Descrizione Lavorazioni:</p>
          <div style="font-size: 13px; line-height: 1.7; white-space: pre-line; color: #333; padding: 10px 0;">
            ${quote.description}
          </div>
        </div>
        <div style="border-top: 2px solid #f0f0f0; padding-top: 20px;">
          <div style="display: flex; justify-content: flex-end; margin-bottom: 10px;">
            <div style="width: 200px; text-align: right;">
              <p style="font-size: 12px; color: #666; margin: 0;">Imponibile: € ${quote.subtotal.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
              <p style="font-size: 12px; color: #666; margin: 5px 0;">IVA ${quote.taxRate}%: € ${quote.taxAmount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end;">
            <div style="background: #2F3E46; color: white; padding: 15px 30px; border-radius: 4px; text-align: right;">
              <p style="font-size: 10px; font-weight: bold; margin: 0; text-transform: uppercase; opacity: 0.8;">Totale Preventivo</p>
              <p style="font-size: 26px; font-weight: 900; margin: 5px 0 0 0;">€ ${quote.total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const opt = {
      margin: 0,
      filename: `Preventivo_${quote.number.replace(/\//g, '_')}_${quote.clientName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  if (quotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 text-center animate-in">
        <div className="relative mb-10">
          <div className="w-32 h-32 bg-slate-100 rounded-3xl flex items-center justify-center text-6xl grayscale opacity-30">📂</div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-construction-sage text-white rounded-2xl flex items-center justify-center text-3xl font-black shadow-2xl border-4 border-white">+</div>
        </div>
        <div className="space-y-4 mb-12">
          <h3 className="text-4xl font-black text-construction-deep uppercase tracking-tighter">Archivio Vuoto</h3>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs max-w-sm mx-auto leading-loose">
            Non hai ancora creato preventivi.<br/>Inizia ora registrando la tua prima proposta.
          </p>
        </div>
        <button 
          onClick={onNewQuote}
          className="px-12 py-6 bg-construction-brick text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 h-20"
        >
          <span className="text-2xl">+</span> Crea Primo Preventivo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-slate-100">
        <div>
          <h3 className="text-3xl font-black text-construction-deep uppercase tracking-tighter">Registro Storico</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Gestione centralizzata preventivi e stati cantiere.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExportArchivePDF}
            className="px-6 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3 h-14"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Esporta PDF
          </button>
          <button 
            onClick={onNewQuote}
            className="px-8 py-4 bg-construction-sage text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-construction-deep transition-all flex items-center justify-center gap-3 h-14"
          >
            <span className="text-xl">+</span> Nuovo Preventivo
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
        <div className="w-full lg:max-w-xl">
          <div className="flex justify-between items-center mb-2 px-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filtro Rapido Cliente / N° Preventivo</label>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="text-[9px] font-black text-construction-brick uppercase tracking-widest hover:underline"
              >
                Resetta Ricerca
              </button>
            )}
          </div>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Cerca per nome cliente (es: Rossi) o numero preventivo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-14 py-5 bg-white border-2 border-slate-200 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm h-16 shadow-sm transition-all"
            />
            <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-construction-sage transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            
            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-300 bg-slate-100 px-2 py-1 rounded uppercase">
                {filteredQuotes.length} Risultati
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0">
          {(['ALL', 'BOZZA', 'INVIATO', 'ACCETTATO', 'RESPINTO'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border-2 ${statusFilter === s ? 'bg-construction-deep text-white border-construction-deep shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
            >
              {s === 'ALL' ? 'Tutti i Documenti' : s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
        {filteredQuotes.length > 0 ? (
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-6 font-bold text-slate-400 text-[10px] uppercase tracking-widest w-44">Doc. Numero</th>
                <th className="pb-6 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Anagrafica Cliente</th>
                <th className="pb-6 font-bold text-slate-400 text-[10px] uppercase tracking-widest text-center">Stato Cantiere</th>
                <th className="pb-6 font-bold text-slate-400 text-[10px] uppercase tracking-widest text-right">Totale Fatturato</th>
                <th className="pb-6 font-bold text-slate-400 text-[10px] uppercase tracking-widest text-right">Gestione</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredQuotes.map(q => (
                <tr key={q.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-8">
                    <div className="font-black text-construction-brick text-base">{q.number}</div>
                    <div className="text-[9px] text-slate-400 font-black uppercase mt-1 tracking-widest">{q.date}</div>
                  </td>
                  <td className="py-8">
                    <div className="font-black text-construction-deep uppercase text-sm tracking-tighter group-hover:text-construction-sage transition-colors">{q.clientName}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate max-w-[250px] mt-1">{q.clientAddress}</div>
                  </td>
                  <td className="py-8 text-center">
                    <select 
                      value={q.status}
                      onChange={(e) => onUpdateStatus(q.id, e.target.value as QuoteStatus)}
                      className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border-2 outline-none cursor-pointer transition-all shadow-sm ${getStatusStyle(q.status)}`}
                    >
                      <option value="BOZZA">Bozza</option>
                      <option value="INVIATO">Inviato</option>
                      <option value="ACCETTATO">Accettato</option>
                      <option value="RESPINTO">Respinto</option>
                    </select>
                  </td>
                  <td className="py-8 text-right">
                    <div className="font-black text-construction-deep text-lg tracking-tighter">€ {q.total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">IVA {q.taxRate}% inclusa</div>
                  </td>
                  <td className="py-8 text-right">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => handleDownloadSingle(q)}
                        className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-construction-sage hover:border-construction-sage rounded-xl transition-all shadow-sm"
                        title="Scarica PDF"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </button>
                      <button 
                        onClick={() => onDelete(q.id)}
                        className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 text-slate-300 hover:text-red-500 hover:border-red-500 rounded-xl transition-all shadow-sm"
                        title="Elimina"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-24 bg-slate-50 rounded-3xl mt-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-4">
            <div className="text-6xl opacity-20 grayscale">🔎</div>
            <div className="space-y-1">
              <div className="font-black uppercase tracking-[0.3em] text-xs text-slate-400">Nessun documento trovato</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Modifica i termini di ricerca o i filtri di stato.</p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-6 py-2 bg-construction-sage text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-construction-deep transition-all"
                >
                  Mostra tutti i preventivi
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
