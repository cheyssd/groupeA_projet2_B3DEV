import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const API_URL = window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:8000'
    : 'https://api-raffaa.ifran-b3dev.com';

//Sidebar
export function Sidebar({ active }) {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [adminUser, setAdminUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/user`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => setAdminUser(data))
      .catch(() => { });
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/api/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    localStorage.removeItem("token");
    navigate("/login");
  };

  const links = [
    {
      key: "overview", label: "Overview", path: "/admin/adminOverview",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
    },
    {
      key: "spaces", label: "Espaces", path: "/admin/spaces",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
    },
    {
      key: "reservations", label: "Réservations", path: "/admin/reservations",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
    },
    {
      key: "users", label: "Utilisateurs", path: "/admin/users",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    },
    {
      key: "profil", label: "Profil", path: "/admin/profil",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    },
    {
      key: "equipements", label: "Équipements", path: "/admin/equipements",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
    },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-2 mb-10 flex items-center justify-between">
        <div>
          <div className="font-black text-lg uppercase cursor-pointer"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}
            onClick={() => navigate("/")}>
            {collapsed ? "E." : <>ECOWORK<span style={{ color: "var(--accent)" }}>.</span></>}
          </div>
          {!collapsed && (
            <div className="text-[9px] tracking-[3px] uppercase mt-0.5"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
              Admin Panel
            </div>
          )}
        </div>
        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="hidden md:flex w-6 h-6 items-center justify-center rounded cursor-pointer"
          style={{ color: "var(--text-muted)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {collapsed ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
          </svg>
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {!collapsed && (
          <p className="text-[8px] tracking-[3px] uppercase px-2 mb-2"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
            Navigation
          </p>
        )}
        {links.map((link) => {
          const isActive = active === link.key;
          return (
            <button
              key={link.key}
              onClick={() => { navigate(link.path); setMobileOpen(false); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all w-full"
              style={{
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? (isDark ? "#000" : "#fff") : "var(--text-secondary)",
                boxShadow: isActive && !isDark ? "0 4px 12px -2px rgba(14,165,233,0.3)" : "none",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: isActive ? 700 : 500,
                justifyContent: collapsed ? "center" : "flex-start",
              }}
              title={collapsed ? link.label : undefined}
            >
              <span style={{ opacity: isActive ? 1 : 0.6, flexShrink: 0 }}>{link.icon}</span>
              {!collapsed && link.label}
            </button>
          );
        })}
      </nav>

      {/* Admin info + logout */}
      <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
        {adminUser && !collapsed && (
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs"
              style={{ background: "var(--accent)", color: "#000", fontFamily: "'Barlow Condensed', sans-serif" }}>
              {adminUser.firstname?.[0]}{adminUser.lastname?.[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate"
                style={{ color: "var(--text-primary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                {adminUser.firstname} {adminUser.lastname}
              </p>
              <p className="text-[9px] tracking-[1px] uppercase"
                style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                {adminUser.role || "Admin"}
              </p>
            </div>
          </div>
        )}

        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 px-3 py-2 rounded-xl w-full cursor-pointer transition-all mb-1"
          style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", justifyContent: collapsed ? "center" : "flex-start" }}
          title={collapsed ? "Retour au site" : undefined}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {!collapsed && "Retour au site"}
        </button>

        <button onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-xl w-full cursor-pointer transition-all"
          style={{ color: "#f87171", fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", background: "rgba(248,113,113,0.08)", justifyContent: collapsed ? "center" : "flex-start" }}
          title={collapsed ? "Déconnexion" : undefined}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && "Déconnexion"}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 border-b"
        style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
        <div className="font-black text-base uppercase cursor-pointer"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}
          onClick={() => navigate("/")}>
          ECOWORK<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <button onClick={() => setMobileOpen(o => !o)}
          className="flex flex-col justify-center items-center w-9 h-9 rounded-full border cursor-pointer"
          style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
          <span className="block w-4 h-px mb-1" style={{ background: "var(--text-primary)" }} />
          <span className="block w-4 h-px mb-1" style={{ background: "var(--text-primary)" }} />
          <span className="block w-4 h-px" style={{ background: "var(--text-primary)" }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-64 h-full flex flex-col py-6 px-4 pt-16 border-r overflow-y-auto"
            style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
            <SidebarContent />
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)}
            style={{ background: "rgba(0,0,0,0.5)" }} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-shrink-0 min-h-screen flex-col py-8 px-4 border-r transition-all duration-300"
        style={{
          background: "var(--bg-primary)",
          borderColor: "var(--border-color)",
          width: collapsed ? "64px" : "224px",
        }}>
        <SidebarContent />
      </aside>
    </>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, accent }) {
  const { isDark } = useTheme();
  return (
    <div className="rounded-2xl p-5 md:p-6 flex flex-col justify-between transition-all"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", minHeight: "140px" }}>
      <div className="flex items-start justify-between">
        <p className="text-[9px] tracking-[3px] uppercase font-bold"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
          {label}
        </p>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: isDark ? `${accent}18` : `${accent}10`, color: accent }}>
          {icon}
        </div>
      </div>
      <div>
        <p className="font-black leading-none mb-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(32px, 5vw, 44px)", color: isDark ? accent : "var(--text-primary)", letterSpacing: "-1px" }}>
          {value}
        </p>
        <p className="text-[10px] tracking-[1px] font-medium"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

// ─── Status Badge ──────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    confirmee: { label: "Confirmée", bg: "rgba(74,222,128,0.12)", color: "#4ade80" },
    en_attente: { label: "En attente", bg: "rgba(251,146,60,0.12)", color: "#fb923c" },
    annulee: { label: "Annulée", bg: "rgba(248,113,113,0.12)", color: "#f87171" },
  };
  const s = map[status] || { label: status, bg: "rgba(255,255,255,0.05)", color: "var(--text-muted)" };
  return (
    <span className="px-2.5 py-1 rounded-full text-[9px] tracking-[1px] uppercase font-bold"
      style={{ fontFamily: "'Rajdhani', sans-serif", background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

// ─── Main Overview ─────────────────────────────────────────────────────────
export default function AdminOverview() {
  const { isDark, toggle } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_URL}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && !stats) {
    return (
      <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Sidebar active="overview" />
        <main className="flex-1 flex items-center justify-center pt-14 md:pt-0">
          <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
            Erreur — vérifie ton token ou que Laravel est lancé.
          </p>
        </main>
      </div>
    );
  }

  const statCards = stats ? [
    {
      label: "Espaces actifs", value: stats.active_spaces, sub: `${stats.total_spaces} espaces au total`,
      accent: "#29d4e0",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
    },
    {
      label: "Utilisateurs", value: stats.total_users, sub: "comptes inscrits",
      accent: "#a78bfa",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    },
    {
      label: "Réservations", value: stats.total_reservations, sub: `${stats.pending_reservations} en attente`,
      accent: "#fb923c",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
    },
    {
      label: "Revenus totaux", value: `${Number(stats.total_revenue).toLocaleString()}`, sub: "€ générés",
      accent: "#4ade80",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
    },
  ] : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');
        .table-row:hover { background: rgba(255,255,255,0.02); }
      `}</style>

      <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Sidebar active="overview" />

        <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-auto pt-20 md:pt-8" style={{ fontFamily: "'Barlow', sans-serif" }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <p className="text-[9px] tracking-[4px] uppercase mb-1"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                Admin · Dashboard
              </p>
              <h1 className="font-black uppercase leading-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                Overview
              </h1>
            </div>

            <button onClick={toggle}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-card)", color: "var(--text-secondary)" }}>
              {isDark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              <span className="hidden sm:inline text-[9px] tracking-[2px] uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                {isDark ? "Light" : "Dark"}
              </span>
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "3px" }}>
                CHARGEMENT...
              </p>
            </div>
          ) : (
            <>
              {/* Stat Cards — 2 cols on mobile, 2x2 on md */}
              <div className="grid grid-cols-2 gap-3 md:gap-5 mb-6 md:mb-8">
                {statCards.map((card) => (
                  <StatCard key={card.label} {...card} />
                ))}
              </div>

              {/* Réservations récentes */}
              <div className="rounded-2xl overflow-hidden"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>

                <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5"
                  style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <p className="text-[9px] tracking-[4px] uppercase font-bold"
                    style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                    Réservations récentes
                  </p>
                  <span className="text-[9px] tracking-[2px] uppercase px-2 py-1 rounded-full"
                    style={{ fontFamily: "'Rajdhani', sans-serif", background: "var(--border-color)", color: "var(--text-muted)" }}>
                    {stats?.recent_reservations?.length ?? 0} entrée{(stats?.recent_reservations?.length ?? 0) > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Desktop table header */}
                <div className="hidden md:grid px-6 py-3"
                  style={{ gridTemplateColumns: "2fr 1.5fr 2fr 1.5fr 1fr", borderBottom: "1px solid var(--border-color)" }}>
                  {["Client", "Espace", "Dates", "Montant", "Statut"].map((h) => (
                    <p key={h} className="text-[8px] tracking-[2px] uppercase"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                      {h}
                    </p>
                  ))}
                </div>

                {stats.recent_reservations.length === 0 ? (
                  <p className="px-6 py-8 text-sm italic" style={{ color: "var(--text-muted)" }}>
                    Aucune réservation récente.
                  </p>
                ) : (
                  stats.recent_reservations.map((r, i) => (
                    <div key={r.id}
                      style={{ borderBottom: i < stats.recent_reservations.length - 1 ? "1px solid var(--border-color)" : "none" }}>

                      {/* Desktop row */}
                      <div className="table-row hidden md:grid px-6 py-4 transition-colors items-center"
                        style={{ gridTemplateColumns: "2fr 1.5fr 2fr 1.5fr 1fr" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs"
                            style={{ background: "var(--accent)", color: "#000", fontFamily: "'Barlow Condensed', sans-serif" }}>
                            {r.user.firstname[0]}{r.user.lastname[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                              {r.user.firstname} {r.user.lastname}
                            </p>
                            <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                              {r.user.email}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {r.space.name}
                        </p>
                        <div>
                          <p className="text-[10px]" style={{ color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif" }}>{r.start_date}</p>
                          <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>→ {r.end_date}</p>
                        </div>
                        <p className="text-sm font-bold" style={{ color: "var(--accent)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {Number(r.total_price).toLocaleString()} <span className="text-[10px]">€</span>
                        </p>
                        <StatusBadge status={r.status} />
                      </div>

                      {/* Mobile card */}
                      <div className="md:hidden px-4 py-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                              style={{ background: "var(--accent)", color: "#000", fontFamily: "'Barlow Condensed', sans-serif" }}>
                              {r.user.firstname[0]}{r.user.lastname[0]}
                            </div>
                            <div>
                              <p className="text-sm font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                                {r.user.firstname} {r.user.lastname}
                              </p>
                              <p className="text-[9px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>{r.user.email}</p>
                            </div>
                          </div>
                          <StatusBadge status={r.status} />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs" style={{ color: "var(--text-secondary)", fontFamily: "'Barlow Condensed', sans-serif" }}>{r.space.name}</p>
                          <p className="text-sm font-bold" style={{ color: "var(--accent)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                            {Number(r.total_price).toLocaleString()} €
                          </p>
                        </div>
                        <p className="text-[9px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                          {r.start_date} → {r.end_date}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}