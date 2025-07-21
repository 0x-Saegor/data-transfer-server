<script setup lang="ts">
import { ref } from 'vue'
import { startUpload, abortFunc, generateData } from '@/functions/uploadApi'
import TransferModal from './TransferModal.vue'

const props = defineProps({
  size: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  file: {
    type: File,
    required: false,
  },
})

const progress = ref(0)
const timeTakenRef = ref(0)
const speedRef = ref(0)
const downloadMode = ref(false)
const isDownloading = ref(false)

function upload(file = generateData(props.size, props.unit)) {
  startUpload(
    progress,
    timeTakenRef,
    speedRef,
    downloadMode,
    isDownloading,
    props.size,
    props.unit,
    false,
    file,
  )
}

function closeAndStop() {
  abortFunc()
  downloadMode.value = false
}
</script>

<template>
  <div>
    <button
      class="px-2 py-1 bg-studio-200 border-solid rounded border-2 border-studio-700 w-50 d cursor-pointer"
      @click="upload(file)"
    >
      Upload
    </button>

    <TransferModal
      v-if="downloadMode"
      :unit="unit"
      :size="size"
      method="upload"
      :progress="progress"
      :speed="speedRef"
      :time="timeTakenRef"
      v-model="downloadMode"
      :filename="file?.name"
      :closeFunc="closeAndStop"
    />
  </div>
</template>
