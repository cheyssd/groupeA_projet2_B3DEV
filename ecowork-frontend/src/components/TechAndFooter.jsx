import { useTheme } from "../contexts/ThemeContext";

export default function TechAndFooter() {
  const { isDark } = useTheme();

  const features = [
    {
      num: "01",
      title: "ULTRA-FAST FIBER",
      desc: "Connexion symétrique 1Gbps, zéro latence, zéro excuses.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>
        </svg>
      ),
    },
    {
      num: "02",
      title: "ACOUSTIC FOCUS PODS",
      desc: "L'espace acoustique pour rester concentré et productif.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      ),
    },
    {
      num: "03",
      title: "ERGONOMIC GEAR",
      desc: "Chaque Herman Miller & Sit-Stand à bonne hauteur.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');

        .feature-row {
          border-top: 1px solid var(--border-color);
          transition: border-color 0.3s;
        }
        .feature-row:last-child {
          border-bottom: 1px solid var(--border-color);
        }
        .feature-row:hover {
          border-color: var(--accent);
        }
      `}</style>

      {/* ══════════ TECH STANDARD ══════════ */}
      <section className="w-full px-12 py-24" style={{ background: "var(--bg-primary)" }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-16">
          <h2
            className="font-black uppercase italic leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "var(--text-primary)",
            }}
          >
            THE TECH <span style={{ color: "var(--accent)" }}>STANDARD.</span>
          </h2>
          <p
            className="text-xs uppercase tracking-[2px] leading-relaxed text-right max-w-xs"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}
          >
            Chaque station est configurée pour<br />
            éliminer les frictions et maximiser<br />
            la concentration.
          </p>
        </div>

        {/* Features list */}
        <div>
          {features.map((f) => (
            <div
              key={f.num}
              className="feature-row flex items-center justify-between py-7 group cursor-pointer"
            >
              <div className="flex items-center gap-8">
                <span
                  className="text-xs tracking-[2px]"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}
                >
                  {f.num}
                </span>
                <h3
                  className="font-black uppercase tracking-wide transition-colors duration-300 group-hover:text-cyan-400"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(20px, 2.5vw, 30px)",
                    letterSpacing: "1px",
                    color: "var(--text-primary)",
                  }}
                >
                  {f.title}
                </h3>
              </div>

              <div className="flex items-center gap-10">
                <p
                  className="text-xs leading-relaxed text-right max-w-[200px]"
                  style={{ fontFamily: "'Barlow', sans-serif", color: "var(--text-secondary)" }}
                >
                  {f.desc}
                </p>
                <span
                  className="transition-colors duration-300 group-hover:text-cyan-400"
                  style={{ color: "var(--text-muted)" }}
                >
                  {f.icon}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Explore number hint */}
        <div className="flex flex-col items-center mt-16 gap-3">
          <span
            className="text-[9px] tracking-[4px] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}
          >
            Explore number
          </span>
          <div className="w-px h-16" style={{ background: "var(--border-color)" }} />
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="w-full px-12 pt-0 pb-8 relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>

        {/* Giant ECOWORK watermark */}
        <div
          className="absolute bottom-16 left-0 font-black uppercase select-none pointer-events-none"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(80px, 18vw, 220px)",
           color: isDark ? "rgba(255,255,255,0.04)" : "transparent",
            WebkitTextStroke: isDark ? "0px" : "1px rgba(0,0,0,0.09)",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          ECOWORK
        </div>

        {/* Footer content */}
        <div className="relative z-10 flex items-start justify-between gap-12 mb-20">

          {/* Tagline */}
          <div className="max-w-xs">
            <p
              className="text-sm italic leading-relaxed mt-2"
              style={{ fontFamily: "'Barlow', sans-serif", color: "var(--text-secondary)" }}
            >
              L'excellence de l'espace de travail, redéfinie<br />
              pour une ère de conscience environnementale.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-16">
            {[
              { title: "Explore", items: ["Locations", "Memberships", "Impact"] },
              { title: "Contact", items: ["Paris XI", "Bordeaux", "Support"] },
              { title: "Social", items: ["Instagram", "LinkedIn", "Twitter"] },
            ].map((col) => (
              <div key={col.title}>
                <p
                  className="text-[9px] tracking-[4px] uppercase mb-4"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}
                >
                  {col.title}
                </p>
                {col.items.map((item) => (
                  <p
                    key={item}
                    className="text-xs tracking-[2px] uppercase mb-2 cursor-pointer transition-colors hover:text-cyan-400"
                    style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-secondary)" }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="relative z-10 flex items-center justify-between pt-6"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          <div className="flex items-center gap-4">
            <span
              className="text-[9px] tracking-[2px] uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}
            >
              © 2024 Ecowork Systems
            </span>
            <span style={{ color: "var(--border-color)" }}>|</span>
            <span
              className="text-[9px] tracking-[2px] uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}
            >
              Privacy Policy
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            <span
              className="text-[9px] tracking-[2px] uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}
            >
              Status · Optimal Performance in Paris
            </span>
          </div>

          <span
            className="text-[9px] tracking-[2px] uppercase cursor-pointer transition-colors hover:text-cyan-400"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}
          >
            Back to top ↑
          </span>
        </div>
      </footer>
    </>
  );
}