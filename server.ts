import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Route for AI-Enriched RPP Generation
  app.post('/api/generate-rpp-ai', async (req, res) => {
    try {
      const formData = req.body;
      if (!formData || !formData.namaSekolah || !formData.mataPelajaran || !formData.materiPokok) {
        return res.status(400).json({ error: 'Data formulir tidak lengkap.' });
      }

      const ai = getAiClient();

      const prompt = `
Anda adalah seorang konsultan Kurikulum Merdeka dan pakar pedagogi pendidikan Indonesia.
Buatkan Modul Ajar / RPP Kurikulum Merdeka yang sangat detail, profesional, dan kaya materi dalam bahasa Indonesia berdasarkan data berikut:
- Nama Sekolah: ${formData.namaSekolah}
- Mata Pelajaran: ${formData.mataPelajaran === 'Lainnya (Tentukan Sendiri)' ? formData.customMataPelajaran : formData.mataPelajaran}
- Fase / Kelas: ${formData.faseKelas}
- Materi Pokok: ${formData.materiPokok}
- Alokasi Waktu: ${formData.alokasiWaktu}
- Model Pembelajaran: ${formData.modelPembelajaran === 'Lainnya (Sebutkan Kustom)' ? formData.customModelPembelajaran : formData.modelPembelajaran}
- Profil Pelajar Pancasila: ${formData.profilPancasila?.join(', ') || 'Bernalar Kritis, Gotong Royong'}
- Target Peserta Didik: ${formData.targetPesertaDidik || 'Reguler'}
- Mode Pembelajaran: ${formData.modePembelajaran || 'Tatap Muka'}
- Sarana Prasarana: ${formData.saranaPrasarana || 'Media Pembelajaran Standar'}
- Nama Guru: ${formData.namaGuru || 'Pendidik'}
- Kepala Sekolah: ${formData.namaKepalaSekolah || 'Kepala Sekolah'}

Kembalikan hasil dalam format JSON persis sesuai struktur berikut:
{
  "capaianPembelajaran": "Penjelasan Capaian Pembelajaran resmi dan spesifik untuk materi ini",
  "caraMencapaiTujuan": "Strategi dan alur pedagogis berbasis model pembelajaran yang dipilih",
  "caraMenilaiHasilBelajar": "Metode asesmen autentik diagnostik, formatif, dan sumatif",
  "tujuanPembelajaran": [
    "Tujuan Pembelajaran 1 (spesifik, terukur, dan mengacu SKL/Standar Isi)",
    "Tujuan Pembelajaran 2",
    "Tujuan Pembelajaran 3"
  ],
  "langkahPendahuluan": [
    "Langkah 1 Pendahuluan (Orientasi, Apersepsi, Motivasi)",
    "Langkah 2 Pendahuluan"
  ],
  "langkahKegiatanInti": [
    "Sintaks 1 sesuai Model Pembelajaran...",
    "Sintaks 2...",
    "Sintaks 3...",
    "Sintaks 4..."
  ],
  "langkahPenutup": [
    "Refleksi murid dan umpan balik",
    "Tindak lanjut dan penutup"
  ],
  "asesmenDiagnostik": "Detail asesmen awal/diagnostik",
  "asesmenFormatif": "Detail asesmen proses/formatif",
  "asesmenSumatif": "Detail asesmen akhir/sumatif",
  "instrumenAsesmen": [
    "Instrumen 1",
    "Instrumen 2",
    "Instrumen 3"
  ],
  "prinsipBerkesadaran": "Penerapan prinsip berkesadaran dalam kegiatan ini",
  "prinsipBermakna": "Penerapan prinsip bermakna kontekstual",
  "prinsipMenggembirakan": "Penerapan suasana belajar menggembirakan"
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              capaianPembelajaran: { type: Type.STRING },
              caraMencapaiTujuan: { type: Type.STRING },
              caraMenilaiHasilBelajar: { type: Type.STRING },
              tujuanPembelajaran: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              langkahPendahuluan: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              langkahKegiatanInti: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              langkahPenutup: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              asesmenDiagnostik: { type: Type.STRING },
              asesmenFormatif: { type: Type.STRING },
              asesmenSumatif: { type: Type.STRING },
              instrumenAsesmen: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              prinsipBerkesadaran: { type: Type.STRING },
              prinsipBermakna: { type: Type.STRING },
              prinsipMenggembirakan: { type: Type.STRING },
            },
            required: [
              'capaianPembelajaran', 'caraMencapaiTujuan', 'caraMenilaiHasilBelajar',
              'tujuanPembelajaran', 'langkahPendahuluan', 'langkahKegiatanInti',
              'langkahPenutup', 'asesmenDiagnostik', 'asesmenFormatif', 'asesmenSumatif'
            ]
          }
        }
      });

      const aiText = response.text || '';
      const parsedData = JSON.parse(aiText);

      const finalMapel = formData.mataPelajaran === 'Lainnya (Tentukan Sendiri)' 
        ? (formData.customMataPelajaran || 'Mata Pelajaran Kustom')
        : formData.mataPelajaran;

      const finalModel = formData.modelPembelajaran === 'Lainnya (Sebutkan Kustom)'
        ? (formData.customModelPembelajaran || 'Model Pembelajaran Kustom')
        : formData.modelPembelajaran;

      const resultRPP = {
        id: `rpp-ai-${Date.now()}`,
        createdAt: new Date().toLocaleDateString('id-ID', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }),
        formData,
        informasiUmum: {
          sekolah: formData.namaSekolah,
          mapel: finalMapel,
          faseKelas: formData.faseKelas,
          materi: formData.materiPokok,
          alokasiWaktu: formData.alokasiWaktu,
          modelPembelajaran: finalModel,
          profilPancasila: formData.profilPancasila || [],
          targetPesertaDidik: formData.targetPesertaDidik || 'Peserta didik reguler',
          modePembelajaran: formData.modePembelajaran || 'Tatap Muka',
          saranaPrasarana: formData.saranaPrasarana || 'Media Pembelajaran Standar',
          guru: formData.namaGuru || 'Pendidik',
          kepalaSekolah: formData.namaKepalaSekolah || 'Kepala Sekolah'
        },
        intiPerencanaan: {
          capaianPembelajaran: parsedData.capaianPembelajaran,
          caraMencapaiTujuan: parsedData.caraMencapaiTujuan,
          caraMenilaiHasilBelajar: parsedData.caraMenilaiHasilBelajar
        },
        dokumenPerencanaan: {
          tujuanPembelajaran: parsedData.tujuanPembelajaran,
          langkahPembelajaran: {
            pendahuluan: parsedData.langkahPendahuluan,
            kegiatanInti: parsedData.langkahKegiatanInti,
            penutup: parsedData.langkahPenutup
          },
          penilaianAsesmen: {
            diagnostik: parsedData.asesmenDiagnostik,
            formatif: parsedData.asesmenFormatif,
            sumatif: parsedData.asesmenSumatif,
            instrumen: parsedData.instrumenAsesmen || []
          }
        },
        prinsipUtama: {
          berkesadaran: parsedData.prinsipBerkesadaran || 'Murid memahami tujuan belajar dan mampu mengatur diri.',
          bermakna: parsedData.prinsipBermakna || 'Pembelajaran kontekstual dan dapat diterapkan dalam kehidupan nyata.',
          menggembirakan: parsedData.prinsipMenggembirakan || 'Proses belajar positif, menantang, menyenangkan, dan memotivasi.'
        },
        isAiGenerated: true
      };

      res.json({ success: true, rpp: resultRPP });
    } catch (err: any) {
      console.error('Error generating AI RPP:', err);
      res.status(500).json({ 
        error: err.message || 'Gagal membuat RPP dengan AI. Menggunakan template fallback.' 
      });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
