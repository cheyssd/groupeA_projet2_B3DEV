import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // on récupère la fonction login de l'AuthProvider

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email.trim() || !password.trim()) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setLoading(true);

        // on appelle login de l'AuthProvider qui fait le fetch ET le setUser
        login(email, password)
            .then(data => {
                // si on arrive ici c'est que la connexion a réussi
                // on redirige selon le rôle de l'utilisateur
                if (data.user.role === 'admin') {
                    navigate('/admin/adminOverview');
                } else {
                    navigate('/user/dashboard');
                }
            })
            .catch(() => {
                setError("Identifiants incorrects. Veuillez réessayer.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="antialiased min-h-screen flex">
            <div className="hidden lg:block w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
                    className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[10s]"
                    alt="Coworking Life"
                    loading="lazy" />

                <div className="absolute bottom-20 left-20 z-20 text-white">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 block text-[#7bdff2]">Member Access</span>
                    <h2 className="text-5xl font-light tracking-tighter leading-tight italic">
                        Ravi de vous <br /> <span className="font-black">revoir.</span>
                    </h2>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 bg-white">
                <div className="w-full max-w-md">

                    <div className="mb-12">
                        <span className="text-2xl font-black tracking-tighter uppercase italic">EcoWork.</span>
                        <div className="h-1 w-12 bg-[#7bdff2] mt-2"></div>
                    </div>

                    <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Connexion</h1>
                    <p className="text-gray-400 text-sm mb-10 font-medium italic">Accédez à votre espace de performance.</p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Email</label>
                            <input name="email" type="email" placeholder="nom@exemple.com"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Mot de passe</label>
                                <a href="#" className="text-[10px] font-bold text-[#7bdff2] uppercase">Perdu ?</a>
                            </div>
                            <input name="password" type="password" placeholder="••••••••••••"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium" />
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="accent-black w-4 h-4" />
                            <span className="text-xs font-bold text-gray-500 group-hover:text-black transition">Rester connecté</span>
                        </label>

                        <button type="submit" disabled={loading}
                            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#7bdff2] hover:text-black transition-all active:scale-[0.98] shadow-2xl shadow-black/5 disabled:opacity-50">
                            {loading ? 'Connexion...' : "Entrer dans l'espace"}
                        </button>
                    </form>

                    <p className="mt-12 text-center text-sm font-medium text-gray-400">
                        Pas encore membre ?
                        <Link to="/register" className="text-black font-black border-b-2 border-[#7bdff2] ml-2">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;