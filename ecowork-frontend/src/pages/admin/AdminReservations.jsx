import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Sidebar } from "./AdminOverview";

const API = "http://127.0.0.1:8000/api";

const STATUS_MAP = {
  confirmee:  { label: "Confirmée",  bg: "rgba(74,222,128,0.12)",  color: "#4ade80" },
  en_attente: { label: "En attente", bg: "rgba(251,146,60,0.12)",  color: "#fb923c" },
  annulee:    { label: "Annulée",    bg: "rgba(248,113,113,0.12)", color: "#f87171" },
};

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || { label: status, bg: "rgba(255,255,255,0.05)", color: "var(--text-muted)" };
  return (
    <span className="px-2.5 py-1 rounded-full text-[9px] tracking-[1px] uppercase font-bold"
      style={{ fontFamily: "'Rajdhani', sans-serif", background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-md rounded-2xl p-8 relative"
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

export default function AdminReservations() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [reservations, setReservations] = useState([]);
  const [meta, setMeta] = useState({ total: 0, last_page: 1, current_page: 1 });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPaid, setFilterPaid] = useState("");
  const [page, setPage] = useState(1);

  const [showStatus, setShowStatus] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const fetchReservations = () => {
    setLoading(true);
    const params = new URLSearchParams({ page });
    if (filterStatus) params.append("status", filterStatus);
    if (filterPaid !== "") params.append("is_paid", filterPaid);

    fetch(`${API}/reservations?${params}`, { headers })
      .then((r) => r.json())
      .then((data) => {
        setReservations(data.data || []);
        setMeta({ total: data.total, last_page: data.last_page, current_page: data.current_page });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchReservations(); }, [page, filterStatus, filterPaid]);

  const handleUpdateStatus = async (status) => {
    setSaving(true);
    await fetch(`${API}/reservations/${showStatus.id}/status`, {
      method: "PATCH", headers, body: JSON.stringify({ status }),
    });
    setSaving(false);
    setShowStatus(null);
    fetchReservations();
  };

  const handleMarkPaid = async (reservation) => {
    await fetch(`${API}/reservations/${reservation.id}/paid`, {
      method: "PATCH", headers,
    });
    fetchReservations();
  };

  const handleDelete = async () => {
    setSaving(true);
    await fetch(`${API}/reservations/${showDelete.id}`, { method: "DELETE", headers });
    setSaving(false);
    setShowDelete(null);
    fetchReservations();
  };

  const formatDate = (d) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');
        .row-hover:hover { background: rgba(255,255,255,0.02); }
        select option { background: #1a1a1a; }
      `}</style>

      <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Sidebar active="reservations" />

        <main className="flex-1 px-10 py-8 overflow-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>

          {/* ── Header ── */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[9px] tracking-[4px] uppercase mb-1"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                Admin · Réservations
              </p>
              <h1 className="font-black uppercase leading-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "36px", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                Gestion des réservations
              </h1>
            </div>

            <div className="flex items-center gap-3">
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

              <button onClick={() => navigate("/admin/reservations/create")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all text-xs tracking-[2px] uppercase font-bold"
                style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Ajouter
              </button>
            </div>

          </div>

          {/* ── Filters ── */}
          <div className="flex items-center gap-3 mb-6">

            {/* Statut */}
            <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
              className="px-4 py-2.5 rounded-xl outline-none text-xs cursor-pointer"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "1px" }}>
              <option value="">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="confirmee">Confirmée</option>
              <option value="annulee">Annulée</option>
            </select>

            {/* Paiement */}
            <select value={filterPaid} onChange={(e) => { setFilterPaid(e.target.value); setPage(1); }}
              className="px-4 py-2.5 rounded-xl outline-none text-xs cursor-pointer"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "1px" }}>
              <option value="">Tout paiement</option>
              <option value="1">Payées</option>
              <option value="0">Non payées</option>
            </select>

            <span className="text-[10px] tracking-[2px] uppercase ml-auto"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
              {meta.total} réservation{meta.total > 1 ? "s" : ""}
            </span>
          </div>

          {/* ── Table ── */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>

            {/* Col headers */}
            <div className="grid px-6 py-3"
              style={{ gridTemplateColumns: "2fr 1.5fr 2fr 1.2fr 1fr 1fr 1fr", borderBottom: "1px solid var(--border-color)" }}>
              {["Client", "Espace", "Dates", "Montant", "Statut", "Paiement", "Actions"].map((h) => (
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
            ) : reservations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--text-muted)" }}>
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>Aucune réservation trouvée.</p>
              </div>
            ) : (
              reservations.map((r, i) => (
                <div key={r.id}
                  className="row-hover grid px-6 py-4 items-center transition-colors"
                  style={{
                    gridTemplateColumns: "2fr 1.5fr 2fr 1.2fr 1fr 1fr 1fr",
                    borderBottom: i < reservations.length - 1 ? "1px solid var(--border-color)" : "none",
                  }}>

                  {/* Client */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs"
                      style={{ background: "var(--accent)", color: "#000", fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {r.user?.firstname?.[0]}{r.user?.lastname?.[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {r.user?.firstname} {r.user?.lastname}
                      </p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                        {r.user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Espace */}
                  <p className="text-sm" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {r.space?.name}
                  </p>

                  {/* Dates */}
                  <div>
                    <p className="text-[10px]" style={{ color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif" }}>
                      {formatDate(r.start_date)}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                      → {formatDate(r.end_date)}
                    </p>
                  </div>

                  {/* Montant */}
                  <p className="text-sm font-bold" style={{ color: "var(--accent)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {Number(r.total_price).toLocaleString()} <span className="text-[10px]">FCFA</span>
                  </p>

                  {/* Statut */}
                  <StatusBadge status={r.status} />

                  {/* Paiement */}
                  <div>
                    {r.is_paid ? (
                      <span className="px-2.5 py-1 rounded-full text-[9px] tracking-[1px] uppercase font-bold"
                        style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", fontFamily: "'Rajdhani', sans-serif" }}>
                        Payée
                      </span>
                    ) : (
                      <button onClick={() => handleMarkPaid(r)}
                        className="px-2.5 py-1 rounded-full text-[9px] tracking-[1px] uppercase font-bold cursor-pointer transition-all hover:opacity-80"
                        style={{ background: "rgba(251,146,60,0.12)", color: "#fb923c", fontFamily: "'Rajdhani', sans-serif" }}>
                        Non payée
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Modifier */}
                    <button onClick={() => navigate(`/admin/reservations/${r.id}/edit`)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:opacity-80"
                      style={{ background: "rgba(41,212,224,0.1)", color: "var(--accent)" }}
                      title="Modifier">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    {/* Changer statut */}
                    <button onClick={() => setShowStatus(r)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:opacity-80"
                      style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa" }}
                      title="Changer le statut">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 11 12 14 22 4"/>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    </button>
                    {/* Supprimer */}
                    <button onClick={() => setShowDelete(r)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:opacity-80"
                      style={{ background: "rgba(248,113,113,0.1)", color: "#f87171" }}
                      title="Supprimer">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6"/><path d="M14 11v6"/>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── Pagination ── */}
          {meta.last_page > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-muted)", opacity: page === 1 ? 0.4 : 1 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
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
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ── Modal Statut ── */}
      {showStatus && (
        <Modal title="Changer le statut" onClose={() => setShowStatus(null)}>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow', sans-serif" }}>
            Réservation de <strong style={{ color: "var(--text-primary)" }}>
              {showStatus.user?.firstname} {showStatus.user?.lastname}
            </strong> — <span style={{ color: "var(--accent)" }}>{showStatus.space?.name}</span>
          </p>
          <div className="flex flex-col gap-3">
            {Object.entries(STATUS_MAP).map(([key, val]) => (
              <button key={key} onClick={() => handleUpdateStatus(key)} disabled={saving || showStatus.status === key}
                className="w-full py-3 rounded-xl text-xs tracking-[2px] uppercase font-bold cursor-pointer transition-all"
                style={{
                  background: showStatus.status === key ? val.bg : "var(--border-color)",
                  color: showStatus.status === key ? val.color : "var(--text-secondary)",
                  fontFamily: "'Rajdhani', sans-serif",
                  opacity: saving ? 0.6 : 1,
                  border: `1px solid ${showStatus.status === key ? val.color : "transparent"}`,
                }}>
                {showStatus.status === key ? `✓ ${val.label} (actuel)` : val.label}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* ── Modal Suppression ── */}
      {showDelete && (
        <Modal title="Supprimer la réservation" onClose={() => setShowDelete(null)}>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow', sans-serif" }}>
            Tu vas supprimer la réservation de <strong style={{ color: "var(--text-primary)" }}>
              {showDelete.user?.firstname} {showDelete.user?.lastname}
            </strong>. Cette action est irréversible.
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