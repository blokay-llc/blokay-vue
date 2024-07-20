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
    :preview="form[row.name]"
    :classSelector="row.classSelector"
    :endpoint="row.endpoint"
    :size="row.size"
    :onError="row.onError"
    :onDone="row.onDone"
    :onChangeFiles="row.onChangeFiles"
    :jwt="jwt"
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
