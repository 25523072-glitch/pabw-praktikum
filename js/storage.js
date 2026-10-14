const KUNCI = "pabw-p11";
const VERSI = 2; 

export function simpan(state) {
  try {
    const isi = {
      versi: VERSI,
      kategoriAktif: state.kategoriAktif,
    };
    localStorage.setItem(KUNCI, JSON.stringify(isi));
  } catch (e) {
    console.error("Gagal menyimpan ke localStorage:", e);
  }
}

export function muat(state) {
  try {
    const raw = localStorage.getItem(KUNCI);
    if (!raw) return null;

    const isi = JSON.parse(raw);

    if (!isi || typeof isi !== "object" || isi.versi !== VERSI) {
      console.warn("Versi skema tidak cocok. Simpanan dibersihkan.");
      localStorage.removeItem(KUNCI);
      return null;
    }

    if (isi.kategoriAktif) {
      state.kategoriAktif = isi.kategoriAktif;
    }
    return isi;
  } catch (e) {

    console.error("Data simpanan rusak. Memulihkan ke nilai bawaan.", e);
    localStorage.removeItem(KUNCI);
    return null;
  }
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
}