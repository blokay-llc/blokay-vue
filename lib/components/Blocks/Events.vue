<template>
  <div>
    <Modal
      size="auto"
      position="center"
      ref="modalRef"
      bgColor="transparent"
      :onConfirmClose="hasChanges ? () => $refs.modalConfirmRef.show() : null"
    >
      <BlockEvent
        v-if="subBlock.blockKey || subBlock.blockId"
        :jwt="jwt"
        :onChangeForm="
          () => {
            setHasChanges(true);
          }
        "
        :blockId="subBlock.blockId"
        :blockKey="subBlock.blockKey"
        :defaultForm="subBlock.form"
        :onExec="
          (result) => {
            if (
              !result.type ||
              result.type == 'error' ||
              result.type == 'message'
            ) {
              $refs.modalRef.hide();
              onExecuted && onExecuted();
            }
          }
        "
      />
    </Modal>

    <Modal size="sm" position="center" ref="modalConfirmRef">
      Are you sure you want to close this block?

      <template #footer>
        <div class="flex items-center gap-5">
          <Button
            text="No, cancel"
            @click="() => $refs.modalConfirmRef.hide()"
            variant="secondary"
            class="w-full"
            size="md"
          />
          <Button
            text="Yes, close"
            @click="() => closeBlock()"
            variant="primary"
            class="w-full"
            size="md"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
// import BlockEvent from "./Block.vue";
import Modal from "../DS/Modal.vue";
import Button from "../DS/Form/Button.vue";

export default {
  name: "EventsHandler",
  props: {
    onExecuted: {
      type: Function,
      default: null,
    },
    jwt: {
      type: String,
      default: null,
    },
  },
  components: {
    BlockEvent: defineAsyncComponent(() => import("./Block.vue")),
    Modal,
    Button,
  },
  data() {
    return {
      subBlock: {
        blockId: null,
        blockKey: "",
        form: {},
      },
      hasChanges: false,
    };
  },
  methods: {
    closeBlock() {
      this.$refs.modalRef.hide();
      this.$refs.modalConfirmRef.hide();
      this.hasChanges = false;
    },
    openBlock({ blockId, blockKey, form }) {
      this.subBlock = { blockId, blockKey, form };
      this.$refs.modalRef.show();
    },
    setHasChanges() {
      this.hasChanges = true;
    },
  },
};
</script>
