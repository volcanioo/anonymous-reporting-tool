<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <figure >
        <img :src="companyImg" :alt="companyName">
      </figure>
    </div>
    <div class="sidebar__company-name">
      <strong>{{ companyName }}</strong>
    </div>
    <nav class="sidebar__nav">
      <slot>
        <router-link
          :to="{ name: 'Dashboard' }"
        >
          Dashboard
        </router-link>
        <router-link
          :to="{ name: 'UserSettings' }"
        >
          Settings
        </router-link>
      </slot>
    </nav>
    <button class="button" @click="singOut">SIGN OUT</button>
  </aside>
</template>

<script>
import API from '../../api';
import userIcon from '@/assets/user.png';

export default {
  name: 'Sidebar',
  methods: {
    singOut() {
      // company logout
      API.companies.logout();
      // User logout
      localStorage.removeItem('caseId');
      this.$router.push({
        name: 'Home',
      });
    },
  },
  computed: {
    companyImg() {
      const photoUrl = this.$store.state.company.photo_url;
      if (photoUrl) return photoUrl;

      return userIcon;
    },
    companyName() {
      return this.$store.state.company.company_name;
    },
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: var(--dark-black);
  position: fixed;
  height: 100vh;
  text-align: center;
  color: white;
  padding: 20px;
  width: 295px;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;

  &__logo,
  &__company-name,
  &__nav {
    margin-bottom: 1.5em;
  }

  &__logo {
    margin-top: 0;

    figure {
      height: 70px;
      margin: 0;
    }

    img {
      height: 100%;
      width: auto;
      background: white;
      border-radius: 100%;
      margin: 0 auto;
    }
  }

  &__nav {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;

    a {
      color: white;
      line-height: 55px;
      background: rgba(255, 255, 255, .04);
      margin-bottom: 1.5em;
      transition: .3s;

      &:hover {
        margin: 4px 0 1.5em 0;
        background: rgba(255, 255, 255, .1);
      }
    }
  }
}
</style>
