export interface QuizQuestion {
  id: string;
  level: 'LOTS' | 'MOTS' | 'HOTS';
  bloomLevel: string; // e.g. 'C1 - Mengingat (LOTS)', 'C3 - Menerapkan (MOTS)', 'C5 - Mengevaluasi (HOTS)'
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
 * Generates an interactive set of 20 LOTS, MOTS, and HOTS quiz questions based on
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

  const lowerMateri = cleanMateri.toLowerCase();
  const lowerSubject = cleanSubject.toLowerCase();

  const questions: QuizQuestion[] = [];

  // Determine domain
  const isSains = lowerSubject.includes('ipa') || lowerSubject.includes('sains') || lowerSubject.includes('biologi') || lowerSubject.includes('fisika') || lowerSubject.includes('kimia') || lowerMateri.includes('ekosistem') || lowerMateri.includes('tumbuhan') || lowerMateri.includes('hewan') || lowerMateri.includes('energi') || lowerMateri.includes('ipas');
  const isMatematika = lowerSubject.includes('matematika') || lowerMateri.includes('bangun') || lowerMateri.includes('pecahan') || lowerMateri.includes('hitung') || lowerMateri.includes('aljabar') || lowerMateri.includes('data');
  const isBahasa = lowerSubject.includes('bahasa') || lowerSubject.includes('english') || lowerMateri.includes('teks') || lowerMateri.includes('bacaan') || lowerMateri.includes('puisi') || lowerMateri.includes('cerita');
  const isSosialPkn = lowerSubject.includes('ips') || lowerSubject.includes('pancasila') || lowerSubject.includes('pkn') || lowerSubject.includes('sejarah') || lowerMateri.includes('masyarakat') || lowerMateri.includes('budaya') || lowerMateri.includes('norma');

  // Helper to generate 20 questions: 7 LOTS (C1-C2), 7 MOTS (C3-C4), 6 HOTS (C5-C6)

