<script setup lang="ts">
const isSidebarOpen = defineModel()
</script>

<template>
  <header>
      <!-- <h1 class="text-lg font-semibold">Data transfer server</h1> -->
      <button
        @click="isSidebarOpen = !isSidebarOpen"
        class="md:hidden text-black focus:outline-none cursor-hand fixed right-5 top-5"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
  </header>
</template>
