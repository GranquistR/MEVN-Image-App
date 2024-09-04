<template>
  <div
    class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
  >
    <FileUpload ref="files" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1048576">
      <template #header="{ files, chooseCallback, clearCallback }">
        <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
          <div class="flex gap-2">
            <Button
              @click="chooseCallback()"
              icon="pi pi-images"
              rounded
              outlined
              :disabled="files.length > 0"
            ></Button>

            <Button
              @click="clearCallback()"
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              :disabled="!files || files.length === 0"
            ></Button>
          </div>
        </div>
      </template>

      <template #empty>
        <div class="flex align-items-center justify-content-center flex-column">
          <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
          <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
        </div>
      </template>
    </FileUpload>
  </div>
</template>
<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import { watch, ref } from 'vue'

const files = ref() // Initialize your variable here

const model = defineModel()

watch(
  () => files.value && files.value.files,
  (newFiles) => {
    if (newFiles) {
      model.value = newFiles[0]
    }
  },
  {
    deep: true
  }
)
</script>
<style scoped>
.p-fileupload {
  width: 100%;
}
</style>
