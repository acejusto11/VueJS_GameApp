<template>
  <div class="main flex">
    <game-menu />
    <div class="container">
      <div class="row title flex-center">Skills</div>
      <div class="row nowrap skills-section">
        <div class="col-md-7 pad-1 border-1">
          <div class="row text-center">
            <div
              class="col-sm-12 skill-tile no-margin"
              v-for="skill in skills"
              :key="skill._id"
              @click="getSkill(skill._id)"
            >{{ skill.name }}</div>
          </div>
        </div>
        <div class="col-md-5 pad-1">
          <div class="row details-tile">
            <div class="col-sm-12">
              <div class="row title no-margin">Details</div>
              <div class="text-center" v-if="currentSkill">
                <div class="row">
                  <div class="col-sm-12 bold">{{ currentSkill.name }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-4 bold">Level</div>
                  <div class="col-sm-8 left-text">{{ currentSkill.lvlReq }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-4 bold">Target</div>
                  <div class="col-sm-8 left-text">{{ currentSkill.target }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-4 bold">Type</div>
                  <div class="col-sm-8 left-text">{{ type }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-4 bold">Cost</div>
                  <div class="col-sm-8 left-text">{{ currentSkill.cost }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-4 bold">{{ damageLabel }}</div>
                  <div class="col-sm-8 left-text">{{ damageValue }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row current-skill-tile">
            <div class="col-sm-12">
              <div class="row title no-margin">Current Skills</div>
              <div class="row" v-for="skill in currentSkills" :key="skill._id">
                <div class="col-sm-8 text-center">{{ skill.name }}</div>
                <div
                  class="col-sm-4 text-center"
                  style="cursor: pointer"
                  v-if="currentSkills.length > 1"
                  @click="removeSkill(skill._id)"
                >X</div>
              </div>
            </div>
          </div>
          <div class="row action-tile">
            <div class="col-sm-6 pad-1">
              <button :disabled="isSkillEquipped(currentSkill)" @click="addCurrentSkill()">Equip</button>
            </div>
            <div class="col-sm-6 pad-1">
              <button :disabled="!hasChanges" @click="save">Save</button>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">{{message}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_SKILLS, GET_CHARACTER, SAVE_SKILLS } from '../store/actions.type';
import Menu from '../components/Menu';
export default {
  name: 'CharacterSkills',
  components: {
    'game-menu': Menu
  },
  data() {
    return {
      currentSkill: undefined,
      previousSkills: [],
      currentSkills: [],
      hasChanges: false
    };
  },
  created() {
    //TODO: move to mixin
    const accountId = this.$session.get('accountId');
    if (!accountId) this.$router.push('/');
    let loader = this.$loading.show({ loader: 'bars', width: 800, height: 200});

    const characterId = this.$session.get('characterId');
    if (characterId) {
      this.$store.dispatch(GET_SKILLS, characterId).then(() => {
        this.$store.dispatch(GET_CHARACTER, accountId).then(() => {
          setTimeout(() => loader.hide(), 1000);
          this.currentSkills = this.$store.state.character.details && [
            ...this.$store.state.character.details.skills
          ];
          this.previousSkills = this.currentSkills;
        }).catch(
          setTimeout(() => loader.hide(), 1000)
        );
      }).catch(
        setTimeout(() => loader.hide(), 1000)
      );
    }
  },
  methods: {
    getSkill(id) {
      this.currentSkill =
        this.skills &&
        this.skills.find(function(skill) {
          return skill._id == id;
        });
    },
    addCurrentSkill() {
      this.previousSkills = [...this.currentSkills];
      this.currentSkills.push(this.currentSkill);
      this.hasChanges = true;
    },
    removeSkill(id) {
      this.previousSkills = [...this.currentSkills];
      this.currentSkills = this.currentSkills.filter(function(skill) {
        return skill._id !== id;
      });
      this.hasChanges = true;
    },
    isSkillEquipped(currentSkill) {
      let isEquipped = true;
      if (!currentSkill) return true;
      isEquipped = !!this.currentSkills.find(function(skill) {
        return skill._id === currentSkill._id;
      });
      const isMaxSkill = this.currentSkills.length === 4;
      return isEquipped || isMaxSkill;
    },
    save() {
      const ids = this.currentSkills.map(function(item) {
        return item._id;
      });
      const data = { characterId: this.characterId, ids };
      this.$store.dispatch(SAVE_SKILLS, data).then((this.hasChanges = false));
    }
  },
  computed: {
    characterId() {
      return this.$store.state.character.details._id;
    },
    skills() {
      return this.$store.state.character.skills;
    },
    type() {
      const type = this.currentSkill && this.currentSkill.type;
      if (type == 'P') return 'Physical';
      if (type == 'M') return 'Magical';
      return type;
    },
    cost() {
      return this.currentSkill && `${this.currentSkill.cost} mana`;
    },
    damageLabel() {
      const target = this.currentSkill && this.currentSkill.target;
      if (target == 'enemy') return 'Damage';
      if (target == 'self') return 'Heal';
      return 'Damage';
    },
    damageValue() {
      const type = this.currentSkill && this.currentSkill.type;
      const damage = this.currentSkill && this.currentSkill.damage;
      const target = this.currentSkill && this.currentSkill.target;
      if (target == 'self') {
        return `${damage * -1}% Intelligence`;
      } else {
        if (type == 'P') {
          return `${damage}% Offense`;
        }
        if (type == 'M') {
          return `${damage}% Intelligence`;
        }
      }
      return '';
    },
    message() {
      return this.currentSkills && this.currentSkills.length === 4
        ? 'You can only equip up to max of 4 skills.'
        : '';
    }
  }
};
</script>

<style scoped>
* {
  font-family: Rubik;
}
.container {
  min-width: 50%;
  min-height: 80%;
  margin: auto;
  color: white;
  background-color: rgb(3 0 0 / 85%);
  border: 20px solid rgb(3 2 2 / 50%);
}

.skills-section {
  display: flex;
  border: 5px solid #d39e0033;
  min-height: 600px;
}
.skill-tile {
  font-size: 1.5rem;
}

.skill-tile:hover,
.skill-tile:active {
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid gray;
}

.details-tile {
  height: 250px;
  border-bottom: 5px solid #d39e0033;
}
.current-skill-tile {
  height: 200px;
  border-bottom: 5px solid #d39e0033;
}
.action-tile {
  height: 120px;
}

.border-1 {
  border-right: 5px solid #d39e0033;
}

button {
  box-shadow: 0px 5px 9px -7px #3e7327;
  background: linear-gradient(to bottom, #77b55a 5%, #72b352 100%);
  background-color: #77b55a;
  border-radius: 2px;
  border: 1px solid #4b8f29;
  display: inline-block;
  cursor: pointer;
  color: black;
  font-family: Galiver-Sans;
  font-size: 1rem;
  font-weight: bold;
  padding: 9px 47px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #5b8a3c;
  width: 100%;
}
button:hover {
  background: linear-gradient(to bottom, #72b352 5%, #77b55a 100%);
  background-color: #72b352;
}
button:active {
  position: relative;
  top: 1px;
}
button:disabled {
  background: gray;
  cursor: not-allowed;
}
</style>
