<script setup lang="ts">
import { ref } from 'vue'
import { startDownload } from '../functions/fetchApi'
import { generateData, startUpload } from '@/functions/uploadApi'
import { useContinuous } from '@/composables/continuous'
import ScenarioModal from '@/components/ScenarioModal.vue'

// Download
const progress = ref(0)
const timeTakenRef = ref(0)
const speedDownload = ref(0)
const downloadMode = ref(false)
const isDownloading = ref(false)
const elapsedTime = ref(0)
const timeInterval = ref(0)

// Upload
const progressUpload = ref(0)
const timeTakenRefUpload = ref(0)
const speedUpload = ref(0)
const uploadMode = ref(false)
const isUploading = ref(false)

const showContinuous = ref(false)

function download(size: number, unit: string) {
  if (typeof size !== 'number') return
  if (typeof unit !== 'string') return

  startDownload(progress, timeTakenRef, speedDownload, downloadMode, isDownloading, size, unit)
}

function upload(size: number, unit: string, file = generateData(size, unit)) {
  startUpload(
    progressUpload,
    timeTakenRefUpload,
    speedUpload,
    uploadMode,
    isUploading,
    size,
    unit,
    true,
    file,
  )
}

const isVideoScenarioRunning = ref(0)
const isGamingScenarioRunning = ref(0)
const isWebScenarioRunning = ref(0)
const {
  isContinuousRunningDownload,
  isContinuousRunningUpload,
  downloadSpeed,
  uploadSpeed,
  downloadTime,
} = useContinuous()

/**
 * Query 10MB every 10 sec
 */
function videoStream() {
  stopScenario(false)

  const start = performance.now()

  download(10, 'MB')
  isVideoScenarioRunning.value = setInterval(() => {
    download(10, 'MB')
  }, 10000)
  timeInterval.value = setInterval(() => {
    elapsedTime.value = parseInt(((performance.now() - start) / 1000).toFixed(1))
  }, 200)
}

/**
 * Query 1Kb every second
 * Send 1Kb every second
 */
function onlineGaming() {
  stopScenario(false)

  const start = performance.now()

  download(1, 'KB')
  isGamingScenarioRunning.value = setInterval(() => {
    download(1, 'KB')
    upload(1, 'KB')
  }, 1000)
  timeInterval.value = setInterval(() => {
    elapsedTime.value = parseInt(((performance.now() - start) / 1000).toFixed(1))
  }, 200)
}

/**
 * Every 30 seconds
 * - Query 10 times 50 KB in parallel
 * - Upload 10KB
 */
function webBrowsing() {
  stopScenario(false)
  const start = performance.now()

  const tab: Promise<void>[] = []

  for (let i = 0; i < 10; i++) {
    tab.push(
      startDownload(progress, timeTakenRef, speedDownload, downloadMode, isDownloading, 50, 'KB'),
    )
  }

  // await Promise.all(tab) attend la fin

  upload(10, 'KB')
  isWebScenarioRunning.value = setInterval(() => {
    const tab: Promise<void>[] = []

    for (let i = 0; i < 10; i++) {
      tab.push(
        startDownload(progress, timeTakenRef, speedDownload, downloadMode, isDownloading, 50, 'KB'),
      )
    }
    upload(10, 'KB')
  }, 30000)
  timeInterval.value = setInterval(() => {
    elapsedTime.value = parseInt(((performance.now() - start) / 1000).toFixed(1))
  }, 200)
}

function stopScenario(maxUsage: boolean) {
  if (timeInterval.value != 0) {
    clearInterval(timeInterval.value)
  }

  if (isVideoScenarioRunning.value > 0) {
    clearInterval(isVideoScenarioRunning.value)
    isVideoScenarioRunning.value = -1
  }
  if (isGamingScenarioRunning.value > 0) {
    clearInterval(isGamingScenarioRunning.value)
    isGamingScenarioRunning.value = -1
  }
  if (isWebScenarioRunning.value > 0) {
    clearInterval(isWebScenarioRunning.value)
    isWebScenarioRunning.value = -1
  }

  if (maxUsage) {
    if (isContinuousRunningDownload) {
      isContinuousRunningDownload.value = false
    }
    if (isContinuousRunningUpload) {
      isContinuousRunningUpload.value = false
    }
  }
}
</script>

