<script setup lang="ts">
import { ref } from 'vue'
import { useContinuous } from '@/composables/continuous'
import DownloadButton from '@/components/DownloadButton.vue'
import ContinuousModal from '@/components/ContinuousModal.vue'

const customDownload = ref(1)
const units = ref('GB')

const { isContinuousRunningDownload, downloadSpeed, packetsDownloaded, downloadTime } =
  useContinuous()
</script>

<template>
  <div class="md:ml-50 p-10 flex flex-col gap-5 ">
    <p class="font-bold">Fixed size download</p>

    <div class="flex flex-col md:flex-row md:gap-10 md:items-center rounded md:m-0 py-3 justify-between">
      <div class="flex flex-col md:flex-row md:gap-10">
        <p>File A</p>
        <p>1MB</p>
      </div>
      <DownloadButton :size="1" unit="MB" class="mr-20"/>
    </div>
        <div class="flex flex-col md:flex-row md:gap-10 md:items-center rounded md:m-0 py-3 justify-between">
      <div class="flex flex-col md:flex-row md:gap-10">
        <p>File B</p>
        <p>10MB</p>
      </div>
      <DownloadButton :size="10" unit="MB" class="mr-20"/>
    </div>
    <div class="flex flex-col md:flex-row md:gap-10 md:items-center rounded md:m-0 py-3 justify-between">
      <div class="flex flex-col md:flex-row md:gap-10">
        <p>File C</p>
        <p>100MB</p>
      </div>
      <DownloadButton :size="100" unit="MB" class="mr-20"/>
    </div>
    <div class="flex flex-col gap-5 md:gap-10 py-3">
      <p class="font-bold">Custom size</p>
      <div class="flex flex-col md:flex-row gap-5 md:gap-8 md:items-center rounded md:m-0 justify-between">
        <div class="flex flex-col md:flex-row gap-5 md:gap-8 md:items-center rounded md:m-0">
          <input
            type="number"
            class="border-solid border-black border-2 w-50 h-8 rounded"
            v-model.number="customDownload"
          />
          <select
            name="units"
            class="border border-solid border-2 border-black rounded"
            v-model="units"
          >
            <option value="KB">KB</option>
            <option value="MB">MB</option>
            <option value="GB">GB</option>
          </select>
        </div>
        <DownloadButton :size="customDownload" :unit="units" class="mr-20"/>
      </div>
    </div>
    <div class="flex flex-col gap-5 py-3">
      <p class="font-bold">Continuous Download</p>
      <button
        class="px-2 py-1 border-solid rounded border-2 w-50 cursor-pointer bg-studio-200 border-studio-700"
        @click="() => (isContinuousRunningDownload = true)"
      >
        Go !
      </button>
      <ContinuousModal
        v-if="packetsDownloaded > 0"
        type="continuousdownload"
        v-model:isRunning="isContinuousRunningDownload"
        :speed="downloadSpeed"
        v-model:numberOfPackets="packetsDownloaded"
        :time="downloadTime"
      />
    </div>
  </div>
</template>
