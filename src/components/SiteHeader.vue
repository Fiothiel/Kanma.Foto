<template>
 <header class="header">
    <nav>
      <NuxtLink
        v-for="item in menuItems"
        :key="item._uid"
        class="header__link"
        active-class="header__link--active"
        exact-active-class="header__link--active"
        :to="resolveLink(item.link)"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
  </header>
</template>


<script setup lang="ts">
import { computed } from 'vue';

const options = {
  api: {
    version: 'draft',
  },
  bridge: true,
};

const { story } = await useAsyncStoryblok('site-settings', options as any);

const menuItems = computed(() => {
  return story.value?.content?.menu_links ?? [];
});

const resolveLink = (link: any) => {
  if (link?.linktype === 'story' && link.cached_url) {
    if (link.cached_url === 'hem') {
      return '/';
    }
    return `/${link.cached_url}`;
  }

  if (link?.url) {
    return link.url;
  }

  return '/';
};
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/site-header";
</style>
