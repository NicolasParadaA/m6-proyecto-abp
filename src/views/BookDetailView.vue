<template>

    <header class="py-3">
        <h1 class="text-center">Detalle libro: {{ titulo }}</h1>
    </header>

    <main class="container">
        <section>
            <h2>Autor: {{ autor }}</h2>
            <p>Categoría: {{ categoria }}</p>
            <p>ID Libro: {{ id }}</p>

            <div class="py-3">
                <button class="btn btn-primary" @click="volver">Volver</button>
            </div>
        </section>

    </main>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { ref, defineProps } from 'vue';

const router = useRouter()

defineProps({
    id: String,
    titulo: String,
    autor: String,
    categoria: String
});

const volver = () => {
    router.go(-1);
}

</script>

<style scoped lang="css"></style>