<script setup>
import { ref } from 'vue'

const form = ref(null)
const nama = ref('')
const email = ref('')
const nim = ref('')
const pesan = ref('')

const galatNama = ref('')
const galatEmail = ref('')
const galatPesan = ref('')
const status = ref('')

function kirim() {
  const el = form.value.elements
  galatNama.value = el.nama.validationMessage
  galatEmail.value = el.email.validationMessage
  galatPesan.value = el.pesan.validationMessage

  if (!form.value.checkValidity()) {
    status.value = 'Periksa kembali kolom yang bertanda.'
    return
  }
  nama.value = ''
  email.value = ''
  nim.value = ''
  pesan.value = ''
  status.value = 'Pesan terkirim.'
}
</script>

<template>
  <form id="form-kontak" ref="form" action="#" method="post" novalidate @submit.prevent="kirim">
    <fieldset>
      <legend>Data pengirim</legend>

      <p class="form-kolom">
        <label for="nama">NAMA</label>
        <input id="nama" v-model="nama" name="nama" type="text"
               autocomplete="name" aria-describedby="nama-galat" required>
        <span id="nama-galat" class="pesan-galat" role="alert">{{ galatNama }}</span>
      </p>

      <p class="form-kolom">
        <label for="email">EMAIL</label>
        <input id="email" v-model="email" name="email" type="email"
               autocomplete="email" aria-describedby="email-galat" required>
        <span id="email-galat" class="pesan-galat" role="alert">{{ galatEmail }}</span>
      </p>

      <p class="form-kolom">
        <label for="nim">NIM</label>
        <input id="nim" v-model="nim" name="nim" type="text" inputmode="numeric"
               pattern="[0-9]{8}" aria-describedby="nim-bantuan nim-galat" required>
        <span id="nim-bantuan" class="teks-bantu">Delapan digit angka, contoh 25523072</span>
        <span id="nim-galat" class="pesan-galat" role="alert">Periksa lagi: NIM harus berupa angka sesuai jumlah digit yang diminta.</span>
      </p>

      <p class="form-kolom">
        <label for="pesan">PESAN</label>
        <textarea id="pesan" v-model="pesan" name="pesan" rows="4"
                  aria-describedby="pesan-galat" required></textarea>
        <span id="pesan-galat" class="pesan-galat" role="alert">{{ galatPesan }}</span>
      </p>

      <button type="submit">KIRIM</button>
    </fieldset>
    <p id="status-form" role="status">{{ status }}</p>
  </form>
</template>