export interface QuizQuestion {
  id: string;
  level: 'LOTS' | 'MOTS' | 'HOTS';
  bloomLevel: string; // e.g. 'C1-Mengingat', 'C3-Menerapkan', 'C5-Mengevaluasi'
  question: string;
  options: [string, string, string, string]; // A, B, C, D
  correctIndex: number; // 0, 1, 2, or 3
  explanation: string;
}

export interface QuizSet {
  title: string;
  subject: string;
  faseKelas: string;
  materiPokok: string;
  diagnosticCondition?: string;
  questions: QuizQuestion[];
}

/**
 * Generates an interactive set of LOTS, MOTS, and HOTS quiz questions based on
 * Subject, Class/Phase, and Core Material.
 */
export function generateQuizSet(
  subject: string,
  faseKelas: string,
  materiPokok: string,
  diagnosticCondition?: string
): QuizSet {
  const cleanMateri = materiPokok.trim() || 'Materi Pembelajaran';
  const cleanSubject = subject || 'Mata Pelajaran';
  const cleanFase = faseKelas || 'Fase B: Kelas 4';

  // Extract core keywords
  const lowerMateri = cleanMateri.toLowerCase();

  const questions: QuizQuestion[] = [];

  // ==========================================
  // 1. SOAL LOTS (Lower Order Thinking Skills)
  // C1 (Mengingat) / C2 (Memahami)
  // ==========================================
  
  if (lowerMateri.includes('ekosistem') || lowerMateri.includes('makhluk hidup') || lowerMateri.includes('lingkungan')) {
    questions.push({
      id: 'lots-1',
      level: 'LOTS',
      bloomLevel: 'C1 - Mengingat (LOTS)',
      question: `Manakah dari pilihan berikut yang merupakan definisi paling tepat dari istilah "${cleanMateri}"?`,
      options: [
        `Hubungan timbal balik antara makhluk hidup dengan lingkungan biotik dan abiotiknya`,
        `Kumpulan hanya benda mati seperti air, tanah, dan udara di suatu wilayah`,
        `Kelompok hewan pemakan tumbuhan di area hutan`,
        `Proses pembuatan makanan sendiri oleh tumbuhan hijau`
      ],
      correctIndex: 0,
      explanation: `Soal ini menguji pemahaman tingkat LOTS (C1/C2) di mana siswa mengingat dan memahami pengertian dasar dari ${cleanMateri}.`
    });

    questions.push({
      id: 'lots-2',
      level: 'LOTS',
      bloomLevel: 'C2 - Memahami (LOTS)',
      question: `Di dalam ${cleanMateri}, komponen biotik mencakup seluruh unsur makhluk hidup. Manakah yang tergolong komponen biotik?`,
      options: [
        `Sinar matahari, kelembapan udara, dan batu`,
        `Tumbuhan, hewan, dan mikroorganisme produsen/pengurai`,
        `Derajat keasaman tanah dan suhu udara`,
        `Air sungai dan kandungan garam mineral`
      ],
      correctIndex: 1,
      explanation: `Komponen biotik adalah unsur bernyawa (hidup) seperti tumbuhan, hewan, dan pengurai.`
    });

    questions.push({
      id: 'lots-3',
      level: 'LOTS',
      bloomLevel: 'C2 - Mengidentifikasi (LOTS)',
      question: `Peran tumbuhan hijau sebagai pembuat makanan sendiri dalam ${cleanMateri} dinamakan sebagai...`,
      options: [
        `Konsumen Tingkat I`,
        `Dekomposer (Pengurai)`,
        `Produsen`,
        `Predator Utama`
      ],
      correctIndex: 2,
      explanation: `Tumbuhan hijau berperan sebagai produsen karena dapat melakukan fotosintesis untuk menghasilkan makanan sendiri.`
    });
  } else if (lowerMateri.includes('matematika') || lowerMateri.includes('bangun') || lowerMateri.includes('pecahan') || lowerMateri.includes('hitung')) {
    questions.push({
      id: 'lots-1',
      level: 'LOTS',
      bloomLevel: 'C1 - Mengingat (LOTS)',
      question: `Dalam konsep dasar ${cleanMateri}, apakah definisi atau rumus dasar yang harus dipahami terlebih dahulu?`,
      options: [
        `Langkah dan sifat matematika dasar yang konsisten pada ${cleanMateri}`,
        `Pengoperasian acak tanpa aturan yang pasti`,
        `Persamaan linier dua variabel tingkat tinggi`,
        `Penggunaan grafik fungsi kuadrat`
      ],
      correctIndex: 0,
      explanation: `Konsep LOTS berfokus pada daya ingat terhadap sifat, pola, dan definisi matematika dasar.`
    });

    questions.push({
      id: 'lots-2',
      level: 'LOTS',
      bloomLevel: 'C2 - Memahami (LOTS)',
      question: `Di antara pernyataan berikut, manakah yang merupakan fakta benar terkait ${cleanMateri}?`,
      options: [
        `Setiap perhitungan harus mengikuti urutan operasi matematika yang benar`,
        `Hasil penjumlahan bilangan positif selalu bernilai negatif`,
        `Nilai penyebut pada pecahan boleh bernilai nol`,
        `Luas dan keliling memiliki satuan yang selalu sama`
      ],
      correctIndex: 0,
      explanation: `Siswa memahami aturan dasar tata cara dan urutan operasi dalam matematika.`
    });
  } else {
    // General subject LOTS
    questions.push({
      id: 'lots-1',
      level: 'LOTS',
      bloomLevel: 'C1 - Mengingat (LOTS)',
      question: `Apa tujuan utama atau pemahaman mendasar yang menjadi inti dari topik "${cleanMateri}" pada ${cleanSubject}?`,
      options: [
        `Memahami konsep dasar, istilah penting, dan prinsip utama materi ${cleanMateri}`,
        `Menghafalkan angka acak tanpa makna pembelajaran`,
        `Membuat teori baru yang bertentangan dengan materi`,
        `Mengabaikan fakta dan prinsip dasar yang berlaku`
      ],
      correctIndex: 0,
      explanation: `Tingkat LOTS (C1-C2) mengukur kemampuan siswa dalam mengenali dan menjelaskan istilah serta prinsip dasar.`
    });

    questions.push({
      id: 'lots-2',
      level: 'LOTS',
      bloomLevel: 'C2 - Memahami (LOTS)',
      question: `Ciri utama yang menandai keberhasilan pemahaman tingkat dasar pada ${cleanMateri} adalah siswa mampu...`,
      options: [
        `Mengidentifikasi dan menyebutkan kembali contoh konkret dari ${cleanMateri}`,
        `Menilai kelemahan undang-undang internasional`,
        `Merancang eksperimen laboratorium tingkat lanjut`,
        `Menulis karya ilmiah 50 halaman secara mandiri`
      ],
      correctIndex: 0,
      explanation: `Mampu menyebutkan contoh konkret menunjukkan tingkat pemahaman konsep dasar (C2).`
    });
  }

  // ==========================================
  // 2. SOAL MOTS (Middle Order Thinking Skills)
  // C3 (Menerapkan) / C4 (Menganalisis)
  // ==========================================

  if (lowerMateri.includes('ekosistem') || lowerMateri.includes('makhluk hidup') || lowerMateri.includes('lingkungan')) {
    questions.push({
      id: 'mots-1',
      level: 'MOTS',
      bloomLevel: 'C3 - Menerapkan (MOTS)',
      question: `Apabila di suatu sawah populasi ular (predator tikus) mengalami penurunan drastis akibat pemburu, dampaknya terhadap populasi tanaman padi adalah...`,
      options: [
        `Hasil panen padi meningkat pesat karena tanaman tumbuh bebas`,
        `Populasi tikus melonjak tajam sehingga merusak dan menurunkan hasil panen padi`,
        `Tanaman padi langsung layu dan mati tanpa diserang hama`,
        `Populasi katak dan belalang langsung memuncak ganti memangsa tikus`
      ],
      correctIndex: 1,
      explanation: `Soal ini termasuk MOTS (C3/C4) karena siswa menerapkan hubungan sebab-akibat rantai makanan untuk menganalisis perubahan populasi.`
    });

    questions.push({
      id: 'mots-2',
      level: 'MOTS',
      bloomLevel: 'C4 - Menganalisis (MOTS)',
      question: `Perhatikan rantai makanan berikut: Rumput ➔ Belalang ➔ Katak ➔ Ular ➔ Elang. Jika terjadi pencemaran pestisida di rumput, makhluk hidup manakah yang akan menampung konsentrasi akumulasi pestisida tertinggi dalam tubuhnya?`,
      options: [
        `Rumput karena kontak langsung pertama`,
        `Belalang karena memakan rumput terbanyak`,
        `Katak karena memakan belalang beracun`,
        `Elang karena berada di puncaknya (biomagnifikasi)`
      ],
      correctIndex: 3,
      explanation: `Analisisi MOTS (C4): Konsentrasi zat beracun meningkat pada tingkat trofik tertinggi (konsumen puncak/elang).`
    });

    questions.push({
      id: 'mots-3',
      level: 'MOTS',
      bloomLevel: 'C3 - Mengklasifikasikan (MOTS)',
      question: `Siswa membandingkan dua kolam: Kolam A (air jernih, banyak ganggang & ikan kecil) dan Kolam B (tercemar minyak, tidak ada tumbuhan). Pengelompokan kondisi ${cleanMateri} yang tepat adalah...`,
      options: [
        `Kolam A merupakan ekosistem seimbang, sedangkan Kolam B ekosistem rusak`,
        `Kolam A tidak alami, sedangkan Kolam B sangat ideal untuk mikroba`,
        `Kedua kolam memiliki tingkat keanekaragaman yang identik`,
        `Kolam B tidak memerlukan energi dari matahari`
      ],
      correctIndex: 0,
      explanation: `Mengklasifikasikan dan membandingkan dua kondisi lingkungan nyata berdasarkan indikator kriteria ekosistem seimbang.`
    });
  } else {
    // General MOTS
    questions.push({
      id: 'mots-1',
      level: 'MOTS',
      bloomLevel: 'C3 - Menerapkan (MOTS)',
      question: `Seorang siswa diminta menerapkan konsep "${cleanMateri}" dalam kegiatan pembelajaran sehari-hari di kelas. Langkah mana yang paling sesuai?`,
      options: [
        `Menggunakan konsep ${cleanMateri} untuk menyelesaikan lembar studi kasus nyata secara kolaboratif`,
        `Sekadar menyalin catatan dari papan tulis tanpa membacanya`,
        `Menebak jawaban secara asal pada ujian tanpa alasan ilmiah`,
        `Menghafalkan definisi kata demi kata tanpa paham penerapannya`
      ],
      correctIndex: 0,
      explanation: `Menerapkan (C3) berarti mampu menggunakan rumus/konsep ke dalam situasi baru atau kasus kontekstual.`
    });

    questions.push({
      id: 'mots-2',
      level: 'MOTS',
      bloomLevel: 'C4 - Menganalisis (MOTS)',
      question: `Saat membandingkan dua fenomena yang berkaitan dengan topik ${cleanMateri}, cara terbaik untuk menemukan hubungan sebab-akibatnya adalah...`,
      options: [
        `Mengidentifikasi pola perbedaan, persamaan, serta dampak keterkaitannya secara terstruktur`,
        `Memilih salah satu tanpa melihat data pendukung`,
        `Menyimpulkan bahwa kedua fenomena pasti tidak berhubungan`,
        `Mengabaikan bukti pendukung dan memercayai opini pribadi`
      ],
      correctIndex: 0,
      explanation: `Menganalisis (C4) melibatkan pemecahan materi menjadi bagian-bagian terpisah dan menguji keterkaitannya.`
    });
  }

  // ==========================================
  // 3. SOAL HOTS (Higher Order Thinking Skills)
  // C5 (Mengevaluasi) / C6 (Mencipta/Merancang)
  // ==========================================

  if (lowerMateri.includes('ekosistem') || lowerMateri.includes('makhluk hidup') || lowerMateri.includes('lingkungan')) {
    questions.push({
      id: 'hots-1',
      level: 'HOTS',
      bloomLevel: 'C5 - Mengevaluasi (HOTS)',
      question: `Sebuah desa mengalami banjir saban tahun dan kepunahan spesies ikan lokal setelah area rawa dialihfungsikan menjadi perumahan beton. Jika kamu menjadi konsultan lingkungan, solusi berkesinambungan mana yang paling tepat kamu rekomendasikan?`,
      options: [
        `Membangun benteng beton lebih tinggi dan membasmi sisa ikan yang ada`,
        `Merancang area retensi air/taman spons (sponge park) serta merestorasi koridor hijau rawa asli`,
        `Memindahkan seluruh warga desa ke kota lain dan membiarkan lahan telantar`,
        `Mengeringkan sisa rawa secara total agar lahan menjadi seragam`
      ],
      correctIndex: 1,
      explanation: `Soal HOTS (C5/C6) menuntut siswa mengevaluasi dampak jangka panjang dan merancang gagasan pemecahan masalah lingkungan berbasis bukti ilmiah.`
    });

    questions.push({
      id: 'hots-2',
      level: 'HOTS',
      bloomLevel: 'C6 - Merancang/Mencipta (HOTS)',
      question: `Kelompok siswa merancang miniatur ekosistem buatan terutup (terarium/akuarium). Agar ekosistem buatan tersebut dapat bertahan hidup mandiri tanpa pakan luar selama bertahun-tahun, komposisi ideal yang harus dirancang adalah...`,
      options: [
        `Hanya diisi air jernih dan 10 ekor ikan karnivora besar`,
        `Keseimbangan produsen (tumbuhan air), konsumen herbivora kecil, pengurai (bakteri/siput), serta cahaya matahari yang cukup`,
        `Hanya tanah kering dan batu karang tanpa udara dan tanpa air`,
        `Diisi 100 ekor kelinci tanpa tumbuhan sebagai pakan`
      ],
      correctIndex: 1,
      explanation: `Merancang (C6 - Mencipta): Siswa mensintesis seluruh pengetahuan mengenai daur materi dan energi menjadi rancangan ekosistem mandiri.`
    });

    questions.push({
      id: 'hots-3',
      level: 'HOTS',
      bloomLevel: 'C5 - Menilai Kebijakan (HOTS)',
      question: `Pemerintah daerah berencana membuka tambang emas di hutan lindung yang menjadi habitat endemic fauna langka. Argumen kritis berbasis ekologi yang paling kuat untuk menolak kebijakan tersebut adalah...`,
      options: [
        `Tambang emas akan mengganggu siklus energi global dan merusak relasi ketergantungan biota yang tak tergantikan`,
        `Harga emas di pasar dunia sedang mengalami penurunan`,
        `Pekerja tambang akan merasa kelelahan bekerja di hutan`,
        `Warna hutan akan berubah menjadi kurang menarik untuk foto`
      ],
      correctIndex: 0,
      explanation: `Kemampuan berfikir kritis HOTS (C5) dalam menilai dampak ekologis terhadap kepunahan biota dan jaring-jaring kehidupan.`
    });
  } else {
    // General HOTS
    questions.push({
      id: 'hots-1',
      level: 'HOTS',
      bloomLevel: 'C5 - Mengevaluasi (HOTS)',
      question: `Diberikan dua solusi berbeda untuk mengatasi tantangan utama pada materi "${cleanMateri}". Langkah terbaik untuk menilai solusi mana yang paling efektif adalah...`,
      options: [
        `Membandingkan efisiensi, dampak jangka panjang, dan bukti empiris kelebihan/kekurangan masing-masing solusi`,
        `Memilih solusi yang paling cepat tanpa memperdulikan risiko masa depan`,
        `Memilih secara acak dengan melempar koin`,
        `Menolak kedua solusi tanpa memberikan pertimbangan rasional`
      ],
      correctIndex: 0,
      explanation: `Mengevaluasi (C5) mewajibkan siswa melakukan justifikasi kritis berdasarkan kriteria dan standar objektif.`
    });

    questions.push({
      id: 'hots-2',
      level: 'HOTS',
      bloomLevel: 'C6 - Merancang Solusi (HOTS)',
      question: `Bagaimana kamu merancang sebuah produk inovatif atau gagasan karya kreatif yang memanfaatkan prinsip dasar "${cleanMateri}" untuk membantu masyarakat sekitar?`,
      options: [
        `Menyusun rencana ide karya berbasis analisis kebutuhan warga, memanfaatkan potensi lokal, dan menguji cobanya secara bertahap`,
        `Meniru produk luar negeri tanpa penyesuaian kebutuhan lokal`,
        `Menunggu perintah orang lain tanpa mengambil inisiatif pemikiran`,
        `Membuat gagasan yang tidak nyata dan tidak berdasar pada ilmu pengetahuan`
      ],
      correctIndex: 0,
      explanation: `Merancang/Mencipta (C6) adalah tingkatan tertinggi Bloom di mana siswa menghasilkan ide baru yang terstruktur dan orisinal.`
    });
  }

  return {
    title: `Kuis Interaktif Uji Pemahaman: ${cleanMateri}`,
    subject: cleanSubject,
    faseKelas: cleanFase,
    materiPokok: cleanMateri,
    diagnosticCondition: diagnosticCondition || 'Peserta didik reguler/tipikal',
    questions
  };
}
