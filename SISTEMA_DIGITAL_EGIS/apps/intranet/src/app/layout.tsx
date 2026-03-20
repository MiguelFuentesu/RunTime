import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["500", "600", "700"], 
  variable: "--font-rajdhani" 
});

export const metadata: Metadata = {
  title: "Gremio EGIS · Tablero de Misiones",
  description: "Intranet corporativa y gestión de expedientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${rajdhani.variable}`}>
      <body className="bg-guild-bg text-guild-text min-h-screen flex flex-col">
        {/* Top Navbar / Guild Banner */}
        <header className="h-16 bg-guild-panel border-b border-guild-border flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-magic-dark rounded flex items-center justify-center border border-magic-light shadow-[0_0_10px_rgba(99,102,241,0.5)]">
              <span className="font-hud font-bold text-white text-lg leading-none mt-0.5">EG</span>
            </div>
            <h1 className="font-hud text-xl font-bold text-guild-heading tracking-wide uppercase">Gremio <span className="text-magic-light">EGIS</span></h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-quest-complete shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="text-xs font-hud font-bold uppercase tracking-widest text-quest-complete">Sistema Online</span>
            </div>
            <div className="h-8 w-px bg-guild-border"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-guild-heading leading-tight">Arq. Maestro</p>
                <p className="text-xs text-guild-text">Rango 04</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-quest-new bg-guild-bg flex items-center justify-center text-quest-new">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Menu */}
          <aside className="w-64 bg-guild-panel border-r border-guild-border flex flex-col pt-6 hidden md:flex shrink-0">
             <nav className="flex-1 px-4 flex flex-col gap-2">
                <a href="#" className="flex items-center gap-3 bg-magic-dark/20 text-magic-light px-4 py-3 rounded-lg border border-magic-core/50 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <span className="font-hud font-bold uppercase tracking-wide">Tablero (Inicio)</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-guild-text hover:text-guild-heading hover:bg-guild-border/30 px-4 py-3 rounded-lg transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-2"><path d="M14 2H6a2 2 0 0 0-2 2v16h16V8l-6-6z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                  <span className="font-hud font-bold uppercase tracking-wide">Tus Expedientes</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-guild-text hover:text-guild-heading hover:bg-guild-border/30 px-4 py-3 rounded-lg transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span className="font-hud font-bold uppercase tracking-wide">Control Subsidios</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-guild-text hover:text-guild-heading hover:bg-guild-border/30 px-4 py-3 rounded-lg transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span className="font-hud font-bold uppercase tracking-wide">Calendario Visitas</span>
                </a>
             </nav>
             <div className="p-4 border-t border-guild-border">
                <div className="bg-guild-bg rounded-lg border border-guild-border p-4 text-center">
                  <p className="text-xs text-guild-text uppercase tracking-wider mb-2">Poder Mágico</p>
                  <p className="font-hud text-2xl font-bold text-quest-complete truncate">Ollama RAG: Activo</p>
                </div>
             </div>
          </aside>
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
