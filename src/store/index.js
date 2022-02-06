import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const defaultState = {
  company: {},
  token: null,
  report: {},
};

export default new Vuex.Store({
  state: defaultState,
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
    resetCompanyData({ commit }) {
      commit('setCompanyInfo', defaultState);
    },
    resetToken({ commit }) {
      commit('setToken', undefined);
    },
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
