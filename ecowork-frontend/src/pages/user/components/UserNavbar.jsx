import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';

const UserNavbar = ({ user }) => {
    const { logout } = useContext(AuthContext);
    const { isDark, toggle } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
            await logout();
            navigate('/login');
        }
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/user/dashboard', label: 'Accueil' },
        { path: '/user/reservation', label: 'Mes réservations' },
        { path: '/user/profile', label: 'Mon Profil' },
    ];

    return (
        <>
            <style>{`
                .nav-item {
                    position: relative;
                    transition: all 0.3s ease;
                }
                .nav-item.active::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: #7bdff2;
                }
                .nav-item:hover { color: #7bdff2; }
            `}</style>

            <nav
                className="w-full px-6 md:px-12 py-5 md:py-8 flex justify-between items-center sticky top-0 z-50"
                style={{
                    background: 'var(--bg-card)',
                    borderBottom: '1px solid var(--border-color)'
                }}>

                {/* Left: Logo + desktop links */}
                <div className="flex items-center gap-8 md:gap-12">
                    <Link to="/"
                        className="text-xl font-black tracking-tighter uppercase italic relative group"
                        style={{ color: 'var(--text-primary)' }}>
                        EcoWork.
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7bdff2] transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <div className="hidden md:flex gap-8">
                        {navLinks.map(({ path, label }) => (
                            <Link key={path} to={path}
                                className={`nav-item text-[10px] font-black uppercase tracking-widest transition ${isActive(path) ? 'active' : ''}`}
                                style={{ color: 'var(--text-secondary)' }}>
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right: desktop actions */}
                <div className="hidden md:flex items-center gap-6">
                    <button onClick={toggle}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer"
                        style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>
                        {isDark ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="5"/>
                                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                            </svg>
                        )}
                        <span className="text-[9px] tracking-[2px] uppercase font-semibold">
                            {isDark ? 'Light' : 'Dark'}
                        </span>
                    </button>

                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-tighter leading-none" style={{ color: 'var(--text-primary)' }}>
                            {user?.firstname} {user?.lastname?.charAt(0)}.
                        </p>
                        <p className="text-[8px] font-bold text-[#7bdff2] uppercase tracking-widest">Membre</p>
                    </div>

                    <div className="relative group">
                        <div className="w-12 h-12 rounded-full p-0.5 cursor-pointer" style={{ border: '1px solid var(--border-color)' }}>
                            <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                                <span className="text-lg font-bold" style={{ color: '#000' }}>
                                    {user?.firstname?.charAt(0)}
                                </span>
                            </div>
                        </div>
                        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                            <div className="p-4 space-y-2">
                                <Link to="/user/profile"
                                    className="block px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition"
                                    style={{ color: 'var(--text-primary)', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}>
                                    Mon Profil
                                </Link>
                                <button onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition cursor-pointer"
                                    style={{ color: '#f87171', background: isDark ? 'rgba(248,113,113,0.1)' : 'rgba(248,113,113,0.05)' }}>
                                    Déconnexion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile right: toggle + avatar + hamburger */}
                <div className="flex md:hidden items-center gap-3">
                    <button onClick={toggle}
                        className="flex items-center justify-center w-9 h-9 rounded-full border transition-all cursor-pointer"
                        style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>
                        {isDark ? (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="5"/>
                                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                            </svg>
                        ) : (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                            </svg>
                        )}
                    </button>

                    {/* Mobile avatar */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                        <span className="text-sm font-bold" style={{ color: '#000' }}>
                            {user?.firstname?.charAt(0)}
                        </span>
                    </div>

                    {/* Hamburger */}
                    <button onClick={() => setMenuOpen(o => !o)}
                        className="flex flex-col justify-center items-center w-9 h-9 rounded-full border cursor-pointer"
                        style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)' }}>
                        <span className="block w-4 h-px mb-1" style={{ background: 'var(--text-primary)' }} />
                        <span className="block w-4 h-px mb-1" style={{ background: 'var(--text-primary)' }} />
                        <span className="block w-4 h-px" style={{ background: 'var(--text-primary)' }} />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden sticky top-[73px] z-40 mx-4 rounded-2xl border p-4 flex flex-col gap-2"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>

                    {/* User info */}
                    <div className="px-4 py-3 mb-1" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <p className="text-[10px] font-black uppercase tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                            {user?.firstname} {user?.lastname?.charAt(0)}.
                        </p>
                        <p className="text-[8px] font-bold text-[#7bdff2] uppercase tracking-widest">Membre</p>
                    </div>

                    {navLinks.map(({ path, label }) => (
                        <Link key={path} to={path}
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition"
                            style={{
                                color: isActive(path) ? '#7bdff2' : 'var(--text-secondary)',
                                background: isActive(path)
                                    ? (isDark ? 'rgba(123,223,242,0.08)' : 'rgba(123,223,242,0.06)')
                                    : 'transparent'
                            }}>
                            {label}
                        </Link>
                    ))}

                    <button onClick={() => { setMenuOpen(false); handleLogout(); }}
                        className="mt-1 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-left cursor-pointer"
                        style={{ color: '#f87171', background: isDark ? 'rgba(248,113,113,0.1)' : 'rgba(248,113,113,0.05)' }}>
                        Déconnexion
                    </button>
                </div>
            )}
        </>
    );
};

export default UserNavbar;