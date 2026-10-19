export const daftarKeahlian = [
  {
    nama: "Jaringan komputer",
    deskripsi:
      "Memiliki dasar dari pembelajaran TKJ dan pengalaman teknisi WiFi, " +
      "serta sedang memperdalam materi jaringan di perkuliahan",
  },
  {
    nama: "UI/UX",
    deskripsi:
      "Pernah mengerjakan proyek perancangan antarmuka menggunakan Figma " +
      "dan mempelajari dasar proses UI/UX",
  },
  {
    nama: "Komunikasi dan Kerja Sama Tim",
    deskripsi:
      "Terbiasa bekerja dalam tim, berkomunikasi dengan berbagai pihak, " +
      "dan menyelesaikan tugas sesuai target yang telah ditentukan",
  },
];

export const daftarProyek = [
  {
    id: 1,
    judul: "Proyek Hako Tjeria",
    deskripsi: "Membangun aplikasi untuk mengatur stok bahan baku.",
    label: "Proyek kelompok",
    kategori: "web",
    tahun: 2026,
    selesai: true,
    sorotan: true,
  },
  {
    id: 2,
    judul: "Proyek UI/UX Figma",
    deskripsi: "Merancang antarmuka dan alur tampilan aplikasi.",
    label: "Desain",
    kategori: "desain",
    tahun: 2026,
    selesai: true,
    sorotan: false,
  },
  {
    id: 3,
    judul: "Proyek operasional Buzzlive",
    deskripsi:
      "Koordinasi live dan evaluasi pelanggaran untuk membantu " +
      "mengurangi violation TikTok.",
    label: "Pekerjaan",
    kategori: "kerja",
    tahun: 2026,
    selesai: false,
    sorotan: false,
  },
];

export const profil = {
  nama: "DANIS SETIYAWAN",
  nim: "25523072",
  peran: "Mahasiswa Informatika Universitas Islam Indonesia",
  tagline:
    "Informatics Undergraduate Student at Universitas Islam Indonesia | " +
    "Host Coordinator at Buzzlive | Network Technician | Digital Business",
  tahun: 2026,
  keahlian: daftarKeahlian.map((k) => k.nama), 
  jumlahProyek: daftarProyek.length, 
};

export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar, pemisah = " · ") => daftar.join(pemisah);

const buatItemKeahlian = ({ nama, deskripsi }) =>
  `<dt>${nama}</dt><dd>${deskripsi}</dd>`;

export const htmlKeahlian = daftarKeahlian.map(buatItemKeahlian).join("");