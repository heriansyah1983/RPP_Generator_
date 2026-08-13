import React from 'react';
import { BookOpen, History, ShieldCheck, FileSpreadsheet, Home } from 'lucide-react';

interface HeaderProps {
  historyCount: number;
  onOpenHistory: () => void;
  onLoadExample: () => void;
  onGoWelcome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  historyCount,
  onOpenHistory,
  onLoadExample,
  onGoWelcome
}) => {
  return (
    <header className="no-print bg-zinc-900/50 backdrop-blur-md text-zinc-100 border-b border-zinc-800 sticky top-0 z-30 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onGoWelcome}
              className="w-10 h-10 bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 shrink-0 transition cursor-pointer"
              title="Kembali ke Halaman Pembuka"
            >
              <BookOpen className="w-6 h-6 text-white" />
            </button>
            <div className="cursor-pointer" onClick={onGoWelcome}>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-zinc-100 hover:text-emerald-400 transition">
                  Generator RPP
                </h1>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Standar BSKAP
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Kurikulum Merdeka Edition • Penyusun Modul Ajar Siap Cetak
              </p>
            </div>
          </div>

          {/* History Button Mobile */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="md:hidden relative p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition"
            title="Riwayat Tersimpan"
          >
            <History className="w-5 h-5 text-zinc-300" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-zinc-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
          {onGoWelcome && (
            <button
              type="button"
              onClick={onGoWelcome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border border-zinc-700 transition cursor-pointer"
              title="Lihat Halaman Pembuka & Pengembang"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Info & Pengembang</span>
            </button>
          )}

          <button
            type="button"
            onClick={onLoadExample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
            Isi Contoh Sampel
          </button>

          <button
            type="button"
            onClick={onOpenHistory}
            className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            <History className="w-4 h-4 text-emerald-400" />
            <span>Riwayat RPP</span>
            {historyCount > 0 && (
              <span className="bg-emerald-500 text-zinc-950 text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                {historyCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
