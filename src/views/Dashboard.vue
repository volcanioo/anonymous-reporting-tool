<template>
  <div>
    <h1>Welcome, {{ companyName }}</h1>
    <button @click="singOut">SING OUT</button>
  </div>
</template>

<script>
import {
  companyLogout,
} from '../firebase/functions';

export default {
  name: 'Dashboard',
  computed: {
    companyName() {
      return this.$store.state.company.company_name; 
    }
  },
  methods: {
    singOut() {
      companyLogout();
    }
  },
};
</script>
