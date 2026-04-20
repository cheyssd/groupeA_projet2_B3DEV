import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const API_URL = window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:8000'
    : 'https://api-raffaa.ifran-b3dev.com';
const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Récupérer les données de réservation depuis SpaceShow
    const { space, startDate, endDate, startTime, endTime, totalHours, total } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [mobileOperator, setMobileOperator] = useState('wave');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!space) {
            navigate('/spaces');
        }
    }, [space, navigate]);

    if (!space) return null;

    const handlePayment = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem('token');

            const reservationData = {
                space_id: space.id,
                start_date: startDate.toISOString().split('T')[0],
                end_date: endDate.toISOString().split('T')[0],
                total_price: total,
                status: 'confirmee'
            };

            const response = await fetch(`${API_URL}/api/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });

            const data = await response.json();

            if (response.ok) {

                navigate('/confirmation', {
                    state: {
                        reservation: data,
                        space: space
                    }
                });
            } else {
                alert('Erreur: ' + (data.message || 'Impossible de créer la réservation'));
            }
        } catch (error) {
            console.error('❌ Erreur:', error);
            alert('Erreur lors de la création de la réservation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition mb-8 flex items-center gap-2"
                >
                    ← Retour
                </button>

                <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-12">
                    Paiement<span className="text-gray-300">.</span>
                </h1>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* LEFT: Payment */}
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">
                            Méthode de paiement
                        </h2>

                        {/* Tabs */}
                        <div className="flex gap-3 mb-8">
                            <button
                                onClick={() => setPaymentMethod('card')}
                                className={`flex-1 py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-[0.3em] transition ${paymentMethod === 'card' ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-400'
                                    }`}
                            >
                                Carte
                            </button>
                            <button
                                onClick={() => setPaymentMethod('mobile')}
                                className={`flex-1 py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-[0.3em] transition ${paymentMethod === 'mobile' ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-400'
                                    }`}
                            >
                                Mobile Money
                            </button>
                        </div>

                        {/* CARD */}
                        {paymentMethod === 'card' && (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Numéro de carte"
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#7bdff2] outline-none text-sm"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="MM/AA"
                                        className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#7bdff2] outline-none text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#7bdff2] outline-none text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        {/* MOBILE MONEY */}
                        {paymentMethod === 'mobile' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { key: 'wave', label: 'Wave', color: '#01cddd' },
                                        { key: 'orange', label: 'Orange', color: '#ff6600' },
                                        { key: 'mtn', label: 'MTN', color: '#ffcc00' }
                                    ].map(op => (
                                        <button
                                            key={op.key}
                                            onClick={() => setMobileOperator(op.key)}
                                            className={`p-4 rounded-2xl border-2 transition ${mobileOperator === op.key
                                                ? `border-[${op.color}] bg-[${op.color}]/5`
                                                : 'border-gray-200'
                                                }`}
                                            style={mobileOperator === op.key ? {
                                                borderColor: op.color,
                                                backgroundColor: `${op.color}15`
                                            } : {}}
                                        >
                                            <div
                                                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                                                style={{ backgroundColor: op.color }}
                                            >
                                                <span className="text-white font-black text-lg">
                                                    {op.label[0]}
                                                </span>
                                            </div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-center text-gray-600">
                                                {op.label}
                                            </p>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <div className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold">
                                        +225
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="07 00 00 00 00"
                                        className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#7bdff2] outline-none text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="bg-gray-50 p-8 rounded-[40px]">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7bdff2] mb-6">
                                Récapitulatif
                            </h3>

                            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-8">
                                {space.name}
                            </h2>

                            <div className="space-y-4 border-t border-gray-200 pt-6 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">Du</span>
                                    <span className="font-bold">
                                        {startDate.toLocaleDateString('fr-FR')} à {startTime}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">Au</span>
                                    <span className="font-bold">
                                        {endDate.toLocaleDateString('fr-FR')} à {endTime}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">Durée</span>
                                    <span className="font-bold">{totalHours.toFixed(1)} heures</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">Prix/heure</span>
                                    <span className="font-bold">
                                        {Number(space.price_per_day).toLocaleString()} €
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end border-t border-gray-200 pt-6 mb-8">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    Total
                                </span>
                                <span className="text-4xl font-black tracking-tighter">
                                    {total.toLocaleString()}
                                    <span className="text-sm text-gray-400 ml-1">€</span>
                                </span>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full bg-black text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#7bdff2] hover:text-black transition-all disabled:opacity-50"
                            >
                                {loading ? 'Traitement...' : 'Confirmer le paiement'}
                            </button>

                            <p className="text-center text-[8px] text-gray-400 mt-4 uppercase tracking-widest">
                                Paiement sécurisé
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;