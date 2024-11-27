<script>
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import NavTop from './components/NavTop.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    NavTop,
  },
  data() {
    return {
      isLogged: false,
    };
  },
  methods: {
    ...mapActions(['initializeUser']),
    ...mapGetters(['darkMode']),
  },

  mounted() {
    if (this.darkMode()) {
      document.documentElement.classList.add('dark');
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.initializeUser();
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  },
};
</script>

<template>
  <!-- <ModeSwitch /> -->
  <NavTop v-if="isLogged"></NavTop>
  <RouterView />
</template>

<style scoped></style>
