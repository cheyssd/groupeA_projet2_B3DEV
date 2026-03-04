import { useState } from "react";

export default function ExploreSection() {
  const spaces = [
    {
      name: "Ambarukmo Space",
      type: "PREMIUM ARCHITECTURE",
      price: "$140.55",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      tags: ["75 MBPS FIBER", "50 SEATS MAX"],
    },
    {
      name: "Commodities Space",
      type: "SOCIAL LOUNGE",
      price: "$30.00",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      tags: ["MOST POPULAR"],
      popular: true,
    },
    {
      name: "Equity Work & Cafe",
      type: "COLLABORATIVE HUB",
      price: "$80.80",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      tags: [],
    },
  ];

  const [activeFilter, setActiveFilter] = useState("ALL SPACES");
  const filters = ["ALL SPACES", "PRIVATE", "SHARED"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');

        .card-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>

      <section
        className="w-full bg-black px-12 py-24"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
       
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-px bg-white/30" />
          <span
            className="text-white/40 text-[10px] tracking-[5px] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Discover
          </span>
        </div>

        
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2
              className="text-white font-black uppercase leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(52px, 7vw, 96px)",
                letterSpacing: "-1px",
              }}
            >
              EXPLORE
            </h2>
            <h2
              className="text-white font-black uppercase italic leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(52px, 7vw, 96px)",
                letterSpacing: "-1px",
              }}
            >
              SPACE.
            </h2>
          </div>

          <div className="text-right flex flex-col items-end gap-6 max-w-xs">
            <p className="text-white/45 text-sm italic leading-relaxed">
              Une sélection rigoureuse
              <br />
              d'environnements conçus pour la
              <br />
              performance cognitive.
            </p>

            <div className="flex items-center gap-6">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="relative cursor-pointer transition-colors duration-200"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  <span
                    className={`text-xs tracking-[2px] uppercase font-semibold ${
                      activeFilter === f
                        ? "text-white"
                        : "text-white/35 hover:text-white/60"
                    }`}
                  >
                    {f}
                  </span>

                  {activeFilter === f && (
                    <div className="absolute -bottom-1 left-0 right-0 h-px bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div
              key={space.name}
              className="space-card flex flex-col cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden h-72">
                <img
                  src={space.img}
                  alt={space.name}
                  className="card-img"
                />

                {/* TAGS */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {space.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-white text-[10px] tracking-[2px] uppercase font-semibold"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        background: "rgba(20,22,28,0.80)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

             
              <div className="flex items-start justify-between mt-4 px-1">
                <div>
                  <p
                    className="text-white font-bold text-base"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {space.name}
                  </p>

                  <p
                    className="text-white/35 text-[10px] tracking-[2px] uppercase mt-0.5"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {space.type}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className="text-cyan-400 font-bold text-base"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {space.price}
                  </p>

                  <p
                    className="text-white/30 text-[10px] tracking-[1px] uppercase mt-0.5"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    / day
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="flex items-center gap-3 mt-20 text-white/25">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-sm tracking-widest">
              →
            </span>
          ))}
        </div>
      </section>
    </>
  );
}