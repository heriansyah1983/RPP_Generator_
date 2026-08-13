import React, { useState } from 'react';
import { RPPFormData } from '../types';
import {
  MAPEL_CATEGORIES,
  FASE_KELAS_OPTIONS,
  MODEL_PEMBELAJARAN_OPTIONS,
  PROFIL_PELAJAR_PANCASILA_OPTIONS,
  TARGET_PESERTA_OPTIONS,
  MODE_PEMBELAJARAN_OPTIONS,
  KONDISI_DIAGNOSTIK_OPTIONS,
} from '../data/subjectOptions';
import {
  School,
  BookOpen,
  GraduationCap,
  FileText,
  Clock,
  Calendar,
  Lightbulb,
  User,
  ChevronDown,
  CheckCircle2,
  PlusCircle,
  Settings2,
  Stethoscope,
  Sparkles,
  Brain
} from 'lucide-react';

interface FormPanelProps {
  formData: RPPFormData;
  onChange: (data: RPPFormData) => void;
  onSubmitStandard: () => void;
  onOpenQuiz?: () => void;
}

export const FormPanel: React.FC<FormPanelProps> = ({
  formData,
  onChange,
  onSubmitStandard,
  onOpenQuiz,
}) => {
  const [showExtraFields, setShowExtraFields] = useState<boolean>(true);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...formData,
      [name]: value,
    });
  };

  const handleProfilCheckbox = (profilItem: string) => {
    const current = formData.profilPancasila || [];
    if (current.includes(profilItem)) {
      onChange({
        ...formData,
        profilPancasila: current.filter((p) => p !== profilItem),
      });
    } else {
      onChange({
        ...formData,
        profilPancasila: [...current, profilItem],
      });
    }
  };

  return (
    <div className="bg-zinc-900/40 rounded-2xl shadow-xl border border-zinc-800 p-5 sm:p-6 text-zinc-100 transition-all backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-800">
        <div>
          <h2 className="text-sm font-semibold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-emerald-500" />
            Konfigurasi Modul RPP
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Lengkapi data di bawah ini untuk menghasilkan RPP resmi Kurikulum Merdeka.
          </p>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmitStandard(); }} className="space-y-5">
        
        {/* 1. Nama Sekolah */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
            <School className="w-4 h-4 text-emerald-500" />
            <span>1. Nama Sekolah</span> <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="namaSekolah"
            value={formData.namaSekolah}
            onChange={handleTextChange}
            placeholder="Contoh: SD Negeri 01 Merdeka / SMPN 2 Jakarta"
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            required
          />
        </div>

        {/* 2. Mata Pelajaran */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>2. Mata Pelajaran</span> <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <select
              name="mataPelajaran"
              value={formData.mataPelajaran}
              onChange={handleTextChange}
              className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition appearance-none cursor-pointer pr-10"
              required
            >
              <option value="" disabled className="bg-zinc-900 text-zinc-400">-- Pilih Mata Pelajaran --</option>
              {MAPEL_CATEGORIES.map((cat) => (
                <optgroup key={cat.categoryName} label={cat.categoryName} className="bg-zinc-900 text-emerald-400 font-semibold">
                  {cat.subjects.map((sub) => (
                    <option key={sub} value={sub} className="bg-zinc-800 text-zinc-100 font-normal">
                      {sub}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Custom Mata Pelajaran if 'Lainnya' selected */}
          {formData.mataPelajaran === 'Lainnya (Tentukan Sendiri)' && (
            <div className="mt-2 animate-fadeIn">
              <input
                type="text"
                name="customMataPelajaran"
                value={formData.customMataPelajaran || ''}
                onChange={handleTextChange}
                placeholder="Tuliskan Nama Mata Pelajaran Kustom..."
                className="w-full px-4 py-2 bg-zinc-800 border border-amber-500/60 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          )}
        </div>

        {/* 3. Fase / Kelas */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span>3. Fase / Kelas</span> <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <select
              name="faseKelas"
              value={formData.faseKelas}
              onChange={handleTextChange}
              className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition appearance-none cursor-pointer pr-10"
              required
            >
              <option value="" disabled className="bg-zinc-900 text-zinc-400">-- Pilih Fase & Kelas --</option>
              {FASE_KELAS_OPTIONS.map((fase) => (
                <option key={fase.value} value={fase.value} className="bg-zinc-800 text-zinc-100">
                  {fase.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* 4. Materi Pokok */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-500" />
            <span>4. Materi Pokok</span> <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="materiPokok"
            value={formData.materiPokok}
            onChange={handleTextChange}
            placeholder="Contoh: Operasi Penjumlahan & Pengurangan / Ekosistem Lingkungan"
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            required
          />
        </div>

        {/* 5. Alokasi Waktu */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>5. Alokasi Waktu</span> <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="alokasiWaktu"
            value={formData.alokasiWaktu}
            onChange={handleTextChange}
            placeholder="Contoh: 2 x 40 menit (1 Pertemuan)"
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            required
          />
        </div>

        {/* 6. Model Pembelajaran */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-emerald-500" />
            <span>6. Model Pembelajaran</span> <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <select
              name="modelPembelajaran"
              value={formData.modelPembelajaran}
              onChange={handleTextChange}
              className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition appearance-none cursor-pointer pr-10"
              required
            >
              <option value="" disabled className="bg-zinc-900 text-zinc-400">-- Pilih Model Pembelajaran --</option>
              {MODEL_PEMBELAJARAN_OPTIONS.map((model) => (
                <option key={model} value={model} className="bg-zinc-800 text-zinc-100">
                  {model}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Custom Model Pembelajaran if 'Lainnya' selected */}
          {formData.modelPembelajaran === 'Lainnya (Sebutkan Kustom)' && (
            <div className="mt-2 animate-fadeIn">
              <input
                type="text"
                name="customModelPembelajaran"
                value={formData.customModelPembelajaran || ''}
                onChange={handleTextChange}
                placeholder="Sebutkan Model Pembelajaran Lainnya..."
                className="w-full px-4 py-2 bg-zinc-800 border border-amber-500/60 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          )}
        </div>

        {/* Extra Fields Collapsible Section */}
        <div className="pt-3 border-t border-zinc-800">
          <button
            type="button"
            onClick={() => setShowExtraFields(!showExtraFields)}
            className="flex items-center justify-between w-full py-1.5 text-xs font-semibold text-zinc-300 hover:text-emerald-400 transition cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-emerald-500" />
              Kolom Tambahan (Profil Pancasila & Identitas Guru)
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showExtraFields ? 'rotate-180' : ''}`} />
          </button>

          {showExtraFields && (
            <div className="mt-3 space-y-4 pt-2 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800">
              
              {/* Profil Pelajar Pancasila Checkboxes */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">
                  Profil Pelajar Pancasila (Pilih Sesuai Target):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {PROFIL_PELAJAR_PANCASILA_OPTIONS.map((item) => {
                    const checked = formData.profilPancasila?.includes(item);
                    return (
                      <label
                        key={item}
                        className={`flex items-start gap-2 p-2 rounded-lg border text-xs cursor-pointer transition ${
                          checked
                            ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300 font-medium'
                            : 'bg-zinc-800/80 border-zinc-700/80 text-zinc-300 hover:bg-zinc-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleProfilCheckbox(item)}
                          className="mt-0.5 rounded text-emerald-500 focus:ring-emerald-500 bg-zinc-900 border-zinc-700"
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Target & Mode Pembelajaran */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Target Peserta Didik</label>
                  <select
                    name="targetPesertaDidik"
                    value={formData.targetPesertaDidik}
                    onChange={handleTextChange}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-100"
                  >
                    {TARGET_PESERTA_OPTIONS.map((t) => (
                      <option key={t} value={t} className="bg-zinc-800 text-zinc-100">{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Mode Pembelajaran</label>
                  <select
                    name="modePembelajaran"
                    value={formData.modePembelajaran}
                    onChange={handleTextChange}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-100"
                  >
                    {MODE_PEMBELAJARAN_OPTIONS.map((m) => (
                      <option key={m} value={m} className="bg-zinc-800 text-zinc-100">{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sarana & Prasarana */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Sarana & Prasarana</label>
                <input
                  type="text"
                  name="saranaPrasarana"
                  value={formData.saranaPrasarana}
                  onChange={handleTextChange}
                  placeholder="Buku Teks, Proyektor, LKPD, Laptop..."
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-100 placeholder-zinc-500"
                />
              </div>

              {/* Identitas Guru & Kepala Sekolah */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    Nama Pendidik / Guru
                  </label>
                  <input
                    type="text"
                    name="namaGuru"
                    value={formData.namaGuru}
                    onChange={handleTextChange}
                    placeholder="Nama Guru, S.Pd."
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-100 placeholder-zinc-500"
                  />
                  <input
                    type="text"
                    name="nipGuru"
                    value={formData.nipGuru || ''}
                    onChange={handleTextChange}
                    placeholder="NIP Guru (opsional)"
                    className="w-full mt-1.5 px-3 py-1.5 bg-zinc-800 border border-zinc-700/80 rounded-md text-xs text-zinc-200 placeholder-zinc-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    Nama Kepala Sekolah
                  </label>
                  <input
                    type="text"
                    name="namaKepalaSekolah"
                    value={formData.namaKepalaSekolah}
                    onChange={handleTextChange}
                    placeholder="Nama Kepala Sekolah, M.Pd."
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-100 placeholder-zinc-500"
                  />
                  <input
                    type="text"
                    name="nipKepalaSekolah"
                    value={formData.nipKepalaSekolah || ''}
                    onChange={handleTextChange}
                    placeholder="NIP Kepala Sekolah (opsional)"
                    className="w-full mt-1.5 px-3 py-1.5 bg-zinc-800 border border-zinc-700/80 rounded-md text-xs text-zinc-200 placeholder-zinc-500"
                  />
                </div>
              </div>

              {/* Tanggal Pembuatan RPP */}
              <div className="pt-1">
                <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  Tanggal Pembuatan RPP (Tanggal Tanda Tangan Guru)
                </label>
                <input
                  type="text"
                  name="tanggalPembuatan"
                  value={formData.tanggalPembuatan || ''}
                  onChange={handleTextChange}
                  placeholder="Contoh: Sidenreng Rappang, 12 Agustus 2026 atau 12 Agustus 2026"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-100 placeholder-zinc-500"
                />
              </div>

            </div>
          )}
        </div>

        {/* Kondisi Diagnostik Siswa Dropdown (Petunjuk Buat RPP Sesuai Kondisi Siswa) */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-emerald-400 mb-1.5 flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-emerald-400" />
            <span>Petunjuk RPP: Kondisi Diagnostik / Kesiapan Siswa</span> <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <select
              name="kondisiDiagnostikSiswa"
              value={formData.kondisiDiagnostikSiswa || KONDISI_DIAGNOSTIK_OPTIONS[0]}
              onChange={handleTextChange}
              className="w-full px-4 py-2.5 bg-zinc-800 border-2 border-emerald-500/60 rounded-xl text-xs sm:text-sm text-zinc-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition appearance-none cursor-pointer pr-10 shadow-inner"
              required
            >
              {KONDISI_DIAGNOSTIK_OPTIONS.map((k) => (
                <option key={k} value={k} className="bg-zinc-900 text-zinc-100 py-1">
                  {k}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-emerald-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
          <p className="text-[11px] text-zinc-400 mt-1 pl-1">
            Pilih kondisi awal siswa ini agar RPP & langkah pembelajaran disesuaikan secara otomatis.
          </p>
        </div>

        {/* Buttons Action Bar */}
        <div className="pt-2 space-y-3">
          {/* Main Huge Green Button: "Buat RPP" */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 flex items-center justify-center gap-2 transition-all cursor-pointer group"
          >
            <CheckCircle2 className="w-6 h-6 text-white" />
            <span>BUAT RPP SEKARANG</span>
          </button>

          {/* Interactive Quiz Button: "Uji Pemahaman Siswa" */}
          <button
            type="button"
            onClick={onOpenQuiz}
            className="w-full py-3.5 px-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-amber-950/40 hover:shadow-amber-900/60 flex items-center justify-center gap-2.5 transition-all cursor-pointer group border border-amber-300/40 active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform shrink-0" />
            <div className="flex flex-col items-center">
              <span className="tracking-wide">UJI PEMAHAMAN SISWA</span>
              <span className="text-[10px] font-bold text-slate-900/80 tracking-wider uppercase">
                (Kuis Interaktif LOTS • MOTS • HOTS)
              </span>
            </div>
            <Brain className="w-5 h-5 text-slate-950 shrink-0 hidden sm:inline" />
          </button>
        </div>

      </form>
    </div>
  );
};
