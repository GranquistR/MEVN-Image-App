<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderBar from './components/Header/HeaderBar.vue'
</script>

<template>
  <HeaderBar />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}
</style>
