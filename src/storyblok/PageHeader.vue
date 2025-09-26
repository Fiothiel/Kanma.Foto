<template>
  <section class="page-header" v-editable="blok" :class="{ 'page-header--bright': bright }">
    <div class="page-header__inner">
      <h1 v-if="blok.title" class="page-header__title">{{ blok.title }}</h1>
      <div v-if="introHtml" class="page-header__intro" v-html="introHtml" />
    </div>
    <img
      v-if="blok.image?.filename"
      class="page-header__image"
      :src="blok.image.filename"
      :alt="blok.image.alt || ''"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { blok } = defineProps<{ blok: any }>();

const introHtml = computed(() =>
  blok.intro ? renderRichText(blok.intro) : ""
);

const bright = computed(
  () => Boolean(blok?.bright ?? blok?.bright ?? blok?.bright),
);
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/page-header";
</style>
