<template>
  <main class="page" v-editable="blok">
    <StoryblokComponent
      v-for="currentBlok in blok.body"
      :key="currentBlok._uid"
      :blok="currentBlok"
    />
  </main>
</template>

<script setup lang="ts">
const { blok } = defineProps<{ blok: any }>();
</script>