<template>
  <tr v-if="footerRowVals?.length > 0">
    <td v-for="(item, index) in footerRowVals" :key="'footer-row-' + index">
      <span class="bl-text-sm bl-font-bold">
        <span>{{ item?.val }}</span>
      </span>
    </td>
  </tr>
</template>
<script lang="ts">
export default {
  props: {
    data: { type: Array, default: () => [] },
  },
  computed: {
    footerRowVals() {
      if (!this.data?.length) return { sum: [] };
      let actived = false;
      const sumArray: any = Array(this.data[0].length).fill(null);
      for (const row of this.data) {
        for (const index in row) {
          const val = row[index];
          if (typeof val != "object") {
            continue;
          }
          actived = true;
          if (val.fn == "SUM") {
            if (!sumArray[index])
              sumArray[index] = { val: 0, fn: val.fn, type: val.type };
            sumArray[index].val += +val.text;
          } else if (val.fn === "COUNT") {
            if (!sumArray[index])
              sumArray[index] = { val: 0, fn: val.fn, type: val.type };
            sumArray[index].val += 1;
          }
        }
      }

      if (!actived) return [];
      return sumArray.map((item: any) => {
        if (!item) return null;
        let val = item.val;
        if (item.type == "money") {
          val = this.money(val);
        }
        item.val = val;
        return item;
      });
    },
  },
};
</script>
