<template>
  <a :href="href" :target="target" :rel="rel" v-editable="blok">
    {{ blok.label }}
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { blok } = defineProps<{ blok: any }>();

const href = computed(() => {
  const link = blok.link;

  if (link?.linktype === "story" && link.cached_url) {
    return link.cached_url === "hem" ? "/" : `/${link.cached_url}`;
  }

  if (link?.linktype === "email" && link.email) {
    return `mailto:${link.email}`;
  }

  return link?.url ?? "/";
});

const target = computed(() => blok.link?.target || undefined);
const rel = computed(() => (target.value === "_blank" ? "noreferrer" : undefined));
</script>
