<template>
  <div>
    <base-header></base-header>
    <!-- TODO Remove and use the component -->
    <div class="form">
      <h1> {{ $t('anonymous_login') }} </h1>
      <label for="passcode"> {{ $t('passcode') }} </label>
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
      messages: {
        error: {
          icon: 'error',
          title: this.$t('oops'),
          text: this.$t('we_couldnt_find'),
          footer: `<a href=${this.$router.currentRoute}>${this.$t('create_a_new_case')}</a>`
        },
        success: {
          icon: 'success',
          showConfirmButton: false,
          position: 'top-end',
          title: this.$t('welcome'),
          toast: true,
          timer: 1500,
          timerProgressBar: true,
        }
      }
    }
  },
  methods: {
    setCompany(e) {
      this.selectedCompany = e;
    },
    redirectAfterLogin(id) {
      API.companies.logout()
        .then((res) => {
          localStorage.setItem('caseId', id);
          setTimeout(() => {
            this.$router.push({
              name: 'CaseDetail',
            })
            this.$swal(this.messages.success)
          }, 400)
        })
    },
    anonymousLogin() {
      this.loading = true;
      API.cases.get(this.passcode)
        .then((query) => {
          if (query.size === 0) this.$swal(this.messages.error)
          query.forEach((doc) => {
            if (doc.exists) {
              this.$swal(this.messages.success)
              this.redirectAfterLogin(doc.id);
            } else {
              this.$swal(this.messages.error);
            }
          });
        })
        .catch((err) => {
          this.$swal(this.messages.error);
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
