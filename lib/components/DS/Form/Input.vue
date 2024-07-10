<template>
  <div>
    <div
      class="box-input"
      :class="{
        active: activeInput,
        withvalue: !!modelValue || type == 'date' || type == 'time' || type == 'datetime-local',
        [size]: true,
        withlabel: !!label,
      }"
      @click="clickInput"
    >
      <icon :icon="icon" v-if="icon" class="icon-input" />
      <label
        class="label-style"
        :class="{ 'text-white': variant == 'darken', 'text-gray-700': variant != 'darken' }"
        :for="id"
        v-if="label"
      >
        {{ label }}
      </label>
      <input
        @wheel="$event.target.blur()"
        :value="modelValue"
        @input="change"
        class="input-style"
        :class="{ darken: variant == 'darken' }"
        :type="type"
        :id="id"
        :placeholder="placeholder || label"
        :disabled="disabled"
        @keydown="
          (evt) => {
            type == 'number' && ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault();
          }
        "
        @change="handleChange"
        onKeyDown="{}"
      />
    </div>
    <div v-if="error" class="error-style">{{ error }}</div>
  </div>
</template>
<script>
import BaseInput from './Base.vue';

export default {
  name: 'input-default',
  extends: BaseInput,
};
</script>
