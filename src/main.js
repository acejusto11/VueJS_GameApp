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

export const EventBus = new Vue();

Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

Vue.use(Vuelidate);

Vue.use(VueSession);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
