<template>
  <article class="company-selector">
    <label for="company-name"> {{ $t('enter_your_representatives_name') }} </label>
    <input
      autofocus
      id="company-name"
      type="text"
      :placeholder="$t('enter_your_representatives_name')"
      v-model="searchInput"
    >
    <company-list
      v-if="searchInput.length > 3"
      :items='Object.values(items)'
      :class="{
        'company-selector__list--empty': !(searchInput.length > 0),
        'company-selector__list--loading': isLoading,
      }"
      @set-selected-company="setSelectedCompany"
    />
    <div
      v-if="isCompanyInviteVisible"
      class="company-selector--footer"
    >
      <button
        class="button"
        :class="{
          'button--signal': selectedCompany,
        }"
        :disabled="!selectedCompany"
        @click="nextStep"
        v-text="$t('NEXT')"
      />
      <router-link
        :to="{ name: 'Home' }"
        v-text="$t('couldnt_find_company')"
      />
    </div>
  </article>
</template>

<script>
import API from "../../api";
import utilities from '../../utilities';
import CompanyList from './CompanyList.vue';

export default {
  name: "CompanySelect",
  props: {
    isCompanyInviteVisible: {
      type: Boolean,
      default: true
    },
  },
  components: {
    CompanyList,
  },
  data() {
    return {
      items: {},
      searchInput: '',
      selectedCompany: null,
      isLoading: true,
    }
  },
  watch: {
    searchInput(newValue) {
      this.selectedCompany = null;
      utilities.debounce(this.fetchCompanies(newValue));
    },
  },
  methods: {
    fetchCompanies(companies) {
      if (!companies || companies.length < 3) {
        this.items = [];
        return false;
      }
      this.isLoading = true;
      API.companies.search(companies).then((response) => {
        this.items = response.hits;
      }).catch((error) => {
        console.warn(error);
      }).finally(() => {
        this.isLoading = false;
      })
    },
    setSelectedCompany(item) {
      this.selectedCompany = item;
    },
    nextStep() {
      this.$emit('company-selected', this.selectedCompany);
    }
  },
}
</script>

<style lang="scss" scoped>
a {
  display: block;
  text-align: left;
  margin-bottom: 40px;
  font-weight: 600;
  color: #566960;
  margin-top: 10px;
  text-decoration: underline;
}

.company-selector {

  label {
    display: block;
    text-align: left;
    margin-bottom: 4px;

    &:after {
      content: "*";
      font-weight: bold;
      color: var(--red);
    }
  }

  input {
    margin-bottom: 0px;
  }
}

.company-selector--footer {
  display: block;
  margin: 15px 0;
}
</style>
