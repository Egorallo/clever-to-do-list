<script>
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebaseInit';
import NavTop from './components/NavTop.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import ToastNotification from './components/ToastNotification.vue';
export default {
  components: {
    NavTop,
    ToastNotification,
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
  computed: mapState({
    toasts: (state) => {
      return state.toasts;
    },
  }),

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
  <ToastNotification :toasts="$store.state.toasts" />
  <NavTop v-if="isLogged"></NavTop>
  <RouterView />
</template>

<style scoped></style>
