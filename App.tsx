
import React, { useState, useEffect } from 'react';
import { Login } from './components/Auth/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { QuoteModal } from './components/QuoteModal';
import { User, CompanyData, Worker, Quote, Client, QuoteStatus } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // LOGICA DATABASE (Simulazione robusta)
  const [dbUser, setDbUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('edil_erp_owner');
    return saved ? JSON.parse(saved) : null;
  });

  const [companyData, setCompanyData] = useState<CompanyData>(() => {
    const saved = localStorage.getItem('edil_erp_company');
    return saved ? JSON.parse(saved) : {
      name: "EdilModern S.r.l.",
      vat: "",
      address: "",
      phone: "",
      email: ""
    };
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('edil_erp_clients');
    return saved ? JSON.parse(saved) : [];
  });

  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const saved = localStorage.getItem('edil_erp_quotes');
    return saved ? JSON.parse(saved) : [];
  });

  const [workers, setWorkers] = useState<Worker[]>(() => {
    const saved = localStorage.getItem('edil_erp_workers');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistenza Dati Unificata
  useEffect(() => {
    if (dbUser) localStorage.setItem('edil_erp_owner', JSON.stringify(dbUser));
    localStorage.setItem('edil_erp_company', JSON.stringify(companyData));
    localStorage.setItem('edil_erp_clients', JSON.stringify(clients));
    localStorage.setItem('edil_erp_quotes', JSON.stringify(quotes));
    localStorage.setItem('edil_erp_workers', JSON.stringify(workers));
    setIsInitializing(false);
  }, [dbUser, companyData, clients, quotes, workers]);

  const handleRegister = (userData: User) => {
    setDbUser(userData);
    setUser(userData);
  };

  const handleLogin = (email: string, pass: string) => {
    // In produzione: validazione via backend hash
    if (dbUser && dbUser.email === email) {
      setUser(dbUser);
      return true;
    }
    return false;
  };

  const handleLogout = () => setUser(null);

  const handleSaveQuote = (newQuote: Quote) => {
    setQuotes(prev => [newQuote, ...prev]);
  };

  const handleDeleteQuote = (id: string) => {
    if (window.confirm("⚠️ ELIMINAZIONE DEFINITIVA: Questa azione cancellerà il documento dall'archivio. Confermi?")) {
      setQuotes(prev => prev.filter(q => q.id !== id));
    }
  };

  const handleUpdateQuoteStatus = (id: string, status: QuoteStatus) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  if (isInitializing) return (
    <div className="min-h-screen bg-construction-deep flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-construction-sage border-t-transparent rounded-full animate-spin"></div>
        <span className="text-white font-black uppercase tracking-widest text-[10px]">Inizializzazione EdilModern ERP...</span>
      </div>
    </div>
  );

  if (!user) {
    return (
      <Login 
        onLoginSuccess={handleLogin} 
        onRegisterSuccess={handleRegister}
        isRegistered={!!dbUser}
      />
    );
  }

  const currentYear = new Date().getFullYear();
  const yearlyQuotes = quotes.filter(q => q.number.startsWith(currentYear.toString()));
  const lastNumber = yearlyQuotes.length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Dashboard 
        user={user} 
        onLogout={handleLogout}
        companyData={companyData}
        setCompanyData={setCompanyData}
        clients={clients}
        setClients={setClients}
        quotes={quotes}
        onDeleteQuote={handleDeleteQuote}
        onNewQuote={() => setIsQuoteModalOpen(true)}
        onUpdateQuoteStatus={handleUpdateQuoteStatus}
        workers={workers}
        setWorkers={setWorkers} 
      />

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        companyData={companyData}
        clients={clients}
        lastQuoteNumber={lastNumber}
        onSave={handleSaveQuote}
      />
    </div>
  );
};

export default App;
