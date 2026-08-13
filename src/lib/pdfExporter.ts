import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPdf(elementId: string, fileName: string = 'RPP_Kurikulum_Merdeka.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element RPP tidak ditemukan.');
  }

  // Clone or capture element with clean styling for canvas
  const canvas = await html2canvas(element, {
    scale: 2, // High DPI resolution
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: 1200,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth - 20; // 10mm margins on left/right
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 10; // Top margin

  pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
  heightLeft -= (pdfHeight - 20);

  while (heightLeft > 0) {
    position = heightLeft - imgHeight + 10;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - 20);
  }

  pdf.save(fileName);
}

export function copyRPPAsText(rpp: any): string {
  const text = `
==================================================
  MODUL AJAR / RPP KURIKULUM MERDEKA
==================================================

I. INFORMASI UMUM
● Sekolah            : ${rpp.informasiUmum.sekolah}
● Mata Pelajaran     : ${rpp.informasiUmum.mapel}
● Fase / Kelas       : ${rpp.informasiUmum.faseKelas}
● Materi Pokok       : ${rpp.informasiUmum.materi}
● Alokasi Waktu      : ${rpp.informasiUmum.alokasiWaktu}
● Model Pembelajaran : ${rpp.informasiUmum.modelPembelajaran}
● Profil Pancasila   : ${rpp.informasiUmum.profilPancasila.join(', ')}
● Target Peserta     : ${rpp.informasiUmum.targetPesertaDidik}
● Mode Pembelajaran  : ${rpp.informasiUmum.modePembelajaran}
● Sarana & Prasarana : ${rpp.informasiUmum.saranaPrasarana}
● Kondisi Siswa      : ${rpp.informasiUmum.kondisiDiagnostikSiswa || 'Reguler'}

--------------------------------------------------
II. INTI PERENCANAAN PEMBELAJARAN
--------------------------------------------------
● Capaian Pembelajaran:
  ${rpp.intiPerencanaan.capaianPembelajaran}

● Cara Mencapai Tujuan:
  ${rpp.intiPerencanaan.caraMencapaiTujuan}

● Cara Menilai Hasil Belajar:
  ${rpp.intiPerencanaan.caraMenilaiHasilBelajar}

--------------------------------------------------
DOKUMEN PERENCANAAN PEMBELAJARAN
--------------------------------------------------
1. TUJUAN PEMBELAJARAN
${rpp.dokumenPerencanaan.tujuanPembelajaran.map((tp: string, i: number) => `   ${i + 1}. ${tp}`).join('\n')}

2. LANGKAH PEMBELAJARAN
   A. Pendahuluan:
${rpp.dokumenPerencanaan.langkahPembelajaran.pendahuluan.map((step: string) => `      - ${step}`).join('\n')}

   B. Kegiatan Inti:
${rpp.dokumenPerencanaan.langkahPembelajaran.kegiatanInti.map((step: string) => `      - ${step}`).join('\n')}

   C. Penutup:
${rpp.dokumenPerencanaan.langkahPembelajaran.penutup.map((step: string) => `      - ${step}`).join('\n')}

3. PENILAIAN / ASESMEN
   - Diagnostik: ${rpp.dokumenPerencanaan.penilaianAsesmen.diagnostik}
   - Formatif  : ${rpp.dokumenPerencanaan.penilaianAsesmen.formatif}
   - Sumatif   : ${rpp.dokumenPerencanaan.penilaianAsesmen.sumatif}

   Instrumen Penilaian:
${rpp.dokumenPerencanaan.penilaianAsesmen.instrumen.map((ins: string) => `   * ${ins}`).join('\n')}

--------------------------------------------------
PRINSIP UTAMA PERENCANAAN
--------------------------------------------------
● ${rpp.prinsipUtama.berkesadaran}
● ${rpp.prinsipUtama.bermakna}
● ${rpp.prinsipUtama.menggembirakan}

==================================================
Mengetahui,                               Pendidik,
Kepala Sekolah


(${rpp.informasiUmum.kepalaSekolah})       (${rpp.informasiUmum.guru})
`;

  return text;
}

