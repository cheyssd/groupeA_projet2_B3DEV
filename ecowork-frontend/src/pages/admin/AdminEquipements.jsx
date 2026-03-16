import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Sidebar } from "./AdminOverview";

const API = "http://127.0.0.1:8000/api";

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-md rounded-2xl p-6 md:p-8 relative"
        style={{ background: "var(--bg-primary)", border: "1px solid var(--border-color)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px", color: "var(--text-primary)" }}>
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

export default function AdminEquipements() {
  const { isDark, toggle } = useTheme();
  const token = localStorage.getItem("token");

  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [formName, setFormName] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const fetchEquipements = () => {
    setLoading(true);
    fetch(`${API}/equipements`, { headers })
      .then((r) => r.json())
      .then((data) => { setEquipements(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchEquipements(); }, []);

  const openCreate = () => { setFormName(""); setShowForm("create"); };
  const openEdit = (eq) => { setFormName(eq.name); setShowForm(eq); };

  const handleSave = async () => {
    if (!formName.trim()) return;
    setSaving(true);
    const isEdit = showForm !== "create";
    const url = isEdit ? `${API}/equipements/${showForm.id}` : `${API}/equipements`;
    const method = isEdit ? "PUT" : "POST";
    await fetch(url, { method, headers, body: JSON.stringify({ name: formName }) });
    setSaving(false);
    setShowForm(null);
    fetchEquipements();
  };

  const handleDelete = async () => {
    setSaving(true);
    await fetch(`${API}/equipements/${showDelete.id}`, { method: "DELETE", headers });
    setSaving(false);
    setShowDelete(null);
    fetchEquipements();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900&family=Barlow:ital,wght@0,400;0,500&family=Rajdhani:wght@500;600;700&display=swap');
        .row-hover:hover { background: rgba(255,255,255,0.02); }
      `}</style>

      <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Sidebar active="equipements" />

        <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-auto pt-20 md:pt-8" style={{ fontFamily: "'Barlow', sans-serif" }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-6 md:mb-8 gap-3">
            <div>
              <p className="text-[9px] tracking-[4px] uppercase mb-1"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                Admin · Équipements
              </p>
              <h1 className="font-black uppercase leading-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(20px, 4vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                Gestion des équipements
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

              <button onClick={openCreate}
                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl cursor-pointer text-xs tracking-[2px] uppercase font-bold"
                style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span className="hidden sm:inline">Ajouter</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>

            {/* Desktop header */}
            <div className="hidden md:grid px-6 py-3"
              style={{ gridTemplateColumns: "1fr 2fr 1fr", borderBottom: "1px solid var(--border-color)" }}>
              {["#", "Nom de l'équipement", "Actions"].map((h) => (
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
            ) : equipements.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--text-muted)" }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>Aucun équipement. Commencez par en ajouter !</p>
              </div>
            ) : (
              equipements.map((eq, i) => (
                <div key={eq.id}
                  style={{ borderBottom: i < equipements.length - 1 ? "1px solid var(--border-color)" : "none" }}>

                  {/* Desktop row */}
                  <div className="row-hover hidden md:grid px-6 py-4 items-center transition-colors"
                    style={{ gridTemplateColumns: "1fr 2fr 1fr" }}>
                    <p className="text-xs font-bold" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>#{eq.id}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(41,212,224,0.1)", color: "var(--accent)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <p className="text-sm font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {eq.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(eq)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80"
                        style={{ background: "rgba(41,212,224,0.1)", color: "var(--accent)" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button onClick={() => setShowDelete(eq)}
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

                  {/* Mobile row */}
                  <div className="md:hidden px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(41,212,224,0.1)", color: "var(--accent)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: "var(--text-primary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {eq.name}
                        </p>
                        <p className="text-[9px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>#{eq.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => openEdit(eq)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                        style={{ background: "rgba(41,212,224,0.1)", color: "var(--accent)" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button onClick={() => setShowDelete(eq)}
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
              ))
            )}
          </div>

          <p className="text-[10px] tracking-[2px] uppercase mt-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
            {equipements.length} équipement{equipements.length > 1 ? "s" : ""} au total
          </p>
        </main>
      </div>

      {/* Modal Form */}
      {showForm && (
        <Modal title={showForm === "create" ? "Ajouter un équipement" : "Modifier l'équipement"} onClose={() => setShowForm(null)}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                Nom de l'équipement
              </label>
              <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Vidéo projecteur" autoFocus onKeyDown={(e) => e.key === "Enter" && handleSave()}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                style={{ background: "var(--border-color)", border: "1px solid var(--border-color)", color: "var(--text-primary)", fontFamily: "'Barlow', sans-serif" }} />
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setShowForm(null)}
                className="flex-1 py-3 rounded-xl text-xs tracking-[2px] uppercase font-semibold cursor-pointer"
                style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}>
                Annuler
              </button>
              <button onClick={handleSave} disabled={saving || !formName.trim()}
                className="flex-1 py-3 rounded-xl text-xs tracking-[2px] uppercase font-semibold cursor-pointer"
                style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif", opacity: saving || !formName.trim() ? 0.6 : 1 }}>
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Delete */}
      {showDelete && (
        <Modal title="Supprimer l'équipement" onClose={() => setShowDelete(null)}>
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