<template>
  <div class="bl-text-center bl-bg-gray-100 bl-rounded-lg bl-p-5">
    <h2 class="bl-text-lg">{{ title }}</h2>
    <p class="bl-font-light">{{ description }}</p>
  </div>
</template>
<script>
export default {
  name: 'NoItems',
  props: {
    title: { required: false, default: null, type: String },
    description: { required: false, default: null, type: String },
  },
};
</script>
