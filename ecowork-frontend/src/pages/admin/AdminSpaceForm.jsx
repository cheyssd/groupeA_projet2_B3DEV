import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Sidebar } from "./AdminOverview";

const API_URL = window.location.hostname === 'localhost'
  ? 'http://127.0.0.1:8000'
  : 'https://api-raffaa.ifran-b3dev.com';

const TYPE_LABELS = {
  bureau_prive: "Bureau Privé",
  espace_partage: "Espace Partagé",
  salle_reunion: "Salle de Réunion",
  salle_conference: "Salle de Conférence",
};

export default function AdminSpaceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const token = localStorage.getItem("token");
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "", surface: "", capacity: "", type: "bureau_prive", price_per_day: "", is_active: 1,
  });
  const [images, setImages] = useState([]);
  const [equipements, setEquipements] = useState([]);
  const [selectedEquipements, setSelectedEquipements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState({});

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetch(`${API_URL}/api/equipements`, { headers })
      .then((r) => r.json())
      .then((data) => setEquipements(Array.isArray(data) ? data : []))
      .catch(() => setEquipements([]));
  }, []);

  useEffect(() => {
    if (isEdit) {
      fetch(`${API_URL}/api/spaces/${id}`, { headers })
        .then((r) => r.json())
        .then((data) => {
          setForm({
            name: data.name, surface: data.surface, capacity: data.capacity,
            type: data.type, price_per_day: data.price_per_day, is_active: data.is_active,
          });
          if (data.equipements) setSelectedEquipements(data.equipements.map((e) => e.id));
          setFetching(false);
        });
    }
  }, [id]);

  const toggleEquipement = (eqId) => {
    setSelectedEquipements((prev) =>
      prev.includes(eqId) ? prev.filter((e) => e !== eqId) : [...prev, eqId]
    );
  };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Nom requis";
    if (!form.surface) e.surface = "Surface requise";
    if (!form.capacity) e.capacity = "Capacité requise";
    if (!form.price_per_day) e.price_per_day = "Prix requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const url = isEdit ? `${API_URL}/api/spaces/${id}` : `${API_URL}/api/spaces`;
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
    const data = await res.json();
    const spaceId = data.space?.id || data.id || id;
    if (spaceId && selectedEquipements.length >= 0) {
      await fetch(`${API_URL}/api/spaces/${spaceId}/equipements`, {
        method: "POST", headers,
        body: JSON.stringify({ equipement_ids: selectedEquipements }),
      });
    }
    if (!isEdit && spaceId && images.length > 0) await uploadImages(spaceId);
    if (data.success || spaceId) navigate("/admin/spaces");
  };

  const uploadImages = async (spaceId) => {
    for (const image of images) {
      const formData = new FormData();
      formData.append("image", image.file);
      formData.append("alt_text", image.alt || "Photo espace");
      await fetch(`${API_URL}/api/spaces/${spaceId}/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        body: formData,
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({ file, preview: URL.createObjectURL(file), alt: "" }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => setImages(images.filter((_, i) => i !== index));

  const fields = [
    { key: "name", label: "Nom de l'espace", type: "text", placeholder: "Ex: Bonoua Space", full: true },
    { key: "surface", label: "Surface (m²)", type: "number", placeholder: "Ex: 600" },
    { key: "capacity", label: "Capacité (personnes)", type: "number", placeholder: "Ex: 80" },
    { key: "price_per_day", label: "Prix par jour (€)", type: "number", placeholder: "Ex: 20000" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900&family=Barlow:ital,wght@0,400;0,500&family=Rajdhani:wght@500;600;700&display=swap');
        input::placeholder { color: var(--text-muted); opacity: 1; }
        input:focus, select:focus { border-color: var(--accent) !important; }
      `}</style>

      <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Sidebar active="spaces" />

        <main className="flex-1 px-4 md:px-10 py-6 md:py-8 pt-20 md:pt-8" style={{ fontFamily: "'Barlow', sans-serif" }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-8 md:mb-10 gap-3">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <button onClick={() => navigate("/admin/spaces")}
                className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-70 flex-shrink-0"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>
              <div className="min-w-0">
                <p className="text-[9px] tracking-[4px] uppercase mb-0.5"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                  Admin · Espaces
                </p>
                <h1 className="font-black uppercase leading-none truncate"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(18px, 4vw, 32px)", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                  {isEdit ? "Modifier l'espace" : "Ajouter un espace"}
                </h1>
              </div>
            </div>

            <button onClick={toggle}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer flex-shrink-0"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-card)", color: "var(--text-secondary)" }}>
              {isDark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              <span className="hidden sm:inline text-[9px] tracking-[2px] uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                {isDark ? "Light" : "Dark"}
              </span>
            </button>
          </div>

          {fetching ? (
            <p style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "2px" }}>Chargement...</p>
          ) : (
            <div className="max-w-3xl">
              <div className="rounded-2xl p-5 md:p-8"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>

                {/* Informations générales */}
                <p className="text-[9px] tracking-[4px] uppercase mb-4"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                  Informations générales
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
                  {fields.map((f) => (
                    <div key={f.key} className={f.full ? "sm:col-span-2" : ""}>
                      <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        value={form[f.key]}
                        placeholder={f.placeholder}
                        onChange={(e) => { setForm({ ...form, [f.key]: e.target.value }); setErrors({ ...errors, [f.key]: null }); }}
                        className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
                        style={{
                          background: "var(--bg-primary)",
                          border: `1px solid ${errors[f.key] ? "#f87171" : "var(--border-color)"}`,
                          color: "var(--text-primary)",
                          fontFamily: "'Barlow', sans-serif",
                        }}
                      />
                      {errors[f.key] && (
                        <p className="text-[10px] mt-1" style={{ color: "#f87171", fontFamily: "'Rajdhani', sans-serif" }}>
                          {errors[f.key]}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Type */}
                  <div>
                    <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                      Type d'espace
                    </label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl outline-none text-sm cursor-pointer"
                      style={{ background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", fontFamily: "'Barlow', sans-serif" }}>
                      {Object.entries(TYPE_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Toggle actif */}
                  <div className="flex flex-col justify-center">
                    <label className="block text-[9px] tracking-[3px] uppercase mb-2"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                      Statut
                    </label>
                    <div className="flex items-center gap-3">
                      <div onClick={() => setForm({ ...form, is_active: form.is_active ? 0 : 1 })}
                        className="w-12 h-6 rounded-full cursor-pointer transition-all flex items-center px-1"
                        style={{ background: form.is_active ? "var(--accent)" : "var(--border-color)" }}>
                        <div className="w-4 h-4 rounded-full bg-white transition-all"
                          style={{ transform: form.is_active ? "translateX(24px)" : "translateX(0)" }} />
                      </div>
                      <span className="text-sm font-semibold"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: form.is_active ? "var(--accent)" : "var(--text-muted)" }}>
                        {form.is_active ? "Actif" : "Inactif"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="my-5 md:my-6" style={{ borderTop: "1px solid var(--border-color)" }} />

                {/* Équipements */}
                <p className="text-[9px] tracking-[4px] uppercase mb-4"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                  Équipements ({selectedEquipements.length} sélectionné{selectedEquipements.length > 1 ? "s" : ""})
                </p>

                {equipements.length === 0 ? (
                  <p className="text-sm italic mb-6" style={{ color: "var(--text-muted)" }}>
                    Aucun équipement disponible.{" "}
                    <span className="cursor-pointer underline" style={{ color: "var(--accent)" }}
                      onClick={() => navigate("/admin/equipements")}>
                      En créer
                    </span>
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {equipements.map((eq) => {
                      const isSelected = selectedEquipements.includes(eq.id);
                      return (
                        <button key={eq.id} onClick={() => toggleEquipement(eq.id)}
                          className="px-3 py-1.5 rounded-full text-[10px] tracking-[1px] uppercase font-bold cursor-pointer transition-all"
                          style={{
                            background: isSelected ? "var(--accent)" : "var(--bg-primary)",
                            color: isSelected ? "#000" : "var(--text-secondary)",
                            border: `1px solid ${isSelected ? "var(--accent)" : "var(--border-color)"}`,
                            fontFamily: "'Rajdhani', sans-serif",
                          }}>
                          {isSelected && "✓ "}{eq.name}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="my-5 md:my-6" style={{ borderTop: "1px solid var(--border-color)" }} />

                {/* Photos */}
                <p className="text-[9px] tracking-[4px] uppercase mb-4"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--text-muted)" }}>
                  Photos de l'espace
                </p>

                <input type="file" multiple accept="image/webp,image/avif,image/*"
                  onChange={handleImageChange} className="hidden" id="image-upload" />

                <label htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full py-6 md:py-8 rounded-xl border-2 border-dashed cursor-pointer transition-all mb-4"
                  style={{ borderColor: "var(--border-color)", background: "var(--bg-primary)" }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    setImages([...images, ...files.map((file) => ({ file, preview: URL.createObjectURL(file), alt: "" }))]);
                  }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    className="mb-2" style={{ color: "var(--text-muted)" }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p className="text-[10px] uppercase tracking-widest mb-1"
                    style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                    Glissez ou cliquez pour ajouter des photos
                  </p>
                  <p className="text-[9px]" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif" }}>
                    WebP, AVIF recommandés
                  </p>
                </label>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3 mb-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative group rounded-xl overflow-hidden" style={{ height: "70px" }}>
                        <img src={img.preview} alt="" loading="lazy" className="w-full h-full object-cover" />
                        <button onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          style={{ background: "#f87171", color: "#fff", fontSize: "12px" }}>
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="my-5 md:my-6" style={{ borderTop: "1px solid var(--border-color)" }} />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => navigate("/admin/spaces")}
                    className="sm:flex-none px-6 py-3 rounded-xl text-xs tracking-[2px] uppercase font-semibold cursor-pointer w-full sm:w-auto text-center"
                    style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}>
                    Annuler
                  </button>
                  <button onClick={handleSubmit} disabled={loading}
                    className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xl text-xs tracking-[2px] uppercase font-bold cursor-pointer transition-all flex-1 sm:flex-none"
                    style={{ background: "var(--accent)", color: "#000", fontFamily: "'Rajdhani', sans-serif", opacity: loading ? 0.7 : 1 }}>
                    {loading ? "Enregistrement..." : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {isEdit ? "Enregistrer" : "Créer l'espace"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}