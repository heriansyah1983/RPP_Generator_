import { RPPFormData, RPPContent } from '../types';

export function generateTemplateRPP(formData: RPPFormData): RPPContent {
  const finalMapel = formData.mataPelajaran === 'Lainnya (Tentukan Sendiri)' 
    ? (formData.customMataPelajaran || 'Mata Pelajaran Kustom')
    : formData.mataPelajaran;

  const finalModel = formData.modelPembelajaran === 'Lainnya (Sebutkan Kustom)'
    ? (formData.customModelPembelajaran || 'Model Pembelajaran Kustom')
    : formData.modelPembelajaran;

  const school = formData.namaSekolah.trim() || 'SD/SMP/SMA Negeri 1';
  const materi = formData.materiPokok.trim() || 'Materi Utama Pembelajaran';
  const alokasi = formData.alokasiWaktu.trim() || '2 x 40 menit';
  const fase = formData.faseKelas || 'Fase A: Kelas 1 dan Kelas 2';
  const kondisi = formData.targetPesertaDidik || 'Reguler / Tipikal (Kesiapan Belajar Rata-rata & Homogen)';

  // Customize activities according to model pembelajaran & kondisi diagnostik (explicit syntax: Memahami, Mengaplikasikan, Merefleksikan)
  let sintaksKegiatanInti: string[] = [];

  if (finalModel.includes('Problem Based Learning')) {
    sintaksKegiatanInti = [
      `[MEMAHAMI] Sintaks 1 - Orientasi Murid pada Masalah: Guru menyajikan stimulasi masalah dunia nyata terkait "${materi}". Murid mencermati, mengidentifikasi pertanyaan kunci, serta mendalami konsep dasar materi sesuai peta kesiapan [${kondisi}].`,
      `[MEMAHAMI] Sintaks 2 - Mengorganisasi Murid untuk Belajar: Murid dibentuk menjadi kelompok kolaboratif. Murid membagi tugas dan menyusun strategi pemahaman awal untuk membedah akar permasalahan "${materi}".`,
      `[MENGAPLIKASIKAN] Sintaks 3 - Membimbing Penyelidikan Mandiri/Kelompok: Murid mengumpulkan data, menguji teori, serta mengaplikasikan rumus/prinsip materi "${materi}" untuk merumuskan solusi konkret dengan scaffolding bertingkat dari guru.`,
      `[MENGAPLIKASIKAN] Sintaks 4 - Mengembangkan & Menyajikan Hasil Karya: Murid mengaplikasikan pemahaman dengan menyusun produk pemecahan masalah (laporan/infografis/peta konsep) dan mempresentasikannya di depan kelas.`,
      `[MEREFLEKSIKAN] Sintaks 5 - Menganalisis & Evaluasi Proses Masalah: Murid bersama guru melakukan evaluasi kritis terhadap solusi yang dihasilkan, merefleksikan proses berpikir yang dilalui, serta merangkum pelajaran berharga.`
    ];
  } else if (finalModel.includes('Project Based Learning')) {
    sintaksKegiatanInti = [
      `[MEMAHAMI] Sintaks 1 - Pertanyaan Mendasar (Essential Question): Guru mengajukan pertanyaan esensial yang memicu rasa ingin tahu tentang "${materi}". Murid mengeksplorasi latar belakang konsep dan urgensi proyek dalam kehidupan nyata.`,
      `[MEMAHAMI] Sintaks 2 - Mendesain Perencanaan Proyek: Murid mendiskusikan gagasan proyek berbasis materi "${materi}", menyepakati aturan main, serta membagi peran kelompok sesuai minat dan kesiapan [${kondisi}].`,
      `[MENGAPLIKASIKAN] Sintaks 3 - Menyusun Jadwal & Eksekusi Proyek: Murid menyusun alur waktu (${alokasi}) dan mengaplikasikan keterampilan teknis secara nyata untuk membuat karya/produk proyek "${materi}".`,
      `[MENGAPLIKASIKAN] Sintaks 4 - Memonitor Kemajuan Proyek: Guru mendampingi proses pembuatan, memberikan umpan balik perbaikan langsung, dan membantu murid mengatasi kendala penerapannya.`,
      `[MEREFLEKSIKAN] Sintaks 5 - Menguji Hasil & Refleksi Pengalaman: Murid memamerkan produk proyek, menguji keberfungsian konsep "${materi}", serta merefleksikan tantangan, kerja tim, dan manfaat proyek bagi lingkungan.`
    ];
  } else if (finalModel.includes('Discovery Learning')) {
    sintaksKegiatanInti = [
      `[MEMAHAMI] Sintaks 1 - Pemberian Rangsangan (Stimulation): Guru menampilkan gambar/video/artefak kontekstual materi "${materi}". Murid mengamati dengan cermat untuk memahami konteks dan memunculkan ide eksplorasi.`,
      `[MEMAHAMI] Sintaks 2 - Identifikasi Masalah (Problem Statement): Murid merumuskan pertanyaan dan hipotesis awal mengenai prinsip dasar materi "${materi}" yang akan dibuktikan.`,
      `[MENGAPLIKASIKAN] Sintaks 3 - Pengumpulan & Pengolahan Data (Data Collection & Processing): Murid mengumpulkan data literatur/pengamatan, menguji variabel, serta mengaplikasikan pengetahuan untuk mengolah informasi materi "${materi}".`,
      `[MENGAPLIKASIKAN] Sintaks 4 - Pembuktian (Verification): Murid mencocokkan hasil olah data dengan hipotesis awal untuk memverifikasi kebenaran temuan konsep secara empiris.`,
      `[MEREFLEKSIKAN] Sintaks 5 - Menarik Kesimpulan (Generalization): Murid merumuskan kesimpulan umum materi "${materi}" dengan bahasa sendiri dan merefleksikan bagaimana temuan baru ini bermanfaat dalam kehidupan sehari-hari.`
    ];
  } else if (finalModel.includes('Inquiry Learning')) {
    sintaksKegiatanInti = [
      `[MEMAHAMI] Sintaks 1 - Orientasi & Eksplorasi Konsep: Guru mengondisikan suasana belajar responsif dan menyajikan fenomena sains/sosial terkait "${materi}" untuk membangun pemahaman awal [${kondisi}].`,
      `[MEMAHAMI] Sintaks 2 - Merumuskan Masalah & Hipotesis: Murid mengajukan pertanyaan inkuiri secara kritis dan menyusun hipotesis sementara mengenai materi "${materi}".`,
      `[MENGAPLIKASIKAN] Sintaks 3 - Pengumpulan Data & Eksperimen: Murid merancang langkah eksperimen/pengamatan dan mengaplikasikan instrumen inkuiri untuk mengumpulkan bukti ilmiah materi "${materi}".`,
      `[MENGAPLIKASIKAN] Sintaks 4 - Menganalisis & Uji Temuan: Murid mengolah data hasil eksperimen, menganalisis hubungan antar variabel, dan membuktikan kebenaran hipotesis.`,
      `[MEREFLEKSIKAN] Sintaks 5 - Merumuskan Kesimpulan & Refleksi Inkuiri: Murid menyusun kesimpulan akhir materi "${materi}" dan merefleksikan sejauh mana proses inkuiri mengasah kemampuan bernalar kritis mereka.`
    ];
  } else if (finalModel.includes('Cooperative Learning')) {
    sintaksKegiatanInti = [
      `[MEMAHAMI] Sintaks 1 - Penyampaian Tujuan & Motivasi: Guru menjelaskan indikator pembelajaran dan memberikan fondasi pemahaman materi "${materi}" secara jelas dan menarik.`,
      `[MEMAHAMI] Sintaks 2 - Pengorganisasian Kelompok Belajar: Murid dibentuk ke dalam kelompok kooperatif berdiferensiasi [${kondisi}] dan mendalami materi awal bersama rekan tim.`,
      `[MENGAPLIKASIKAN] Sintaks 3 - Kerja Sama Kelompok (Team Work): Murid mengaplikasikan konsep "${materi}" melalui diskusi tim, saling mengajari (peer tutoring), dan memecahkan LKM bersama-sama.`,
      `[MENGAPLIKASIKAN] Sintaks 4 - Presentasi & Evaluasi Kelompok: Murid menyajikan hasil kerja tim atau mengerjakan kuis interaktif untuk menguji tingkat pengaplikasian materi secara kolektif.`,
      `[MEREFLEKSIKAN] Sintaks 5 - Penghargaan & Refleksi Kolaborasi: Guru memberikan apresiasi atas pencapaian tim dan murid merefleksikan nilai-nilai gotong royong serta penguasaan materi yang telah dicapai.`
    ];
  } else if (finalModel.includes('Contextual Teaching and Learning') || finalModel.includes('CTL')) {
    sintaksKegiatanInti = [
      `[MEMAHAMI] Sintaks 1 - Konstruktivisme & Inkuiri Kontekstual: Murid membangun pemahaman konsep "${materi}" dengan mengaitkan pengalaman pribadi dan situasi dunia nyata [${kondisi}].`,
      `[MEMAHAMI] Sintaks 2 - Bertanya & Pemodelan (Questioning & Modeling): Guru memodelkan contoh konkret materi "${materi}" dan memicu pertanyaan eksploratif dari murid.`,
      `[MENGAPLIKASIKAN] Sintaks 3 - Masyarakat Belajar (Learning Community): Murid bekerja sama dalam kelompok untuk mengaplikasikan konsep "${materi}" pada studi kasus kehidupan sehari-hari.`,
      `[MEREFLEKSIKAN] Sintaks 4 - Refleksi Kontekstual & Penilaian Otentik: Murid merangkum inti pembelajaran materi "${materi}", merefleksikan relevansinya dengan kehidupan nyata, dan mengevaluasi capaian belajar.`
    ];
  } else if (finalModel.includes('Direct Instruction') || finalModel.includes('Pembelajaran Langsung')) {
    sintaksKegiatanInti = [
      `[MEMAHAMI] Sintaks 1 - Orientasi & Penyampaian Tujuan: Guru menyampaikan latar belakang materi "${materi}" dan membangun kesiapan belajar murid secara interaktif.`,
      `[MEMAHAMI] Sintaks 2 - Demonstrasi & Pemodelan Konsep: Guru memperagakan contoh, rumus, atau langkah-langkah materi "${materi}" secara terstruktur dan jelas.`,
      `[MENGAPLIKASIKAN] Sintaks 3 - Latihan Terbimbing (Guided Practice): Murid mencoba mengaplikasikan prosedur materi "${materi}" dengan bimbingan dan umpan balik langsung dari guru.`,
      `[MENGAPLIKASIKAN] Sintaks 4 - Latihan Mandiri (Independent Practice): Murid menerapkan keterampilan materi "${materi}" secara mandiri pada lembar kerja berdiferensiasi [${kondisi}].`,
      `[MEREFLEKSIKAN] Sintaks 5 - Pengecekan Pemahaman & Refleksi: Guru memeriksa hasil latihan, memberikan penguatan, dan murid merefleksikan tingkat pemahaman yang diperoleh.`
    ];
  } else {
    sintaksKegiatanInti = [
      `[MEMAHAMI] Sintaks 1 - Eksplorasi Konsep & Orientasi: Guru memberikan apersepsi interaktif materi "${materi}" yang disesuaikan dengan tingkat kesiapan belajar murid [${kondisi}].`,
      `[MEMAHAMI] Sintaks 2 - Pengorganisasian Belajar: Murid mendiskusikan prinsip-prinsip utama materi "${materi}" dalam kelompok kolaboratif.`,
      `[MENGAPLIKASIKAN] Sintaks 3 - Praktik & Aplikasi Konkret: Murid mengaplikasikan pemahaman materi "${materi}" dengan mengerjakan lembar kerja berbasis studi kasus / pembuatan karya.`,
      `[MENGAPLIKASIKAN] Sintaks 4 - Presentasi & Unjuk Kerja: Murid mempresentasikan hasil kerja kelompok dan menerima tanggapan konstruktif dari rekan sekelas.`,
      `[MEREFLEKSIKAN] Sintaks 5 - Umpan Balik & Refleksi Bermakna: Murid dan guru melakukan refleksi bersama mengenai pembelajaran materi "${materi}", mengevaluasi hasil kerja, dan merangkum simpulan.`
    ];
  }

  return {
    id: `rpp-${Date.now()}`,
    createdAt: new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    formData,
    informasiUmum: {
      sekolah: school,
      mapel: finalMapel,
      faseKelas: fase,
      materi: materi,
      alokasiWaktu: alokasi,
      modelPembelajaran: finalModel,
      profilPancasila: formData.profilPancasila.length > 0 
        ? formData.profilPancasila 
        : ["Bernalar Kritis", "Gotong Royong", "Mandiri"],
      targetPesertaDidik: formData.targetPesertaDidik || "Peserta didik reguler/tipikal",
      modePembelajaran: formData.modePembelajaran || "Tatap Muka (Luring)",
      saranaPrasarana: formData.saranaPrasarana || "Buku Teks, Lembar Kerja Murid, Proyektor/Media Visual",
      guru: formData.namaGuru || "Pendidik",
      nipGuru: formData.nipGuru || "",
      kepalaSekolah: formData.namaKepalaSekolah || "Kepala Sekolah",
      nipKepalaSekolah: formData.nipKepalaSekolah || "",
      tanggalPembuatan: formData.tanggalPembuatan || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    },
    intiPerencanaan: {
      capaianPembelajaran: `Peserta didik mampu memahami, menganalisis, dan menerapkan konsep dasar materi "${materi}" pada ${finalMapel} (${fase}) secara kritis, kolaboratif, serta berakhlak mulia sesuai dengan capaian pembelajaran unit ini.`,
      caraMencapaiTujuan: `Menerapkan pendekatan pembelajaran berpusat pada murid (student-centered) melalui sintaks model ${finalModel}, yang mengintegrasikan eksplorasi kontekstual, diskusi kelompok, serta refleksi bermakna.`,
      caraMenilaiHasilBelajar: `Menggunakan penilaian otentik yang mencakup asesmen diagnostik awal untuk memetakan kesiapan murid, asesmen formatif selama proses belajar, serta asesmen sumatif untuk mengukur pencapaian tujuan pembelajaran.`
    },
    dokumenPerencanaan: {
      tujuanPembelajaran: [
        `Melalui model ${finalModel}, murid mampu mengidentifikasi dan menjelaskan konsep inti dari "${materi}" secara tepat.`,
        `Mengacu pada SKL dan Standar Isi, murid dapat mengaplikasikan pemahaman tentang "${materi}" dalam memecahkan masalah kontekstual sehari-hari.`,
        `Memperhatikan karakteristik murid dan sumber daya sekolah, murid mampu bekerja sama secara gotong royong dan bernalar kritis dalam menyampaikan ide/karya.`
      ],
      langkahPembelajaran: {
        pendahuluan: [
          `Guru membuka pembelajaran dengan salam, berdoa bersama, dan mengecek kehadiran murid secara hangat (Berkesadaran).`,
          `Apersepsi & Motivasi: Guru mengaitkan pembelajaran sebelumnya dengan materi "${materi}" melalui pertanyaan pemantik kontekstual (Bermakna).`,
          `Guru menyampaikan tujuan pembelajaran, alokasi waktu (${alokasi}), serta manfaat mempelajari "${materi}" (Menggembirakan).`
        ],
        kegiatanInti: sintaksKegiatanInti,
        penutup: [
          `Refleksi Belajar: Guru mendampingi murid melakukan refleksi tentang apa yang telah dipelajari, hal yang paling berkesan, dan tantangan yang dihadapi.`,
          `Umpan Balik & Penguatan: Guru memberikan apresiasi atas partisipasi aktif murid dan meluruskan miskonsepsi.`,
          `Tindak Lanjut & Penutup: Guru menyampaikan gambaran materi pertemuan berikutnya, diakhiri doa dan salam penutup.`
        ]
      },
      penilaianAsesmen: {
        diagnostik: `Asesmen Diagnostik Kognitif/Non-Kognitif: Kuis singkat atau tanya jawab lisan diawal pembelajaran untuk mengetahui kesiapan dan gaya belajar murid.`,
        formatif: `Asesmen Formatif: Observasi keaktifan diskusi kelompok, penilaian kinerjaproses pengerjaan tugas, serta lembar refleksi diri murid.`,
        sumatif: `Asesmen Sumatif: Tes tertulis / lembar kerja evaluasi / produk presentasi di akhir unit materi "${materi}".`,
        instrumen: [
          `Rubrik Penilaian Sikap (Profil Pelajar Pancasila)`,
          `Lembar Observasi Diskusi Kelompok`,
          `Rubrik Penilaian Kinerja / Produk`,
          `Lembar Tes Tertulis / Kuis Singkat`
        ]
      }
    },
    prinsipUtama: {
      berkesadaran: `Berkesadaran: Murid memahami tujuan belajar, mampu mengatur fokus diri, dan aktif mengambil peran dalam proses pembelajaran.`,
      bermakna: `Bermakna: Pembelajaran dikaitkan secara langsung dengan konteks kehidupan nyata murid sehingga pengetahuan yang diperoleh dapat diterapkan dengan relevan.`,
      menggembirakan: `Menggembirakan: Wasana belajar dirancang positif, menantang tanpa menekan, inklusif, dan membangkitkan rasa ingin tahu serta motivasi intrinsik murid.`
    },
    isAiGenerated: false
  };
}
