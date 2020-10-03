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
</style>