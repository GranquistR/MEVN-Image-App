<template>
  <div class="flex flex-column-reverse sm:flex-row">
    <TagSearchCard v-model="filterTags" />
    <div class="spacer"></div>
    <div class="w-full">
      <ImageGridDisplay
        :filter="filterTags"
        ref="ImageDisplay"
        @reachedEnd="reachedEnd = true"
        @loadedMore="continueLoading()"
      />
      <LazyLoader v-model="hitBottom" v-if="!reachedEnd"></LazyLoader>
    </div>
  </div>
</template>
<script setup lang="ts">
import ImageGridDisplay from '@/components/ViewPage/ImageGridDisplay.vue'
import TagSearchCard from '@/components/Tags/TagSearchCard.vue'
import LazyLoader from '@/components/ViewPage/LazyLoader.vue'

import { ref, watch } from 'vue'

const filterTags = ref<string[]>([])
const hitBottom = ref(false)
const ImageDisplay = ref()
const reachedEnd = ref(false)

watch(hitBottom, (value) => {
  if (value) {
    ImageDisplay.value.loadMore()
  }
})

function continueLoading() {
  if (hitBottom.value) {
    ImageDisplay.value.loadMore()
  }
}
</script>
<style scoped></style>
