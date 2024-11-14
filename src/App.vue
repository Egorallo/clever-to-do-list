<script>
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { signOut } from './auth';
export default {
  data() {
    return {
      isLogged: false,
    };
  },
  methods: {
    async handleSignOut() {
      await signOut();
      this.$router.push('/sign-in');
    },
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
  <button @click="handleSignOut" v-if="isLogged">Sign out</button>
  <RouterView />
</template>

<style scoped></style>
