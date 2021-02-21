<template>
  <div class="anonymous-login">
    <base-header></base-header>
    <div class="anonymous-login__form">
      <h1> Anonymous Login </h1>
      <div v-if="selectedCompany">
        <label for="email"> Passcode </label>
        <input
          v-model="passcode"
          type="passcode"
          name="passcode"
          placeholder="X000-00:00"
        />
        <button
          @click="anonymousLogin"
          :class="{ 'button--progress': progress }"
          class="button"
        >Go Case Detail</button>
      </div>
      <div v-else>
        <label> Company </label>
        <company-selector
          @company-selected="setCompany"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import CompanySelector from '@/components/CompanySelector.vue'
import API from '../api';

export default {
  name: 'AnnonymousLogin',
  components: {
    BaseHeader,
    CompanySelector
  },
  data() {
    return {
      selectedCompany: null,
      passcode: '',
      progress: false,
    }
  },
  methods: {
    submit() {
      this.progress = true;
    },
    setCompany(e) {
      this.selectedCompany = e;
    },
    async anonymousLogin() {
      const verifyCase = await API.cases.get(this.selectedCompany, this.passcode)
      .then((query) => {
        query.forEach(doc => {
          if (doc.exists) {
            API.companies.logout().then((res) => {
              localStorage.setItem('caseId', doc.id);
              setTimeout(() => {
                this.$router.push({
                  name: 'CaseDetail',
                })
              }, 100)
            })
          }
        });
      })
      .catch((err) => {
        console.warn(err);
      });
    },
  },
};
</script>
<style lang="scss">
.anonymous-login__form {
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 25px;
  
  h1 {
    text-align: center;
  }
}
</style>
