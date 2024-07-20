<template>
  <div>
    <ShowError
      v-if="error.name == 'SQL_ERROR'"
      :type="error.name"
      :message="error.message"
      :fullDescription="error.sql"
    />
    <ShowError v-else :type="error?.name" :message="error?.message" />
  </div>
</template>
<script lang="ts">
import ShowError from "./ShowError.vue";
export default {
  props: {
    error: { type: Object, default: () => {} },
  },
  components: {
    ShowError,
  },
};
</script>
