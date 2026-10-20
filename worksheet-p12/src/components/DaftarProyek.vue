<script setup>
import { computed } from 'vue'
import { state } from '../state.js'
import { profil } from '../data.js'

const tampil = computed(() =>
  state.kategoriAktif === 'semua'
    ? state.daftarProyek
    : state.daftarProyek.filter((p) => p.kategori === state.kategoriAktif)
)
</script>

<template>
  <ul id="daftar" class="galeri" :aria-label="`Proyek ${profil.nama}`">
    <li
      v-for="proyek in tampil"
      :key="proyek.id"
      class="kartu"
      :class="{ sorotan: proyek.sorotan }"
      :data-kategori="proyek.kategori"
    >
      <h3>{{ proyek.judul }}</h3>
      <p>{{ proyek.deskripsi }}</p>
      <div class="kartu-kaki">
        <span class="label">{{ proyek.label }}</span>
        <a href="#keterampilan">Keterampilan terkait</a>
      </div>
    </li>
  </ul>
  <p v-if="tampil.length === 0" id="pesan-kosong">Tidak ada proyek pada kategori itu.</p>
</template>