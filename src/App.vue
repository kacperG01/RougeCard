<script setup>

</script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/tarot">Play</router-link> |
    <router-link to="/about">About</router-link>|
  </nav>
  <router-view />
</template>

<style scoped>
nav {
  border: 1px solid lime;
  width: 100%;
  text-align: center;
  margin-bottom: 25px;
}
</style>
