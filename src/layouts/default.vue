<template>
  <div>
    <SiteHeader />
    <slot />
    <StoryblokComponent v-if="footerBlok" :blok="footerBlok" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const options = {
  api: {
    version: "draft",
  },
  bridge: true,
};

const { story: settingsStory } = await useAsyncStoryblok("site-settings", options as any);
const footerBlok = computed(() => {
  const footer = settingsStory.value?.content?.footer;
  if (Array.isArray(footer)) {
    return footer[0] ?? null;
  }
  if (footer) {
    return footer;
  }
  return null;
});
</script>
