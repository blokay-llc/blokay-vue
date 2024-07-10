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
        {{ text || "Seleccionar" }}
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
          <li
            v-for="option in optionsComputed"
            :key="option.value"
            @click="selectOption(option)"
          >
            <span :class="{ selected: modelValue == option.value }">{{
              option.text
            }}</span>
          </li>
        </ul>
      </div>
    </app-modal>
  </div>
</template>
<script>
import BaseInput from "./Base.vue";

export default {
  name: "input-select",
  extends: BaseInput,

  data() {
    return {
      search: "",
    };
  },
  computed: {
    optionsComputed() {
      let s = this.search.toLowerCase();
      return this.options.filter((o) => {
        let text = "" + o.text || "";
        return text.toLowerCase().includes(s);
      });
    },
    text() {
      let opt = this.options.find((opt) => opt.value == this.modelValue);
      let text = "" + (opt?.text || "");
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
      this.$emit("changeInput", "" + option.value);
      this.$emit("onChange", "" + option.value);
      this.$refs.dropdown.hide();
    },
    clickInput() {
      this.search = "";
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

<style>
.options-menu li svg,
.options-menu .drop-container svg {
  @apply bl-h-5 bl-w-5;
  fill: theme("colors.gray.400");
}
.options-menu li a,
.options-menu li span,
.options-menu li option,
.options-menu .drop-container a,
.options-menu .drop-container span,
.options-menu .drop-container option {
  @apply bl-font-light  bl-py-2 md:bl-py-2 bl-px-5 md:bl-text-base bl-text-sm bl-border-b bl-border-gray-200 bl-whitespace-nowrap bl-cursor-pointer hover:bl-bg-gray-100 bl-text-black bl-flex bl-items-center bl-gap-2;
}
.options-menu li a.selected,
.options-menu li span.selected,
.options-menu li option.selected,
.options-menu .drop-container a.selected,
.options-menu .drop-container span.selected,
.options-menu .drop-container option.selected {
  @apply bl-font-bold;
}
.options-menu.sm li a,
.options-menu.sm li span {
  @apply bl-text-sm;
}
</style>
