<script>
import SignForm from '@/components/SignForm.vue';
export default {
  components: {
    SignForm,
  },
};
</script>

<template>
  <SignForm signTitle="Sign in" signButtonTitle="Sign in" :newAcc="true"></SignForm>
</template>

<style scoped></style>
