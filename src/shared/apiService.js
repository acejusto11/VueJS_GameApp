import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
const apiUrl = 'https://monster-slayer-api-staging.herokuapp.com';

export const GameService = {
  register(data) {
    return Vue.http.post(`${apiUrl}/accounts`, data);
  },
  login(data) {
    return Vue.http.post(`${apiUrl}/accounts/login`, data);
  },
  getAccountCharacter(accountId) {
    return Vue.http.get(`${apiUrl}/accounts/${accountId}/character`);
  }
};
