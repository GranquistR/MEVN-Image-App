<template>
  <div class="flex justify-content-around header align-content-center">
    <div class="text-center title">My <span class="vue">Vue 3</span> Image App</div>
    <div class="pt-1 flex">
      <RouterLink to="/" class="p-2">
        <Button label="View Images" severity="primary" text class="" />
      </RouterLink>
      <RouterLink to="/upload" class="p-2">
        <Button label="Upload Image" severity="primary" text class="" />
      </RouterLink>
      <DarkModeSwitch />
    </div>
  </div>
  <div class="spacer"></div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import DarkModeSwitch from '@/components/Header/DarkModeSwitch.vue'
import { RouterLink } from 'vue-router'
</script>
<style scoped>
.vue {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.title {
  font-size: 2em;
  font-weight: bold;
}

.header {
  border-bottom: solid 1px var(--surface-200);
  position: fixed;
  background: var(--surface-0);
  z-index: 5;
  width: 100vw;
}
.spacer {
  height: 49px;
  background-color: red;
}
</style>
