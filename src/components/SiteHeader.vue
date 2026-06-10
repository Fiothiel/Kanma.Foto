<template>
  <header class="header">
    <nav class="header__nav">
      <button
        class="header__toggle"
        type="button"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        aria-controls="site-menu"
        aria-label="Toggle navigation menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="header__toggle-line" />
        <span class="header__toggle-line" />
        <span class="header__toggle-line" />
      </button>

      <div
        id="site-menu"
        class="header__menu"
        :class="{ 'header__menu--open': isMenuOpen }"
      >
      <NuxtLink
        v-for="item in menuItems"
        :key="item._uid"
        class="header__link"
        active-class="header__link--active"
        exact-active-class="header__link--active"
        :to="resolveLink(item.link)"
        @click="isMenuOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
      </div>
    </nav>
  </header>
</template>


<script setup lang="ts">
import { computed, ref, watch } from "vue";

const route = useRoute();
const isMenuOpen = ref(false);

const options = {
  api: {
    version: "draft",
  },
  bridge: true,
};

const { story } = await useAsyncStoryblok("site-settings", options as any);

const menuItems = computed(() => {
  return story.value?.content?.menu_links ?? [];
});

const resolveLink = (link: any) => {
  if (link?.linktype === "story" && link.cached_url) {
    if (link.cached_url === "hem") {
      return "/";
    }
    return `/${link.cached_url}`;
  }

  if (link?.url) {
    return link.url;
  }

  return "/";
};

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  }
);
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/site-header";
</style>
