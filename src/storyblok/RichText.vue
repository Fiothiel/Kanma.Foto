<template>
  <section v-editable="blok" class="rich-text" :style="textAlignmentStyle">
    <StoryblokRichText v-if="blok?.text" :doc="blok.text" />
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { blok } = defineProps<{ blok: any }>();

type RichTextNode = {
  attrs?: { textAlign?: string };
  content?: RichTextNode[];
};

const findTextAlign = (nodes: RichTextNode[] = []): string => {
  for (const node of nodes) {
    const align = String(node?.attrs?.textAlign || "").toLowerCase();
    if (align === "center" || align === "right" || align === "left" || align === "justify") {
      return align;
    }

    const nestedAlign = findTextAlign(node?.content || []);
    if (nestedAlign) {
      return nestedAlign;
    }
  }

  return "";
};

const contentAlignment = computed(() => {
  const rootNodes: RichTextNode[] = Array.isArray(blok?.text?.content) ? blok.text.content : [];
  return findTextAlign(rootNodes);
});

const textAlignmentStyle = computed(() =>
  contentAlignment.value ? { textAlign: contentAlignment.value } : undefined,
);
</script>
