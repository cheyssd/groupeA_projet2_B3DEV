import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Sidebar } from "./AdminOverview";

const API = "http://127.0.0.1:8000/api";

export default function AdminProfil() {
  const { isDark, toggle } = useTheme();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetch(`${API}/user`, { headers })
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
        setForm({
          firstname: data.firstname || "",
          lastname:  data.lastname  || "",
          email:     data.email     || "",
          phone:     data.phone     || "",
          address:   data.address   || "",
        });
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${API}/admin/users/${user.id}`, {
      method: "PUT", headers,
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const fields = [
    { key: "firstname", label: "Prénom",    placeholder: "Ton prénom" },
    { key: "lastname",  label: "Nom",       placeholder: "Ton nom" },
    { key: "email",     label: "Email",     placeholder: "Ton email", full: true },
    { key: "phone",     label: "Téléphone", placeholder: "Ex: 0700000000" },
    { key: "address",   label: "Adresse",   placeholder: "Ex: Abidjan" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');
        input::placeholder { color: var(--text-muted); opacity: 1; }
        input:focus { border-color: var(--accent) !important; outline: none; }
      `}</style>

      <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Sidebar active="profil" />

        <main className="flex-1 px-10 py-8" style={{ fontFamily: "'Barlow', sans-serif" }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[9px] tracking-[4px] uppercase mb-1"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                Admin · Profil
              </p>
              <h1 className="font-black uppercase leading-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "36px", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                Mon profil
              </h1>
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

          {loading ? (
            <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "2px" }}>Chargement...</p>
          ) : (
            <div className="flex gap-8 max-w-4xl">

              {/* ── Avatar card ── */}
              <div className="w-56 flex-shrink-0">
                <div className="rounded-2xl p-6 flex flex-col items-center gap-4"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>

                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl"
                    style={{ background: "var(--accent)", color: "#000", fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {user.firstname?.[0]}{user.lastname?.[0]}
                  </div>

                  <div className="text-center">
                    <p className="font-black text-lg leading-none mb-1"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
                      {user.firstname} {user.lastname}
                    </p>
                    <span className="px-2.5 py-1 rounded-full text-[9px] tracking-[1px] uppercase font-bold"
                      style={{ background: "rgba(167,139,250,0.12)", color: "#a78bfa", fontFamily: "'Rajdhani', sans-serif" }}>
                      {user.role}
                    </span>
                  </div>

                  <div className="w-full pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
                    <div className="flex flex-col gap-2">
                      <div>
                        <p className="text-[8px] tracking-[2px] uppercase mb-0.5"
                          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                          Membre depuis
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif" }}>
                          {new Date(user.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Form ── */}
              <div className="flex-1 rounded-2xl p-8"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>

                <p className="text-[9px] tracking-[3px] uppercase mb-6"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                  Informations personnelles
                </p>

                <div className="grid grid-cols-2 gap-5">
                  {fields.map((f) => (
                    <div key={f.key} className={f.full ? "col-span-2" : ""}>
                      <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                        {f.label}
                      </label>
                      <input
                        type="text"
                        value={form[f.key]}
                        placeholder={f.placeholder}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                        style={{
                          background: "var(--bg-primary)",
                          border: "1px solid var(--border-color)",
                          color: "var(--text-primary)",
                          fontFamily: "'Barlow', sans-serif",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8" style={{ borderTop: "1px solid var(--border-color)" }} />

                <div className="flex items-center gap-4 mt-6">
                  <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl text-xs tracking-[2px] uppercase font-bold cursor-pointer transition-all"
                    style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif", opacity: saving ? 0.7 : 1 }}>
                    {saving ? "Enregistrement..." : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Enregistrer
                      </>
                    )}
                  </button>

                  {/* Success message */}
                  {success && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <p className="text-[10px] tracking-[1px] uppercase font-bold"
                        style={{ color: "#4ade80", fontFamily: "'Rajdhani', sans-serif" }}>
                        Profil mis à jour !
                      </p>
                    </div>
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
