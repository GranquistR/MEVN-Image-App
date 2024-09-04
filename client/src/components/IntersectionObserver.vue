<template>
  <div ref="observerTarget">
    <slot> </slot>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, onUnmounted } from 'vue'

const intersecting = ref(false)
const observerTarget = ref()

const model = defineModel()

let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    intersecting.value = entries[0].isIntersecting
  })

  if (observerTarget.value) {
    observer.observe(observerTarget.value)
  }
})

onUnmounted(() => {
  if (observer && observerTarget.value) {
    observer.unobserve(observerTarget.value)
  }
})

watch(intersecting, (value) => {
  model.value = value
})
</script>
