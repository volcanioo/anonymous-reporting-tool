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
          :class="{ 'button--progress': loading }"
          class="button"
        >Go Case Detail</button>
      </div>
      <div v-else>
        <label> Company </label>
        <company-select
          @company-selected="setCompany"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import CompanySelect from '@/components/CompanySelect/index.vue'
import API from '../api';

export default {
  name: 'AnnonymousLogin',
  components: {
    BaseHeader,
    CompanySelect
  },
  data() {
    return {
      loading: false,
      selectedCompany: null,
      passcode: '',
    }
  },
  methods: {
    setCompany(e) {
      this.selectedCompany = e;
    },
    anonymousLogin() {
      this.loading = true;
      API.cases.get(this.selectedCompany.userUid, this.passcode)
      .then((query) => {
        query.forEach(doc => {
          if (doc.exists) {
            API.companies.logout().then((res) => {
              localStorage.setItem('caseId', doc.id);
              setTimeout(() => {
                this.$router.push({
                  name: 'CaseDetail',
                })
              }, 400)
            })
          } else {
            alert('no input!');
          }
        });
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        this.loading = false;
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
