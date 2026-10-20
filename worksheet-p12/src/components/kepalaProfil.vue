<script setup>
const props = defineProps({
  profil: { type: Object, required: true },
})
</script>

<template>
  <header class="kepala">
    <div class="header-teks">
      <h1>{{ props.profil.nama }}</h1>
      <p class="tagline">{{ props.profil.tagline }}</p>
    </div>
    <div class="header-aksi">
      <nav aria-label="Navigasi utama">
        <ul>
          <li><a href="#tentang">Tentang</a></li>
          <li><a href="#karya">Karya</a></li>
          <li><a href="#kontak">Kontak</a></li>
        </ul>
      </nav>
      <input type="checkbox" id="tema" class="pengalih-tema">
      <label for="tema" class="tombol-tema">
        <span aria-hidden="true">🌓</span> Tema gelap
      </label>
    </div>
  </header>
</template>