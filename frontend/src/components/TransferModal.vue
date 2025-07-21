<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
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
  filename: {
    type: String,
    required: false,
  },

  closeFunc: {
    type: Function,
    required: true,
  },
})

const downloadMode = defineModel()
</script>

<template>
  <div
    class="fixed inset-0 bg-gray-400/50 backdrop-blur-xs flex items-center justify-center"
    @click="downloadMode = false"
  >
    <div
      class="bg-white w-[70%] md:w-[30%] rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center p-5"
      @click.stop
    >
      <p class="font-bold mb-5">
        {{ props.method == 'download' ? 'Downloading : ' : 'Uploading : '
        }}{{ size != 0 ? `${size} ${unit}` : `${filename}` }}
      </p>

      <div class="w-full bg-gray-200 rounded h-7 dark:bg-gray-700 mb-5">
        <div class="bg-blue-500 h-7 rounded" :style="{ width: `${props['progress']}%` }">
          <p class="absolute left-1/2 transform -translate-x-1/2">
            {{ parseFloat(props['progress'].toFixed(2)) }}%
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <p>Elapsed time : {{ time }}s</p>
        <p>Average speed : {{ speed }} MB/s</p>
        <button
          class="bg-red-200 border-red-600 border border-solid border-2 rounded px-2 py-1 cursor-pointer w-30 hover:bg-red-300"
          @click="closeFunc()"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
