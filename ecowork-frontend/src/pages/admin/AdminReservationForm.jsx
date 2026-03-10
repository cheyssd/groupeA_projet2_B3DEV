import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Sidebar } from "./AdminOverview";

const API = "http://127.0.0.1:8000/api";

export default function AdminReservationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const token = localStorage.getItem("token");
  const isEdit = !!id;

  const [form, setForm] = useState({
    space_id: "", start_date: "", end_date: "", status: "en_attente", is_paid: 0,
  });
  const [spaces, setSpaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedSpace, setSelectedSpace] = useState(null);

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    // Charger les espaces
    fetch(`${API}/spaces`, { headers })
      .then((r) => r.json())
      .then((data) => setSpaces(data.data || []));

    if (isEdit) {
      fetch(`${API}/reservations/${id}`, { headers })
        .then((r) => r.json())
        .then((data) => {
          setForm({
            space_id: data.space_id,
            start_date: data.start_date,
            end_date: data.end_date,
            status: data.status,
            is_paid: data.is_paid ? 1 : 0,
          });
          setSelectedSpace(data.space);
          setFetching(false);
        });
    } else {
      setFetching(false);
    }
  }, [id]);

  // Calcul automatique du prix
  const calculateTotal = () => {
    if (!selectedSpace || !form.start_date || !form.end_date) return null;
    const start = new Date(form.start_date);
    const end = new Date(form.end_date);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days <= 0) return null;
    return days * Number(selectedSpace.price_per_day);
  };

  const handleSpaceChange = (spaceId) => {
    const space = spaces.find((s) => s.id === Number(spaceId));
    setSelectedSpace(space || null);
    setForm({ ...form, space_id: spaceId });
  };

  const validate = () => {
    const e = {};
    if (!form.space_id) e.space_id = "Espace requis";
    if (!form.start_date) e.start_date = "Date de début requise";
    if (!form.end_date) e.end_date = "Date de fin requise";
    if (form.start_date && form.end_date && form.end_date < form.start_date) {
      e.end_date = "La date de fin doit être après la date de début";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    const body = isEdit
      ? { space_id: form.space_id, start_date: form.start_date, end_date: form.end_date, status: form.status, is_paid: form.is_paid }
      : { space_id: form.space_id, start_date: form.start_date, end_date: form.end_date };

    const url = isEdit ? `${API}/reservations/${id}` : `${API}/reservations`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, { method, headers, body: JSON.stringify(body) });
    const data = await res.json();
    setLoading(false);

    if (data.success) navigate("/admin/reservations");
  };

  const total = calculateTotal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');
        input::placeholder { color: var(--text-muted); opacity: 1; }
        input:focus, select:focus { border-color: var(--accent) !important; outline: none; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
        select option { background: #111; }
      `}</style>

      <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Sidebar active="reservations" />

        <main className="flex-1 px-10 py-8" style={{ fontFamily: "'Barlow', sans-serif" }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/admin/reservations")}
                className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:opacity-70"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
              </button>
              <div>
                <p className="text-[9px] tracking-[4px] uppercase mb-0.5"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                  Admin · Réservations
                </p>
                <h1 className="font-black uppercase leading-none"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                  {isEdit ? "Modifier la réservation" : "Nouvelle réservation"}
                </h1>
              </div>
            </div>

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
            <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "2px" }}>Chargement...</p>
          ) : (
            <div className="flex gap-6 max-w-4xl">

              {/* ── Formulaire ── */}
              <div className="flex-1 rounded-2xl p-8"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>

                {/* Espace */}
                <div className="mb-6">
                  <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                    style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                    Espace
                  </label>
                  <select value={form.space_id} onChange={(e) => handleSpaceChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm cursor-pointer transition-all"
                    style={{
                      background: "var(--bg-primary)",
                      border: `1px solid ${errors.space_id ? "#f87171" : "var(--border-color)"}`,
                      color: form.space_id ? "var(--text-primary)" : "var(--text-muted)",
                      fontFamily: "'Barlow', sans-serif",
                    }}>
                    <option value="">Sélectionner un espace...</option>
                    {spaces.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {Number(s.price_per_day).toLocaleString()} FCFA/jour
                      </option>
                    ))}
                  </select>
                  {errors.space_id && (
                    <p className="text-[10px] mt-1" style={{ color: "#f87171", fontFamily: "'Rajdhani', sans-serif" }}>{errors.space_id}</p>
                  )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                      Date de début
                    </label>
                    <input type="date" value={form.start_date}
                      onChange={(e) => { setForm({ ...form, start_date: e.target.value }); setErrors({ ...errors, start_date: null }); }}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                      style={{
                        background: "var(--bg-primary)",
                        border: `1px solid ${errors.start_date ? "#f87171" : "var(--border-color)"}`,
                        color: "var(--text-primary)",
                        fontFamily: "'Barlow', sans-serif",
                      }}
                    />
                    {errors.start_date && (
                      <p className="text-[10px] mt-1" style={{ color: "#f87171", fontFamily: "'Rajdhani', sans-serif" }}>{errors.start_date}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                      Date de fin
                    </label>
                    <input type="date" value={form.end_date}
                      onChange={(e) => { setForm({ ...form, end_date: e.target.value }); setErrors({ ...errors, end_date: null }); }}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                      style={{
                        background: "var(--bg-primary)",
                        border: `1px solid ${errors.end_date ? "#f87171" : "var(--border-color)"}`,
                        color: "var(--text-primary)",
                        fontFamily: "'Barlow', sans-serif",
                      }}
                    />
                    {errors.end_date && (
                      <p className="text-[10px] mt-1" style={{ color: "#f87171", fontFamily: "'Rajdhani', sans-serif" }}>{errors.end_date}</p>
                    )}
                  </div>
                </div>

                {/* Statut + Paiement (mode edit seulement) */}
                {isEdit && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                        Statut
                      </label>
                      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm cursor-pointer transition-all"
                        style={{ background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", fontFamily: "'Barlow', sans-serif" }}>
                        <option value="en_attente">En attente</option>
                        <option value="confirmee">Confirmée</option>
                        <option value="annulee">Annulée</option>
                      </select>
                    </div>
                    <div className="flex flex-col justify-center">
                      <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                        Paiement
                      </label>
                      <div className="flex items-center gap-3">
                        <div onClick={() => setForm({ ...form, is_paid: form.is_paid ? 0 : 1 })}
                          className="w-12 h-6 rounded-full cursor-pointer transition-all flex items-center px-1"
                          style={{ background: form.is_paid ? "#4ade80" : "var(--border-color)" }}>
                          <div className="w-4 h-4 rounded-full bg-white transition-all"
                            style={{ transform: form.is_paid ? "translateX(24px)" : "translateX(0)" }} />
                        </div>
                        <span className="text-sm font-semibold"
                          style={{ fontFamily: "'Rajdhani', sans-serif", color: form.is_paid ? "#4ade80" : "var(--text-muted)" }}>
                          {form.is_paid ? "Payée" : "Non payée"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="my-6" style={{ borderTop: "1px solid var(--border-color)" }} />

                {/* Buttons */}
                <div className="flex gap-4">
                  <button onClick={() => navigate("/admin/reservations")}
                    className="px-6 py-3 rounded-xl text-xs tracking-[2px] uppercase font-semibold cursor-pointer"
                    style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}>
                    Annuler
                  </button>
                  <button onClick={handleSubmit} disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl text-xs tracking-[2px] uppercase font-bold cursor-pointer transition-all"
                    style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif", opacity: loading ? 0.7 : 1 }}>
                    {loading ? "Enregistrement..." : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {isEdit ? "Enregistrer" : "Créer la réservation"}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* ── Récap prix ── */}
              <div className="w-64 flex-shrink-0">
                <div className="rounded-2xl p-6 sticky top-8"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                  <p className="text-[9px] tracking-[3px] uppercase mb-4"
                    style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                    Récapitulatif
                  </p>

                  {selectedSpace ? (
                    <>
                      <div className="mb-4 pb-4" style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <p className="font-black text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
                          {selectedSpace.name}
                        </p>
                        <p className="text-[10px] uppercase tracking-[1px]" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                          {selectedSpace.type}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px]" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>Prix / jour</span>
                        <span className="text-xs font-bold" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {Number(selectedSpace.price_per_day).toLocaleString()} FCFA
                        </span>
                      </div>
                      {form.start_date && form.end_date && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px]" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>Durée</span>
                          <span className="text-xs font-bold" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                            {Math.ceil((new Date(form.end_date) - new Date(form.start_date)) / (1000 * 60 * 60 * 24))} jour(s)
                          </span>
                        </div>
                      )}
                      {total !== null && (
                        <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
                          <p className="text-[9px] tracking-[2px] uppercase mb-1" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>Total</p>
                          <p className="font-black" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "28px", color: "var(--accent)", letterSpacing: "-0.5px" }}>
                            {total.toLocaleString()} <span className="text-sm">FCFA</span>
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs italic" style={{ color: "var(--text-muted)", fontFamily: "'Barlow', sans-serif" }}>
                      Sélectionne un espace pour voir le récapitulatif.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
