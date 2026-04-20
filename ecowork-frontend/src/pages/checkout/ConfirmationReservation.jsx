import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function ConfirmationReservation() {
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state || {};

    const reservation = state.reservation?.reservation || state.reservation;
    const space = state.space;
    const total = reservation?.total_price || reservation?.total;

    useEffect(() => {
        if (!reservation) {
            navigate('/');
        }
    }, [reservation, navigate]);

    if (!reservation) return null;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
            <div className="max-w-2xl w-full text-center">

                <div className="mb-12">
                    <div className="w-32 h-32 mx-auto bg-[#b2f7ef] rounded-full flex items-center justify-center animate-bounce">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-4">
                    Réservation<br />
                    <span className="text-[#7bdff2]">Confirmée</span>
                </h1>

                <div className="bg-gray-50 p-10 rounded-[50px] mb-12 text-left">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#7bdff2] mb-6">
                        Détails de la réservation
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Espace</p>
                            <p className="text-2xl font-black uppercase tracking-tighter italic">
                                {space?.name || "Espace EcoWork"}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Numéro</p>
                                <p className="text-xl font-bold">#{reservation?.id}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Statut</p>
                                <span className="inline-block px-4 py-1.5 bg-[#b2f7ef] text-black text-xs font-black uppercase tracking-widest rounded-full">
                                    Confirmée
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total payé</span>
                                <span className="text-4xl font-black tracking-tighter">
                                    {total?.toLocaleString()}
                                    <span className="text-sm text-gray-400 ml-1">€</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/user/reservation" className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#7bdff2] hover:text-black transition-all">
                        Voir mes réservations
                    </Link>
                    <Link to="/spaces" className="px-8 py-4 border-2 border-gray-200 text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:border-black transition-all">
                        Explorer d'autres espaces
                    </Link>
                </div>
            </div>
        </div>
    );
}
