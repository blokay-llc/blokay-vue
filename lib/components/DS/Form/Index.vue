<template>
  <div class="select-none w-full" :class="{ [mb]: true, disabled }">
    <component
      ref="input"
      :is="componentName"
      :id="id"
      :size="size"
      @changeFiles="uploadPhoto"
      :labelBottom="placeholder"
      v-bind="$props"
      @changeInput="changeInput"
      @select="select"
      :stateId="stateId"
      @stateId="setStateId"
      @onChange="handleChange"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>

    <div
      v-if="error"
      class="text-main-950 text-sm mt-2 font-bold bg-neutral-200 px-2 py-0.5 rounded-xl"
    >
      {{ error }}
    </div>
  </div>
</template>
<script>
// import InputFile from "@/components/DS/Form/Input/Types/File.vue";
// import InputSelect from "@/components/DS/Form/Input/Types/Select.vue";
// import InputSelectcustom from "@/components/DS/Form/Input/Types/Selectcustom.vue";
// import InputCountry from "@/components/DS/Form/Input/Types/Country.vue";
// import InputMoney from "@/components/DS/Form/Input/Types/Money.vue";
// import InputPassword from "@/components/DS/Form/Input/Types/Password.vue";
// import InputCellphone from "@/components/DS/Form/Input/Types/Cellphone.vue";
// import InputTextarea from "@/components/DS/Form/Input/Types/Textarea.vue";
// import InputToggle from "@/components/DS/Form/Input/Types/Toggle.vue";
// import InputCheckbox from "@/components/DS/Form/Input/Types/Checkbox.vue";
// import InputOtp from "@/components/DS/Form/Input/Types/Otp.vue";
// import InputCity from "@/components/DS/Form/Input/Types/City.vue";
// import InputDane from "@/components/DS/Form/Input/Types/Dane.vue";
// import InputDefault from "@/components/DS/Form/Input/Types/Default.vue";
// import InputBarcode from "@/components/DS/Form/Input/Types/Barcode.vue";

export default {
  name: "app-input",
  props: {
    options: { type: Array, default: null, required: false },
    stateId: { type: String, required: false },
    label: { type: String, required: false },
    items: { type: Array, required: false },
    type: { type: String, required: false, default: "text" },
    placeholder: { type: String, required: false },
    modelValue: { required: false },
    extraClass: { type: String, required: false },
    disabled: { type: Boolean, required: false, default: false },
    name: { type: String, required: false, default: "" },
    limitFiles: { type: Number, required: false, default: 1 },
    variant: { type: String, required: false, default: "l" },
    mb: { type: String, required: false, default: "mb-3 md:mb-4" },
    icon: { type: String, required: false, default: "" },
    size: { type: String, required: false, default: "md" },
    error: { type: String, required: false, default: null },
  },
  emits: ["update:modelValue", "changeInput", "select", "onChange"],
  components: {
    // InputFile,
    // InputSelect,
    // InputSelectcustom,
    // InputCountry,
    // InputMoney,
    // InputPassword,
    // InputCellphone,
    // InputTextarea,
    // InputToggle,
    // InputCheckbox,
    // InputDefault,
    // InputOtp,
    // InputCity,
    // InputDane,
    // InputBarcode,
  },
  computed: {
    componentName() {
      const types = {
        select: "input-select",
        "select-custom": "input-selectcustom",
        cellphone: "input-cellphone",
        country: "input-country",
        money: "input-money",
        amount: "input-money",
        password: "input-password",
        textarea: "input-textarea",
        default: "input-default",
        checkbox: "input-checkbox",
        file: "input-file",
        otp: "input-otp",
        toggle: "input-toggle",
        city: "input-city",
        dane: "input-dane",
        barcode: "input-barcode",
      };

      return types[this.type] || "input-default";
    },
  },
  data() {
    return {
      id: (Math.random() + 1).toString(36).substring(7),
    };
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    handleChange(val) {
      this.$emit("onChange", val);
    },

    uploadPhoto(pics) {
      this.$emit("update:modelValue", pics.url);
    },

    changeInput(value) {
      this.$emit("change", value);
      this.$emit("changeInput", value);
      this.$emit("update:modelValue", value);
    },
    select(value) {
      this.$emit("select", value);
    },
    viewPhoto() {
      window.open(this.modelValue, "_blank").focus();
    },
    setStateId(stateId) {
      this.$emit("stateId", stateId);
    },
  },
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  appearance: none;
}

