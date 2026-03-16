import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const PLACEHOLDER_IMGS = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
];

export default function Spaces() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [budgetMax, setBudgetMax] = useState(500000);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const spaceTypes = ["bureau_prive", "espace_partage", "salle_reunion", "salle_conference"];
  const typeLabels = {
    bureau_prive: "Bureau Privé",
    espace_partage: "Espace Partagé",
    salle_reunion: "Salle de Réunion",
    salle_conference: "Salle de Conférence",
  };

  useEffect(() => {
    const fetchAllSpaces = async () => {
      try {
        let allSpaces = [];
        let page = 1;
        let lastPage = 1;
        do {
          const res = await fetch(`http://127.0.0.1:8000/api/spaces?page=${page}&per_page=100`);
          const data = await res.json();
          allSpaces = [...allSpaces, ...(data.data || [])];
          lastPage = data.last_page || 1;
          page++;
        } while (page <= lastPage);
        setSpaces(allSpaces);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchAllSpaces();
  }, []);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedTypes([]);
    setBudgetMax(500000);
    setSortOrder("asc");
  };

  const filtered = spaces
    .filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.type.toLowerCase().includes(search.toLowerCase());
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(s.type);
      const matchBudget = parseFloat(s.price_per_day) <= budgetMax;
      return matchSearch && matchType && matchBudget;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? parseFloat(a.price_per_day) - parseFloat(b.price_per_day)
        : parseFloat(b.price_per_day) - parseFloat(a.price_per_day)
    );

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Type d'espace */}
      <div>
        <p className="text-[9px] tracking-[3px] uppercase mb-4 font-semibold"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
          Type d'espace
        </p>
        {spaceTypes.map((type) => (
          <label key={type} className="flex items-center gap-3 mb-3 cursor-pointer">
            <div
              onClick={() => toggleType(type)}
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all cursor-pointer"
              style={{
                border: `1.5px solid ${selectedTypes.includes(type) ? "var(--accent)" : "var(--text-muted)"}`,
                background: selectedTypes.includes(type) ? "var(--accent)" : "transparent",
              }}>
              {selectedTypes.includes(type) && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
            <span className="text-xs cursor-pointer" onClick={() => toggleType(type)}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: selectedTypes.includes(type) ? "var(--text-primary)" : "var(--text-secondary)",
                letterSpacing: "0.5px",
              }}>
              {typeLabels[type]}
            </span>
          </label>
        ))}
      </div>

      {/* Budget max */}
      <div>
        <p className="text-[9px] tracking-[3px] uppercase mb-4 font-semibold"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
          Budget Max (FCFA/J)
        </p>
        <input type="range" min={0} max={500000} step={5000} value={budgetMax}
          onChange={(e) => setBudgetMax(Number(e.target.value))} />
        <div className="flex justify-between text-[10px] mt-2"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
          <span>0</span>
          <span>{budgetMax.toLocaleString()}</span>
        </div>
      </div>

      {/* Reset */}
      <button onClick={resetFilters}
        className="w-full py-2.5 text-xs tracking-[2px] uppercase font-semibold cursor-pointer transition-all rounded"
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          border: "1px solid var(--border-color)",
          color: "var(--text-secondary)",
          background: "transparent",
        }}>
        Réinitialiser
      </button>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');
        .space-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .space-card:hover .space-card-img { transform: scale(1.04); }
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--text-primary);
          cursor: pointer;
          border: 2px solid var(--accent);
        }
      `}</style>

      <div className="w-full min-h-screen" style={{ background: "var(--bg-primary)", fontFamily: "'Barlow', sans-serif" }}>

        {/* NAVBAR */}
        <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b"
          style={{ borderColor: "var(--border-color)" }}>
          <span className="font-black text-lg uppercase cursor-pointer"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}
            onClick={() => navigate("/")}>
            ECOWORK<span style={{ color: "var(--accent)" }}>.</span>
          </span>

          <div className="hidden md:flex items-center gap-8">
            {["SPACES", "MEMBERSHIPS", "ACCOUNT"].map((item) => (
              <span key={item} className="text-xs tracking-[2px] uppercase cursor-pointer transition-colors"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: item === "SPACES" ? "var(--text-primary)" : "var(--text-muted)",
                  borderBottom: item === "SPACES" ? "1px solid var(--text-primary)" : "none",
                  paddingBottom: "2px",
                }}>
                {item}
              </span>
            ))}
          </div>

          {/* Mobile: filter toggle */}
          <button className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer"
            onClick={() => setFilterOpen(o => !o)}
            style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", background: "var(--bg-card)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            <span className="text-[9px] tracking-[2px] uppercase font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Filtres {selectedTypes.length + (budgetMax < 500000 ? 1 : 0) > 0 ? `(${selectedTypes.length + (budgetMax < 500000 ? 1 : 0)})` : ""}
            </span>
          </button>
        </nav>

        {/* Mobile filter drawer */}
        {filterOpen && (
          <div className="md:hidden px-6 py-6 border-b"
            style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
            <FilterPanel />
          </div>
        )}

        {/* SEARCH BAR */}
        <div className="px-6 md:px-12 pt-8 md:pt-10 pb-6 md:pb-8 border-b" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-[9px] tracking-[4px] uppercase mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
            Search Venue
          </p>
          <div className="flex items-center gap-4">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Entrez un mot-clé..."
              className="flex-1 bg-transparent outline-none italic"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(20px, 5vw, 42px)",
                color: search ? "var(--text-primary)" : "var(--text-muted)",
                letterSpacing: "-0.5px",
              }}
            />
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-80"
              style={{ background: "var(--text-primary)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--bg-primary)" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex px-6 md:px-12 py-8 gap-10">

          {/* SIDEBAR — desktop only */}
          <div className="hidden md:block w-48 flex-shrink-0">
            <FilterPanel />
          </div>

          {/* RESULTS */}
          <div className="flex-1 min-w-0">

            {/* Results header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <p className="text-[10px] tracking-[3px] uppercase"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                {filtered.length} espace{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
              </p>
              <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="flex items-center gap-1 cursor-pointer text-[10px] tracking-[2px] uppercase font-semibold"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-color)",
                  padding: "4px 10px",
                  borderRadius: "4px",
                }}>
                Prix {sortOrder === "asc" ? "croissant ↑" : "décroissant ↓"}
              </button>
            </div>

            {/* Cards grid */}
            {loading ? (
              <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>Chargement...</p>
            ) : filtered.length === 0 ? (
              <p className="text-sm italic" style={{ color: "var(--text-muted)", fontFamily: "'Barlow', sans-serif" }}>
                Aucun espace ne correspond à vos critères.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filtered.map((space, index) => (
                  <div key={space.id} className="space-card cursor-pointer"
                    onClick={() => navigate(`/spaces/${space.id}`)}>
                    <div className="relative rounded-2xl overflow-hidden mb-4" style={{ height: "220px" }}>
                      <img
                        src={space.images?.[0]?.filename
                          ? `http://127.0.0.1:8000/storage/${space.images[0].filename}`
                          : PLACEHOLDER_IMGS[index % PLACEHOLDER_IMGS.length]}
                        alt={space.name}
                        className="space-card-img"
                      />
                      {space.is_active === 1 && (
                        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[9px] tracking-[2px] uppercase font-semibold"
                          style={{
                            fontFamily: "'Rajdhani', sans-serif",
                            background: "rgba(20,22,28,0.85)",
                            color: "var(--accent)",
                            border: "1px solid var(--accent)",
                            backdropFilter: "blur(8px)",
                          }}>
                          Tech Ready
                        </div>
                      )}
                    </div>

                    <div className="flex items-start justify-between px-1">
                      <div className="min-w-0 mr-2">
                        <p className="font-black uppercase italic truncate"
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "18px",
                            letterSpacing: "0.5px",
                            color: "var(--text-primary)",
                          }}>
                          {space.name}
                        </p>
                        <p className="text-[10px] tracking-[1px] mt-0.5"
                          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                          Paris XI — {space.type}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-black text-base"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
                          {Number(space.price_per_day).toLocaleString()}
                          <span style={{ fontSize: "11px", color: "var(--accent)" }}> FCFA</span>
                        </p>
                        <p className="text-[9px] tracking-[1px] uppercase"
                          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                          / jour
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-6 md:px-12 py-4 mt-8 border-t"
          style={{ borderColor: "var(--border-color)" }}>
          <span className="text-[9px] tracking-[3px] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
            Ecowork Gallery 2025
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            <span className="text-[9px] tracking-[3px] uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
              System Online
            </span>
          </div>
        </div>
      </div>
    </>
  );
}