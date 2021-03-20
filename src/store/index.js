import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    company: {},
    token: null,
    report: {},
  },
  mutations: {
    setCompanyInfo(state, company) {
      Vue.set(state, 'company', company);
    },
    setToken(state, token) {
      Vue.set(state, 'token', token);
    },
    setReport(state, report) {
      Vue.set(state, 'report', report);
    },
  },
  actions: {
    setCompanyData({ commit }, company) {
      commit('setCompanyInfo', company);
    },
    saveToken({ commit }, token) {
      commit('setToken', token);
      localStorage.removeItem('caseId');
    },
  },
  getters: {
    getReport: state => {
      return state.report
    },
    getCompany: state => {
      return state.company
    }
  },
  modules: {
  },
});
