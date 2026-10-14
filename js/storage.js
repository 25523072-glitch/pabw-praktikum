const KUNCI = "pabw-p11";
const VERSI = 2;

export function simpan(state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: state.kategoriAktif,
  };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

export function muat(state) {
  try {
    const raw = localStorage.getItem(KUNCI);
    if (!raw) return null;

    const isi = JSON.parse(raw);
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI);
      return null;
    }

    if (isi.kategoriAktif) {
      state.kategoriAktif = isi.kategoriAktif;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI);
    return null;
  }
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
}