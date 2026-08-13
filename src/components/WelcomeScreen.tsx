import React from 'react';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Target,
  Brain,
  Users,
  Search,
  Sprout,
  Lightbulb,
  FileText,
  BarChart3,
  Printer,
  ShieldCheck,
  Award,
  CheckCircle2
} from 'lucide-react';

interface WelcomeScreenProps {
  onEnterApp: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterApp }) => {
  const features = [
    { icon: BookOpen, label: 'Identitas Pembelajaran', desc: 'Identitas lengkap sekolah, fase, kelas, dan mapel' },
    { icon: Target, label: 'CP & Tujuan Pembelajaran', desc: 'Sesuai Standar Kompetensi Lulusan & Standar Isi' },
    { icon: Brain, label: 'Model & Metode Pembelajaran', desc: 'PBL, PjBL, Discovery Learning, & sintaks interaktif' },
    { icon: Users, label: 'Karakteristik Peserta Didik', desc: 'Pemetaan gaya belajar, minat, dan target murid' },
    { icon: Search, label: 'Asesmen Diagnostik, Formatif & Sumatif', desc: 'Lengkap instrumen & rubrik penilaian otentik' },
    { icon: Sprout, label: 'Diferensiasi Pembelajaran', desc: 'Berdiferensiasi konten, proses, dan produk' },
    { icon: Lightbulb, label: 'Kegiatan Pembelajaran Kontekstual', desc: 'Berkesadaran, bermakna, dan menggembirakan' },
    { icon: FileText, label: 'Instrumen & Rubrik Asesmen', desc: 'Rubrik profil Pancasila, kinerja, & tes tertulis' },
    { icon: BarChart3, label: 'Refleksi & Tindak Lanjut', desc: 'Umpan balik langsung & pendampingan berkelanjutan' },
    { icon: Printer, label: 'Cetak / Simpan Perangkat', desc: 'Ekspor PDF, Microsoft Word (.doc), & Riwayat RPP' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background Decorative Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        
        {/* Top Badge */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-950/50 animate-pulse">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Versi Resmi 2026 • Kurikulum Merdeka</span>
          </span>
        </div>

        {/* Hero Title Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-600/20 rounded-2xl border border-emerald-500/30 mb-2 shadow-xl shadow-emerald-950/80">
            <BookOpen className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
            RPP <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">GENERATOR</span>
          </h1>
          <p className="text-lg sm:text-xl font-bold text-emerald-300 tracking-wide">
            Perangkat Pembelajaran Digital untuk Guru
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs sm:text-sm font-semibold text-amber-300 shadow-sm">
            <span>Oleh: <strong>HERIANSYAH, S.Si, S.Pd., M.Pd.</strong></span>
          </div>

          {/* Core Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
            <span className="px-3.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-300">
              ⚡ Mudah
            </span>
            <span className="text-zinc-600">•</span>
            <span className="px-3.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-300">
              🚀 Cepat
            </span>
            <span className="text-zinc-600">•</span>
            <span className="px-3.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-300">
              💡 Kontekstual
            </span>
            <span className="text-zinc-600">•</span>
            <span className="px-3.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-300">
              🌱 Berdampak
            </span>
          </div>
        </div>

        {/* Description Intro Card */}
        <div className="mt-10 bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-6 sm:p-8 shadow-2xl text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Selamat datang di <strong className="text-emerald-400 font-semibold">RPP Generator</strong>, sebuah alat bantu digital yang dirancang untuk membantu guru menyusun perangkat pembelajaran secara lebih sistematis, praktis, dan sesuai dengan kebutuhan pembelajaran.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-4">
            RPP Generator membantu guru mengembangkan rancangan pembelajaran dengan memperhatikan Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), karakteristik peserta didik, asesmen, kegiatan pembelajaran, diferensiasi, serta pembelajaran yang kontekstual dan bermakna.
          </p>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-10 bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-emerald-950/80 border border-emerald-800/50 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm tracking-wider uppercase">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <span>Mulai Menyusun Pembelajaran</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white max-w-2xl mx-auto">
            Buat RPP secara lebih cepat tanpa kehilangan substansi pembelajaran.
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/90 italic max-w-xl mx-auto bg-amber-950/30 py-2 px-4 rounded-xl border border-amber-500/20">
            "Teknologi membantu mempercepat pekerjaan, tetapi kualitas pembelajaran tetap ditentukan oleh keputusan profesional guru."
          </p>

          {/* HUGE ENTRY BUTTON */}
          <div className="pt-4">
            <button
              type="button"
              onClick={onEnterApp}
              className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-2xl shadow-emerald-900/60 hover:shadow-emerald-900/80 transform hover:-translate-y-1 transition-all cursor-pointer inline-flex items-center justify-center gap-3 border border-emerald-400/30 group"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-200" />
              <span>KLIK DISINI MASUK GENERATOR RPP</span>
              <ArrowRight className="w-6 h-6 text-emerald-200 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Features Grid (Fitur Utama) */}
        <div className="mt-14">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Fitur Utama Perangkat Pembelajaran
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Diadaptasi sesuai standar resmi BSKAP Kemendikbudristek
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-emerald-500/50 p-4 rounded-xl transition-all flex items-start gap-3.5 group"
                >
                  <div className="p-2.5 bg-emerald-950/60 text-emerald-400 rounded-xl border border-emerald-800/60 shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                      {item.label}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Developer Card (Pengembang) */}
        <div className="mt-14 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shrink-0 border border-emerald-400/30">
            <Award className="w-10 h-10 text-emerald-100" />
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-bold uppercase tracking-wider mb-1">
              👨‍🏫 PENGEMBANG
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              HERIANSYAH, S.Si, S.Pd., M.Pd.
            </h3>
            <p className="text-xs sm:text-sm text-emerald-400 font-semibold leading-relaxed">
              Pengawas Satuan Pendidikan Dinas Pendidikan dan Kebudayaan Kabupaten Sidenreng Rappang
            </p>
          </div>
        </div>

        {/* Quote & Vision Footer */}
        <div className="mt-12 text-center space-y-3 pt-8 border-t border-zinc-800/80">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <span>🌐 RPP GENERATOR</span>
          </div>
          <p className="text-xs text-emerald-400/90 font-medium max-w-md mx-auto">
            Dari perencanaan → pembelajaran → asesmen → refleksi → tindak lanjut
          </p>
          <blockquote className="text-sm italic text-zinc-300 max-w-xl mx-auto font-serif pt-2">
            “Merancang dengan tepat, mengajar dengan bermakna, dan menghasilkan pembelajaran yang berdampak.”
          </blockquote>
          <p className="text-[11px] text-zinc-500 pt-3">
            Versi 2026 • Kurikulum Merdeka Digital Platform
          </p>
        </div>

      </div>
    </div>
  );
};
