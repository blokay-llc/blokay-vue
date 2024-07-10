<template>
  <Input
    :type="row.type"
    :error="errors[row.name] || ''"
    v-model="form[row.name]"
    :label="row.label"
    v-bind="$props"
  >
    <slot></slot>
  </Input>
</template>
<script>
import Input from "../DS/Form/Index.vue";

export default {
  name: "BlockField",
  props: {
    row: {
      type: Object,
      required: true,
    },
    form: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
    setForm: {
      type: Function,
      required: true,
    },
  },
  components: {
    Input,
    // File,
  },
};
</script>
