<template>
  <div class="bl-table-footer">
    <select
      label="Per page"
      :value="perPage"
      @change="
        (e) => {
          setPerPage(+e.target.value);
        }
      "
    >
      <option :value="null">Select an option</option>
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="50">50</option>
      <option :value="100">100</option>
    </select>
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

<script>
import Icon from "../../../DS/Icon.vue";
import Input from "../../../DS/Form/Input.vue";

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
    Input,
  },
};
</script>
