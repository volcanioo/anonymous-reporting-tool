<template>
  <main class="dashboard z-index-1">
    <aside class="sidebar">
      <figure 
        v-if="photoURL"
      >
        <img :src="photoURL" :alt="companyName">
      </figure>
      <figure
        class="sidebar__logo"
        v-else
      >
        <img src="@/assets/user.svg" :alt="companyName">
      </figure>
      <h1>{{ companyName }}</h1>
      <button @click="singOut">SIGN OUT</button>
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

<style lang="scss">
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
  display: block;
  max-width: 100px;
}

.sidebar__logo {
  margin: 0;

  img {
    background: white;
    border-radius: 100%;
    width: 50%;
    max-width: initial;
    margin: 0 auto;
  }
}

.notification {
  background: #d01f09;
  padding: 20px;
  color: white;
  font-size: 17px;
  font-weight: 600;
}
</style>
