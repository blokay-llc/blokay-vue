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
import InputFile from '@/components/DS/Form/Input/Types/File.vue';
import InputSelect from '@/components/DS/Form/Input/Types/Select.vue';
import InputSelectcustom from '@/components/DS/Form/Input/Types/Selectcustom.vue';
import InputCountry from '@/components/DS/Form/Input/Types/Country.vue';
import InputMoney from '@/components/DS/Form/Input/Types/Money.vue';
import InputPassword from '@/components/DS/Form/Input/Types/Password.vue';
import InputCellphone from '@/components/DS/Form/Input/Types/Cellphone.vue';
import InputTextarea from '@/components/DS/Form/Input/Types/Textarea.vue';
import InputToggle from '@/components/DS/Form/Input/Types/Toggle.vue';
import InputCheckbox from '@/components/DS/Form/Input/Types/Checkbox.vue';
import InputOtp from '@/components/DS/Form/Input/Types/Otp.vue';
import InputCity from '@/components/DS/Form/Input/Types/City.vue';
import InputDane from '@/components/DS/Form/Input/Types/Dane.vue';
import InputDefault from '@/components/DS/Form/Input/Types/Default.vue';
import InputBarcode from '@/components/DS/Form/Input/Types/Barcode.vue';

export default {
  name: 'app-input',
  props: {
    options: { type: Array, default: null, required: false },
    stateId: { type: String, required: false },
    label: { type: String, required: false },
    items: { type: Array, required: false },
    type: { type: String, required: false, default: 'text' },
    placeholder: { type: String, required: false },
    modelValue: { required: false },
    extraClass: { type: String, required: false },
    disabled: { type: Boolean, required: false, default: false },
    name: { type: String, required: false, default: '' },
    limitFiles: { type: Number, required: false, default: 1 },
    variant: { type: String, required: false, default: 'l' },
    mb: { type: String, required: false, default: 'mb-3 md:mb-4' },
    icon: { type: String, required: false, default: '' },
    size: { type: String, required: false, default: 'md' },
    error: { type: String, required: false, default: null },
  },
  emits: ['update:modelValue', 'changeInput', 'select', 'onChange'],
  components: {
    InputFile,
    InputSelect,
    InputSelectcustom,
    InputCountry,
    InputMoney,
    InputPassword,
    InputCellphone,
    InputTextarea,
    InputToggle,
    InputCheckbox,
    InputDefault,
    InputOtp,
    InputCity,
    InputDane,
    InputBarcode,
  },
  computed: {
    componentName() {
      const types = {
        select: 'input-select',
        'select-custom': 'input-selectcustom',
        cellphone: 'input-cellphone',
        country: 'input-country',
        money: 'input-money',
        amount: 'input-money',
        password: 'input-password',
        textarea: 'input-textarea',
        default: 'input-default',
        checkbox: 'input-checkbox',
        file: 'input-file',
        otp: 'input-otp',
        toggle: 'input-toggle',
        city: 'input-city',
        dane: 'input-dane',
        barcode: 'input-barcode',
      };

      return types[this.type] || 'input-default';
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
      this.$emit('onChange', val);
    },

    uploadPhoto(pics) {
      this.$emit('update:modelValue', pics.url);
    },

    changeInput(value) {
      this.$emit('change', value);
      this.$emit('changeInput', value);
      this.$emit('update:modelValue', value);
    },
    select(value) {
      this.$emit('select', value);
    },
    viewPhoto() {
      window.open(this.modelValue, '_blank').focus();
    },
    setStateId(stateId) {
      this.$emit('stateId', stateId);
    },
  },
};
</script>
<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  appearance: none;
}
.label-style {
  @apply block text-neutral-700 text-sm font-bold mb-0.5;
}
.icon-input-custom {
  @apply absolute bottom-2 text-2xl right-2 cursor-pointer;
  svg {
    @apply w-6 h-6;
    fill: theme('colors.neutral.600');
  }
}

input:checked ~ .dot {
  @apply bg-main-950;
  transform: translateX(100%);
}
input[type='number'] {
  appearance: none;
  -moz-appearance: textfield;
}

/* Toggle B */
input:checked ~ .dot {
  @apply bg-main-950;

  transform: translateX(100%);
}

.label-toggle {
  @apply flex items-center cursor-pointer;
  .label {
    @apply ml-3 text-gray-700 font-light text-sm;
  }
  .back {
    @apply block bg-gray-300 w-14 h-8 rounded-full;
  }
  .circle {
    @apply absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition;
  }
}
.dark-mode {
  .label-toggle {
    .label {
      @apply text-gray-200;
    }
    .back {
      @apply bg-neutral-800;
    }
    .circle {
      @apply bg-white;
    }
  }
}

.box-input {
  @apply border border-gray-300 rounded-xl   relative bg-white;
  transition-duration: 0.3s text-main-950;
  -moz-appearance: none;
  &.gray {
    @apply bg-gray-200;
  }
  &.sm {
    @apply p-1.5;
  }

  &.md {
    @apply py-1.5 px-3;
  }
  &.withlabel {
    @apply pt-4;
  }
  // &.disabled {
  //   @apply bg-gray-200 text-gray-600;
  // }

  .icon-input {
    @apply h-7 w-7 absolute bottom-2 right-3;
    fill: theme('colors.gray.400');
  }
  .input-style {
    @apply text-main-950 w-full;
    appearance: none;
    -moz-appearance: none;
    &::-webkit-input-placeholder,
    &::placeholder {
      color: transparent;
    }

    &:disabled {
      @apply bg-transparent;
    }

    &:focus,
    &:active {
      @apply outline-none border-main-950;
    }
  }
  .label-style {
    @apply top-5 left-3 absolute font-light text-gray-600;
    transition-duration: 0.3s;
  }
  &.active {
    @apply border-main-950 border-2;
    .icon-input {
      fill: theme('colors.main.950');
    }
  }
  &.active,
  &.withvalue {
    ::-webkit-input-placeholder,
    ::placeholder {
      color: #ddd;
    }
    .label-style {
      @apply text-xs font-light top-1;
    }
  }
}
.disabled .box-input {
  @apply bg-gray-200 text-main-800;
}
</style>
