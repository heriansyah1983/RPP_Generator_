import React, { useState } from 'react';
import { RPPContent } from '../types';
import {
  History,
  X,
  Search,
  Trash2,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  Calendar,
  School,
  BookOpen
} from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedRpps: RPPContent[];
  onSelectRpp: (rpp: RPPContent) => void;
  onDeleteRpp: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedRpps,
  onSelectRpp,
  onDeleteRpp,
  onClearAll
}) => {
  const [search, setSearch] = useState<string>('');

  if (!isOpen) return null;

  const filtered = savedRpps.filter((rpp) => {
    const q = search.toLowerCase();
    return (
      rpp.informasiUmum.mapel.toLowerCase().includes(q) ||
      rpp.informasiUmum.sekolah.toLowerCase().includes(q) ||
      rpp.informasiUmum.materi.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/80 backdrop-blur-md flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-zinc-900 text-zinc-100 h-full shadow-2xl flex flex-col border-l border-zinc-800">
        
        {/* Drawer Header */}
        <div className="bg-zinc-900 text-zinc-100 p-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-zinc-100">Riwayat RPP Tersimpan</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3.5 bg-zinc-950/60 border-b border-zinc-800">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari mapel, sekolah, atau materi..."
              className="w-full pl-9 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* RPP List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              <FileSpreadsheet className="w-10 h-10 mx-auto mb-2 opacity-30 text-zinc-400" />
              <p className="text-zinc-400 font-medium">Belum ada RPP tersimpan.</p>
              <p className="text-[11px] mt-1 text-zinc-500">
                Gunakan tombol "Simpan" di atas preview RPP untuk menyimpan.
              </p>
            </div>
          ) : (
            filtered.map((rpp) => (
              <div
                key={rpp.id}
                className="p-3.5 bg-zinc-800/60 rounded-xl border border-zinc-700/80 hover:border-emerald-500/60 shadow-md transition group relative"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-bold text-sm text-zinc-100 group-hover:text-emerald-400 transition line-clamp-1">
                    {rpp.informasiUmum.mapel}
                  </span>
                  {rpp.isAiGenerated && (
                    <span className="shrink-0 text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> AI
                    </span>
                  )}
                </div>

                <div className="text-xs text-zinc-400 space-y-1 mb-3">
                  <p className="flex items-center gap-1">
                    <School className="w-3 h-3 text-zinc-500 shrink-0" />
                    <span className="truncate">{rpp.informasiUmum.sekolah}</span>
                  </p>
                  <p className="flex items-center gap-1 font-medium text-emerald-400">
                    <BookOpen className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="truncate">{rpp.informasiUmum.materi}</span>
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <Calendar className="w-3 h-3 text-zinc-500 shrink-0" />
                    <span>{rpp.createdAt}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-700/60">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectRpp(rpp);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                  >
                    <span>Buka RPP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteRpp(rpp.id)}
                    className="p-1 rounded text-zinc-400 hover:text-rose-400 hover:bg-rose-950/40 transition cursor-pointer"
                    title="Hapus RPP"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedRpps.length > 0 && (
          <div className="p-3.5 bg-zinc-950/60 border-t border-zinc-800 flex justify-between items-center">
            <span className="text-xs text-zinc-400">
              Total: {savedRpps.length} RPP
            </span>
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 hover:underline cursor-pointer"
            >
              Hapus Semua
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
