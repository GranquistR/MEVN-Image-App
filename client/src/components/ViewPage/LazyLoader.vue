<template>
  <IntersectionObserver v-model="intersected">
    <div class="flex justify-content-around px-6">
      <Skeleton width="32%" height="30rem" class="m-2"></Skeleton>
      <Skeleton width="32%" height="30rem" class="m-2"></Skeleton>
      <Skeleton width="32%" height="30rem" class="m-2"></Skeleton>
    </div>
  </IntersectionObserver>
</template>
<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
import IntersectionObserver from '../IntersectionObserver.vue'
import { ref, watch } from 'vue'
const intersected = ref(false)
const model = defineModel()

watch(intersected, (value) => {
  model.value = value
})
</script>
