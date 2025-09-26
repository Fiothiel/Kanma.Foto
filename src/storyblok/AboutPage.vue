<template>
  <section class="about-page" v-editable="blok">
    <div class="about-page__intro">
      <div class="about-page__intro-content">
        <h1 v-if="title" class="about-page__title">{{ title }}</h1>
        <div v-if="introHtml" class="about-page__text" v-html="introHtml" />
      </div>

      <div class="about-page__portrait-wrap">
        <img
          v-if="portraitSrc"
          class="about-page__portrait"
          :src="portraitSrc"
          :alt="portraitAlt"
          loading="lazy"
        />
      </div>
    </div>

    <section class="about-page__contact" aria-labelledby="about-page-contact-heading">
      <h2 id="about-page-contact-heading" class="about-page__contact-heading">{{ contactHeading }}</h2>

      <div v-if="contactMethods.length" class="about-page__methods">
        <StoryblokComponent
          v-for="method in contactMethods"
          :key="method._uid"
          :blok="method"
        />
      </div>
    </section>
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

const title = computed(() => blok?.title ?? "");
const introHtml = computed(() =>
  blok?.intro_text ? renderRichText(blok.intro_text) : "",
);

const portrait = computed<StoryblokAsset | null>(() => blok?.portrait_image ?? null);
const portraitSrc = computed(() => portrait.value?.filename ?? "");
const portraitAlt = computed(() => portrait.value?.alt || portrait.value?.title || title.value || "Portrait");

const contactHeading = computed(
  () => blok?.contact_heading || "Vill du boka eller bara saga hej?",
);
const contactMethods = computed(() =>
  (Array.isArray(blok?.contact_methods) ? blok.contact_methods : []).filter(
    (method: any) => method?.component === "contact_method",
  ),
);
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/about-page";
</style>
