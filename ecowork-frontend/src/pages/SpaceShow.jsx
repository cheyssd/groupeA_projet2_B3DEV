import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
];

export default function SpaceShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dates et heures
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  // Calendrier
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/spaces/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpace(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setLoading(false);
      });
  }, [id]);

  

  // Calendrier helpers
  const monthNames = ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
  const dayNames = ["L", "M", "M", "J", "V", "S", "D"];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    if (!startDate || (startDate && endDate)) {
      // Première sélection ou reset
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (clickedDate < startDate) {
      // Date avant startDate → devient nouvelle startDate
      setStartDate(clickedDate);
    } else {
      // Date après startDate → devient endDate
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

  // Calcul TOTAL heures passées dans l'espace
  const calculateTotalHours = () => {
    if (!startDate || !endDate || !startTime || !endTime) return 0;

    // Parse les heures
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    // Créer les dates complètes avec heures
    const start = new Date(startDate);
    start.setHours(startH, startM, 0, 0);

    const end = new Date(endDate);
    end.setHours(endH, endM, 0, 0);

    // Différence en millisecondes
    const diffMs = end - start;

    // Convertir en heures
    const hours = diffMs / (1000 * 60 * 60);

    return hours > 0 ? hours : 0;
  };

  // Calcul total
  const pricePerDay = space ? parseFloat(space.price_per_day) : 0;
  const pricePerHour = pricePerDay / 24; // Prix par heure (1 jour = 24h)
  const totalHours = calculateTotalHours();
  const total = pricePerHour * totalHours;

  if (loading) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>Chargement...</p>
      </section>
    );
  }

  if (!space) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <p style={{ color: "var(--text-muted)" }}>Espace introuvable.</p>
      </section>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@500;600;700&display=swap');
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: ${isDark ? 'invert(1)' : 'invert(0)'};
        }
      `}</style>

      <div className="w-full min-h-screen px-12 py-8" style={{ background: "var(--bg-primary)", fontFamily: "'Barlow', sans-serif" }}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-8 cursor-pointer transition-colors" style={{ color: "var(--text-muted)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex gap-12">
          {/* LEFT COLUMN */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
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
                Paris XI · Bastille
              </span>
            </div>

            <h1 className="font-black uppercase italic leading-none mb-8"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(48px, 7vw, 96px)",
                letterSpacing: "-2px",
                color: "var(--text-primary)",
              }}>
              {space.name}<br />
              <span style={{ color: "var(--text-primary)" }}>SPACE_0{id}</span>
            </h1>

            <div className="rounded-2xl overflow-hidden mb-4" style={{ height: "320px" }}>
              <img src={IMAGES[0]} alt={space.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {IMAGES.slice(1).map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ height: "200px" }}>
                  <img src={img} alt={`${space.name} ${i + 2}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>

            <div className="mb-8">
              <p className="text-[10px] tracking-[4px] uppercase mb-4" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--accent)" }}>
                Description
              </p>
              <p className="text-sm italic leading-relaxed max-w-lg" style={{ color: "var(--text-secondary)" }}>
                Un espace {space.type} conçu pour la performance et le confort.
                Capacité de {space.capacity} personnes sur {space.surface} m²,
                idéal pour vos sessions de travail intensives.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              {[`${space.capacity} PLACES`, `${space.surface} M²`, space.type.toUpperCase()].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-[10px] tracking-[2px] uppercase font-semibold"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    background: "var(--bg-card)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Booking */}
          <div className="w-96 flex-shrink-0">
            <div className="rounded-2xl p-6 sticky top-8"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                backdropFilter: "blur(20px)",
              }}>

              {/* Prix */}
              <div className="mb-6">
                <span className="font-black text-3xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
                  {Number(pricePerHour).toLocaleString()} Fcfa
                </span>
                <span className="text-xs ml-1" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                  / heure
                </span>
              </div>

              {/* Calendrier */}
              <p className="text-[9px] tracking-[3px] uppercase mb-3" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                Période de réservation
              </p>

              <div className="rounded-xl p-4 mb-4" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: "1px solid var(--border-color)" }}>
                {/* Month nav */}
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => {
                    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
                    else setCurrentMonth(m => m - 1);
                  }} style={{ color: "var(--text-muted)" }} className="cursor-pointer hover:opacity-70">
                    ‹
                  </button>
                  <span className="text-sm font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-primary)" }}>
                    {monthNames[currentMonth]} {currentYear}
                  </span>
                  <button onClick={() => {
                    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
                    else setCurrentMonth(m => m + 1);
                  }} style={{ color: "var(--text-muted)" }} className="cursor-pointer hover:opacity-70">
                    ›
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {dayNames.map((d, i) => (
                    <div key={i} className="text-center text-[10px]" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-y-1">
                  {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }).map((_, i) => {
                    const day = i + 1;
                    const past = isPast(day);
                    const inRange = isInRange(day);
                    return (
                      <button key={day} onClick={() => !past && handleDateClick(day)} disabled={past}
                        className="text-center text-xs py-1 rounded-full transition-all"
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          cursor: past ? "not-allowed" : "pointer",
                          background: inRange ? "var(--accent)" : "transparent",
                          color: past ? "var(--text-muted)" : inRange ? "#000" : "var(--text-primary)",
                          opacity: past ? 0.3 : 1,
                          fontWeight: inRange ? "700" : "400",
                        }}>
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Période sélectionnée */}
              {startDate && (
                <div className="mb-4 p-3 rounded-lg" style={{ background: "rgba(41,212,224,0.1)", border: "1px solid var(--accent)" }}>
                  <p className="text-[9px] tracking-[2px] uppercase mb-1" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                    Période
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "'Rajdhani', sans-serif" }}>
                    Du {startDate.toLocaleDateString('fr-FR')}
                    {endDate && ` au ${endDate.toLocaleDateString('fr-FR')}`}
                  </p>
                </div>
              )}

              {/* Horaires */}
              <p className="text-[9px] tracking-[3px] uppercase mb-3" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                Horaires
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-[8px] tracking-[2px] uppercase block mb-2" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                    Début
                  </label>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontFamily: "'Barlow', sans-serif"
                    }} />
                </div>

                <div>
                  <label className="text-[8px] tracking-[2px] uppercase block mb-2" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                    Fin
                  </label>
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontFamily: "'Barlow', sans-serif"
                    }} />
                </div>
              </div>

              {/* Durée totale */}
              {totalHours > 0 && (
                <div className="mb-6 p-3 rounded-lg" style={{ background: "rgba(41,212,224,0.05)", border: "1px solid var(--border-color)" }}>
                  <p className="text-[9px] tracking-[2px] uppercase mb-1" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                    Durée totale
                  </p>
                  <p className="text-lg font-bold" style={{ color: "var(--accent)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {totalHours.toFixed(1)} heure{totalHours > 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-secondary)" }}>
                  Total à payer
                </span>
                <span className="font-black text-xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text-primary)" }}>
                  {total.toLocaleString()} FCFA
                </span>
              </div>

              {/* CTA */}
              <button
                disabled={!startDate || !endDate || totalHours <= 0}
                onClick={() => navigate('/checkout', {
                  state: { space, startDate, endDate, startTime, endTime, totalHours, total }
                })}
                className="w-full py-4 font-bold text-xs tracking-[3px] uppercase rounded-xl transition-colors duration-200"
              >
                Confirmer &amp; Payer
              </button>

              <p className="text-center text-[9px] tracking-[2px] uppercase mt-3" style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                No hidden fees · Instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}