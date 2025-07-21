<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="md:ml-50 p-10 flex flex-col gap-5 ">
    <div class="text-center flex flex-col gap-5 items-center">
      <h1 class="text-5xl font-bold">Erreur !</h1>
      <p class="text-xl">La page que vous cherchez n'existe pas</p>
      <RouterLink
        to="/"
        class="py-1 px-2 bg-blue-200 border border-solid border-2 rounded border-blue-500 items-center justify-center hover:bg-blue-300"
        >Me ramener en lieu sûr</RouterLink
      >
    </div>
  </div>
</template>
