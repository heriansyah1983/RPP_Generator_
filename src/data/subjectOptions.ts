export interface SubjectCategory {
  categoryName: string;
  subjects: string[];
}

export const MAPEL_CATEGORIES: SubjectCategory[] = [
  {
    categoryName: "Mata Pelajaran Wajib",
    subjects: [
      "Pendidikan Agama dan Budi Pekerti",
      "Pendidikan Pancasila (pengganti PPKn)",
      "Bahasa Indonesia",
      "Matematika",
      "IPAS (Ilmu Pengetahuan Alam dan Sosial)",
      "PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)"
    ]
  },
  {
    categoryName: "Mata Pelajaran Seni dan Budaya",
    subjects: [
      "Seni Rupa",
      "Seni Musik",
      "Seni Teater atau Seni Tari (pilihan sekolah)"
    ]
  },
  {
    categoryName: "Mata Pelajaran Pilihan",
    subjects: [
      "Bahasa Inggris",
      "Muatan Lokal (seperti bahasa daerah)"
    ]
  },
  {
    categoryName: "Lainnya",
    subjects: [
      "Lainnya (Tentukan Sendiri)"
    ]
  }
];

export const FASE_KELAS_OPTIONS = [
  { value: "Fase A: Kelas 1 dan Kelas 2", label: "Fase A: Kelas 1 dan Kelas 2 (SD)" },
  { value: "Fase B: Kelas 3 dan Kelas 4", label: "Fase B: Kelas 3 dan Kelas 4 (SD)" },
  { value: "Fase C: Kelas 5 dan Kelas 6", label: "Fase C: Kelas 5 dan Kelas 6 (SD)" },
  { value: "Fase D: Kelas 7, 8, dan 9", label: "Fase D: Kelas 7, 8, dan 9 (SMP)" },
  { value: "Fase E: Kelas 10", label: "Fase E: Kelas 10 (SMA/SMK)" },
  { value: "Fase F: Kelas 11 dan 12", label: "Fase F: Kelas 11 dan 12 (SMA/SMK)" },
];

export const MODEL_PEMBELAJARAN_OPTIONS = [
  "Problem Based Learning (PBL)",
  "Project Based Learning (PjBL)",
  "Discovery Learning",
  "Inquiry Learning",
  "Cooperative Learning",
  "Contextual Teaching and Learning (CTL)",
  "Direct Instruction (Pembelajaran Langsung)",
  "Lainnya (Sebutkan Kustom)"
];

export const PROFIL_PELAJAR_PANCASILA_OPTIONS = [
  "Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia",
  "Berkebinekaan Global",
  "Gotong Royong",
  "Mandiri",
  "Bernalar Kritis",
  "Kreatif"
];

export const TARGET_PESERTA_OPTIONS = [
  "Peserta didik reguler/tipikal",
  "Peserta didik dengan kesulitan belajar",
  "Peserta didik dengan pencapaian tinggi",
  "Peserta didik inklusif / beragam"
];

export const MODE_PEMBELAJARAN_OPTIONS = [
  "Tatap Muka (Luring)",
  "Pembelajaran Jarak Jauh (Daring)",
  "Blended Learning (Kombinasi)"
];

export const KONDISI_DIAGNOSTIK_OPTIONS = [
  "Reguler / Tipikal (Kesiapan Belajar Rata-rata & Homogen)",
  "Diferensiasi Gaya Belajar (Variatif: Visual, Auditori, Kinestetik)",
  "Diferensiasi Kesiapan (Sebagian Siswa Perlu Bimbingan Khusus / Scaffolding)",
  "Diferensiasi Minat & Bakat (Tinggi Kreativitas & Proyek Mandiri)",
  "Heterogen Inklusif (Pencapaian Lambat, Sedang, hingga Cepat)",
  "Kondisi Awal Belajar Rendah (Perlu Orientasi Konsep Prasyarat Konkrit)"
];
