<template>
  <div>
    <ShowError
      v-if="props.error.name == 'SQL_ERROR'"
      :type="props.error.name"
      :message="props.error.message"
      :fullDescription="props.error.sql"
    />
    <ShowError
      v-else
      :type="props.error?.name"
      :message="props.error?.message"
    />
  </div>
</template>
<script lang="ts" setup>
import ShowError from "./ShowError.vue";

// Props
const props = defineProps({
  error: { type: Object, default: () => {} },
});
</script>
