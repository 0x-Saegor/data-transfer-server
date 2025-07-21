<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const isSidebarOpen = defineModel()
const route = useRoute()
</script>

<template>
  <div
    class="hidden fixed md:flex md:flex-col w-50 h-[100%] sidebar-studio text-white px-4 pt-4 shadow z-10 text-center items-center">
    <h1 class="text-xl font-bold mb-10 drop-shadow-lg">Data transfer server</h1>
    <RouterLink to="/" class="py-3 w-fit" :class="{
      'font-semibold': route.fullPath === '/' || route.fullPath.startsWith('/transfer/download'),
      underline: route.fullPath === '/' || route.fullPath.startsWith('/transfer/download'),
    }">Download</RouterLink>
    <RouterLink to="/upload" class="py-3 w-fit" :class="{
      'font-semibold': route.fullPath === '/upload' || route.fullPath.startsWith('/transfer/upload'),
      underline: route.fullPath === '/upload' || route.fullPath.startsWith('/transfer/upload'),
    }">Upload</RouterLink>
    <RouterLink to="/scenarios" class="py-3 w-fit" :class="{ 'font-semibold': route.fullPath === '/scenarios' }">
      Scenarios</RouterLink>
  </div>

  <transition name="slide">

    <div v-if="isSidebarOpen" class="md:hidden fixed left-0 w-48 h-full bg-studio-500 text-white px-4 pt-4 shadow z-30">
      <h1 class="text-xl font-bold drop-shadow-lg">Data transfer server</h1>
      <RouterLink to="/" class="block py-3" :class="{ 'font-semibold': route.fullPath === '/' }"
        @click="isSidebarOpen = false">Download</RouterLink>
      <RouterLink to="/upload" class="block py-3" :class="{
        'font-semibold':
          route.fullPath === '/upload' || route.fullPath.startsWith('/transfer/upload'),
        underline: route.fullPath === '/upload' || route.fullPath.startsWith('/transfer/upload'),
      }" @click="isSidebarOpen = false">Upload</RouterLink>
      <RouterLink to="/scenarios" class="block py-3" :class="{
        'font-semibold':
          route.fullPath === '/scenarios' || route.fullPath.startsWith('/transfer/upload'),
      }" @click="isSidebarOpen = false">Scenarios</RouterLink>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
