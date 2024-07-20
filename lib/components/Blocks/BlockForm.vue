<template>
  <div class="bl-block-form">
    <div class="bl-block-form-header">
      <div class="bl-action-button" :onClick="() => onBack()" v-if="onBack">
        <Icon icon="left" class="bl-icon" />
      </div>

      <h2 class="bl-block-form-title">{{ block.description }}</h2>
    </div>

    <div class="bl-block-form-fields" v-if="block.filters.fields">
      <div
        v-for="(row, index) in block.filters.fields"
        :key="index"
        :class="`${row.grid == 6 ? 'bl-col-span-1' : 'bl-col-span-2'} `"
      >
        <BlockField
          :row="row"
          :form="form"
          :errors="errors"
          :setForm="setForm"
          :jwt="jwt"
        />
      </div>
    </div>

    <div class="bl-block-form-footer">
      <Button
        :text="block?.filters?.button || 'Generate'"
        @click="execBlock"
        variant="secondary"
        size="md"
      />
    </div>
  </div>
</template>
<script>
import BlockField from "./BlockFormField.vue";
import Icon from "../DS/Icon.vue";
import Button from "../DS/Form/Button.vue";
export default {
  name: "BlockForm",
  props: {
    block: {
      type: Object,
      required: true,
    },
    form: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
    setForm: {
      type: Function,
      required: true,
    },
    onBack: {
      type: Function,
      default: null,
    },
    jwt: {
      type: String,
      required: true,
    },
  },
  components: {
    BlockField,
    Button,
    Icon,
  },
  methods: {
    execBlock() {
      this.$emit("execBlock", this.block);
    },
  },
};
</script>
