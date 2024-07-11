<template>
  <Teleport to="body">
    <div
      class="bl-modal-backdrop"
      @click="tryClose"
      v-show="showing"
      style="z-index: 100000"
      v-if="showing"
    />

    <Transition :name="position == 'bottom' ? 'from_bottom' : 'bounce'">
      <div
        class="bl-modal-container"
        style="z-index: 100000"
        v-if="showing"
        @click="tryClose"
        @mousedown="(e) => e.stopPropagation()"
      >
        <section
          @mousedown="(e) => e.stopPropagation()"
          @click="(e) => e.stopPropagation()"
          class="bl-modal-section"
          :class="{
            [position + '-position']: true,
            [size]: true,
            [classSection]: true,
            ['bl-bg-white dark:bl-bg-neutral-950']: bgColor == 'white',
          }"
        >
          <div class="bl-modal-header" v-if="title">
            <div class="flex items-center justify-start gap-3">
              <div class="action-icon" @click="clickBack" v-if="clickBack">
                <icon icon="left" />
              </div>

              <h2 class="text-base md:text-base">{{ title }}</h2>
            </div>
            <div class="close" @click="hide">
              <icon icon="close" v-if="position != 'bottom'" />
              <icon icon="arrow_bottom" v-else />
            </div>
          </div>
          <div v-if="error" class="modal-error">
            <span class="text">{{ error }}</span>
          </div>
          <div
            class="body-modal"
            ref="bodyModal"
            :class="{ 'with-error': error }"
          >
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: { required: false, default: null, type: String },
    position: { required: false, default: "right", type: String },
    classSection: { required: false, default: "", type: String },
    size: { required: false, default: "md", type: String },
    clickBack: { required: false, default: null },
    bgColor: { required: false, default: "white", type: String },
    onConfirmClose: { required: false, default: null },
  },
  data() {
    return {
      showing: false,
      error: null,
    };
  },
  mounted() {
    const escFunction = (event) => {
      if (event.key === "Escape") {
        this.tryClose();
      }
    };
    document.addEventListener("keydown", escFunction, false);
  },
  methods: {
    goToTop() {
      this.$refs.bodyModal.scrollTo(0, 0);
    },
    clear() {
      this.error = null;
    },
    setError(err) {
      this.error = err;
    },
    show() {
      this.showing = true;
    },
    hide() {
      this.showing = false;
      this.error = null;
      this.$emit("hide");
    },
    tryClose() {
      if (this.onConfirmClose) {
        this.onConfirmClose && this.onConfirmClose();
      } else {
        this.hide();
      }
    },
  },
  watch: {
    showing(a) {
      let root = document.getElementsByTagName("html")[0];
      let app = document.getElementsByClassName("page-app")[0];
      if (a) {
        document.body.classList.add("no-scroll");
        app.classList.add("no-scroll");
        root.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
        root.classList.remove("no-scroll");
        app.classList.remove("no-scroll");
      }
    },
  },
};
</script>
<style>
.bl-modal-backdrop {
  @apply bl-fixed bl-z-50 bl-backdrop-blur-sm bl-bg-neutral-600/40  bl-top-0 bl-left-0 bl-w-full bl-h-screen;
}

.bl-modal-container {
  @apply bl-fixed  bl-h-screen bl-overflow-y-hidden bl-top-0 bl-left-0 bl-flex bl-w-full bl-select-none  bl-overflow-x-hidden;
}
.bl-modal-container .bl-modal-section {
  @apply bl-relative bl-z-50 bl-transition-all dark:bl-text-neutral-200 bl-duration-100 bl-ease-in-out bl-text-black  bl-rounded-xl;
}
.bl-modal-container .bl-modal-section .body-modal {
  @apply bl-py-5 bl-px-4 bl-overflow-y-auto;
}
.bl-modal-container .bl-modal-section .modal-footer {
  @apply bl-py-5 bl-px-4 bl-border-t bl-border-gray-200;
}
.bl-modal-container .bl-modal-section.right-position {
  @apply bl-ml-auto bl-h-full lg:bl-w-4/12 md:bl-rounded-xl md:bl-rounded-r-none bl-min-w-full md:bl-min-w-max;
}
.bl-modal-container .bl-modal-section.center-position {
  @apply md:bl-mx-auto bl-my-auto lg:bl-my-auto bl-mx-3 bl-rounded-3xl;
}
.bl-modal-container .bl-modal-section.center-position.sm {
  @apply md:bl-w-1/2 lg:bl-w-2/4 xl:bl-w-1/4  bl-w-full;
}
.bl-modal-container .bl-modal-section.center-position.md {
  @apply md:bl-w-2/3 lg:bl-w-2/4 bl-w-full;
}
.bl-modal-container .bl-modal-section.center-position.lg {
  @apply md:bl-w-2/3 lg:bl-w-3/4 bl-w-full;
}
.bl-modal-container .bl-modal-section.center-position .body-modal {
  max-height: calc(100vh - 200px);
}
.bl-modal-container .bl-modal-section.center-position .body-modal.with-error {
  max-height: calc(100vh - 250px);
}
.bl-modal-container .bl-modal-section.bottom-position {
  @apply bl-mx-auto md:bl-w-2/4  bl-w-full bl-rounded-xl bl-rounded-b-none bl-mt-auto;
}
.bl-modal-container .bl-modal-section.bottom-position .body-modal {
  max-height: 60vh;
}
.bl-modal-container .bl-modal-section.bottom-position.sm {
  @apply md:bl-w-1/2 lg:bl-w-2/4 xl:bl-w-1/4  bl-w-full;
}
.bl-modal-container .bl-modal-section .bl-modal-header {
  @apply bl-flex bl-justify-between bl-items-center bl-border-b dark:bl-border-neutral-800 bl-border-neutral-200 bl-py-4 bl-px-4;
}
.bl-modal-container .bl-modal-section .bl-modal-header .close {
  @apply bl-cursor-pointer bl-p-1.5 bl-rounded-full hover:bl-bg-neutral-900;
}
.bl-modal-container .bl-modal-section .bl-modal-header .close svg {
  @apply bl-w-8 bl-h-8;
  fill: theme("colors.white");
}
.bl-modal-container .bl-modal-section .modal-error {
  @apply bl-w-full  bl-p-3 bl-bg-neutral-600 bl-items-center bl-text-white bl-leading-none bl-flex lg:bl-inline-flex bl-font-light;
}
.bl-modal-container .bl-modal-section .modal-error .text {
  @apply bl-mr-2 bl-text-left bl-flex-auto bl-text-white;
}

.from_bottom-enter-active {
  animation: bounce-in 0.3s;
}

.from_bottom-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: translate(0, 100%);
  }
  100% {
    transform: translate(0, 0%);
  }
}
</style>
