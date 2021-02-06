<template>
  <div class="login">
    <base-header></base-header>
    <form
      class="form"
      @submit.prevent="submit"
    >
      <h1 v-text="$t('sign_in')" />
      <label for="email"> {{ $t('sign_in') }} </label>
      <input
        v-model="email"
        type="email"
        name="email"
      />
      <label for="password"> {{ $t('password') }} </label>
      <input
        v-model="password"
        type="password"
        name="password"
      />
      <button
        type="submit"
        :class="{ 'button--progress': progress }"
        class="button"
        v-text="$t('sign_in')"
      />
      <router-link
        :to="'/register'"
        class="form__link"
        v-text="$t('register')"
      />
    </form>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import API from '../api';

export default {
  name: 'Login',
  components: {
    BaseHeader
  },
  data() {
    return {
      email: '',
      password: '',
      progress: false,
    }
  },
  methods: {
    submit() {
      this.progress = true;
      API.companies.login(this.email, this.password)
      .then((userCredential) => {
        this.progress = false;
        this.$store.dispatch('saveToken');
        alert(`Welcome! You logged in successufully!`);
      }).catch((error) => {
        this.progress = false;
        alert(error);
      });
    }
  },
};
</script>

<style lang="scss">
</style>
