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
body {
  background-color: var(--bs-dark);
  color: var(--bs-light);
}
</style>
