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

export const aturan = {
  nama: periksaNama,
  email: periksaEmail,
  nim: periksaNim,
  pesan: periksaPesan,
};