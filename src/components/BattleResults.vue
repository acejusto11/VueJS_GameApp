<template>
  <div class="modal-overlay">
    <div class="result-modal">
      <div class="row">
        <div class="col-sm-12">Battle Results</div>
      </div>
      <div class="row" v-if="battleResults.lvlUp">
        <div class="col-sm-12">Level up!!!</div>
      </div>
      <div class="row">
        <div class="col-sm-6">Exp. Gained</div>
        <div class="col-sm-6">{{battleResults.exp}}</div>
      </div>

      <div class="row" v-if="battleResults.drop">
        <div class="col-sm-6">Item Drop</div>
        <div class="col-sm-6">{{battleResults.drop}}</div>
      </div>
      <div class="row" v-if="battleResults && battleResults.newSkills.length">
        <div class="col-sm-6">New Skills</div>
        <div class="col-sm-6">
          <span v-for="skill in newSkills" :key="skill">{{skill}}</span>
        </div>
      </div>
      <div class="row" v-if="battleResults && battleResults.unlockedDungeons.length">
        <div class="col-sm-6">Unlocked Dungeons</div>
        <div class="col-sm-6">
          <span v-for="dungeon in unlockedDungeons" :key="dungeon">{{dungeon}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 pad-1">
          <button @click="close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BattleResults',
  props: {
    battleResults: Object,
    closeCallback: Function
  },
  methods: {
    close() {
      this.closeCallback && this.closeCallback();
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  overflow: auto;
}
.result-modal {
  padding: 15px;
  width: 400px;
  z-index: 10;
  margin: auto;
  text-align: center;
  margin-top: 150px;
  background-color: rgb(3 0 0 / 70%);
  color: #fff;
  border: 10px solid rgb(3 2 2 / 50%);
}
</style>

