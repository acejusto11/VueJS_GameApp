import { GameService } from '../../shared/apiService';
import { GET_CHARACTER, GET_SKILLS, SAVE_SKILLS } from '../actions.type';
import { SET_CHARACTER, SET_SKILLS, SET_ERROR } from '../mutations.type';

const state = {
  details: {},
  skills: []
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
  },
  [GET_SKILLS](context, id) {
    return new Promise((resolve, reject) => {
      GameService.getCharacterSkills(id)
        .then(({ body }) => {
          context.commit(SET_SKILLS, body);
          resolve(body);
        })
        .catch(({ body }) => {
          context.commit(SET_ERROR, body);
          reject(body);
        });
    });
  },
  [SAVE_SKILLS](context, data) {
    return new Promise((resolve, reject) => {
      GameService.saveCharacterSkills(data?.characterId, data?.ids)
        .then(() => {
          resolve('saved');
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
  [SET_SKILLS](state, skills) {
    state.skills = skills;
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
