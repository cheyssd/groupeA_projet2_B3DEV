import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useContext, useState, useEffect } from 'react'
import { useLowCarbon } from '../contexts/lowcarboncontext.jsx'
import { AuthContext } from '../contexts/AuthContext'
import heroLight from '../assets/hero-light.jpeg'

const API_URL = window.location.hostname === 'localhost'
  ? 'http://127.0.0.1:8000'
  : 'https://api-raffaa.ifran-b3dev.com';

export default function HeroBanner() {
  const { isDark, toggle } = useTheme()
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const { isLowCarbon, toggleLowCarbon } = useLowCarbon();

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isLoggedIn = !!token

  const [spaces, setSpaces] = useState([])
  const [selectedSpace, setSelectedSpace] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [availableSpaces, setAvailableSpaces] = useState([])
  const [loadingSpaces, setLoadingSpaces] = useState(false)
  const [filtered, setFiltered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/spaces?per_page=100`)
      .then(r => r.json())
      .then(data => setSpaces(data.data || []))
      .catch(() => { })
  }, [])

  useEffect(() => {
    if (!selectedDate) {
      setAvailableSpaces([])
      setFiltered(false)
      return
    }
    setLoadingSpaces(true)
    fetch(`${API_URL}/api/spaces/available?start_date=${selectedDate}&end_date=${selectedDate}`)
      .then(r => r.json())
      .then(data => {
        setAvailableSpaces(Array.isArray(data) ? data : [])
        setFiltered(true)
        setSelectedSpace("")
        setLoadingSpaces(false)
      })
      .catch(() => setLoadingSpaces(false))
  }, [selectedDate])

  const displayedSpaces = filtered ? availableSpaces : spaces
  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = () => {
    if (selectedSpace) {
      navigate(`/spaces/${selectedSpace}`, {
        state: { preselectedDate: selectedDate }
      })
    } else {
      navigate('/spaces')
    }
  }

  const handleLogout = async () => {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      await logout()
      navigate('/login')
    }
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>

      <img
        src={
          isDark
            ? "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
            : heroLight
        }
        alt="Workspace hero"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: isDark
            ? "brightness(0.6) saturate(0.75)"
            : "brightness(0.6) saturate(0.8)",
        }}
        loading="eager"
      />

      <div className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,1) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-7">

        <div className="flex flex-col gap-0.5">
          <span className="font-black text-xl uppercase tracking-wide cursor-pointer hover:opacity-70 transition"
            onClick={() => navigate('/')}
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
            ECOWORK<span style={{ color: "#F7D6E0" }}>.</span>
          </span>
          <span className="text-[9px] tracking-[4px] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
            High Performance
          </span>
        </div>

        <span className="hidden md:block text-[11px] tracking-[3px] uppercase pt-1"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-secondary)" }}>
          Paris, FR&nbsp;&nbsp;/&nbsp;&nbsp;5.3599°N
        </span>

        <div className="hidden md:flex items-center gap-3">

          <button onClick={toggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer"
            style={{ borderColor: "var(--border-color)", background: "var(--bg-card)", color: "var(--text-secondary)" }}>
            {isDark ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span className="text-[9px] tracking-[2px] uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              {isDark ? "Light" : "Dark"}
            </span>
          </button>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate(user.role === 'admin' ? '/admin/adminOverview' : '/user/dashboard')}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 cursor-pointer hover:scale-105"
                style={{
                  borderColor: "var(--border-color)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ background: 'var(--accent)', color: '#000' }}
                >
                  {user.firstname?.charAt(0)}
                </div>
                <span className="text-[9px] tracking-[2px] uppercase font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {user.firstname}
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-[9px] tracking-[2px] uppercase font-bold hover:scale-105"
                style={{
                  background: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
                  color: '#ef4444',
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 cursor-pointer text-[9px] tracking-[2px] uppercase font-bold hover:scale-105"
                style={{ borderColor: "var(--border-color)", background: "transparent", color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif" }}>
                Connexion
              </Link>

              <Link to="/register"
                className="flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-[9px] tracking-[2px] uppercase font-bold hover:scale-105"
                style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif" }}>
                Inscription
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger menu */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1 w-8 h-8 items-center justify-center"
          style={{ color: "var(--text-primary)" }}>
          <div className="w-5 h-0.5 transition-all" style={{ background: "currentColor", transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
          <div className="w-5 h-0.5 transition-all" style={{ background: "currentColor", opacity: menuOpen ? 0 : 1 }} />
          <div className="w-5 h-0.5 transition-all" style={{ background: "currentColor", transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 right-6 z-50 rounded-2xl p-4 border shadow-xl flex flex-col gap-3 min-w-[200px]"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          {isLoggedIn ? (
            <>
              <Link to={user.role === 'admin' ? '/admin/adminOverview' : '/user/dashboard'}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300"
                style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ background: 'var(--accent)', color: '#000' }}>
                  {user.firstname?.charAt(0)}
                </div>
                <span className="text-[9px] tracking-[2px] uppercase font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {user.firstname}
                </span>
              </Link>
              <button onClick={() => { setMenuOpen(false); handleLogout() }}
                className="px-4 py-2 rounded-full text-[9px] tracking-[2px] uppercase font-bold text-left"
                style={{ color: '#ef4444', background: isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.05)', fontFamily: "'Rajdhani', sans-serif" }}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-full border text-[9px] tracking-[2px] uppercase font-bold text-center"
                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif" }}>
                Connexion
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-full text-[9px] tracking-[2px] uppercase font-bold text-center"
                style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif" }}>
                Inscription
              </Link>
            </>
          )}
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between px-6 md:px-12 pt-12 md:pt-20 gap-8 pb-8">

        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <h1 className="font-black uppercase leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(56px, 12vw, 118px)",
              letterSpacing: "-1px",
              color: isDark ? "var(--text-primary)" : "#fff",
            }}>
            L'ESPACE
            <span className="block" style={{
              color: "transparent",
              WebkitTextStroke: isDark ? "2px var(--accent)" : "2px #fff"
            }}>SANS LIMITES.</span>
          </h1>

          <p className="mt-6 text-sm italic leading-relaxed pl-4 max-w-xs border-l-2 mx-auto lg:mx-0"
            style={{
              fontFamily: "'Barlow', sans-serif",
              color: isDark ? "var(--text-secondary)" : "rgba(255,255,255,0.85)",
              borderColor: "var(--accent)",
            }}>
            Sobriété numérique, confort absolu. Bienvenue<br />
            dans l'écosystème GreenSpace.
          </p>
        </div>

        <div className="w-full lg:w-80 flex-shrink-0 rounded-2xl p-8 border"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>

          <div className="text-center mb-7">
            <p className="font-bold text-xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
              Réservez votre
            </p>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>espace de focus</p>
          </div>

          <div className="mb-3">
            <label className="block text-[9px] tracking-[3px] uppercase mb-2"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
              Date souhaitée
            </label>
            <div className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: "var(--border-color)", border: "1px solid var(--border-color)" }}>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#F7D6E0" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <input type="date" min={today} value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1 cursor-pointer"
                style={{
                  color: selectedDate ? "var(--text-primary)" : "var(--text-muted)",
                  fontFamily: "'Barlow', sans-serif",
                  colorScheme: isDark ? "dark" : "light",
                }}
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-[9px] tracking-[3px] uppercase mb-2"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
              {filtered ? `${displayedSpaces.length} espace${displayedSpaces.length > 1 ? 's' : ''} disponible${displayedSpaces.length > 1 ? 's' : ''}` : "Choisir un espace"}
            </label>
            <div className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: "var(--border-color)", border: "1px solid var(--border-color)" }}>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#F7D6E0" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <select value={selectedSpace} onChange={e => setSelectedSpace(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1 cursor-pointer"
                style={{ color: selectedSpace ? "var(--text-primary)" : "var(--text-muted)", fontFamily: "'Barlow', sans-serif" }}>
                <option value="">
                  {loadingSpaces ? "Chargement..." : filtered && displayedSpaces.length === 0 ? "Aucun espace dispo" : "Sélectionner..."}
                </option>
                {displayedSpaces.map(s => (
                  <option key={s.id} value={s.id} style={{ background: isDark ? "#1a1a1a" : "#fff" }}>
                    {s.name} — {Number(s.price_per_day).toLocaleString()} €/h
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button onClick={handleSubmit}
            className="w-full py-4 font-bold text-xs tracking-[3px] uppercase rounded-xl transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: "'Rajdhani', sans-serif", background: "#F7D6E0", color: "var(--bg-primary)" }}>
            Vérifier la disponibilité
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between px-6 md:px-12 pb-10 mt-8 md:mt-16 gap-6 sm:gap-0">
        <div className="flex gap-10">
          <div>
            <p className="text-[9px] tracking-[3px] uppercase mb-1"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>Impact</p>
            <p className="font-bold text-sm tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#F7D6E0" }}>
              -40% CO2
            </p>
          </div>
          <div>
            <p className="text-[9px] tracking-[3px] uppercase mb-1"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>Status</p>
            <p className="font-bold text-sm tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>En direct</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-px" style={{ background: "var(--text-muted)" }} />
          <span className="text-[9px] tracking-[4px] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
            Scroll pour explorer
          </span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:ital,wght@0,400;1,400&family=Rajdhani:wght@500;600;700&display=swap');
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: ${isDark ? 'invert(1)' : 'invert(0)'};
          cursor: pointer;
        }
      `}</style>
    </section>
  )
}