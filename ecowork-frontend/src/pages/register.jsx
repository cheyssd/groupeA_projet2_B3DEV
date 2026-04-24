import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const passwordRules = [
        { label: "8 caractères minimum", valid: password.length >= 8 },
        { label: "1 majuscule", valid: /[A-Z]/.test(password) },
        { label: "1 chiffre", valid: /[0-9]/.test(password) },
    ];

    const errorMessages = {
        "The email has already been taken.": "Cet email est déjà utilisé.",
        "The email must be a valid email address.": "L'adresse email n'est pas valide.",
        "The password must be at least 8 characters.": "Le mot de passe doit contenir au moins 8 caractères.",
        "The password confirmation does not match.": "Les mots de passe ne correspondent pas.",
        "The firstname field is required.": "Le prénom est obligatoire.",
        "The lastname field is required.": "Le nom est obligatoire.",
        "The email field is required.": "L'email est obligatoire.",
        "The password field is required.": "Le mot de passe est obligatoire.",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const firstname = e.target.firstname.value;
        const lastname = e.target.lastname.value;
        const email = e.target.email.value;
        const password_confirmation = e.target.password_confirmation.value;

        if (!firstname || !lastname || !email || !password) {
            setError("Tous les champs sont obligatoires");
            return;
        }

        setLoading(true);

        try {
            await register({ firstname, lastname, email, password, password_confirmation });
            navigate('/user/dashboard');
        } catch (err) {
            const message = errorMessages[err.message] || err.message || "Erreur lors de l'inscription";
            setError(message);
        } finally {
            setLoading(false);
        }
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
                            <input name="firstname" type="text" placeholder="Alexandre"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Nom</label>
                            <input name="lastname" type="text" placeholder="Dumas"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Email</label>
                            <input name="email" type="email" placeholder="alex@work.com"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Mot de passe</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium"
                                required
                            />
                            {password.length > 0 && (
                                <div className="mt-2 space-y-1 ml-2">
                                    {passwordRules.map((rule) => (
                                        <div key={rule.label} className="flex items-center gap-2">
                                            <span className={`text-xs font-bold ${rule.valid ? 'text-green-500' : 'text-red-400'}`}>
                                                {rule.valid ? '✓' : '✗'}
                                            </span>
                                            <span className={`text-[10px] ${rule.valid ? 'text-green-500' : 'text-gray-400'}`}>
                                                {rule.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Confirmer</label>
                            <input name="password_confirmation" type="password" placeholder="••••••••••••"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium" required />
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#b2f7ef] hover:text-black transition-all active:scale-[0.98] shadow-2xl shadow-black/5 mt-4">
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
                    <source srcSet="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200&fm=webp" type="image/webp" />
                    <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                        alt="Design Studio" loading="lazy" decoding="async" />
                </picture>
            </div>
        </div>
    );
};

export default Register;