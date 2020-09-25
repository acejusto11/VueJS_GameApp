<template>
  <div class="main">
    <div class="container">
      <div class="row nowrap skills-section">
        <div class="col-md-7 pad-1 border-1">
          <div class="row bold title no-margin">Skills</div>
          <div class="row">
            <div
              class="col-sm-4 skill-tile no-margin"
              v-for="skill in skills"
              :key="skill._id"
              @click="getSkill(skill._id)"
            >{{ skill.name }}</div>
          </div>
        </div>
        <div class="col-md-5 pad-1">
          <div class="row details-tile">
            <div class="col-sm-12">
              <div class="row bold title no-margin">Details</div>
              <div v-if="skill">
                <div class="row">
                  <div class="col-sm-12">{{ skill.name }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-4 bold">Level</div>
                  <div class="col-sm-8 left-text">{{ skill.lvlReq }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-4 bold">Target</div>
                  <div class="col-sm-8 left-text">{{ skill.target }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-4 bold">Type</div>
                  <div class="col-sm-8 left-text">{{ type }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-4 bold">Cost</div>
                  <div class="col-sm-8 left-text">{{ skill.cost }}</div>
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
              <div class="row bold title no-margin">Current Skills</div>
            </div>
          </div>
          <div class="row action-tile">
            <div class="col-sm-6 pad-1">
              <button disabled>Equip</button>
            </div>
            <div class="col-sm-6 pad-1">
              <button disabled>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_SKILLS } from '../store/actions.type';
export default {
  name: 'CharacterSkills',
  data() {
    return {
      skill: null
    };
  },
  methods: {
    getSkill(id) {
      const skills = this.$store.state.character.skills;
      this.skill =
        skills &&
        skills.find(function(skill) {
          return skill._id == id;
        });
    }
  },
  created() {
    const characterId = this.$store.state.character.details._id;
    if (characterId) {
      this.$store.dispatch(GET_SKILLS, characterId);
    }
  },
  computed: {
    skills() {
      return this.$store.state.character.skills;
    },
    type() {
      const type = this.skill && this.skill.type;
      if (type == 'P') return 'Physical';
      if (type == 'M') return 'Magical';
      return type;
    },
    cost() {
      return this.skill && `${this.skill.cost} mana`;
    },
    damageLabel() {
      const type = this.skill && this.skill.type;
      if (type == 'P') return 'Damage';
      if (type == 'M') return 'Heal';
      return 'Damage';
    },
    damageValue() {
      const type = this.skill && this.skill.type;
      const damage = this.skill && this.skill.damage;
      if (type == 'P') {
        return `${damage}% Offense`;
      }
      if (type == 'M') {
        return `${damage * -1}% Heal`;
      }
      return '';
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
  padding: 1em;
}

.skills-section {
  display: flex;
  border: 5px solid #d39e0033;
  min-height: 600px;
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