<template>
  <div>
    <base-header></base-header>
    <div class="form">
      <h1> Anonymous Login </h1>
      <div v-if="selectedCompany">
        <label for="email"> {{ $t('passcode') }} </label>
        <input
          v-model="passcode"
          type="passcode"
          name="passcode"
          :placeholder="$t('dummy_passcode')"
        />
        <button
          @click="anonymousLogin"
          class="button"
          :class="{ 'button--progress': loading }"
          v-text="$t('go_case_detail')"
        />
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
</style>
