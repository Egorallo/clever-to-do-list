<script>
import { signOut } from '../auth';
import { getCurrentUser } from '../auth';
export default {
  data() {
    return {
      userEmail: '',
      today: new Date().toJSON().slice(0, 10).split('-').reverse().join('.'),
    };
  },
  methods: {
    async handleSignOut() {
      await signOut();
      this.$router.push('/sign-in');
    },
  },
  async mounted() {
    const user = await getCurrentUser();
    this.userEmail = user.email;
  },
};
</script>

<template>
  <div class="navtop">
    <div v-if="this.$route.path === '/'" class="navtop__welcome">Welcome, {{ userEmail }}</div>
    <div v-else>Today is {{ today }}</div>
    <button class="navtop__button__signout" @click="handleSignOut">Sign out</button>
  </div>
</template>

<style scoped>
.navtop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}

.navtop__button__signout {
  width: 30%;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: #d32f2f;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.navtop__button__signout:hover {
  background-color: #ff4d4d;
}
</style>
