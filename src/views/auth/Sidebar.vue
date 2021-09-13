<template>
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
    <nav class="sidebar__nav">
      <strong>{{ companyName }}</strong>
      <router-link
        :to="{ name: 'CompanySettings', params: { id: userUid } }"
      >
        Settings
      </router-link>
    </nav>
    <button class="button" @click="singOut">SIGN OUT</button>
  </aside>
</template>

<script>
import API from '../../api';

export default {
  name: 'Sidebar',
  methods: {
    singOut() {
      API.companies.logout();
    },
  },
  computed: {
    photoURL() {
      return this.$store.state.company.photo_url; 
    },
    companyName() {
      return this.$store.state.company.company_name; 
    },
    userUid() {
      return this.$store.state.company.userUid; 
    },
  }
}
</script>