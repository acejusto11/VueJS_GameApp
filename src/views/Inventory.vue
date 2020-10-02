<template>
  <div class="main">
    <div class="container">
      <div class="row title flex-center">Inventory</div>
      <div class="row nowrap inventory-section">
        <div class="col-md-7 pad-1 border-1">
          <div class="row">
            <div
              class="col-sm-6 inventory-tile no-margin"
              v-for="inventory in inventoryItems"
              :key="inventory._id"
            >{{inventory.item.name}}</div>
          </div>
        </div>
        <div class="col-md-5 pad-1">
          <div class="row details-tile">
            <div class="col-sm-12">
              <div class="row title no-margin">Details</div>
              <div>
                <div class="row">
                  <div class="col-sm-12"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row current-item-tile">
            <div class="col-sm-12">
              <div class="row title no-margin">Current Equipment</div>
            </div>
          </div>
          <div class="row action-tile">
            <div class="col-sm-6 pad-1">
              <button>Equip</button>
            </div>
            <div class="col-sm-6 pad-1">
              <button>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_INVENTORY } from '../store/actions.type';
export default {
  name: 'Inventory',
  data() {
    return {};
  },
  created() {
    const characterId = this.$store.state.character.details._id;
    if (characterId) {
      this.$store.dispatch(GET_INVENTORY, characterId);
    }
  },
  computed: {
    inventoryItems() {
      return this.$store.state.character.inventory;
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

.inventory-section {
  display: flex;
  border: 5px solid #d39e0033;
  min-height: 600px;
}
.inventory-tile {
  font-size: 1.5rem;
  margin: 0.5rem;
}

.inventory-tile:hover,
.inventory-tile:active {
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid gray;
}

.details-tile {
  height: 250px;
  border-bottom: 5px solid #d39e0033;
}
.current-item-tile {
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