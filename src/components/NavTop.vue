<script>
import { signOut } from '../auth';
import { getCurrentUser } from '../auth';
export default {
  data() {
    return {
      userEmail: '',
      today: new Date().toLocaleDateString().split('/').join('.'),
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
    <div v-if="this.$route.path === '/'" class="navtop__welcome">
      Logged in as:&nbsp;
      <span class="navtop__welcome__email">
        {{ userEmail }}
      </span>
    </div>
    <div v-else>
      <p>Today is {{ today }}</p>
    </div>
    <div class="navtop__right">
      <div class="notification">
        <img src="../assets/icons/notification-bell.svg" />
        <div class="notification-badge">3</div>
      </div>
      <button class="navtop__button__signout" @click="handleSignOut">
        <img
          class="navtop__button__signout__icon"
          src="../assets/icons/signout.svg"
          alt="Sign out"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.navtop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  color: var(--text-main-color);
  transition: all 0.4s ease;
}

.navtop__welcome__email {
  font-weight: bold;
}

.notification {
  position: relative;
  cursor: pointer;
}

.notification-badge {
  position: absolute;
  background-color: rgba(255, 0, 0, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  padding-top: 0;
  width: 16px;
  height: 16px;
  border-radius: 10px;
  border: 1px solid white;
  top: -6px;
  right: -4px;
}

.navtop__right {
  display: flex;
  gap: 3vw;
  align-items: center;
}

.navtop__button__signout {
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.navtop__button__signout__icon {
  width: 20px;
  height: 20px;
}
</style>
