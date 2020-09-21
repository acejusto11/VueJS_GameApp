import { GameService } from '../../shared/apiService';
import { GET_CHARACTER } from '../actions.type';
import { SET_CHARACTER, SET_ERROR } from '../mutations.type';

const state = {
  details: {}
};

const actions = {
  [GET_CHARACTER](context, accountId) {
    return new Promise((resolve, reject) => {
      GameService.getAccountCharacter(accountId)
        .then(({ body }) => {
          context.commit(SET_CHARACTER, body);
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
  [SET_CHARACTER](state, characterDetails) {
    state.details = characterDetails;
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
