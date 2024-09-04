<template>
  <Stepper linear>
    <StepperPanel header="Select your Image">
      <template #content="{ nextCallback }">
        <FileUploadStep v-model="imageFile"></FileUploadStep>
        <div class="flex pt-4 justify-content-between">
          <Button
            label="Cancel"
            icon="pi pi-ban"
            iconPos="right"
            @click="Quit()"
            severity="secondary"
          />

          <Button
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="
              (event) => {
                nextCallback(event)
                parseFileToBase64()
              }
            "
            :disabled="imageFile === null || imageFile === undefined"
          />
        </div>
      </template>
    </StepperPanel>
    <StepperPanel header="Details">
      <template #content="{ prevCallback, nextCallback }">
        <div class="flex flex-column">
          <div
            class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
          >
            <Splitter class="w-full">
              <SplitterPanel class="flex align-items-center justify-content-center">
                <TagSearchCard :uploadPage="true" v-model="userUpload.tags" />
              </SplitterPanel>
              <SplitterPanel class="flex align-items-center justify-content-center">
                <Card class="w-full flex justify-content-center align-items-center">
                  <template #title>Details</template>
                  <template #subtitle>Add more information about your image!</template>
                  <template #content>
                    <div class="flex flex-column gap-2">
                      <label for="Title">Title</label>
                      <InputText v-model="userUpload.title" id="Title" />
                    </div>
                    <div class="flex flex-column gap-2 mt-2">
                      <label for="Description">Description</label>
                      <Textarea
                        v-model="userUpload.description"
                        id="Description"
                        rows="5"
                        cols="30"
                      />
                    </div>
                  </template>
                </Card>
              </SplitterPanel>
            </Splitter>
          </div>
        </div>
        <div class="flex pt-4 justify-content-between">
          <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
          <Button
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="nextCallback"
            :disabled="!validDetails"
          />
        </div>
      </template>
    </StepperPanel>
    <StepperPanel header="Confirm">
      <template #content="{ prevCallback }">
        <div class="flex flex-column">
          <div
            class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
          >
            <Splitter class="w-full">
              <SplitterPanel class="flex align-items-center justify-content-center">
                <Image :src="userUpload.image" alt="Post Image" preview height="500" />
              </SplitterPanel>
              <SplitterPanel class="flex align-items-center justify-content-center">
                <Card class="w-full">
                  <template #title>Confirm</template>
                  <template #subtitle>Check if everything is correct!</template>
                  <template #content>
                    <div class="grid confirm">
                      <div class="col-6">
                        <label for="Title">Title</label>
                      </div>
                      <div class="col-6">
                        <span>{{ userUpload.title }}</span>
                      </div>

                      <div class="col-6">
                        <label for="Description">Description</label>
                      </div>

                      <div class="col-6">
                        <span>{{ userUpload.description }}</span>
                      </div>

                      <div class="col-6">
                        <label for="Tags">Tags</label>
                      </div>

                      <div class="col-6">
                        <span>{{ userUpload.tags.join(', ') }}</span>
                      </div>
                    </div>
                  </template>
                </Card>
              </SplitterPanel>
            </Splitter>
          </div>
        </div>
        <div class="flex pt-4 justify-content-between">
          <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
          <Button
            label="Upload"
            icon="pi pi-cloud-upload"
            iconPos="right"
            @click="Submit()"
            :loading="loading"
          />
        </div>
      </template>
    </StepperPanel>
  </Stepper>
</template>
<script setup lang="ts">
//prime vue
import Stepper from 'primevue/stepper'
import StepperPanel from 'primevue/stepperpanel'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Image from 'primevue/image'

//custom components
import TagSearchCard from '@/components/Tags/TagSearchCard.vue'
import FileUploadStep from './FileUploadStep.vue'

//entities
import Upload from '@/entities/Upload'
import FetchAPIService from '@/services/FetchAPIService'

//vue
import router from '@/router'
import { ref, computed } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const validDetails = computed(() => {
  return userUpload.value.title.length > 0 && userUpload.value.description.length > 0
})

const userUpload = ref<Upload>(new Upload('-1', '', '', ''))
const imageFile = ref<File>()
const success = ref(false)
const loading = ref(false)

function parseFileToBase64() {
  if (imageFile.value) {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      userUpload.value.image = reader.result as string
    })

    reader.readAsDataURL(imageFile.value)
  }
}

function Submit() {
  loading.value = true
  FetchAPIService.post('/image', userUpload.value)
    .then((response) => {
      if (response.success) {
        success.value = true
        router.push('/')
      } else {
        alert('Failed to upload image')
      }
    })
    .catch((error) => {
      alert('Failed to upload image')
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
}

function Quit() {
  success.value = true
  router.push('/')
}

onBeforeRouteLeave((to, from, next) => {
  if (from.name === 'upload' && !success.value) {
    if (imageFile.value) {
      if (!confirm('Are you sure you want to leave?')) {
        next(false)
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }
})
</script>
<style scoped>
.confirm span {
  color: var(--text-color-secondary);
  margin-left: 1rem;
}
</style>
