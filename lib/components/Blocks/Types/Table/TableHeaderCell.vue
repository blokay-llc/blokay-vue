<template>
  <th
    @click="
      () =>
        setSort({
          [index]: sort?.[index] == 'DESC' ? 'ASC' : 'DESC',
        })
    "
  >
    <div class="bl-table-th">
      <span>{{ th.replaceAll("__", " ") }}</span>
      <Icon
        v-if="sort && sort[index]"
        :icon="sort?.[index] == 'ASC' ? 'arrow_top' : 'arrow_bottom'"
        class="bl-table-th-icon"
      />
    </div>
  </th>
</template>
<script>
import Icon from "../../../DS/Icon.vue";
export default {
  props: {
    setSort: { type: Function, default: () => {} },
    index: { type: Number, default: 0 },
    sort: { type: Object, default: () => {} },
    th: { type: String, default: "" },
  },
  components: {
    Icon,
  },
};
</script>
