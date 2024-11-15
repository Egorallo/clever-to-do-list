<script>
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import NavTop from './components/NavTop.vue';
export default {
  components: {
    NavTop,
  },
  data() {
    return {
      isLogged: false,
    };
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  },
};
</script>

<template>
  <NavTop v-if="isLogged"></NavTop>
  <RouterView />
</template>

<style scoped></style>