.label-style {
  @apply bl-block bl-text-neutral-700 bl-text-sm bl-font-bold bl-mb-0.5;
}

.icon-input-custom {
  @apply bl-absolute bl-bottom-2 bl-text-2xl bl-right-2 bl-cursor-pointer;
}
.icon-input-custom svg {
  @apply bl-w-6 bl-h-6;
  fill: theme("colors.neutral.600");
}

input:checked ~ .dot {
  @apply bl-bg-neutral-950;
  transform: translateX(100%);
}

input[type="number"] {
  appearance: none;
  -moz-appearance: textfield;
}

/* Toggle B */
input:checked ~ .dot {
  @apply bl-bg-neutral-950;
  transform: translateX(100%);
}

.label-toggle {
  @apply bl-flex bl-items-center bl-cursor-pointer;
}
.label-toggle .label {
  @apply bl-ml-3 bl-text-gray-700 bl-font-light bl-text-sm;
}
.label-toggle .back {
  @apply bl-block bl-bg-gray-300 bl-w-14 bl-h-8 bl-rounded-full;
}
.label-toggle .circle {
  @apply bl-absolute bl-left-1 bl-top-1 bl-bg-white bl-w-6 bl-h-6 bl-rounded-full bl-transition;
}

.dark-mode .label-toggle .label {
  @apply bl-text-gray-200;
}
.dark-mode .label-toggle .back {
  @apply bl-bg-neutral-800;
}
.dark-mode .label-toggle .circle {
  @apply bl-bg-white;
}

.box-input {
  @apply bl-border bl-border-gray-300 bl-rounded-xl   bl-relative bl-bg-white;
  transition-duration: 0.3s text-main-950;
  appearance: none;
  -moz-appearance: none;
}
.box-input.gray {
  @apply bl-bg-gray-200;
}
.box-input.sm {
  @apply bl-p-1.5;
}
.box-input.md {
  @apply bl-py-1.5 bl-px-3;
}
.box-input.withlabel {
  @apply bl-pt-4;
}
.box-input .icon-input {
  @apply bl-h-7 bl-w-7 bl-absolute bl-bottom-2 bl-right-3;
  fill: theme("colors.gray.400");
}
.box-input .input-style {
  @apply bl-text-neutral-950 bl-w-full;
  appearance: none;
  -moz-appearance: none;
}
.box-input .input-style::-webkit-input-placeholder,
.box-input .input-style::placeholder {
  color: transparent;
}
.box-input .input-style:disabled {
  @apply bl-bg-transparent;
}
.box-input .input-style:focus,
.box-input .input-style:active {
  @apply bl-outline-none bl-border-neutral-950;
}
.box-input .label-style {
  @apply bl-top-5 bl-left-3 bl-absolute bl-font-light bl-text-gray-600;
  transition-duration: 0.3s;
}
.box-input.active {
  @apply bl-border-neutral-950 bl-border-2;
}
.box-input.active .icon-input {
  fill: theme("colors.neutral.950");
}
.box-input.active ::-webkit-input-placeholder,
.box-input.active ::placeholder,
.box-input.withvalue ::-webkit-input-placeholder,
.box-input.withvalue ::placeholder {
  color: #ddd;
}
.box-input.active .label-style,
.box-input.withvalue .label-style {
  @apply bl-text-xs bl-font-light bl-top-1;
}

.disabled .box-input {
  @apply bl-bg-gray-200 bl-text-neutral-800;
}
</style>
