export interface RPPFormData {
  namaSekolah: string;
  mataPelajaranCategory: string;
  mataPelajaran: string;
  customMataPelajaran?: string;
  faseKelas: string;
  materiPokok: string;
  alokasiWaktu: string;
  modelPembelajaran: string;
  customModelPembelajaran?: string;
  
  // Fitur Tambahan Kurikulum Merdeka
  profilPancasila: string[];
  targetPesertaDidik: string;
  modePembelajaran: string;
  saranaPrasarana: string;
  namaGuru: string;
  nipGuru?: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah?: string;
  tanggalPembuatan?: string;
  tahunAjaran: string;
  semester: string;
}

export interface RPPContent {
  id: string;
  createdAt: string;
  formData: RPPFormData;
  
  // Section I: Informasi Umum
  informasiUmum: {
    sekolah: string;
    mapel: string;
    faseKelas: string;
    materi: string;
    alokasiWaktu: string;
    modelPembelajaran: string;
    profilPancasila: string[];
    targetPesertaDidik: string;
    modePembelajaran: string;
    saranaPrasarana: string;
    guru: string;
    nipGuru?: string;
    kepalaSekolah: string;
    nipKepalaSekolah?: string;
    tanggalPembuatan?: string;
  };

  // Section II: Inti Perencanaan Pembelajaran
  intiPerencanaan: {
    capaianPembelajaran: string;
    caraMencapaiTujuan: string;
    caraMenilaiHasilBelajar: string;
  };

  // Dokumen Perencanaan Pembelajaran
  dokumenPerencanaan: {
    tujuanPembelajaran: string[];
    langkahPembelajaran: {
      pendahuluan: string[];
      kegiatanInti: string[];
      penutup: string[];
    };
    penilaianAsesmen: {
      diagnostik: string;
      formatif: string;
      sumatif: string;
      instrumen: string[];
    };
  };

  // Prinsip Utama
  prinsipUtama: {
    berkesadaran: string;
    bermakna: string;
    menggembirakan: string;
  };

  isAiGenerated?: boolean;
}
