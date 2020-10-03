import { GameService } from '../../shared/apiService';
import { ENTER_DUNGEON } from '../actions.type';
import { SET_BATTLEFIELD, SET_ERROR } from '../mutations.type';

const state = {
  battlefield: null,
  errors: null
};

const actions = {
  [ENTER_DUNGEON](context, data) {
    return new Promise((resolve, reject) => {
      GameService.enterDungeon(data)
        .then(({ body }) => {
          context.commit(SET_BATTLEFIELD, body);
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
  [SET_BATTLEFIELD](state, battleFieldDetails) {
    state.battlefield = battleFieldDetails;
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
