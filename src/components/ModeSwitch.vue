<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapGetters(['darkMode']),
    ...mapActions(['saveDarkModePreference']),
    toggleDarkMode() {
      this.$store.dispatch('saveDarkModePreference', this.isDarkMode);
    },
  },
  computed: {
    isDarkMode: {
      get() {
        return this.darkMode();
      },
      set(value) {
        this.saveDarkModePreference(value);
      },
    },
  },
};
</script>

<template>
  <div class="switch-container">
    <input type="checkbox" id="switch" hidden v-model="isDarkMode" @change="toggleDarkMode" />
    <label for="switch" class="toggler-container">
      <div class="toggler"></div>
    </label>
    <div class="switch-text">🌙</div>
  </div>
</template>

<style scoped>
.switch-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 230px;
  gap: 10px;
}

.toggler-container {
  width: 60px;
  height: 30px;
  border-radius: 60px;
  background-color: #000000;
  margin-right: px;
  padding: 3px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.toggler {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #f7bfbf;
  margin-left: 5px;
  transition: all 0.3s;
}

#switch:checked + .toggler-container .toggler {
  background-color: #706e6e;
  transform: translateX(25px);
}
</style>
