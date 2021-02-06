<template>
  <div class="register-page">
    <base-header></base-header>
    <form
      class="form"
      @submit.prevent="submit"
    >
      <h1 v-text="$t('register')" />
      <label for="companyName"> {{ $t('company_name') }} </label>
      <input
        v-model="companyName"
        type="companyName"
        name="companyName"
      />
      <label for="email"> {{ $t('company_email') }} </label>
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
        @click="submit()"
        v-text="$t('register')"
      />
      <router-link
        :to="'/login'"
        class="form__link"
        v-text="$t('sign_in')"
      />
    </form>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import API from "../api";

export default {
  name: 'Register',
  components: {
    BaseHeader
  },
  data() {
    return {
      email: '',
      password: '',
      companyName: '',
      progress: false,
    }
  },
  methods: {
    submit() {
      this.progress = true;
      API.users.post(this.email, this.password).then((userCredential) => {
        API.companies.post(this.companyName, userCredential.user.uid)
          .then((doc) => {
            setTimeout(() => this.progress = false, 500)
          }).catch((error) => {
            setTimeout(() => this.progress = false, 500)
          });
      }).catch((error) => {
        setTimeout(() => this.progress = false, 500)
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
    box-sizing: border-box;
  }

  label {
    font-size: 16px;
    margin-bottom: 4px;
    width: 100%;
  }
}

.form__link {
  margin: 40px 0;
  font-size: 20px;
  font-weight: 300;
  text-decoration: none;
  color: #1a1a1a;
  padding: 0 10px;
}
</style>
