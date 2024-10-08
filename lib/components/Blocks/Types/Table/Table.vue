<template>
  <div>
    <div v-if="data.data?.length > 0">
      <TableHeader
        v-if="options.showHeader"
        :onBack="onBack"
        :autoExecuted="autoExecuted"
        :blockName="blockName"
        :filters="filters"
        :data="data"
        :setPage="setPage"
        :setFilters="(f:any) => (filters = f)"
        :onReload="onReload"
        :showTitle="options.showTitle"
        :canExport="options.canExport"
        :canFilter="options.canFilter"
        :showSearchBar="options.showSearchBar"
        :onExport="onExport"
      />

      <div class="bl-table">
        <table>
          <thead v-if="data.header">
            <tr>
              <TableHeaderCell
                v-for="(th, i) in data.header"
                :key="'cell-' + i"
                :setSort="setSort"
                :index="i"
                :sort="sort"
                :th="th"
              />
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ki) in tableContentVals" :key="'row-' + ki">
              <TableCell
                v-for="(td, k) in row"
                :key="'cell-' + k"
                :td="td"
                @callEvent="callEvent"
                :showAll="
                  () => {
                    setTextAll(td);
                    let ref: any = $refs.modalShowTextRef;
                    ref.show();
                  }
                "
              />
            </tr>

            <TableFooterRow :data="contentComputed" />
          </tbody>
        </table>
      </div>

      <TableFooter
        v-if="options.showPagination && data?.data?.length > 10"
        :perPage="PER_PAGE"
        :pagesCount="pagesCount"
        :setPerPage="setPerPage"
        :setPage="(p:number) => (page = p)"
        :page="page"
      />
    </div>
    <div className="bl-table-no-results" v-else>No results to display.</div>

    <Events
      ref="eventsRef"
      :jwt="jwt"
      :onExecuted="() => onReload && onReload()"
    />
    <Modal size="lg" position="center" ref="modalShowTextRef">
      <pre>{{ textAll }}</pre>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableCell from "./TableCell.vue";
import TableFooter from "./TableFooter.vue";
import TableHeaderCell from "./TableHeaderCell.vue";
import TableHeader from "./TableHeader.vue";
import TableFooterRow from "./TableFooterRow.vue";
import Modal from "../../../DS/Modal.vue";
import Events from "../../Events.vue";

const sortTypes = (a: any, b: any) => {
  if (typeof a == "string" && typeof b == "string") {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a > b) {
      return -1;
    } else if (b > a) {
      return 1;
    }
    return 0;
  }
  return a - b;
};

const handleSearch = (toSearch: string) => {
  return (item: any) => {
    for (let j = 0; j < item.length; j++) {
      let val = item[j]?.text || item[j];
      const str = ("" + val).toLowerCase();
      if (str.includes(toSearch)) {
        return true;
      }
    }
    return false;
  };
};

const handleFilters = (filters: any) => {
  return (item: any) => {
    for (let j = 0; j < filters.length; j++) {
      const filter = filters[j];
      let columnValue = item[filter.col]?.text || item[filter.col];
      columnValue = ("" + columnValue).toLowerCase();
      const filterValue = filter.value;

      if (filter.cond == "=" && columnValue != filterValue) {
        return false;
      } else if (filter.cond == "!=" && columnValue == filterValue) {
        return false;
      } else if (filter.cond == ">" && columnValue <= filterValue) {
        return false;
      } else if (filter.cond == "<" && columnValue >= filterValue) {
        return false;
      } else if (
        filter.cond == "contains" &&
        !columnValue.includes(filterValue)
      ) {
        return false;
      } else if (
        filter.cond == "not_contains" &&
        columnValue.includes(filterValue)
      ) {
        return false;
      }
    }
    return true;
  };
};

const handleSort = (criteria: string, valCriteria: string) => {
  return (a: any, b: any) => {
    const val1 =
      typeof a[criteria] == "object" ? a[criteria]?.text : a[criteria];
    const val2 =
      typeof b[criteria] == "object" ? b[criteria]?.text : b[criteria];
    if (valCriteria == "DESC") {
      return sortTypes(val2, val1);
    }
    return sortTypes(val1, val2);
  };
};

export default defineComponent({
  name: "Table",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    onReload: {
      type: Function,
      default: () => {},
    },
    onBack: {
      type: Function,
      default: () => {},
    },
    blockName: {
      type: String,
      default: "",
    },
    autoExecuted: {
      type: Boolean,
      default: false,
    },
    jwt: {
      type: String,
      default: null,
    },
    options: {
      type: Object,
      default: () => {
        return {
          showHeader: true,
          showPagination: true,
          showTitle: true,
          showSearchBar: true,
          canExport: true,
          canFilter: true,
        };
      },
    },
  },
  components: {
    TableCell,
    TableFooter,
    TableHeaderCell,
    TableHeader,
    TableFooterRow,
    Modal,
    Events,
  },
  computed: {
    contentComputed() {
      let content = this.data?.data.slice(0);
      if (!content?.length) return [];
      if (this.sort) {
        const criteria = Object.keys(this.sort)[0];
        content = content.sort(handleSort(criteria, this.sort[criteria]));
      }

      const toSearch = ("" + this.filters.search).toLowerCase();
      if (toSearch) {
        content = content.filter(handleSearch(toSearch));
      }

      if (this.filters?.fields?.length > 0) {
        content = content.filter(handleFilters(this.filters.fields));
      }
      return content;
    },
    tableContentVals() {
      const content = this.contentComputed;
      if (this.PER_PAGE == Number.MAX_SAFE_INTEGER) return content;

      const arr: any = [];
      const from = (this.page - 1) * this.PER_PAGE;
      const until = from + this.PER_PAGE;
      for (let i = from; i < until; i++) {
        if (i < content.length) {
          arr.push(content[i]);
        }
      }
      return arr;
    },
    pagesCount() {
      if (this.PER_PAGE == Number.MAX_SAFE_INTEGER) return 1;
      let pages = 0;
      const rows = this.contentComputed;
      if (rows.length > this.PER_PAGE) {
        pages = rows.length / this.PER_PAGE;
      }
      pages = Math.floor(pages);
      return pages + 1;
    },
  },
  watch: {
    data: {
      handler() {
        this.setPage(1);
      },
      deep: true,
    },
  },
  data() {
    return {
      sort: null as any,
      filters: {
        search: "",
        fields: [],
      },
      page: 1,
      PER_PAGE: 10,
      textAll: "",
    };
  },
  methods: {
    callEvent(td: any) {
      let ref: any = this.$refs.eventsRef;
      td.click && ref[td.click](td.args);
    },
    setPage(page: number) {
      this.page = page;
    },
    setPerPage(perPage: number) {
      this.PER_PAGE = perPage;
    },
    setSort(sort: any) {
      this.sort = sort;
    },
    setFilters(filters: any) {
      this.filters = filters;
    },
    setTextAll(textAll: string) {
      this.textAll = textAll;
    },
    onExport(data: any) {
      this.$emit("exportExcel", data);
    },
  },
});
</script>
