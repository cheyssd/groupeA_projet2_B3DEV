export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">

   
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')",
          filter: "brightness(0.6) saturate(0.75)",
        }}
      />

     
      <div className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,1) 100%)",
        }}
      />

     
      <nav className="relative z-10 flex items-start justify-between px-12 pt-7">
       
        <div className="flex flex-col gap-0.5">
          <span
            className="text-white font-black text-xl uppercase tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ECOWORK<span className="text-cyan-400">.</span>
          </span>
          <span className="text-white/40 text-[9px] tracking-[4px] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            High Performance
          </span>
        </div>

       
        <span className="text-white/45 text-[11px] tracking-[3px] uppercase pt-1"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          Paris XI&nbsp;&nbsp;/&nbsp;&nbsp;2.378SE
        </span>
      </nav>

     
      <div className="relative z-10 flex items-center justify-between px-12 pt-20 gap-8">

        {/* ── Left: Headline ── */}
        <div className="flex-1 max-w-2xl">
          <h1
            className="font-black uppercase leading-none text-white"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(64px, 9vw, 118px)",
              letterSpacing: "-1px",
            }}
          >
            L'ESPACE
            <span className="block text-cyan-400">SANS LIMITES.</span>
          </h1>

          <p
            className="mt-6 text-sm italic text-white/60 leading-relaxed border-l-2 border-cyan-400 pl-4 max-w-xs"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Sobriété numérique, confort absolu. Bienvenue<br />
            dans l'écosystème GreenSpace.
          </p>
        </div>

      
        <div
          className="w-80 flex-shrink-0 rounded-2xl p-8 border border-white/10"
          style={{
            background: "rgba(18, 20, 26, 0.80)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="text-center mb-7">
            <p
              className="text-white font-bold text-xl"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Réservez votre
            </p>
            <p className="text-white/40 text-sm mt-0.5">espace de focus</p>
          </div>

         
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-3 hover:border-cyan-400/40 transition-colors cursor-pointer">
            <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span className="text-white/70 text-sm flex-1">Paris 11, GreenSpace</span>
            <span className="text-white/30 text-xs">›</span>
          </div>

        
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-5 hover:border-cyan-400/40 transition-colors cursor-pointer">
            <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="text-white/70 text-sm flex-1">Aujourd'hui, 19 Fév</span>
            <span className="text-white/30 text-xs">›</span>
          </div>

          {/* CTA button */}
          <button
            className="w-full py-4 bg-white text-black font-bold text-xs tracking-[3px] uppercase rounded-xl hover:bg-cyan-400 transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Vérifier la disponibilité
          </button>
        </div>
      </div>

      
      <div className="relative z-10 flex items-end justify-between px-12 pb-10 mt-16">

        {/* Stats */}
        <div className="flex gap-10">
          <div>
            <p className="text-white/35 text-[9px] tracking-[3px] uppercase mb-1"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Impact
            </p>
            <p className="text-cyan-400 font-bold text-sm tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              -40% CO2
            </p>
          </div>
          <div>
            <p className="text-white/35 text-[9px] tracking-[3px] uppercase mb-1"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Status
            </p>
            <p className="text-white font-bold text-sm tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              En direct
            </p>
          </div>
        </div>

       
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-white/25" />
          <span className="text-white/30 text-[9px] tracking-[4px] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Scroll pour explorer
          </span>
        </div>
      </div>

      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:ital,wght@0,400;1,400&family=Rajdhani:wght@500;600;700&display=swap');
      `}</style>
    </section>
  );
}