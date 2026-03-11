import React, { useState, useEffect } from 'react';
import { get } from '../../services/api';
import { Link } from 'react-router-dom';
import UserNavbar from './components/UserNavbar';

const Dashboard = () => {
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
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg">Chargement...</p>
            </div>
        );
    }

    return (
        <div className="antialiased min-h-screen">
            <UserNavbar user={user} />

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                {/* Header */}
                <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 block">
                            Dashboard Personnel
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                            Your <br />
                            <span className="italic font-light text-gray-300 underline decoration-[#7bdff2] decoration-4 underline-offset-8">
                                Progress.
                            </span>
                        </h1>
                    </div>
                    <Link to="/spaces" className="action-circle w-32 h-32 rounded-full border-2 border-black flex flex-col items-center justify-center text-center p-4 hover:bg-black hover:text-white transition">
                        <span className="text-[9px] font-black uppercase leading-tight">Nouvelle <br /> Session</span>
                    </Link>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Réservations */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="flex justify-between items-center border-b border-black/5 pb-6">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">Réservations Actives</h3>
                            <span className="text-[9px] font-bold text-gray-400 uppercase">
                                {reservations.filter(r => r.status !== 'annulee').length} prochaines sessions
                            </span>
                        </div>

                        {/* Liste réservations */}
                        {reservations.length === 0 ? (
                            <p className="text-gray-400 text-center py-12">Aucune réservation pour le moment</p>
                        ) : (
                            reservations.map((reservation) => (
                                <div key={reservation.id} className="booking-card bg-white rounded-[45px] p-10 flex flex-col md:flex-row gap-10 items-center">
                                    <div className="w-full md:w-48 h-48 rounded-[35px] overflow-hidden shrink-0 bg-gray-200">
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <span className="text-4xl">{reservation.space?.name?.charAt(0)}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-3xl font-black uppercase tracking-tighter italic">
                                                    {reservation.space?.name}
                                                </h4>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                                                    {reservation.space?.type}
                                                </p>
                                            </div>
                                            <span className={`text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${reservation.status === 'confirmee' ? 'bg-[#b2f7ef] text-black' :
                                                    reservation.status === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {reservation.status}
                                            </span>
                                        </div>
                                        <div className="flex gap-12 pt-4">
                                            <div>
                                                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Date</p>
                                                <p className="text-sm font-black italic">
                                                    {new Date(reservation.start_date).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Prix</p>
                                                <p className="text-sm font-black italic">{reservation.total_price} FCFA</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Sidebar Profil */}
                    <div className="space-y-12">
                        <div className="bg-gray-50 rounded-[50px] p-10">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10">Mon Profil</h3>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                    <p className="text-sm font-bold italic">{user?.email}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Téléphone</p>
                                    <p className="text-sm font-bold italic">{user?.phone || 'Non renseigné'}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Adresse</p>
                                    <p className="text-sm font-bold italic">{user?.address || 'Non renseignée'}</p>
                                </div>
                                <Link to='/user/profile' className="block text-center w-full py-4 mt-6 border-2 border-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition">
                                    Modifier
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-20 text-center opacity-20">
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">EcoWork Experience Protocol</span>
            </footer>
        </div>
    );
};

export default Dashboard;