
import React, { useState } from 'react';
import { User } from '../../types';

interface LoginProps {
  onLoginSuccess: (email: string, pass: string) => boolean;
  onRegisterSuccess: (user: User) => void;
  isRegistered: boolean;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onRegisterSuccess, isRegistered }) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>(isRegistered ? 'LOGIN' : 'REGISTER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (mode === 'REGISTER') {
        onRegisterSuccess({
          id: 'owner-' + Date.now(),
          email,
          firstName,
          lastName
        });
      } else {
        const success = onLoginSuccess(email, password);
        if (!success) setError('Accesso negato: credenziali non valide.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-construction-deep flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 to-transparent">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] p-10 md:p-14 border-t-[10px] border-construction-sage relative">
        
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-construction-deep rounded-3xl flex items-center justify-center text-white font-black text-4xl mx-auto mb-6 shadow-2xl border-b-4 border-construction-sage">E</div>
          <h1 className="text-3xl font-black text-construction-deep uppercase tracking-tighter">
            {mode === 'LOGIN' ? 'Accesso ERP' : 'Primo Setup'}
          </h1>
          <p className="text-slate-400 mt-2 font-bold text-[10px] uppercase tracking-[0.3em]">
            {mode === 'LOGIN' ? 'Gestionale Privato EdilModern' : 'Configura il profilo Titolare'}
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 border-red-100 animate-bounce">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'REGISTER' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome</label>
                <input required type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm h-14" placeholder="Es: Mario" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Cognome</label>
                <input required type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm h-14" placeholder="Es: Rossi" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Aziendale</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm h-14" placeholder="titolare@email.it" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-construction-sage outline-none font-bold text-sm h-14" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-5 bg-construction-sage text-white rounded-2xl font-black text-base hover:bg-construction-deep transition-all shadow-xl uppercase tracking-widest h-16 flex items-center justify-center border-b-4 border-emerald-800 active:border-b-0">
            {loading ? <span className="animate-spin text-2xl">⌛</span> : (mode === 'LOGIN' ? 'Entra nel Gestionale' : 'Completa Registrazione')}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          {mode === 'LOGIN' ? (
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
              Account non configurato?{' '}
              <button 
                onClick={() => !isRegistered && setMode('REGISTER')}
                disabled={isRegistered}
                className={`text-construction-brick ml-1 ${isRegistered ? 'opacity-30 cursor-not-allowed' : 'hover:underline underline-offset-4'}`}
              >
                {isRegistered ? 'Registrazioni Chiuse' : 'Registrati'}
              </button>
            </p>
          ) : (
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Profilo esistente?{' '}
              <button onClick={() => setMode('LOGIN')} className="text-construction-brick ml-1 hover:underline underline-offset-4">Torna al Login</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
