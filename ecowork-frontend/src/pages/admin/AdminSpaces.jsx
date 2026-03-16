import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Sidebar } from "./AdminOverview";

const API = "http://127.0.0.1:8000/api";

const TYPE_LABELS = {
  conference: "Conférence",
  private_office: "Private Office",
  shared_desk: "Shared Desk",
};

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-lg rounded-2xl p-6 md:p-8 relative"
        style={{ background: "var(--bg-primary)", border: "1px solid var(--border-color)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", color: "var(--text-primary)" }}>
            {title}
          </h2>
          <button onClick={onClose} className="cursor-pointer" style={{ color: "var(--text-muted)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function SpaceForm({ initial, onSubmit, onClose, loading }) {
  const [form, setForm] = useState(initial || {
    name: "", surface: "", capacity: "", type: "conference", price_per_day: "", is_active: 1,
  });

  const fields = [
    { key: "name", label: "Nom", type: "text", placeholder: "Ex: Bonoua Space" },
    { key: "surface", label: "Surface (m²)", type: "number", placeholder: "Ex: 600" },
    { key: "capacity", label: "Capacité", type: "number", placeholder: "Ex: 80" },
    { key: "price_per_day", label: "Prix / jour (FCFA)", type: "number", placeholder: "Ex: 20000" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="text-[9px] tracking-[3px] uppercase block mb-1.5"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
            {f.label}
          </label>
          <input type={f.type} value={form[f.key]} placeholder={f.placeholder}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            className="w-full px-4 py-3 rounded-xl outline-none text-sm"
            style={{ background: "var(--border-color)", border: "1px solid var(--border-color)", color: "var(--text-primary)", fontFamily: "'Barlow', sans-serif" }} />
        </div>
      ))}

      <div>
        <label className="text-[9px] tracking-[3px] uppercase block mb-1.5"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
          Type
        </label>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full px-4 py-3 rounded-xl outline-none text-sm cursor-pointer"
          style={{ background: "var(--border-color)", border: "1px solid var(--border-color)", color: "var(--text-primary)", fontFamily: "'Barlow', sans-serif" }}>
          {Object.entries(TYPE_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <div onClick={() => setForm({ ...form, is_active: form.is_active ? 0 : 1 })}
          className="w-10 h-6 rounded-full cursor-pointer transition-all flex items-center px-1"
          style={{ background: form.is_active ? "var(--accent)" : "var(--border-color)" }}>
          <div className="w-4 h-4 rounded-full bg-white transition-all"
            style={{ transform: form.is_active ? "translateX(16px)" : "translateX(0)" }} />
        </div>
        <span className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-secondary)" }}>
          Espace actif
        </span>
      </div>

      <div className="flex gap-3 mt-2">
        <button onClick={onClose} className="flex-1 py-3 rounded-xl text-xs tracking-[2px] uppercase font-semibold cursor-pointer"
          style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}>
          Annuler
        </button>
        <button onClick={() => onSubmit(form)} disabled={loading}
          className="flex-1 py-3 rounded-xl text-xs tracking-[2px] uppercase font-semibold cursor-pointer"
          style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif", opacity: loading ? 0.6 : 1 }}>
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}

