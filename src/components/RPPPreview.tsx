import React, { useState } from 'react';
import { RPPContent } from '../types';
import { exportToPdf, exportToDoc, copyRPPAsText } from '../lib/pdfExporter';
import {
  Download,
  Printer,
  Copy,
  Check,
  Edit3,
  BookmarkPlus,
  Sparkles,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

interface RPPPreviewProps {
  rpp: RPPContent | null;
  onSaveHistory: (rpp: RPPContent) => void;
  onUpdateRpp?: (updatedRpp: RPPContent) => void;
  onOpenQuiz?: () => void;
}

export const RPPPreview: React.FC<RPPPreviewProps> = ({
  rpp,
  onSaveHistory,
  onUpdateRpp,
  onOpenQuiz
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedRpp, setEditedRpp] = useState<RPPContent | null>(rpp);

  // Sync editedRpp when prop rpp changes
  React.useEffect(() => {
    setEditedRpp(rpp);
    setIsEditing(false);
  }, [rpp]);

  if (!rpp || !editedRpp) {
    return (
      <div className="bg-zinc-900/30 rounded-2xl border-2 border-dashed border-zinc-800 p-8 text-center flex flex-col items-center justify-center min-h-[520px] shadow-sm backdrop-blur-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-800/60 shadow-lg shadow-emerald-950/40">
          <FileSpreadsheet className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-zinc-100 mb-1">
          Hasil RPP Kurikulum Merdeka
        </h3>
        <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
          Sisi sebelah kanan ini akan secara otomatis menampilkan Dokumen RPP resmi lengkap setelah Anda mengisi formulir di sebelah kiri dan menekan tombol <strong className="text-emerald-400 font-semibold">'BUAT RPP SEKARANG'</strong>.
        </p>
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>Format sesuai standar SKL, Standar Isi & Modul Ajar BSKAP</span>
        </div>
      </div>
    );
  }

  const handleCopyText = () => {
    const text = copyRPPAsText(editedRpp);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      const filename = `RPP_${editedRpp.informasiUmum.mapel.replace(/[^a-zA-Z0-9]/g, '_')}_${editedRpp.informasiUmum.sekolah.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      await exportToPdf('rpp-document-content', filename);
    } catch (err) {
      console.error('Failed to download PDF:', err);
      alert('Gagal mendownload PDF. Anda dapat menggunakan tombol Cetak / Print atau Download DOC sebagai alternatif.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadDoc = () => {
    try {
      const filename = `RPP_${editedRpp.informasiUmum.mapel.replace(/[^a-zA-Z0-9]/g, '_')}_${editedRpp.informasiUmum.sekolah.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
      exportToDoc(editedRpp, filename);
    } catch (err) {
      console.error('Failed to export DOC:', err);
      alert('Gagal mengekspor dokumen Word (.doc).');
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Action Toolbar (Hidden during print) */}
      <div className="no-print bg-zinc-900/90 text-zinc-100 rounded-2xl p-4 shadow-lg border border-zinc-800 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-200">
            DOKUMEN MODUL RPP
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Edit Mode */}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              isEditing
                ? 'bg-amber-400 text-zinc-950 font-bold'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Selesai Edit' : 'Edit Teks'}</span>
          </button>

          {/* Copy Text */}
          <button
            type="button"
            onClick={handleCopyText}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
          </button>

          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Print</span>
          </button>

          {/* Download Word / DOC */}
          <button
            type="button"
            onClick={handleDownloadDoc}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-950/40"
            title="Download Dokumen Microsoft Word (.doc)"
          >
            <FileText className="w-3.5 h-3.5 text-blue-100" />
            <span>Download DOC</span>
          </button>

          {/* Download PDF */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/40 disabled:opacity-50"
          >
            {isExportingPdf ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>Download PDF</span>
          </button>

          {/* Interactive Quiz Shortcut */}
          {onOpenQuiz && (
            <button
              type="button"
              onClick={onOpenQuiz}
              className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-950/40"
              title="Buka Kuis Interaktif Uji Pemahaman Siswa (LOTS, MOTS & HOTS)"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kuis LOTS/HOTS</span>
            </button>
          )}

          {/* Save to History */}
          <button
            type="button"
            onClick={() => onSaveHistory(editedRpp)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border border-zinc-700 transition flex items-center gap-1 cursor-pointer"
            title="Simpan ke Riwayat RPP"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simpan</span>
          </button>
        </div>
      </div>

      {/* Official Printable RPP Document */}
      <div
        id="rpp-document-content"
        className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-10 text-slate-900 leading-relaxed font-sans print-container"
      >
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-slate-900">
            PERENCANAAN PEMBELAJARAN / RPP
          </h2>
          <h3 className="text-base sm:text-lg font-bold text-slate-700 mt-1 uppercase">
            KURIKULUM MERDEKA
          </h3>
          <p className="text-xs text-slate-500 italic mt-1">
            {editedRpp.informasiUmum.sekolah} • Dibuat pada: {editedRpp.createdAt}
          </p>
        </div>

        {/* Section I: Informasi Umum */}
        <div className="mb-6">
          <div className="bg-slate-100 px-3 py-1.5 rounded-lg font-bold text-slate-900 text-sm uppercase tracking-wide border-l-4 border-emerald-600 mb-3">
            I. INFORMASI UMUM
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div className="flex">
              <span className="font-semibold w-36 shrink-0">● Sekolah</span>
              <span className="mr-2">:</span>
              <span className="text-slate-800">{editedRpp.informasiUmum.sekolah}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-36 shrink-0">● Mapel</span>
              <span className="mr-2">:</span>
              <span className="text-slate-800 font-medium">{editedRpp.informasiUmum.mapel}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-36 shrink-0">● Fase / Kelas</span>
              <span className="mr-2">:</span>
              <span className="text-slate-800">{editedRpp.informasiUmum.faseKelas}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-36 shrink-0">● Materi</span>
              <span className="mr-2">:</span>
              <span className="text-slate-800 font-bold text-emerald-900">{editedRpp.informasiUmum.materi}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-36 shrink-0">● Alokasi Waktu</span>
              <span className="mr-2">:</span>
              <span className="text-slate-800">{editedRpp.informasiUmum.alokasiWaktu}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-36 shrink-0">● Model Pembelajaran</span>
              <span className="mr-2">:</span>
              <span className="text-slate-800">{editedRpp.informasiUmum.modelPembelajaran}</span>
            </div>
            <div className="flex col-span-1 md:col-span-2">
              <span className="font-semibold w-36 shrink-0">● Profil Pancasila</span>
              <span className="mr-2">:</span>
              <span className="text-slate-800">{editedRpp.informasiUmum.profilPancasila.join(', ')}</span>
            </div>
            <div className="flex col-span-1 md:col-span-2">
              <span className="font-semibold w-36 shrink-0">● Sarana & Prasarana</span>
              <span className="mr-2">:</span>
              <span className="text-slate-800">{editedRpp.informasiUmum.saranaPrasarana}</span>
            </div>
            {editedRpp.informasiUmum.kondisiDiagnostikSiswa && (
              <div className="flex col-span-1 md:col-span-2">
                <span className="font-semibold w-36 shrink-0">● Kondisi Siswa</span>
                <span className="mr-2">:</span>
                <span className="text-emerald-800 font-medium">{editedRpp.informasiUmum.kondisiDiagnostikSiswa}</span>
              </div>
            )}
            <div className="flex col-span-1 md:col-span-2">
              <span className="font-semibold w-36 shrink-0">● Tanggal RPP</span>
              <span className="mr-2">:</span>
              <span className="text-slate-800 font-medium">{editedRpp.informasiUmum.tanggalPembuatan || editedRpp.formData?.tanggalPembuatan || '........................., ......................... 20...'}</span>
            </div>
          </div>
        </div>

        {/* Section II: Inti Perencanaan Pembelajaran */}
        <div className="mb-6">
          <div className="bg-slate-100 px-3 py-1.5 rounded-lg font-bold text-slate-900 text-sm uppercase tracking-wide border-l-4 border-emerald-600 mb-3">
            II. INTI PERENCANAAN PEMBELAJARAN
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <span className="text-emerald-600">●</span> Capaian Pembelajaran (CP)
              </div>
              <p className="pl-4 text-slate-700 bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/80">
                {editedRpp.intiPerencanaan.capaianPembelajaran}
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <span className="text-emerald-600">●</span> Cara Mencapai Tujuan (Strategi Pembelajaran)
              </div>
              <p className="pl-4 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                {editedRpp.intiPerencanaan.caraMencapaiTujuan}
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <span className="text-emerald-600">●</span> Cara Menilai Hasil Belajar
              </div>
              <p className="pl-4 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                {editedRpp.intiPerencanaan.caraMenilaiHasilBelajar}
              </p>
            </div>
          </div>
        </div>

        {/* Dokumen Perencanaan Pembelajaran */}
        <div className="mb-6">
          <div className="bg-slate-100 px-3 py-1.5 rounded-lg font-bold text-slate-900 text-sm uppercase tracking-wide border-l-4 border-emerald-600 mb-4 flex items-center justify-between">
            <span>DOKUMEN PERENCANAAN PEMBELAJARAN</span>
            <span className="text-amber-500 text-base">☆</span>
          </div>

          {/* 1. Tujuan Pembelajaran */}
          <div className="mb-5 pl-2">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <span className="bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">1</span>
              Tujuan Pembelajaran
            </h4>
            <ul className="list-disc pl-8 space-y-1.5 text-sm text-slate-700">
              {editedRpp.dokumenPerencanaan.tujuanPembelajaran.map((tp, idx) => (
                <li key={idx} className="leading-relaxed">
                  {tp}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 italic mt-2 pl-6">
              * Mengacu pada SKL dan Standar Isi serta memperhatikan karakteristik murid dan sumber daya sekolah.
            </p>
          </div>

          {/* 2. Langkah Pembelajaran */}
          <div className="mb-5 pl-2">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <span className="bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">2</span>
              Langkah Pembelajaran (Tahapan Pengalaman Belajar Murid)
            </h4>
            
            <div className="space-y-3 pl-4 text-sm">
              {/* Pendahuluan */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block mb-1 text-emerald-800">
                  A. Pendahuluan
                </span>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {editedRpp.dokumenPerencanaan.langkahPembelajaran.pendahuluan.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>

              {/* Kegiatan Inti */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block mb-1 text-emerald-800">
                  B. Kegiatan Inti (Model: {editedRpp.informasiUmum.modelPembelajaran})
                </span>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  {editedRpp.dokumenPerencanaan.langkahPembelajaran.kegiatanInti.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>

              {/* Penutup */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block mb-1 text-emerald-800">
                  C. Penutup & Refleksi
                </span>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {editedRpp.dokumenPerencanaan.langkahPembelajaran.penutup.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs text-slate-500 italic mt-2 pl-6">
              * Dirancang secara berkesadaran, bermakna, dan menggembirakan.
            </p>
          </div>

          {/* 3. Penilaian / Asesmen */}
          <div className="mb-5 pl-2">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <span className="bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
              Penilaian / Asesmen
            </h4>

            <div className="space-y-2 pl-4 text-sm text-slate-700">
              <p>● <strong className="font-semibold text-slate-900">Asesmen Diagnostik:</strong> {editedRpp.dokumenPerencanaan.penilaianAsesmen.diagnostik}</p>
              <p>● <strong className="font-semibold text-slate-900">Asesmen Formatif:</strong> {editedRpp.dokumenPerencanaan.penilaianAsesmen.formatif}</p>
              <p>● <strong className="font-semibold text-slate-900">Asesmen Sumatif:</strong> {editedRpp.dokumenPerencanaan.penilaianAsesmen.sumatif}</p>
              
              {editedRpp.dokumenPerencanaan.penilaianAsesmen.instrumen.length > 0 && (
                <div className="mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-semibold text-xs text-slate-800 block mb-1">Teknik & Instrumen Penilaian:</span>
                  <div className="flex flex-wrap gap-2">
                    {editedRpp.dokumenPerencanaan.penilaianAsesmen.instrumen.map((ins, i) => (
                      <span key={i} className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded border border-slate-300 text-xs font-medium text-slate-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {ins}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 italic mt-2 pl-6">
              * Menggunakan beragam teknik dan instrumen sesuai tujuan pembelajaran dan mengacu pada standar penilaian pendidikan.
            </p>
          </div>

        </div>

        {/* Prinsip Utama Perencanaan */}
        <div className="mb-8 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-900 text-sm uppercase mb-2 text-emerald-900">
            PRINSIP UTAMA PERENCANAAN
          </h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
            <li>● <strong>Berkesadaran:</strong> {editedRpp.prinsipUtama.berkesadaran}</li>
            <li>● <strong>Bermakna:</strong> {editedRpp.prinsipUtama.bermakna}</li>
            <li>● <strong>Menggembirakan:</strong> {editedRpp.prinsipUtama.menggembirakan}</li>
          </ul>
        </div>

        {/* Signatures Block */}
        <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-sm page-break-inside-avoid">
          <div>
            <p className="text-slate-600">Mengetahui,</p>
            <p className="font-bold text-slate-800">Kepala Sekolah {editedRpp.informasiUmum.sekolah}</p>
            <div className="h-16"></div>
            <p className="font-bold underline text-slate-900">{editedRpp.informasiUmum.kepalaSekolah}</p>
            <p className="text-xs text-slate-600 mt-0.5">
              NIP. {editedRpp.informasiUmum.nipKepalaSekolah || editedRpp.formData?.nipKepalaSekolah || '........................................'}
            </p>
          </div>

          <div>
            <p className="text-slate-600">{editedRpp.informasiUmum.tanggalPembuatan || editedRpp.formData?.tanggalPembuatan || '........................., ......................... 20...'}</p>
            <p className="font-bold text-slate-800">Guru Mata Pelajaran</p>
            <div className="h-16"></div>
            <p className="font-bold underline text-slate-900">{editedRpp.informasiUmum.guru}</p>
            <p className="text-xs text-slate-600 mt-0.5">
              NIP. {editedRpp.informasiUmum.nipGuru || editedRpp.formData?.nipGuru || '........................................'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
