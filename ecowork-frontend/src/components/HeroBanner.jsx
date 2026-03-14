import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

export default function HeroBanner() {
  const { isDark, toggle } = useTheme()

  return (
    <section className="relative w-full min-h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')",
          filter: isDark ? "brightness(0.6) saturate(0.75)" : "brightness(0.85) saturate(0.6)",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,1) 100%)"
            : "linear-gradient(to bottom, rgba(245,245,240,0.0) 0%, rgba(245,245,240,0.0) 40%, rgba(245,245,240,0.7) 70%, rgba(245,245,240,1) 100%)",
        }}
      />

      {/* NAVBAR */}
      <nav className="relative z-10 flex items-center justify-between px-12 pt-7">
        {/* Logo */}
        <div className="flex flex-col gap-0.5">
          <span
            className="font-black text-xl uppercase tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}
          >
            ECOWORK<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          <span
            className="text-[9px] tracking-[4px] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}
          >
            High Performance
          </span>
        </div>

        {/* Location */}
        <span
          className="text-[11px] tracking-[3px] uppercase pt-1"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-secondary)" }}
        >
          Paris XI&nbsp;&nbsp;/&nbsp;&nbsp;2.378SE
        </span>

        {/* Right side: toggle + auth buttons */}
        <div className="flex items-center gap-3">

          {/* Toggle dark/light */}
          <button
            onClick={toggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer"
            style={{
              borderColor: "var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
            }}
          >
            {isDark ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
            <span className="text-[9px] tracking-[2px] uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              {isDark ? "Light" : "Dark"}
            </span>
          </button>

          {/* Connexion */}
          <Link to="/login"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 cursor-pointer text-[9px] tracking-[2px] uppercase font-bold"
            style={{
              borderColor: "var(--border-color)",
              background: "transparent",
              color: "var(--text-secondary)",
              fontFamily: "'Rajdhani', sans-serif",
            }}>
            Connexion
          </Link>

          {/* Inscription */}
          <Link to="/register"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-[9px] tracking-[2px] uppercase font-bold"
            style={{
              background: "var(--accent)",
              color: "#000",
              fontFamily: "'Rajdhani', sans-serif",
            }}>
            Inscription
          </Link>

        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex items-center justify-between px-12 pt-20 gap-8">

        {/* Left: Headline */}
        <div className="flex-1 max-w-2xl">
          <h1
            className="font-black uppercase leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(64px, 9vw, 118px)",
              letterSpacing: "-1px",
              color: "var(--text-primary)",
            }}
          >
            L'ESPACE
            <span className="block" style={{ color: "var(--accent)" }}>SANS LIMITES.</span>
          </h1>

          <p
            className="mt-6 text-sm italic leading-relaxed pl-4 max-w-xs border-l-2"
            style={{
              fontFamily: "'Barlow', sans-serif",
              color: "var(--text-secondary)",
              borderColor: "var(--accent)",
            }}
          >
            Sobriété numérique, confort absolu. Bienvenue<br />
            dans l'écosystème GreenSpace.
          </p>
        </div>

        {/* Right: Booking card */}
        <div
          className="w-80 flex-shrink-0 rounded-2xl p-8 border"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-color)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="text-center mb-7">
            <p
              className="font-bold text-xl"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}
            >
              Réservez votre
            </p>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>espace de focus</p>
          </div>

          {/* Location field */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3 mb-3 cursor-pointer transition-colors"
            style={{ background: "var(--border-color)", border: "1px solid var(--border-color)" }}
          >
            <svg className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>Paris 11, GreenSpace</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>›</span>
          </div>

          {/* Date field */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3 mb-5 cursor-pointer transition-colors"
            style={{ background: "var(--border-color)", border: "1px solid var(--border-color)" }}
          >
            <svg className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>Aujourd'hui, 19 Fév</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>›</span>
          </div>

          {/* CTA button */}
          <button
            className="w-full py-4 font-bold text-xs tracking-[3px] uppercase rounded-xl transition-colors duration-200 cursor-pointer"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              background: "var(--text-primary)",
              color: "var(--bg-primary)",
            }}
          >
            Vérifier la disponibilité
          </button>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 flex items-end justify-between px-12 pb-10 mt-16">
        <div className="flex gap-10">
          <div>
            <p className="text-[9px] tracking-[3px] uppercase mb-1"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
              Impact
            </p>
            <p className="font-bold text-sm tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--accent)" }}>
              -40% CO2
            </p>
          </div>
          <div>
            <p className="text-[9px] tracking-[3px] uppercase mb-1"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
              Status
            </p>
            <p className="font-bold text-sm tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
              En direct
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-px" style={{ background: "var(--text-muted)" }} />
          <span className="text-[9px] tracking-[4px] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
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