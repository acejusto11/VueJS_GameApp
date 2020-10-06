<template>
  <div class="menu">
    <div class="text-left">
      <button @click="$router.push('/character')">Go to Character</button>
    </div>
    <div class="text-left">
      <button @click="$router.push('/')">Logout</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Menu'
};
</script>
<style >
.menu {
  position: absolute;
  margin: 1rem;
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
  padding: 9px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #5b8a3c;
  width: 180px;
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