// ---------- LEMBAR B — data halaman sebagai variabel ----------------

// Daftar keahlian
const daftarKeahlian = [
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

// Daftar proyek: array of object.

const daftarProyek = [
  {
    judul: "Proyek Hako Tjeria",
    deskripsi: "Membangun aplikasi untuk mengatur stok bahan baku.",
    label: "Proyek kelompok",
    tahun: 2026,
    selesai: true,
    sorotan: true,
  },
  {
    judul: "Proyek UI/UX Figma",
    deskripsi: "Merancang antarmuka dan alur tampilan aplikasi.",
    label: "Desain",
    tahun: 2026,
    selesai: true,
    sorotan: false,
  },
  {
    judul: "Proyek operasional Buzzlive",
    deskripsi:
      "Koordinasi live dan evaluasi pelanggaran untuk membantu " +
      "mengurangi violation TikTok.",
    label: "Pekerjaan",
    tahun: 2026,
    selesai: false, 
    sorotan: false,
  },
];

// Identitas: satu object
const profil = {
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

// ---------- LEMBAR C — fungsi murni ---------------------------------

// 1. Menyusun kalimat perkenalan dari satu object
function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

// 2. Merapikan daftar keahlian menjadi satu baris teks
const formatKeahlian = (daftar, pemisah = " · ") => daftar.join(pemisah);

// 3 & 4. Pembuat potongan HTML (juga murni: hanya mengembalikan teks)
const buatKartuProyek = ({ judul, deskripsi, label, sorotan }) => `
        <article class="kartu${sorotan ? " sorotan" : ""}">
          <h3>${judul}</h3>
          <p>${deskripsi}</p>
          <div class="kartu-kaki">
            <span class="label">${label}</span>
            <a href="#keterampilan">Keterampilan terkait</a>
          </div>
        </article>`;

const buatItemKeahlian = ({ nama, deskripsi }) =>
  `<dt>${nama}</dt><dd>${deskripsi}</dd>`;

// ---------- LEMBAR D — mengolah array -------------------------------

// map: array baru, panjang sama (object -> potongan HTML)
const htmlKartu = daftarProyek.map(buatKartuProyek).join("");
const htmlKeahlian = daftarKeahlian.map(buatItemKeahlian).join("");

// filter: array baru, bisa lebih pendek
const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai);

// find: SATU isi pertama yang cocok, atau undefined
const proyekFigma = daftarProyek.find(
  (proyek) => proyek.judul === "Proyek UI/UX Figma"
);

// Mengurutkan harus pada SALINAN — sort mengubah array aslinya.
const proyekUrut = [...daftarProyek].sort((a, b) =>
  a.judul.localeCompare(b.judul)
);

// ---------- Tampilkan ke halaman ------------------------------------

// Mengambil elemen; bila tidak ada, jelaskan di Console (bukan diam saja)
function ambil(selector) {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    console.error(`Elemen "${selector}" tidak ditemukan di profil.html`);
  }
  return elemen;
}

function isiHalaman() {
  document.title = `${profil.nama} — PABW 2026/2027`;

  const daftarIsi = [
    ["header.kepala h1", "textContent", profil.nama],
    [".tagline", "textContent", profil.tagline],
    ["dl.keterampilan", "innerHTML", htmlKeahlian],
    [".galeri", "innerHTML", htmlKartu],
    [
      "footer.kaki p",
      "innerHTML",
      `${profil.nama} · ${profil.nim} · ` +
        `<time datetime="${profil.tahun}">${profil.tahun}</time>`,
    ],
  ];

  for (const [selector, properti, nilai] of daftarIsi) {
    const elemen = ambil(selector);
    if (elemen !== null) {
      elemen[properti] = nilai;
    }
  }
}

isiHalaman();

// ---------- Pemeriksaan di Console (bukti Lembar B, C, D, E) --------

function periksaData() {
  console.log("== B: sintaks dan tipe ==");
  console.log(typeof profil.nama, typeof profil.jumlahProyek); // string number
  console.log(`${profil.nama} belajar ${profil.keahlian.length} hal.`);
  console.log("alamat aman:", profil.alamat?.kota ?? "belum diisi");
  console.log("0 ?? 'x' =", 0 ?? "x", "| 0 || 'x' =", 0 || "x");
  console.log("'1' + 1 =", "1" + 1, "| Number('1') + 1 =", Number("1") + 1);

  console.log("== C: fungsi murni ==");
  console.log(buatPerkenalan(profil));
  console.log(buatPerkenalan({ nama: "Ayu", peran: "mahasiswa" }));
  console.log(formatKeahlian(profil.keahlian));
  console.log(formatKeahlian(["HTML", "CSS"], " / "));

  console.log("== D: array methods ==");
  console.table(profil.keahlian);
  console.table(daftarProyek);
  console.table(proyekSelesai);
  console.log("find ada:", proyekFigma);
  console.log(
    "find tidak ada:",
    daftarProyek.find((proyek) => proyek.judul === "Tidak Ada")
  );
  console.log(
    "map sama panjang:",
    daftarProyek.map((p) => p.judul).length === daftarProyek.length
  );
  console.log(
    "urutan asli utuh:",
    daftarProyek[0].judul === "Proyek Hako Tjeria",
    "| urutan salinan:",
    proyekUrut.map((p) => p.judul)
  );

  console.log("== Salinan dangkal ==");
  const salinan = { ...profil };
  salinan.nama = "NAMA UJI";
  console.log("asli tetap:", profil.nama); 
}

periksaData();
