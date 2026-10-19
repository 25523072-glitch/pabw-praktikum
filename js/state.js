import { daftarProyek } from "./data.js";
import { render } from "./dom.js";
import { simpan, aturUlang as hapusSimpanan } from "./storage.js";

export const state = {
  kategoriAktif: "semua",
  daftarProyek: daftarProyek,
};

export function pilihKategori(kategori) {
  state.kategoriAktif = kategori;
  simpan(state); 
  render(state);
}

export function resetState() {
  hapusSimpanan();
  state.kategoriAktif = "semua";
  render(state);
}