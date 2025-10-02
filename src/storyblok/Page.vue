<script setup lang="ts">
const { blok } = defineProps<{ blok: any }>()
</script>

<template>
  <div>
    <StoryblokComponent
      v-for="child in blok.body"
      :key="child._uid"
      :blok="child"
    />
  </div>
</template>