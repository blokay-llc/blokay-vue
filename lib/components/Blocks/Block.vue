<template>
  <div class="bl-block-box bl-group">
    <div
      :class="`bl-h-full bl-flex bl-w-full  ${
        !response ? 'bl-items-center' : ''
      } bl-justify-center `"
    >
      <div class="bl-block-loader" v-if="loading">
        <Loader size="md" />
      </div>
      <template v-if="!loading || block?.id">
        <BlockForm
          v-if="block && !response && !autoexecuted"
          :onBack="onBack"
          :block="block"
          :form="form"
          :setForm="setFormInterceptor"
          :errors="errors"
          @execBlock="execBlock"
          :jwt="jwt"
          :endpoint="endpoint"
        />

        <BlockResponse
          v-if="response"
          :jwt="jwt"
          :response="response"
          :block="block"
          :onReload="reload"
          :autoExecuted="block.filters.autoExec"
          :defaultOptions="defaultOptions"
          :onBack="
            !autoexecuted
              ? () => {
                  setResponse(null);
                }
              : null
          "
          @exportExcel="downloadExcel"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import useApi from "../../common/blokay.service";
import BlockForm from "./BlockForm.vue";
import BlockResponse from "./BlockResponse.vue";
import { Loader } from "../DS/Index";

export default {
  name: "Block",
  props: {
    blockId: {
      type: String,
      default: null,
    },
    blockKey: {
      type: String,
      default: null,
    },
    defaultForm: {
      type: Object,
      default: () => {},
    },
    onExec: {
      type: Function,
      default: null,
    },
    onBack: {
      type: Function,
      default: null,
    },
    onChangeForm: {
      type: Function,
      default: null,
    },
    autoExecute: {
      type: Boolean,
      default: false,
    },
    jwt: {
      type: String,
      default: null,
    },
    defaultOptions: {
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
    endpoint: {
      type: String,
      default: null,
    },
  },
  components: {
    BlockForm,
    Loader,
  },
  data() {
    return {
      form: { ...this.defaultForm },
      block: null as any,
      response: null,
      loading: false,
      errors: {},
      exception: null,
      autoexecuted: false,
      api: useApi(this.endpoint, {
        getJwtToken: () => this.jwt,
      }),
    };
  },
  beforeCreate: function () {
    let options: any = this.$options;
    console.log(options, "a");
    options.components.BlockResponse = BlockResponse;
  },
  methods: {
    setResponse(response: any) {
      this.response = response;
    },
    setFormInterceptor(form: any) {
      this.setForm(form);
      this.onChangeForm && this.onChangeForm();
    },
    setForm(form: any) {
      this.form = form;
    },
    getBlock() {
      if (this.loading) return;
      this.loading = true;
      this.api
        .blockGet({
          blockId: this.blockId,
          blockKey: this.blockKey || this.block,
        })
        .then((result) => {
          const n = result.Block;
          const autoExec =
            this.autoExecute ||
            ((result.Block.filters.autoExec == undefined ||
              result.Block.filters.autoExec) &&
              !n.filters?.fields?.length);

          this.autoexecuted = autoExec;
          this.block = n;
          if (autoExec) {
            return this.execBlock(n);
          } else {
            this.loading = false;
          }
        })
        .catch((error) => {
          this.exception = error;
          this.loading = false;
        });
    },
    execBlock(n: any, extraForm: any = {}) {
      if (!n?.id) return;
      const errorsTmp: any = {};

      if (n.filters?.fields) {
        for (const field of n.filters.fields) {
          if (!this.form[field.name] && field.isRequired) {
            errorsTmp[field.name] = "The field is required";
          }
        }
        if (Object.values(errorsTmp).length > 0) {
          this.errors = errorsTmp;
          return;
        }
      }
      // if (this.loading) return;
      this.loading = true;
      this.errors = {};

      let data = {
        blockId: n.id,
        form: {
          ...this.form,
          ...extraForm,
        },
      };
      this.api
        .blockExec(data, this.jwt)
        .then((result) => {
          this.response = result.response;
          this.onExec && this.onExec(result.response);
        })
        .catch((error) => {
          this.exception = error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    downloadExcel() {
      this.loading = true;
      let data = {
        blockId: this.block.id,
        form: this.form,
      };
      this.api
        .blockExecExcel(data, this.jwt)
        .then((result) => {
          this.saveData(result, `${this.block.description}.xlsx`);
        })
        .catch((error) => {
          this.exception = error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    saveData(data: any, fileName: string) {
      let a: any = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";

      let url = window.URL.createObjectURL(data);

      a.href = url;
      a.download = fileName;
      a.target = "_blank";
      a.click();
      window.URL.revokeObjectURL(url);
    },
    reload() {
      this.execBlock(this.block);
    },
  },
  mounted() {
    this.getBlock();
  },
};
</script>

<style></style>
