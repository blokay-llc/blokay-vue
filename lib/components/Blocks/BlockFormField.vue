<template>
  <div v-if="row.type === 'hidden'"></div>
  <Select
    v-else-if="row.type === 'select'"
    :error="errors[row.name] || ''"
    :label="row.label"
    v-bind="$props"
    :modelValue="form[row.name]"
    @change="
      (val) => {
        setForm({ ...form, [row.name]: val });
      }
    "
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
    :label="row.label"
    v-bind="$props"
    :modelValue="form[row.name]"
    @change="
      (val) => {
        setForm({ ...form, [row.name]: val });
      }
    "
  />
  <File
    v-else-if="row.type === 'file'"
    :label="row.label"
    :onChangeFiles="(val: any) => {
      setForm({ ...form, [row.name]: val.url });
    }"
    :jwt="jwt"
    :endpoint="endpoint"
  />
  <Input
    v-else
    :type="row.type"
    :error="errors[row.name] || ''"
    :label="row.label"
    v-bind="$props"
    :modelValue="form[row.name]"
    @change="
      (val) => {
        setForm({ ...form, [row.name]: val });
      }
    "
  />
</template>
<script lang="ts">
import Input from "../DS/Form/Input.vue";
import Select from "../DS/Form/Select.vue";
import Textarea from "../DS/Form/Textarea.vue";
import File from "../DS/Form/File.vue";

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
    jwt: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      default: null,
    },
  },
  components: {
    Input,
    Select,
    Textarea,
    File,
    // File,
  },
};
</script>
