<template>
  <div
    :class="
      ' bl-text-white bl-px-3 bl-py-1  bl-rounded-lg bl-flex bl-items-center bl-gap-1 bl-select-none ' +
      classSeverity()
    "
  >
    <Icon :icon="icon()" class="bl-size-5 bl-fill-white" />
    <div>{{ data.message }}</div>
  </div>
</template>
<script>
export default {
  name: 'Message',
  props: {
    data: { type: Object, default: () => {} },
  },
  methods: {
    classSeverity() {
      if (this.data.severity == 'error') {
        return 'bl-bg-red-600';
      }
      if (this.data.severity == 'warning') {
        return 'bl-bg-yellow-600';
      }
      if (this.data.severity == 'message') {
        return 'bl-bg-blue-600';
      }
    },
    icon() {
      if (this.data.severity == 'error') {
        return 'error';
      }
      return 'info';
    },
  },
};
</script>
