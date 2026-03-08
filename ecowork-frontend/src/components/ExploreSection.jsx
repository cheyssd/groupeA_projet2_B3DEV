import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from 'react-router-dom'

export default function ExploreSection() {
  const { isDark } = useTheme();

  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL SPACES");

  const filters = ["ALL SPACES", "PRIVATE", "SHARED"];
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/spaces")
      .then((response) => response.json())
      .then((data) => {
        setSpaces(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur API :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="w-full px-12 py-24">
        <p>Loading spaces...</p>
      </section>
    );
  }

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
        className="w-full px-12 py-24"
        style={{
          background: "var(--bg-primary)",
          fontFamily: "'Barlow', sans-serif",
        }}
      >
        {/* DISCOVER */}
        <div className="flex items-center gap-4 mb-10">
          <div
            className="w-10 h-px"
            style={{ background: "var(--text-muted)" }}
          />
          <span
            className="text-[10px] tracking-[5px] uppercase"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              color: "var(--text-muted)",
            }}
          >
            Discover
          </span>
        </div>

        {/* TITRE + FILTERS */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2
              className="font-black uppercase leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(52px, 7vw, 96px)",
                letterSpacing: "-1px",
                color: "var(--text-primary)",
              }}
            >
              EXPLORE
            </h2>

            <h2
              className="font-black uppercase italic leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(52px, 7vw, 96px)",
                letterSpacing: "-1px",
                color: "var(--text-primary)",
              }}
            >
              SPACE.
            </h2>
          </div>

          <div className="text-right flex flex-col items-end gap-6 max-w-xs">
            <p
              className="text-sm italic leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
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
                    className="text-xs tracking-[2px] uppercase font-semibold"
                    style={{
                      color:
                        activeFilter === f
                          ? "var(--text-primary)" 
                          : "var(--text-muted)",
                    }}
                  >
                    {f}
                  </span>

                  {activeFilter === f && (
                    <div
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "var(--text-primary)" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div key={space.id} className="flex flex-col cursor-pointer" onClick={() => navigate(`/spaces/${space.id}`)}>
              <div className="relative rounded-2xl overflow-hidden h-72">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt={space.name}
                  className="card-img"
                />
              </div>

              <div className="flex items-start justify-between mt-4 px-1">
                <div>
                  <p
                    className="font-bold text-base"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: "0.3px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {space.name}
                  </p>

                  <p
                    className="text-[10px] tracking-[2px] uppercase mt-0.5"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: "var(--text-muted)",
                    }}
                  >
                    {space.type}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className="font-bold text-base"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "var(--accent)",
                    }}
                  >
                    {space.price_per_day} FCFA
                  </p>

                  <p
                    className="text-[10px] tracking-[1px] uppercase mt-0.5"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: "var(--text-muted)",
                    }}
                  >
                    / day
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voir tous les espaces */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate('/spaces')}
            className="flex items-center gap-3 px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:gap-5"
            style={{
              border: "1px solid var(--border-color)",
              background: "transparent",
              color: "var(--text-secondary)",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "11px",
              letterSpacing: "3px",
            }}
          >
            VOIR TOUS LES ESPACES
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}