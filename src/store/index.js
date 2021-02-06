import Vue from 'vue';
import Vuex from 'vuex';
import API from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    company: {},
    token: null,
  },
  mutations: {
    setCompanyInfo(state, company) {
      Vue.set(state, 'company', company);
    },
    setToken(state, token) {
      Vue.set(state, 'token', token);
    },
  },
  actions: {
    fetchCompanyData({ commit }, companyId) {
      API.companies.get(companyId).then((response) => {
        response.forEach((company) => {
          commit('setCompanyInfo', company.data());
        });
      });
    },
    saveToken({ commit }, token) {
      API.users.get(token).then((response) => {
        commit('setToken', response);
      });;
    },
  },
  modules: {
  },
});
