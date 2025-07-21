<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
})

const isRunning = defineModel('isRunning')
const numberOfPackets = defineModel('numberOfPackets')

const titles = new Map([
  ['continuousdownload', ['Continuous download', 'Receives continuously 1MB packets']],
  ['continuousupload', ['Continuous upload', 'Sends continuously 1MB packets']],
])
</script>

<template>
  <div class="fixed inset-0 bg-gray-400/50 backdrop-blur-xs flex items-center justify-center">
    <div
      class="bg-white w-[70%] md:w-[40%]  rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center p-5"
      @click.stop
    >
      <p class="font-bold">{{ titles.get(props.type)?.[0] }}</p>
      <p class="mb-5">{{ titles.get(props.type)?.[1] }}</p>

      <div class="flex flex-col gap-3">
        <p>Elapsed time : {{ time }}s</p>
        <div class="flex flex-row gap-5 items-center">
          <p>Average speed : {{ speed }} MB/s</p>
          <p>Number of packets : {{ numberOfPackets }}</p>
        </div>
        <button
          class="bg-red-200 border-red-600 border border-solid border-2 rounded px-2 py-1 cursor-pointer w-30 hover:bg-red-300"
          @click="
            () => {
              isRunning ? (isRunning = false) : (numberOfPackets = 0)
            }
          "
        >
          {{ isRunning ? 'Stop' : 'Close' }}
        </button>
      </div>
    </div>
  </div>
</template>
