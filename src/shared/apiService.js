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
  },
  getCharacterSkills(charId) {
    return Vue.http.get(`${apiUrl}/character/${charId}/skills`);
  },
  getDungeons(charId) {
    return Vue.http.get(`${apiUrl}/character/${charId}/dungeons`);
  },
  saveCharacterSkills(charId, data) {
    return Vue.http.put(`${apiUrl}/character/${charId}/skills`, data);
  },
  getInventory(charId) {
    return Vue.http.get(`${apiUrl}/character/${charId}/inventory`);
  },
  updateEquipment(charId, data) {
    return Vue.http.put(`${apiUrl}/character/${charId}/equipment`, data);
  },
  enterDungeon(data) {
    return Vue.http.post(`${apiUrl}/dungeons/enter`, data);
  },
  saveBattle(data) {
    return Vue.http.post(`${apiUrl}/dungeons/battle`, data);
  }
};
