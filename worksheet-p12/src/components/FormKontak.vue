<script setup>
import { reactive, computed, ref } from 'vue'
import { aturan } from '../validasi.js'

const nilai = reactive({ nama: '', email: '', nim: '', pesan: '' })
const disentuh = reactive({ nama: false, email: false, nim: false, pesan: false })
const sudahMengetik = ref(false)
const status = ref('')

const galat = computed(() =>
  Object.fromEntries(Object.keys(aturan).map((k) => [k, aturan[k](nilai[k])]))
)
const semuaSah = computed(() => Object.values(galat.value).every((g) => g === ''))
const nonaktif = computed(() => sudahMengetik.value && !semuaSah.value)
const tampil = (k) => disentuh[k] && galat.value[k] !== ''

function bersihkan() {
  for (const k of Object.keys(nilai)) {
    nilai[k] = ''
    disentuh[k] = false
  }
  sudahMengetik.value = false
}

function kirim() {
  for (const k of Object.keys(disentuh)) disentuh[k] = true
  if (!semuaSah.value) {
    const pertama = Object.keys(aturan).find((k) => galat.value[k] !== '')
    document.getElementById(pertama)?.focus()
    status.value = ''
    return
  }
  status.value = 'Pesan terkirim. Terima kasih!'
  bersihkan()
}
</script>

<template>
  <form id="form-kontak" action="#" method="post" novalidate @submit.prevent="kirim">
    <fieldset>
      <legend>Data pengirim</legend>

      <p class="form-kolom">
        <label for="nama">NAMA</label>
        <input id="nama" v-model="nilai.nama" name="nama" type="text"
               autocomplete="name" aria-describedby="nama-galat" required
               :aria-invalid="tampil('nama') ? 'true' : null"
               @input="sudahMengetik = true" @blur="disentuh.nama = true">
        <span id="nama-galat" class="pesan-galat" :class="{ tampil: tampil('nama') }"
              role="alert">{{ galat.nama }}</span>
      </p>

      <p class="form-kolom">
        <label for="email">EMAIL</label>
        <input id="email" v-model="nilai.email" name="email" type="email"
               autocomplete="email" aria-describedby="email-galat" required
               :aria-invalid="tampil('email') ? 'true' : null"
               @input="sudahMengetik = true" @blur="disentuh.email = true">
        <span id="email-galat" class="pesan-galat" :class="{ tampil: tampil('email') }"
              role="alert">{{ galat.email }}</span>
      </p>

      <p class="form-kolom">
        <label for="nim">NIM</label>
        <input id="nim" v-model="nilai.nim" name="nim" type="text" inputmode="numeric"
               pattern="[0-9]{8}" aria-describedby="nim-bantuan nim-galat" required
               :aria-invalid="tampil('nim') ? 'true' : null"
               @input="sudahMengetik = true" @blur="disentuh.nim = true">
        <span id="nim-bantuan" class="teks-bantu">Delapan digit angka, contoh 25523072</span>
        <span id="nim-galat" class="pesan-galat" :class="{ tampil: tampil('nim') }"
              role="alert">{{ galat.nim }}</span>
      </p>

      <p class="form-kolom">
        <label for="pesan">PESAN</label>
        <textarea id="pesan" v-model="nilai.pesan" name="pesan" rows="4"
                  aria-describedby="pesan-galat" required
                  :aria-invalid="tampil('pesan') ? 'true' : null"
                  @input="sudahMengetik = true" @blur="disentuh.pesan = true"></textarea>
        <span id="pesan-galat" class="pesan-galat" :class="{ tampil: tampil('pesan') }"
              role="alert">{{ galat.pesan }}</span>
      </p>

      <button type="submit" :disabled="nonaktif">KIRIM</button>
    </fieldset>
    <p id="status-form" role="status">{{ status }}</p>
  </form>
</template>