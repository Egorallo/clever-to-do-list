<template>
  <svg
    :style="{ fill: color }"
    :width="width"
    :height="height"
    viewBox="0 0 512.00 512.00"
    xmlns="http://www.w3.org/2000/svg"
    stroke-width="51.2"
  >
    <path
      d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconLessThan',
  props: {
    color: {
      type: String,
      default: 'var(--color-icon)',
    },
    width: {
      type: String,
      default: '24px',
    },
    height: {
      type: String,
      default: '24px',
    },
  },
};
</script>
