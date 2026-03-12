import { useState, useEffect } from "react";
import { get } from "../../services/api";
import UserNavbar from "./components/UserNavbar";
import { useTheme } from "../../contexts/ThemeContext";

function Reservation() {
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const { isDark } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await get('/user');
                setUser(userData);
                const reservationsData = await get('/reservations');
                setReservations(reservationsData.data || reservationsData);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredReservations = reservations.filter(reservation => {
        const today = new Date();
        const startDate = new Date(reservation.start_date);
        if (filter === 'upcoming') return startDate >= today && reservation.status !== 'annulee';
        if (filter === 'past') return startDate < today;
        if (filter === 'cancelled') return reservation.status === 'annulee';
        return true;
    });

    const handleCancel = async (reservationId) => {
        if (!confirm('Voulez-vous vraiment annuler cette réservation ?')) return;
        try {
            await fetch(`http://127.0.0.1:8000/api/reservations/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setReservations(reservations.map(r =>
                r.id === reservationId ? { ...r, status: 'annulee' } : r
            ));
        } catch (error) {
            alert("Erreur lors de l'annulation");
        }
    };

    const handlePay = async (reservationId) => {
        alert(`Paiement pour la réservation #${reservationId} (fonctionnalité à implémenter)`);
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center" style={{ background: "var(--bg-primary)" }}>
                <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "3px" }}>
                    CHARGEMENT...
                </p>
            </div>
        );
    }

    const filters = [
        { key: 'all', label: 'Tout' },
        { key: 'upcoming', label: 'À venir' },
        { key: 'past', label: 'Passées' },
        { key: 'cancelled', label: 'Annulées' },
    ];

    return (
        <div className="antialiased min-h-screen" style={{ background: "var(--bg-primary)" }}>
            <UserNavbar user={user} />

            <main className="max-w-6xl mx-auto px-6 py-20">
                <header className="mb-16">
                    <h1 className="text-6xl font-black tracking-tighter uppercase mb-8"
                        style={{ color: "var(--text-primary)" }}>
                        My <br />
                        <span className="italic font-light" style={{ color: "var(--text-secondary)" }}>
                            Agenda.
                        </span>
                    </h1>

                    {/* Filtres */}
                    <div className="flex flex-wrap gap-3">
                        {filters.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className="px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                                style={{
                                    background: filter === key ? "var(--accent)" : "transparent",
                                    color: filter === key ? "#000" : "var(--text-muted)",
                                    border: `1px solid ${filter === key ? "var(--accent)" : "var(--border-color)"}`,
                                }}>
                                {label}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="space-y-2">
                    {filteredReservations.length === 0 ? (
                        <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>
                            Aucune réservation
                        </p>
                    ) : (
                        filteredReservations.map((reservation) => {
                            const startDate = new Date(reservation.start_date);
                            const isPast = startDate < new Date();
                            const isConfirmed = reservation.status === 'confirmee';
                            const isPending = reservation.status === 'en_attente';
                            const isCancelled = reservation.status === 'annulee';

                            return (
                                <div key={reservation.id}
                                    className="py-10 flex flex-col md:flex-row md:items-center gap-8"
                                    style={{
                                        borderBottom: "1px solid var(--border-color)",
                                        opacity: isPast || isCancelled ? 0.4 : 1,
                                        filter: isPast || isCancelled ? "grayscale(1)" : "none",
                                    }}>

                                    {/* Date */}
                                    <div className="w-24 shrink-0">
                                        <p className="text-[10px] font-black uppercase mb-1"
                                            style={{ color: "var(--text-muted)" }}>
                                            {startDate.toLocaleDateString('fr-FR', { month: 'short' })}
                                        </p>
                                        <p className="text-4xl font-black italic tracking-tighter leading-none"
                                            style={{ color: "var(--text-primary)" }}>
                                            {startDate.getDate()}
                                        </p>
                                    </div>

                                    {/* Infos */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="w-2 h-2 rounded-full" style={{
                                                background: isConfirmed ? '#4ade80' : isPending ? '#fb923c' : '#f87171'
                                            }}></span>
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{
                                                color: isConfirmed ? '#4ade80' : isPending ? '#fb923c' : '#f87171'
                                            }}>
                                                {isConfirmed ? 'Réservation Confirmée' :
                                                    isPending ? 'Paiement en attente' :
                                                        isCancelled ? 'Annulée' : 'Session Terminée'}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black uppercase tracking-tighter italic"
                                            style={{ color: "var(--text-primary)" }}>
                                            {reservation.space?.name}
                                        </h3>

                                        <p className="text-[10px] font-bold uppercase tracking-widest"
                                            style={{ color: "var(--text-muted)" }}>
                                            {reservation.space?.type} — <span style={{ color: "var(--accent)" }}>{Number(reservation.total_price).toLocaleString()} FCFA</span>
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4">
                                        {isConfirmed && !isPast && (
                                            <button className="px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
                                                style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "transparent" }}>
                                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                                                </svg>
                                                PDF
                                            </button>
                                        )}

                                        {isPending && !isPast && (
                                            <>
                                                <button onClick={() => handleCancel(reservation.id)}
                                                    className="px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                                                    style={{ background: "rgba(248,113,113,0.1)", color: "#f87171" }}>
                                                    Annuler
                                                </button>
                                                <button onClick={() => handlePay(reservation.id)}
                                                    className="px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                                                    style={{ background: "var(--accent)", color: "#000" }}>
                                                    Payer ({Number(reservation.total_price).toLocaleString()} FCFA)
                                                </button>
                                            </>
                                        )}

                                        {isPast && (
                                            <button className="px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                                                style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "transparent" }}>
                                                Re-réserver
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>

            <footer className="py-20 flex flex-col items-center gap-4" style={{ opacity: 0.2 }}>
                <div className="h-px w-20 mb-4" style={{ background: "var(--border-color)" }}></div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: "var(--text-primary)" }}>
                    EcoWork Members Ledger 2026
                </p>
            </footer>
        </div>
    );
}

export default Reservation;