import { GameService } from '../../shared/apiService';
import { ENTER_DUNGEON, SAVE_BATTLE } from '../actions.type';
import {
  SET_BATTLEFIELD,
  SET_BATTLERESULT,
  SET_ERROR
} from '../mutations.type';
import { getEnemyBasicSkill } from '../../utils';

const state = {
  battlefield: null,
  errors: null,
  battleResult: null
};

const actions = {
  [ENTER_DUNGEON](context, data) {
    return new Promise((resolve, reject) => {
      GameService.enterDungeon(data)
        .then(({ body }) => {
          const basicSkill = getEnemyBasicSkill(body.enemy.name);
          if (basicSkill) body.enemy.skills.push(basicSkill);
          context.commit(SET_BATTLEFIELD, body);
          resolve(body);
        })
        .catch(({ body }) => {
          context.commit(SET_ERROR, body);
          reject(body);
        });
    });
  },
  [SAVE_BATTLE](context, data) {
    return new Promise((resolve, reject) => {
      GameService.saveBattle(data)
        .then(({ body }) => {
          context.commit(SET_BATTLERESULT, body);
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
  [SET_BATTLERESULT](state, battleResult) {
    state.battleResult = battleResult;
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
