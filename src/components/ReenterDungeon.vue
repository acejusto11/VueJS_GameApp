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

