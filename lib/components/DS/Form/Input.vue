<template>
  <div class="bl-relative bl-w-full">
    <Icon
      class="bl-size-6 bl-absolute bl-bottom-2.5 bl-right-4"
      :class="{
        [size]: true,
        'bl-fill-red-400': !!error,
        'bl-fill-gray-400': !error,
      }"
      :icon="icon"
    />

    <label
      class="bl-select-none bl-absolute bl-duration-300"
      :for="id"
      v-if="label"
      :class="{
        'bl-top-2 bl-text-xs bl-left-5 bl-font-medium bl-text-neutral-500 dark:bl-text-neutral-400':
          isActiveLabel,
        'bl-top-3 bl-pt-0.5 bl-left-5 bl-font-light bl-text-neutral-600 dark:bl-text-neutral-500':
          !isActiveLabel,
      }"
    >
      {{ label }}
    </label>
    <input
      @wheel="$event.target.blur()"
      :value="modelValue"
      @input="handleChange"
      class="bl-app-input bl-appearance-none"
      :class="{
        'bl-error': !!error,
      }"
      :type="type"
      :id="id"
      :placeholder="placeholder || label"
      :disabled="disabled"
      @keydown="
        (evt) => {
          type == 'number' &&
            ['e', 'E', '+', '-'].includes(evt.key) &&
            evt.preventDefault();
        }
      "
      @change="handleChange"
      onKeyDown=""
      @blur="activeInput = false"
      @focus="activeInput = true"
    />
    <div class="bl-input-error" v-if="error">{{ error }}</div>
  </div>
</template>
<script>
import Icon from "../../DS/Icon.vue";
export default {
  name: "Input",
  emits: ["update:modelValue", "change"],
  components: {
    Icon,
  },
  data() {
    return {
      activeInput: false,
      id: (Math.random() + 1).toString(36).substring(7),
    };
  },

  props: {
    options: { type: Array, default: null, required: false },
    icon: { type: String, required: false },
    label: { type: String, required: false },
    type: { type: String, required: false, default: "text" },
    placeholder: { type: String, required: false },
    modelValue: { required: false },
    extraClass: { type: String, required: false },
    disabled: { type: Boolean, required: false, default: false },
    name: { type: String, required: false, default: null },
    size: { type: String, required: false, default: "md" },
    error: { type: String, required: false, default: null },
  },
  methods: {
    handleChange(e) {
      let val = e.target.value;
      this.$emit("change", val);
      this.$emit("update:modelValue", val);
    },
    focus() {
      let el = document.getElementById(this.id);
      el && el.focus();
    },
    change(e) {
      let value = e.target.value;
      this.$emit("changeInput", value);
    },
  },
  computed: {
    isActiveLabel() {
      return (
        this.activeInput ||
        this.modelValue ||
        this.type === "date" ||
        this.type === "time" ||
        this.type === "datetime-local"
      );
    },
  },
};
</script>
