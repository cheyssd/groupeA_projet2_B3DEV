import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Sidebar } from "./AdminOverview";

const API = "http://127.0.0.1:8000/api";

const TYPE_LABELS = {
  conference: "Conférence",
  private_office: "Private Office",
  shared_desk: "Shared Desk",
};

export default function AdminSpaceForm() {
  const { id } = useParams(); // si id existe = mode edit
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const token = localStorage.getItem("token");
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "", surface: "", capacity: "", type: "conference", price_per_day: "", is_active: 1,
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState({});

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // Si mode edit, on charge les données existantes
  useEffect(() => {
    if (isEdit) {
      fetch(`${API}/spaces/${id}`, { headers })
        .then((r) => r.json())
        .then((data) => {
          setForm({
            name: data.name,
            surface: data.surface,
            capacity: data.capacity,
            type: data.type,
            price_per_day: data.price_per_day,
            is_active: data.is_active,
          });
          setFetching(false);
        });
    }
  }, [id]);

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Nom requis";
    if (!form.surface) e.surface = "Surface requise";
    if (!form.capacity) e.capacity = "Capacité requise";
    if (!form.price_per_day) e.price_per_day = "Prix requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    const url = isEdit ? `${API}/spaces/${id}` : `${API}/spaces`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
    const data = await res.json();
    console.log(data);

    setLoading(false);

    if (data.success) {
      navigate("/admin/spaces");
    }
  };

  const fields = [
    { key: "name", label: "Nom de l'espace", type: "text", placeholder: "Ex: Bonoua Space" },
    { key: "surface", label: "Surface (m²)", type: "number", placeholder: "Ex: 600" },
    { key: "capacity", label: "Capacité (personnes)", type: "number", placeholder: "Ex: 80" },
    { key: "price_per_day", label: "Prix par jour (FCFA)", type: "number", placeholder: "Ex: 20000" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');
        input::placeholder, textarea::placeholder { color: var(--text-muted); opacity: 1; }
        input:focus, select:focus { border-color: var(--accent) !important; }
      `}</style>

      <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Sidebar active="spaces" />

        <main className="flex-1 px-10 py-8" style={{ fontFamily: "'Barlow', sans-serif" }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/admin/spaces")}
                className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:opacity-70"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
              </button>
              <div>
                <p className="text-[9px] tracking-[4px] uppercase mb-0.5"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                  Admin · Espaces
                </p>
                <h1 className="font-black uppercase leading-none"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                  {isEdit ? "Modifier l'espace" : "Ajouter un espace"}
                </h1>
              </div>
            </div>

            {/* Toggle */}
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
              <span className="text-[9px] tracking-[2px] uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                {isDark ? "Light" : "Dark"}
              </span>
            </button>
          </div>

          {fetching ? (
            <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "2px" }}>
              Chargement...
            </p>
          ) : (
            <div className="max-w-2xl">
              <div className="rounded-2xl p-8"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>

                {/* Fields */}
                <div className="grid grid-cols-2 gap-6">
                  {fields.map((f) => (
                    <div key={f.key}>
                      <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        value={form[f.key]}
                        placeholder={f.placeholder}
                        onChange={(e) => { setForm({ ...form, [f.key]: e.target.value }); setErrors({ ...errors, [f.key]: null }); }}
                        className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
                        style={{
                          background: "var(--bg-primary)",
                          border: `1px solid ${errors[f.key] ? "#f87171" : "var(--border-color)"}`,
                          color: "var(--text-primary)",
                          fontFamily: "'Barlow', sans-serif",
                        }}
                      />
                      {errors[f.key] && (
                        <p className="text-[10px] mt-1" style={{ color: "#f87171", fontFamily: "'Rajdhani', sans-serif" }}>
                          {errors[f.key]}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Type */}
                  <div>
                    <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                      Type d'espace
                    </label>
                    <select value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl outline-none text-sm cursor-pointer transition-all"
                      style={{
                        background: "var(--bg-primary)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                        fontFamily: "'Barlow', sans-serif",
                      }}>
                      {Object.entries(TYPE_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Toggle actif */}
                  <div className="flex flex-col justify-center">
                    <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                      Statut
                    </label>
                    <div className="flex items-center gap-3">
                      <div onClick={() => setForm({ ...form, is_active: form.is_active ? 0 : 1 })}
                        className="w-12 h-6 rounded-full cursor-pointer transition-all flex items-center px-1"
                        style={{ background: form.is_active ? "var(--accent)" : "var(--border-color)" }}>
                        <div className="w-4 h-4 rounded-full bg-white transition-all"
                          style={{ transform: form.is_active ? "translateX(24px)" : "translateX(0)" }} />
                      </div>
                      <span className="text-sm font-semibold"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: form.is_active ? "var(--accent)" : "var(--text-muted)" }}>
                        {form.is_active ? "Actif" : "Inactif"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-8" style={{ borderTop: "1px solid var(--border-color)" }} />

                {/* Buttons */}
                <div className="flex gap-4">
                  <button onClick={() => navigate("/admin/spaces")}
                    className="px-6 py-3 rounded-xl text-xs tracking-[2px] uppercase font-semibold cursor-pointer transition-all"
                    style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}>
                    Annuler
                  </button>
                  <button onClick={handleSubmit} disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl text-xs tracking-[2px] uppercase font-bold cursor-pointer transition-all"
                    style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif", opacity: loading ? 0.7 : 1 }}>
                    {loading ? (
                      <>Enregistrement...</>
                    ) : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {isEdit ? "Enregistrer les modifications" : "Créer l'espace"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
