<script setup>
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import { profil } from './data.js'
</script>

<template>
  <KepalaProfil :profil="profil" />
  <TombolFilter />
</template>