import React, { useState, useEffect } from 'react';
import { QuizSet, QuizQuestion, generateQuizSet } from '../data/quizGenerator';
import {
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RefreshCw,
  Printer,
  FileText,
  Brain,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Layers,
  Zap,
  Target,
  Trophy
} from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  faseKelas: string;
  materiPokok: string;
  diagnosticCondition?: string;
}

// Simple Web Audio API sound effect player (no external files needed)
const playSoundEffect = (type: 'correct' | 'incorrect' | 'finish') => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'correct') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'incorrect') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc.frequency.exponentialRampToValueAtTime(164.81, ctx.currentTime + 0.25); // E3
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'finish') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
      });
    }
  } catch (e) {
    // Audio Context fallback if blocked
  }
};

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  subject,
  faseKelas,
  materiPokok,
  diagnosticCondition
}) => {
  const [quizSet, setQuizSet] = useState<QuizSet | null>(null);
  const [viewMode, setViewMode] = useState<'player' | 'sheet'>('player');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [questionId: string]: boolean }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showSheetKey, setShowSheetKey] = useState<boolean>(true);

  // Generate quiz set whenever props change or modal opens
  useEffect(() => {
    if (isOpen) {
      handleRegenerateQuiz();
    }
  }, [isOpen, subject, faseKelas, materiPokok]);

  const handleRegenerateQuiz = () => {
    const generated = generateQuizSet(subject, faseKelas, materiPokok, diagnosticCondition);
    setQuizSet(generated);
    setCurrentIndex(0);
    setUserAnswers({});
    setShowExplanation({});
    setIsCompleted(false);
  };

  if (!isOpen || !quizSet) return null;

  const currentQ = quizSet.questions[currentIndex];
  const totalQuestions = quizSet.questions.length;

  const handleSelectOption = (optIndex: number) => {
    if (userAnswers[currentQ.id] !== undefined) return; // Already answered

    const isCorrect = optIndex === currentQ.correctIndex;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: optIndex }));
    setShowExplanation((prev) => ({ ...prev, [currentQ.id]: true }));

    if (isCorrect) {
      playSoundEffect('correct');
    } else {
      playSoundEffect('incorrect');
    }

    // Check if all answered
    const nextAnswersCount = Object.keys(userAnswers).length + 1;
    if (nextAnswersCount >= totalQuestions) {
      setTimeout(() => {
        setIsCompleted(true);
        playSoundEffect('finish');
      }, 1200);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let lotsTotal = 0, lotsCorrect = 0;
    let motsTotal = 0, motsCorrect = 0;
    let hotsTotal = 0, hotsCorrect = 0;

    quizSet.questions.forEach((q) => {
      const selected = userAnswers[q.id];
      const isRight = selected === q.correctIndex;

      if (q.level === 'LOTS') {
        lotsTotal++;
        if (isRight) lotsCorrect++;
      } else if (q.level === 'MOTS') {
        motsTotal++;
        if (isRight) motsCorrect++;
      } else if (q.level === 'HOTS') {
        hotsTotal++;
        if (isRight) hotsCorrect++;
      }

      if (isRight) correct++;
    });

    const percent = Math.round((correct / totalQuestions) * 100);
    return {
      totalQuestions,
      correct,
      percent,
      lotsTotal, lotsCorrect,
      motsTotal, motsCorrect,
      hotsTotal, hotsCorrect
    };
  };

  const scores = calculateScore();

  // Export Quiz Sheet to Word (.doc)
  const handleExportWord = () => {
    let content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Kuis Interaktif - ${quizSet.materiPokok}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; margin: 20px; line-height: 1.5; color: #111; }
          h2 { text-align: center; margin-bottom: 5px; color: #065f46; }
          p.sub { text-align: center; font-size: 10pt; color: #444; margin-top: 0; }
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .meta-table td { padding: 4px 8px; font-size: 10pt; border-bottom: 1px solid #ddd; }
          .q-card { margin-bottom: 18px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; }
          .q-title { font-weight: bold; margin-bottom: 8px; font-size: 11pt; }
          .badge { display: inline-block; padding: 2px 6px; font-size: 9pt; font-weight: bold; border-radius: 4px; color: #fff; }
          .badge-lots { background-color: #10b981; }
          .badge-mots { background-color: #f59e0b; }
          .badge-hots { background-color: #ef4444; }
          .options { margin-left: 20px; margin-top: 6px; }
          .options p { margin: 3px 0; }
          .key-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 8px; margin-top: 8px; font-size: 9.5pt; color: #166534; }
        </style>
      </head>
      <body>
        <h2>LEMNA ASESMEN & KUIS INTERAKTIF SISWA</h2>
        <p class="sub">Tingkat LOTS, MOTS, dan HOTS • Kurikulum Merdeka</p>
        <hr/>
        <table class="meta-table">
          <tr><td><b>Mata Pelajaran:</b> ${quizSet.subject}</td><td><b>Fase / Kelas:</b> ${quizSet.faseKelas}</td></tr>
          <tr><td><b>Materi Pokok:</b> ${quizSet.materiPokok}</td><td><b>Tanggal:</b> ${new Date().toLocaleDateString('id-ID')}</td></tr>
        </table>

        <h3>Daftar Soal Diagnostik & Formatif</h3>
    `;

    quizSet.questions.forEach((q, idx) => {
      const badgeClass = q.level === 'LOTS' ? 'badge-lots' : q.level === 'MOTS' ? 'badge-mots' : 'badge-hots';
      content += `
        <div class="q-card">
          <div class="q-title">
            <span class="badge ${badgeClass}">${q.level}</span> Soal ${idx + 1} (${q.bloomLevel})
          </div>
          <p style="margin-top: 6px;"><b>${q.question}</b></p>
          <div class="options">
            <p>A. ${q.options[0]}</p>
            <p>B. ${q.options[1]}</p>
            <p>C. ${q.options[2]}</p>
            <p>D. ${q.options[3]}</p>
          </div>
          ${showSheetKey ? `
            <div class="key-box">
              <p style="margin:0; font-weight:bold;">Kunci Jawaban: ${['A', 'B', 'C', 'D'][q.correctIndex]}</p>
              <p style="margin:3px 0 0 0;"><b>Pembahasan:</b> ${q.explanation}</p>
            </div>
          ` : ''}
        </div>
      `;
    });

    content += `
        <br/><br/>
        <table style="width:100%; text-align:center; margin-top:30px;">
          <tr>
            <td style="width:50%;">Mengetahui,<br/>Kepala Sekolah<br/><br/><br/><br/><b><u>_______________________</u></b></td>
            <td style="width:50%;">................, ................ 20...<br/>Guru Mata Pelajaran<br/><br/><br/><br/><b><u>_______________________</u></b></td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kuis_LOTS_MOTS_HOTS_${quizSet.materiPokok.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    window.print();
  };

  const getLevelBadge = (level: 'LOTS' | 'MOTS' | 'HOTS') => {
    switch (level) {
      case 'LOTS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <Zap className="w-3 h-3" /> LOTS (C1/C2)
          </span>
        );
      case 'MOTS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Target className="w-3 h-3" /> MOTS (C3/C4)
          </span>
        );
      case 'HOTS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
            <Brain className="w-3 h-3" /> HOTS (C5/C6)
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header Modal Bar */}
        <div className="p-4 sm:p-5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-slate-950 shadow-md shrink-0">
              <Sparkles className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  Uji Pemahaman Siswa
                </h3>
                <span className="hidden sm:inline-flex px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-extrabold uppercase border border-amber-500/30 rounded-md">
                  LOTS • MOTS • HOTS
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 truncate max-w-md">
                {quizSet.subject} • {quizSet.faseKelas} • <strong className="text-emerald-400">{quizSet.materiPokok}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerateQuiz}
              title="Acak / Buat Soal Baru"
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">Acak Soal</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Player vs Teacher Sheet) */}
        <div className="bg-zinc-950/80 px-4 py-2 border-b border-zinc-800/80 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setViewMode('player')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'player'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Kuis Interaktif (Siswa)</span>
            </button>
            <button
              onClick={() => setViewMode('sheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'sheet'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lembar Soal & Kunci (Guru)</span>
            </button>
          </div>

          {viewMode === 'sheet' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSheetKey(!showSheetKey)}
                className="text-xs px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-medium transition cursor-pointer"
              >
                {showSheetKey ? 'Sembunyikan Kunci' : 'Tampilkan Kunci'}
              </button>
              <button
                onClick={handleExportWord}
                className="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Word (.doc)</span>
              </button>
              <button
                onClick={handlePrint}
                className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / PDF</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {viewMode === 'player' ? (
            isCompleted ? (
              /* =====================================
                 COMPLETE SCORE SUMMARY VIEW
                 ===================================== */
              <div className="text-center py-6 px-2 space-y-6 animate-fadeIn">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20 border-2 border-amber-300/40">
                  <Trophy className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-white">
                    {scores.percent >= 80 ? '🎉 Luar Biasa! Pemahaman Sangat Baik' : scores.percent >= 60 ? '🌟 Bagus! Pemahaman Cukup Mantap' : '📚 Perlu Latihan Lebih Lanjut'}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    Kamu telah menyelesaikan seluruh kuis uji pemahaman <strong className="text-amber-400">{quizSet.materiPokok}</strong>.
                  </p>
                </div>

                {/* Score Circle Banner */}
                <div className="max-w-md mx-auto bg-zinc-950/80 border border-zinc-800 p-6 rounded-2xl shadow-inner flex items-center justify-around gap-4">
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400">{scores.correct} / {scores.totalQuestions}</span>
                    <p className="text-xs font-semibold text-zinc-400 mt-1">Jawaban Benar</p>
                  </div>
                  <div className="h-12 w-px bg-zinc-800" />
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400">{scores.percent}%</span>
                    <p className="text-xs font-semibold text-zinc-400 mt-1">Skor Pemahaman</p>
                  </div>
                </div>

                {/* Cognitive Stats Breakdown */}
                <div className="max-w-lg mx-auto grid grid-cols-3 gap-3 text-left">
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl">
                    <div className="text-[11px] font-bold text-emerald-400 uppercase">🟢 LOTS</div>
                    <div className="text-lg font-extrabold text-white mt-0.5">{scores.lotsCorrect} / {scores.lotsTotal}</div>
                    <p className="text-[10px] text-zinc-400">Dasar Ingat & Paham</p>
                  </div>
                  <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl">
                    <div className="text-[11px] font-bold text-amber-400 uppercase">🟡 MOTS</div>
                    <div className="text-lg font-extrabold text-white mt-0.5">{scores.motsCorrect} / {scores.motsTotal}</div>
                    <p className="text-[10px] text-zinc-400">Penerapan & Analisis</p>
                  </div>
                  <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl">
                    <div className="text-[11px] font-bold text-rose-400 uppercase">🔴 HOTS</div>
                    <div className="text-lg font-extrabold text-white mt-0.5">{scores.hotsCorrect} / {scores.hotsTotal}</div>
                    <p className="text-[10px] text-zinc-400">Evaluasi & Solusi Kritis</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsCompleted(false);
                      setCurrentIndex(0);
                      setUserAnswers({});
                      setShowExplanation({});
                    }}
                    className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4 text-amber-400" />
                    <span>Ulang Kuis Ini</span>
                  </button>
                  <button
                    onClick={handleRegenerateQuiz}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Acak Set Soal Baru</span>
                  </button>
                  <button
                    onClick={() => setViewMode('sheet')}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Lihat Lembar Kunci & Cetak</span>
                  </button>
                </div>
              </div>
            ) : (
              /* =====================================
                 ACTIVE INTERACTIVE QUIZ QUESTION VIEW
                 ===================================== */
              <div className="space-y-6 max-w-3xl mx-auto">
                
                {/* Top Progress & Cognitive Badge Bar */}
                <div className="flex items-center justify-between gap-3 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-2">
                    {getLevelBadge(currentQ.level)}
                    <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
                      • {currentQ.bloomLevel}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-amber-400">
                    Soal {currentIndex + 1} <span className="text-zinc-500">/ {totalQuestions}</span>
                  </div>
                </div>

                {/* Progress Bar Line */}
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>

                {/* Question Navigator Grid (1..20) */}
                <div className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Navigasi Soal (1 - {totalQuestions}):</span>
                    <span className="text-[11px] text-zinc-500">
                      Terjawab: {Object.keys(userAnswers).length} / {totalQuestions}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {quizSet.questions.map((q, qIdx) => {
                      const isAnswered = userAnswers[q.id] !== undefined;
                      const isRight = userAnswers[q.id] === q.correctIndex;
                      const isCurrent = qIdx === currentIndex;

                      let numStyle = "bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800";
                      if (isAnswered) {
                        if (isRight) {
                          numStyle = "bg-emerald-950 text-emerald-400 border-emerald-700 font-bold";
                        } else {
                          numStyle = "bg-rose-950 text-rose-400 border-rose-700 font-bold";
                        }
                      }

                      if (isCurrent) {
                        numStyle += " ring-2 ring-amber-400 border-amber-400 text-white font-black scale-105 z-10 shadow-lg";
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentIndex(qIdx)}
                          title={`Soal #${qIdx + 1} (${q.level})`}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs border transition flex items-center justify-center cursor-pointer ${numStyle}`}
                        >
                          {qIdx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question Text Box */}
                <div className="bg-zinc-950/90 border border-zinc-800 p-5 sm:p-6 rounded-2xl shadow-lg">
                  <h4 className="text-base sm:text-lg font-bold text-zinc-100 leading-relaxed">
                    {currentQ.question}
                  </h4>
                </div>

                {/* Options Grid (A, B, C, D) */}
                <div className="grid grid-cols-1 gap-3">
                  {currentQ.options.map((option, optIdx) => {
                    const answered = userAnswers[currentQ.id] !== undefined;
                    const isSelected = userAnswers[currentQ.id] === optIdx;
                    const isCorrectOption = optIdx === currentQ.correctIndex;

                    let btnStyle = "bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700";
                    
                    if (answered) {
                      if (isCorrectOption) {
                        btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md ring-1 ring-emerald-500/50";
                      } else if (isSelected && !isCorrectOption) {
                        btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                      } else {
                        btnStyle = "bg-zinc-900/40 border-zinc-800/60 text-zinc-500 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={answered}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-start gap-3.5 cursor-pointer ${btnStyle}`}
                      >
                        <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                          answered && isCorrectOption
                            ? 'bg-emerald-500 text-slate-950'
                            : answered && isSelected && !isCorrectOption
                            ? 'bg-rose-500 text-white'
                            : 'bg-zinc-800 text-zinc-300'
                        }`}>
                          {['A', 'B', 'C', 'D'][optIdx]}
                        </span>
                        <span className="flex-1 pt-0.5 leading-relaxed">{option}</span>
                        {answered && isCorrectOption && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {answered && isSelected && !isCorrectOption && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Answer Feedback & Explanation Box */}
                {showExplanation[currentQ.id] && (
                  <div className={`p-4 sm:p-5 rounded-2xl border animate-slideUp ${
                    userAnswers[currentQ.id] === currentQ.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-800 text-rose-200'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-sm mb-1">
                      {userAnswers[currentQ.id] === currentQ.correctIndex ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span>Jawaban Kamu Benar! 🎉</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-400" />
                          <span>Jawaban Kurang Tepat (Kunci: {['A', 'B', 'C', 'D'][currentQ.correctIndex]})</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/80">
                      <strong>Pembahasan ({currentQ.bloomLevel}):</strong> {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Footer Controls (Prev / Next) */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                    className="px-4 py-2 bg-zinc-800 disabled:opacity-40 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>

                  {userAnswers[currentQ.id] !== undefined && (
                    <button
                      onClick={() => {
                        if (currentIndex < totalQuestions - 1) {
                          setCurrentIndex((prev) => prev + 1);
                        } else {
                          setIsCompleted(true);
                          playSoundEffect('finish');
                        }
                      }}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 shadow-md cursor-pointer animate-pulse"
                    >
                      <span>{currentIndex < totalQuestions - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            )
          ) : (
            /* =====================================
               TEACHER SHEET VIEW (Lembar Soal & Kunci)
               ===================================== */
            <div className="space-y-6 max-w-3xl mx-auto print:p-0">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-zinc-200">Lembar Asesmen & Kuis Diagnosis (LOTS - MOTS - HOTS)</h4>
                  <p className="text-zinc-400">Siap untuk dicetak atau diunduh ke Microsoft Word (.doc)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-lg font-bold">
                    Total: {totalQuestions} Soal
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {quizSet.questions.map((q, idx) => (
                  <div key={q.id} className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-amber-400 text-sm">Soal #{idx + 1}</span>
                        {getLevelBadge(q.level)}
                      </div>
                      <span className="text-xs text-zinc-400">{q.bloomLevel}</span>
                    </div>

                    <p className="text-sm font-semibold text-zinc-100 leading-relaxed">
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg border ${
                            showSheetKey && oIdx === q.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300 font-bold'
                              : 'bg-zinc-900/50 border-zinc-800/80'
                          }`}
                        >
                          <span className="font-bold mr-1.5">{['A', 'B', 'C', 'D'][oIdx]}.</span>
                          {opt}
                        </div>
                      ))}
                    </div>

                    {showSheetKey && (
                      <div className="mt-3 p-3 bg-emerald-950/30 border border-emerald-800/50 rounded-xl text-xs text-emerald-300 space-y-1">
                        <div>
                          <strong>Kunci Jawaban:</strong> {['A', 'B', 'C', 'D'][q.correctIndex]}
                        </div>
                        <div>
                          <strong>Pembahasan:</strong> {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
