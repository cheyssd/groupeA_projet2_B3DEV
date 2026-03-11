import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

const UserNavbar = ({ user }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        if (confirm('Voulez-vous vraiment quitter EcoWork ?')) {
            await logout();
            navigate('/login');
        }
    };

    // Helper pour savoir si le lien est actif
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="w-full bg-white/80 backdrop-blur-md border-b border-black/[0.03] px-8 md:px-16 py-5 flex justify-between items-center sticky top-0 z-[100]">
            
            {/* LEFT SIDE: LOGO & NAV */}
            <div className="flex items-center gap-16">
                <Link to="/" className="group relative">
                    <span className="text-2xl font-black tracking-tighter uppercase italic">
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
                            className={`relative text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 
                                ${isActive(item.path) ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                        >
                            {item.name}
                            {isActive(item.path) && (
                                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#7bdff2] rounded-full"></span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE: USER PROFILE & ACTIONS */}
            <div className="flex items-center gap-8">
                
                {/* User Info Hidden on Mobile */}
                <div className="hidden sm:block text-right">
                    <p className="text-[10px] font-black uppercase tracking-tighter leading-none">
                        {user?.firstname} {user?.lastname?.charAt(0)}.
                    </p>
                    <p className="text-[8px] font-black text-[#7bdff2] uppercase tracking-[0.3em] mt-1">
                        Gold Member
                    </p>
                </div>

                {/* Profile Dropdown Trigger */}
                <div className="relative">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="group flex items-center gap-3 p-1 pr-4 rounded-full border border-black/5 hover:border-black/20 transition-all bg-white shadow-sm"
                    >
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-black overflow-hidden relative">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="relative z-10">{user?.firstname?.charAt(0)}</span>
                            )}
                            <div className="absolute inset-0 bg-[#7bdff2] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </div>
                        <svg 
                            className={`w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* DROPDOWN MENU */}
                    {isMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
                            <div className="absolute right-0 mt-4 w-56 bg-white border border-black/5 shadow-2xl shadow-black/10 rounded-3xl py-4 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                                <Link 
                                    to="/user/profile" 
                                    className="flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    Mon Compte
                                </Link>
                                <div className="h-px bg-black/5 mx-4 my-2"></div>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
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