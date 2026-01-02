<template>
  <section v-editable="blok" class="rich-text">
    <div v-html="html" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { blok } = defineProps<{ blok: any }>();

const html = computed(() => {
  return renderRichText(blok.text);
});
</script>
