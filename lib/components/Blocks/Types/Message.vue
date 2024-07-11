<template>
  <div :class="'bl-message ' + classSeverity()">
    <Icon :icon="icon()" class="bl-size-5 bl-fill-white" />
    <div>{{ data.message }}</div>
  </div>
</template>
<script>
export default {
  name: "Message",
  props: {
    data: { type: Object, default: () => {} },
  },
  methods: {
    classSeverity() {
      if (this.data.severity == "error") {
        return "bl-message-error";
      }
      if (this.data.severity == "warning") {
        return "bl-message-warning";
      }
      if (this.data.severity == "message") {
        return "bl-message-info";
      }
    },
    icon() {
      if (this.data.severity == "error") {
        return "error";
      }
      return "info";
    },
  },
};
</script>
