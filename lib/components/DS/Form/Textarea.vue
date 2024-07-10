<template>
  <div
    class="box-input"
    :class="{ active: !!activeInput, withvalue: !!modelValue, [size]: true, withlabel: !!label }"
    @click="clickInput"
  >
    <label class="label-style" :for="id" v-if="label">
      {{ label }}
    </label>
    <textarea
      :value="modelValue"
      @input="change"
      class="input-style w-full"
      :class="{ darken: variant == 'darken' }"
      :id="id"
      :placeholder="placeholder || label"
    />
  </div>
</template>
<script>
import BaseInput from './Base.vue';

export default {
  name: 'input-textarea',
  extends: BaseInput,
};
</script>