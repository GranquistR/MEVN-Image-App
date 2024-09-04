<template>
  <div class="flex flex-wrap justify-content-center justify-items-left w-full">
    <div v-for="post in posts" :key="post.id">
      <Image
        class="p-2"
        :src="post.image"
        alt="Post Image"
        preview
        width="500"
        v-if="post.tags.some((tag) => filter.includes(tag)) || filter.length === 0"
      >
        <template #preview="slotProps">
          <div>
            <img
              :src="post.image"
              alt="preview"
              :style="slotProps.style"
              @click="slotProps.onClick"
            />
          </div>

          <Dialog
            :closable="false"
            v-model:visible="visible"
            :header="post.title"
            :style="{ width: '25rem' }"
            position="right"
          >
            <div class="ml-1">
              <div class="font-bold mt-1">Description:</div>
              <div class="ml-3">
                {{ post.description }}
              </div>
              <div class="font-bold mt-1">Tags:</div>

              <div class="ml-2">
                <Tag
                  v-for="tag in post.tags"
                  :key="tag"
                  class="m-1"
                  :value="tag"
                  severity="primary"
                ></Tag>
              </div>
            </div>
          </Dialog>
        </template>
      </Image>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Upload from '@/entities/Upload'
import Dialog from 'primevue/dialog'
import Image from 'primevue/image'
import FetchAPIService from '@/services/FetchAPIService'
import Tag from 'primevue/tag'

const pageSize = 6
const posts = ref<Upload[]>([])
const visible = ref(true)
const pageNumber = ref(0)
const reachedEnd = ref(false)

defineProps<{
  filter: string[]
}>()

defineExpose({ loadMore })

const emits = defineEmits(['reachedEnd', 'loadedMore'])

function fetchPosts() {
  FetchAPIService.get(`/image?page=${pageNumber.value}&limit=${pageSize}`).then(
    (response: Upload[]) => {
      posts.value.push(...response)
      if (response.length < pageSize) {
        reachedEnd.value = true
        emits('reachedEnd')
      }
      setTimeout(() => {
        emits('loadedMore')
      }, 1000)
    }
  )
}

function loadMore() {
  if (!reachedEnd.value) {
    pageNumber.value++
    fetchPosts()
  }
}
</script>
