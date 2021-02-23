import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './locale/index';
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false;
Vue.use(VueApexCharts)
Vue.component('apex-chart', VueApexCharts)

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
