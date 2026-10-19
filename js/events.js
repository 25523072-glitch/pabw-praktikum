import { pilihKategori, resetState } from "./state.js";
import { periksaKolom, perbaruiTombol, bersihkanForm } from "./dom.js";

const barisFilter = document.querySelector("#filter");
const form = document.querySelector("#form-kontak");
const statusForm = document.querySelector("#status-form");
const kolom = Array.from(
  document.querySelectorAll("#form-kontak input, #form-kontak textarea")
);

export function pasangFilter() {
  if (!barisFilter) return;
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol || !barisFilter.contains(tombol)) return;

    const kategori = tombol.dataset.kategori || "semua";
    pilihKategori(kategori);
  });
}

export function pasangForm() {
  if (!form) return;
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
      if (statusForm) statusForm.textContent = "";
      pertamaSalah.focus();
      return;
    }

    const nama = form.elements.nama.value.trim();
    bersihkanForm();
    if (statusForm) statusForm.textContent = `Terima kasih, ${nama}. Isian Anda sudah lengkap.`;
  });
}

export function pasangReset() {
  const tombolReset = document.querySelector("#tombol-reset");
  if (tombolReset) {
    tombolReset.addEventListener("click", () => {
      resetState();
    });
  }
}

export function pasangPendengar() {
  pasangFilter();
  pasangForm();
  pasangReset();
}