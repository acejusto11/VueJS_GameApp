import { GameService } from '../../shared/apiService';
import { LOGIN, REGISTER } from '../actions.type';
import { SET_AUTH, SET_ERROR } from '../mutations.type';

const state = {
  accountId: null,
  errors: null,
  isAuthenticated: false
};

const actions = {
  [LOGIN](context, credentials) {
    GameService.login(credentials)
      .then(({ body }) => {
        context.commit(SET_AUTH, body.accountId);
      })
      .catch(({ body }) => {
        context.commit(SET_ERROR, body);
      });
  },
  [REGISTER](context, userDetails) {
    return new Promise((resolve, reject) => {
      GameService.register(userDetails)
        .then(({ body }) => {
          context.commit(SET_AUTH, body.accountId);
          resolve(body);
        })
        .catch(({ body }) => {
          context.commit(SET_ERROR, body);
          reject(body);
        });
    });
  }
};

const mutations = {
  [SET_AUTH](state, accountId) {
    state.isAuthenticated = true;
    state.accountId = accountId;
    state.errors = {};
  },
  [SET_ERROR](state, error) {
    state.errors = error;
  }
};
export default {
  state,
  actions,
  mutations
};
