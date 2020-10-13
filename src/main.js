import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import router from './router/router';
import store from './store';
import Vuelidate from 'vuelidate';

import vSelect from 'vue-select';
import VueSession from 'vue-session';

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-select/dist/vue-select.css';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


export const EventBus = new Vue();

Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueSession);
Vue.use(Loading);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
