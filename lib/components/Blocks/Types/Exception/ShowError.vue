<template>
  <div>
    <div class="bl-text-2xl bl-font-bold bl-uppercase bl-mb-3">
      {{ props.type }}
    </div>
    <div class="bl-text-red-500">{{ props.message }}</div>
    <div
      v-if="props.fullDescription"
      class="bl-font-light bl-text-neutral-800 bl-bg-neutral-200 bl-p-5 bl-rounded-lg bl-mt-5"
    >
      {{ props.fullDescription }}
    </div>
  </div>
</template>
<script lang="ts" setup>
// Props
const props = defineProps({
  type: String,
  message: String,
  fullDescription: String,
});
</script>
