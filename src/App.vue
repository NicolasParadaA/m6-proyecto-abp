<template>

  <nav class="d-flex justify-content-center align-items-center py-3">
    <RouterLink to="/" class="mx-2">Home</RouterLink>
    <RouterLink to="/books" class="mx-2">Libros</RouterLink>

    <RouterLink to="/profile" class="mx-2" v-if="loginStore.sesion">Mi perfil</RouterLink>

    <RouterLink to="/login" class="mx-2" v-if="!loginStore.sesion">Login</RouterLink>

    <a href="" @click.prevent="logout" v-if="loginStore.sesion">Logout</a>
  </nav>


  <RouterView />


</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useLoginStore } from '@/stores/login.store.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginStore = useLoginStore();


const logout = () => {
  loginStore.$reset();
  router.push({ name: 'home', params: { message: 'Sesión cerrada correctamente', color: 'success' } });
}


</script>


<style scoped></style>
