<template>
  <section
    class="image-text-block"
    :class="{ 'image-text-block--image-right': imageOnRight }"
    v-editable="blok"
  >
    <div v-if="imageSrc" class="image-text-block__media">
      <img
        class="image-text-block__image"
        :src="imageSrc"
        :alt="imageAlt"
        loading="lazy"
      />
    </div>

    <div class="image-text-block__content">
      <h2 v-if="blok.title" class="image-text-block__title">{{ blok.title }}</h2>
      <div v-if="textHtml" class="image-text-block__text" v-html="textHtml" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

type StoryblokAsset = {
  filename?: string;
  alt?: string;
  title?: string;
};

const { blok } = defineProps<{ blok: any }>();

const image = computed<StoryblokAsset | null>(() => blok?.image ?? null);
const imageSrc = computed(() => image.value?.filename ?? "");
const imageAlt = computed(() => image.value?.alt || image.value?.title || "");
const textHtml = computed(() => (blok?.text ? renderRichText(blok.text) : ""));
const imageOnRight = computed(
  () => Boolean(blok?.image_on_right ?? blok?.imageRight ?? blok?.image_right),
);
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/image-text-block";
</style>
