<template>
  <div>
    <div
      class="bl-absolute bl-top-3 bl-left-3 bl-bg-red-600 hover:bl-bg-red-700 bl-cursor-pointer bl-text-white bl-px-3 bl-py-1 bl-text-sm bl-rounded-lg bl-z-30 bl-flex bl-items-center bl-gap-1 bl-select-none"
      @onMouseDown="
        (e:any) => {
          e.stopPropagation();
          let modalRef: any = $refs.modalRef;
          modalRef.hide()
        }
      "
    >
      <Icon icon="error" class="bl-size-4 bl-fill-white" />
      <div>Error</div>
    </div>

    <Modal size="lg" position="center" ref="modalRef">
      <ErrorDecide :error="props.data" />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import ErrorDecide from "./ErrorDecide.vue";

// Props
const props = defineProps({
  data: Object,
});
</script>
