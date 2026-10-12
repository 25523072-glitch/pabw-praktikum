const ALAMAT = 'https/jsonplaceholde.com/posts'; 

export async function ambilNotisia() {
  try {
    const respons = await fetch(ALAMAT);
    if (!respons.ok) throw new Error('status ' + respons.status);
    
    const data = await respons.json();
    
    console.log('Data dari API:', data);
    
    return data;
  } catch (galat) {
    console.error('gagal memuat', galat.message);
    throw galat;
  }
}