
import React, { useState, useEffect } from 'react';
import { CompanyData, Quote, Client, QuoteStatus } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyData: CompanyData;
  clients: Client[];
  lastQuoteNumber: number;
  onSave?: (quote: Quote) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, companyData, clients, lastQuoteNumber, onSave }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    description: '',
    subtotal: '',
    taxRate: '22',
    date: new Date().toLocaleDateString('it-IT'),
    notes: ''
  });

  const [totals, setTotals] = useState({
    taxAmount: 0,
    total: 0
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const sub = parseFloat(formData.subtotal) || 0;
    const rate = parseFloat(formData.taxRate) || 0;
    const tax = sub * (rate / 100);
    setTotals({
      taxAmount: tax,
      total: sub + tax
    });
  }, [formData.subtotal, formData.taxRate]);

  const handleSelectClient = (id: string) => {
    if (!id) {
      setFormData({ ...formData, clientId: '', clientName: '', clientAddress: '', clientPhone: '' });
      return;
    }
    const client = clients.find(c => c.id === id);
    if (client) {
      setFormData({
        ...formData,
        clientId: client.id,
        clientName: client.name,
        clientAddress: client.address,
        clientPhone: client.phone
      });
    }
  };

  if (!isOpen) return null;

  const handleSaveToArchive = (targetStatus: QuoteStatus = 'BOZZA') => {
    if (!formData.clientName || !formData.subtotal) {
      alert("⚠️ Dati minimi richiesti: Cliente e Importo Lavori.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const formattedNumber = `${currentYear}/${String(lastQuoteNumber + 1).padStart(3, '0')}`;

    const newQuote: Quote = {
      id: Date.now().toString(),
      number: formattedNumber,
      clientId: formData.clientId || 'GUEST',
      clientName: formData.clientName,
      clientAddress: formData.clientAddress,
      clientPhone: formData.clientPhone,
      description: formData.description,
      subtotal: parseFloat(formData.subtotal),
      taxRate: parseFloat(formData.taxRate),
      taxAmount: totals.taxAmount,
      total: totals.total,
      date: formData.date,
      status: targetStatus,
      notes: formData.notes
    };

    if (onSave) {
      onSave(newQuote);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 1200);
    }
  };

  const handleExportPDF = () => {
    const element = document.getElementById('quote-document-content');
    const opt = {
      margin: 0,
      filename: `Preventivo_${String(lastQuoteNumber + 1).padStart(3, '0')}_${formData.clientName.replace(/\s+/g, '_') || 'Generico'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 bg-construction-deep/95 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-white w-full max-w-7xl rounded-[2.5rem] shadow-2xl border-t-[12px] border-construction-sage relative my-auto">
        
        <div className="sticky top-0 bg-white z-20 px-8 py-6 border-b border-slate-100 flex justify-between items-center shrink-0">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h2 className="text-2xl font-black text-construction-deep uppercase tracking-tighter">Generatore Documento Fiscale</h2>
            {isSaved && <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-200 animate-pulse">Registrato Correttamente ✓</span>}
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            <div className="space-y-10 order-2 lg:order-1">
              <div className="space-y-5 p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
                <div className="flex justify-between items-center">
                  <h3 className="text-[10px] font-black text-construction-brick uppercase tracking-[0.3em]">Selezione Anagrafica CRM</h3>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Input diretto o selezione DB</span>
                </div>
                <select 
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm h-14 shadow-sm"
                  value={formData.clientId}
                  onChange={(e) => handleSelectClient(e.target.value)}
                >
                  <option value="">-- Seleziona cliente dal database --</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Ragione Sociale / Cliente" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm h-14"
                    value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} />
                  <input type="tel" placeholder="Telefono / Cellulare" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm h-14"
                    value={formData.clientPhone} onChange={e => setFormData({...formData, clientPhone: e.target.value})} />
                </div>
                <input type="text" placeholder="Indirizzo Destinazione / Cantiere" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm h-14"
                  value={formData.clientAddress} onChange={e => setFormData({...formData, clientAddress: e.target.value})} />
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-construction-brick uppercase tracking-[0.3em]">Capitolato ed Elenco Lavori</h3>
                <textarea rows={7} placeholder="Descrivi qui i materiali, le voci di spesa e le attività..." 
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 focus:border-construction-sage outline-none font-bold text-sm resize-none leading-relaxed rounded-xl shadow-inner"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Importo Imponibile (€)</label>
                  <input type="number" placeholder="0.00" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 focus:border-construction-sage outline-none font-black text-2xl h-16 rounded-xl"
                    value={formData.subtotal} onChange={e => setFormData({...formData, subtotal: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Aliquote IVA</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 focus:border-construction-sage outline-none font-black text-2xl h-16 rounded-xl"
                    value={formData.taxRate} onChange={e => setFormData({...formData, taxRate: e.target.value})}>
                    <option value="4">4% - Agevolata</option>
                    <option value="10">10% - Ristrutturazione</option>
                    <option value="22">22% - Ordinaria</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <button onClick={() => handleSaveToArchive('BOZZA')} className="h-16 bg-construction-deep text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all border-b-4 border-slate-900 active:border-b-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                  Salva come Bozza
                </button>
                <button onClick={handleExportPDF} className="h-16 bg-construction-sage text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all border-b-4 border-emerald-800 active:border-b-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Scarica PDF Ufficiale
                </button>
              </div>
            </div>

            <div className="bg-slate-200 p-8 rounded-[3rem] border-2 border-dashed border-slate-300 overflow-hidden order-1 lg:order-2 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-6 px-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Render Anteprima A4
                </span>
                <span className="text-[10px] font-black text-construction-brick uppercase tracking-widest">N° {new Date().getFullYear()}/{String(lastQuoteNumber + 1).padStart(3, '0')}</span>
              </div>
              
              <div className="w-full overflow-x-auto shadow-[0_40px_80px_rgba(0,0,0,0.15)] rounded-sm">
                <div id="quote-document-content" className="bg-white p-14 md:p-20 min-h-[842px] min-w-[595px] quote-document text-[14px] relative flex flex-col">
                  <div className="flex justify-between items-start border-b-[6px] border-construction-sage pb-10 mb-12">
                    <div className="flex gap-6 items-start">
                      {companyData.logo && (
                        <img src={companyData.logo} alt="Logo" style="max-height: 80px; max-width: 150px; object-fit: contain;" />
                      )}
                      <div>
                        <h1 className="text-4xl font-black text-construction-deep tracking-tighter uppercase leading-none mb-4">
                          {companyData.logo ? companyData.name : 'EDILMODERN'}
                        </h1>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] leading-relaxed">
                          {companyData.name}<br/>
                          {companyData.address}<br/>
                          P.IVA {companyData.vat}<br/>
                          {companyData.email} | {companyData.phone}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-construction-brick uppercase tracking-tighter mb-2 italic">PREVENTIVO</div>
                      <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">DATA EMISSIONE: {formData.date}</div>
                    </div>
                  </div>

                  <div className="mb-14 bg-slate-50 p-8 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Destinatario della Proposta:</div>
                    <div className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3">{formData.clientName || '---'}</div>
                    <div className="text-sm text-slate-600 font-bold">{formData.clientAddress || '---'}</div>
                    <div className="text-sm text-slate-500 mt-1">Recapito: {formData.clientPhone || '---'}</div>
                  </div>

                  <div className="mb-16 flex-grow">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">Elenco Interventi e Capitolato:</div>
                    <div className="text-base text-slate-800 leading-relaxed whitespace-pre-line border-l-[6px] border-slate-100 pl-8 py-6 italic font-medium">
                      {formData.description || 'Descrizione lavori non inserita.'}
                    </div>
                  </div>

                  <div className="mt-auto pt-12 border-t-2 border-slate-100 space-y-4">
                    <div className="flex justify-between items-center text-slate-500 font-bold uppercase text-[11px] tracking-widest">
                      <span>Imponibile Totale Lavori</span>
                      <span className="text-slate-900">€ {parseFloat(formData.subtotal || '0').toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500 font-bold uppercase text-[11px] tracking-widest">
                      <span>IVA Applicata ({formData.taxRate}%)</span>
                      <span className="text-slate-900">€ {totals.taxAmount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t-2 border-slate-200">
                      <span className="text-sm font-black text-slate-400 uppercase tracking-[0.4em]">Totale Generale Offerta</span>
                      <span className="text-5xl font-black text-construction-deep tracking-tighter">€ {totals.total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <div className="mt-16 text-[9px] text-slate-400 text-center uppercase tracking-[0.2em] font-black border-t border-slate-50 pt-8">
                    Il presente documento non costituisce fattura. Validità offerta: 30gg. Generato con EdilModern ERP.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
