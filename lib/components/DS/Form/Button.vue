<template>
  <component
    :is="tag"
    :class="`${classBtn} ${classNameColor} ${classNameSize}`"
    :target="target"
    @click="onClick"
    :disabled="disabled"
    v-bind="propsComputed"
  >
    <span v-if="text || icon">
      <div class="bl-flex bl-justify-center bl-items-center bl-gap-2">
        <div v-if="loading" class="bl-icon-btn bl-shrink-0">
          <Loader size="sm" />
        </div>

        <div v-if="icon && !loading" class="bl-icon-btn bl-shrink-0">
          <Icon icon="{icon}" class="{classNameIcon()}" />
        </div>

        <span v-if="text">{{ text }}</span>
      </div>
    </span>

    <slot v-if="!text"></slot>
  </component>
</template>

<script>
import Loader from '../Loader.vue';
import Icon from '../Icon.vue';

export default {
  name: 'XButton',
  components: {
    Icon,
    Loader,
  },
  props: {
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    variant: { type: String, default: 'primary' },
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
    type: { type: String, default: 'button' },
  },
  computed: {
    tag() {
      if (this.href) return 'a';
      return 'button';
    },
    classNameSize() {
      let sizeClass = `bl-py-1 bl-px-2 bl-text-sm`;
      if (this.size === 'lg') {
        sizeClass = `bl-py-3 bl-px-5 bl-text-sm`;
      } else if (this.size === 'md') {
        sizeClass = `bl-py-1.5 bl-px-2 bl-text-sm`;
      } else if (this.size === 'sm') {
        sizeClass = `bl-py-1.5 bl-px-2 bl-text-xs md:bl-text-sm`;
      } else if (this.size === 'xs') {
        sizeClass = `bl-py-1 bl-px-3 bl-text-xs`; // TODO
      }

      return sizeClass;
    },
    classNameColor() {
      if (this.classColor) {
        return this.classColor;
      } else if (this.disabled) {
        return 'bl-btn-disabled';
      } else if (this.variant === 'primary') {
        return `bl-btn-primary`;
      } else if (this.variant === 'secondary') {
        return 'bl-btn-secondary';
      } else if (this.variant === 'third') {
        return 'bl-btn-third';
      } else if (this.variant === 'neutral') {
        return 'bl-btn-neutral';
      }
    },
    classBtn() {
      return `bl-btn${this.className ? ' ' + this.className : ''}`;
    },
    propsComputed() {
      const propsObj = { type: this.type || 'button' };
      if (this.href) propsObj.href = this.href;
      if (this.to) propsObj.to = this.to;
      return propsObj;
    },
    classNameIcon() {
      let color = '';
      if (this.variant === 'primary') {
        color = ` bl-h-full bl-fill-white dark:bl-fill-black  `;
      } else if (this.variant === 'secondary') {
        color = ` bl-h-full bl-fill-neutral-800 dark:bl-fill-neutral-300  `;
      } else if (this.variant === 'third') {
        color = ` bl-h-full bl-fill-neutral-800 dark:bl-fill-neutral-300  `;
      }
      return `bl-h-full bl-h-4 md:bl-h-4 w-4 ${color}`;
    },
  },
};
</script>
