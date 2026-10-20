<script setup>
import { onMounted, watch } from 'vue'
import { state } from './state.js'
import { muat, simpan } from './storage.js'
import { profil, daftarKeahlian } from './data.js'
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

onMounted(() => {
  const isi = muat()
  if (isi) state.kategoriAktif = isi.kategoriAktif
})

watch(state, (nilai) => simpan(nilai), { deep: true })
</script>

<template>
  <a class="lewati" href="#utama">Lewati ke konten utama</a>

  <KepalaProfil :profil="profil" />

  <div class="isi">
    <aside class="sisi">
      <nav class="menu-samping" aria-label="Di halaman ini">
        <h2>Di halaman ini</h2>
        <ul>
          <li><a href="#tentang">Tentang saya</a></li>
          <li><a href="#karya">Karya saya</a></li>
          <li><a href="#kontak">Hubungi saya</a></li>
          <li><a href="#lini-masa">Perjalanan saya</a></li>
          <li><a href="#keterampilan">Keterampilan</a></li>
          <li><a href="#tanya-jawab">Tanya jawab</a></li>
        </ul>
      </nav>
    </aside>

    <main id="utama" class="utama">

      <section id="tentang">
        <h2>Tentang saya</h2>

        <figure class="foto">
          <img src="/media/foto-profil.jpg" alt="foto saya"
               width="480" height="480" loading="lazy">
          <figcaption>Foto profil </figcaption>
        </figure>

        <p>Saya Danis Setiyawan, mahasiswa Program Studi Informatika Universitas Islam Indonesia.
          Sebelumnya saya belajar TKJ dan tertarik pada jaringan komputer, lalu memperluas minat
          ke pengembangan web, UI/UX, Java, dan data science. Saat ini saya sedang memperkuat
          kemampuan front-end, CSS, pemrograman, dan jaringan sambil mengembangkan pengalaman kerja
          sebagai Host Coordinator Buzzlive</p>

        <div class="tabel-bungkus">
          <table>
            <caption>Kegiatan yang saya ikuti semester ini</caption>
            <thead>
              <tr>
                <th scope="col">Kegiatan</th>
                <th scope="col">Peran</th>
                <th scope="col">Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Praktikum PABW</th>
                <td>Peserta</td>
                <td><time datetime="2026-09">September 2026</time></td>
              </tr>
              <tr>
                <th scope="row">Sistem Jaringan Dan Komputer</th>
                <td>Belajar</td>
                <td><time datetime="2026-10">September 2026</time></td>
              </tr>
              <tr>
                <th scope="row">Mencari Lomba/ seminar tentang program IT</th>
                <td>Peserta</td>
                <td><time datetime="2026">2026</time></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="karya">
        <h2>Karya saya</h2>
        <TombolFilter />
        <DaftarProyek />
      </section>

      <section id="kontak">
        <h2>Hubungi saya</h2>
        <p>Isi formulir berikut. Semua kolom bertanda wajib harus diisi.</p>
        <FormKontak />
      </section>

      <section id="lini-masa">
        <h2>Perjalanan saya</h2>
        <ol class="lini">
          <li><time datetime="2022-07">Juli 2022</time> - mulai menempuh pendidikan di SMK pada bidang Teknik Komputer dan Jaringan (TKJ)</li>
          <li><time datetime="2025-08">Agustus 2025</time> - melanjutkan pendidikan di Program Studi Informatika, Universitas Islam Indonesia</li>
          <li><time datetime="2026-02">Februari 2026</time> - mulai mendapatkan pengalaman kerja part-time sebagai Host Coordinator dan Live Host di Buzzlive</li>
        </ol>
      </section>

      <section id="keterampilan">
        <h2>Keterampilan</h2>
        <dl class="keterampilan">
          <template v-for="k in daftarKeahlian" :key="k.nama">
            <dt>{{ k.nama }}</dt>
            <dd>{{ k.deskripsi }}</dd>
          </template>
        </dl>
      </section>

      <section id="tanya-jawab">
        <h2>Tanya jawab</h2>

        <details>
          <summary>Apa yang membuat saya tertarik pada dunia teknologi?</summary>
          <p>Sejak belajar di jurusan TKJ saat SMK, saya mulai tertarik pada komputer dan jaringan. Ketertarikan tersebut terus berkembang hingga saya memilih melanjutkan studi di bidang Informatika</p>
        </details>

        <details>
          <summary>Mengapa saya memilih Informatika?</summary>
          <p>Saya ingin memperluas pengetahuan yang sebelumnya saya pelajari di bidang jaringan ke bidang lain seperti pemrograman, pengembangan web, UI/UX, dan data science</p>
        </details>

        <details>
          <summary>Apa yang sedang saya kembangkan saat ini?</summary>
          <p>Saya sedang membangun portofolio pribadi di linkedln dan memperdalam kemampuan pemrograman serta mengembangkan keterampilan di bidang web dan jaringan komputer</p>
        </details>
      </section>

    </main>
  </div>

  <footer class="kaki">
    <p>{{ profil.nama }} · {{ profil.nim }} · {{ profil.tahun }}</p>
  </footer>
</template>