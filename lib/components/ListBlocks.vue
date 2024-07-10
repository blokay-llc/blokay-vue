<template>
  <div>
    <div v-for="(g, key) in listComputed" :key="key">
      <h2 class="list-title">{{ g.name }}</h2>
      <div v-for="n in g.items" :key="n.id">
        <box-option
          @click="viewReport(n.id)"
          :label="n.description"
          :icon="n.icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { postRequest } from "@/common/api.service.js";
import BoxOption from "@/components/DS/BoxOption.vue";

export default {
  name: "neuron-list",
  props: {
    group: { type: String, default: "" },
  },
  computed: {
    ...mapGetters(["user", "business"]),
    listComputed() {
      return this.neurons.reduce((ac, item) => {
        let category = item?.Group || { name: "", id: null };
        if (!ac[category.id]) {
          ac[category.id] = {
            name: category.name,
            id: category.id,
            items: [],
          };
        }
        ac[category.id].items.push(item);
        return ac;
      }, {});
    },
  },
  components: {
    BoxOption,
  },
  data() {
    return {
      neurons: [],
      loading: false,
    };
  },
  mounted() {
    this.listNeurons();
  },
  methods: {
    viewReport(neuronId) {
      this.$emit("viewReport", neuronId);
    },
    listNeurons() {
      this.loading = true;
      let data = {
        group: this.group,
      };
      postRequest("brain/list", data, this.user, { sponsored: true })
        .then((result) => {
          this.neurons = result.data.Neurons;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style>
.list-title {
  @apply font-bold my-5 text-main-950;
}
</style>
