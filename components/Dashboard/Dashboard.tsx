
import React, { useState } from 'react';
import { User, CompanyData, Worker, Quote, Client, QuoteStatus } from '../../types';
import { CompanySettings } from './CompanySettings';
import { WorkersList } from './WorkersList';
import { QuotesArchive } from './QuotesArchive';
import { ClientsList } from './ClientsList';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  companyData: CompanyData;
  setCompanyData: React.Dispatch<React.SetStateAction<CompanyData>>;
  workers: Worker[];
  setWorkers: React.Dispatch<React.SetStateAction<Worker[]>>;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  quotes: Quote[];
  onDeleteQuote: (id: string) => void;
  onNewQuote: () => void;
  onUpdateQuoteStatus: (id: string, status: QuoteStatus) => void;
}

type Tab = 'QUOTES' | 'CLIENTS' | 'WORKERS' | 'SETTINGS';

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, onLogout, companyData, setCompanyData, workers, setWorkers, 
  clients, setClients, quotes, onDeleteQuote, onNewQuote, onUpdateQuoteStatus 
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('QUOTES');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'QUOTES', label: 'Archivio Preventivi', icon: '📄' },
    { id: 'CLIENTS', label: 'Database Clienti', icon: '👥' },
    { id: 'WORKERS', label: 'Squadra & Personale', icon: '👷' },
    { id: 'SETTINGS', label: 'Profilo Azienda', icon: '🏢' },
  ];

  const handleTabChange = (tabId: Tab) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-construction-deep text-white p-4 flex justify-between items-center shadow-lg shrink-0 z-[70]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-construction-sage rounded flex items-center justify-center font-black">E</div>
          <span className="font-black uppercase tracking-tighter text-xs">EdilModern Admin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Sidebar Overlay mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-[65] lg:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-0 lg:relative lg:flex z-[70] lg:z-50 w-80 bg-construction-deep text-white flex flex-col shadow-2xl transition-transform duration-300 transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 lg:p-10 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-construction-sage rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg">E</div>
            <div>
              <span className="text-xl font-black uppercase tracking-tighter block leading-none">ERP<span className="text-construction-sage">System</span></span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Gestione Operativa v2.0</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
          <button onClick={() => { onNewQuote(); setIsMobileMenuOpen(false); }}
            className="w-full py-4 bg-construction-brick text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all mb-8 flex items-center justify-center gap-2">
            <span className="text-xl">+</span> Crea Preventivo
          </button>

          <nav className="space-y-2">
            {menuItems.map(item => (
              <button key={item.id} onClick={() => handleTabChange(item.id as Tab)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-construction-sage text-white shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}>
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/5 bg-slate-900/50">
          <div className="flex items-center gap-4 px-4 py-4 mb-4">
            <div className="w-10 h-10 bg-construction-sage/20 rounded-xl flex items-center justify-center font-black text-construction-sage border border-construction-sage/30">
              {user.firstName[0]}
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] font-black truncate uppercase tracking-tighter text-white">{user.firstName} {user.lastName}</div>
              <div className="text-[8px] text-slate-500 truncate font-bold">{user.email}</div>
            </div>
          </div>
          <button onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-red-400 hover:bg-red-400/10 transition-all">
            🚪 Disconnetti Account
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-grow p-4 md:p-12 lg:p-16 overflow-y-auto">
        <header className="mb-10 border-b border-slate-200 pb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-construction-deep uppercase tracking-tighter">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Accesso Amministratore Riservato EdilModern</p>
          </div>
        </header>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 md:p-12 min-h-full">
          {activeTab === 'QUOTES' && (
            <QuotesArchive 
              quotes={quotes} 
              onDelete={onDeleteQuote} 
              companyData={companyData} 
              onUpdateStatus={onUpdateQuoteStatus}
              onNewQuote={onNewQuote}
            />
          )}
          {activeTab === 'CLIENTS' && (
            <ClientsList 
              clients={clients} 
              setClients={setClients} 
              quotes={quotes} 
              companyData={companyData}
            />
          )}
          {activeTab === 'WORKERS' && <WorkersList workers={workers} onUpdate={setWorkers} />}
          {activeTab === 'SETTINGS' && <CompanySettings data={companyData} onSave={setCompanyData} user={user} />}
        </div>
      </main>
    </div>
  );
};
