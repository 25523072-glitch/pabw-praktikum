<script setup>
import { state, pilihKategori } from '../state.js'
import { aturUlang, simpan } from '../storage.js'

const kategori = [
  { nilai: 'semua', label: 'Semua' },
  { nilai: 'web', label: 'Web' },
  { nilai: 'desain', label: 'Desain' },
  { nilai: 'kerja', label: 'Kerja' },
  { nilai: 'data', label: 'Data' },
]

function aturUlangPilihan() {
  aturUlang()
  state.kategoriAktif = 'semua'
  simpan(state)
}
</script>

<template>
  <div id="filter">
    <button
      v-for="k in kategori"
      :key="k.nilai"
      type="button"
      :class="{ aktif: state.kategoriAktif === k.nilai }"
      :aria-pressed="String(state.kategoriAktif === k.nilai)"
      @click="pilihKategori(k.nilai)"
    >
      {{ k.label }}
    </button>
    
    <button id="tombol-reset" type="button" @click="aturUlangPilihan">
      Atur ulang
    </button>
  </div>
</template>