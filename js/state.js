import { daftarProyek } from "./data.js";
import { render } from "./dom.js";

export const state = {
  kategoriAktif: "semua",
  daftarProyek: daftarProyek,
};

export function pilihKategori(kategori) {
  state.kategoriAktif = kategori;
  render(state); 
}