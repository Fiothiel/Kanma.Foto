<template>
  <li class="site-footer__list-item" v-editable="blok">
    {{ blok.label }}
  </li>
</template>

<script setup lang="ts">
const { blok } = defineProps<{ blok: any }>();
</script>
