<template>
  <td>
    <template v-if="typeof td == 'object'">
      <template v-if="td == null">
        <strong>NULL</strong>
      </template>
      <template v-if="td?.type == 'money' || td?.type == 'number'">
        <span>{{ money(td.text) }}</span>
      </template>
      <template v-if="td?.type == 'text'">
        <span>{{ td.text }}</span>
      </template>
      <template v-if="td?.html">
        <div v-html="td.html" @click="() => clickButton(td)"></div>
      </template>
    </template>

    <template v-else>
      <template v-if="td.length > 50">
        <div>
          <div>{{ ("" + td).substring(0, 50) }}...</div>
          <div class="bl-table-show-all" @click="() => showAll(td)">
            Show all
          </div>
        </div>
      </template>
      <template v-else>
        {{ td }}
      </template>
    </template>
  </td>
</template>
<script>
export default {
  name: "TableCell",
  props: {
    td: { type: [String, Object, Number], default: () => {} },
    showAll: { type: Function, default: () => {} },
  },
  methods: {
    clickButton(td) {
      this.$emit("callEvent", { click: td.click, td: td.args });
    },
  },
};
</script>
