<template>
  <div class="flex">
    <AutoComplete
      v-model="selectedTags"
      :suggestions="filteredTags"
      @complete="search"
      emptySearchMessage=""
    />
    <Button v-if="!uploadPage" label="Search" :disabled="!validSearch" class="ml-2" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import Button from 'primevue/button'

const selectedTags = ref<string[]>([])
const filteredTags = ref<string[]>([])
const validSearch = ref(true)

const props = defineProps<{
  tags: string[]
  uploadPage?: boolean
}>()

const search = (event: any) => {
  //lowercase tags
  const loweredTags = props.tags.map((tag: string) => tag.toLowerCase())

  //get selected tag query
  let tagsValue: string[] = event.query
    .split(' ')
    .filter((tag: string) => tag !== '')
    .map((tag: string) => tag.toLowerCase())

  //check if all selected tags are in items
  validSearch.value = tagsValue.every((tag: string) => loweredTags.includes(tag))

  let numIncompleteTags = tagsValue.filter((tag: string) => !loweredTags.includes(tag)).length
  if (numIncompleteTags == 1) {
    //get that tag
    let incompleteTag = tagsValue.filter((tag: string) => !loweredTags.includes(tag))[0]
    console.log(incompleteTag)
    //get suggestions
    filteredTags.value = loweredTags.filter((tag: string) => tag.startsWith(incompleteTag))
  } else {
    filteredTags.value = []
  }
}

watch(selectedTags, () => {
  if (selectedTags.value.length === 0) {
    validSearch.value = true
  }
})
</script>

<style>
div:has(.p-autocomplete-empty-message) {
  visibility: hidden;
}
</style>
