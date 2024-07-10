<template>
  <div>
    <div class="bl-text-2xl bl-font-bold bl-uppercase bl-mb-3">{{ type }}</div>
    <div class="bl-text-red-500">{{ message }}</div>
    <div
      v-if="fullDescription"
      class="bl-font-light bl-text-neutral-800 bl-bg-neutral-200 bl-p-5 bl-rounded-lg bl-mt-5"
    >
      {{ fullDescription }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
    message: String,
    fullDescription: String,
  },
};
</script>
