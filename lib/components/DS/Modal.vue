<template>
  <Teleport to="body">
    <div
      class="modal-backdrop"
      @click="hide"
      v-show="showing"
      style="z-index: 100000"
      v-if="showing"
    />

    <Transition :name="position == 'bottom' ? 'from_bottom' : 'bounce'">
      <div class="modal-container" style="z-index: 100000" v-if="showing">
        <section
          class="modal-section"
          :class="{
            [position + '-position']: true,
            [size]: true,
            [classSection]: true,
          }"
        >
          <div class="modal-header" v-if="title || canClose">
            <div class="flex items-center justify-start gap-3">
              <div class="action-icon" @click="clickBack" v-if="clickBack">
                <svg viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                </svg>
              </div>

              <h2 class="text-base md:text-base">{{ title }}</h2>
            </div>
            <div class="close" @click="hide" v-if="canClose">
              <icon icon="close" v-if="position != 'bottom'" />
              <icon icon="arrow_bottom" v-else />
            </div>
          </div>
          <div v-if="error" class="modal-error">
            <span class="text">{{ error }}</span>
          </div>
          <div class="body-modal" ref="bodyModal" :class="{ 'with-error': error }">
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
  name: 'Modal',
  props: {
    title: { required: false, default: null, type: String },
    position: { required: false, default: 'right', type: String },
    classSection: { required: false, default: '', type: String },
    size: { required: false, default: 'md', type: String },
    canClose: { required: false, default: true, type: Boolean },
    clickBack: { required: false, default: null },
  },
  data() {
    return {
      showing: false,
      error: null,
    };
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
      this.$emit('hide');
    },
  },
  watch: {
    showing(a) {
      let root = document.getElementsByTagName('html')[0];
      let app = document.getElementsByClassName('page-app')[0];
      if (a) {
        document.body.classList.add('no-scroll');
        app.classList.add('no-scroll');
        root.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
        root.classList.remove('no-scroll');
        app.classList.remove('no-scroll');
      }
    },
  },
};
</script>
<style lang="scss">
.modal-backdrop {
  @apply fixed bg-black bg-opacity-60 top-0 left-0 w-full h-screen;
}
.modal-container {
  @apply fixed  h-screen overflow-y-hidden top-0 left-0 flex w-full select-none  overflow-x-hidden;
  .modal-section {
    @apply text-black  bg-gray-50 overflow-hidden;

    .body-modal {
      @apply py-5 px-4 overflow-y-auto;
    }

    .modal-footer {
      @apply py-5 px-4 border-t border-gray-200;
    }

    &.right-position {
      @apply ml-auto h-full lg:w-4/12 md:rounded-xl md:rounded-r-none min-w-full md:min-w-max;
    }

    &.center-position {
      @apply md:mx-auto my-auto lg:my-auto mx-3 rounded-3xl;

      &.sm {
        @apply md:w-1/2 lg:w-2/4 xl:w-1/4  w-full;
      }
      &.md {
        @apply md:w-2/3 lg:w-2/4 w-full;
      }
      &.lg {
        @apply md:w-2/3 lg:w-3/4 w-full;
      }
      .body-modal {
        max-height: calc(100vh - 200px);
      }
      .body-modal.with-error {
        max-height: calc(100vh - 250px);
      }
    }

    &.bottom-position {
      @apply mx-auto md:w-2/4  w-full rounded-xl rounded-b-none mt-auto;
      .body-modal {
        max-height: 60vh;
      }
      &.sm {
        @apply md:w-1/2 lg:w-2/4 xl:w-1/4  w-full;
      }
    }

    .modal-header {
      @apply flex justify-between items-center border-b border-gray-200 bg-main-950 text-white py-4 px-4 text-lg;
      .close {
        @apply cursor-pointer p-1.5 rounded-full hover:bg-main-900;
        svg {
          @apply w-8 h-8;
          fill: theme('colors.white');
        }
      }
    }
    .modal-error {
      @apply w-full  p-3 bg-secondary-600 items-center text-white leading-none flex lg:inline-flex font-light;

      .text {
        @apply mr-2 text-left flex-auto text-white;
      }
    }
  }
}

.dark-mode {
  .modal-container {
    .modal-section {
      @apply text-neutral-200;
      background: #2b3450;

      .modal-footer {
        border-color: #1f2739;
      }

      .modal-header {
        border-color: #1f2739;
        .close {
          background: #1f2739;
          svg {
            fill: theme('colors.neutral.600');
          }
        }
      }
    }
  }
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
