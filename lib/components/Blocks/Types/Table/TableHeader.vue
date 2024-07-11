<template>
  <div>
    <div class="bl-table-header">
      <div class="bl-flex bl-gap-3 bl-items-center bl-mr-auto">
        <div
          v-if="onBack && !autoExecuted"
          class="bl-back-button"
          @click="onBack"
        >
          <Icon icon="left" class="bl-icon" />
        </div>

        <div v-if="showTitle" class="bl-table-title">
          {{ blockName }}
        </div>
      </div>

      <div
        v-if="showSearchBar && data?.data?.length > 10"
        class="bl-ml-auto lg:bl-w-1/3"
      >
        <Input
          type="text"
          v-model="search"
          @change="
            (v) => {
              setPage(1);
              setFilters({ ...filters, search: v });
            }
          "
          autocomplete="off"
          label="Search"
          icon="search"
          class="bl-input-search-main"
        />
      </div>

      <Button
        v-if="canExport && data.data.length"
        variant="secondary"
        type="button"
        size="xs"
        icon="download"
        text="Export"
        :onClick="() => generateCSV()"
      />

      <Button
        variant="secondary"
        type="button"
        size="xs"
        icon="filter"
        v-if="canFilter && data.data.length > 0"
        :text="`Filter${
          filters.fields.length > 0 ? ' (' + filters.fields.length + ')' : ''
        }`"
        :onClick="() => clickFilter()"
      />

      <Button
        icon="refresh"
        variant="secondary"
        type="button"
        size="xs"
        text="Refresh"
        :onClick="() => onReload && onReload()"
      />
    </div>

    <Modal size="md" position="center" ref="modalFilter">
      <div
        class="bl-flex bl-flex-col bl-gap-3 bl-mb-5"
        v-if="filters.fields.length"
      >
        <div
          v-for="(item, index) in filters.fields"
          class="bl-grid bl-grid-cols-12 bl-items-center bl-gap-2"
          :key="index"
        >
          <div class="bl-col-span-4">
            <select
              label="Column"
              :value="item.col"
              @change="
                (e) => {
                  const newFilters = { ...this.filters };
                  newFilters.fields[index].col = e.target.value;
                  setFilters(newFilters);
                }
              "
            >
              <option
                v-for="(item, index) in data.header"
                :key="'filter-col-' + index"
                :value="index"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="bl-col-span-3">
            <select
              label="Condition"
              :value="item.cond"
              @change="
                (e) => {
                  const newFilters = { ...this.filters };
                  newFilters.fields[index].cond = e.target.value;
                  setFilters(newFilters);
                }
              "
            >
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value="=">Equals to</option>
              <option value="!=">Different to</option>
              <option value="contains">Contains</option>
              <option value="not_contains">Not contains</option>
            </select>
          </div>
          <div class="bl-col-span-4">
            <input
              label="Value"
              :value="item.value"
              @change="
                (e) => {
                  const newFilters = { ...this.filters };
                  newFilters.fields[index].value = e.target.value;
                  setFilters(newFilters);
                }
              "
              type="text"
            />
          </div>
          <div class="bl-col-span-1">
            <Button
              icon="delete"
              variant="third"
              type="button"
              size="lg"
              :onClick="
                () => {
                  let newFilters = {
                    ...this.filters,
                    fields: [...this.filters.fields],
                  };
                  newFilters.fields.splice(index, 1);
                  setFilters(newFilters);
                }
              "
            />
          </div>
        </div>
      </div>

      <Button
        icon="add"
        variant="third"
        type="button"
        size="xs"
        text="Add new filter"
        @click="
          () => {
            setFilters({
              ...this.filters,
              fields: [...filters.fields, { cond: '=', value: '', col: 0 }],
            });
          }
        "
      />
    </Modal>
  </div>
</template>
<script>
import Button from "../../../DS/Form/Button.vue";
import Input from "../../../DS/Form/Input.vue";
import Icon from "../../../DS/Icon.vue";
import Modal from "../../../DS/Modal.vue";

const download = (file, filename) => {
  const blob = new Blob([file], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default {
  name: "TableHeader",
  props: {
    onBack: {
      type: Function,
      default: null,
    },
    autoExecuted: {
      type: Boolean,
      default: false,
    },
    blockName: {
      type: String,
      default: "",
    },
    filters: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
    setPage: {
      type: Function,
      default: null,
    },
    setFilters: {
      type: Function,
      default: null,
    },
    onReload: {
      type: Function,
      default: null,
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
    canExport: {
      type: Boolean,
      default: false,
    },
    showSearchBar: {
      type: Boolean,
      default: false,
    },
    canFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: "",
    };
  },
  components: {
    Button,
    Icon,
    Input,
    Modal,
  },
  methods: {
    generateCSV() {
      const rows = this.FileExportContent;
      let csvContent = "";
      rows.forEach((rowArray) => {
        const row = rowArray.join(",");
        csvContent += row + "\r\n";
      });
      download(csvContent, `${encodeURIComponent(this.blockName)}.csv`);
    },
    clickFilter() {
      this.$refs.modalFilter.show();
    },
  },
  computed: {
    FileExportContent() {
      const dataTable = this.data.data.map((row) => {
        return row.map((col) => {
          if (typeof col == "object") {
            return col.text || "";
          }
          return col;
        });
      });
      return [this.data.header, ...dataTable];
    },
  },
};
</script>
