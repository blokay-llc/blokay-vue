<template>
  <div :class="`bl-block-response bl-response-${response?.type}`">
    <component
      :data="response.content"
      :blockName="block?.description"
      :onReload="onReload"
      :onBack="onBack"
      :title="block.description"
      :autoExecuted="autoExecuted"
      :options="options"
      :is="Component"
    />
  </div>
</template>
<script>
import { Table } from "./Types/Table/Index";
import Line from "./Types/ChartLine.vue";
import Values from "./Types/Values.vue";
import Exception from "./Types/Exception/Index.vue";
// import ChartDoughnut from "./Types/ChartDoughnut.vue";
import Message from "./Types/Message.vue";

export default {
  name: "BlockResponse",
  props: {
    block: {
      type: Object,
      required: true,
    },
    response: {
      type: Object,
      required: true,
    },
    onReload: {
      type: Function,
      required: false,
    },
    onBack: {
      type: Function,
      required: false,
    },
    autoExecuted: {
      type: Boolean,
      required: false,
    },
    defaultOptions: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Table,
    Line,
    Values,
    Exception,
    // ChartDoughnut,
    Message,
  },
  computed: {
    Component() {
      return this.response?.type || "exception";
    },
    options() {
      return {
        ...this.defaultOptions,
        ...(this.block?.options || {}),
      };
    },
  },
};
</script>
