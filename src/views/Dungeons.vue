<template>
  <div class="main flex">
    <game-menu />
    <div class="container">
      <div class="row nowrap dungeons-section">
        <div class="col-sm-6 dungeon-list">
          <div
            class="dungeon-tile"
            v-for="dungeon in dungeons"
            :key="dungeon._id"
            @click="getDungeon(dungeon._id)"
            :style="{ 'background-image': `url(${getImage(dungeon.image)})` }"
          >
            <img v-if="isDisabled(dungeon)" src="../assets/dungeons/locked-overlay.png" />
          </div>
        </div>
        <div class="col-sm-6">
          <div v-if="selectedDungeon">
            <div class="row text-center">
              <div class="col-sm-12 pad-1 title">{{ selectedDungeon.name }}</div>
            </div>
            <div class="row pad-1">
              <div class="col-sm-12 pad">
                <button
                  @click="goToGameScreen"
                  :disabled="isDisabled(selectedDungeon)"
                >Enter Dungeon</button>
              </div>
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
                <div
                  class="col-sm-6 bold left-text padding-1"
                  v-if="enemy.boss"
                >{{ enemy.name }} (boss)</div>
                <div class="col-sm-6 bold left-text padding-1" v-else>{{ enemy.name }}</div>
              </div>
              <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-8 text-left" v-if="enemy.drops && enemy.drops.length">
                  <div
                    class="col-sm-8"
                    v-for="drop in enemy.drops"
                    :key="drop._id"
                  >* {{ drop.name }}</div>
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
import LoaderMixin from '../shared/mixins/LoaderMixin';
import Menu from '../components/Menu';
export default {
  name: 'Dungeons',
  components: {
    'game-menu': Menu
  },
  mixins: [LoaderMixin],
  data() {
    return {
      selectedDungeon: undefined
    };
  },
  created() {
    const accountId = this.$session.get('accountId');
    if (!accountId) this.$router.push('/');

    this.showLoader();
    this.$store
      .dispatch(GET_DUNGEONS, this.$session.get('characterId'))
      .then(response => {
         this.hideLoader();
        if (response && response.length) this.selectedDungeon = response[0];
      }).catch(
         this.hideLoader()
      );
  },
  beforeDestroy() {
    this.hideLoader();
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
    getImage(image) {
      return require(`../assets/dungeons/${image}.jpg`);
    },
    isDisabled(dungeon) {
      const dungeonAccess = this.$store.state.character.details.dungeonAccess;
      const matchedDungeon =
        dungeonAccess && dungeonAccess.filter(item => item._id === dungeon._id);

      return (
        dungeon.recommendedLevel > this.level ||
        (matchedDungeon && matchedDungeon.length === 0)
      );
    },
    goToGameScreen() {
      this.$router.push({
        name: 'dungeon',
        params: { id: this.selectedDungeon._id }
      });
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
  min-height: 75%;
  margin: auto;
  color: white;
  background-color: rgb(3 0 0 / 85%);
  border: 20px solid rgb(3 2 2 / 50%);
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

.bottom {
  position: relative;
  bottom: -100px;
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
