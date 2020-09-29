<template>
  <div class="main">
    <div class="container">
      <div class="row nowrap dungeons-section">
        <div class="col-sm-6 dungeon-list">
          <div
            class="dungeon-tile"
            v-for="dungeon in dungeons"
            :key="dungeon._id"
            @click="getDungeon(dungeon._id)"
            :style="{'background-image': `url(${getImage(dungeon.image)})`}"
          >
            <img
              v-if="dungeon.recommendedLevel > level"
              src="../assets/dungeons/locked-overlay.png"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div v-if="selectedDungeon">
            <div class="row">
              <div class="col-sm-12 pad-1 title">{{ selectedDungeon.name }}</div>
            </div>
            <div class="row">
              <div class="col-sm-6 bold left-text">Recommended Level:</div>
              <div class="col-sm-4 left-text">{{ selectedDungeon.recommendedLevel }}</div>
            </div>
            <div class="row">
              <div class="col-sm-12 bold left-text">Enemies/Drops</div>
            </div>
            <div v-for="enemy in selectedDungeon.enemies" :key="enemy._id">
              <div class="row">
                <div class="col-sm-4 bold">{{enemy.name}}</div>
              </div>
              <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-8 text-left" v-if="enemy.drops && enemy.drops.length">
                  <div class="col-sm-8" v-for="drop in enemy.drops" :key="drop._id">* {{drop.name}}</div>
                </div>
                <div v-else class="col-sm-8 text-left">-----</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_DUNGEONS } from '../store/actions.type';
export default {
  name: 'Dungeons',
  data() {
    return {
      selectedDungeon: {}
    };
  },
  created() {
    this.$store
      .dispatch(GET_DUNGEONS, this.$store.state.character.details._id)
      .then(response => {
        if (response && response.length) this.selectedDungeon = response[0];
      });
  },
  computed: {
    characterId() {
      return this.$store.state.character.details._id;
    },
    dungeons() {
      return this.$store.state.character.dungeons;
    },
    level() {
      return this.$store.state.character.details.level;
    }
  },
  methods: {
    getDungeon(id) {
      this.selectedDungeon =
        this.dungeons &&
        this.dungeons.find(function(dungeon) {
          return dungeon._id === id;
        });
    },
    getImage: function(image) {
      return require(`../assets/dungeons/${image}.jpg`);
    }
  }
};
</script>
<style  scoped>
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

.dungeons-section {
  display: flex;
  border: 5px solid #d39e0033;
  min-height: 650px;
}

.dungeon-list {
  border-right: 5px solid #d39e0033;
  height: 650px;
  overflow-y: auto;
}

.dungeon-tile {
  cursor: pointer;
  width: 380px;
  height: 280px;
  margin: 1rem auto;
  background-size: cover;
}

img {
  width: 100%;
  height: 100%;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>