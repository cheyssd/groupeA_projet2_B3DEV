import { useTheme } from "../contexts/ThemeContext";

export default function ProductivitySection() {
    const { isDark } = useTheme();

    return (
        <section 
            className="relative z-30 py-32 px-6 md:px-20 transition-colors duration-500 overflow-hidden"
            style={{ 
                background: "var(--bg-primary)", // Utilise ton thème
                color: "var(--text-primary)" 
            }}
        >
            {/* Ligne de séparation discrète */}
            <div className="max-w-7xl mx-auto h-px mb-32" style={{ background: "var(--border-color)" }}></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

                <div className="lg:col-span-5">
                    <div className="inline-block px-3 py-1 border border-[#7bdff2]/30 rounded-full mb-8">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#7bdff2]">The Collective</span>
                    </div>
                    <h2 className="text-5xl font-light tracking-tighter leading-tight mb-8">
                        Rejoignez l'élite de la <br />
                        <span className="font-black italic">Productivité.</span>
                    </h2>
                    <p className="text-sm leading-relaxed max-w-sm italic" style={{ color: "var(--text-secondary)" }}>
                        "GreenSpace n'est pas qu'un bureau, c'est un accélérateur de flux cognitif. Le silence y est un
                        luxe, la technologie une évidence."
                    </p>

                    <div className="grid grid-cols-2 gap-12 mt-16">
                        <div>
                            <p className="text-3xl font-black tracking-tighter">500+</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest mt-2" style={{ color: "var(--text-muted)" }}>Membres Actifs</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black tracking-tighter">12</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest mt-2" style={{ color: "var(--text-muted)" }}>Lieux à Paris</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 relative">
                    <div className="p-12 rounded-[50px] relative z-10 border transition-all"
                         style={{ 
                             background: "var(--bg-card)", 
                             borderColor: "var(--border-color)",
                             backdropFilter: "blur(10px)"
                         }}>
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-16 h-16 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                                    alt="Founder" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black uppercase tracking-tight">Julien Valenza</h4>
                                <p className="text-[10px] font-bold text-[#7bdff2] uppercase tracking-widest">Architecte Software</p>
                            </div>
                        </div>
                        <blockquote className="text-2xl font-medium leading-snug tracking-tight italic">
                            « Passer de mon bureau à domicile au Module_01 a augmenté ma production de 40%. L'acoustique est
                            simplement inégalée à Paris. »
                        </blockquote>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#7bdff2]/5 blur-[120px] rounded-full pointer-events-none"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-40">
                <p className="text-center text-[9px] font-black uppercase tracking-[0.5em] mb-12" style={{ color: "var(--text-muted)" }}>Ils buildent chez EcoWork</p>
                <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-30 grayscale hover:opacity-100 transition-all duration-1000">
                    {["STRIPE", "LINEAR", "VERCEL", "NOTION", "FIGMA"].map(brand => (
                        <span key={brand} className="text-2xl font-black tracking-tighter">{brand}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}
