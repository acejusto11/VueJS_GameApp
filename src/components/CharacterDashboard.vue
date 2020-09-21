<template>
  <div class="container">
    <div class="row nowrap">
      <div class="col-md-5"></div>
      <div class="col-md-3">Record</div>
      <div class="col-md-4"></div>
    </div>
    <div class="row nowrap container-1">
      <div class="col-md-5">
        Character Stats
        <div class="row nowrap">
          <div class="col-sm-3">Attrib</div>
          <div class="col-sm-3">Base</div>
          <div class="col-sm-3">Bonus</div>
          <div class="col-sm-3">Total</div>
        </div>
        <div class="row nowrap" v-for="stat in Object.keys(details.stats)" :key="stat">
          <div class="col-sm-3">{{stat}}</div>
          <div class="col-sm-3">0</div>
          <div class="col-sm-3">0</div>
          <div class="col-sm-3">0</div>
        </div>
      </div>
      <div class="col-md-3 container-3">
        <img class="imgCharacter" src="../assets/1/0.png" />

        <div>{{details.name}}</div>
        <div>Level {{details.level}}</div>
        <div>Type {{details.classType}}</div>
        <div>{{details.totalExp}}</div>
      </div>
      <div class="col-md-4">
        <div class="row">
          Skills
          <div class="col-sm-4" v-for="skill in details.skills" :key="skill._id">{{ skill.name }}</div>
        </div>
        <div class="row">
          Weapons
          <div class="col-sm-4" v-for="skill in details.skills" :key="skill._id">{{ skill.name }}</div>
        </div>
      </div>
    </div>
    <div class="row nowrap container-2">
      <div class="col-md-5">
        Dungeon Access
        <div v-for="dungeon in details.dungeonAccess" :key="dungeon._id">{{ dungeon.name }}</div>
      </div>
      <div class="col-md-3"></div>
      <div class="col-md-4">
        <div>
          <button>Character</button>
        </div>
        <div>
          <button>Dungeons</button>
        </div>
        <div>
          <button>Inventory</button>
        </div>
        <div>
          <button>Skills</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterDashboard',
  props: {
    details: Object
  },
  mounted() {
    console.log(this.details.stats, 'stat details');
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
  margin: auto;
  color: white;
  background-color: rgb(3 0 0 / 85%);
  border: 20px solid rgb(3 2 2 / 50%);
  padding: 2rem 6rem 6rem 6rem;
}
.imgCharacter {
  max-width: 100%;
  max-height: 100%;
  min-width: 300px;
  min-height: 300px;
}

.nowrap {
  flex-wrap: nowrap;
}

.container-1 {
  border: 1px solid green;
}
.container-2 {
  border: 1px solid green;
  border-top: 0;
}
.container-3 {
  border-left: 1px solid green;
  border-right: 1px solid green;
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
  font-family: Rubik;
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

/* div {
  border: 0.5px solid gray;
} */
</style>
