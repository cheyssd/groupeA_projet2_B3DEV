import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../../services/api";
import UserNavbar from "./components/UserNavbar";

function Reservation() {
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [filter, setFilter] = useState('all'); // all, upcoming, past, cancelled
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

    // Filtrer les réservations
    const filteredReservations = reservations.filter(reservation => {
        const today = new Date();
        const startDate = new Date(reservation.start_date);

        if (filter === 'upcoming') return startDate >= today && reservation.status !== 'annulee';
        if (filter === 'past') return startDate < today;
        if (filter === 'cancelled') return reservation.status === 'annulee';
        return true; // all
    });

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg">Chargement...</p>
            </div>
        );
    }

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

            // Rafraîchir la liste
            setReservations(reservations.map(r =>
                r.id === reservationId ? { ...r, status: 'annulee' } : r
            ));
        } catch (error) {
            alert('Erreur lors de l\'annulation');
        }
    };

    const handlePay = async (reservationId) => {
        // Pour l'instant juste simuler le paiement
        alert(`Paiement pour la réservation #${reservationId} (fonctionnalité à implémenter)`);
    };

    return (
        <div className="antialiased font-sans bg-white text-black">
            <UserNavbar user={user} />

            <main className="max-w-6xl mx-auto px-6 py-20">
                <header className="mb-16">
                    <h1 className="text-6xl font-black tracking-tighter uppercase mb-8">
                        My <br />
                        <span className="italic font-light text-gray-300">Agenda.</span>
                    </h1>

                    {/* Filtres */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${filter === 'all' ? 'bg-black text-white' : 'text-gray-400 border border-gray-200'
                                }`}
                        >
                            Tout
                        </button>

                        <button
                            onClick={() => setFilter('upcoming')}
                            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${filter === 'upcoming' ? 'bg-black text-white' : 'text-gray-400 border border-gray-200'
                                }`}
                        >
                            À venir
                        </button>

                        <button
                            onClick={() => setFilter('past')}
                            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${filter === 'past' ? 'bg-black text-white' : 'text-gray-400 border border-gray-200'
                                }`}
                        >
                            Passées
                        </button>

                        <button
                            onClick={() => setFilter('cancelled')}
                            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${filter === 'cancelled' ? 'bg-black text-white' : 'text-gray-400 border border-gray-200'
                                }`}
                        >
                            Annulées
                        </button>
                    </div>
                </header>

                <div className="space-y-2">
                    {filteredReservations.length === 0 ? (
                        <p className="text-center text-gray-400 py-12">Aucune réservation</p>
                    ) : (
                        filteredReservations.map((reservation) => {
                            const startDate = new Date(reservation.start_date);
                            const isPast = startDate < new Date();
                            const isConfirmed = reservation.status === 'confirmee';
                            const isPending = reservation.status === 'en_attente';
                            const isCancelled = reservation.status === 'annulee';

                            return (
                                <div
                                    key={reservation.id}
                                    className={`py-10 flex flex-col md:flex-row md:items-center gap-8 border-b border-gray-100 ${isPast || isCancelled ? 'opacity-40 grayscale' : ''
                                        }`}
                                >
                                    {/* Date */}
                                    <div className="w-24 shrink-0">
                                        <p className="text-[10px] font-black uppercase text-gray-300 mb-1">
                                            {startDate.toLocaleDateString('fr-FR', { month: 'short' })}
                                        </p>
                                        <p className="text-4xl font-black italic tracking-tighter leading-none">
                                            {startDate.getDate()}
                                        </p>
                                    </div>

                                    {/* Infos */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`w-2 h-2 rounded-full ${isConfirmed ? 'bg-green-500' :
                                                isPending ? 'bg-amber-500' :
                                                    'bg-red-500'
                                                }`}></span>
                                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isConfirmed ? 'text-green-600' :
                                                isPending ? 'text-amber-500' :
                                                    'text-red-500'
                                                }`}>
                                                {isConfirmed ? 'Réservation Confirmée' :
                                                    isPending ? 'Paiement en attente' :
                                                        isCancelled ? 'Annulée' :
                                                            'Session Terminée'}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black uppercase tracking-tighter italic">
                                            {reservation.space?.name}
                                        </h3>

                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            {reservation.space?.type} — {reservation.total_price} FCFA
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4">
                                        {isConfirmed && !isPast && (
                                            <button className="px-6 py-3 rounded-xl border border-black/10 text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition flex items-center gap-2">
                                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                                                </svg>
                                                PDF
                                            </button>
                                        )}

                                        {isPending && !isPast && (
                                            <>
                                                <button
                                                    onClick={() => handleCancel(reservation.id)}
                                                    className="px-6 py-3 rounded-xl bg-red-50 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition"
                                                >
                                                    Annuler
                                                </button>
                                                <button
                                                    onClick={() => handlePay(reservation.id)}
                                                    className="px-6 py-3 rounded-xl bg-black text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#7bdff2] hover:text-black transition"
                                                >
                                                    Payer ({reservation.total_price} FCFA)
                                                </button>
                                            </>
                                        )}

                                        {isPast && (
                                            <button className="px-6 py-3 rounded-xl border border-black/10 text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition">
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

            <footer className="py-20 flex flex-col items-center gap-4">
                <div className="h-px w-20 bg-gray-100 mb-4"></div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-20">
                    EcoWork Members Ledger 2026
                </p>
            </footer>
        </div>
    );
}

export default Reservation;