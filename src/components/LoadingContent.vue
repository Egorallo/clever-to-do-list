<script>
import { ContentLoader } from 'vue-content-loader';
export default {
  components: {
    ContentLoader,
  },
  props: {
    layout: {
      type: Array,
      required: true,
    },
    viewBox: {
      type: String,
      default: '0 0 345 300',
    },
  },
};
</script>

<template>
  <ContentLoader :speed="0.5" :viewBox="viewBox">
    <template v-for="(shape, index) in layout" :key="index">
      <circle v-if="shape.type === 'circle'" :cx="shape.cx" :cy="shape.cy" :r="shape.r" />
      <rect
        v-else-if="shape.type === 'rect'"
        :x="shape.x"
        :y="shape.y"
        :rx="shape.rx"
        :ry="shape.ry"
        :width="shape.width"
        :height="shape.height"
      />
    </template>
  </ContentLoader>
</template>

<style scoped></style>
