<template>
  <div v-if="view">
    <div class="bl-view-title">
      <h2>{{ view.name }}</h2>
    </div>
    <div
      class="bl-view-grid"
      style="grid-template-columns: repeat(24, minmax(0, 1fr))"
    >
      <div
        v-for="vItem in view.ViewItems"
        :key="vItem.id"
        @mousedown="props.onMouseDown"
        @mouseup="props.onMouseUp"
        @touchend="props.onTouchEnd"
        :style="{
          gridColumn: `${vItem.x + 1} / ${vItem.x + vItem.w + 1}`,
          gridRow: `${vItem.y + 1} / ${vItem.y + vItem.h + 1}`,
        }"
      >
        <Block
          v-if="vItem.type == 'block'"
          class="bl-view-block"
          :blockId="vItem.blockId"
          :defaultForm="{}"
          :endpoint="props.endpoint"
          :jwt="props.jwt"
        />
        <Button
          :text="vItem.options.label"
          v-else-if="vItem.type == 'button'"
          @click="
            () => {
              callEvent({
                click: vItem.options.click,
                args: { blockKey: vItem.options.blockKey },
              });
            }
          "
          variant="secondary"
          class="w-full"
          size="md"
        />

        <img v-else-if="vItem.type == 'image'" :src="vItem.options.src" />
        <p v-else-if="vItem.type == 'text'">
          {{ vItem.options.text }}
        </p>

        <slot></slot>
      </div>
    </div>

    <Events ref="eventsRef" :onExecuted="() => {}" :jwt="props.jwt" />
  </div>
</template>
<script setup lang="ts">
import Block from "./Block.vue";
import { Button } from "../DS/Index";
import Events from "./Events.vue";
import useApi from "../../common/blokay.service";
import { ref, onMounted } from "vue";

const eventsRef = ref(null);

const props = defineProps({
  resource: {
    type: String,
    required: true,
  },
  onMouseDown: {
    type: Function,
    default: null,
  },
  onMouseUp: {
    type: Function,
    default: null,
  },
  onTouchEnd: {
    type: Function,
    default: null,
  },
  endpoint: {
    type: String,
    default: null,
  },
  jwt: {
    type: String,
    default: null,
  },
  workspace: {
    type: String,
    default: null,
  },
});

const api = useApi(props.endpoint, {
  getJwtToken: () => props.jwt,
});

let view: any = ref({});

const getView = async () => {
  const result = await api.getView({
    resource: props.resource,
    workspace: props.workspace,
  });
  view = result.View;
};

onMounted(async () => {
  view.value = await getView();
});

const callEvent = (td: any) => {
  console.log(td);
  let ref: any = eventsRef.value;
  td.click && ref[td.click](td.args);
};
</script>
