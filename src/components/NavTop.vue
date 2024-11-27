<script>
import { signOut } from '../auth';
import { getCurrentUser } from '../auth';
import ModeSwitch from './ModeSwitch.vue';
import IconSignOut from './icons/IconSignOut.vue';

export default {
  components: {
    ModeSwitch,
    IconSignOut,
  },
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
  <header class="navtop">
    <ModeSwitch />
    <nav class="navtop__right">
      <button class="navtop__button__signout" @click="handleSignOut">
        <IconSignOut />
      </button>
    </nav>
  </header>
</template>

<style scoped>
.navtop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  color: var(--text-main-color);
  transition: all 0.4s ease;
  margin-bottom: 20px;
}

.navtop__welcome__email {
  font-weight: bold;
}

.notification {
  position: relative;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: 0;
  border: none;
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
  align-items: flex-end;
}

.navtop__button__signout {
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 0;
  line-height: 0;
  margin: 0;
}

.navtop__button__signout__icon {
  width: 25px;
  height: 25px;
}
</style>
