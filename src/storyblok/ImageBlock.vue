<template>
  <figure class="image-block" v-editable="blok">
    <img
      v-if="imageSrc"
      class="image-block__image"
      :src="imageSrc"
      :alt="imageAlt"
      loading="lazy"
    />
    <figcaption v-if="captionText" class="image-block__caption">
      {{ captionText }}
    </figcaption>
  </figure>
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
const captionText = computed(() => blok?.caption || image.value?.title || "");
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/image-block";
</style>
