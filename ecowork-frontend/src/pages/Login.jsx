import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="antialiased min-h-screen flex">
            <div className="hidden lg:block w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
                    className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[10s]"
                    alt="Coworking Life" />

                <div className="absolute bottom-20 left-20 z-20 text-white">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 block text-[#7bdff2]">Member Access</span>
                    <h2 className="text-5xl font-light tracking-tighter leading-tight italic">
                        Ravi de vous <br /> <span className="font-black">revoir.</span>
                    </h2>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 bg-white">
                <div className="w-full max-w-md fade-up">

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
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Email Address</label>
                            <input name='email' type="email" placeholder="nom@exemple.com"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Password</label>
                                <a href="#" className="text-[10px] font-bold text-[#7bdff2] uppercase">Perdu ?</a>
                            </div>
                            <input type="password" placeholder="••••••••••••"
                                className="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium" />
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="accent-black w-4 h-4" />
                            <span className="text-xs font-bold text-gray-500 group-hover:text-black transition">Rester connecté</span>
                        </label>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Connexion...' : 'Entrer dans l\'espace'}
                        </button>
                    </form>

                    <p className="mt-12 text-center text-sm font-medium text-gray-400">
                        Pas encore membre ?
                        <a href="#" className="text-black font-black border-b-2 border-[#7bdff2] ml-2">Créer un compte</a>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login;