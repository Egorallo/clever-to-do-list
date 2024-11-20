<script>
export default {
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({
        root: null,
        threshold: '0',
      }),
    },
  },
  data() {
    return {
      observer: null,
    };
  },

  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.$emit('intersected');
      }
    });
    this.observer.observe(this.$refs.trigger);
  },
  unmounted() {
    this.observer.disconnect();
  },
};
</script>

<template>
  <div ref="trigger" class="trigger"></div>
</template>

<style scoped>
.trigger {
  width: 0;
  height: 0;
}
</style>
