<template>
  <div>
    <div class="input">
      <input
        type="text"
        placeholder="Select your company"
        ref="searchCompanyInput"
        v-model="searchCompanyInput"
      >
    </div>
    <div
      class="company-list"
      :class="{ 
        'company-list--loading': isLoading
      }"
    >
      <div
        v-if="items.length === 0 && searchCompanyInput"
        class="company-list__item--noList"
        v-text="'No result.'"
      />
      <div
        v-else
        v-for="item in items"
        :key="item.objectID"
        @click="selectCompany(item)"
        class="company-list__item"
        :class="{
          'company-list__item--selected': (item.user_id === selectedCompanyId)
        }"
      >
        <figure 
          v-if="item.companyPhotoUrl"
        >
          <img :src="item.companyPhotoUrl" :alt="item.companyName">
        </figure>
        <figure
          class="company-list__logo"
          v-else
        >
          <img src="@/assets/user.svg" :alt="item.companyName">
        </figure>
        <p>{{ item.companyName }}</p>
      </div>
    </div>
    <div v-if="!onlyInput">
      <a href="#">Couldn't find your company?</a>
      <button
        class="button"
        :class="{ 'button--signal': selectedCompany }"
        @click="nextStep"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import API from "../api";

export default {
  props: ['onlyInput'],
  name: "CompanySelector",
  data() {
    return {
      items: {},
      searchCompanyInput: '',
      selectedCompany: null,
      selectedCompanyId: null,
      isLoading: false,
    }
  },
  mounted() {
    this.companySearch();
  },
  methods: {
    debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    companySearch() {
      this.$refs.searchCompanyInput.addEventListener('keyup', this.debounce(() => {
        if (!this.searchCompanyInput || this.searchCompanyInput.length < 3) {
          this.items = [];
          return false;
        }
        this.isLoading = true;
        const search = API.companies.search(this.searchCompanyInput);
        search.then((response) => {
          this.items = response.hits;
        }).catch((error) => {
          console.warn(error);
        }).finally(() => {
          this.isLoading = false;
        })
      }, 250));
    },
    selectCompany(item) {
      this.selectedCompanyId = item.user_id;
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
}
.company-list {
  margin-top: -20px;
  background: white;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  max-height: 200px;
  transition: all .3s;
}

.company-list--loading {
  position: relative;
  pointer-events: none;
  overflow: hidden;
  min-height: 50px;

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #000;
    animation: spinner .6s linear infinite;
  }
}

.company-list__item {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--light-gray);
  cursor: pointer;
  transition: all .3s;
  position: relative;

  &:hover {
    background: rgba(0, 0, 0, .01);
  }

  p {
    margin: 0;
    padding-left: 15px;
  }

  img, svg {
    max-width: 25px;
    height: 25px;
    display: block;
  }

  figure {
    margin: 0;
  }
}

.company-list__item--noList {
  padding: 10px 20px;
  opacity: .3;
}

.company-list__item--selected {
  background: var(--dark-black);
  color: white;

  &:hover {
    background: var(--dark-black);
  }

  &:after {
    content: "";
    width: 62px;
    height: 100%;
    position: absolute;
    background-color: white;
    right: 0;
    -webkit-mask: url('../assets/check.svg');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    -webkit-mask-size: 28px 28px;
  }

  img {
    border-radius: 100%;
  }
}

.company-list__item svg {
  display: block;
}
</style>