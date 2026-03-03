
const Register = () => {
        return (
        <div>
            <div class="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 bg-white z-20">
                <div class="w-full max-w-md fade-in">

                    <div class="mb-12">
                        <span class="text-2xl font-black tracking-tighter uppercase italic">EcoWork.</span>
                        <div class="h-1 w-12 bg-[#b2f7ef] mt-2"></div>
                    </div>

                    <h1 class="text-4xl font-black tracking-tighter uppercase mb-2">Rejoindre</h1>
                    <p class="text-gray-400 text-sm mb-10 font-medium italic">Commencez votre expérience EcoWork aujourd'hui.</p>

                    <form class="space-y-5">
                        <div class="space-y-2">
                            <label class="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Full Name</label>
                            <input type="text" placeholder="Alexandre Dumas"
                                class="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium"/>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Email</label>
                            <input type="email" placeholder="alex@work.com"
                                class="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium"/>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Create Security Key</label>
                            <input type="password" placeholder="••••••••••••"
                                class="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium"/>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Membership Type</label>
                            <select class="input-user w-full px-6 py-4 rounded-2xl text-sm font-medium appearance-none cursor-pointer">
                                <option>Flexible Nomad</option>
                                <option>Dedicated Desk</option>
                                <option>Private Office</option>
                            </select>
                        </div>

                        <label class="flex items-center gap-3 cursor-pointer group py-2">
                            <input type="checkbox" class="accent-[#b2f7ef] w-4 h-4"/>
                                <span class="text-[10px] font-bold text-gray-400 group-hover:text-black transition uppercase tracking-widest leading-tight">J'accepte le protocole de confidentialité</span>
                        </label>

                        <button type="submit" class="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#b2f7ef] hover:text-black transition-all active:scale-[0.98] shadow-2xl shadow-black/5 mt-4">
                            Créer mon profil
                        </button>
                    </form>

                    <p class="mt-12 text-center text-sm font-medium text-gray-400">
                        Déjà membre ?
                        <a href="#" class="text-black font-black border-b-2 border-black ml-2">Se connecter</a>
                    </p>

                </div>
            </div>

            <div class="hidden lg:block w-1/2 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-white to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
                    class="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                    alt="Design Studio"/>

                    <div class="absolute top-12 right-12 z-20">
                        <div class="bg-black text-white px-6 py-3 rounded-full shadow-2xl">
                            <span class="text-[9px] font-black uppercase tracking-[0.4em]">Curated Spaces 2026</span>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Register;