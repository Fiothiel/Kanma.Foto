<template>
  <footer class="footer" v-editable="blok">
    <div class="footer__content">
      <div class="footer__top">
        <div class="footer__column">
          <h2 class="footer__title">{{ blok.title }}</h2>
          <p class="footer__tagline">{{ blok.tagline }}</p>
        </div>

        <div class="footer__column footer__column--links">
          <StoryblokComponent v-for="linkItem in linkItems" :key="linkItem._uid" :blok="linkItem" />
        </div>
      </div>
      <img v-if="logo" :src="logo" :alt="logoAlt" class="footer__logo" />
      <div class="footer__bottom">
        <p>{{ blok.copyright_text }}</p>
        <p>{{ blok.org_number }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { blok } = defineProps<{ blok: any }>();

const linkItems = computed(() => (Array.isArray(blok.links) ? blok.links : []));
const logo = computed(() => {
  if (!blok || !blok.logo) {
    return "";
  }

  // Vanliga fält Storyblok returnerar: filename, url
  return blok.logo.filename || blok.logo.url || "";
});

const logoAlt = computed(() => {
  if (!blok || !blok.logo) {
    return blok?.title || "Logo";
  }

  // försök olika alt-fält
  return blok.logo.alt || blok.logo.alt_text || blok.logo.title || blok.title || "Logo";
});

</script>

<style scoped lang="scss">
@use "~/assets/scss/components/footer";
</style>
