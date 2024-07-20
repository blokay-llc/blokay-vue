<template>
  <component
    :is="tag"
    :target="target"
    @click="onClick"
    :disabled="disabled"
    v-bind="propsComputed"
    :class="{
      'bl-size-lg': size === 'lg',
      'bl-size-md': size === 'md',
      'bl-size-sm': size === 'sm',
      'bl-size-xs': size === 'xs',

      'bl-btn-disabled': disabled,
      'bl-btn-primary': variant === 'primary',
      'bl-btn-secondary': variant === 'secondary',
      'bl-btn-third': variant === 'third',
      'bl-btn-neutral': variant === 'neutral',
      'bl-btn': true,
    }"
  >
    <span v-if="text || icon">
      <div class="bl-flex bl-justify-center bl-items-center bl-gap-2">
        <div v-if="loading" class="bl-icon-btn bl-shrink-0">
          <Loader size="sm" />
        </div>

        <div v-if="icon && !loading" class="bl-icon-btn bl-shrink-0">
          <Icon :icon="icon" :class="classNameIcon" />
        </div>

        <span v-if="text">{{ text }}</span>
      </div>
    </span>

    <slot v-if="!text"></slot>
  </component>
</template>

<script lang="ts">
import Loader from "../Loader.vue";
import Icon from "../Icon.vue";

export default {
  name: "XButton",
  components: {
    Icon,
    Loader,
  },
  props: {
    disabled: { type: Boolean, default: false },
    size: { type: String, default: "md" },
    variant: { type: String, default: "primary" },
    href: { type: String, default: null },
    to: { type: String, default: null },
    target: { type: String, default: null },
    loading: { type: Boolean, default: false },
    icon: { type: String, default: null },
    text: { type: String, default: null },
    classColor: { type: String, default: null },
    children: { type: String, default: null },
    onClick: { type: Function, default: null },
    className: { type: String, default: null },
    type: { type: String, default: "button" },
  },
  computed: {
    tag() {
      if (this.href) return "a";
      return "button";
    },

    propsComputed() {
      const propsObj: any = { type: this.type || "button" };
      if (this.href) propsObj.href = this.href;
      if (this.to) propsObj.to = this.to;
      return propsObj;
    },
    classNameIcon() {
      let color = "";
      if (this.variant === "primary") {
        color = ` bl-h-full bl-fill-white dark:bl-fill-black  `;
      } else if (this.variant === "secondary") {
        color = ` bl-h-full bl-fill-neutral-800 dark:bl-fill-neutral-300  `;
      } else if (this.variant === "third") {
        color = ` bl-h-full bl-fill-neutral-800 dark:bl-fill-neutral-300  `;
      }
      return `bl-h-full bl-h-4 md:bl-h-4 w-4 ${color}`;
    },
  },
};
</script>
