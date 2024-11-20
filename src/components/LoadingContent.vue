<script>
import { ContentLoader } from 'vue-content-loader';
export default {
  components: {
    ContentLoader,
  },
  data() {
    return {
      primColor: '',
      secColor: '',
    };
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
  beforeMount() {
    this.primColor = getComputedStyle(document.documentElement).getPropertyValue(
      '--loader-primary-color',
    );
    this.secColor = getComputedStyle(document.documentElement).getPropertyValue(
      '--loader-secondary-color',
    );

    console.log(this.primaryColor, this.secondaryColor);
  },
};
</script>

<template>
  <ContentLoader
    :speed="0.5"
    :viewBox="viewBox"
    :primaryColor="primColor"
    :secondaryColor="secColor"
  >
    <template v-for="(shape, index) in layout" :key="index">
      <circle
        class="shape"
        v-if="shape.type === 'circle'"
        :cx="shape.cx"
        :cy="shape.cy"
        :r="shape.r"
      />
      <rect
        class="shape"
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

<style scoped>
.aboba .shape {
  background-color: pink;
  color: pink;
}
</style>
