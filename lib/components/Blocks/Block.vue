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
        />

        <BlockResponse
          v-if="response"
          :response="response"
          :block="block"
          :onReload="() => execBlock(block)"
          :autoExecuted="block.filters.autoExec"
          :defaultOptions="defaultOptions"
          :onBack="
            !autoexecuted
              ? () => {
                  setResponse(null);
                }
              : null
          "
        />
      </template>
    </div>
  </div>
</template>
<script>
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
  },
  components: {
    BlockForm,
    BlockResponse,
    Loader,
  },
  data() {
    return {
      form: { ...this.defaultForm },
      block: null,
      response: null,
      loading: false,
      errors: {},
      exception: null,
      autoexecuted: false,
      api: useApi("https://app.blokay.com/api/", {
        getJwtToken: () => this.jwt,
      }),
    };
  },

  methods: {
    setResponse(response) {
      this.response = response;
    },
    setFormInterceptor() {
      this.setForm(this.form);
      this.onChangeForm && this.onChangeForm();
    },
    setForm(form) {
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
    execBlock(n, extraForm = {}) {
      const errorsTmp = {};

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
  },
  mounted() {
    this.getBlock();
  },
};
</script>

<style></style>
