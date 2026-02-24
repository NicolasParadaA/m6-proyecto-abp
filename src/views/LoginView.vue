<template>

    <header class="py-3">
        <h1 class="text-center">Página login</h1>
    </header>

    <main class="container">
        <div class="alert alert-info alert-dismissible fade show" role="alert" v-if="message"
            :class="[color ? `alert-${color}` : '']">
            <strong>{{ message }}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>


        <form @submit.prevent="login">
            <div class="mb-3">
                <label class="form-label">Email:</label>
                <input type="text" class="form-control" name="email" required v-model="usuario.email">
            </div>
            <div class="mb-3">
                <label class="form-label">Password:</label>
                <input type="password" class="form-control" name="password" required v-model="usuario.password">
            </div>
            <div class="py-3">
                <button class="btn btn-primary">Login</button>
            </div>

            <!-- <div class="text-center" v-show="spinner">
                <div class="spinner-border" role="status">
                </div>
                <p>Redireccionando a home...</p>
            </div> -->
        </form>

    </main>
</template>


<script setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/login.store.js';

defineProps(["message", "color"]);

const loginStore = useLoginStore();



const router = useRouter();

const usuario = ref({
    email: "pedro@gmail.com",
    password: "123456"
});

// const spinner = ref(false);



const login = () => {

    let respuesta = loginStore.login(usuario.value.email, usuario.value.password);

    if (respuesta.success) {
        router.push({
            name: "home", params: {
                message: respuesta.success,
                color: 'success',
            },
        });

    } else {
        alert(respuesta.error);
    }

}

</script>

<style scoped lang="css"></style>