import React from 'react';

export default function Home() {
  return (
    <main className="font-body text-texto min-h-screen bg-crema flex flex-col relative pb-24 md:pb-0">
      
      {/* TOPBAR */}
      <nav className="bg-verde-oscuro sticky top-0 z-[100] shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Story-ring avatar style */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5DD68A] to-tierra rounded-full animate-[spin_3s_linear_infinite] opacity-75 blur-[2px]"></div>
              <div className="w-10 h-10 bg-verde-profundo rounded-full flex items-center justify-center font-display italic text-lg text-white font-light shrink-0 relative z-10 border border-verde-oscuro shadow-inner">A</div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#5DD68A] rounded-full border-2 border-verde-oscuro z-20"></div>
            </div>
            
            <div className="font-display font-light text-[17px] text-white/90 tracking-[0.3px]">
              ARIA
              <span className="text-[11px] block text-white/50 tracking-[1.5px] uppercase font-body -mt-px">En línea ahora · MINVU</span>
            </div>
          </div>
          <a href="tel:+56222345678" className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 hover:bg-white/20 transition-colors text-sm text-white/90 font-medium">
            <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-white fill-none stroke-[2.5px] shrink-0" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92"/></svg>
            Llamar central
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-0 md:gap-8 px-0 md:px-5">
        
        {/* LEFT COLUMN: HERO (Desktop only or compressed on mobile) */}
        <section className="bg-verde-oscuro md:bg-transparent relative md:pt-16 pb-6 md:pb-10 pt-8 px-5 md:px-0 flex-1 flex flex-col justify-center">
          <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-tierra/5 blur-3xl pointer-events-none hidden md:block"></div>
          
          <div className="relative z-10 w-full">
            <h1 className="font-display font-light text-[28px] md:text-[56px] leading-[1.1] text-white md:text-texto mb-3 md:mb-6 fade-up">
              Mejora tu <em className="italic text-tierra-medio md:text-tierra">vivienda</em><br/>con apoyo de tu EGIS
            </h1>
            <p className="text-[15px] md:text-xl text-white/75 md:text-texto-suave leading-[1.5] mb-5 md:mb-8 md:max-w-[480px] fade-up delay-1 font-normal">
              Sin trámites confusos. Reparamos techos, ampliamos recintos e instalamos paneles solares con los subsidios del Estado.
            </p>

            {/* Quick Chips (Mobile horizontal scroll, desktop wrap) */}
            <div className="flex md:flex-wrap overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-2.5 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide shrink-0 fade-up delay-2 snap-x">
              <button className="snap-start shrink-0 flex items-center gap-2 bg-tierra hover:bg-tierra-oscuro transition-colors text-white py-2 px-4 rounded-full text-sm font-medium shadow-sm border border-tierra-oscuro/50">
                <span className="text-base leading-none">🛠️</span> Reparar mi techo
              </button>
              <button className="snap-start shrink-0 flex items-center gap-2 bg-white md:bg-crema-medio hover:bg-tierra-claro transition-colors text-texto md:text-texto border border-white/20 md:border-crema-oscuro py-2 px-4 rounded-full text-sm font-medium shadow-sm">
                <span className="text-base leading-none">🏠</span> Ampliar mi casa
              </button>
              <button className="snap-start shrink-0 flex items-center gap-2 bg-white md:bg-crema-medio hover:bg-tierra-claro transition-colors text-texto md:text-texto border border-white/20 md:border-crema-oscuro py-2 px-4 rounded-full text-sm font-medium shadow-sm">
                <span className="text-base leading-none">☀️</span> Paneles solares
              </button>
              <button className="snap-start shrink-0 flex items-center gap-2 bg-white md:bg-crema-medio hover:bg-tierra-claro transition-colors text-texto md:text-texto border border-white/20 md:border-crema-oscuro py-2 px-4 rounded-full text-sm font-medium shadow-sm">
                <span className="text-base leading-none">📌</span> Ver mi expediente
              </button>
            </div>
          </div>

          <div className="absolute -bottom-px left-0 right-0 h-6 bg-crema rounded-t-[24px] md:hidden"></div>
        </section>

        {/* RIGHT COLUMN: TIKTOK/WHATSAPP STYLE CHAT */}
        <section className="flex-[1.2] lg:flex-[0.8] w-full flex flex-col md:my-16 bg-crema md:bg-white md:rounded-[32px] md:shadow-2xl md:border md:border-crema-oscuro relative md:h-[650px] min-h-[500px]">
          
          <div className="hidden md:flex bg-verde-oscuro py-4 px-5 items-center gap-3 rounded-t-[32px]">
             <div className="w-10 h-10 bg-verde-profundo rounded-full flex items-center justify-center font-display italic text-lg text-white shrink-0 relative border border-verde-oscuro">A
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#5DD68A] rounded-full border-2 border-verde-oscuro z-20"></div>
             </div>
             <div><h4 className="text-[15px] font-semibold text-white tracking-wide leading-tight">ARIA Asistente</h4><p className="text-xs text-white/65 mt-0.5">En línea</p></div>
          </div>

          {/* Chat Flow Container */}
          <div className="flex-1 overflow-y-auto w-full px-5 py-6 md:p-6 flex flex-col gap-5 bg-crema md:bg-crema/30">
            <p className="text-center text-[11px] font-bold text-texto-tenue uppercase tracking-widest bg-crema-oscuro/20 py-1.5 px-3 rounded-full mx-auto w-max mb-2">Hoy</p>
            
            <div className="flex gap-3 items-end fade-up delay-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-tierra to-tierra-medio rounded-full shrink-0 flex items-center justify-center text-xs font-display italic text-white pb-0.5 shadow-md">A</div>
              <div className="bg-white border-[1.5px] border-crema-oscuro text-texto max-w-[85%] px-4 py-3 rounded-[20px] rounded-bl-[4px] shadow-sm text-[15px] leading-[1.5]">
                <p>¡Hola! 👋 Soy <strong>ARIA</strong>, tu asesora habitacional gratuita del Estado.</p>
              </div>
            </div>

            <div className="flex gap-3 items-end fade-up delay-4">
              <div className="w-8 h-8 bg-transparent shrink-0"></div>
              <div className="bg-white border-[1.5px] border-crema-oscuro text-texto max-w-[85%] px-4 py-3 rounded-[20px] rounded-tl-[4px] shadow-sm text-[15px] leading-[1.5]">
                <p>Veo que estás buscando apoyo para tu casa. Puedes <strong>tocar uno de los botones de arriba</strong> o simplemente escribirme tu duda aquí abajo 👇</p>
              </div>
            </div>
            
            {/* Typing Indicator Example */}
            <div className="flex gap-3 items-end opacity-70">
               <div className="w-8 h-8 bg-transparent shrink-0"></div>
               <div className="bg-crema-medio/50 text-texto px-4 py-2.5 rounded-full rounded-tl-[4px] flex gap-1 items-center h-[38px]">
                  <div className="w-1.5 h-1.5 bg-texto-suave rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-texto-suave rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-texto-suave rounded-full animate-bounce"></div>
               </div>
            </div>
          </div>

          {/* Sticky Mobile Input (WhatsApp style Thumb-zone) */}
          <div className="fixed md:absolute bottom-0 left-0 right-0 md:inset-auto md:w-full bg-crema md:bg-white border-t border-crema-oscuro p-3 md:p-5 flex gap-2 items-end md:rounded-b-[32px] pb-5 md:pb-5 z-50">
            <div className="flex-1 bg-white md:bg-crema border-2 border-crema-oscuro rounded-[24px] focus-within:border-tierra focus-within:ring-2 focus-within:ring-tierra/10 transition-all flex items-center overflow-hidden h-[52px]">
              <input type="text" placeholder="Escribe tu mensaje aquí..." className="w-full h-full bg-transparent px-5 py-2 text-[15px] font-body text-texto outline-none placeholder:text-texto-tenue appearance-none" />
            </div>
            <button className="w-[52px] h-[52px] bg-tierra rounded-full flex items-center justify-center hover:bg-tierra-oscuro active:scale-90 transition-all shrink-0 shadow-lg group">
              <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-white fill-white -ml-0.5 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z"/></svg>
            </button>
          </div>

        </section>
      </div>

    </main>
  );
}
