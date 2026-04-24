import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        const firstname = e.target.firstname.value;
        const lastname = e.target.lastname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const password_confirmation = e.target.password_confirmation.value;

        if (!firstname || !lastname || !email || !password) {
            setError("Tous les champs sont obligatoires");
            return;
        }

        setLoading(true);

        const API_URL = window.location.hostname === 'localhost'
            ? 'http://127.0.0.1:8000/api'
            : 'https://api-raffaa.ifran-b3dev.com/api';

        fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password,
                password_confirmation
            })
        })
            .then(response => {
                if (!response.ok) throw new Error("Erreur lors de l'inscription");
                return response.json();
            })
            .then(data => {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/user/dashboard');
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <div className="w-full lg:w-1/2 flex items-start justify-center py-8 px-6 md:px-12 bg-white z-20 overflow-y-auto">
                <div className="w-full max-w-md">

                    <div className="mb-10">
                        <span className="text-2xl font-black tracking-tighter uppercase italic">EcoWork.</span>
                        <div className="h-1 w-12 bg-[#b2f7ef] mt-2"></div>
                    </div>

                    <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Rejoindre</h1>
                    <p className="text-gray-400 text-sm mb-8 font-medium italic">Commencez votre expérience EcoWork aujourd'hui.</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Prénom</label>
                            <input
                                name="firstname"
                                type="text"
                                placeholder="Alexandre"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Nom</label>
                            <input
                                name="lastname"
                                type="text"
                                placeholder="Dumas"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="alex@work.com"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Mot de passe</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••••••"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Confirmer</label>
                            <input
                                name="password_confirmation"
                                type="password"
                                placeholder="••••••••••••"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#b2f7ef] hover:text-black transition-all active:scale-[0.98] shadow-2xl shadow-black/5 mt-4"
                        >
                            {loading ? 'Création...' : 'Créer mon profil'}
                        </button>
                    </form>

                    <p className="mt-8 mb-4 text-center text-sm font-medium text-gray-400">
                        Déjà membre ?
                        <a href="/login" className="text-black font-black border-b-2 border-black ml-2">Se connecter</a>
                    </p>

                </div>
            </div>

            <div className="hidden lg:block lg:fixed lg:right-0 lg:top-0 lg:w-1/2 lg:h-screen overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent z-10"></div>
                <picture>
                    <source
                        srcSet="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200&fm=webp"
                        type="image/webp"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                        alt="Design Studio"
                        loading="lazy"
                        decoding="async"
                    />
                </picture>
            </div>
        </div>
    );
};

export default Register;