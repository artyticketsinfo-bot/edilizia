
import React from 'react';

interface ServiceItemProps {
  title: string;
  icon: string;
  desc: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, icon, desc }) => (
  <div className="bg-white p-10 border-b-4 border-slate-200 hover:border-construction-sage shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block grayscale group-hover:grayscale-0">{icon}</div>
    <h3 className="text-2xl font-black text-construction-deep mb-4 uppercase tracking-tighter">{title}</h3>
    <p className="text-slate-500 text-base leading-relaxed font-medium">{desc}</p>
  </div>
);

export const Services: React.FC = () => {
  const services = [
    { title: "Opere Murarie", icon: "🏠", desc: "Realizzazione di murature perimetrali e divisorie ad alta efficienza termica." },
    { title: "Fondamenta", icon: "🚜", desc: "Scavi e gettate per fondamenta a platea o isolate con precisione millimetrica." },
    { title: "Cemento Armato", icon: "🏢", desc: "Strutture portanti complesse realizzate secondo i più alti standard antisismici." },
    { title: "Muratura Pesante", icon: "🧱", desc: "Pareti strutturali e tamponature per edifici civili e industriali." },
    { title: "Ampliamenti", icon: "📐", desc: "Integrazioni volumetriche progettate per fondersi perfettamente con l'esistente." },
    { title: "Consolidamento", icon: "🛡️", desc: "Interventi di miglioramento statico e sismico per edifici sicuri nel tempo." },
  ];

  return (
    <section id="servizi" className="py-32 px-4 bg-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <span className="text-construction-sage font-black uppercase tracking-[0.4em] text-sm">Cosa Facciamo</span>
          <h2 className="text-5xl font-black text-construction-deep uppercase tracking-tighter">Servizi Strutturali</h2>
          <div className="w-24 h-2 bg-construction-sage mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {services.map((s, i) => (
            <ServiceItem key={i} title={s.title} icon={s.icon} desc={s.desc} />
          ))}
        </div>
      </div>
    </section>
  );
};
