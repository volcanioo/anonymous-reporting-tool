<template>
  <div>
    <base-header></base-header>
    <form
      class="form"
      @submit.prevent="submit"
    >
      <h1 v-text="$t('company_login')" />
      <div 
        class="form-validation"
        data-error="Dies ist ein Pflichtfeld."
      >
        <label for="email"> {{ $t('company_email') }} </label>
        <input
          v-model="email"
          type="email"
          name="email"
          :placeholder="$t('dummy_email')"
        />
      </div>
      <label for="password"> {{ $t('password') }} </label>
      <input
        v-model="password"
        type="password"
        name="password"
        :placeholder="$t('dummy_password')"
      />
      <button
        type="submit"
        :class="{ 'button--progress': progress }"
        class="button"
        v-text="$t('sign_in')"
      />
      <router-link
        :to="'/register'"
        class="form__link router-link-active"
        v-text="$t('company_register')"
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
        this.$swal({
          icon: 'success',
          showConfirmButton: false,
          position: 'top-end',
          title: `Welcome, ${userCredential.user.displayName}`,
          toast: true,
          timer: 1500,
          timerProgressBar: true,
        });
      }).catch((error) => {
        this.progress = false;
        this.$swal({
          icon: 'error',
          showConfirmButton: false,
          position: 'top-left',
          title: error,
          toast: true,
        });
      });
    }
  },
};
</script>

<style lang="scss">
</style>
