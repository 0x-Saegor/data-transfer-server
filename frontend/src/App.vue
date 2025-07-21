<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import { ref } from 'vue'

const isSidebarOpen = ref(false)
</script>

<template>
  <AppHeader v-model="isSidebarOpen" />
  <AppSidebar v-model="isSidebarOpen" />
  <router-view />
</template>
