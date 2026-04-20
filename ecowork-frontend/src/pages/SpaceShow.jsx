import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const API_URL = window.location.hostname === 'localhost'
  ? 'http://127.0.0.1:8000/api'
  : 'https://api-raffaa.ifran-b3dev.com/api';

const STORAGE_URL = API_URL.replace('/api', '/storage');

export default function SpaceShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  const [space, setSpace] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [bookingOpen, setBookingOpen] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/spaces/${id}`).then(r => r.json()),
      fetch(`${API_URL}/spaces/${id}/reservations`).then(r => r.json()).catch(() => [])
    ])
      .then(([spaceData, reservationsData]) => {
        setSpace(spaceData);
        setReservations(Array.isArray(reservationsData) ? reservationsData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (location.state?.preselectedDate) {
      const date = new Date(location.state.preselectedDate);
      setStartDate(date);
      setEndDate(date);
      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
    }
  }, []);

  const monthNames = ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
  const dayNames = ["L", "M", "M", "J", "V", "S", "D"];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const isReserved = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    date.setHours(0, 0, 0, 0);
    return reservations.some(r => {
      if (r.status === 'annulee') return false;
      const start = new Date(r.start_date); start.setHours(0,0,0,0);
      const end = new Date(r.end_date); end.setHours(0,0,0,0);
      return date >= start && date <= end;
    });
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    if (isReserved(day)) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate); setEndDate(null);
    } else if (clickedDate < startDate) {
      setStartDate(clickedDate);
    } else {
      setEndDate(clickedDate);
    }
  };

  const isInRange = (day) => {
    if (!startDate) return false;
    const date = new Date(currentYear, currentMonth, day);
    if (!endDate) return date.getTime() === startDate.getTime();
    return date >= startDate && date <= endDate;
  };

  const isPast = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const calculateTotalHours = () => {
    if (!startDate || !endDate || !startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const start = new Date(startDate); start.setHours(startH, startM, 0, 0);
    const end = new Date(endDate); end.setHours(endH, endM, 0, 0);
    const hours = (end - start) / (1000 * 60 * 60);
    return hours > 0 ? hours : 0;
  };

  const pricePerHour = space ? parseFloat(space.price_per_day) : 0;
  const totalHours = calculateTotalHours();
  const total = pricePerHour * totalHours;

  if (loading) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>Chargement...</p>
      </section>
    );
  }

  if (!space || space.message) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <p style={{ color: "var(--text-muted)" }}>Espace introuvable.</p>
      </section>
    );
  }

  const images = space.images || [];
  const mainImage = images[0]?.filename ? `${STORAGE_URL}/${images[0].filename}` : "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";
  const secondaryImages = images.slice(1, 3);

  const BookingPanel = () => (
    <div className="rounded-2xl p-5 md:p-6"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", backdropFilter: "blur(20px)" }}>

      <div className="mb-6">
        <span className="font-black text-3xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
          {Number(pricePerHour).toLocaleString()} € 
        </span>
        <span className="text-xs ml-1" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>/ heure</span>
      </div>

      <p className="text-[9px] tracking-[3px] uppercase mb-3" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
        Période de réservation
      </p>

      <div className="rounded-xl p-4 mb-4" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: "1px solid var(--border-color)" }}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => {
            if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
            else setCurrentMonth(m => m - 1);
          }} style={{ color: "var(--text-muted)" }} className="cursor-pointer hover:opacity-70 text-lg px-1">‹</button>
          <span className="text-sm font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-primary)" }}>
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button onClick={() => {
            if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
            else setCurrentMonth(m => m + 1);
          }} style={{ color: "var(--text-muted)" }} className="cursor-pointer hover:opacity-70 text-lg px-1">›</button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {dayNames.map((d, i) => (
            <div key={i} className="text-center text-[10px]" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }).map((_, i) => {
            const day = i + 1;
            const past = isPast(day);
            const reserved = isReserved(day);
            const inRange = isInRange(day);
            const disabled = past || reserved;
            return (
              <button key={day} onClick={() => !disabled && handleDateClick(day)} disabled={disabled}
                className="text-center text-xs py-1 rounded-full transition-all"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  cursor: disabled ? "not-allowed" : "pointer",
                  background: reserved ? "rgba(255,80,80,0.3)" : inRange ? "var(--accent)" : "transparent",
                  color: reserved ? "#ff5050" : past ? "var(--text-muted)" : inRange ? "#000" : "var(--text-primary)",
                  opacity: past ? 0.3 : 1,
                  fontWeight: inRange || reserved ? "700" : "400",
                }}>
                {day}
              </button>
            );
          })}
        </div>

        {/* Légende */}
        <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "var(--accent)" }}/>
            <span className="text-[9px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>Sélectionné</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,80,80,0.3)", border: "1px solid #ff5050" }}/>
            <span className="text-[9px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>Réservé</span>
          </div>
        </div>
      </div>

      {startDate && (
        <div className="mb-4 p-3 rounded-lg" style={{ background: "rgba(41,212,224,0.1)", border: "1px solid var(--accent)" }}>
          <p className="text-[9px] tracking-[2px] uppercase mb-1" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>Période</p>
          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "'Rajdhani', sans-serif" }}>
            Du {startDate.toLocaleDateString('fr-FR')}
            {endDate && ` au ${endDate.toLocaleDateString('fr-FR')}`}
          </p>
        </div>
      )}

      <p className="text-[9px] tracking-[3px] uppercase mb-3" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>Horaires</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[{ label: "Début", value: startTime, set: setStartTime }, { label: "Fin", value: endTime, set: setEndTime }].map(({ label, value, set }) => (
          <div key={label}>
            <label className="text-[8px] tracking-[2px] uppercase block mb-2" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>{label}</label>
            <input type="time" value={value} onChange={(e) => set(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", fontFamily: "'Barlow', sans-serif" }} />
          </div>
        ))}
      </div>

      {totalHours > 0 && (
        <div className="mb-4 p-3 rounded-lg" style={{ background: "rgba(41,212,224,0.05)", border: "1px solid var(--border-color)" }}>
          <p className="text-[9px] tracking-[2px] uppercase mb-1" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>Durée totale</p>
          <p className="text-lg font-bold" style={{ color: "var(--accent)", fontFamily: "'Barlow Condensed', sans-serif" }}>
            {totalHours.toFixed(1)} heure{totalHours > 1 ? 's' : ''}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-secondary)" }}>Total à payer</span>
        <span className="font-black text-xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
          {total.toLocaleString()} € 
        </span>
      </div>

      <button
        disabled={!startDate || !endDate || totalHours <= 0}
        onClick={() => navigate('/checkout', { state: { space, startDate, endDate, startTime, endTime, totalHours, total } })}
        className="w-full py-4 font-bold text-xs tracking-[3px] uppercase rounded-xl transition-colors duration-200 cursor-pointer"
        style={{
          background: (!startDate || !endDate || totalHours <= 0) ? "var(--border-color)" : "var(--accent)",
          color: (!startDate || !endDate || totalHours <= 0) ? "var(--text-muted)" : "#000",
        }}>
        Confirmer &amp; Payer
      </button>

      <p className="text-center text-[9px] tracking-[2px] uppercase mt-3" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
        No hidden fees · Instant confirmation
      </p>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: ${isDark ? 'invert(1)' : 'invert(0)'};
        }
      `}</style>

      <div className="w-full min-h-screen px-4 md:px-12 py-6 md:py-8" style={{ background: "var(--bg-primary)", fontFamily: "'Barlow', sans-serif" }}>

        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 md:mb-8 cursor-pointer transition-colors" style={{ color: "var(--text-muted)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">

          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] tracking-[2px] uppercase font-semibold"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  background: space.is_active ? "rgba(41,212,224,0.15)" : "rgba(255,80,80,0.15)",
                  color: space.is_active ? "var(--accent)" : "#ff5050",
                  border: `1px solid ${space.is_active ? "var(--accent)" : "#ff5050"}`,
                }}>
                {space.is_active ? "Available" : "Unavailable"}
              </span>
              <span className="text-[11px] tracking-[3px] uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                Abidjan, CI · Cocody
              </span>
            </div>

            <h1 className="font-black uppercase italic leading-none mb-6 md:mb-8"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(40px, 8vw, 96px)", letterSpacing: "-2px", color: "var(--text-primary)" }}>
              {space.name}<br />
              <span>SPACE_0{id}</span>
            </h1>

            {/* Main image */}
            <div className="rounded-2xl overflow-hidden mb-4" style={{ height: "clamp(200px, 40vw, 320px)", background: "var(--border-color)" }}>
              <img src={mainImage} alt={space.name} loading="lazy"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"; }}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            {/* Secondary images */}
            {secondaryImages.length > 0 && (
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
                {secondaryImages.map((img, i) => (
                  <div key={img.id} className="rounded-2xl overflow-hidden" style={{ height: "clamp(120px, 25vw, 200px)", background: "var(--border-color)" }}>
                    <img src={`${STORAGE_URL}/${img.filename}`} alt={img.alt_text || `${space.name} ${i + 2}`}
                      loading="lazy"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"; }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mb-6 md:mb-8">
              <p className="text-[10px] tracking-[4px] uppercase mb-4" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--accent)" }}>
                Description
              </p>
              <p className="text-sm italic leading-relaxed max-w-lg" style={{ color: "var(--text-secondary)" }}>
                Un espace {space.type} conçu pour la performance et le confort.
                Capacité de {space.capacity} personnes sur {space.surface} m²,
                idéal pour vos sessions de travail intensives.
              </p>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-6">
              {[`${space.capacity} PLACES`, `${space.surface} M²`, space.type.toUpperCase()].map((tag) => (
                <span key={tag} className="px-3 md:px-4 py-2 rounded-full text-[10px] tracking-[2px] uppercase font-semibold"
                  style={{ fontFamily: "'Rajdhani', sans-serif", background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Équipements */}
            {space.equipements?.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[4px] uppercase mb-4" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--accent)" }}>
                  Équipements
                </p>
                <div className="flex gap-2 flex-wrap">
                  {space.equipements.map((eq) => (
                    <span key={eq.id} className="px-3 py-1.5 rounded-full text-[10px] tracking-[1px] uppercase font-semibold"
                      style={{ fontFamily: "'Rajdhani', sans-serif", background: "rgba(41,212,224,0.1)", color: "var(--accent)", border: "1px solid rgba(41,212,224,0.2)" }}>
                      {eq.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile booking CTA */}
            <div className="lg:hidden mt-8">
              <button
                onClick={() => setBookingOpen(o => !o)}
                className="w-full py-4 font-bold text-xs tracking-[3px] uppercase rounded-xl cursor-pointer"
                style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif" }}>
                {bookingOpen ? "Fermer" : `Réserver — ${Number(pricePerHour).toLocaleString()} €/h`}
              </button>
              {bookingOpen && <div className="mt-4"><BookingPanel /></div>}
            </div>
          </div>

          {/* RIGHT COLUMN — desktop */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            <div className="sticky top-8">
              <BookingPanel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}