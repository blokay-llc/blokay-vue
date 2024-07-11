<template>
  <div
    class="bl-text-neutral-400 dark:bl-text-neutral-400 bl-bg-white dark:bl-bg-neutral-950"
  >
    <h2
      class="bl-text-sm bl-font-light bl-pb-3 bl-mb-3 bl-border-b bl-border-neutral-200"
    >
      {{ title }}
    </h2>
    <div
      class="bl-flex bl-flex-wrap bl-items-center bl-gap-3 lg:bl-gap-10 bl-justify-center"
    >
      <div :key="val.label" v-for="val in values" class="bl-text-center">
        <div class="bl-font-light bl-text-sm">
          {{ val.label.replaceAll("__", " ") }}
        </div>
        <div class="bl-text-3xl bl-font-bold bl-text-black dark:bl-text-white">
          {{ val.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, default: "" },
    data: { type: Object, default: () => {} },
  },
  computed: {
    values() {
      const arr = [];
      for (const index in this.data) {
        arr.push({ label: index, value: this.data[index] });
      }
      return arr;
    },
  },
};
</script>
