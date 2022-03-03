<template>
  <div class="register-page">
    <base-header></base-header>
    <!-- TODO Remove and use the component -->
    <form
      class="form"
      @submit.prevent="submit"
    >
      <h1 v-text="$t('create_a_new_account')" />
      <label for="yourName"> {{ $t('your_name') }} </label>
      <input
        v-model="yourName"
        type="yourName"
        name="yourName"
        :placeholder="$t('enter_your_name')"
      />
      <label for="email"> {{ $t('your_email') }} </label>
      <input
        v-model="email"
        type="email"
        name="email"
        :placeholder="$t('dummy_email')"
      />
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
        v-text="$t('register')"
      />
      <router-link
        :to="'/login'"
        class="form__link router-link-active"
        v-text="$t('sign_in')"
      />
    </form>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import store from '../store';
import API from '../api';

export default {
  name: 'Register',
  components: {
    BaseHeader,
  },
  data() {
    return {
      email: '',
      password: '',
      yourName: '',
      companyPhotoURL: '',
      progress: false,
    }
  },
  methods: {
    submit() {
      this.progress = true;
      API.users.post(this.email, this.password, this.yourName, this.companyPhotoURL).then((credentials) => {
        // we set the data we have right now.
        store.dispatch('setCompanyData', {
          your_email: credentials.user.email,
          is_mail_verified: credentials.user.emailVerified,
          user_uid: credentials.user.uid,
          company_name: credentials.user.displayName,
        });

        this.$swal({
          icon: 'success',
          showConfirmButton: false,
          position: 'top-end',
          title: `Welcome, ${credentials.user.displayName}`,
          toast: true,
          timer: 1500,
          timerProgressBar: true,
        });
      }).catch((error) => {
        this.$swal({
          icon: 'error',
          showConfirmButton: false,
          position: 'top-left',
          title: error,
          timer: 1500,
          toast: true,
        });
      }).finally(() => {
        this.progress = false
      });
    }
  },
};
</script>

<style lang="scss">
.register-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.form {
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  align-items: center;
  padding-top: 30px;

  input {
    width: 100%;
    height: 68px;
    border: none;
    background: #F6F7F9;
    font-size: 20px;
    font-family: inherit;
    font-weight: 500;
    color: #808080;
    margin-bottom: 20px;
    padding-left: 20px;
  }

  label {
    font-size: 16px;
    margin-bottom: 4px;
    width: 100%;
    display: block;
  }

  > div {
    width: 100%;
  }
}

.form__link {
  margin-top: 32px;
  font-size: 16px;
  color: var(--dark-black);
  display: block;
  text-align: left;
  font-weight: 600;
  color: var(--dark-black);
  text-decoration: underline;
}

@media (max-width: 992px) {
  .form {
    width: 100%;
    padding: 0 16px;
  }
}
</style>
