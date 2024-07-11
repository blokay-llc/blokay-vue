<template>
  <div
    class="box-input"
    :class="{
      active: activeInput,
      withvalue:
        !!modelValue ||
        type == 'date' ||
        type == 'time' ||
        type == 'datetime-local',
      [size]: true,
      withlabel: !!label,
    }"
    @click="clickInput"
  >
    <icon :icon="icon" v-if="icon" class="icon-input" />
    <label class="label-style text-gray-700" :for="id" v-if="label">
      {{ label }}
    </label>
    <input
      @wheel="$event.target.blur()"
      :value="modelValue"
      @input="handleChange"
      class="input-style"
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
    />
  </div>
</template>
<script>
export default {
  name: "Input",
  emits: ["update:modelValue", "onChange"],
  data() {
    return {
      activeInput: false,
      declaredEvents: false,
      id: (Math.random() + 1).toString(36).substring(7),
    };
  },
  mounted() {
    this.declareEvents(this.id);
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
    declareEvents(id) {
      if (!id) return;
      if (this.declaredEvents) return;

      let el = document.getElementById(id);

      if (!el) {
        return;
      }
      this.declaredEvents = true;
      el.addEventListener("blur", () => {
        this.activeInput = false;
        this.$emit("outside");
      });
      el.addEventListener("focus", () => {
        this.activeInput = true;
      });
    },
    clickInput() {
      let el = document.getElementById(this.id);

      el && el.focus();
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
  watch: {
    id(a) {
      this.declareEvents(a);
    },
  },
};
</script>
