import React, { useState } from 'react';

const EcoCheckout = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [mobileOperator, setMobileOperator] = useState('wave');

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12">
                
                {/* LEFT: Formulaire */}
                <div className="flex-1">
                    <button className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition mb-12 flex items-center gap-2">
                        ← Retour
                    </button>
                    
                    <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-2">
                        Checkout<span className="text-gray-300">.</span>
                    </h1>
                    <p className="text-gray-400 text-sm mb-12">Paiement sécurisé</p>

                    {/* Payment Tabs */}
                    <div className="flex gap-3 mb-10">
                        <button 
                            onClick={() => setPaymentMethod('card')}
                            className={`flex-1 py-4 px-6 rounded-2xl border-2 text-[10px] font-black uppercase tracking-[0.3em] transition ${
                                paymentMethod === 'card' 
                                    ? 'border-black bg-black text-white' 
                                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                            }`}
                        >
                            Carte
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('mobile')}
                            className={`flex-1 py-4 px-6 rounded-2xl border-2 text-[10px] font-black uppercase tracking-[0.3em] transition ${
                                paymentMethod === 'mobile' 
                                    ? 'border-black bg-black text-white' 
                                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                            }`}
                        >
                            Mobile Money
                        </button>
                    </div>

                    {/* CARD */}
                    {paymentMethod === 'card' && (
                        <div className="space-y-6">
                            <div>
                                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 block">
                                    Email
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="alex@example.com"
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#7bdff2] focus:outline-none text-sm font-medium transition"
                                />
                            </div>

                            <div>
                                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 block">
                                    Numéro de carte
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#7bdff2] focus:outline-none text-sm font-medium transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 block">
                                        Expiration
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="MM / AA"
                                        className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#7bdff2] focus:outline-none text-sm font-medium transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 block">
                                        CVC
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="123"
                                        className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#7bdff2] focus:outline-none text-sm font-medium transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 block">
                                    Nom du titulaire
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Alexandre Dumas"
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#7bdff2] focus:outline-none text-sm font-medium transition"
                                />
                            </div>
                        </div>
                    )}

                    {/* MOBILE MONEY */}
                    {paymentMethod === 'mobile' && (
                        <div className="space-y-8">
                            <div>
                                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4 block">
                                    Opérateur
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Wave */}
                                    <button
                                        onClick={() => setMobileOperator('wave')}
                                        className={`p-6 rounded-2xl border-2 transition ${
                                            mobileOperator === 'wave' 
                                                ? 'border-[#01cddd] bg-[#01cddd]/5' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#01cddd] flex items-center justify-center">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                                <path d="M3 17l6-6 4 4 8-8M21 7l-8 8-4-4-6 6"/>
                                            </svg>
                                        </div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest text-center ${
                                            mobileOperator === 'wave' ? 'text-[#01cddd]' : 'text-gray-400'
                                        }`}>
                                            Wave
                                        </p>
                                    </button>

                                    {/* Orange */}
                                    <button
                                        onClick={() => setMobileOperator('orange')}
                                        className={`p-6 rounded-2xl border-2 transition ${
                                            mobileOperator === 'orange' 
                                                ? 'border-[#ff6600] bg-[#ff6600]/5' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#ff6600] flex items-center justify-center">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                                <circle cx="12" cy="12" r="10"/>
                                            </svg>
                                        </div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest text-center ${
                                            mobileOperator === 'orange' ? 'text-[#ff6600]' : 'text-gray-400'
                                        }`}>
                                            Orange
                                        </p>
                                    </button>

                                    {/* MTN */}
                                    <button
                                        onClick={() => setMobileOperator('mtn')}
                                        className={`p-6 rounded-2xl border-2 transition ${
                                            mobileOperator === 'mtn' 
                                                ? 'border-[#ffcc00] bg-[#ffcc00]/5' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#ffcc00] flex items-center justify-center">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#000">
                                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                                            </svg>
                                        </div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest text-center ${
                                            mobileOperator === 'mtn' ? 'text-[#ffcc00]' : 'text-gray-400'
                                        }`}>
                                            MTN
                                        </p>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 block">
                                    Numéro de téléphone
                                </label>
                                <div className="flex gap-3">
                                    <div className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-400">
                                        +225
                                    </div>
                                    <input 
                                        type="tel" 
                                        placeholder="07 00 00 00 00"
                                        className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:border-[#7bdff2] focus:outline-none text-sm font-medium transition"
                                    />
                                </div>
                                <p className="text-[9px] text-gray-400 mt-3 italic">
                                    Vous recevrez une demande USSD
                                </p>
                            </div>
                        </div>
                    )}

                    {/* BUTTON */}
                    <button className="w-full bg-black text-white mt-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#7bdff2] hover:text-black transition-all active:scale-[0.98] shadow-2xl shadow-black/5">
                        Payer 55,000 FCFA
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Paiement sécurisé SSL 256-bit
                    </div>
                </div>

                {/* RIGHT: Summary */}
                <div className="w-full lg:w-[400px] shrink-0">
                    <div className="bg-gray-50 p-10 rounded-[50px] sticky top-8">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7bdff2] mb-4 block">
                            Récapitulatif
                        </span>
                        
                        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-8">
                            Ambarukmo<br/>Space
                        </h2>

                        <div className="space-y-6 border-t border-gray-200 pt-8 mb-8">
                            <div className="flex justify-between">
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Date</span>
                                <span className="text-sm font-bold">12 Mars 2026</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Durée</span>
                                <span className="text-sm font-bold">8 heures</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Lieu</span>
                                <span className="text-sm font-bold">Paris XI</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end border-t border-gray-200 pt-8">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Total</span>
                            <span className="text-4xl font-black tracking-tighter">
                                55,000<span className="text-sm text-gray-400 ml-1">FCFA</span>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EcoCheckout;