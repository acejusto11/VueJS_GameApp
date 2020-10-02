<template>
  <div class="container">
    <div class="row nowrap">
      <div class="col-md-5"></div>
      <div class="col-md-3 title">Record</div>
      <div class="col-md-4"></div>
    </div>
    <div class="row nowrap container-1">
      <div class="col-md-5 pad-1">
        <span class="title">Character Stats</span>
        <div class="row nowrap">
          <div class="col-sm-3 bold">Attrib</div>
          <div class="col-sm-3 bold">Base</div>
          <div class="col-sm-3 bold">Bonus</div>
          <div class="col-sm-3 bold">Total</div>
        </div>

        <div class="row nowrap" v-for="stat in Object.keys(details.stats)" :key="stat">
          <div class="col-sm-3 bold uppercase">{{stat}}</div>
          <div class="col-sm-3">{{details.stats[stat]["base"]}}</div>
          <div class="col-sm-3">{{details.stats[stat]["bonus"]}}</div>
          <div class="col-sm-3">{{details.stats[stat]["total"]}}</div>
        </div>
      </div>
      <div class="col-md-3 container-3 bold">
        <img class="imgCharacter" :src="getImage(details.classType, 'idle')" />
        <div class="title bold">{{details.name}}</div>
        <div>Level: {{details.level}}</div>
        <div>Type: {{getType(details.classType)}}</div>
        <div>Exp: {{details.totalExp}}</div>
      </div>
      <div class="col-md-4 pad-1">
        <div class="row title no-margin">Skills</div>
        <div class="row">
          <div class="col-sm-4" v-for="skill in details.skills" :key="skill._id">{{ skill.name }}</div>
        </div>
        <div class="row title no-margin">Weapon</div>
        <div class="row">
          <div class="col-sm-4" v-if="details.equipment">{{ details.equipment.weapon.name}}</div>
        </div>
        <div class="row title no-margin">Armor</div>
        <div class="row">
          <div class="col-sm-4" v-if="details.equipment">{{ details.equipment.armor.name}}</div>
        </div>
      </div>
    </div>
    <div class="row nowrap container-2">
      <div class="col-md-5 pad-1">
        <span class="title">Dungeon Access</span>
        <div v-for="dungeon in details.dungeonAccess" :key="dungeon._id">{{ dungeon.name }}</div>
      </div>
      <div class="col-md-3"></div>
      <div class="col-md-4 pad-1">
        <div>
          <button @click="$router.push('/character/dungeons')">Dungeons</button>
        </div>
        <div>
          <button @click="$router.push('/character/inventory')">Inventory</button>
        </div>
        <div>
          <button @click="$router.push('/character/skills')">Skills</button>
        </div>
        <div>
          <button>Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCharacterClasses } from '../utils/getCharacterClasses.js';
export default {
  name: 'CharacterDashboard',
  props: {
    details: {
      type: Object,
      default: function() {
        return { skills: [], equipment: {} };
      }
    }
  },
  methods: {
    //TODO: Move to mixin
    getImage(type = 1, action = 'idle') {
      return require(`../assets/${type}/${action}.png`);
    },
    getType(type) {
      const charClass = getCharacterClasses().find(item => {
        return item.code === type;
      });
      return charClass ? charClass.title : '';
    }
  }
};
</script>

<style  scoped>
* {
  font-family: Rubik;
}
.center {
  justify-content: center;
}
.container {
  min-width: 80%;
  min-height: 80%;
  margin-left: auto;
  margin-right: auto;
  color: white;
  background-color: rgb(3 0 0 / 85%);
  border: 20px solid rgb(3 2 2 / 50%);
  padding: 1rem;
}
.imgCharacter {
  width: 250px;
  height: 280px;
}

.nowrap {
  flex-wrap: nowrap;
}
.container-1 {
  border: 5px solid #d39e0033;
}
.container-2 {
  border: 5px solid #d39e0033;
  border-top: 0;
}
.container-3 {
  border-left: 5px solid #d39e0033;
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
</style>
