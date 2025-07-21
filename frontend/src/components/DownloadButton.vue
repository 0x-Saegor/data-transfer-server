<script setup lang="ts">
import { ref } from 'vue'
import { stopDownload, startDownload } from '@/functions/fetchApi'
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
})

const progress = ref(0)
const timeTakenRef = ref(0)
const speedRef = ref(0)
const downloadMode = ref(false)
const isDownloading = ref(false)

function download() {
  startDownload(
    progress,
    timeTakenRef,
    speedRef,
    downloadMode,
    isDownloading,
    props.size,
    props.unit,
  )
}

function closeAndStop() {
  downloadMode.value = false
  stopDownload()
}
</script>

<template>
  <div>
    <button
      class="px-2 py-1 bg-studio-200 border-solid rounded border-2 border-studio-700 w-50 d cursor-pointer"
      @click="download()"
    >
      Download
    </button>
    <TransferModal
      v-if="downloadMode"
      :unit="unit"
      :size="size"
      method="download"
      :progress="progress"
      :speed="speedRef"
      :time="timeTakenRef"
      v-model="downloadMode"
      :closeFunc="closeAndStop"
    />
  </div>
</template>
