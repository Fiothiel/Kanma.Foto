<template>
  <div class="kanma">
    <Hero />
    <main class="kanma__content">
      <NuxtPage/>
    </main>
  </div>
</template>

<script setup lang="ts">
import Hero from '@/components/hero/Hero.vue';
</script>