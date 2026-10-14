import { profil, htmlKeahlian } from "./data.js";

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#pesan-kosong");
const barisFilter = document.querySelector("#filter");
const form = document.querySelector("#form-kontak");
const tombolKirim = document.querySelector('#form-kontak button[type="submit"]');
const kolom = Array.from(
  document.querySelectorAll("#form-kontak input, #form-kontak textarea")
);

function ambil(selector) {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    console.error(`Elemen "${selector}" tidak ditemukan di profil.html`);
  }
  return elemen;
}

export function isiHalaman() {
  document.title = `${profil.nama} — PABW 2026/2027`;

  const daftarIsi = [
    ["header.kepala h1", "textContent", profil.nama],
    [".tagline", "textContent", profil.tagline],
    ["dl.keterampilan", "innerHTML", htmlKeahlian],
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

  if (wadah) wadah.setAttribute("aria-label", `Proyek ${profil.nama}`);
}

export function buatKartu(proyek) {
  const li = document.createElement("li");
  li.className = "kartu";
  li.classList.toggle("sorotan", proyek.sorotan);
  li.dataset.kategori = proyek.kategori;

  const judul = document.createElement("h3");
  judul.textContent = proyek.judul;

  const deskripsi = document.createElement("p");
  deskripsi.textContent = proyek.deskripsi;

  const kaki = document.createElement("div");
  kaki.className = "kartu-kaki";

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = proyek.label;

  const tautan = document.createElement("a");
  tautan.href = "#keterampilan";
  tautan.textContent = "Keterampilan terkait";

  kaki.append(label, tautan);
  li.append(judul, deskripsi, kaki);
  return li;
}

export function saring(state) {
  if (state.kategoriAktif === "semua") return state.daftarProyek;
  return state.daftarProyek.filter(
    (proyek) => proyek.kategori === state.kategoriAktif
  );
}

export function render(state) {
  if (!wadah) return;
  wadah.textContent = "";

  const tampil = saring(state);

  if (tampil.length === 0) {
    if (kosong) kosong.hidden = false;
    return;
  }
  if (kosong) kosong.hidden = true;

  const fragmen = document.createDocumentFragment();
  tampil.forEach((proyek) => fragmen.append(buatKartu(proyek)));
  wadah.append(fragmen);

  if (barisFilter) {
    barisFilter.querySelectorAll("button").forEach((tombol) => {
      const aktif = tombol.dataset.kategori === state.kategoriAktif;
      tombol.classList.toggle("aktif", aktif);
      tombol.setAttribute("aria-pressed", String(aktif));
    });
  }
}

// Validasi Form
export const periksaNama = (nilai) => {
  const teks = nilai.trim();
  if (teks === "") return "Nama belum diisi. Tulis nama lengkap Anda.";
  if (teks.length < 3) return "Nama terlalu pendek. Tulis minimal 3 huruf.";
  return "";
};

export const periksaEmail = (nilai) => {
  const teks = nilai.trim();
  if (teks === "") return "Email belum diisi. Contoh yang benar: nama@contoh.com.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teks)) {
    return "Email belum sah. Pakai bentuk nama@contoh.com, tanpa spasi.";
  }
  return "";
};

export const periksaNim = (nilai) => {
  const teks = nilai.trim();
  if (teks === "") return "NIM belum diisi. Tulis delapan digit angka, contoh 25523072.";
  if (!/^[0-9]{8}$/.test(teks)) {
    return "NIM harus tepat delapan digit angka, tanpa huruf atau spasi.";
  }
  return "";
};

export const periksaPesan = (nilai) => {
  const teks = nilai.trim();
  if (teks === "") return "Pesan masih kosong. Tulis isi pesan Anda.";
  if (teks.length < 10) return "Pesan terlalu singkat. Tulis minimal 10 karakter.";
  return "";
};

const aturan = { nama: periksaNama, email: periksaEmail, nim: periksaNim, pesan: periksaPesan };
const semuaSah = () => kolom.every((k) => aturan[k.id](k.value) === "");

export function periksaKolom(k) {
  const pesanGalat = aturan[k.id](k.value);
  const tampil = pesanGalat !== "" && k.dataset.disentuh === "ya";
  const tempatPesan = k.closest(".form-kolom")?.querySelector(".pesan-galat");

  if (tempatPesan) {
    tempatPesan.textContent = pesanGalat !== "" ? pesanGalat : "";
    tempatPesan.classList.toggle("tampil", tampil);
  }
  if (tampil) {
    k.setAttribute("aria-invalid", "true");
  } else {
    k.removeAttribute("aria-invalid");
  }
  return pesanGalat === "";
}

export const perbaruiTombol = () => {
  if (tombolKirim) tombolKirim.disabled = !semuaSah();
};

export function bersihkanForm() {
  if (!form) return;
  form.reset();
  kolom.forEach((k) => {
    delete k.dataset.disentuh;
    periksaKolom(k);
  });
  if (tombolKirim) tombolKirim.disabled = false;
}