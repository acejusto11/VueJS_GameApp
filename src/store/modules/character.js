import { GameService } from '../../shared/apiService';
import {
  GET_CHARACTER,
  GET_SKILLS,
  SAVE_SKILLS,
  GET_DUNGEONS,
  GET_INVENTORY
} from '../actions.type';
import {
  SET_CHARACTER,
  SET_SKILLS,
  SET_ERROR,
  SET_DUNGEONS,
  SET_INVENTORY
} from '../mutations.type';

const state = {
  details: {},
  skills: [],
  dungeons: [],
  inventory: []
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
  },
  [GET_DUNGEONS](context, characterId) {
    return new Promise((resolve, reject) => {
      GameService.getDungeons(characterId)
        .then(({ body }) => {
          context.commit(SET_DUNGEONS, body);
          resolve(body);
        })
        .catch(({ body }) => {
          context.commit(SET_ERROR, body);
          reject(body);
        });
    });
  },
  [GET_INVENTORY](context, characterId) {
    return new Promise((resolve, reject) => {
      GameService.getInventory(characterId)
        .then(({ body }) => {
          context.commit(SET_INVENTORY, body);
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
  [SET_SKILLS](state, skills) {
    state.skills = skills;
  },
  [SET_DUNGEONS](state, dungeons) {
    state.dungeons = dungeons;
  },
  [SET_INVENTORY](state, inventory) {
    state.inventory = inventory;
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
