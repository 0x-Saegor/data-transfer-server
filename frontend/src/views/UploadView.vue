<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { useTemplateRef, ref } from 'vue'
import { useContinuous } from '@/composables/continuous'
import UploadButton from '@/components/UploadButton.vue'
import ContinuousModal from '@/components/ContinuousModal.vue'

const customUpload = ref(1)
const units = ref('GB')
const { isContinuousRunningUpload, packetsUploaded, uploadSpeed, uploadTime } = useContinuous()
const dropZone = useTemplateRef('dropZoneRef')
const input = useTemplateRef('getFile')
const fileIsPresent = ref(false)

const { files, isOverDropZone } = useDropZone(dropZone, { onDrop: fileDropped })

/**
 * Called when a file is dropped into the drop area
 */
function fileDropped() {
  dropDetected()
}

/**
 * fileSelected is called when a file is choosen by clicking the
 * drop area and choosing a file in the context menu
 */
function fileSelected() {
  if (!input.value || !input.value.files) return

  files.value = input.value.files ? Array.from(input.value.files) : []
  dropDetected()
}

/**
 * Called whenever a file is dropped in the drop area or a file is selected in the context menu
 */
function dropDetected() {
  fileIsPresent.value = true
}

/**
 * Removes a files from the input and the dropZone files,
 */
function removeFile() {
  if (!input.value || !input.value.files) return

  fileIsPresent.value = false
  input.value.value = ''
  files.value = []
}
</script>
<template>
  <div class="md:ml-50 p-10 flex flex-col gap-5 ">
    <div class="flex flex-col">
      <p class="font-bold mb-5">Continuous Upload</p>
      <div
        class="upload w-full md:w-[85%] h-50 border flex flex-col justify-center items-center gap-3 cursor-pointer p-3 text-center"
        :class="{
          'bg-studio-200 border-solid rounded border-2 border-studio-500': isOverDropZone,
          'bg-green-200 border-solid rounded border-2 border-green-500': fileIsPresent,
          'border-dashed border-gray-600 border-1 bg-gray-200': !isOverDropZone && !fileIsPresent,
        }" ref="dropZoneRef" onclick="document.getElementById('getFile').click()">
        <p inert>
          {{
            files && files.length > 0 ? 'File name : ' + files[0].name : 'Déposez un fichier ici'
          }}
        </p>
        <img inert v-if="!fileIsPresent" src="../assets/upload.png" alt="Upload image" class="w-10 h-10" />
        <img inert v-else src="../assets/check.png" alt="Valid image" class="w-10 h-10" />
        <input inert type="file" class="hidden" id="getFile" @change="fileSelected()" ref="getFile" />
        <p inert class="text-center">Parcourir</p>
      </div>
      <div v-if="fileIsPresent" class="flex flex-col md:flex-row  gap-5 my-5">
        <UploadButton :size="0" unit="0" :file="files?.[0]" />
        <button class="px-2 py-1 bg-red-200 border-solid rounded border-2 border-red-700 w-50 d cursor-pointer"
          @click="removeFile">
          Remove file
        </button>
      </div>
    </div>

    <p class="font-bold">Fixed size upload</p>

    <div class="flex flex-col md:flex-row md:gap-10 md:items-center rounded md:m-0 py-3 justify-between">
      <div class="flex flex-col md:flex-row md:gap-10">
        <p>File A</p>
        <p>1MB</p>
      </div>
      <UploadButton :size="1" unit="MB" class="mr-20" />
    </div>
    <div class="flex flex-col md:flex-row md:gap-10 md:items-center rounded md:m-0 py-3 justify-between">
      <div class="flex flex-col md:flex-row md:gap-10">
        <p>File B</p>
        <p>10MB</p>
      </div>
      <UploadButton :size="10" unit="MB" class="mr-20" />
    </div>
    <div class="flex flex-col md:flex-row md:gap-10 md:items-center rounded md:m-0 py-3 justify-between">
      <div class="flex flex-col md:flex-row md:gap-10">
        <p>File C</p>
        <p>100MB</p>
      </div>
      <UploadButton :size="100" unit="MB" class="mr-20" />
    </div>
    <div class="flex flex-col md:flex-row gap-5 md:gap-8 md:items-center rounded md:m-0 justify-between">
      <div class="flex flex-col md:flex-row gap-5 md:gap-8 md:items-center rounded md:m-0">
        <input type="number" class="border-solid border-black border-2 w-50 h-8 rounded"
          v-model.number="customUpload" />
        <select name="units" class="border border-solid border-2 border-black rounded" v-model="units">
          <option value="KB">KB</option>
          <option value="MB">MB</option>
          <option value="GB">GB</option>
        </select>
      </div>
      <UploadButton :size="customUpload" :unit="units" class="mr-20" />
    </div>
    <div class="flex flex-col gap-5 py-3">
      <p class="font-bold">Continuous Upload</p>
      <button class="px-2 py-1 border-solid rounded border-2 w-50 cursor-pointer bg-studio-200 border-studio-700"
        @click="() => (isContinuousRunningUpload = !isContinuousRunningUpload)">
        Go !
      </button>
      <ContinuousModal v-if="packetsUploaded > 0" type="continuousupload" v-model:isRunning="isContinuousRunningUpload"
        :speed="uploadSpeed" v-model:numberOfPackets="packetsUploaded" :time="uploadTime" />
    </div>
  </div>
</template>
