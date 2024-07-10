<template>
  <div>
    <Modal
      size="auto"
      position="center"
      ref="modalRef"
      bgColor="transparent"
      :onConfirmClose="hasChanges ? () => modalConfirmRef.current.showModal() : null"
    >
      <Block
        v-if="subBlock.blockKey || subBlock.blockId"
        :onChangeForm="
          () => {
            setHasChanges(true);
          }
        "
        blockId="{subBlock.blockId}"
        blockKey="{subBlock.blockKey}"
        defaultForm="{subBlock.form}"
        :onExec="
          (result) => {
            if (!result.type || result.type == 'error' || result.type == 'message') {
              modalRef.current.hideModal();
              onExecuted && onExecuted();
            }
          }
        "
      />
    </Modal>

    <Modal size="sm" position="center" ref="{modalConfirmRef}">
      Are you sure you want to close this block?

      <template #footer>
        <div class="flex items-center gap-5">
          <Button
            text="No, cancel"
            :onClick="() => modalConfirmRef.current.hideModal()"
            variant="secondary"
            class="w-full"
            size="md"
          />
          <Button
            text="Yes, close"
            :onClick="() => closeBlock()"
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
import Block from './Block';

export default {
  name: 'EventsHandler',
  props: {
    onExecuted: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      subBlockDefault: {
        blockId: null,
        blockKey: '',
        form: {},
      },
      subBlock: this.subBlockDefault,
      hasChanges: false,
      modalRef: null,
      modalConfirmRef: null,
    };
  },
  methods: {
    closeBlock() {
      this.modalRef.current.hideModal();
      this.modalConfirmRef.current.hideModal();
      this.hasChanges = false;
    },
    openBlock({ blockId, blockKey, form }) {
      this.subBlock = { blockId, blockKey, form };
      this.modalRef.current.showModal();
    },
    setHasChanges() {
      this.hasChanges = true;
    },
  },
};
</script>
