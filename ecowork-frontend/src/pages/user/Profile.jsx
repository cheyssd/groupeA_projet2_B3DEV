<<<<<<< HEAD
import { useState, useEffect } from "react";
import UserNavbar from "./components/UserNavbar";
import { get } from "../../services/api";
import { useTheme } from "../../contexts/ThemeContext";
=======
import React, { useState, useEffect } from 'react';
import { get } from '../../services/api';
import UserNavbar from './components/UserNavbar';
import { useTheme } from '../../contexts/ThemeContext';
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c

const Profile = () => {
    const { isDark } = useTheme();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '', lastname: '', email: '', phone: '', address: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const { isDark } = useTheme();

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

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error) {
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
<<<<<<< HEAD
            <div className="flex h-screen items-center justify-center" style={{ background: "var(--bg-primary)" }}>
                <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "3px" }}>
                    CHARGEMENT...
                </p>
=======
            <div className="flex h-screen items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <p className="text-lg" style={{ color: 'var(--text-primary)' }}>Chargement...</p>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
            </div>
        );
    }

    const inputStyle = {
        borderBottom: "2px solid var(--border-color)",
        outline: "none",
        padding: "16px 0",
        fontSize: "20px",
        fontWeight: "900",
        fontStyle: "italic",
        letterSpacing: "-0.5px",
        background: "transparent",
        color: "var(--text-primary)",
        width: "100%",
        transition: "border-color 0.2s",
    };

    return (
<<<<<<< HEAD
        <div className="antialiased min-h-screen" style={{ background: "var(--bg-primary)" }}>
=======
        <div className="antialiased min-h-screen" style={{ background: 'var(--bg-primary)' }}>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
            <UserNavbar user={user} />

            <main className="max-w-5xl mx-auto px-6 py-20">

                {/* Message succès */}
                {success && (
                    <div className="fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                        style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}>
                        ✓ Profil mis à jour !
                    </div>
                )}

                {/* Header */}
                <header className="flex flex-col md:flex-row items-center gap-12 mb-24">
<<<<<<< HEAD
                    <div className="relative overflow-hidden rounded-[60px] w-48 h-48 shrink-0 group"
                        style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                        <div className="w-full h-full flex items-center justify-center text-6xl font-black"
                            style={{ color: "var(--accent)" }}>
=======
                    <div 
                        className="relative overflow-hidden rounded-[60px] w-48 h-48 shrink-0 shadow-2xl group"
                        style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }}
                    >
                        <div className="w-full h-full flex items-center justify-center text-6xl font-black" style={{ color: 'var(--text-muted)' }}>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
                            {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition"
                            style={{ background: "rgba(0,0,0,0.5)" }}>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">
                                Update Photo
                            </span>
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
                            style={{ color: "var(--accent)" }}>
                            Identity Status: Verified
                        </span>
<<<<<<< HEAD
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none"
                            style={{ color: "var(--text-primary)" }}>
                            {user?.firstname} <br />
                            <span className="italic font-light" style={{ color: "var(--text-secondary)" }}>
=======
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none" style={{ color: 'var(--text-primary)' }}>
                            {user?.firstname} <br />
                            <span className="italic font-light" style={{ color: 'var(--text-muted)' }}>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
                                {user?.lastname}.
                            </span>
                        </h1>
                    </div>
                </header>

                {/* Form */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">

                    {/* Personal */}
                    <div className="space-y-10">
<<<<<<< HEAD
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] pb-4"
                            style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-color)" }}>
                            Personal Details
                        </h3>

                        {[
                            { label: "First Name", name: "firstname", type: "text" },
                            { label: "Last Name", name: "lastname", type: "text" },
                            { label: "Email Address", name: "email", type: "email" },
                        ].map(({ label, name, type }) => (
                            <div key={name} className="flex flex-col gap-2">
                                <label className="text-[9px] font-black uppercase tracking-widest"
                                    style={{ color: "var(--text-muted)" }}>
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = "var(--accent)"}
                                    onBlur={e => e.target.style.borderColor = "var(--border-color)"}
                                />
                            </div>
                        ))}
