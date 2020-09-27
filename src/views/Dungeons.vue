<template>
  <div class="main">
    <div class="container">
      <div class="row nowrap dungeons-section">
        <div class="col-sm-6 dungeon-list">
          <div v-for="dungeon in dungeons" :key="dungeon._id">{{dungeon.name}}</div>
        </div>
        <div class="col-sm-6">test</div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_DUNGEONS } from '../store/actions.type';
export default {
  name: 'Dungeons',
  created() {
    this.$store
      .dispatch(GET_DUNGEONS, this.$store.state.character.details._id)
      .then(response => console.log(response, 'dungeons'));
  },
  computed: {
    characterId() {
      return this.$store.state.character.details._id;
    },
    dungeons() {
      return this.$store.state.character.dungeons;
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