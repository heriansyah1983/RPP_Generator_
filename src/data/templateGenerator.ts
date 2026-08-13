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
  const kondisi = formData.kondisiDiagnostikSiswa || 'Reguler / Tipikal (Kesiapan Belajar Rata-rata & Homogen)';

  // Customize activities according to model pembelajaran & kondisi diagnostik
  let sintaksKegiatanInti: string[] = [];
  if (finalModel.includes('Problem Based Learning')) {
    sintaksKegiatanInti = [
      `Orientasi Murid pada Masalah: Guru menyajikan masalah kontekstual tentang "${materi}". Penjelasan disesuaikan dengan petunjuk diagnostik [${kondisi}].`,
      `Mengorganisasi Murid untuk Belajar: Murid dikelompokkan secara heterogen/diferensiasi berdasarkan kesiapan belajar untuk mendiskusikan pemecahan masalah materi "${materi}".`,
      `Membimbing Penyelidikan Kelompok: Guru memberikan bantuan (scaffolding) bertingkat sesuai tingkat pemahaman murid pada kondisi [${kondisi}].`,
      `Mengembangkan & Menyajikan Hasil Karya: Setiap kelompok menyusun dan mempresentasikan solusi materi "${materi}" dalam bentuk media pilihan (gambar/tulisan/lisan).`,
      `Menganalisis & Evaluasi Masalah: Guru memfasilitasi refleksi bersama atas penyelesaian masalah dan memberikan penguatan konsep.`
    ];
  } else if (finalModel.includes('Project Based Learning')) {
    sintaksKegiatanInti = [
      `Pertanyaan Mendasar: Guru memberikan tantangan pembuatan proyek "${materi}" yang disesuaikan dengan kondisi murid [${kondisi}].`,
      `Mendesain Perencanaan Proyek: Murid membagi peran secara bergotong royong sesuai bakat dan gaya belajar masing-masing.`,
      `Menyusun Jadwal Pembuatan: Murid menyusun alur pengerjaan karya selaras alokasi waktu ${alokasi}.`,
      `Memonitor Perkembangan Proyek: Guru mendampingi pengerjaan dan memberikan panduan bertahap bagi kelompok yang membutuhkan pendampingan ekstra.`,
      `Menguji Hasil & Evaluasi: Murid memamerkan proyek "${materi}" dan melakukan evaluasi diri secara positif.`
    ];
  } else if (finalModel.includes('Discovery Learning')) {
    sintaksKegiatanInti = [
      `Pemberian Rangsangan (Stimulation): Guru menampilkan fenomena kontekstual materi "${materi}" dengan media konkrit/visual sesuai kondisi [${kondisi}].`,
      `Identifikasi Masalah (Problem Statement): Murid merumuskan pertanyaan eksplorasi terbimbing.`,
      `Pengumpulan Data (Data Collection): Murid mengeksplorasi sumber belajar yang bervariasi secara mandiri maupun berpasangan.`,
      `Pengolahan Data & Pembuktian: Murid mengolah data hasil temuan dan menguji kebenaran hipotesis awal tentang "${materi}".`,
      `Menarik Kesimpulan: Murid merumuskan kesimpulan umum materi dengan bimbingan guru.`
    ];
  } else {
    sintaksKegiatanInti = [
      `Eksplorasi Konsep: Guru menyampaikan apersepsi materi "${materi}" yang disesuaikan dengan tingkat kesiapan murid [${kondisi}].`,
      `Diskusi & Kolaborasi: Murid bekerja dalam kelompok interaktif membedah contoh dan latihan materi "${materi}".`,
      `Praktik & Aplikasi: Murid mengerjakan lembar kerja berdiferensiasi sesuai tingkat pemahaman.`,
      `Umpan Balik Langsung: Guru memberikan apresiasi dan penguatan terhadap hasil kerja murid.`
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
