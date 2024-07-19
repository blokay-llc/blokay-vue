<template>
  <div
    class="bl-p-2 bl-rounded-lg bl-inline-block bl-bg-neutral-100 dark:bl-bg-white/5 dark:bl-border-neutral-900 dark:hover:bl-bg-black bl-border-2 bl-border-neutral-200 hover:bl-bg-neutral-200 bl-w-full"
    :class="{
      size: true,
      classSelector: true,
    }"
  >
    <input type="file" class="bl-hidden" id="id" @change="onChange" />

    <label :for="id" class="bl-items-center bl-gap-3 bl-cursor-pointer bl-flex">
      <div class="bl-prev">
        <Loader v-if="loading" class="bl-mx-auto bl-px-3" size="sm" />;

        <img
          v-if="previewImage()"
          :src="previewImage()"
          alt="preview"
          class="bl-rounded-lg bl-mx-auto size-[50px]"
        />

        <Icon
          v-if="ext() === 'pdf'"
          icon="pdf"
          class="bl-h-10 bl-fill-neutral-800 dark:bl-fill-neutral-200"
        />

        <Icon
          icon="excel"
          v-if="['csv', 'xls', 'xlsx'].includes(ext())"
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

<script>
import Icon from "../../DS/Icon.vue";
import Loader from "../../DS/Loader.vue";

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
    endpoint: {
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
  },
  data() {
    return {
      loading: false,
      prev: "",
    };
  },
  components: {
    Icon,
    Loader,
  },
  computed: {
    previewImage() {
      const file = prev || preview || "";

      if (["png", "jpeg", "jpg", "bmp", "webp"].includes(ext())) {
        return file;
      }
      return "";
    },
  },
  methods: {
    setLoading(loading) {
      this.loading = loading;
    },
    setPrev(file) {
      this.prev = file;
    },
    ext() {
      const file = prev || preview;
      return file ? file.split(".").pop() || "" : "";
    },
    onChange() {
      const el = document.getElementById(id);
      const list = el.files;
      if (list.length > 0) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", list[0]);

        return api
          .sendFile(endpoint, formData)
          .then(() => {
            onDone && onDone(result);
            if (result.data.Resource) {
              setPrev(result.data.Resource.preview);
              onChangeFiles && onChangeFiles(result.data.Resource);
            }
          })
          .catch((err) => {
            onError && onError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
  },
};
</script>
