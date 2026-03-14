<<<<<<< HEAD
import { useState, useEffect } from "react";
import { get } from "../../services/api";
import UserNavbar from "./components/UserNavbar";
import { useTheme } from "../../contexts/ThemeContext";
=======
import React, { useState, useEffect } from 'react';
import { get } from '../../services/api';
import UserNavbar from './components/UserNavbar';
import { useTheme } from '../../contexts/ThemeContext';
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c

const Reservation = () => {
    const { isDark } = useTheme();
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

<<<<<<< HEAD
    const filteredReservations = reservations.filter(reservation => {
        const today = new Date();
        const startDate = new Date(reservation.start_date);
        if (filter === 'upcoming') return startDate >= today && reservation.status !== 'annulee';
        if (filter === 'past') return startDate < today;
        if (filter === 'cancelled') return reservation.status === 'annulee';
        return true;
    });

    const handleCancel = async (reservationId) => {
=======
    const handleCancel = async (id) => {
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
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
<<<<<<< HEAD
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
=======

            if (response.ok) {
                setReservations(reservations.map(r =>
                    r.id === id ? { ...r, status: 'annulee' } : r
                ));
                alert('Réservation annulée avec succès');
            }
        } catch (error) {
            console.error('Erreur annulation:', error);
            alert('Erreur lors de l\'annulation');
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
                <p className="text-lg" style={{ color: 'var(--text-primary)' }}>Chargement...</p>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
            </div>
        );
    }

<<<<<<< HEAD
    const filters = [
        { key: 'all', label: 'Tout' },
        { key: 'upcoming', label: 'À venir' },
        { key: 'past', label: 'Passées' },
        { key: 'cancelled', label: 'Annulées' },
    ];

    return (
        <div className="antialiased min-h-screen" style={{ background: "var(--bg-primary)" }}>
=======
    return (
        <div className="antialiased min-h-screen" style={{ background: 'var(--bg-primary)' }}>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
            <UserNavbar user={user} />

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                {/* Header */}
                <header className="mb-16">
<<<<<<< HEAD
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
=======
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block" style={{ color: 'var(--text-muted)' }}>
                        Mes Réservations
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase" style={{ color: 'var(--text-primary)' }}>
                        Booking <br />
                        <span className="italic font-light underline decoration-[#7bdff2] decoration-4 underline-offset-8" style={{ color: 'var(--text-muted)' }}>
                            History.
                        </span>
                    </h1>
                </header>

                {/* Filters */}
                <div className="flex gap-4 mb-12 flex-wrap">
                    {[
                        { key: 'all', label: 'Toutes' },
                        { key: 'upcoming', label: 'À venir' },
                        { key: 'past', label: 'Passées' },
                        { key: 'cancelled', label: 'Annulées' }
                    ].map(f => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition"
                            style={{
                                background: filter === f.key ? 'var(--accent)' : 'var(--bg-card)',
                                color: filter === f.key ? '#000' : 'var(--text-secondary)',
                                border: `1px solid ${filter === f.key ? 'var(--accent)' : 'var(--border-color)'}`
                            }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Liste */}
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
                                <div
                                    key={reservation.id}
                                    className="rounded-[40px] p-8 md:p-10 transition-all"
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)'
                                    }}
                                >
                                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                        {/* Image placeholder */}
                                        <div
                                            className="w-32 h-32 rounded-[30px] shrink-0 flex items-center justify-center"
                                            style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }}
                                        >
                                            <span className="text-3xl font-black" style={{ color: 'var(--text-muted)' }}>
                                                {reservation.space?.name?.charAt(0)}
                                            </span>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 space-y-4">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="text-3xl font-black uppercase tracking-tighter italic" style={{ color: 'var(--text-primary)' }}>
                                                        {reservation.space?.name}
                                                    </h3>
                                                    <p className="text-[9px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
                                                        #{reservation.id} · {reservation.space?.type}
                                                    </p>
                                                </div>
                                                <span className={`text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                                                    reservation.status === 'confirmee' ? 'bg-[#b2f7ef] text-black' :
                                                    reservation.status === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {reservation.status}
                                                </span>
                                            </div>

                                            <div className="flex gap-8 flex-wrap">
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                                        Début
                                                    </p>
                                                    <p className="text-sm font-black italic" style={{ color: 'var(--text-primary)' }}>
                                                        {new Date(reservation.start_date).toLocaleDateString('fr-FR')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                                        Fin
                                                    </p>
                                                    <p className="text-sm font-black italic" style={{ color: 'var(--text-primary)' }}>
                                                        {new Date(reservation.end_date).toLocaleDateString('fr-FR')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                                        Prix
                                                    </p>
                                                    <p className="text-sm font-black italic" style={{ color: 'var(--text-primary)' }}>
                                                        {reservation.total_price} FCFA
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-3 pt-4">
                                                {needsPayment && (
                                                    <button
                                                        onClick={() => handlePay(reservation.id)}
                                                        className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition"
                                                        style={{ background: 'var(--accent)', color: '#000' }}
                                                    >
                                                        Payer maintenant
                                                    </button>
                                                )}
                                                {canCancel && (
                                                    <button
                                                        onClick={() => handleCancel(reservation.id)}
                                                        className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition"
                                                        style={{
                                                            border: '1px solid var(--border-color)',
                                                            color: '#ef4444',
                                                            background: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)'
                                                        }}
                                                    >
                                                        Annuler
                                                    </button>
                                                )}
                                            </div>
                                        </div>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

<<<<<<< HEAD
            <footer className="py-20 flex flex-col items-center gap-4" style={{ opacity: 0.2 }}>
                <div className="h-px w-20 mb-4" style={{ background: "var(--border-color)" }}></div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: "var(--text-primary)" }}>
                    EcoWork Members Ledger 2026
                </p>
=======
            <footer className="py-20 text-center opacity-20">
                <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: 'var(--text-primary)' }}>
                    EcoWork Experience Protocol
                </span>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
            </footer>
        </div>
    );
};

export default Reservation;