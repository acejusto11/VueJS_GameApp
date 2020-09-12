import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./components/Main.vue')
    },
    {
      path: '/createaccount',
      name: 'createAccount',
      component: () => import('./components/Forms/AccountCreationForm.vue')
    }
  ]
});
