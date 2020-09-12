import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import router from './router';
import Vuelidate from 'vuelidate';
import VueResource from 'vue-resource';
import vSelect from 'vue-select';

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-select/dist/vue-select.css';

export const EventBus = new Vue();

Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