export default function AdminSpaces() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [spaces, setSpaces] = useState([]);
  const [meta, setMeta] = useState({ total: 0, last_page: 1, current_page: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [page, setPage] = useState(1);

  const [showDelete, setShowDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const headers = { Authorization: `Bearer ${token}`, Accept: "application/json", "Content-Type": "application/json" };

  const fetchSpaces = () => {
    setLoading(true);
    const params = new URLSearchParams({ page });
    if (search) params.append("search", search);
    if (filterType) params.append("type", filterType);
    if (filterActive !== "") params.append("is_active", filterActive);

    fetch(`${API}/spaces?${params}`, { headers })
      .then((r) => r.json())
      .then((data) => {
        setSpaces(data.data);
        setMeta({ total: data.total, last_page: data.last_page, current_page: data.current_page });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchSpaces(); }, [page, filterType, filterActive]);
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); fetchSpaces(); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleDelete = async () => {
    setSaving(true);
    await fetch(`${API}/spaces/${showDelete.id}`, { method: "DELETE", headers });
    setSaving(false);
    setShowDelete(null);
    fetchSpaces();
  };

  const toggleActive = async (space) => {
    await fetch(`${API}/spaces/${space.id}`, {
      method: "PUT", headers,
      body: JSON.stringify({ ...space, is_active: space.is_active ? 0 : 1 }),
    });
    fetchSpaces();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');
        .row-hover:hover { background: rgba(255,255,255,0.02); }
        input::placeholder { color: var(--text-muted); }
        select option { background: #1a1a1a; }
      `}</style>

      <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Sidebar active="spaces" />

        <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-auto pt-20 md:pt-8" style={{ fontFamily: "'Barlow', sans-serif" }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-6 md:mb-8 gap-3">
            <div>
              <p className="text-[9px] tracking-[4px] uppercase mb-1"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                Admin · Espaces
              </p>
              <h1 className="font-black uppercase leading-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(20px, 4vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                Gestion des espaces
              </h1>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button onClick={toggle}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer"
                style={{ borderColor: "var(--border-color)", background: "var(--bg-card)", color: "var(--text-secondary)" }}>
                {isDark ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
                <span className="hidden sm:inline text-[9px] tracking-[2px] uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {isDark ? "Light" : "Dark"}
                </span>
              </button>

              <button onClick={() => navigate("/admin/spaces/create")}
                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl cursor-pointer text-xs tracking-[2px] uppercase font-bold"
                style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span className="hidden sm:inline">Ajouter</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-5 md:mb-6">
            <div className="flex items-center gap-2 flex-1 min-w-[180px] px-3 md:px-4 py-2 md:py-2.5 rounded-xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher..."
                className="bg-transparent outline-none text-sm flex-1"
                style={{ color: "var(--text-primary)", fontFamily: "'Barlow', sans-serif" }} />
            </div>

            <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
              className="px-3 md:px-4 py-2 md:py-2.5 rounded-xl outline-none text-xs cursor-pointer"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif" }}>
              <option value="">Tous types</option>
              {Object.entries(TYPE_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>

            <select value={filterActive} onChange={(e) => { setFilterActive(e.target.value); setPage(1); }}
              className="px-3 md:px-4 py-2 md:py-2.5 rounded-xl outline-none text-xs cursor-pointer"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif" }}>
              <option value="">Tous statuts</option>
              <option value="1">Actifs</option>
              <option value="0">Inactifs</option>
            </select>

            <span className="text-[10px] tracking-[2px] uppercase whitespace-nowrap"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
              {meta.total} espace{meta.total > 1 ? "s" : ""}
            </span>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>

            {/* Desktop col headers */}
            <div className="hidden lg:grid px-6 py-3"
              style={{ gridTemplateColumns: "0.5fr 2fr 1fr 1fr 1.5fr 1fr 1fr", borderBottom: "1px solid var(--border-color)" }}>
              {["", "Nom", "Type", "Capacité", "Prix / jour", "Statut", "Actions"].map((h) => (
                <p key={h} className="text-[8px] tracking-[2px] uppercase"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                  {h}
                </p>
              ))}
            </div>

            {loading ? (
              <p className="px-6 py-8 text-sm" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "2px" }}>
                Chargement...
              </p>
            ) : spaces.length === 0 ? (
              <p className="px-6 py-8 text-sm italic" style={{ color: "var(--text-muted)" }}>
                Aucun espace trouvé.
              </p>
            ) : (
              spaces.map((space, i) => (
                <div key={space.id}
                  style={{ borderBottom: i < spaces.length - 1 ? "1px solid var(--border-color)" : "none" }}>

                  {/* Desktop row */}
                  <div className="row-hover hidden lg:grid px-6 py-4 items-center transition-colors"
                    style={{ gridTemplateColumns: "0.5fr 2fr 1fr 1fr 1.5fr 1fr 1fr" }}>

                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "var(--border-color)" }}>
                      {space.images?.[0] ? (
                        <img src={`http://127.0.0.1:8000/storage/${space.images[0].filename}`} alt={space.name} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                          </svg>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="font-bold text-sm" style={{ color: "var(--text-primary)", fontFamily: "'Barlow Condensed', sans-serif" }}>{space.name}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>{space.surface} m²</p>
                    </div>

                    <span className="text-[10px] tracking-[1px] uppercase px-2 py-1 rounded-full w-fit"
                      style={{ fontFamily: "'Rajdhani', sans-serif", background: "var(--border-color)", color: "var(--text-secondary)" }}>
                      {TYPE_LABELS[space.type] || space.type}
                    </span>

                    <p className="text-sm" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow Condensed', sans-serif" }}>{space.capacity} pers.</p>

                    <p className="font-bold text-sm" style={{ color: "var(--accent)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {Number(space.price_per_day).toLocaleString()} FCFA
                    </p>

                    <div className="flex items-center gap-2">
                      <div onClick={() => toggleActive(space)}
                        className="w-9 h-5 rounded-full cursor-pointer transition-all flex items-center px-0.5"
                        style={{ background: space.is_active ? "var(--accent)" : "var(--border-color)" }}>
                        <div className="w-4 h-4 rounded-full bg-white transition-all"
                          style={{ transform: space.is_active ? "translateX(16px)" : "translateX(0)" }} />
                      </div>
                      <span className="text-[9px] uppercase tracking-[1px]"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: space.is_active ? "var(--accent)" : "var(--text-muted)" }}>
                        {space.is_active ? "Actif" : "Inactif"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => navigate(`/admin/spaces/${space.id}/edit`)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80"
                        style={{ background: "rgba(41,212,224,0.1)", color: "var(--accent)" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button onClick={() => setShowDelete(space)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80"
                        style={{ background: "rgba(248,113,113,0.1)", color: "#f87171" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6"/><path d="M14 11v6"/>
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Mobile card */}
                  <div className="lg:hidden px-4 py-4 flex items-center gap-3">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "var(--border-color)" }}>
                      {space.images?.[0] ? (
                        <img src={`http://127.0.0.1:8000/storage/${space.images[0].filename}`} alt={space.name} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-bold text-sm truncate" style={{ color: "var(--text-primary)", fontFamily: "'Barlow Condensed', sans-serif" }}>{space.name}</p>
                          <p className="text-[9px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                            {space.surface} m² · {space.capacity} pers. · {TYPE_LABELS[space.type] || space.type}
                          </p>
                        </div>
                        <p className="font-bold text-sm shrink-0" style={{ color: "var(--accent)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {Number(space.price_per_day).toLocaleString()} FCFA
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <div onClick={() => toggleActive(space)}
                            className="w-8 h-4 rounded-full cursor-pointer transition-all flex items-center px-0.5"
                            style={{ background: space.is_active ? "var(--accent)" : "var(--border-color)" }}>
                            <div className="w-3 h-3 rounded-full bg-white transition-all"
                              style={{ transform: space.is_active ? "translateX(13px)" : "translateX(0)" }} />
                          </div>
                          <span className="text-[9px] uppercase" style={{ color: space.is_active ? "var(--accent)" : "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                            {space.is_active ? "Actif" : "Inactif"}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button onClick={() => navigate(`/admin/spaces/${space.id}/edit`)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                            style={{ background: "rgba(41,212,224,0.1)", color: "var(--accent)" }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button onClick={() => setShowDelete(space)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                            style={{ background: "rgba(248,113,113,0.1)", color: "#f87171" }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6"/><path d="M14 11v6"/>
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {meta.last_page > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-muted)", opacity: page === 1 ? 0.4 : 1 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              {Array.from({ length: meta.last_page }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className="w-8 h-8 rounded-lg text-xs font-bold cursor-pointer"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    background: page === i + 1 ? "var(--accent)" : "var(--bg-card)",
                    color: page === i + 1 ? "#000" : "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(meta.last_page, p + 1))} disabled={page === meta.last_page}
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-muted)", opacity: page === meta.last_page ? 0.4 : 1 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Delete Modal */}
      {showDelete && (
        <Modal title="Supprimer l'espace" onClose={() => setShowDelete(null)}>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow', sans-serif" }}>
            Tu vas supprimer <strong style={{ color: "var(--text-primary)" }}>{showDelete.name}</strong>. Cette action est irréversible.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setShowDelete(null)}
              className="flex-1 py-3 rounded-xl text-xs tracking-[2px] uppercase font-semibold cursor-pointer"
              style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}>
              Annuler
            </button>
            <button onClick={handleDelete} disabled={saving}
              className="flex-1 py-3 rounded-xl text-xs tracking-[2px] uppercase font-semibold cursor-pointer"
              style={{ background: "#f87171", color: "#000", fontFamily: "'Rajdhani', sans-serif", opacity: saving ? 0.6 : 1 }}>
              {saving ? "Suppression..." : "Supprimer"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}