<template>
  <div
    class="bl-p-2 bl-rounded-lg bl-inline-block bl-bg-neutral-100 dark:bl-bg-white/5 dark:bl-border-neutral-900 dark:hover:bl-bg-black bl-border-2 bl-border-neutral-200 hover:bl-bg-neutral-200 bl-w-full"
    :class="{
      size: true,
      classSelector: true,
    }"
  >
    <input type="file" class="bl-hidden" :id="id" @change="onChange" />

    <label :for="id" class="bl-items-center bl-gap-3 bl-cursor-pointer bl-flex">
      <div class="bl-prev">
        <Loader v-if="loading" class="bl-mx-auto bl-px-3" size="sm" />

        <img
          v-else-if="previewImage"
          :src="previewImage"
          alt="preview"
          class="bl-rounded-lg bl-mx-auto bl-max-w-[50px] bl-max-h-[50px]"
        />
        <Icon
          v-else-if="ext() === 'pdf'"
          icon="pdf"
          class="bl-h-10 bl-fill-neutral-800 dark:bl-fill-neutral-200"
        />
        <Icon
          icon="excel"
          v-else-if="['csv', 'xls', 'xlsx'].includes(ext())"
          class="bl-h-10 bl-fill-neutral-800 dark:bl-fill-neutral-200"
        />
        <Icon
          v-else
          icon="upload"
          class="bl-h-10 bl-fill-neutral-800 dark:bl-fill-neutral-200"
        />
      </div>

      <div>
        <div
          v-if="label"
          class="bl-text-sm bl-block bl-py-1 bl-text-neutral-800 dark:bl-text-neutral-100 bl-font-medium"
        >
          {{ label }}
        </div>

        <div
          class="bl-text-left bl-font-light bl-text-xs bl-text-neutral-600 dark:bl-text-neutral-300"
        >
          <p class="md:hidden bl-block">Click here to select a file</p>
          <p class="hidden md:bl-block">Touch here to select.</p>
        </div>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import Icon from "../../DS/Icon.vue";
import Loader from "../../DS/Loader.vue";
import useApi from "../../../common/blokay.service";

export default {
  name: "File",
  props: {
    label: {
      type: String,
      default: "",
    },
    preview: {
      type: String,
      default: "",
    },
    classSelector: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "brain/uploadAsset",
    },
    size: {
      type: String,
      default: "md",
    },
    onError: {
      type: Function,
      default: () => {},
    },
    onDone: {
      type: Function,
      default: () => {},
    },
    onChangeFiles: {
      type: Function,
      default: () => {},
    },
    jwt: {
      type: String,
      default: "",
    },
    endpoint: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      prev: "",
      id: (Math.random() + 1).toString(36).substring(7),
      api: useApi(this.endpoint, {
        getJwtToken: () => this.jwt,
      }),
    };
  },
  components: {
    Icon,
    Loader,
  },
  computed: {
    previewImage() {
      const file = this.prev || this.preview || "";

      if (["png", "jpeg", "jpg", "bmp", "webp"].includes(this.ext())) {
        return file;
      }
      return "";
    },
  },
  methods: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setPrev(file: string) {
      this.prev = file;
    },
    ext() {
      const file = this.prev || this.preview;
      return file ? file.split(".").pop() || "" : "";
    },
    onChange() {
      const el: any = document.getElementById(this.id);
      const list = el.files;
      if (list.length > 0) {
        this.setLoading(true);
        const formData = new FormData();
        formData.append("file", list[0]);

        return this.api
          .sendFile(this.path, formData)
          .then((result) => {
            this.onDone && this.onDone(result);
            if (result.data.Resource) {
              this.setPrev(result.data.Resource.preview);
              this.onChangeFiles && this.onChangeFiles(result.data.Resource);
            }
          })
          .catch((err) => {
            this.onError && this.onError(err);
          })
          .finally(() => {
            this.setLoading(false);
          });
      }
    },
  },
};
</script>
