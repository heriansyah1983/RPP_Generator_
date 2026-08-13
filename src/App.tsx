import React, { useState, useEffect } from 'react';
import { RPPFormData, RPPContent } from './types';
import { generateTemplateRPP } from './data/templateGenerator';
import { Header } from './components/Header';
import { FormPanel } from './components/FormPanel';
import { RPPPreview } from './components/RPPPreview';
import { HistoryDrawer } from './components/HistoryDrawer';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizModal } from './components/QuizModal';

const INITIAL_FORM_DATA: RPPFormData = {
  namaSekolah: 'SD Negeri 01 Merdeka',
  mataPelajaranCategory: 'Mata Pelajaran Wajib',
  mataPelajaran: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
  customMataPelajaran: '',
  faseKelas: 'Fase B: Kelas 3 dan Kelas 4',
  materiPokok: 'Ekosistem dan Interaksi Makhluk Hidup',
  alokasiWaktu: '2 x 35 menit (1 Pertemuan)',
  modelPembelajaran: 'Problem Based Learning (PBL)',
  customModelPembelajaran: '',
  profilPancasila: ['Bernalar Kritis', 'Gotong Royong', 'Mandiri'],
  targetPesertaDidik: 'Peserta didik reguler/tipikal',
  modePembelajaran: 'Tatap Muka (Luring)',
  saranaPrasarana: 'Buku Siswa IPAS Kelas 4, Proyektor, Lembar Kerja Murid (LKPD), Media Gambar Ekosistem',
  namaGuru: 'Ahmad Pendidik, S.Pd.',
  nipGuru: '19850101 201001 1 001',
  namaKepalaSekolah: 'Drs. Supriyadi, M.Pd.',
  nipKepalaSekolah: '19700512 199503 1 002',
  tanggalPembuatan: '12 Agustus 2026',
  tahunAjaran: '2026/2027',
  semester: 'Ganjil'
};

export default function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [formData, setFormData] = useState<RPPFormData>(() => {
    const saved = localStorage.getItem('rpp_draft_form');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_FORM_DATA;
      }
    }
    return INITIAL_FORM_DATA;
  });

  const [currentRpp, setCurrentRpp] = useState<RPPContent | null>(() => {
    return generateTemplateRPP(formData);
  });
  const [savedRpps, setSavedRpps] = useState<RPPContent[]>(() => {
    const saved = localStorage.getItem('rpp_history_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Auto-save form draft to localStorage
  useEffect(() => {
    localStorage.setItem('rpp_draft_form', JSON.stringify(formData));
  }, [formData]);

  // Auto-save history list to localStorage
  useEffect(() => {
    localStorage.setItem('rpp_history_list', JSON.stringify(savedRpps));
  }, [savedRpps]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // 1. Generate Standard Template RPP (Instant)
  const handleGenerateStandard = () => {
    if (!formData.namaSekolah.trim()) {
      alert('Mohon isi Nama Sekolah terlebih dahulu.');
      return;
    }
    if (!formData.mataPelajaran) {
      alert('Mohon pilih Mata Pelajaran.');
      return;
    }
    if (!formData.materiPokok.trim()) {
      alert('Mohon isi Materi Pokok.');
      return;
    }

    const generated = generateTemplateRPP(formData);
    setCurrentRpp(generated);
    showToast('Berhasil membuat RPP Format Resmi!');
  };

  const handleSaveToHistory = (rppToSave: RPPContent) => {
    // Avoid duplicate IDs
    const exists = savedRpps.some((item) => item.id === rppToSave.id);
    if (exists) {
      showToast('RPP ini sudah tersimpan di riwayat.');
      return;
    }
    setSavedRpps([rppToSave, ...savedRpps]);
    showToast('RPP berhasil disimpan ke Riwayat!');
  };

  const handleDeleteFromHistory = (id: string) => {
    setSavedRpps(savedRpps.filter((r) => r.id !== id));
    showToast('RPP dihapus dari riwayat.');
  };

  const handleClearAllHistory = () => {
    if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat RPP tersimpan?')) {
      setSavedRpps([]);
      showToast('Seluruh riwayat RPP telah dibersihkan.');
    }
  };

  const handleLoadSample = () => {
    setFormData(INITIAL_FORM_DATA);
    const sampleRpp = generateTemplateRPP(INITIAL_FORM_DATA);
    setCurrentRpp(sampleRpp);
    showToast('Memuat contoh sampel data RPP IPAS Kelas 4.');
  };

  if (showWelcome) {
    return <WelcomeScreen onEnterApp={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Header Bar */}
      <Header
        historyCount={savedRpps.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onLoadExample={handleLoadSample}
        onGoWelcome={() => setShowWelcome(true)}
      />

      {/* Toast Notification Banner */}
      {notification && (
        <div className="no-print fixed bottom-5 right-5 z-50 bg-zinc-900 text-zinc-100 px-4 py-3 rounded-xl shadow-2xl border border-zinc-800 flex items-center gap-3 animate-slideUp">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold">{notification}</span>
        </div>
      )}

      {/* Main Container Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Side: Input Form (5 cols on lg) */}
          <section className="no-print lg:col-span-5">
            <FormPanel
              formData={formData}
              onChange={setFormData}
              onSubmitStandard={handleGenerateStandard}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          </section>

          {/* Right Side: RPP Result Card (7 cols on lg) */}
          <section className="lg:col-span-7">
            <RPPPreview
              rpp={currentRpp}
              onSaveHistory={handleSaveToHistory}
              onUpdateRpp={setCurrentRpp}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          </section>

        </div>
      </main>

      {/* Interactive Quiz Modal (LOTS, MOTS & HOTS) */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        subject={formData.mataPelajaran === 'Mata Pelajaran Lainnya (Ketik Manual)' ? formData.customMataPelajaran || 'Mata Pelajaran' : formData.mataPelajaran}
        faseKelas={formData.faseKelas}
        materiPokok={formData.materiPokok}
        diagnosticCondition={formData.kondisiDiagnostikSiswa}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedRpps={savedRpps}
        onSelectRpp={(rpp) => setCurrentRpp(rpp)}
        onDeleteRpp={handleDeleteFromHistory}
        onClearAll={handleClearAllHistory}
      />

      {/* Footer */}
      <footer className="no-print bg-zinc-900/60 text-zinc-400 py-6 text-center text-xs border-t border-zinc-800/80 mt-12 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Generator RPP Kurikulum Merdeka • Sesuai Standar BSKAP & Kemendikbudristek</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Berkesadaran</span>
            <span>•</span>
            <span>Bermakna</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Menggembirakan</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
