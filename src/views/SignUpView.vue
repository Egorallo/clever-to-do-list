<script>
import SignForm from '@/components/SignForm.vue';
export default {
  components: {
    SignForm,
  },
};
</script>

<template>
  <SignForm signTitle="Create new account" signButtonTitle="Sign up" :newAcc="false"></SignForm>
</template>

<style scoped></style>
