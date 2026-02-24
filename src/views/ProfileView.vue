<template>

    <header class="py-3">
        <h1 class="text-center">Perfil de usuario: {{ storeLogin.currentUser.nombre }}</h1>
    </header>

    <main class="container">

        <h2>Detalles del usuario:</h2>
        <p>Email: {{ storeLogin.currentUser.email }}</p>
        <p>Es admin: {{ storeLogin.currentUser.admin ? 'Es administrador' : "No es adminstrador." }}</p>

    </main>
</template>


<script setup>
import { useLoginStore } from '@/stores/login.store.js';

const storeLogin = useLoginStore();


</script>

<style scoped lang="css"></style>