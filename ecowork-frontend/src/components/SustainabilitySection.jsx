import { useTheme } from "../contexts/ThemeContext";

export default function SustainabilitySection() {
    const { isDark } = useTheme();

    return (
        <section
            className="relative z-30 py-40 px-6 md:px-20 transition-colors duration-500 overflow-hidden"
            style={{
                background: "var(--bg-primary)",
                color: "var(--text-primary)"
            }}
        >
            {/* Effet de lueur d'arrière-plan adaptatif */}
            <div
                className="absolute -bottom-1/2 -left-1/4 w-[80vw] h-[80vw] blur-[150px] rounded-full pointer-events-none opacity-20"
                style={{ background: isDark ? "#b2f7ef" : "#7bdff2" }}
            ></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: "var(--accent)" }}>
                                Sustainability
                            </span>
                            <div className="h-px w-20" style={{ background: "var(--border-color)" }}></div>
                        </div>

                        <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                            Build for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b2f7ef] to-[#7bdff2]">
                                The Future.
                            </span>
                        </h2>

                        <div className="space-y-12">
                            <div className="flex items-start gap-8">
                                <span className="text-4xl font-light italic" style={{ color: "var(--accent)" }}>01</span>
                                <div>
                                    <h4 className="text-xl font-bold uppercase tracking-tight">Sobriété Numérique</h4>
                                    <p className="text-sm mt-2 max-w-sm" style={{ color: "var(--text-secondary)" }}>
                                        Serveurs alimentés à 100% par des énergies renouvelables et infrastructure réseau optimisée.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-8">
                                <span className="text-4xl font-light italic" style={{ color: "var(--accent)" }}>02</span>
                                <div>
                                    <h4 className="text-xl font-bold uppercase tracking-tight">Économie Circulaire</h4>
                                    <p className="text-sm mt-2 max-w-sm" style={{ color: "var(--text-secondary)" }}>
                                        90% de notre mobilier est issu de l'upcycling ou de forêts gérées durablement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Carte de statistiques (Glassmorphism) */}
                    <div className="relative border rounded-[60px] p-12 backdrop-blur-3xl transition-all"
                        style={{
                            background: "var(--bg-card)",
                            borderColor: "var(--border-color)"
                        }}>
                        <div className="grid grid-cols-1 gap-12">
                            <div className="border-b pb-8" style={{ borderColor: "var(--border-color)" }}>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: "var(--text-muted)" }}>
                                    Carbone Évité / An
                                </p>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-7xl font-black tracking-tighter">240</span>
                                    <span className="text-2xl font-light italic" style={{ color: "var(--accent)" }}>Tonnes</span>
                                </div>
                            </div>

                            <div className="border-b pb-8" style={{ borderColor: "var(--border-color)" }}>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: "var(--text-muted)" }}>
                                    Énergie Solaire
                                </p>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-7xl font-black tracking-tighter">85</span>
                                    <span className="text-2xl font-light italic" style={{ color: "var(--accent)" }}>%</span>
                                </div>
                            </div>

                            <div className="pb-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: "var(--text-muted)" }}>
                                    Plastique Usage Unique
                                </p>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-7xl font-black tracking-tighter opacity-30">00</span>
                                    <span className="text-2xl font-light italic">Percent</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