export function exportToDoc(rpp: any, fileName: string = 'RPP_Kurikulum_Merdeka.doc'): void {
  const htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${rpp.informasiUmum.mapel} - RPP Kurikulum Merdeka</title>
  <style>
    @page WordSection1 {
      size: 21.0cm 29.7cm;
      margin: 2.0cm 2.0cm 2.0cm 2.0cm;
    }
    div.WordSection1 {
      page: WordSection1;
    }
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #000000;
    }
    .header-box {
      border-bottom: 2px solid #000000;
      padding-bottom: 8px;
      margin-bottom: 20px;
      text-align: center;
    }
    .header-box h2 {
      font-size: 16pt;
      font-weight: bold;
      margin: 0;
      text-transform: uppercase;
    }
    .header-box h3 {
      font-size: 13pt;
      font-weight: bold;
      margin: 4px 0 0 0;
      color: #333333;
    }
    .header-box p {
      font-size: 10pt;
      font-style: italic;
      margin: 4px 0 0 0;
      color: #666666;
    }
    .section-header {
      background-color: #f2f2f2;
      border-left: 4px solid #059669;
      padding: 6px 10px;
      font-weight: bold;
      font-size: 11pt;
      text-transform: uppercase;
      margin-top: 18px;
      margin-bottom: 12px;
    }
    table.info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
    }
    table.info-table td {
      padding: 4px 6px;
      vertical-align: top;
      font-size: 11pt;
    }
    td.label-col {
      width: 180px;
      font-weight: bold;
    }
    td.colon-col {
      width: 15px;
      text-align: center;
    }
    .sub-title {
      font-weight: bold;
      margin-top: 12px;
      margin-bottom: 4px;
      font-size: 11pt;
    }
    ul, ol {
      margin-top: 4px;
      margin-bottom: 12px;
      padding-left: 24px;
    }
    li {
      margin-bottom: 4px;
    }
    .principle-box {
      background-color: #f9f9f9;
      border: 1px solid #e5e5e5;
      padding: 10px;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    table.signature-table {
      width: 100%;
      margin-top: 40px;
      border-collapse: collapse;
      page-break-inside: avoid;
    }
    table.signature-table td {
      width: 50%;
      text-align: center;
      vertical-align: top;
      padding: 0 10px;
    }
    table.signature-table p {
      margin: 2px 0;
    }
  </style>
</head>
<body>
  <div class="WordSection1">
    <div class="header-box">
      <h2>PERENCANAAN PEMBELAJARAN / RPP</h2>
      <h3>KURIKULUM MERDEKA</h3>
      <p>${rpp.informasiUmum.sekolah} • Dibuat pada: ${rpp.createdAt}</p>
    </div>

    <div class="section-header">I. INFORMASI UMUM</div>
    <table class="info-table">
      <tr>
        <td class="label-col">● Sekolah</td>
        <td class="colon-col">:</td>
        <td>${rpp.informasiUmum.sekolah}</td>
      </tr>
      <tr>
        <td class="label-col">● Mata Pelajaran</td>
        <td class="colon-col">:</td>
        <td><b>${rpp.informasiUmum.mapel}</b></td>
      </tr>
      <tr>
        <td class="label-col">● Fase / Kelas</td>
        <td class="colon-col">:</td>
        <td>${rpp.informasiUmum.faseKelas}</td>
      </tr>
      <tr>
        <td class="label-col">● Materi Pokok</td>
        <td class="colon-col">:</td>
        <td><b>${rpp.informasiUmum.materi}</b></td>
      </tr>
      <tr>
        <td class="label-col">● Alokasi Waktu</td>
        <td class="colon-col">:</td>
        <td>${rpp.informasiUmum.alokasiWaktu}</td>
      </tr>
      <tr>
        <td class="label-col">● Model Pembelajaran</td>
        <td class="colon-col">:</td>
        <td>${rpp.informasiUmum.modelPembelajaran}</td>
      </tr>
      <tr>
        <td class="label-col">● Profil Pelajar Pancasila</td>
        <td class="colon-col">:</td>
        <td>${Array.isArray(rpp.informasiUmum.profilPancasila) ? rpp.informasiUmum.profilPancasila.join(', ') : rpp.informasiUmum.profilPancasila}</td>
      </tr>
      <tr>
        <td class="label-col">● Target Peserta Didik</td>
        <td class="colon-col">:</td>
        <td>${rpp.informasiUmum.targetPesertaDidik}</td>
      </tr>
      <tr>
        <td class="label-col">● Mode Pembelajaran</td>
        <td class="colon-col">:</td>
        <td>${rpp.informasiUmum.modePembelajaran}</td>
      </tr>
      <tr>
        <td class="label-col">● Sarana & Prasarana</td>
        <td class="colon-col">:</td>
        <td>${rpp.informasiUmum.saranaPrasarana}</td>
      </tr>
      ${rpp.informasiUmum.kondisiDiagnostikSiswa ? `
      <tr>
        <td class="label-col">● Kondisi Diagnostik Siswa</td>
        <td class="colon-col">:</td>
        <td><b>${rpp.informasiUmum.kondisiDiagnostikSiswa}</b></td>
      </tr>` : ''}
      <tr>
        <td class="label-col">● Tanggal Pembuatan RPP</td>
        <td class="colon-col">:</td>
        <td>${rpp.informasiUmum.tanggalPembuatan || rpp.formData?.tanggalPembuatan || '........................., ......................... 20...'}</td>
      </tr>
    </table>

    <div class="section-header">II. INTI PERENCANAAN PEMBELAJARAN</div>
    <div class="sub-title">1. Capaian Pembelajaran</div>
    <p>${rpp.intiPerencanaan.capaianPembelajaran}</p>

    <div class="sub-title">2. Cara Mencapai Tujuan Pembelajaran</div>
    <p>${rpp.intiPerencanaan.caraMencapaiTujuan}</p>

    <div class="sub-title">3. Cara Menilai Hasil Belajar</div>
    <p>${rpp.intiPerencanaan.caraMenilaiHasilBelajar}</p>

    <div class="section-header">III. DOKUMEN PERENCANAAN PEMBELAJARAN</div>
    <div class="sub-title">1. Tujuan Pembelajaran</div>
    <ol>
      ${rpp.dokumenPerencanaan.tujuanPembelajaran.map((tp: string) => `<li>${tp}</li>`).join('')}
    </ol>

    <div class="sub-title">2. Langkah-Langkah Pembelajaran</div>
    <p><b>A. Kegiatan Pendahuluan:</b></p>
    <ul>
      ${rpp.dokumenPerencanaan.langkahPembelajaran.pendahuluan.map((step: string) => `<li>${step}</li>`).join('')}
    </ul>

    <p><b>B. Kegiatan Inti (Sintaksis Model ${rpp.informasiUmum.modelPembelajaran}):</b></p>
    <ul>
      ${rpp.dokumenPerencanaan.langkahPembelajaran.kegiatanInti.map((step: string) => {
        let formattedStep = step;
        if (step.startsWith('[MEMAHAMI]')) {
          formattedStep = `<b>[TAHAP MEMAHAMI]</b> ${step.replace('[MEMAHAMI]', '').trim()}`;
        } else if (step.startsWith('[MENGAPLIKASIKAN]')) {
          formattedStep = `<b>[TAHAP MENGAPLIKASIKAN]</b> ${step.replace('[MENGAPLIKASIKAN]', '').trim()}`;
        } else if (step.startsWith('[MEREFLEKSIKAN]')) {
          formattedStep = `<b>[TAHAP MEREFLEKSIKAN]</b> ${step.replace('[MEREFLEKSIKAN]', '').trim()}`;
        }
        return `<li style="margin-bottom: 6px;">${formattedStep}</li>`;
      }).join('')}
    </ul>

    <p><b>C. Kegiatan Penutup:</b></p>
    <ul>
      ${rpp.dokumenPerencanaan.langkahPembelajaran.penutup.map((step: string) => `<li>${step}</li>`).join('')}
    </ul>

    <div class="sub-title">3. Penilaian / Asesmen</div>
    <table class="info-table">
      <tr>
        <td class="label-col">● Asesmen Diagnostik</td>
        <td class="colon-col">:</td>
        <td>${rpp.dokumenPerencanaan.penilaianAsesmen.diagnostik}</td>
      </tr>
      <tr>
        <td class="label-col">● Asesmen Formatif</td>
        <td class="colon-col">:</td>
        <td>${rpp.dokumenPerencanaan.penilaianAsesmen.formatif}</td>
      </tr>
      <tr>
        <td class="label-col">● Asesmen Sumatif</td>
        <td class="colon-col">:</td>
        <td>${rpp.dokumenPerencanaan.penilaianAsesmen.sumatif}</td>
      </tr>
    </table>

    <p><b>Instrumen & Pelaksanaan Penilaian:</b></p>
    <ul>
      ${rpp.dokumenPerencanaan.penilaianAsesmen.instrumen.map((ins: string) => `<li>${ins}</li>`).join('')}
    </ul>

    <div class="section-header">IV. PRINSIP UTAMA PERENCANAAN</div>
    <div class="principle-box">
      <p><b>● Berkesadaran:</b> ${rpp.prinsipUtama.berkesadaran}</p>
      <p><b>● Bermakna:</b> ${rpp.prinsipUtama.bermakna}</p>
      <p><b>● Menggembirakan:</b> ${rpp.prinsipUtama.menggembirakan}</p>
    </div>

    <table class="signature-table" style="width: 100%; margin-top: 40px; border-collapse: collapse; page-break-inside: avoid;">
      <tr>
        <td style="width: 50%; text-align: center; vertical-align: top; padding: 0 10px;">
          <p style="margin: 0; padding: 0; font-size: 11pt;">Mengetahui,</p>
          <p style="margin: 2px 0 0 0; padding: 0; font-size: 11pt; font-weight: bold;">Kepala Sekolah ${rpp.informasiUmum.sekolah}</p>
          <p style="margin: 0; padding: 0; height: 60px; line-height: 60px;">&nbsp;</p>
          <p style="margin: 0; padding: 0; font-size: 11pt; font-weight: bold;"><u>${rpp.informasiUmum.kepalaSekolah}</u></p>
          <p style="margin: 2px 0 0 0; padding: 0; font-size: 10pt; color: #333333;">NIP. ${rpp.informasiUmum.nipKepalaSekolah || rpp.formData?.nipKepalaSekolah || '........................................'}</p>
        </td>
        <td style="width: 50%; text-align: center; vertical-align: top; padding: 0 10px;">
          <p style="margin: 0; padding: 0; font-size: 11pt;">${rpp.informasiUmum.tanggalPembuatan || rpp.formData?.tanggalPembuatan || '........................., ......................... 20...'}</p>
          <p style="margin: 2px 0 0 0; padding: 0; font-size: 11pt; font-weight: bold;">Guru Mata Pelajaran</p>
          <p style="margin: 0; padding: 0; height: 60px; line-height: 60px;">&nbsp;</p>
          <p style="margin: 0; padding: 0; font-size: 11pt; font-weight: bold;"><u>${rpp.informasiUmum.guru}</u></p>
          <p style="margin: 2px 0 0 0; padding: 0; font-size: 10pt; color: #333333;">NIP. ${rpp.informasiUmum.nipGuru || rpp.formData?.nipGuru || '........................................'}</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff' + htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const cleanFilename = fileName.endsWith('.doc') ? fileName : `${fileName}.doc`;
  link.download = cleanFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

