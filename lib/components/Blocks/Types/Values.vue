<template>
  <div class="bl-values">
    <h2 class="bl-values-title">
      {{ title }}
    </h2>
    <div class="bl-values-container">
      <div :key="val.label" v-for="val in values" class="bl-text-center">
        <div class="bl-values-label">
          {{ val.label.replaceAll("__", " ") }}
        </div>
        <div class="bl-values-value">
          {{ val.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    title: { type: String, default: "" },
    data: { type: Object, default: () => {} },
  },
  computed: {
    values() {
      const arr: any = [];
      for (const index in this.data) {
        arr.push({ label: index, value: this.data[index] });
      }
      return arr;
    },
  },
};
</script>
