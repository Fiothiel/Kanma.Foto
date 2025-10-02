<template>
  <section class="hero">
    <h1>{{ blok.title }}</h1>
    <p>{{ blok.subtitle }}</p>
    <img :src="blok.image.filename" :alt="blok.image.alt" />
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })
</script>