<template>
  <div class="md:ml-50 p-10 flex flex-col gap-5 ">
    <p class="font-bold">Fixed size download</p>

    <div class="flex flex-col md:flex-row md:gap-10 md:items-center rounded md:m-0 justify-between">
      <span class="flex flex-col">
        <p>Video Streaming</p>
        <p class="text-gray-400 text-sm">Regularly download large chunks of data</p>
      </span>
      <button
        class="bg-studio-200 border-studio-700 px-2 py-1 border-solid rounded border-2 w-50 md-w-full cursor-pointer mr-20"
        @click="() => videoStream()"
      >
        Launch
      </button>
      <ScenarioModal
        v-if="isVideoScenarioRunning > 0 || isVideoScenarioRunning == -1"
        v-model="isVideoScenarioRunning"
        title="streaming"
        :stop="()=>stopScenario(false)"
        :timeTaken="elapsedTime"
        :speedDownload="speedDownload"
        :speedUpload="speedUpload"
      />
    </div>
    <div class="flex flex-col md:flex-row md:gap-10 md:items-center rounded md:m-0 justify-between">
      <span class="flex flex-col">
        <p>Online Gaming</p>
        <p class="text-gray-400 text-sm">Many queries, bot upload and download</p>
      </span>
      <button
        class="bg-studio-200 border-studio-700 px-2 py-1 border-solid rounded border-2 w-50 md-w-full cursor-pointer mr-20"
        @click="() => onlineGaming()"
      >
        Launch
      </button>
      <ScenarioModal
        v-if="isGamingScenarioRunning > 0 || isGamingScenarioRunning == -1"
        v-model="isGamingScenarioRunning"
        title="gaming"
        :stop="()=>stopScenario(false)"
        :timeTaken="elapsedTime"
        :speedDownload="speedDownload"
        :speedUpload="speedUpload"
      />
    </div>
    <div class="flex flex-col md:flex-row md:gap-10 md:items-center rounded md:m-0 justify-between">
      <span class="flex flex-col">
        <p>Web</p>
        <p class="text-gray-400 text-sm">Many queries, small downloads</p>
      </span>
      <button
        class="bg-studio-200 border-studio-700 px-2 py-1 border-solid rounded border-2 w-50 md-w-full cursor-pointer mr-20"
        @click="() => webBrowsing()"
      >
        Launch
      </button>
      <ScenarioModal
        v-if="isWebScenarioRunning > 0 || isWebScenarioRunning == -1"
        v-model="isWebScenarioRunning"
        title="web"
        :stop="()=>stopScenario(false)"
        :timeTaken="elapsedTime"
        :speedDownload="speedDownload"
        :speedUpload="speedUpload"
      />
    </div>
    <div class="flex flex-col md:flex-row md:gap-10 md:items-center rounded md:m-0 justify-between">
      <span class="flex flex-col">
        <p>Max usage</p>
        <p class="text-gray-400 text-sm">Upload and download at full speed</p>
      </span>
      <button
        class="bg-studio-200 border-studio-700 px-2 py-1 border-solid rounded border-2 w-50 md-w-full cursor-pointer mr-20"
        @click="
          () => {
            stopScenario(true)
            isContinuousRunningDownload = !isContinuousRunningDownload
            isContinuousRunningUpload = !isContinuousRunningUpload
            showContinuous = true
          }
        "
      >
        Launch
      </button>
      <ScenarioModal
        v-if="showContinuous"
        v-model:isContinuousRunningDownload="isContinuousRunningDownload"
        v-model:isContinuousRunningUpload="isContinuousRunningUpload"
        v-model:showContinuous="showContinuous"
        title="max"
        :stop="()=>stopScenario(true)"
        :timeTaken="downloadTime"
        :speedDownload="downloadSpeed"
        :speedUpload="uploadSpeed"
      />
    </div>
  </div>
</template>
