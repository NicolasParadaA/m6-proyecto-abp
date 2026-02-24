<template>

  <header class="py-3">
    <h1 class="text-center">Página Inicio</h1>
  </header>

  <main class="container">
    <div class="alert alert-dismissible fade show" role="alert" v-if="message" :class="[color ? `alert-${color}` : '']">
      <strong>{{ message }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

  </main>
</template>


<script setup>

import { defineProps } from 'vue';
defineProps(["message", "color"]);
</script>

<style scoped lang="css"></style>