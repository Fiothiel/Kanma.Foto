<template>
  <component
    :is="tagName"
    class="contact-method"
    :class="{ 'contact-method--primary': isPrimary }"
    :href="href || undefined"
    :target="target"
    :rel="rel"
    v-editable="blok"
  >
    <span class="contact-method__icon" aria-hidden="true">
      <img
        v-if="iconSrc"
        class="contact-method__icon-image"
        :src="iconSrc"
        alt=""
        loading="lazy"
      />
      <span v-else class="contact-method__icon-fallback">+</span>
    </span>

    <span class="contact-method__label">{{ label }}</span>
    <span v-if="value" class="contact-method__value">{{ value }}</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

type StoryblokLink = {
  linktype?: string;
  url?: string;
  email?: string;
  cached_url?: string;
  target?: string;
};

const { blok } = defineProps<{ blok: any }>();

const label = computed(() => blok?.label || "Kontakt");
const value = computed(() => blok?.value || "");
const isPrimary = computed(() => Boolean(blok?.is_primary));
const iconType = computed(() => String(blok?.icon || "").toLowerCase());
const iconSourceMap: Record<string, string> = {
  email: "/icons/mail.svg",
  mail: "/icons/mail.svg",
  phone: "/icons/phone.svg",
  instagram: "/icons/instagram.svg",
  facebook: "/icons/facebook.svg",
};
const iconSrc = computed(() => iconSourceMap[iconType.value] || "");

const asStoryPath = (cachedUrl: string) => {
  if (!cachedUrl) {
    return "";
  }
  return cachedUrl === "hem" ? "/" : `/${cachedUrl}`;
};

const asPhoneLink = (phoneValue: string) => {
  if (!phoneValue) {
    return "";
  }

  const normalizedPhone = phoneValue.replace(/[^\d+]/g, "");
  return normalizedPhone ? `tel:${normalizedPhone}` : "";
};

const href = computed(() => {
  const link: StoryblokLink | undefined = blok?.link;

  if (link?.linktype === "story" && link.cached_url) {
    return asStoryPath(link.cached_url);
  }

  if (link?.linktype === "email" && link.email) {
    return `mailto:${link.email}`;
  }

  if (link?.url) {
    return link.url;
  }

  if (iconType.value === "email" && value.value) {
    return `mailto:${value.value}`;
  }

  if (iconType.value === "phone" && value.value) {
    return asPhoneLink(value.value);
  }

  return "";
});

const hasHref = computed(() => Boolean(href.value));
const tagName = computed(() => (hasHref.value ? "a" : "article"));
const target = computed(() => (hasHref.value ? blok?.link?.target || undefined : undefined));
const rel = computed(() => (target.value === "_blank" ? "noreferrer" : undefined));
</script>

<style scoped lang="scss">
@use "~/assets/scss/components/contact-method";
</style>