=======
                        <h3 
                            className="text-[11px] font-black uppercase tracking-[0.4em] pb-4"
                            style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}
                        >
                            Personal Details
                        </h3>

                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="border-b-2 outline-none py-4 text-xl font-black italic tracking-tight transition"
                                style={{
                                    background: 'transparent',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="border-b-2 outline-none py-4 text-xl font-black italic tracking-tight transition"
                                style={{
                                    background: 'transparent',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border-b-2 outline-none py-4 text-xl font-black italic tracking-tight transition"
                                style={{
                                    background: 'transparent',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
                    </div>

                    {/* Contact */}
                    <div className="space-y-10">
<<<<<<< HEAD
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] pb-4"
                            style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-color)" }}>
                            Contact & Location
                        </h3>

                        {[
                            { label: "Phone", name: "phone", type: "text" },
                            { label: "Full Address", name: "address", type: "text" },
                        ].map(({ label, name, type }) => (
                            <div key={name} className="flex flex-col gap-2">
                                <label className="text-[9px] font-black uppercase tracking-widest"
                                    style={{ color: "var(--text-muted)" }}>
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = "var(--accent)"}
                                    onBlur={e => e.target.style.borderColor = "var(--border-color)"}
                                />
                            </div>
                        ))}

                        <div className="pt-6">
                            <button type="button" className="group flex items-center gap-4 cursor-pointer">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                                    style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
=======
                        <h3 
                            className="text-[11px] font-black uppercase tracking-[0.4em] pb-4"
                            style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}
                        >
                            Contact & Location
                        </h3>

                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border-b-2 outline-none py-4 text-xl font-black italic tracking-tight transition"
                                style={{
                                    background: 'transparent',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                Full Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="border-b-2 outline-none py-4 text-xl font-black italic tracking-tight transition"
                                style={{
                                    background: 'transparent',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        <div className="pt-6">
                            <button type="button" className="group flex items-center gap-4">
                                <div 
                                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                                    style={{ 
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
<<<<<<< HEAD
                                <span className="text-[10px] font-black uppercase tracking-widest"
                                    style={{ color: "var(--text-secondary)" }}>
=======
                                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
                                    Update Security Key
                                </span>
                            </button>
                        </div>
                    </div>

<<<<<<< HEAD
                    {/* Footer form */}
                    <div className="md:col-span-2 pt-20 flex justify-between items-center">
                        <p className="text-[9px] font-bold uppercase tracking-widest"
                            style={{ color: "var(--text-muted)" }}>
=======
                    {/* FOOT FORM */}
                    <div className="md:col-span-2 pt-20 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
                            Dernière mise à jour : {new Date(user?.updated_at).toLocaleDateString('fr-FR')}
                        </p>

                        <div className="flex gap-4">
<<<<<<< HEAD
                            <button type="button" onClick={handleReset}
                                className="px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                                style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "transparent" }}>
                                Reset
                            </button>

                            <button type="submit" disabled={saving}
                                className="px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                                style={{ background: "var(--accent)", color: "#000", opacity: saving ? 0.6 : 1 }}>
=======
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition"
                                style={{ 
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition shadow-2xl"
                                style={{ 
                                    background: isDark ? 'var(--accent)' : '#000',
                                    color: isDark ? '#000' : '#fff'
                                }}
                            >
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
                                {saving ? 'Enregistrement...' : 'Enregistrer les changements'}
                            </button>
                        </div>
                    </div>
                </form>
            </main>

<<<<<<< HEAD
            <footer className="py-20 text-center" style={{ opacity: 0.2 }}>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic"
                    style={{ color: "var(--text-primary)" }}>
=======
            <footer className="py-20 text-center opacity-20">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic" style={{ color: 'var(--text-primary)' }}>
>>>>>>> 710a58b07115a8ac840405a1ee5acfd8937e3d7c
                    EcoWork Identity Protocol
                </span>
            </footer>
        </div>
    );
};

export default Profile;