
import React, { useState } from 'react';
import { CompanyData, User } from '../../types';
import html2pdf from 'html2pdf.js';

interface CompanySettingsProps {
  data: CompanyData;
  onSave: (newData: CompanyData) => void;
  user: User;
}

export const CompanySettings: React.FC<CompanySettingsProps> = ({ data, onSave, user }) => {
  const [form, setForm] = useState(data);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportCompanyPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 50px; font-family: sans-serif; color: #2F3E46;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 5px solid #52796F; padding-bottom: 20px; margin-bottom: 40px;">
          <div>
            <h1 style="margin: 0; font-size: 28px; text-transform: uppercase;">Scheda Aziendale Identificativa</h1>
            <p style="margin: 5px 0; color: #666; font-size: 14px;">Documento ad uso interno gestionale ERP</p>
          </div>
          ${form.logo ? `<img src="${form.logo}" style="max-height: 60px; max-width: 150px; object-fit: contain;" />` : ''}
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
          <div style="background: #f8f9fa; padding: 30px; border-radius: 15px;">
            <h3 style="text-transform: uppercase; font-size: 12px; color: #52796F; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">Dati Fiscali Azienda</h3>
            <p style="margin: 10px 0;"><b>Ragione Sociale:</b><br/>${form.name}</p>
            <p style="margin: 10px 0;"><b>Partita IVA:</b><br/>${form.vat}</p>
            <p style="margin: 10px 0;"><b>Sede Legale:</b><br/>${form.address}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 15px;">
            <h3 style="text-transform: uppercase; font-size: 12px; color: #52796F; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">Contatti Ufficiali</h3>
            <p style="margin: 10px 0;"><b>Telefono:</b><br/>${form.phone}</p>
            <p style="margin: 10px 0;"><b>Email:</b><br/>${form.email}</p>
            <p style="margin: 10px 0;"><b>Amministratore:</b><br/>${user.firstName} ${user.lastName}</p>
          </div>
        </div>
        
        <div style="margin-top: 60px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
          <p style="font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 2px;">
            Generato da EdilModern ERP il ${new Date().toLocaleDateString('it-IT')} alle ore ${new Date().toLocaleTimeString('it-IT')}
          </p>
        </div>
      </div>
    `;

    const opt = {
      margin: 10,
      filename: `Scheda_Aziendale_${form.name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="space-y-16 animate-in">
      <section className="bg-construction-deep p-10 rounded-3xl border-b-8 border-construction-sage shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <h3 className="text-[10px] font-black text-construction-sage uppercase tracking-[0.4em] mb-8 relative z-10">Profilo Amministratore</h3>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-xl text-white flex items-center justify-center text-4xl font-black rounded-3xl border border-white/20 shadow-inner">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div className="space-y-2 text-center md:text-left">
            <div className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{user.firstName} {user.lastName}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{user.email}</div>
            <div className="inline-flex mt-4 px-4 py-1.5 bg-construction-sage/20 text-construction-sage text-[9px] font-black rounded-full uppercase tracking-widest border border-construction-sage/30">Privilegi Super-User Attivi</div>
          </div>
        </div>
      </section>

      <section>
        <div className="border-b border-slate-100 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black text-construction-deep uppercase tracking-tighter">Anagrafica Aziendale</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Dati fiscali utilizzati per l'intestazione dei documenti ufficiali.</p>
          </div>
          <button 
            onClick={handleExportCompanyPDF}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Esporta PDF
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Ragione Sociale</label>
              <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm shadow-sm" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Partita IVA</label>
              <input required type="text" value={form.vat} onChange={e => setForm({...form, vat: e.target.value})}
                className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm shadow-sm" />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">URL Logo Aziendale (Link immagine)</label>
              <input type="url" value={form.logo || ''} onChange={e => setForm({...form, logo: e.target.value})}
                placeholder="https://esempio.it/logo.png"
                className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm shadow-sm" />
              {form.logo && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block">
                  <img src={form.logo} alt="Preview Logo" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                </div>
              )}
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Sede Legale</label>
              <input required type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm shadow-sm" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Telefono</label>
              <input required type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm shadow-sm" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Ufficio</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm shadow-sm" />
            </div>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row items-center gap-8">
            <button type="submit" className="w-full sm:w-auto px-16 py-6 bg-construction-brick text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-construction-deep transition-all h-20 border-b-4 border-amber-900 active:border-b-0">
              💾 Salva nel Database
            </button>
            
            {saved && (
              <div className="text-construction-sage font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-3 animate-in">
                <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-lg">✓</span>
                Dati Aziendali Sincronizzati
              </div>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};
