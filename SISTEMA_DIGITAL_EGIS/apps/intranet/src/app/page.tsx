import React from 'react';

export default function IntranetDashboard() {
  return (
    <div className="space-y-8 flex-1">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-guild-border pb-4 fade-up">
        <div>
          <h2 className="font-hud text-3xl font-bold text-white uppercase tracking-wider">Centro de Misiones</h2>
          <p className="text-guild-text mt-1 text-sm">Gremio EGIS central · Nivel de Gremio: Acreditado MINVU</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-guild-panel border border-guild-border px-4 py-2 rounded-lg text-center">
            <p className="text-[10px] uppercase tracking-widest text-guild-text font-bold mb-0.5">Expedientes Activos</p>
            <p className="font-hud text-2xl text-quest-active font-bold leading-none">142</p>
          </div>
          <div className="bg-guild-panel border border-quest-new/40 px-4 py-2 rounded-lg text-center shadow-[0_0_20px_rgba(251,191,36,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 bg-quest-new/5 animate-pulse"></div>
            <p className="relative z-10 text-[10px] uppercase tracking-widest text-quest-new font-bold mb-0.5">Nuevas Solicitudes</p>
            <p className="relative z-10 font-hud text-2xl text-quest-new font-bold leading-none">8</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* QUEST BOARD (Col 1-2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between fade-up delay-1">
            <h3 className="font-hud text-xl font-bold text-white uppercase flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-quest-new fill-none stroke-2"><path d="M14 2H6a2 2 0 0 0-2 2v16h16V8l-6-6z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
              Tablero de Solicitudes (ARIA)
            </h3>
            <button className="text-[11px] bg-guild-panel hover:bg-guild-border border border-guild-border px-3 py-1.5 rounded transition-colors text-guild-heading font-hud uppercase tracking-widest">
              Filtrar por Rango
            </button>
          </div>

          <div className="space-y-3">
            {/* Quest Item 1 */}
            <div className="bg-guild-panel border-l-4 border-quest-new rounded-r-lg p-5 hover:bg-guild-panel/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 fade-up delay-2 shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-quest-new/15 text-quest-new border border-quest-new/30 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-quest-new animate-pulse"></span> Misión Nueva
                  </span>
                  <span className="text-guild-text text-xs">Hace 15 min</span>
                </div>
                <h4 className="text-white font-semibold text-lg">Visita Técnica: Filtración de Techo</h4>
                <p className="text-sm text-guild-text mt-1 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>
                  Beneficiario: María Gonzalez (Tercera Edad) · Macul
                </p>
                <div className="mt-3 bg-guild-bg border border-magic-core/30 rounded p-2.5 flex gap-2">
                  <span className="text-magic-light font-hud text-lg leading-none shrink-0 border-r border-magic-core/30 pr-2 block">INTEL</span>
                  <p className="text-xs text-guild-text italic">"ARIA recogió: Alta urgencia por lluvias, RSH 40%, postulación DS27."</p>
                </div>
              </div>
              <button className="shrink-0 bg-magic-core hover:bg-magic-light text-white font-hud uppercase font-bold tracking-wider px-6 py-3 rounded shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2.5px]"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                Aceptar Misión
              </button>
            </div>

            {/* Quest Item 2 */}
            <div className="bg-guild-panel border-l-4 border-quest-urgent rounded-r-lg p-5 hover:bg-guild-panel/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 fade-up delay-3 shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-quest-urgent/15 text-quest-urgent border border-quest-urgent/30 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-quest-urgent animate-ping"></span> Misión Crítica
                  </span>
                  <span className="text-guild-text text-xs">Hace 2 horas</span>
                </div>
                <h4 className="text-white font-semibold text-lg">Evaluación Estructural: Ampliación DS52</h4>
                <p className="text-sm text-guild-text mt-1 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>
                  Beneficiario: Juan Pérez (Familia Numerosa) · Puente Alto
                </p>
                <div className="mt-3 bg-guild-bg border border-quest-urgent/30 rounded p-2.5 flex gap-2">
                  <span className="text-quest-urgent font-hud text-lg leading-none shrink-0 border-r border-quest-urgent/30 pr-2 block">ALERTA</span>
                  <p className="text-xs text-guild-text italic">"ARIA detectó: Riesgo de hacinamiento. Prioridad EGIS."</p>
                </div>
              </div>
              <button className="shrink-0 bg-transparent border border-quest-urgent text-quest-urgent hover:bg-quest-urgent hover:text-white font-hud uppercase font-bold tracking-wider px-6 py-3 rounded transition-all hover:scale-105 active:scale-95 flex items-center justify-center">
                Aceptar Misión
              </button>
            </div>
            
            {/* Quest Item 3 */}
            <div className="bg-guild-panel border-l-4 border-quest-complete rounded-r-lg p-4 opacity-60 fade-up delay-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <span className="bg-quest-complete/10 text-quest-complete px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">En Progreso</span>
                  <span className="text-guild-text text-xs">Tomada por Arq. R04 - Camila</span>
                </div>
                <h4 className="text-white font-medium text-base">Revisión de Paneles Solares Eficiencia</h4>
                <p className="text-xs text-guild-text mt-1">Familia Soto · La Florida</p>
              </div>
            </div>
          </div>
        </div>

        {/* SUBSIDY MANAGEMENT (Col 3) */}
        <div className="space-y-4 fade-up delay-1">
          <h3 className="font-hud text-xl font-bold text-white uppercase flex items-center gap-2">
             <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-quest-complete fill-none stroke-2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            Arca de Subsidios
          </h3>
          
          <div className="bg-guild-panel border border-guild-border rounded-xl overflow-hidden flex flex-col shadow-lg">
             <div className="p-4 border-b border-guild-border bg-guild-bg/80">
               <p className="text-[11px] text-guild-text leading-relaxed">
                 Control de la Matriz RAG. Apagar un subsidio lo ocultará de ARIA (Front-End) automáticamente para detener el flujo de leads públicos.
               </p>
             </div>

             {/* Subsidio 1 */}
             <div className="p-5 border-b border-guild-border relative overflow-hidden group">
               <div className="absolute inset-0 bg-magic-core/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative">
                 <div className="flex items-center justify-between mb-3">
                   <div>
                     <h4 className="text-white font-bold font-hud text-lg tracking-wide flex items-center gap-2">
                        Reparación DS27
                        <span className="w-2 h-2 rounded-full bg-quest-complete shadow-[0_0_5px_#10B981]"></span>
                     </h4>
                     <p className="text-[10px] text-guild-text uppercase tracking-widest mt-0.5">Nivel requerido: EGIS Activa</p>
                   </div>
                   {/* Toggle Switch */}
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer toggle-checkbox" defaultChecked />
                     <div className="w-11 h-6 bg-guild-bg border border-guild-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-guild-text peer-checked:after:bg-white after:border-guild-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all toggle-label"></div>
                   </label>
                 </div>
                 <div className="bg-guild-bg rounded border border-guild-border/50 p-3 text-xs text-guild-text space-y-2">
                   <p><span className="text-quest-complete font-bold">Estado de Aura (ARIA):</span> Promoviendo activamente en chat público. Flujo estable.</p>
                   <div className="flex justify-between items-end mt-2 pt-2 border-t border-guild-border/50">
                     <span>Max Beneficio: 450 UF.</span>
                     <button className="text-magic-light hover:text-white transition-colors underline decoration-magic-light/30">Grimorio Legal</button>
                   </div>
                 </div>
               </div>
             </div>

             {/* Subsidio 2 */}
             <div className="p-5 border-b border-guild-border relative overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
               <div className="relative">
                 <div className="flex items-center justify-between mb-3">
                   <div>
                     <h4 className="text-white font-bold font-hud text-lg tracking-wide flex items-center gap-2">
                        Ampliación DS52
                        <span className="w-2 h-2 rounded-full bg-guild-border"></span>
                     </h4>
                     <p className="text-[10px] text-guild-text uppercase tracking-widest mt-0.5">Nivel requerido: EGIS Activa</p>
                   </div>
                   {/* Toggle Switch */}
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer toggle-checkbox" />
                     <div className="w-11 h-6 bg-guild-bg border border-guild-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-guild-text peer-checked:after:bg-white after:border-guild-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all toggle-label"></div>
                   </label>
                 </div>
                 <div className="bg-guild-bg rounded border border-guild-border/50 p-3 text-xs text-guild-text space-y-2">
                   <p><span className="text-quest-urgent font-bold">Estado de Aura (ARIA):</span> Bloqueado. MINVU cerró concurso el mes pasado.</p>
                   <div className="flex justify-between items-end mt-2 pt-2 border-t border-guild-border/50">
                     <span>Sin cupos vigentes.</span>
                     <button className="text-magic-light hover:text-white transition-colors underline decoration-magic-light/30">Grimorio Legal</button>
                   </div>
                 </div>
               </div>
             </div>

             {/* Subsidio 3 */}
             <div className="p-5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-magic-core/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                 <div className="flex items-center justify-between mb-3">
                   <div>
                     <h4 className="text-white font-bold font-hud text-lg tracking-wide flex items-center gap-2">
                        Eficiencia Térmica
                        <span className="w-2 h-2 rounded-full bg-quest-complete shadow-[0_0_5px_#10B981]"></span>
                     </h4>
                     <p className="text-[10px] text-guild-text uppercase tracking-widest mt-0.5">Sistemas solares térmicos</p>
                   </div>
                   {/* Toggle Switch */}
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer toggle-checkbox" defaultChecked />
                     <div className="w-11 h-6 bg-guild-bg border border-guild-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-guild-text peer-checked:after:bg-white after:border-guild-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all toggle-label"></div>
                   </label>
                 </div>
                 <div className="bg-guild-bg rounded border border-guild-border/50 p-3 text-xs text-guild-text space-y-2">
                   <p><span className="text-quest-complete font-bold">Estado de Aura:</span> Promoviendo. Prioridad especial a R03.</p>
                   <div className="flex justify-between items-end mt-2 pt-2 border-t border-guild-border/50">
                     <span>Cupos Gremio restantes: 12</span>
                     <button className="text-magic-light hover:text-white transition-colors underline decoration-magic-light/30">Grimorio Legal</button>
                   </div>
                 </div>
               </div>
             </div>
             
          </div>
        </div>

      </div>
    </div>
  );
}
