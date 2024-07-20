<template>
  <div
    :class="`bl-lds-ring ${size}`"
    :style="`width: ${size === 'lg' ? '80px' : ''};
    height: ${size === 'sm' ? '1rem' : ''}`"
  >
    <div :key="x" v-for="x in 4"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: "Loader",
  props: {
    size: {
      type: String,
      default: "md",
    },
  },
};
</script>
