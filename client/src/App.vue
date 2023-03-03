<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<style>
html,
body,
#app {
  background-color: var(--bs-dark);
}
</style>
