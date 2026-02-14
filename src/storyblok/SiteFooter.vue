<template>
  <footer class="site-footer" v-editable="blok">
    <div class="site-footer__inner">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <h2 class="site-footer__title">{{ blok.title }}</h2>
          <p class="site-footer__tagline">{{ blok.tagline }}</p>
        </div>
        <div v-if="linkItems.length" class="site-footer__links">
          <StoryblokComponent
            v-for="linkItem in linkItems"
            :key="linkItem._uid"
            :blok="linkItem"
            class="site-footer__link"
          />
        </div>
      </div>

      <div class="site-footer__middle">
        <div
          v-if="servicesHtml"
          class="site-footer__column site-footer__rich-text"
          v-html="servicesHtml"
        />
        <div
          v-if="contactHtml"
          class="site-footer__column site-footer__rich-text"
          v-html="contactHtml"
        />
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__meta">{{ blok.copyright_text }}</p>
        <p class="site-footer__meta">{{ blok.org_number }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { blok } = defineProps<{ blok: any }>();

const linkItems = computed(() => (Array.isArray(blok.links) ? blok.links : []));
const servicesHtml = computed(() =>
  blok.services_text ? renderRichText(blok.services_text) : ""
);
const contactHtml = computed(() =>
  blok.contact_text ? renderRichText(blok.contact_text) : ""
);
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/site-footer";
</style>
