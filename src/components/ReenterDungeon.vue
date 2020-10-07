<template>
  <div class="modal-overlay">
    <div class="result-modal">
      <div class="row">
        <div class="col-sm-12">Re-enter Dungeon?</div>
      </div>

      <div class="row pad-1">
        <div class="col-sm-6">
          <button @click="yes">Yes</button>
        </div>
        <div class="col-sm-6">
          <button @click="no">No</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReenterDungeon',
  props: {
    yesCallback: Function,
    noCallback: Function
  },
  methods: {
    yes() {
      this.yesCallback && this.yesCallback();
    },
    no() {
      this.noCallback && this.noCallback();
    }
  }
};
</script>

<style scoped>
.result-modal {
  padding: 15px;
  width: 500px;
  z-index: 10;
  margin: auto;
  text-align: center;
  margin-top: 150px;
  background-color: rgb(3 0 0 / 70%);
  color: #fff;
  border: 10px solid rgb(3 2 2 / 50%);
}
</style>

