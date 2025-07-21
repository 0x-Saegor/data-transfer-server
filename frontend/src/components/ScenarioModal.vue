<script setup lang="ts">
import { type Ref } from 'vue'

const props = defineProps<{title: string;
  stop: () => void;
  timeTaken: number;
  speedDownload: number;
  speedUpload: number;
}>()

const titles = new Map([
  ['streaming', ['Video Streaming', 'Repeats every 10 seconds', 10, 'MB', 0, 'MB']],
  ['gaming', ['Online Gaming', 'Repeats every second', 1, 'KB', 1, 'KB']],
  [
    'web',
    [
      'Web Browsing',
      'Repeats every 30 seconds, the download is made 10 times in parallel',
      50,
      'KB',
      10,
      'KB',
    ],
  ],
  ['max', ['Max Usage', 'Sends and receives 1MB data continuously', 1, 'MB', 1, 'MB']],
])

const isScenarioRunning: Ref = defineModel()

const isContinuousRunningUpload = defineModel('isContinuousRunningUpload')
const isContinuousRunningDownload = defineModel('isContinuousRunningDownload')
const showContinuous = defineModel('showContinuous')
</script>

<template>
  <div class="fixed inset-0 bg-gray-400/50 backdrop-blur-xs flex items-center justify-center">
    <div
      class="bg-white w-[70%] md:w-[40%] rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center p-5"
      @click.stop
    >
      <p class="font-bold">{{ titles.get(props.title)?.[0] }}</p>
      <p class="mb-2">{{ titles.get(props.title)?.[1] }}</p>
      <p class="italic">
        Downloads : {{ titles.get(props.title)?.[2] }}{{ titles.get(props.title)?.[3] }}
      </p>
      <p class="mb-5 italic">
        Uploads : {{ titles.get(props.title)?.[4] }}{{ titles.get(props.title)?.[5] }}
      </p>

      <div class="flex flex-col">
        <p>Elapsed time : {{ timeTaken }}s</p>
        <div class="flex flex-row gap-5 items-center">
          <p>Average download speed : {{ speedDownload }} MB/s</p>
        </div>
        <div class="flex flex-row gap-5 items-center">
          <p>Average upload speed : {{ speedUpload }} MB/s</p>
        </div>
        <button
          class="bg-red-200 border-red-600 border border-solid border-2 rounded px-2 py-1 cursor-pointer w-30 hover:bg-red-300 mt-3"
          @click="
            () => {
              if (isScenarioRunning > 0 || (isContinuousRunningDownload && isContinuousRunningUpload)) {
                stop()
              } else {
                  showContinuous = false
                  isScenarioRunning = 0
                }
            }
          "
        >
          {{
            (isContinuousRunningDownload && isContinuousRunningUpload) || isScenarioRunning > 0
              ? 'Stop'
              : 'Close'
          }}
        </button>
      </div>
    </div>
  </div>
</template>
