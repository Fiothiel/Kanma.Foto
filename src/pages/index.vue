<template>
  <div class="home">
    <h1>Sup</h1>
    {{ story }}
      <StoryblokComponent :blok="story.content" />
  </div>
</template>

<script setup lang="ts">
const apiOptions = { version: 'draft' as const }   // must be an object
const bridgeOptions = {}                            // must be an object

const story = await useAsyncStoryblok('hem', apiOptions, bridgeOptions)
</script>
