<template>
  <div>
    <h1>Welcome, {{ companyName }}</h1>
    <button @click="singOut">SING OUT</button>
  </div>
</template>

<script>
import API from '../api';

export default {
  name: 'Dashboard',
  computed: {
    companyName() {
      return this.$store.state.company.company_name; 
    }
  },
  methods: {
    singOut() {
      API.companies.logout();
    }
  },
};
</script>
