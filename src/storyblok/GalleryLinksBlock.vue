<template>
  <section class="gallery-links-block" v-editable="blok">
    <div class="gallery-links-block__inner">
      <h2 v-if="blok.headline" class="gallery-links-block__headline">{{ blok.headline }}</h2>

      <div v-if="galleryCards.length" class="gallery-links-block__list">
        <NuxtLink v-for="gallery in galleryCards" :key="gallery.uuid" class="gallery-links-block__item"
          :to="gallery.href">
          <img v-if="gallery.coverImage" class="gallery-links-block__image" :src="gallery.coverImage"
            :alt="gallery.coverAlt" loading="lazy" />
          <div class="gallery-links-block__info">
            <span class="gallery-links-block__title">{{ gallery.title }}</span>
            <span v-if="gallery.imageCount !== null" class="gallery-links-block__num-pics">
              {{ gallery.imageCount }} bilder
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

type StoryblokStoryLink = {
  uuid?: string;
  id?: number | string;
  cached_url?: string;
  full_slug?: string;
  slug?: string;
  name?: string;
  story?: StoryblokStory;
};

type StoryblokStory = {
  uuid?: string;
  id?: number;
  name?: string;
  full_slug?: string;
  slug?: string;
  content?: {
    title?: string;
    cover_image?: { filename?: string; alt?: string; title?: string };
    images?: Array<{ filename?: string }>;
  };
};

const { blok } = defineProps<{ blok: any }>();
const storyblokApi = useStoryblokApi();

const storyLinks = computed<(string | StoryblokStoryLink)[]>(() =>
  Array.isArray(blok.galleries) ? blok.galleries : [],
);

const referenceUuid = (reference: string | StoryblokStoryLink) => {
  if (typeof reference === "string") {
    return reference;
  }
  return reference.uuid || reference.story?.uuid || "";
};

const referenceId = (reference: string | StoryblokStoryLink) => {
  if (typeof reference === "string") {
    return "";
  }
  const id = reference.id ?? reference.story?.id;
  return id ? String(id) : "";
};

const storyUuids = computed(() =>
  storyLinks.value.map((link) => referenceUuid(link)).filter((uuid): uuid is string => Boolean(uuid)),
);

const storyIds = computed(() =>
  storyLinks.value.map((link) => referenceId(link)).filter((id): id is string => Boolean(id)),
);

const { data: linkedStories } = await useAsyncData(
  () => `gallery-links-${storyUuids.value.join("-") || "none"}-${storyIds.value.join("-") || "none"}`,
  async () => {
    if (!storyUuids.value.length && !storyIds.value.length) {
      return [] as StoryblokStory[];
    }

    const params: Record<string, string | number> = {
      version: "draft",
      per_page: 100,
    };

    if (storyUuids.value.length) {
      params.by_uuids = storyUuids.value.join(",");
    }

    if (storyIds.value.length) {
      params.by_ids = storyIds.value.join(",");
    }

    const response = await storyblokApi.get("cdn/stories", params);

    return (response?.data?.stories ?? []) as StoryblokStory[];
  },
  { watch: [storyUuids, storyIds] },
);

const linkedStoriesByKey = computed(() => {
  const entries = (linkedStories.value ?? []).flatMap((story) => {
    const keys: string[] = [];
    if (story.uuid) {
      keys.push(`uuid:${story.uuid}`);
    }
    if (story.id) {
      keys.push(`id:${story.id}`);
    }
    return keys.map((key) => [key, story] as const);
  });
  return new Map(entries);
});

const normalizePath = (value: string) => {
  if (!value) {
    return "/";
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return value.startsWith("/") ? value : `/${value}`;
};

const galleryCards = computed(() =>
  storyLinks.value.map((link, index) => {
    const rawUuid = referenceUuid(link);
    const rawId = referenceId(link);
    const linkedStory =
      (rawUuid && linkedStoriesByKey.value.get(`uuid:${rawUuid}`)) ||
      (rawId && linkedStoriesByKey.value.get(`id:${rawId}`)) ||
      (typeof link === "string" ? undefined : link.story);

    const fallbackLink = typeof link === "string" ? {} : link;
    const slug =
      linkedStory?.full_slug ||
      linkedStory?.slug ||
      fallbackLink.full_slug ||
      fallbackLink.cached_url ||
      fallbackLink.slug ||
      "";
    const href = normalizePath(slug);
    const cover = linkedStory?.content?.cover_image;
    const images = Array.isArray(linkedStory?.content?.images) ? linkedStory.content.images : [];
    const imageCount = images.filter((image) => Boolean(image?.filename)).length;

    return {
      uuid: rawUuid || rawId || `${slug}-${index}`,
      href,
      title:
        linkedStory?.content?.title ||
        linkedStory?.name ||
        fallbackLink.name ||
        "Gallery",
      coverImage: cover?.filename || "",
      coverAlt: cover?.alt || cover?.title || linkedStory?.content?.title || "Gallery cover image",
      imageCount: imageCount > 0 ? imageCount : null,
    };
  }),
);
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/gallery-links-block";
</style>
