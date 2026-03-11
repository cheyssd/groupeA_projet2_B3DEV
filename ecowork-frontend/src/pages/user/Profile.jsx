import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../../services/api";
import UserNavbar from "./components/UserNavbar";

function Profile() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await get('/user');
                setUser(userData);
                setFormData({
                    firstname: userData.firstname || '',
                    lastname: userData.lastname || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    address: userData.address || ''
                });
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                alert('Profil mis à jour avec succès !');
            } else {
                throw new Error('Erreur lors de la mise à jour');
            }
        } catch (error) {
            alert('Erreur lors de la mise à jour du profil');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        setFormData({
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || ''
        });
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg">Chargement...</p>
            </div>
        );
    }

    return (
        <div className="antialiased font-sans bg-white text-black">
            <UserNavbar user={user} />

            <main className="max-w-5xl mx-auto px-6 py-20">
                {/* HEADER PROFILE */}
                <header className="flex flex-col md:flex-row items-center gap-12 mb-24">
                    <div className="relative overflow-hidden rounded-[60px] w-48 h-48 shrink-0 shadow-2xl group bg-gray-200">
                        <div className="w-full h-full flex items-center justify-center text-6xl font-black text-gray-400">
                            {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 opacity-0 group-hover:opacity-100 transition">
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">
                                Update Photo
                            </span>
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#7bdff2] mb-4 block">
                            Identity Status: Verified
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                            {user?.firstname} <br />
                            <span className="italic font-light text-gray-300">
                                {user?.lastname}.
                            </span>
                        </h1>
                    </div>
                </header>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                    {/* PERSONAL */}
                    <div className="space-y-10">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 border-b border-gray-100 pb-4">
                            Personal Details
                        </h3>

                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="border-b-2 border-gray-100 focus:border-[#7bdff2] outline-none py-4 text-xl font-black italic tracking-tight bg-transparent transition"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="border-b-2 border-gray-100 focus:border-[#7bdff2] outline-none py-4 text-xl font-black italic tracking-tight bg-transparent transition"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border-b-2 border-gray-100 focus:border-[#7bdff2] outline-none py-4 text-xl font-black italic tracking-tight bg-transparent transition"
                            />
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div className="space-y-10">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 border-b border-gray-100 pb-4">
                            Contact & Location
                        </h3>

                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                                Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border-b-2 border-gray-100 focus:border-[#7bdff2] outline-none py-4 text-xl font-black italic tracking-tight bg-transparent transition"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                                Full Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="border-b-2 border-gray-100 focus:border-[#7bdff2] outline-none py-4 text-xl font-black italic tracking-tight bg-transparent transition"
                            />
                        </div>

                        <div className="pt-6">
                            <button type="button" className="group flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Update Security Key
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* FOOT FORM */}
                    <div className="md:col-span-2 pt-20 flex justify-between items-center">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                            Dernière mise à jour : {new Date(user?.updated_at).toLocaleDateString('fr-FR')}
                        </p>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-10 py-5 rounded-2xl border border-black/10 text-[10px] font-black uppercase tracking-widest hover:border-black transition"
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-10 py-5 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#7bdff2] hover:text-black transition shadow-2xl"
                            >
                                {saving ? 'Enregistrement...' : 'Enregistrer les changements'}
                            </button>
                        </div>
                    </div>
                </form>
            </main>

            <footer className="py-20 text-center opacity-20">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">
                    EcoWork Identity Protocol
                </span>
            </footer>
        </div>
    );
}

export default Profile;