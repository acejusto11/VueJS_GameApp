<template>
  <div class="main flex">
    <game-menu />
    <div class="container">
      <div class="row title flex-center">Inventory</div>
      <div class="row nowrap inventory-section">
        <div class="col-md-7 pad-1 border-1">
          <div class="row">
            <div
              class="col-sm-6 inventory-tile no-margin text-center"
              v-for="inventory in inventoryItems"
              :key="inventory._id"
              @click="getItem(inventory._id)"
            >{{ inventory.item.name }}</div>
          </div>
        </div>
        <div class="col-md-5 pad-1">
          <div class="row details-tile">
            <div class="col-sm-12">
              <div class="row title no-margin">Details</div>
              <div class="text-center" v-if="selectedInventory">
                <div class="row">
                  <div class="col-sm-12 uppercase bold">{{ selectedInventory.item.name }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-8 uppercase">Health</div>
                  <div class="col-sm-4 left-text">{{ selectedInventory.item.bonus.health }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-8 uppercase">Mana</div>
                  <div class="col-sm-4 left-text">{{ selectedInventory.item.bonus.mana }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-8 uppercase">Off</div>
                  <div class="col-sm-4 left-text">{{ selectedInventory.item.bonus.off }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-8 uppercase">Def</div>
                  <div class="col-sm-4 left-text">{{ selectedInventory.item.bonus.def }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-8 uppercase">Agi</div>
                  <div class="col-sm-4 left-text">{{ selectedInventory.item.bonus.agi }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-8 uppercase">Int</div>
                  <div class="col-sm-4 left-text">{{ selectedInventory.item.bonus.int }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-8 uppercase">Luk</div>
                  <div class="col-sm-4 left-text">{{ selectedInventory.item.bonus.luk }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row current-item-tile">
            <div class="col-sm-12">
              <div class="row title no-margin">Current Equipment</div>
              <div v-if="characterItems">
                <div class="row">
                  <div class="col-sm-6 uppercase text-center">Weapon</div>
                  <div class="col-sm-6 left-text">{{ characterItems.weapon.name }}</div>
                </div>
                <div class="row">
                  <div class="col-sm-6 uppercase text-center">Armor</div>
                  <div class="col-sm-6 left-text">{{ characterItems.armor.name }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row action-tile">
            <div class="col-sm-6 pad-1">
              <button :disabled="isItemNotAllowed || isItemAlreadyEquipped" @click="equipItem">Equip</button>
            </div>
            <div class="col-sm-6 pad-1">
              <button :disabled="isSaveDisabled" @click="save">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GET_INVENTORY,
  GET_CHARACTER,
  SAVE_EQUIPMENT
} from '../store/actions.type';
import Menu from '../components/Menu';
export default {
  name: 'Inventory',
  components: {
    'game-menu': Menu
  },
  data() {
    return {
      selectedInventory: undefined,
      characterItems: undefined,
      isSaveDisabled: true,
      currentEquipment: {}
    };
  },
  created() {
    //TODO: move to mixin
    const accountId = this.$session.get('accountId');
    if (!accountId) this.$router.push('/');
    const characterId = this.$session.get('characterId');
     let loader = this.$loading.show({ loader: 'bars', width: 800, height: 200});
    this.characterItems = this.$store.state.character.details.equipment;
    if (characterId) {
      this.$store.dispatch(GET_INVENTORY, characterId).then(() => {
        this.$store
          .dispatch(GET_CHARACTER, accountId)
          .then(() =>  {
            this.currentEquipment = this.$store.state.character.details.equipment;
            setTimeout(() => {
                loader.hide()
             },3000)   
            }
          ).catch(
            loader.hide()
          );  
      });
    }
  },
  computed: {
    inventoryItems() {
      return this.$store.state.character.inventory;
    },
    isItemNotAllowed() {
      return (
        !this.selectedInventory ||
        this.$store.state.character.details.classType !=
          this.selectedInventory.item.classId
      );
    },
    isItemAlreadyEquipped() {
      return (
        this.selectedInventory &&
        (this.selectedInventory.item._id === this.characterItems.weapon._id ||
          this.selectedInventory.item._id === this.characterItems.armor._id)
      );
    }
  },
  methods: {
    getItem(id) {
      this.selectedInventory =
        this.inventoryItems &&
        this.inventoryItems.find(function(item) {
          return item._id === id;
        });
    },
    equipItem() {
      if (this.selectedInventory.item.type === 'WPN') {
        this.characterItems.weapon = this.selectedInventory.item;
        this.isSaveDisabled = false;
      }
      if (this.selectedInventory.item.type === 'AMR') {
        this.characterItems.armor = this.selectedInventory.item;
        this.isSaveDisabled = false;
      }
    },
    save() {
      const characterId = this.$store.state.character.details._id;
      const equipment = {
        weaponId: this.characterItems.weapon._id,
        armorId: this.characterItems.armor._id
      };

      this.$store
        .dispatch(SAVE_EQUIPMENT, { characterId, equipment })
        .then((this.isSaveDisabled = true));
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
