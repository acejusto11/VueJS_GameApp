import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/Main.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/AccountCreationForm.vue')
    },
    {
      path: '/character',
      name: 'character',
      component: () => import('../views/CharacterDetails.vue')
    },
    {
      path: '/character/skills',
      name: 'skills',
      component: () => import('../views/CharacterSkills.vue')
    },
    {
      path: '/character/inventory',
      name: 'inventory',
      component: () => import('../views/Inventory.vue')
    },
    {
      path: '/character/dungeons',
      name: 'dungeons',
      component: () => import('../views/Dungeons.vue')
    },
    {
      path: '/dungeon/:id',
      name: 'dungeon',
      component: () => import('../views/GameScreen.vue')
    },

  ]
});
