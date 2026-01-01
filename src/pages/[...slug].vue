<template>
    <StoryblokComponent v-if="story" :blok="story.content" />
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';

const route = useRoute();

const slug = computed(() => {
    const s = route.params.slug;
    if (Array.isArray(s)) {
        return s.join('/');
    }
    return 'hem';
});

const options = {
  api: {
    version: 'draft',
  },
  bridge: true,
};

const { story } = await useAsyncStoryblok(slug.value, options as any);

</script>
