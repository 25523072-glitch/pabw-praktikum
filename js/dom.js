import { daftarProyek, profil } from "./app.js";

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#pesan-kosong");
const barisFilter = document.querySelector("#filter");
const form = document.querySelector("#form-kontak");
const tombolKirim = document.querySelector('#form-kontak button[type="submit"]');
const statusForm = document.querySelector("#status-form");
const kolom = Array.from(
  document.querySelectorAll("#form-kontak input, #form-kontak textarea")
);

function buatKartu(proyek) {
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

function render(daftar) {
  wadah.textContent = ""; 

  if (daftar.length === 0) {
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const fragmen = document.createDocumentFragment();
  daftar.forEach((proyek) => fragmen.append(buatKartu(proyek)));
  wadah.append(fragmen);
}


function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle("aktif", aktif); // tampilan diatur CSS (.aktif)
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

function pasangFilter() {
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol || !barisFilter.contains(tombol)) return;

    const kategori = tombol.dataset.kategori;
    const terpilih = daftarProyek.filter(
      (proyek) => kategori === "semua" || proyek.kategori === kategori
    );

    tandaiTombolAktif(tombol);
    render(terpilih);

    console.log(`filter "${kategori}": ${terpilih.length} proyek`);
  });
}

const periksaNama = (nilai) => {
  const teks = nilai.trim();
  if (teks === "") return "Nama belum diisi. Tulis nama lengkap Anda.";
  if (teks.length < 3) return "Nama terlalu pendek. Tulis minimal 3 huruf.";
  return "";
};

const periksaEmail = (nilai) => {
  const teks = nilai.trim();
  if (teks === "") return "Email belum diisi. Contoh yang benar: nama@contoh.com.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teks)) {
    return "Email belum sah. Pakai bentuk nama@contoh.com, tanpa spasi.";
  }
  return "";
};

const periksaNim = (nilai) => {
  const teks = nilai.trim();
  if (teks === "") return "NIM belum diisi. Tulis delapan digit angka, contoh 25523072.";
  if (!/^[0-9]{8}$/.test(teks)) {
    return "NIM harus tepat delapan digit angka, tanpa huruf atau spasi.";
  }
  return "";
};

const periksaPesan = (nilai) => {
  const teks = nilai.trim();
  if (teks === "") return "Pesan masih kosong. Tulis isi pesan Anda.";
  if (teks.length < 10) return "Pesan terlalu singkat. Tulis minimal 10 karakter.";
  return "";
};

const aturan = {
  nama: periksaNama,
  email: periksaEmail,
  nim: periksaNim,
  pesan: periksaPesan,
};

const semuaSah = () => kolom.every((k) => aturan[k.id](k.value) === "");

function periksaKolom(k) {
  const pesanGalat = aturan[k.id](k.value);
  const tampil = pesanGalat !== "" && k.dataset.disentuh === "ya";
  const tempatPesan = k.closest(".form-kolom").querySelector(".pesan-galat");

  tempatPesan.textContent = pesanGalat !== "" ? pesanGalat : "";
  tempatPesan.classList.toggle("tampil", tampil);
  if (tampil) {
    k.setAttribute("aria-invalid", "true");
  } else {
    k.removeAttribute("aria-invalid");
  }
  return pesanGalat === "";
}

const perbaruiTombol = () => {
  tombolKirim.disabled = !semuaSah();
};

function bersihkanForm() {
  form.reset();
  kolom.forEach((k) => {
    delete k.dataset.disentuh;
    periksaKolom(k);
  });
  tombolKirim.disabled = false; 
}

function pasangForm() {
  form.addEventListener("input", (event) => {
    if (!kolom.includes(event.target)) return;
    periksaKolom(event.target);
    perbaruiTombol();
  });

  form.addEventListener("focusout", (event) => {
    if (!kolom.includes(event.target)) return;
    event.target.dataset.disentuh = "ya";
    periksaKolom(event.target);
    perbaruiTombol();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    kolom.forEach((k) => {
      k.dataset.disentuh = "ya";
    });
    const hasil = kolom.map(periksaKolom); 

    const pertamaSalah = kolom.find((k, indeks) => !hasil[indeks]);
    if (pertamaSalah) {
      statusForm.textContent = "";
      pertamaSalah.focus(); 
    }

    const nama = form.elements.nama.value.trim();
    bersihkanForm();
    statusForm.textContent = `Terima kasih, ${nama}. Isian Anda sudah lengkap.`;
  });
}

function mulai() {
  wadah.setAttribute("aria-label", `Proyek ${profil.nama}`);
  render(daftarProyek); 
  pasangFilter(); 
  pasangForm();
}

const diperiksa = {
  "#daftar": wadah,
  "#pesan-kosong": kosong,
  "#filter": barisFilter,
  "#form-kontak": form,
  "tombol KIRIM": tombolKirim,
  "#status-form": statusForm,
  "kolom form": kolom.length > 0 ? kolom : null,
};
const hilang = Object.keys(diperiksa).filter((nama) => diperiksa[nama] === null);

if (hilang.length > 0) {
  console.error(
    `dom.js berhenti: elemen tidak ditemukan -> ${hilang.join(", ")}. ` +
      "Bandingkan penulisannya dengan id/class di panel Elements."
  );
} else {
  mulai();
}
