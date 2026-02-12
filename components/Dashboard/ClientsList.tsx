
import React, { useState } from 'react';
import { Client, Quote, CompanyData } from '../../types';

interface ClientsListProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  quotes: Quote[];
  companyData: CompanyData;
}

export const ClientsList: React.FC<ClientsListProps> = ({ clients, setClients, quotes, companyData }) => {
  const [newClient, setNewClient] = useState<Partial<Client>>({ name: '', vat: '', address: '', phone: '', email: '', notes: '' });
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [expandedClientId, setExpandedClientId] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name) return;
    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name || '',
      vat: newClient.vat || '',
      address: newClient.address || '',
      phone: newClient.phone || '',
      email: newClient.email || '',
      notes: newClient.notes || '',
    };
    setClients([...clients, client]);
    setNewClient({ name: '', vat: '', address: '', phone: '', email: '', notes: '' });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient || !editingClient.name) return;
    setClients(clients.map(c => c.id === editingClient.id ? editingClient : c));
    setEditingClient(null);
  };

  const removeClient = (id: string) => {
    if (window.confirm("Attenzione: rimuovendo il cliente perderai il collegamento storico nell'anagrafica. Continuare?")) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const getClientQuotes = (clientId: string) => {
    return quotes.filter(q => q.clientId === clientId);
  };

  const handleExportClientsPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; color: #333;">
        <div style="border-bottom: 3px solid #52796F; padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="margin: 0; color: #2F3E46;">Database Anagrafico Clienti</h1>
            <p style="margin: 5px 0; font-size: 12px; color: #666;">${companyData.name} - Report Gestionale</p>
          </div>
          <div style="text-align: right; font-size: 10px; color: #999;">
            Data Report: ${new Date().toLocaleDateString('it-IT')}
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
          <thead>
            <tr style="background: #f8f9fa; text-align: left;">
              <th style="padding: 10px; border-bottom: 1px solid #ddd;">Ragione Sociale</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd;">P.IVA</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd;">Indirizzo</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd;">Contatto</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">N° Prev.</th>
            </tr>
          </thead>
          <tbody>
            ${clients.map(c => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><b>${c.name}</b></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${c.vat || '-'}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${c.address || '-'}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${c.phone}<br/>${c.email}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${getClientQuotes(c.id).length}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    const opt = {
      margin: 10,
      filename: `Database_Clienti_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  const handleExportSingleClientHistoryPDF = (client: Client) => {
    const history = getClientQuotes(client.id);
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; color: #333;">
        <div style="border-bottom: 4px solid #C97B36; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1 style="margin: 0; color: #2F3E46; font-size: 22px;">SCHEDA STORICA CLIENTE</h1>
            <p style="margin: 5px 0; font-size: 11px; color: #666;">${companyData.name} - Sistema Gestionale ERP</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 10px; color: #999; text-transform: uppercase;">Data Emissione Report</p>
            <p style="margin: 0; font-size: 12px; font-weight: bold;">${new Date().toLocaleDateString('it-IT')}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 40px; background: #fcfcfc; padding: 25px; border: 1px solid #eee; border-radius: 12px;">
          <h3 style="text-transform: uppercase; font-size: 10px; color: #C97B36; margin: 0 0 15px 0; letter-spacing: 1px;">Anagrafica Cliente</h3>
          <p style="font-size: 18px; font-weight: 900; margin: 0; color: #2F3E46;">${client.name}</p>
          ${client.vat ? `<p style="font-size: 12px; color: #555; margin: 5px 0;">P.IVA: ${client.vat}</p>` : ''}
          <p style="font-size: 12px; color: #555; margin: 5px 0;">Indirizzo: ${client.address || 'N/D'}</p>
          <p style="font-size: 12px; color: #555; margin: 5px 0;">Contatti: ${client.phone} | ${client.email || 'N/D'}</p>
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed #ddd;">
            <p style="font-size: 10px; font-weight: bold; color: #999; text-transform: uppercase;">Note Interne:</p>
            <p style="font-size: 11px; color: #666; font-style: italic;">${client.notes || 'Nessuna nota registrata.'}</p>
          </div>
        </div>

        <h3 style="text-transform: uppercase; font-size: 10px; color: #2F3E46; margin-bottom: 15px; letter-spacing: 1px;">Cronologia Documenti Emessi</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
          <thead>
            <tr style="background: #f8f9fa; text-align: left;">
              <th style="padding: 12px; border-bottom: 2px solid #ddd;">Numero</th>
              <th style="padding: 12px; border-bottom: 2px solid #ddd;">Data</th>
              <th style="padding: 12px; border-bottom: 2px solid #ddd;">Stato</th>
              <th style="padding: 12px; border-bottom: 2px solid #ddd; text-align: right;">Importo Lordo</th>
            </tr>
          </thead>
          <tbody>
            ${history.length > 0 ? history.map(q => `
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #C97B36;">${q.number}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${q.date}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                  <span style="font-size: 8px; font-weight: 900; text-transform: uppercase;">${q.status}</span>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">€ ${q.total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</td>
              </tr>
            `).join('') : '<tr><td colspan="4" style="padding: 30px; text-align: center; color: #999;">Nessun preventivo trovato per questo cliente.</td></tr>'}
          </tbody>
          ${history.length > 0 ? `
          <tfoot>
            <tr style="background: #2F3E46; color: white;">
              <td colspan="3" style="padding: 15px 12px; text-align: right; font-weight: bold; text-transform: uppercase; font-size: 9px;">Totale Storico Fatturato:</td>
              <td style="padding: 15px 12px; text-align: right; font-weight: 900; font-size: 14px;">
                € ${history.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tfoot>
          ` : ''}
        </table>
      </div>
    `;

    const opt = {
      margin: 10,
      filename: `Storico_Cliente_${client.name.replace(/\s+/g, '_')}.pdf`,
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
          <h3 className="text-2xl font-black text-construction-deep uppercase tracking-tighter">Database Clienti</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Gestione anagrafiche e storico lavori.</p>
        </div>
        <button 
          onClick={handleExportClientsPDF}
          className="w-full md:w-auto px-6 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3 h-12"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Esporta Lista PDF
        </button>
      </div>

      {/* Form di Inserimento o Modifica */}
      <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
        <h4 className="font-black text-construction-deep uppercase tracking-tighter text-sm mb-8 flex items-center gap-3">
          <span className="w-8 h-8 bg-construction-sage text-white rounded-lg flex items-center justify-center">
            {editingClient ? '✎' : '+'}
          </span>
          {editingClient ? `Modifica Anagrafica: ${editingClient.name}` : 'Registra Nuovo Cliente nel CRM'}
        </h4>
        <form onSubmit={editingClient ? handleUpdate : handleAdd} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nominativo / Azienda *</label>
              <input 
                type="text" 
                placeholder="Es: Rossi S.r.l." 
                value={editingClient ? editingClient.name : newClient.name} 
                onChange={e => editingClient ? setEditingClient({...editingClient, name: e.target.value}) : setNewClient({...newClient, name: e.target.value})} 
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-construction-sage h-14" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Partita IVA (Opzionale)</label>
              <input 
                type="text" 
                placeholder="IT01234567890" 
                value={editingClient ? (editingClient.vat || '') : (newClient.vat || '')} 
                onChange={e => editingClient ? setEditingClient({...editingClient, vat: e.target.value}) : setNewClient({...newClient, vat: e.target.value})} 
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-construction-sage h-14" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Indirizzo di Riferimento Completo</label>
              <input 
                type="text" 
                placeholder="Città, Via, CAP..." 
                value={editingClient ? editingClient.address : newClient.address} 
                onChange={e => editingClient ? setEditingClient({...editingClient, address: e.target.value}) : setNewClient({...newClient, address: e.target.value})} 
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-construction-sage h-14" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefono</label>
              <input 
                type="tel" 
                placeholder="+39" 
                value={editingClient ? editingClient.phone : newClient.phone} 
                onChange={e => editingClient ? setEditingClient({...editingClient, phone: e.target.value}) : setNewClient({...newClient, phone: e.target.value})} 
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-construction-sage h-14" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input 
                type="email" 
                placeholder="cliente@email.it" 
                value={editingClient ? editingClient.email : newClient.email} 
                onChange={e => editingClient ? setEditingClient({...editingClient, email: e.target.value}) : setNewClient({...newClient, email: e.target.value})} 
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-construction-sage h-14" 
              />
            </div>
            <div className="space-y-1.5 md:col-span-2 lg:col-span-3">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Note Libere (Capitolato, accordi speciali, etc.)</label>
              <textarea 
                placeholder="Inserisci qui eventuali note sul cliente..." 
                value={editingClient ? (editingClient.notes || '') : (newClient.notes || '')} 
                onChange={e => editingClient ? setEditingClient({...editingClient, notes: e.target.value}) : setNewClient({...newClient, notes: e.target.value})} 
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl outline-none font-bold text-sm focus:border-construction-sage min-h-[100px] resize-none" 
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            {editingClient && (
              <button 
                type="button" 
                onClick={() => setEditingClient(null)} 
                className="px-10 py-4 bg-white border border-slate-200 text-slate-400 rounded-xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-100 transition-all h-14"
              >
                Annulla
              </button>
            )}
            <button type="submit" className="px-10 py-4 bg-construction-deep text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] hover:bg-construction-sage transition-all h-14 shadow-xl">
              {editingClient ? 'Aggiorna Cliente' : 'Salva in Database'}
            </button>
          </div>
        </form>
      </div>

      {/* Elenco Clienti */}
      <div className="space-y-4">
        {clients.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {clients.map(c => {
              const clientQuotes = getClientQuotes(c.id);
              const isExpanded = expandedClientId === c.id;

              return (
                <div key={c.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div 
                    onClick={() => setExpandedClientId(isExpanded ? null : c.id)}
                    className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-construction-sage text-xl">
                        {c.name.substring(0, 1)}
                      </div>
                      <div>
                        <div className="font-black text-construction-deep uppercase text-sm tracking-tighter flex items-center gap-2">
                          {c.name}
                          {c.vat && <span className="text-[8px] px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full font-bold">P.IVA: {c.vat}</span>}
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                          {c.phone} {c.email && `| ${c.email}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center mr-4">
                        <div className="text-lg font-black text-construction-brick">{clientQuotes.length}</div>
                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Prev.</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setEditingClient(c); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="p-3 text-slate-400 hover:text-construction-sage transition-colors"
                          title="Modifica Anagrafica"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeClient(c.id); }}
                          className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                          title="Elimina Cliente"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                        <div className={`transition-transform duration-300 text-slate-400 p-2 ${isExpanded ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="bg-slate-50/50 p-6 md:p-8 border-t border-slate-50 animate-in fade-in slide-in-from-top-4">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-4">
                          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dettagli Anagrafici</h5>
                          <div className="space-y-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <div>
                              <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Indirizzo di Riferimento</span>
                              <span className="text-xs font-bold text-slate-700 leading-relaxed">{c.address || 'Non specificato'}</span>
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Note Riservate</span>
                              <div className="text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-line">
                                {c.notes || 'Nessuna nota presente per questo cliente.'}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:col-span-2 space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Storico Documenti</h5>
                            <button 
                              onClick={() => handleExportSingleClientHistoryPDF(c)}
                              className="text-[9px] font-black text-construction-sage uppercase tracking-widest flex items-center gap-2 hover:bg-white px-3 py-1.5 rounded-lg transition-all"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              Scarica Report PDF
                            </button>
                          </div>
                          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                            {clientQuotes.length > 0 ? (
                              <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                  <tr>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase">N° Doc</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase">Data</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase text-right">Totale</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                  {clientQuotes.map(q => (
                                    <tr key={q.id}>
                                      <td className="px-4 py-3 text-xs font-black text-construction-brick">{q.number}</td>
                                      <td className="px-4 py-3 text-xs font-bold text-slate-500">{q.date}</td>
                                      <td className="px-4 py-3 text-xs font-black text-slate-900 text-right">€ {q.total.toLocaleString('it-IT')}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="bg-slate-50">
                                  <tr>
                                    <td colSpan={2} className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase text-right">Totale Storico</td>
                                    <td className="px-4 py-3 text-sm font-black text-construction-deep text-right">
                                      € {clientQuotes.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('it-IT')}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            ) : (
                              <div className="p-10 text-center text-slate-300 font-bold uppercase text-[10px] tracking-widest italic">
                                Nessun preventivo associato.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
            <div className="text-5xl mb-4 opacity-20 grayscale">👥</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Database Clienti Vuoto</div>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-2">Inizia aggiungendo il primo cliente sopra.</p>
          </div>
        )}
      </div>
    </div>
  );
};
