<template>
  <div>
    <h1>You have to verify your email!</h1>
    <button @click="singOut">SING OUT</button>
  </div>
</template>

<script>
import API from '../api';

export default {
  name: 'Verify',
  computed: {
    isVerified() {
      return this.$store.state.company.is_mail_verified; 
    }
  },
  methods: {
    singOut() {
      API.companies.logout();
    }
  },
};
</script>
