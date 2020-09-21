import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './modules/authentication';
import character from './modules/character';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    character
  }
});
