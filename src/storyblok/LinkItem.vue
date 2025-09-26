<template>
  <a class="footer-link" :href="href" :target="target" :rel="rel" v-editable="blok">
    <span class="footer-link__icon" aria-hidden="true">
      <img v-if="iconSrc" class="footer-link__icon-image" :src="iconSrc" alt="" loading="lazy" />
      <span v-else class="footer-link__icon-fallback">+</span>
    </span>
    <span class="footer-link__label">{{ blok.label }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { blok } = defineProps<{ blok: any }>();
const iconMap: Record<string, string> = {
  email: "/icons/mail.svg",
  mail: "/icons/mail.svg",
  phone: "/icons/phone.svg",
  instagram: "/icons/instagram.svg",
  facebook: "/icons/facebook.svg",
};

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
const iconType = computed(() => String(blok?.icon || "").toLowerCase());
const iconSrc = computed(() => iconMap[iconType.value] || "");

const target = computed(() => blok.link?.target || undefined);
const rel = computed(() => (target.value === "_blank" ? "noreferrer" : undefined));
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/footer-link";
</style>
