<template>
  <Panel :class="{ borderless: uploadPage }" class="h-fit">
    <div :class="uploadPage ? 'flex flex-column align-items-center' : ''">
      <div v-if="uploadPage" class="font-bold w-17rem">Select tags relevant to your image</div>
      <div v-else class="font-bold w-12rem">Select tags to search by</div>

      <div :class="{ centered: uploadPage }">
        <div class="mt-1 mr-1">Tags:</div>
        <div v-for="tag in tags" :key="tag" class="p-1">
          <Tag
            :severity="selectedTags.includes(tag) ? 'primary' : 'secondary'"
            :value="tag"
            @click="select(tag)"
            style="cursor: pointer"
            rounded
          ></Tag>
        </div>
      </div>
    </div>
  </Panel>
</template>
<script setup lang="ts">
import Panel from 'primevue/panel'
import Tag from 'primevue/tag'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
// import TagSearch from './TagSearch.vue'

const selectedTags = ref<string[]>([])
const selectedText = ref<string>('')
const model = defineModel()

defineProps<{
  uploadPage?: boolean
}>()

const tags = [
  'nature',
  'biking',
  'russel',
  'food',
  'self',
  'water',
  'game',
  'fancy',
  'interesting',
  'funny',
  'coop',
  'wow',
  'fishing',
  'family',
  'steamboat'
]

const select = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
  selectedText.value = selectedTags.value.join(' ')
  model.value = selectedTags.value
}
</script>
<style scoped>
.borderless {
  border: none !important;
}
.centered {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  max-width: 20rem;
  display: flex;
  flex-wrap: wrap;
}
</style>
