import { useState, useEffect } from "react";
import { get } from "../../services/api";
import UserNavbar from "./components/UserNavbar";
import { useTheme } from "../../contexts/ThemeContext";

const Reservation = () => {
    const { isDark } = useTheme();
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

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

    const handleCancel = async (id) => {
        if (!confirm('Voulez-vous vraiment annuler cette réservation ?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:8000/api/reservations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                setReservations(reservations.map(r =>
                    r.id === id ? { ...r, status: 'annulee' } : r
                ));
            }
        } catch (error) {
            console.error('Erreur annulation:', error);
            alert("Erreur lors de l'annulation");
        }
    };

    const handlePay = (id) => {
        alert('Paiement simulé pour la réservation #' + id);
    };

    const filteredReservations = reservations.filter(r => {
        const today = new Date();
        const startDate = new Date(r.start_date);
        if (filter === 'upcoming') return startDate >= today && r.status !== 'annulee';
        if (filter === 'past') return startDate < today;
        if (filter === 'cancelled') return r.status === 'annulee';
        return true;
    });

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <p style={{ color: 'var(--text-muted)', fontFamily: "'Rajdhani', sans-serif", letterSpacing: "3px" }}>
                    CHARGEMENT...
                </p>
            </div>
        );
    }

    return (
        <div className="antialiased min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            <UserNavbar user={user} />

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">

                <header className="mb-16">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block"
                        style={{ color: 'var(--text-muted)' }}>
                        Mes Réservations
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase"
                        style={{ color: 'var(--text-primary)' }}>
                        Booking <br />
                        <span className="italic font-light underline decoration-[#7bdff2] decoration-4 underline-offset-8"
                            style={{ color: 'var(--text-muted)' }}>
                            History.
                        </span>
                    </h1>
                </header>

                <div className="flex gap-4 mb-12 flex-wrap">
                    {[
                        { key: 'all', label: 'Toutes' },
                        { key: 'upcoming', label: 'À venir' },
                        { key: 'past', label: 'Passées' },
                        { key: 'cancelled', label: 'Annulées' }
                    ].map(f => (
                        <button key={f.key} onClick={() => setFilter(f.key)}
                            className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition cursor-pointer"
                            style={{
                                background: filter === f.key ? 'var(--accent)' : 'var(--bg-card)',
                                color: filter === f.key ? '#000' : 'var(--text-secondary)',
                                border: `1px solid ${filter === f.key ? 'var(--accent)' : 'var(--border-color)'}`
                            }}>
                            {f.label}
                        </button>
                    ))}
                </div>

                {filteredReservations.length === 0 ? (
                    <p className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                        Aucune réservation dans cette catégorie
                    </p>
                ) : (
                    <div className="space-y-8">
                        {filteredReservations.map((reservation) => {
                            const isPast = new Date(reservation.start_date) < new Date();
                            const canCancel = !isPast && reservation.status !== 'annulee';
                            const needsPayment = reservation.status === 'en_attente' && !isPast;

                            return (
                                <div key={reservation.id}
                                    className="rounded-[40px] p-8 md:p-10 transition-all"
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">

                                        <div className="w-32 h-32 rounded-[30px] shrink-0 flex items-center justify-center"
                                            style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }}>
                                            <span className="text-3xl font-black" style={{ color: 'var(--accent)' }}>
                                                {reservation.space?.name?.charAt(0)}
                                            </span>
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="text-3xl font-black uppercase tracking-tighter italic"
                                                        style={{ color: 'var(--text-primary)' }}>
                                                        {reservation.space?.name}
                                                    </h3>
                                                    <p className="text-[9px] font-bold uppercase tracking-widest mt-1"
                                                        style={{ color: 'var(--text-muted)' }}>
                                                        #{reservation.id} · {reservation.space?.type}
                                                    </p>
                                                </div>
                                                <span className="text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest"
                                                    style={{
                                                        background: reservation.status === 'confirmee' ? 'rgba(74,222,128,0.12)' :
                                                            reservation.status === 'en_attente' ? 'rgba(251,146,60,0.12)' : 'rgba(248,113,113,0.12)',
                                                        color: reservation.status === 'confirmee' ? '#4ade80' :
                                                            reservation.status === 'en_attente' ? '#fb923c' : '#f87171',
                                                    }}>
                                                    {reservation.status === 'confirmee' ? 'Confirmée' :
                                                        reservation.status === 'en_attente' ? 'En attente' : 'Annulée'}
                                                </span>
                                            </div>

                                            <div className="flex gap-8 flex-wrap">
                                                {[
                                                    { label: 'Début', value: new Date(reservation.start_date).toLocaleDateString('fr-FR') },
                                                    { label: 'Fin', value: new Date(reservation.end_date).toLocaleDateString('fr-FR') },
                                                    { label: 'Prix', value: `${Number(reservation.total_price).toLocaleString()} FCFA` },
                                                ].map(({ label, value }) => (
                                                    <div key={label}>
                                                        <p className="text-[9px] font-black uppercase tracking-widest"
                                                            style={{ color: 'var(--text-muted)' }}>{label}</p>
                                                        <p className="text-sm font-black italic"
                                                            style={{ color: label === 'Prix' ? 'var(--accent)' : 'var(--text-primary)' }}>
                                                            {value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex gap-3 pt-4">
                                                {needsPayment && (
                                                    <button onClick={() => handlePay(reservation.id)}
                                                        className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition cursor-pointer"
                                                        style={{ background: 'var(--accent)', color: '#000' }}>
                                                        Payer maintenant
                                                    </button>
                                                )}
                                                {canCancel && (
                                                    <button onClick={() => handleCancel(reservation.id)}
                                                        className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition cursor-pointer"
                                                        style={{
                                                            border: '1px solid var(--border-color)',
                                                            color: '#f87171',
                                                            background: 'rgba(248,113,113,0.08)'
                                                        }}>
                                                        Annuler
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <footer className="py-20 text-center" style={{ opacity: 0.2 }}>
                <span className="text-[10px] font-black uppercase tracking-[0.5em]"
                    style={{ color: 'var(--text-primary)' }}>
                    EcoWork Experience Protocol
                </span>
            </footer>
        </div>
    );
};

export default Reservation;