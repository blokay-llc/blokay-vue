<template>
  <div class="relative w-full">
    <div
      class="box-input relative withvalue withlabel"
      :class="{ active: activeInput, [size]: true }"
      @click="clickInput"
    >
      <label class="label-style z-10" :for="id" v-if="label">
        {{ label }}
      </label>
      <label
        :for="id"
        v-if="label"
        class="absolute bottom-4 right-2 bg-white rounded-full p-1 h-6 w-6 flex items-center justify-center"
      >
        <app-img src="/web/icons/drop.svg" style="width: 16px" />
      </label>

      <div
        :value="modelValue"
        @input="change"
        class="input-style w-full truncate pr-10"
        :class="{ darken: variant == 'darken' }"
        :id="id"
      >
        {{ text || 'Seleccionar' }}
      </div>
    </div>
    <app-modal
      :position="isMobile ? 'bottom' : 'center'"
      size="sm"
      ref="dropdown"
      @hide="clickOutside"
      containerClass="w-full"
      title="Seleccionar una opción"
    >
      <app-loader v-if="options.length == 0" class="mx-auto" />
      <div v-else>
        <app-input
          type="text"
          v-model="search"
          label="Buscador"
          placeholder="Buscador"
          icon="search"
          v-if="options.length > 10"
        />
        <ul class="w-full options-menu">
          <li v-for="option in optionsComputed" :key="option.value" @click="selectOption(option)">
            <span :class="{ selected: modelValue == option.value }">{{ option.text }}</span>
          </li>
        </ul>
      </div>
    </app-modal>
  </div>
</template>
<script>
import BaseInput from './Base.vue';

export default {
  name: 'input-select',
  extends: BaseInput,

  data() {
    return {
      search: '',
    };
  },
  computed: {
    optionsComputed() {
      let s = this.search.toLowerCase();
      return this.options.filter((o) => {
        let text = '' + o.text || '';
        return text.toLowerCase().includes(s);
      });
    },
    text() {
      let opt = this.options.find((opt) => opt.value == this.modelValue);
      let text = '' + (opt?.text || '');
      return text;
    },
  },
  methods: {
    isSame(a, b) {
      if (!a.length) return false;
      if (!b.length) return false;

      for (let el of a) {
        let find = b.find((x) => x.value == el.value);
        if (!find) {
          return false;
        }
      }
      return true;
    },
    selectOption(option) {
      this.$emit('changeInput', '' + option.value);
      this.$emit('onChange', '' + option.value);
      this.$refs.dropdown.hide();
    },
    clickInput() {
      this.search = '';
      this.$refs.dropdown.show();
      this.activeInput = true;
    },
    clickOutside() {
      this.activeInput = false;
      // this.$refs.dropdown.show();
    },
  },
  watch: {
    options(a, b) {
      if (this.isSame(a, b)) {
        return;
      }
    },
  },
};
</script>

<style lang="scss">
.options-menu {
  li,
  .drop-container {
    svg {
      @apply h-5 w-5;
      fill: theme('colors.gray.400');
    }
    a,
    span,
    option {
      @apply font-light  py-2 md:py-2 px-5 md:text-base text-sm border-b border-gray-200 whitespace-nowrap cursor-pointer hover:bg-gray-100 text-black flex items-center gap-2;
      &.selected {
        @apply font-bold;
      }
    }
  }

  &.sm {
    li {
      a,
      span {
        @apply text-sm;
      }
    }
  }
}
</style>
