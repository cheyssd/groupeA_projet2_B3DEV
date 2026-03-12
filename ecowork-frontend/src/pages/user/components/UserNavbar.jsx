import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';

const UserNavbar = ({ user }) => {
    const { logout } = useContext(AuthContext);
    const { isDark, toggle } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        if (confirm('Voulez-vous vraiment quitter EcoWork ?')) {
            await logout();
            navigate('/login');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="w-full backdrop-blur-md border-b px-8 md:px-16 py-5 flex justify-between items-center sticky top-0 z-[100]"
            style={{
                background: isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)",
                borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            }}>
            
            {/* LEFT SIDE: LOGO & NAV */}
            <div className="flex items-center gap-16">
                <Link to="/" className="group relative">
                    <span className="text-2xl font-black tracking-tighter uppercase italic"
                        style={{ color: "var(--text-primary)" }}>
                        EcoWork.
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7bdff2] transition-all group-hover:w-full"></div>
                </Link>

                <div className="hidden lg:flex items-center gap-10">
                    {[
                        { name: 'Accueil', path: '/user/dashboard' },
                        { name: 'Réservations', path: '/user/reservation' },
                        { name: 'Exploration', path: '/spaces' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="relative text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300"
                            style={{ color: isActive(item.path) ? "var(--text-primary)" : "var(--text-muted)" }}
                        >
                            {item.name}
                            {isActive(item.path) && (
                                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#7bdff2] rounded-full"></span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6">

                {/* Dark mode toggle */}
                <button onClick={toggle}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer"
                    style={{ borderColor: "var(--border-color)", background: "transparent", color: "var(--text-secondary)" }}>
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
                    <span className="text-[9px] tracking-[2px] uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        {isDark ? "Light" : "Dark"}
                    </span>
                </button>

                {/* User Info */}
                <div className="hidden sm:block text-right">
                    <p className="text-[10px] font-black uppercase tracking-tighter leading-none"
                        style={{ color: "var(--text-primary)" }}>
                        {user?.firstname} {user?.lastname?.charAt(0)}.
                    </p>
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] mt-1" style={{ color: "#7bdff2" }}>
                        Gold Member
                    </p>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="group flex items-center gap-3 p-1 pr-4 rounded-full border transition-all"
                        style={{
                            borderColor: "var(--border-color)",
                            background: isDark ? "rgba(255,255,255,0.05)" : "white",
                        }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black overflow-hidden relative"
                            style={{ background: "var(--accent)", color: "#000" }}>
                            {user?.avatar ? (
                                <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="relative z-10">{user?.firstname?.charAt(0)}</span>
                            )}
                        </div>
                        <svg
                            className={`w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style={{ color: "var(--text-muted)" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* DROPDOWN */}
                    {isMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
                            <div className="absolute right-0 mt-4 w-56 border shadow-2xl rounded-3xl py-4 z-20 overflow-hidden"
                                style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                                <Link
                                    to="/user/profile"
                                    className="flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest transition"
                                    style={{ color: "var(--text-secondary)" }}
                                    onClick={() => setIsMenuOpen(false)}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Mon Compte
                                </Link>
                                <div className="h-px mx-4 my-2" style={{ background: "var(--border-color)" }}></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest transition"
                                    style={{ color: "#f87171" }}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Déconnexion
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;