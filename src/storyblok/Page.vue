<template>
  <main class="page" v-editable="blok">
    <StoryblokComponent
      v-for="currentBlok in contentBlocks"
      :key="currentBlok._uid"
      :blok="currentBlok"
    />
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { blok } = defineProps<{ blok: any }>();

const contentBlocks = computed(() => {
  const blocks = Array.isArray(blok.body) ? blok.body : [];
  return blocks.filter((currentBlok: any) => currentBlok?.component !== "site_footer");
});
</script>
