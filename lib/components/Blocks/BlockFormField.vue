<template>
  <div v-if="row.type === 'hidden'"></div>
  <Select
    v-else-if="row.type === 'select'"
    :error="errors[row.name] || ''"
    v-model="form[row.name]"
    :label="row.label"
    v-bind="$props"
  >
    <option :value="undefined"></option>
    <option v-for="option in row.options" :value="option.value">
      {{ option.label }}
    </option>
  </Select>
  <Textarea
    v-else-if="row.type === 'textarea'"
    :type="row.type"
    :error="errors[row.name] || ''"
    v-model="form[row.name]"
    :label="row.label"
    v-bind="$props"
  />
  <Input
    v-else
    :type="row.type"
    :error="errors[row.name] || ''"
    v-model="form[row.name]"
    :label="row.label"
    v-bind="$props"
  />
</template>
<script>
import Input from "../DS/Form/Input.vue";
import Select from "../DS/Form/Select.vue";
import Textarea from "../DS/Form/Textarea.vue";

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
    Select,
    Textarea,
    // File,
  },
};
</script>
