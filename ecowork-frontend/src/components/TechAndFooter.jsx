export default function TechAndFooter() {
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
          border-top: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.3s;
        }
        .feature-row:last-child {
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .feature-row:hover {
          border-color: rgba(41,212,224,0.2);
        }
      `}</style>

      
      <section className="w-full bg-black px-12 py-24">

      
        <div className="flex items-start justify-between mb-16">
          <h2
            className="font-black uppercase italic leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "#fff",
            }}
          >
            THE TECH <span style={{ color: "#29d4e0" }}>STANDARD.</span>
          </h2>
          <p
            className="text-white/40 text-xs uppercase tracking-[2px] leading-relaxed text-right max-w-xs"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Chaque station est configurée pour<br />
            éliminer les frictions et maximiser<br />
            la concentration.
          </p>
        </div>

       
        <div>
          {features.map((f) => (
            <div
              key={f.num}
              className="feature-row flex items-center justify-between py-7 group cursor-pointer"
            >
             
              <div className="flex items-center gap-8">
                <span
                  className="text-white/20 text-xs tracking-[2px]"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {f.num}
                </span>
                <h3
                  className="text-white font-black uppercase tracking-wide group-hover:text-cyan-400 transition-colors duration-300"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(20px, 2.5vw, 30px)",
                    letterSpacing: "1px",
                  }}
                >
                  {f.title}
                </h3>
              </div>

             
              <div className="flex items-center gap-10">
                <p
                  className="text-white/30 text-xs leading-relaxed text-right max-w-[200px]"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {f.desc}
                </p>
                <span className="text-white/30 group-hover:text-cyan-400 transition-colors duration-300">
                  {f.icon}
                </span>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex flex-col items-center mt-16 gap-3">
          <span
            className="text-white/20 text-[9px] tracking-[4px] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Explore number
          </span>
          <div className="w-px h-16 bg-white/10" />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black px-12 pt-0 pb-8 relative overflow-hidden">

        {/* Giant ECOWORK watermark */}
        <div
          className="absolute bottom-16 left-0 font-black uppercase select-none pointer-events-none"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(80px, 18vw, 220px)",
            color: "rgba(255,255,255,0.04)",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          ECOWORK
        </div>

       
        <div className="relative z-10 flex items-start justify-between gap-12 mb-20">

          {/* Left: tagline */}
          <div className="max-w-xs">
            <p
              className="text-white/35 text-sm italic leading-relaxed mt-2"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              L'excellence de l'espace de travail, redéfinie<br />
              pour une ère de conscience environnementale.
            </p>
          </div>

         
          <div className="flex gap-16">
            {/* Explore */}
            <div>
              <p
                className="text-white/25 text-[9px] tracking-[4px] uppercase mb-4"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Explore
              </p>
              {["Locations", "Memberships", "Impact"].map((item) => (
                <p
                  key={item}
                  className="text-white/60 text-xs tracking-[2px] uppercase mb-2 hover:text-cyan-400 cursor-pointer transition-colors"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {item}
                </p>
              ))}
            </div>

           
            <div>
              <p
                className="text-white/25 text-[9px] tracking-[4px] uppercase mb-4"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Contact
              </p>
              {["Paris XI", "Bordeaux", "Support"].map((item) => (
                <p
                  key={item}
                  className="text-white/60 text-xs tracking-[2px] uppercase mb-2 hover:text-cyan-400 cursor-pointer transition-colors"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {item}
                </p>
              ))}
            </div>

           
            <div>
              <p
                className="text-white/25 text-[9px] tracking-[4px] uppercase mb-4"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Social
              </p>
              {["Instagram", "LinkedIn", "Twitter"].map((item) => (
                <p
                  key={item}
                  className="text-white/60 text-xs tracking-[2px] uppercase mb-2 hover:text-cyan-400 cursor-pointer transition-colors"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        
        <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-6">
          <div className="flex items-center gap-4">
            <span
              className="text-white/20 text-[9px] tracking-[2px] uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              © 2024 Ecowork Systems
            </span>
            <span className="text-white/10">|</span>
            <span
              className="text-white/20 text-[9px] tracking-[2px] uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Privacy Policy
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span
              className="text-white/20 text-[9px] tracking-[2px] uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Status · Optimal Performance in Paris
            </span>
          </div>

          <span
            className="text-white/20 text-[9px] tracking-[2px] uppercase hover:text-white/50 cursor-pointer transition-colors"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Back to top ↑
          </span>
        </div>
      </footer>
    </>
  );
}
