import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import Vuelidate from 'vuelidate';
import vSelect from 'vue-select';

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  render: h => h(App)
}).$mount('#app');
