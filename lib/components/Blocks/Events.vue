<template>
  <div>
    <Modal
      size="auto"
      position="center"
      ref="modalRef"
      bgColor="transparent"
      :onConfirmClose="hasChanges ? () => {
        let modalConfirmRef: any = $refs.modalConfirmRef;
        modalConfirmRef.show();
      } : undefined"
    >
      <BlockEvent
        v-if="subBlock.blockKey || subBlock.blockId"
        :jwt="jwt"
        :onChangeForm="
          () => {
            setHasChanges();
          }
        "
        :blockId="subBlock.blockId || ''"
        :blockKey="subBlock.blockKey"
        :defaultForm="subBlock.form"
        :onExec="
          (result:any) => {
            if (
              !result.type ||
              result.type == 'error' ||
              result.type == 'message'
            ) {
              let modalRef: any = $refs.modalRef;
              modalRef.hide();
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
            @click="() => {
              let modalConfirmRef: any = $refs.modalConfirmRef;
              modalConfirmRef.hide();
            }"
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
<script lang="ts">
import { defineComponent } from "vue";
import BlockEvent from "./Block.vue";

import { Modal, Button } from "../DS/Index";

export default defineComponent({
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
  beforeCreate: function () {
    let options: any = this.$options;
    options.components.BlockEvent = BlockEvent;
  },
  methods: {
    closeBlock() {
      let modalRef: any = this.$refs.modalRef;
      let modalConfirmRef: any = this.$refs.modalConfirmRef;
      modalRef.hide();
      modalConfirmRef.hide();
      this.hasChanges = false;
    },
    openBlock({ blockId, blockKey, form }: any) {
      let modalRef: any = this.$refs.modalRef;
      this.subBlock = { blockId, blockKey, form };
      console.log(modalRef, this.subBlock);
      modalRef.show();
    },
    setHasChanges() {
      this.hasChanges = true;
    },
  },
});
</script>
