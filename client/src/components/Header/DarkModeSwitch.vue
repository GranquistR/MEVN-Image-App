<template>
  <div class="flex align-content-center align-items-center">
    <InputSwitch v-model="checked" class="ml-4" />
    <i :class="checked ? 'pi pi-sun ml-2' : 'pi pi-moon ml-2'"></i>
  </div>
</template>
<script setup lang="ts">
import InputSwitch from 'primevue/inputswitch'
import { ref, watch } from 'vue'
import { usePrimeVue } from 'primevue/config'

const PrimeVue = usePrimeVue()
const checked = ref(false)

watch(checked, () => {
  if (checked.value)
    PrimeVue.changeTheme('aura-dark-green', 'aura-light-green', 'theme-link', () => {})
  else PrimeVue.changeTheme('aura-light-green', 'aura-dark-green', 'theme-link', () => {})
})
</script>
