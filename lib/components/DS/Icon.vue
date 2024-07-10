<template>
  <icon :icon="icon" />
</template>
<script>
export default {
  name: 'XIcon',
  props: {
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>
