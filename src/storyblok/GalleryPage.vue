<template>
  <section class="gallery-page" v-editable="blok">
    <div class="gallery-page__header">
      <h1 v-if="title" class="gallery-page__title">{{ title }}</h1>
      <div v-if="introHtml" class="gallery-page__intro" v-html="introHtml" />
    </div>

    <div v-if="imageItems.length" class="gallery-page__grid">
      <button
        v-for="(image, index) in imageItems"
        :key="`${image.src}-${index}`"
        class="gallery-page__item"
        type="button"
        @click="openImage(index)"
      >
        <img class="gallery-page__image" :src="image.src" :alt="image.alt" loading="lazy" />
      </button>
    </div>

    <p v-else class="gallery-page__empty">No images configured.</p>

    <ClientOnly>
      <VueEasyLightbox
        :visible="lightboxVisible"
        :imgs="lightboxImages"
        :index="selectedIndex"
        :scroll-disabled="true"
        @hide="closeLightbox"
      />
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";

type StoryblokAsset = {
  filename?: string;
  alt?: string;
  title?: string;
};

const { blok } = defineProps<{ blok: any }>();

const title = computed(() => blok.title ?? "");
const introHtml = computed(() => (blok.intro ? renderRichText(blok.intro) : ""));

const imageItems = computed(() => {
  const images: StoryblokAsset[] = Array.isArray(blok.images) ? blok.images : [];
  return images
    .filter((image) => Boolean(image?.filename))
    .map((image) => ({
      src: image.filename as string,
      alt: image.alt || image.title || title.value || "Gallery image",
    }));
});

const lightboxImages = computed(() => imageItems.value.map((image) => image.src));

const lightboxVisible = ref(false);
const selectedIndex = ref(0);

const openImage = (index: number) => {
  selectedIndex.value = index;
  lightboxVisible.value = true;
};

const closeLightbox = () => {
  lightboxVisible.value = false;
};
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/gallery-page";
</style>
