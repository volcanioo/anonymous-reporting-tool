<template>
  <main class="dashboard z-index-1">
    <aside class="sidebar">
      <img :src="photoURL" :alt="companyName">
      <br />
      <h1>Welcome, {{ companyName }}</h1>
      <button @click="singOut">SING OUT</button>
    </aside>
    <div class="content">
      <div
        v-if="!isVerified"
        class="notification"
      >
        Please approve your email. Otherwise, your emplooyes won't see your company in the company list.
      </div>
    </div>
  </main>
</template>

<script>
import API from '../api';

export default {
  name: 'Dashboard',
  computed: {
    photoURL() {
      return this.$store.state.company.photo_url; 
    },
    companyName() {
      return this.$store.state.company.company_name; 
    },
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

<style>
.dashboard {
  display: grid;
  grid-template-columns: 295px auto;
}

.sidebar {
  background: #2A3530;
  height: 100vh;
  text-align: center;
  color: white;
  padding: 20px;
}

.sidebar img {
  max-width: 100px;
}

.notification {
  background: #d01f09;
  padding: 20px;
  color: white;
  font-size: 17px;
  font-weight: 600;
}
</style>
