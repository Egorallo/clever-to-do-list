<script>
import SignForm from '@/components/SignForm.vue';
export default {
  components: {
    SignForm,
  },
};
</script>

<template>
  <SignForm signTitle="Sign in" signButtonTitle="Sign up" :newAcc="true"></SignForm>
</template>

<style scoped></style>
