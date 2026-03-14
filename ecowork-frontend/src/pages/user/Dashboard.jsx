import React, { useState, useEffect } from 'react';
import { get } from '../../services/api';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import UserNavbar from './components/UserNavbar';

const Dashboard = () => {
    const { isDark } = useTheme();
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
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

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <p className="text-lg" style={{ color: 'var(--text-muted)', fontFamily: "'Rajdhani', sans-serif", letterSpacing: "3px" }}>
                    CHARGEMENT...
                </p>
            </div>
        );
    }

    return (
        <div className="antialiased min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            <UserNavbar user={user} />

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">

                {/* Header */}
                <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block"
                            style={{ color: 'var(--text-muted)' }}>
                            Dashboard Personnel
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase"
                            style={{ color: 'var(--text-primary)' }}>
                            Your <br />
                            <span className="italic font-light underline decoration-[#7bdff2] decoration-4 underline-offset-8"
                                style={{ color: 'var(--text-muted)' }}>
                                Progress.
                            </span>
                        </h1>
                    </div>
                    <Link to="/spaces"
                        className="w-32 h-32 rounded-full flex flex-col items-center justify-center text-center p-4 transition-all border-2"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', background: 'var(--bg-primary)' }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "var(--accent)";
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.color = "#000";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "var(--bg-primary)";
                            e.currentTarget.style.borderColor = "var(--border-color)";
                            e.currentTarget.style.color = "var(--text-primary)";
                        }}>
                        <span className="text-[9px] font-black uppercase leading-tight">Nouvelle <br /> Session</span>
                    </Link>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Réservations */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex justify-between items-center pb-6"
                            style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em]"
                                style={{ color: 'var(--text-primary)' }}>
                                Réservations Actives
                            </h3>
                            <span className="text-[9px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
                                {reservations.filter(r => r.status !== 'annulee').length} prochaines sessions
                            </span>
                        </div>

                        {reservations.length === 0 ? (
                            <p className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
                                Aucune réservation pour le moment
                            </p>
                        ) : (
                            reservations.map((reservation) => (
                                <div key={reservation.id}
                                    className="rounded-[45px] p-10 flex flex-col md:flex-row gap-10 items-center transition-all"
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>

                                    <div className="w-full md:w-48 h-48 rounded-[35px] overflow-hidden shrink-0 flex items-center justify-center"
                                        style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }}>
                                        <span className="text-4xl font-black" style={{ color: 'var(--accent)' }}>
                                            {reservation.space?.name?.charAt(0)}
                                        </span>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-3xl font-black uppercase tracking-tighter italic"
                                                    style={{ color: 'var(--text-primary)' }}>
                                                    {reservation.space?.name}
                                                </h4>
                                                <p className="text-xs font-bold uppercase tracking-widest mt-1"
                                                    style={{ color: 'var(--text-muted)' }}>
                                                    {reservation.space?.type}
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

                                        <div className="flex gap-12 pt-4">
                                            {[
                                                { label: 'Date', value: new Date(reservation.start_date).toLocaleDateString('fr-FR') },
                                                { label: 'Fin', value: new Date(reservation.end_date).toLocaleDateString('fr-FR') },
                                                { label: 'Prix', value: `${Number(reservation.total_price).toLocaleString()} FCFA` },
                                            ].map(({ label, value }) => (
                                                <div key={label}>
                                                    <p className="text-[9px] font-black uppercase tracking-widest mb-1"
                                                        style={{ color: 'var(--text-muted)' }}>{label}</p>
                                                    <p className="text-sm font-black italic"
                                                        style={{ color: label === 'Prix' ? 'var(--accent)' : 'var(--text-primary)' }}>
                                                        {value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Sidebar Profil */}
                    <div className="space-y-12">
                        <div className="rounded-[50px] p-10"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10"
                                style={{ color: 'var(--text-primary)' }}>
                                Mon Profil
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { label: 'Email', value: user?.email },
                                    { label: 'Téléphone', value: user?.phone || 'Non renseigné' },
                                    { label: 'Adresse', value: user?.address || 'Non renseignée' },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="text-[9px] font-black uppercase tracking-widest mb-1"
                                            style={{ color: 'var(--text-muted)' }}>{label}</p>
                                        <p className="text-sm font-bold italic"
                                            style={{ color: 'var(--text-secondary)' }}>{value}</p>
                                    </div>
                                ))}
                                <Link to='/user/profile'
                                    className="block text-center w-full py-4 mt-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2"
                                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#000"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}>
                                    Modifier
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
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

export default Dashboard;