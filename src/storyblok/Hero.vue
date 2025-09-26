<template>
  <section class="hero" v-editable="blok">
    <div class="hero__text">
      <h1>{{ blok.title }}</h1>
      <div class="hero__divider"></div>
      <p>{{ blok.subtitle }}</p>
      
    </div>
    <img class="hero__image" v-if="blok.image?.filename" :src="blok.image.filename" :alt="blok.image.alt || ''" />
  </section>
</template>

<script setup lang="ts">
defineProps<{ blok: any }>();
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/hero";
</style>