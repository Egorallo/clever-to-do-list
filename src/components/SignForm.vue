<script>
import { signIn } from '../auth';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  props: {
    signTitle: {
      type: String,
      required: true,
    },
    signButtonTitle: {
      type: String,
      required: true,
    },
    newAcc: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async signInAcc() {
      await signIn(this.email, this.password);
      // this.$router.push('/');
    },
  },
};
</script>

<template>
  <div class="sign-form">
    <div class="sign-form__container">
      <div class="sign-form__title sign-form__title_text">{{ signTitle }}</div>
      <form class="sign-form__form" @submit.prevent="signInAcc">
        <input
          class="sign-form__input"
          v-model="email"
          type="email"
          placeholder="Email"
          autocomplete="on"
        />
        <input
          class="sign-form__input"
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="on"
        />
        <button class="sign-form__button" type="submit">{{ signButtonTitle }}</button>
      </form>
      <div class="sign-form__other">
        <div v-if="newAcc">
          <span>Don't have an account? </span>
          <RouterLink to="/sign-up" class="sign-form__link">Sign Up</RouterLink>
        </div>
        <div v-else>
          <span>Already have an account? </span>
          <RouterLink to="/sign-in" class="sign-form__link">Sign In</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sign-form {
  max-width: 400px;
  width: 100%;
  margin: 100px auto 0;
}

.sign-form__title_text {
  font-size: 24px;
  font-weight: bold;
}

.sign-form__container {
  margin: 0 auto 0;
  display: flex;
  max-width: 320px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
}

.sign-form__form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}

.sign-form__input {
  max-width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.sign-form__button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff7300;
  color: #fff;
  cursor: pointer;
}

.sign-form__button:hover {
  background-color: #ff9c4d;
}

.sign-form__link {
  color: #ff7300;
  cursor: pointer;
  text-decoration: none;
}
</style>
