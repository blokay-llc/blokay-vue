<template>
  <div class="bl-table-footer">
    <div>
      <Select
        :modelValue="perPage"
        label="Per page"
        @change="
          (val) => {
            setPerPage(+val);
          }
        "
      >
        <option :value="null">Select an option</option>
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </Select>
    </div>
    <div class="bl-table-page">
      <div
        v-if="page > 0"
        class="bl-action-button"
        @click="() => setPage(page - 1)"
      >
        <Icon icon="left" class="bl-icon" />
      </div>
      <span> Page: {{ page }} - {{ pagesCount }} </span>

      <div
        v-if="page < pagesCount"
        class="bl-action-button"
        @click="() => setPage(page + 1)"
      >
        <Icon icon="right" class="bl-icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Icon from "../../../DS/Icon.vue";
import Select from "../../../DS/Form/Select.vue";

export default {
  name: "TableFooter",
  props: {
    perPage: { type: [String, Number], default: "" },
    setPerPage: { type: Function, default: () => {} },
    setPage: { type: Function, default: () => {} },
    page: { type: Number, default: 1 },
    pagesCount: { type: Number, default: 1 },
  },
  components: {
    Icon,
    Select,
  },
};
</script>
