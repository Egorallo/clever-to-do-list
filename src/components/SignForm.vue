<script>
import { signIn, signUp } from '../auth';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      signmessage: '',
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
      try {
        if (this.$route.path === '/sign-in') {
          this.error = null;
          this.signmessage = 'Signing you in...';
          await signIn(this.email, this.password);
          this.$router.push('/');
        } else {
          this.error = null;
          this.signmessage = 'Creating your account...';
          await signUp(this.email, this.password);
          this.$router.push('/');
        }
      } catch (error) {
        console.log(error.message);
        this.signmessage = '';
        switch (error.message) {
          case 'auth/user-not-found':
            this.error = 'User not found';
            break;
          case 'auth/email-already-in-use':
            this.error = 'Email already in use';
            break;
          case 'auth/invalid-credential':
            this.error = 'Email or password is incorrect';
            break;
          case 'auth/invalid-email':
            this.error = 'Invalid email';
            break;
          case 'auth/missing-email':
            this.error = 'Missing email';
            break;
          case 'auth/missing-password':
            this.error = 'Missing password';
            break;
          case 'auth/weak-password':
            this.error = 'Weak password (Minumum 6 characters)';
            break;
        }
      }
    },
  },
};
</script>

<template>
  <div class="sign-form">
    <div class="sign-form__container">
      <div class="sign-form__title sign-form__title_text">{{ signTitle }}</div>
      <form class="sign-form__form" @submit.prevent="signInAcc">
        <input class="sign-form__input" v-model="email" placeholder="Email" autocomplete="email" />
        <input
          class="sign-form__input"
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="password"
        />
        <button class="sign-form__button" type="submit">{{ signButtonTitle }}</button>
      </form>
      <div class="error" v-if="error">
        <span>{{ error }}</span>
      </div>
      <div class="sign-message" v-if="signmessage">
        <span>{{ signmessage }}</span>
      </div>
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
  color: var(--text-main-color);
  transition: all 0.4s ease;
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
  background-color: var(--bg-color-form);
  color: var(--text-main-color);
  transition: all 0.4s ease;
}

.sign-form__input::placeholder {
  color: var(--text-secondary-color);
  transition: all 0.4s ease;
}

.sign-form__button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--button-main-color);
  color: var(--button-text-color);
  cursor: pointer;
}

.sign-form__button:hover {
  background-color: var(--button-main-color-hover);
}

.sign-form__other {
  color: var(--text-main-color);
  transition: all 0.4s ease;
}

.sign-form__link {
  color: var(--button-main-color);
  cursor: pointer;
  text-decoration: none;
}
.sign-form__link:hover {
  text-decoration: underline;
}

.error {
  color: red;
  font-size: 17px;
}

.sign-message {
  color: green;
  font-size: 17px;
}
</style>