  // ----------------------------------------------------
  // SECTION 1: LOTS QUESTIONS (Questions 1 to 7)
  // ----------------------------------------------------
  if (isSains) {
    questions.push(
      {
        id: 'q-1',
        level: 'LOTS',
        bloomLevel: 'C1 - Mengingat (LOTS)',
        question: `Apakah definisi mendasar dari istilah "${cleanMateri}" dalam pembelajaran ${cleanSubject}?`,
        options: [
          `Proses dan sistem keterkaitan unsur alam serta lingkungan pada topik ${cleanMateri}`,
          `Kumpulan benda mati yang tidak memiliki hubungan satu sama lain`,
          `Pengamatan acak tanpa mengikuti kaidah ilmiah`,
          `Perubahan wujud zat yang terjadi hanya di laboratorium`
        ],
        correctIndex: 0,
        explanation: `Soal C1 (Mengingat): Siswa mengingat pengertian dan definisi inti dari topik ${cleanMateri}.`
      },
      {
        id: 'q-2',
        level: 'LOTS',
        bloomLevel: 'C1 - Menyebutkan (LOTS)',
        question: `Manakah di antara pilihan berikut yang merupakan komponen penyusun utama dalam topik "${cleanMateri}"?`,
        options: [
          `Unsur-unsur biotik/abiotik atau variabel utama yang mendukung materi ${cleanMateri}`,
          `Hanya batu dan pasir di sungai`,
          `Gas beracun buatan pabrik semata`,
          `Alat ukur elektronik tanpa objek pengamatan`
        ],
        correctIndex: 0,
        explanation: `Soal C1: Mengidentifikasi komponen penyusun dasar yang membentuk ${cleanMateri}.`
      },
      {
        id: 'q-3',
        level: 'LOTS',
        bloomLevel: 'C2 - Memahami (LOTS)',
        question: `Ciri khas utama yang membedakan proses atau objek dalam "${cleanMateri}" adalah...`,
        options: [
          `Adanya pola keteraturan, fungsi spesifik, dan hukum alam yang berlaku`,
          `Tidak dapat diamati dan tidak memiliki bentuk`,
          `Selalu berubah setiap detik tanpa aturan`,
          `Hanya terjadi di wilayah kutub`
        ],
        correctIndex: 0,
        explanation: `Soal C2 (Memahami): Menjelaskan karakteristik atau ciri utama dari objek kajian.`
      },
      {
        id: 'q-4',
        level: 'LOTS',
        bloomLevel: 'C2 - Mengelompokkan (LOTS)',
        question: `Dalam kajian ${cleanMateri}, kelompok objek atau fenomena dapat diklasifikasikan berdasarkan...`,
        options: [
          `Kesamaan sifat, fungsi, serta struktur dasarnya`,
          `Warna kemasan dan harga jual di pasar`,
          `Jumlah huruf pada nama ilmiahnya`,
          `Keinginan pribadi pengamat`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Memahami prinsip pengelompokan (klasifikasi) dalam sains.`
      },
      {
        id: 'q-5',
        level: 'LOTS',
        bloomLevel: 'C1 - Mengingat (LOTS)',
        question: `Tahapan awal dalam mempelajari dan mengamati fenomena "${cleanMateri}" di sekolah adalah...`,
        options: [
          `Melakukan observasi awal dan mengidentifikasi fakta dasar`,
          `Langsung menulis laporan akhir tanpa pengamatan`,
          `Mengabaikan petunjuk keselamatan belajar`,
          `Membuat kesimpulan sebelum melihat data`
        ],
        correctIndex: 0,
        explanation: `Soal C1: Mengingat prosedur dasar pengamatan ilmiah.`
      },
      {
        id: 'q-6',
        level: 'LOTS',
        bloomLevel: 'C2 - Menjelaskan (LOTS)',
        question: `Contoh konkret penerapan atau fenomena nyata dari "${cleanMateri}" di lingkungan sekitar kita adalah...`,
        options: [
          `Kejadian alami harian yang melibatkan interaksi unsur ${cleanMateri} secara nyata`,
          `Kisah fiksi ilmiah di planet luar`,
          `Gambar abstrak tanpa makna ilmiah`,
          `Perhitungan harga barang di supermarket`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Menunjukkan contoh nyata fenomena di kehidupan sehari-hari.`
      },
      {
        id: 'q-7',
        level: 'LOTS',
        bloomLevel: 'C2 - Membedakan (LOTS)',
        question: `Perbedaan dasar antara komponen utama dan komponen pendukung pada "${cleanMateri}" terletak pada...`,
        options: [
          `Peran vitalnya; komponen utama menentukan keberlangsungan proses secara langsung`,
          `Ukuran fisik barang saja`,
          `Tempat pembelian komponen tersebut`,
          `Nama pembuat alat laboratorium`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Membedakan tingkatan peran antar komponen.`
      }
    );
  } else if (isMatematika) {
    questions.push(
      {
        id: 'q-1',
        level: 'LOTS',
        bloomLevel: 'C1 - Mengingat (LOTS)',
        question: `Apakah konsep atau rumus dasar yang menjadi fondasi dalam materi "${cleanMateri}"?`,
        options: [
          `Aturan dan sifat matematis dasar yang berlaku konsisten pada ${cleanMateri}`,
          `Pengoperasian angka secara acak tanpa rumus`,
          `Membaca teks cerita tanpa menghitung`,
          `Penggunaan simbol tanpa nilai matematis`
        ],
        correctIndex: 0,
        explanation: `Soal C1 (Mengingat): Memahami definisi dan rumus dasar matematika.`
      },
      {
        id: 'q-2',
        level: 'LOTS',
        bloomLevel: 'C1 - Mengidentifikasi (LOTS)',
        question: `Di antara simbol atau unsur matematika berikut, manakah yang berhubungan langsung dengan "${cleanMateri}"?`,
        options: [
          `Variabel, konstanta, atau bentuk geometris/bilangan sesuai ${cleanMateri}`,
          `Tanda baca paragraf cerita`,
          `Simbol tangga nada musik`,
          `Peta geografi wilayah`
        ],
        correctIndex: 0,
        explanation: `Soal C1: Mengidentifikasi simbol dan besaran matematika.`
      },
      {
        id: 'q-3',
        level: 'LOTS',
        bloomLevel: 'C2 - Memahami (LOTS)',
        question: `Urutan langkah perhitungan yang benar dalam menyelesaikan soal sederhana ${cleanMateri} adalah...`,
        options: [
          `Mengikuti hierarki operasi hitung baku (kurung, perkalian/pembagian, penjumlahan/pengurangan)`,
          `Mengerjakan dari angka terbesar dahulu tanpa aturan`,
          `Menjumlahkan semua angka secara sembarangan`,
          `Menebak jawaban paling ringkas`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Memahami urutan dan sifat operasi hitung.`
      },
      {
        id: 'q-4',
        level: 'LOTS',
        bloomLevel: 'C2 - Menjelaskan (LOTS)',
        question: `Sifat matematis yang selalu berlaku pada pengoperasian "${cleanMateri}" adalah...`,
        options: [
          `Nilai kesamaan (ekuivalensi) dan konsistensi hasil perhitungan`,
          `Hasil yang selalu berubah setiap kali dihitung ulang`,
          `Nilai yang tidak dapat ditentukan sama sekali`,
          `Penggunaan angka acak tanpa nilai tepat`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Menjelaskan sifat konsistensi matematis.`
      },
      {
        id: 'q-5',
        level: 'LOTS',
        bloomLevel: 'C1 - Mengingat (LOTS)',
        question: `Satuan baku atau instrumen yang tepat digunakan saat mengukur besaran pada "${cleanMateri}" adalah...`,
        options: [
          `Satuan standar nasional/internasional yang sesuai dengan dimensi objek`,
          `Hitungan jengkal tangan secara tak pasti`,
          `Satuan waktu untuk mengukur panjang`,
          `Satuan berat untuk mengukur sudut`
        ],
        correctIndex: 0,
        explanation: `Soal C1: Mengingat satuan pengukuran baku.`
      },
      {
        id: 'q-6',
        level: 'LOTS',
        bloomLevel: 'C2 - Mengelompokkan (LOTS)',
        question: `Bentuk atau model matematika dari materi "${cleanMateri}" dapat dikelompokkan berdasarkan...`,
        options: [
          `Karakteristik nilai, bentuk visual, atau derajat persamaannya`,
          `Warna kertas tempat soal ditulis`,
          `Nama penulis buku cetak`,
          `Ketebalan garis pada gambar`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Mengklasifikasikan bentuk-bentuk matematika.`
      },
      {
        id: 'q-7',
        level: 'LOTS',
        bloomLevel: 'C2 - Membandingkan (LOTS)',
        question: `Membandingkan dua nilai kuantitas pada materi "${cleanMateri}" dilakukan dengan cara...`,
        options: [
          `Menghitung selisih atau rasio persentase di antara keduanya`,
          `Melihat mana angka yang lebih panjang digitnya saja`,
          `Memilih angka yang disukai`,
          `Menjumlahkan kedua nilai tanpa diuji`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Membandingkan kuantitas matematis.`
      }
    );
  } else {
    // General / Bahasa / Sosial LOTS
    questions.push(
      {
        id: 'q-1',
        level: 'LOTS',
        bloomLevel: 'C1 - Mengingat (LOTS)',
        question: `Apakah tujuan utama atau pemahaman mendasar dari materi "${cleanMateri}" pada ${cleanSubject}?`,
        options: [
          `Memahami konsep dasar, istilah kunci, dan prinsip utama materi ${cleanMateri}`,
          `Menghafal kalimat tanpa paham maknanya`,
          `Mengabaikan aturan dan struktur umum yang berlaku`,
          `Membuat gagasan yang bertentangan dengan materi`
        ],
        correctIndex: 0,
        explanation: `Soal C1 (Mengingat): Menguji pemahaman gagasan utama topik.`
      },
      {
        id: 'q-2',
        level: 'LOTS',
        bloomLevel: 'C1 - Mengidentifikasi (LOTS)',
        question: `Ciri khusus yang selalu melekat pada pembahasan "${cleanMateri}" adalah...`,
        options: [
          `Keberadaan unsur pokok dan struktur umum yang membentuk materi tersebut`,
          `Tidak memiliki aturan atau pola yang jelas`,
          `Hanya digunakan dalam situasi darurat`,
          `Berubah-ubah tanpa dasar yang kuat`
        ],
        correctIndex: 0,
        explanation: `Soal C1: Mengidentifikasi ciri khas materi.`
      },
      {
        id: 'q-3',
        level: 'LOTS',
        bloomLevel: 'C2 - Memahami (LOTS)',
        question: `Mengapa penting bagi siswa untuk menguasai dasar-dasar materi "${cleanMateri}"?`,
        options: [
          `Sebagai pijakan untuk menerapkan pengetahuan pada situasi belajar yang lebih kompleks`,
          `Sekadar untuk memenuhi formalitas mengisi buku`,
          `Agar bisa menghafalkan istilah tanpa perlu memahami`,
          `Supaya tidak perlu belajar materi lainnya`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Memahami urgensi pembelajaran materi.`
      },
      {
        id: 'q-4',
        level: 'LOTS',
        bloomLevel: 'C2 - Menjelaskan (LOTS)',
        question: `Manakah contoh yang tepat menggambarkan penerapan tingkat dasar dari "${cleanMateri}"?`,
        options: [
          `Mampu menyebutkan dan memberikan contoh konkret dalam kehidupan sehari-hari`,
          `Menganalisis kegagalan teori tanpa data dasar`,
          `Merancang undang-undang tingkat dunia`,
          `Menghitung rumus fisik di luar topik`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Memberikan contoh nyata penerapan konsep.`
      },
      {
        id: 'q-5',
        level: 'LOTS',
        bloomLevel: 'C1 - Menyebutkan (LOTS)',
        question: `Unsur pendukung utama yang memperkuat pemahaman materi "${cleanMateri}" adalah...`,
        options: [
          `Sumber belajar yang akurat, data pendukung, dan latihan terstruktur`,
          `Opini pribadi tanpa fakta dasar`,
          `Catatan acak yang tidak lengkap`,
          `Rumor yang belum terbukti`
        ],
        correctIndex: 0,
        explanation: `Soal C1: Mengingat sumber daya pendukung materi.`
      },
      {
        id: 'q-6',
        level: 'LOTS',
        bloomLevel: 'C2 - Mengelompokkan (LOTS)',
        question: `Pengelompokan jenis atau kategori dalam materi "${cleanMateri}" didasarkan pada...`,
        options: [
          `Kriteria fungsi, karakteristik, atau struktur umum yang dimiliki`,
          `Abjad nama pembuatnya`,
          `Panjang pendeknya judul materi`,
          `Tanggal pembuatan dokumen`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Mengelompokkan berdasarkan kategori logis.`
      },
      {
        id: 'q-7',
        level: 'LOTS',
        bloomLevel: 'C2 - Membedakan (LOTS)',
        question: `Cara membedakan fakta dan opini saat mempelajari "${cleanMateri}" adalah...`,
        options: [
          `Fakta didasarkan pada bukti nyata/data teruji, sedangkan opini berupa sudut pandang pribadi`,
          `Fakta selalu ditulis dengan huruf kapital`,
          `Opini selalu bernilai benar tanpa diuji`,
          `Keduanya tidak memiliki perbedaan berarti`
        ],
        correctIndex: 0,
        explanation: `Soal C2: Membedakan fakta ilmiah vs opini.`
      }
    );
  }

  // ----------------------------------------------------
  // SECTION 2: MOTS QUESTIONS (Questions 8 to 14)
  // ----------------------------------------------------
  if (isSains) {
    questions.push(
      {
        id: 'q-8',
        level: 'MOTS',
        bloomLevel: 'C3 - Menerapkan (MOTS)',
        question: `Apabila salah satu variabel utama pada fenomena "${cleanMateri}" mengalami gangguan atau perubahan drastis, dampak yang terjadi pada sistem adalah...`,
        options: [
          `Terjadi ketidakseimbangan yang mempengaruhi komponen lain dalam rantai/sistem`,
          `Sistem akan tetap sama tanpa mengalami perubahan apapun`,
          `Seluruh unsur langsung musnah dalam satu detik`,
          `Komponen lain akan berubah menjadi benda mati`
        ],
        correctIndex: 0,
        explanation: `Soal C3 (Menerapkan): Mengaplikasikan prinsip interaksi sebab-akibat pada kondisi nyata.`
      },
      {
        id: 'q-9',
        level: 'MOTS',
        bloomLevel: 'C3 - Menggunakan Prosedur (MOTS)',
        question: `Seorang siswa ingin membuktikan prinsip "${cleanMateri}" melalui eksperimen sederhana. Urutan langkah kerja yang tepat adalah...`,
        options: [
          `Merumuskan pertanyaan ➔ Menyiapkan alat & bahan ➔ Melakukan pengamatan ➔ Mencatat data ➔ Menyimpulkan`,
          `Menulis kesimpulan dahulu ➔ Baru menyiapkan alat ➔ Mengamati acak`,
          `Langsung mengumpulkan data tanpa membuat persiapan`,
          `Melakukan percobaan tanpa mengukur variabel`
        ],
        correctIndex: 0,
        explanation: `Soal C3: Menerapkan prosedur ilmiah eksperimen sederhana.`
      },
      {
        id: 'q-10',
        level: 'MOTS',
        bloomLevel: 'C4 - Menganalisis (MOTS)',
        question: `Perhatikan data hasil percobaan terkait "${cleanMateri}": Sampel A menunjukkan reaksi cepat, sedangkan Sampel B menunjukkan reaksi lambat. Faktor analisis penyebab utamanya adalah...`,
        options: [
          `Perbedaan kondisi lingkungan atau konsentrasi variabel yang diberikan pada masing-masing sampel`,
          `Sampel A berwarna lebih bagus dari Sampel B`,
          `Waktu pengamatan yang sengaja dibedakan`,
          `Kesalahan pembacaan judul eksperimen`
        ],
        correctIndex: 0,
        explanation: `Soal C4 (Menganalisis): Mengidentifikasi variabel penyebab perbedaan hasil data.`
      },
      {
        id: 'q-11',
        level: 'MOTS',
        bloomLevel: 'C4 - Mengorelasikan (MOTS)',
        question: `Hubungan timbal balik antara aktivitas manusia dan keberlangsungan fenomena "${cleanMateri}" adalah...`,
        options: [
          `Tindakan menjaga kelestarian akan memperkuat daya dukung lingkungan, sedangkan pencemaran akan merusaknya`,
          `Manusia tidak berpengaruh sama sekali terhadap lingkungan`,
          `Lingkungan akan membaik dengan sendirinya meski dicemari terus-menerus`,
          `Aktivitas manusia hanya berdampak pada benda mati`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Menganalisis hubungan sebab-akibat keterkaitan manusia & sains.`
      },
      {
        id: 'q-12',
        level: 'MOTS',
        bloomLevel: 'C3 - Mengklasifikasikan Kasus (MOTS)',
        question: `Siswa membandingkan dua area pengamatan: Area X (kondisi alami terawat) dan Area Y (tercemar limbah). Klasifikasi kondisi "${cleanMateri}" yang tepat adalah...`,
        options: [
          `Area X menunjukkan keseimbangan alami, sedangkan Area Y menunjukkan degradasi/kerusakan`,
          `Kedua area memiliki kualitas yang sama baiknya`,
          `Area Y lebih aman untuk organisme hidup`,
          `Area X tidak membutuhkan energi matahari`
        ],
        correctIndex: 0,
        explanation: `Soal C3: Mengelompokkan dua kasus nyata berdasarkan kriteria ilmiah.`
      },
      {
        id: 'q-13',
        level: 'MOTS',
        bloomLevel: 'C4 - Mendeteksi Kekeliruan (MOTS)',
        question: `Di dalam sebuah laporan sains tentang "${cleanMateri}", tertulis bahwa "Pengurai tidak diperlukan karena tumbuhan bisa hidup tanpa nutrisi tanah". Kekeliruan analisis dalam pernyataan tersebut adalah...`,
        options: [
          `Mengabaikan peran penting pengurai dalam mendaur ulang zat hara untuk diserap tumbuhan`,
          `Tumbuhan memang tidak membutuhkan nutrisi`,
          `Pengurai hanya hidup di air laut`,
          `Nutrisi tanah dibuat oleh hewan herbivora`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Menemukan kesalahan logika ilmiah dalam teks laporan.`
      },
      {
        id: 'q-14',
        level: 'MOTS',
        bloomLevel: 'C4 - Membandingkan Struktur (MOTS)',
        question: `Saat membandingkan dua proses berbeda pada materi "${cleanMateri}", perbedaan mendasar dalam alur energinya terletak pada...`,
        options: [
          `Arah perpindahan energi dan tingkat efisiensi perubahan bentuk energinya`,
          `Jumlah kata yang digunakan untuk menjelaskan proses`,
          `Warna grafik pengamatan`,
          `Suhu tempat penyimpanan dokumen`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Menganalisis perbedaan alur proses sains.`
      }
    );
  } else if (isMatematika) {
    questions.push(
      {
        id: 'q-8',
        level: 'MOTS',
        bloomLevel: 'C3 - Menerapkan (MOTS)',
        question: `Sebuah permasalahan kontekstual sehari-hari berkaitan dengan "${cleanMateri}". Langkah matematika pertama untuk menyelesaikannya adalah...`,
        options: [
          `Mengubah narasi cerita menjadi model matematika atau persamaan baku`,
          `Menebak angka secara acak tanpa membaca soal`,
          `Menuliskan kalimat kesimpulan sebelum menghitung`,
          `Mengubah semua angka menjadi desimal`
        ],
        correctIndex: 0,
        explanation: `Soal C3: Menerapkan pemodelan matematika pada soal cerita.`
      },
      {
        id: 'q-9',
        level: 'MOTS',
        bloomLevel: 'C3 - Menghitung (MOTS)',
        question: `Jika nilai variabel pada materi "${cleanMateri}" dilipatgandakan dua kali, perubahan hasil akhir perhitungan adalah...`,
        options: [
          `Hasil perhitungan akan berbanding lurus sesuai dengan sifat persamaan materi ${cleanMateri}`,
          `Hasil akhir selalu menjadi nol`,
          `Tidak ada perubahan sama sekali pada hasil`,
          `Hasil menjadi bernilai negatif otomatis`
        ],
        correctIndex: 0,
        explanation: `Soal C3: Menerapkan perhitungan perubahan variabel.`
      },
      {
        id: 'q-10',
        level: 'MOTS',
        bloomLevel: 'C4 - Menganalisis Grafik/Data (MOTS)',
        question: `Dalam membaca tabel atau grafik pengumpulan data terkait "${cleanMateri}", tren kenaikan angka menunjukkan bahwa...`,
        options: [
          `Terdapat hubungan korelasional positif antar variabel yang diukur`,
          `Data yang dimasukkan pasti salah`,
          `Nilai variabel tidak memiliki arti matematis`,
          `Grafik mengalami penurunan kuantitas`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Menganalisis tren data matematis.`
      },
      {
        id: 'q-11',
        level: 'MOTS',
        bloomLevel: 'C4 - Membandingkan Dua Metode (MOTS)',
        question: `Dua siswa menggunakan metode berbeda (Metode A dan Metode B) untuk menyelesaikan soal "${cleanMateri}". Keduanya menghasilkan jawaban yang sama. Hal ini menandakan...`,
        options: [
          `Kedua metode valid dan konsisten secara matematis`,
          `Salah satu siswa pasti menyalin pekerjaan temannya`,
          `Soal tersebut tidak memiliki jawaban tepat`,
          `Matematika tidak memerlukan aturan tetap`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Menganalisis validitas metode pengerjaan.`
      },
      {
        id: 'q-12',
        level: 'MOTS',
        bloomLevel: 'C3 - Mengaplikasikan Rumus (MOTS)',
        question: `Bagaimana cara menerapkan rumus ${cleanMateri} jika terjadi perubahan satuan ukuran pada data soal?`,
        options: [
          `Melakukan konversi satuan terlebih dahulu agar seragam sebelum dimasukkan ke rumus`,
          `Langsung mengalikan angka tanpa mengonversi satuan`,
          `Mengabaikan satuan dan menggunakan angka acak`,
          `Mengubah rumus dasar menjadi bentuk baru`
        ],
        correctIndex: 0,
        explanation: `Soal C3: Menerapkan konversi satuan dalam rumus.`
      },
      {
        id: 'q-13',
        level: 'MOTS',
        bloomLevel: 'C4 - Menemukan Kesalahan Hitung (MOTS)',
        question: `Hasil hitungan seorang siswa mengalami kekeliruan pada materi "${cleanMateri}". Setelah diperiksa, kesalahan terjadi saat melakukan operasi pembagian. Langkah koreksi yang benar adalah...`,
        options: [
          `Memeriksa kembali sifat kebalikan (invers) operasi hitung dan menghitung ulang bertahap`,
          `Menambah nilai jawaban sebesar 100 secara bebas`,
          `Menghapus seluruh lembar kerja tanpa diperiksa`,
          `Mengganti soal dengan materi lain`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Menganalisis dan mengoreksi kesalahan pengerjaan.`
      },
      {
        id: 'q-14',
        level: 'MOTS',
        bloomLevel: 'C4 - Menganalisis Pola (MOTS)',
        question: `Pola deret atau urutan logika dalam "${cleanMateri}" menunjukkan keteraturan penambahan +5. Angka setelah 15, 20, 25 adalah...`,
        options: [
          `30`,
          `28`,
          `35`,
          `40`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Menganalisis pola keteraturan angka.`
      }
    );
  } else {
    // General / Bahasa / Sosial MOTS
    questions.push(
      {
        id: 'q-8',
        level: 'MOTS',
        bloomLevel: 'C3 - Menerapkan (MOTS)',
        question: `Bagaimana cara menerapkan pemahaman topik "${cleanMateri}" saat menghadapi masalah nyata dalam kehidupan sehari-hari?`,
        options: [
          `Menggunakan prinsip dan panduan materi ${cleanMateri} untuk mengambil tindakan yang tepat dan terstruktur`,
          `Menghindari masalah dan tidak mengambil keputusan`,
          `Menyalahkan orang lain tanpa mencari solusi`,
          `Mengikuti tindakan acak tanpa pertimbangan`
        ],
        correctIndex: 0,
        explanation: `Soal C3: Menerapkan konsep pada situasi nyata.`
      },
      {
        id: 'q-9',
        level: 'MOTS',
        bloomLevel: 'C3 - Menggunakan Strategi (MOTS)',
        question: `Saat menyampaikan gagasan mengenai "${cleanMateri}" dalam forum diskusi kelas, langkah yang paling efektif adalah...`,
        options: [
          `Menyampaikan poin utama secara sistematis disertai bukti atau contoh yang relevan`,
          `Bicara tanpa arah dan memotong pembicaraan orang lain`,
          `Membaca seluruh isi buku teks tanpa jeda`,
          `Diam saja dan tidak memberikan masukan`
        ],
        correctIndex: 0,
        explanation: `Soal C3: Menerapkan strategi komunikasi efektif.`
      },
      {
        id: 'q-10',
        level: 'MOTS',
        bloomLevel: 'C4 - Menganalisis Hubungan (MOTS)',
        question: `Analisislah hubungan antara pemahaman tentang "${cleanMateri}" dengan peningkatan keterampilan berpikir peserta didik!`,
        options: [
          `Pemahaman yang mendalam melatih daya nalar kritis, analisis logis, dan pemecahan masalah`,
          `Materi ini hanya melatih daya ingat jangka pendek`,
          `Materi ini tidak memiliki keterkaitan dengan daya nalar`,
          `Mengurangi keinginan siswa untuk belajar`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Menganalisis dampak pembelajaran terhadap nalar.`
      },
      {
        id: 'q-11',
        level: 'MOTS',
        bloomLevel: 'C4 - Membandingkan Dua Teks/Kondisi (MOTS)',
        question: `Saat membandingkan dua sudut pandang berbeda mengenai "${cleanMateri}", langkah analisis terbaik adalah...`,
        options: [
          `Mengidentifikasi argumen utama, bukti pendukung, serta kelebihan masing-masing perspektif`,
          `Memilih yang paling singkat tanpa dibaca`,
          `Menganggap keduanya salah tanpa alasan`,
          `Menilai berdasarkan perasaan emosional`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Membandingkan dua perspektif argumen.`
      },
      {
        id: 'q-12',
        level: 'MOTS',
        bloomLevel: 'C3 - Mengklasifikasikan Informasi (MOTS)',
        question: `Mengklasifikasikan informasi penting dan informasi penjelas pada pembahasan "${cleanMateri}" dilakukan dengan...`,
        options: [
          `Menentukan gagasan utama sebagai informasi penting dan rincian contoh sebagai penjelas`,
          `Menganggap semua kalimat memiliki bobot yang sama`,
          `Menghapus kalimat yang berada di tengah paragraf`,
          `Hanya membaca kata pertama di setiap baris`
        ],
        correctIndex: 0,
        explanation: `Soal C3: Mengelompokkan gagasan utama vs penjelas.`
      },
      {
        id: 'q-13',
        level: 'MOTS',
        bloomLevel: 'C4 - Mengidentifikasi Bias (MOTS)',
        question: `Dalam sebuah ulasan tentang "${cleanMateri}", penulis hanya menyampaikan kelebihan tanpa menyebutkan keterbatasannya. Hal ini menunjukkan...`,
        options: [
          `Terdapat bias penulisan yang memerlukan penyeimbangan informasi dari sumber lain`,
          `Ulasan tersebut sangat objektif dan sempurna`,
          `Materi tersebut tidak memiliki kelemahan sama sekali`,
          `Penulis tidak memahami topik yang ditulis`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Mendeteksi bias dan ketidakseimbangan informasi.`
      },
      {
        id: 'q-14',
        level: 'MOTS',
        bloomLevel: 'C4 - Menyimpulkan Sebab-Akibat (MOTS)',
        question: `Sebab utama terjadinya perubahan atau dinamika pada materi "${cleanMateri}" adalah...`,
        options: [
          `Pengaruh faktor internal dan eksternal yang saling berinteraksi secara berlanjut`,
          `Faktor keberuntungan semata`,
          `Keputusan tunggal yang tidak berubah`,
          `Tidak adanya dorongan dari lingkungan`
        ],
        correctIndex: 0,
        explanation: `Soal C4: Menganalisis faktor penyabab dinamika materi.`
      }
    );
  }

  // ----------------------------------------------------
  // SECTION 3: HOTS QUESTIONS (Questions 15 to 20)
  // ----------------------------------------------------
  if (isSains) {
    questions.push(
      {
        id: 'q-15',
        level: 'HOTS',
        bloomLevel: 'C5 - Mengevaluasi (HOTS)',
        question: `Sebuah wilayah mengalami masalah pencemaran berat yang merusak kondisi "${cleanMateri}". Di antara usulan solusi berikut, manakah rekomendasi jangka panjang terbaik yang berbasis keberlanjutan ekologi?`,
        options: [
          `Merancang program restorasi ekosistem berbasis konservasi alami dan edukasi masyarakat secara terpadu`,
          `Membersihkan lokasi satu kali saja lalu membiarkannya kembali`,
          `Menutup seluruh wilayah dan melarang kegiatan apapun tanpa solusi`,
          `Menggunakan bahan kimia keras yang berpotensi merusak rantai makanan baru`
        ],
        correctIndex: 0,
        explanation: `Soal C5 (Mengevaluasi): Menilai dan memilih solusi terbaik berbasis keberlanjutan ekologi.`
      },
      {
        id: 'q-16',
        level: 'HOTS',
        bloomLevel: 'C5 - Menilai Kebijakan (HOTS)',
        question: `Pemerintah berencana mengalihfungsikan lahan konservasi "${cleanMateri}" menjadi kawasan industri. Argumen kritis berbasis ilmu pengetahuan yang paling kuat untuk menelaah rencana tersebut adalah...`,
        options: [
          `Alih fungsi lahan berisiko memutus siklus alam, menurunkan keanekaragaman hayati, dan memicu bencana ekologis`,
          `Biaya pembangunan pabrik industri sangat mahal`,
          `Pekerja industri akan merasa panas di lahan terbuka`,
          `Kawasan industri membuat tampilan pemandangan berubah`
        ],
        correctIndex: 0,
        explanation: `Soal C5: Menilai kebijakan berdasarkan analisis kritis dampak lingkungan.`
      },
      {
        id: 'q-17',
        level: 'HOTS',
        bloomLevel: 'C6 - Merancang Solusi (HOTS)',
        question: `Kelompok siswa diminta merancang sebuah inovasi alat/produk sederhana berbasis prinsip "${cleanMateri}" untuk membantu kebersihan lingkungan sekolah. Langkah perancangan terbaik adalah...`,
        options: [
          `Identifikasi masalah ➔ Analisis kebutuhan ➔ Merancang prototipe ➔ Menguji coba ➔ Evaluasi & penyempurnaan`,
          `Langsung menjual produk tanpa diuji coba dahulu`,
          `Meniru produk lain tanpa menyesuaikan masalah sekolah`,
          `Membuat gambar rancangan tanpa memperhitungkan fungsi`
        ],
        correctIndex: 0,
        explanation: `Soal C6 (Merancang/Mencipta): Menyusun alur rekayasa produk inovasi.`
      },
      {
        id: 'q-18',
        level: 'HOTS',
        bloomLevel: 'C5 - Justifikasi Kritis (HOTS)',
        question: `Dua kelompok mengajukan teori berbeda untuk menjelaskan fenomena langka pada "${cleanMateri}". Kriteria utama untuk menentukan teori mana yang lebih dapat diterima secara ilmiah adalah...`,
        options: [
          `Dukungan data empiris yang teruji, konsistensi eksperimen, serta keterbukaan terhadap pembuktian ulang`,
          `Popularitas siswa yang menyampaikan teori`,
          `Panjangnya kalimat yang digunakan dalam presentasi`,
          `Kecepatan kelompok dalam mengumpulkan tugas`
        ],
        correctIndex: 0,
        explanation: `Soal C5: Menjustifikasi teori berdasarkan kriteria validitas ilmiah.`
      },
      {
        id: 'q-19',
        level: 'HOTS',
        bloomLevel: 'C6 - Merumuskan Gagasan Baru (HOTS)',
        question: `Bagaimana kamu merumuskan sebuah hipotesis baru atau ide karya kreatif yang menggabungkan prinsip "${cleanMateri}" dengan teknologi digital masa kini?`,
        options: [
          `Mengembangkan aplikasi/sensor pemantau otomatis yang mengukur variabel ${cleanMateri} secara real-time`,
          `Membuat game tanpa ada kaitan dengan materi belajar`,
          `Menulis ulang buku cetak ke dalam format ketikan komputer`,
          `Mengambil data palsu untuk dimuat di internet`
        ],
        correctIndex: 0,
        explanation: `Soal C6: Merumuskan gagasan baru berbasis integrasi teknologi.`
      },
      {
        id: 'q-20',
        level: 'HOTS',
        bloomLevel: 'C6 - Menyusun Strategi Adaptasi (HOTS)',
        question: `Dalam menghadapi perubahan iklim global yang mengancam stabilitas "${cleanMateri}", strategi adaptasi terbaik yang dapat dirancang oleh masyarakat lokal adalah...`,
        options: [
          `Membangun ketahanan lokal melalui diversifikasi sumber daya, konservasi mandiri, dan penerapan teknologi ramah lingkungan`,
          `Pasrah dan tidak melakukan tindakan pencegahan`,
          `Meningkatkan penggunaan energi fosil yang mencemari`,
          `Menebang pohon secara bebas di area resapan`
        ],
        correctIndex: 0,
        explanation: `Soal C6: Merancang strategi adaptasi dan mitigasi masa depan.`
      }
    );
  } else if (isMatematika) {
    questions.push(
      {
        id: 'q-15',
        level: 'HOTS',
        bloomLevel: 'C5 - Mengevaluasi Solusi (HOTS)',
        question: `Sebuah perusahaan menggunakan rumus matematika terkait "${cleanMateri}" untuk memprediksi keuntungan. Namun hasil nyata berbeda dari prediksi. Langkah evaluasi paling kritis yang harus dilakukan adalah...`,
        options: [
          `Mengevaluasi asumsi dasar variabel, keakuratan data masukan, serta batasan kondisi matematis yang digunakan`,
          `Langsung mengganti seluruh staf keuangan`,
          `Menghapus data hasil dan menggunakan perkiraan acak`,
          `Menyimpulkan bahwa rumus matematika tidak berguna`
        ],
        correctIndex: 0,
        explanation: `Soal C5: Mengevaluasi asumsi dan kendala model matematika.`
      },
      {
        id: 'q-16',
        level: 'HOTS',
        bloomLevel: 'C5 - Membandingkan Efisiensi (HOTS)',
        question: `Dalam menyelesaikan masalah kompleks "${cleanMateri}", terdapat Algoritma A (3 langkah rumit) dan Algoritma B (5 langkah sederhana). Penilaian mana yang paling tepat?`,
        options: [
          `Algoritma B lebih disarankan untuk pemula karena mengurangi risiko kesalahan ketelitian, sedangkan Algoritma A lebih efisien untuk sistem otomatis`,
          `Algoritma A pasti selalu lebih buruk daripada B`,
          `Keduanya tidak memiliki nilai guna`,
          `Pilihan tergantung pada warna tinta pena`
        ],
        correctIndex: 0,
        explanation: `Soal C5: Menilai efisiensi dan konteks penerapan algoritma.`
      },
      {
        id: 'q-17',
        level: 'HOTS',
        bloomLevel: 'C6 - Merancang Pemodelan (HOTS)',
        question: `Bagaimana kamu merancang sebuah rumus atau pemodelan matematika baru yang mampu memecahkan masalah antrean belanja menggunakan konsep "${cleanMateri}"?`,
        options: [
          `Mengidentifikasi laju kedatangan & pelayanan, merumuskan fungsi persamaan, dan menguji variabel optimalisasi`,
          `Menyuruh orang antre tanpa aturan`,
          `Menutup seluruh kasir toko`,
          `Menggunakan estimasi tanpa rumus pasti`
        ],
        correctIndex: 0,
        explanation: `Soal C6: Merancang pemodelan matematika untuk masalah kehidupan nyata.`
      },
      {
        id: 'q-18',
        level: 'HOTS',
        bloomLevel: 'C5 - Menilai Validitas (HOTS)',
        question: `Seorang peneliti mengklaim bahwa konsep "${cleanMateri}" dapat menyelesaikan semua permasalahan ekonomi dunia. Argumen kritis untuk menguji klaim tersebut adalah...`,
        options: [
          `Mengkaji batasan asumsi matematis dan membuktikan bahwa variabel sosial kompleks tidak dapat disederhanakan oleh satu konsep saja`,
          `Menerima klaim tersebut langsung tanpa diuji`,
          `Menolak klaim karena peneliti belum terkenal`,
          `Menganggap semua teori ekonomi itu salah`
        ],
        correctIndex: 0,
        explanation: `Soal C5: Menilai validitas klaim dan batasan teori.`
      },
      {
        id: 'q-19',
        level: 'HOTS',
        bloomLevel: 'C6 - Sintesis Solusi Inovatif (HOTS)',
        question: `Gagasan karya inovatif yang mensintesiskan konsep matematika "${cleanMateri}" dengan seni arsitektur bangunan ramah lingkungan adalah...`,
        options: [
          `Merancang struktur atap hemat energi berdasarkan perhitungan simetri dan rasio sudut optimal matahari`,
          `Mewarnai dinding dengan cat warna-warni tanpa hitungan`,
          `Membuat gedung tanpa pintu dan jendela`,
          `Menggunakan bahan plastik tanpa memperhitungkan beban`
        ],
        correctIndex: 0,
        explanation: `Soal C6: Mensintesiskan matematika dengan disiplin ilmu arsitektur.`
      },
      {
        id: 'q-20',
        level: 'HOTS',
        bloomLevel: 'C6 - Merancang Lembar Kerja (HOTS)',
        question: `Jika kamu bertindak sebagai guru, bagaimana kamu merancang sebuah proyek pembelajaran matematika pada materi "${cleanMateri}" yang mengasah Higher Order Thinking Skills siswa?`,
        options: [
          `Menyusun tugas proyek berbasis studi kasus nyata di mana siswa mengumpulkan data lapangan, memodelkan, dan mempresentasikan solusinya`,
          `Memberikan 100 soal latihan rutin penjumlahan angka`,
          `Menyuruh siswa menyalin rumus 10 kali`,
          `Memberikan kuis tanpa pembahasan`
        ],
        correctIndex: 0,
        explanation: `Soal C6: Merancang asesmen proyek pembelajaran berbasis HOTS.`
      }
    );
  } else {
    // General / Bahasa / Sosial HOTS
    questions.push(
      {
        id: 'q-15',
        level: 'HOTS',
        bloomLevel: 'C5 - Mengevaluasi Solusi (HOTS)',
        question: `Diberikan dua pendekatan berbeda untuk memecahkan persoalan pada materi "${cleanMateri}". Langkah terbaik untuk mengevaluasi pendekatan yang paling efektif adalah...`,
        options: [
          `Membandingkan efisiensi, kelayakan implementasi, dampak jangka panjang, serta bukti keberhasilannya secara objektif`,
          `Memilih pendekatan yang paling cepat tanpa melihat risiko masa depan`,
          `Memilih secara acak tanpa pertimbangan rasional`,
          `Menolak kedua pendekatan tanpa memberikan alasan`
        ],
        correctIndex: 0,
        explanation: `Soal C5: Mengevaluasi dan membandingkan dua pendekatan secara komprehensif.`
      },
      {
        id: 'q-16',
        level: 'HOTS',
        bloomLevel: 'C5 - Menilai Kritis Dampak (HOTS)',
        question: `Penilaian kritis terhadap dampak penerapan gagasan "${cleanMateri}" dalam kehidupan masyarakat berbudaya adalah...`,
        options: [
          `Penerapan yang bijak akan memperkuat nilai kearifan dan keharmonisan, sedangkan penerapan sembrono dapat memicu konflik`,
          `Materi ini tidak berdampak apapun bagi masyarakat`,
          `Masyarakat akan selalu menolak setiap perubahan baru`,
          `Setiap ide baru pasti merusak budaya lama`
        ],
        correctIndex: 0,
        explanation: `Soal C5: Menilai kritis dampak sosial dan budaya.`
      },
      {
        id: 'q-17',
        level: 'HOTS',
        bloomLevel: 'C6 - Merancang Karya Inovatif (HOTS)',
        question: `Bagaimana kamu merancang sebuah karya inovatif atau produk pembelajaran kreatif yang memanfaatkan inti dari "${cleanMateri}"?`,
        options: [
          `Menyusun konsep karya berbasis analisis kebutuhan, memanfaatkan potensi lokal, dan menguji keberfungsiannya secara bertahap`,
          `Meniru karya orang lain tanpa izin dan tanpa perubahan`,
          `Membuat karya seadanya tanpa perencanaan`,
          `Menunggu ide orang lain tanpa mencoba`
        ],
        correctIndex: 0,
        explanation: `Soal C6: Merancang ide karya inovatif berorientasi solusi.`
      },
      {
        id: 'q-18',
        level: 'HOTS',
        bloomLevel: 'C5 - Justifikasi Argumen (HOTS)',
        question: `Dalam sebuah debat ilmiah mengenai "${cleanMateri}", argumen kamu disanggah oleh lawan. Cara terbaik untuk memberikan jutifikasi balasan adalah...`,
        options: [
          `Menyajikan fakta data pendukung yang lebih kuat, menganalisis kelemahan sanggahan lawan, dan menegaskan kesimpulan secara santun`,
          `Marah dan menghentikan debat secara sepihak`,
          `Mengulang-ulang pernyataan awal tanpa menambah bukti`,
          `Menerima sanggahan lawan meski bukti mereka lemah`
        ],
        correctIndex: 0,
        explanation: `Soal C5: Menjustifikasi argumen dengan bukti dan fakta rasional.`
      },
      {
        id: 'q-19',
        level: 'HOTS',
        bloomLevel: 'C6 - Mensintesiskan Konsep (HOTS)',
        question: `Mensintesiskan materi "${cleanMateri}" dengan topik disiplin ilmu lain akan menghasilkan sebuah pemahaman baru berupa...`,
        options: [
          `Pendekatan interdisipliner yang mampu memecahkan masalah secara lebih holistik dan komprehensif`,
          `Kebingungan karena mencampuradukkan teori`,
          `Penurunan kualitas ilmu pengetahuan`,
          `Hilangnya makna asli dari masing-masing materi`
        ],
        correctIndex: 0,
        explanation: `Soal C6: Mensintesis gagasan antar-disiplin ilmu.`
      },
      {
        id: 'q-20',
        level: 'HOTS',
        bloomLevel: 'C6 - Merancang Aksi Nyata (HOTS)',
        question: `Rancangan rencana aksi nyata (action plan) berbasis materi "${cleanMateri}" yang dapat dilakukan peserta didik untuk memberikan dampak positif di sekolah adalah...`,
        options: [
          `Membentuk komunitas pembelajar sebaya, menyusun kampanye edukatif, dan melakukan aksi nyata bersama terukur`,
          `Membuat poster tanpa ajakan tindakan`,
          `Menuntut sekolah mengubah kurikulum secara mendadak`,
          `Melakukan kegiatan individu tanpa mengajak teman`
        ],
        correctIndex: 0,
        explanation: `Soal C6: Merancang aksi nyata kolaboratif berorientasi dampak.`
      }
    );
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

