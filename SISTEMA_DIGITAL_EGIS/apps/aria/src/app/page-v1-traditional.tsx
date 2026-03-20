import React from 'react';

export default function Home() {
  return (
    <main className="font-body text-texto min-h-screen bg-crema">
      
      {/* TOPBAR */}
      <nav className="bg-verde-oscuro sticky top-0 z-[100] shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tierra rounded-md flex items-center justify-center font-display italic text-lg text-white font-light shrink-0">A</div>
            <div className="font-display font-light text-[17px] text-white/90 tracking-[0.3px]">
              ARIA
              <span className="text-[11px] block text-white/50 tracking-[1.5px] uppercase font-body -mt-px">por tu EGIS · MINVU</span>
            </div>
          </div>
          <a href="tel:+56222345678" className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-5 py-2 hover:bg-white/20 transition-colors text-sm text-white/85">
            <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-white/70 fill-none stroke-2 shrink-0" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92"/></svg>
            Llamar central
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-verde-oscuro relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-tierra/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-px left-0 right-0 h-10 md:h-20 bg-crema rounded-t-[40px] md:rounded-t-[80px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-5 pt-12 pb-24 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-tierra/20 border border-tierra/30 rounded-full py-1.5 px-4 text-xs font-semibold text-tierra-claro tracking-[1px] uppercase mb-6 fade-up">
              <div className="w-2 h-2 bg-tierra-medio rounded-full pulse-border"></div>
              Servicio gratuito · EGIS acreditada MINVU
            </div>
            <h1 className="font-display font-light text-[40px] md:text-[60px] leading-[1.1] text-white mb-6 fade-up delay-1">
              Mejora tu <em className="italic text-tierra-medio">vivienda</em><br/>con apoyo oficial
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-[1.6] mb-8 max-w-[500px] fade-up delay-2">
              Te acompañamos paso a paso en el proceso de <strong className="text-white/90 font-medium tracking-wide">reparación, ampliación o mejora</strong> de tu hogar con subsidios del Estado. Sin intermediarios dudosos, asesoría real.
            </p>
          </div>
          
          <div className="flex justify-center md:justify-end fade-up delay-3 relative z-10 hidden md:flex">
             <svg width="340" height="200" viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[440px] drop-shadow-2xl">
              <rect x="42" y="55" width="116" height="60" rx="3" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.3)" strokeWidth="1.5"/>
              <path d="M30 58 L100 18 L170 58" stroke="#E0A876" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <rect x="84" y="80" width="22" height="35" rx="2" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.3)" strokeWidth="1"/>
              <rect x="50" y="66" width="20" height="18" rx="2" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.25)" strokeWidth="1"/>
              <rect x="130" y="66" width="20" height="18" rx="2" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.25)" strokeWidth="1"/>
              <circle cx="158" cy="22" r="4" fill="#E0A876" opacity=".8"/>
              <circle cx="168" cy="30" r="2.5" fill="#E0A876" opacity=".5"/>
              <circle cx="150" cy="34" r="2" fill="#E0A876" opacity=".4"/>
              <path d="M28 85 L22 92 M22 92 L19 95 M28 85 L31 88" stroke="#E0A876" strokeWidth="1.8" strokeLinecap="round" opacity=".7"/>
              <circle cx="31" cy="82" r="4" stroke="#E0A876" strokeWidth="1.5" fill="none" opacity=".7"/>
            </svg>
          </div>
        </div>
      </section>

      {/* TWO COLUMN DOSSIER FOR DESKTOP */}
      <div className="max-w-7xl mx-auto px-5 py-4 md:py-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20">
        
        {/* QUICK ACTIONS PANEL (LEFT COL 7) */}
        <section className="lg:col-span-7 bg-crema">
          <p className="text-sm uppercase tracking-[3px] text-texto-tenue mb-6 font-semibold md:text-left text-center">Gestión a un Clic</p>
          
          <button className="w-full bg-verde-oscuro border-none rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 transition-all duration-300 hover:bg-verde hover:-translate-y-1 hover:shadow-xl mb-6 outline-none text-left fade-up group">
            <div className="w-16 h-16 shrink-0 bg-white/10 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-white fill-none stroke-[1.8px]"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white mb-2 font-display">Simula tu Subsidio con ARIA</h3>
              <p className="text-[15px] text-white/75 leading-[1.5]">Inicia un diagnóstico para saber qué programa del Estado (DS27, DS52, etc.) se adapta a ti.</p>
            </div>
            <div className="w-12 h-12 shrink-0 bg-white/15 rounded-full flex items-center justify-center group-hover:bg-white/25 transition-colors hidden md:flex">
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none stroke-[2.5px]"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </button>

          <div className="grid sm:grid-cols-2 gap-5">
            <button className="bg-white border-2 border-crema-oscuro rounded-2xl p-6 text-left transition-all duration-200 hover:border-tierra hover:bg-tierra-claro hover:-translate-y-1 hover:shadow-md flex flex-col gap-4 outline-none fade-up delay-1 group">
              <div className="w-14 h-14 rounded-xl bg-verde-claro flex items-center justify-center group-hover:bg-white/60 transition-colors shrink-0">
                <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-verde-oscuro fill-none stroke-[1.8px]"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-texto leading-[1.3] mb-2">Reparar mi casa</h3>
                <p className="text-[15px] text-texto-suave leading-[1.5]">DS27 · Para techumbres, filtraciones y estructural.</p>
              </div>
            </button>
            
            <button className="bg-white border-2 border-crema-oscuro rounded-2xl p-6 text-left transition-all duration-200 hover:border-tierra hover:bg-tierra-claro hover:-translate-y-1 hover:shadow-md flex flex-col gap-4 outline-none fade-up delay-2 group">
              <div className="w-14 h-14 rounded-xl bg-verde-claro flex items-center justify-center group-hover:bg-white/60 transition-colors shrink-0">
                 <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-verde-oscuro fill-none stroke-[1.8px]"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-texto leading-[1.3] mb-2">Ampliar vivienda</h3>
                <p className="text-[15px] text-texto-suave leading-[1.5]">Construcción de recintos, dormitorios o baños extra.</p>
              </div>
            </button>

            <button className="bg-white border-2 border-crema-oscuro rounded-2xl p-6 text-left transition-all duration-200 hover:border-tierra hover:bg-tierra-claro hover:-translate-y-1 hover:shadow-md flex flex-col gap-4 outline-none fade-up delay-3 group">
              <div className="w-14 h-14 rounded-xl bg-tierra-claro flex items-center justify-center group-hover:bg-white/60 transition-colors shrink-0">
                 <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-tierra-oscuro fill-none stroke-[1.8px]"><path d="M12 2v6M12 18v4M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-texto leading-[1.3] mb-2">Aislación térmica</h3>
                <p className="text-[15px] text-texto-suave leading-[1.5]">Ventanales térmicos y paneles solares (Eficiencia).</p>
              </div>
            </button>
            <button className="bg-white border-2 border-crema-oscuro rounded-2xl p-6 text-left transition-all duration-200 hover:border-tierra hover:bg-tierra-claro hover:-translate-y-1 hover:shadow-md flex flex-col gap-4 outline-none fade-up delay-4 group">
              <div className="w-14 h-14 rounded-xl bg-verde-claro flex items-center justify-center group-hover:bg-white/60 transition-colors shrink-0">
                 <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-verde-oscuro fill-none stroke-[1.8px]"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-texto leading-[1.3] mb-2">Mi Expediente</h3>
                <p className="text-[15px] text-texto-suave leading-[1.5]">Consulta de estado si ya ingresaste a nuestra EGIS.</p>
              </div>
            </button>
          </div>
        </section>

        {/* CHAT SECTION (RIGHT COL 5) */}
        <section className="lg:col-span-5 w-full sticky top-28 pt-8 lg:pt-0" id="chatSection">
          <p className="text-sm uppercase tracking-[3px] text-texto-tenue mb-6 font-semibold md:text-left text-center">Chat en Vivo</p>
          <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-crema-oscuro flex flex-col h-[600px] xl:h-[650px]">
            <div className="bg-verde-oscuro py-5 px-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-tierra rounded-full flex items-center justify-center font-display italic text-xl text-white font-light shrink-0">A</div>
              <div>
                <h4 className="text-base font-semibold text-white tracking-wide">ARIA · Asistente EGIS</h4>
                <p className="text-[13px] text-white/60 mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#5DD68A] rounded-full pulse-border shrink-0"></span>
                  Conectada y disponible
                </p>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-5 bg-crema-medio/20 overflow-y-auto">
              <div className="flex gap-4 items-end fade-up delay-2">
                <div className="w-10 h-10 bg-verde-oscuro rounded-full shrink-0 flex items-center justify-center text-sm font-display italic text-white pb-0.5">A</div>
                <div className="bg-white border border-crema-oscuro text-texto max-w-[85%] px-5 py-4 rounded-2xl rounded-bl-sm shadow-sm text-base leading-[1.6]">
                  Hola 👋 Soy ARIA, tu asistente especializado en el <strong>Sistema Digital EGIS</strong>. <br/><br/>
                  Puedo guiarte sin costo a través de los requisitos oficiales del MINVU para mejorar o reparar tu hogar.<br/><br/>
                  Cuéntame, ¿en qué buscas asesoría hoy?
                </div>
              </div>
            </div>
            
            <div className="bg-white border-t border-crema-oscuro p-5 pb-6 flex gap-3 items-center">
              <input type="text" placeholder="Ej. Quería arreglar el techo de mi casa..." className="flex-1 bg-crema border-2 border-crema-oscuro rounded-xl px-5 py-4 text-base font-body text-texto outline-none transition-colors focus:border-tierra focus:bg-white placeholder:text-texto-tenue appearance-none" />
              <button className="w-14 h-14 bg-tierra rounded-xl flex items-center justify-center hover:bg-tierra-oscuro hover:scale-105 active:scale-95 transition-all shrink-0 group">
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none stroke-[2.5px] -ml-0.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
