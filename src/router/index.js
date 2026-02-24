import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useLoginStore } from '@/stores/login.store.js'
// import { createPinia, setActivePinia } from 'pinia'

// Inicializa Pinia para usar stores fuera de componentes
// const pinia = createPinia()
// setActivePinia(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:message?/:color?',
      name: 'home',
      component: HomeView,
      alias: ['/home/:message?/:color?', '/inicio/:message?/:color?'],
      meta: { requiresAuth: false },
      props: true,
    },
    {
      path: '/login/:message?/:color?',
      name: 'login',
      props: true,
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/books',
      alias: ['/libros'],
      name: 'books',
      component: () => import('../views/BooksView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/book/:id/:titulo/:autor/:categoria',
      alias: ['/libro/:id/:titulo/:autor/:categoria'],
      name: 'book-detail',
      component: () => import('../views/BookDetailView.vue'),
      props: true,
      meta: { requiresAuth: false },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

//GUARD NAVIGATION
// https://router.vuejs.org/guide/advanced/navigation-guards.html

router.beforeEach((to, from) => {
  const loginStore = useLoginStore();
  const sesion = loginStore.sesion
  const user = loginStore.currentUser

  console.log(to.name, sesion)
  // Protege rutas que requieren auth
  if (to.meta.requiresAuth && !sesion) {
    return {
      name: 'login',
      params: { message: 'Debe autenticarse primero.', color: 'danger' },
    }
  }

  // Redirige login → home CON mensaje de éxito si autenticado
  if (to.name === 'login' && sesion) {
    return {
      name: 'home',
      params: {
        message: `${user.nombre}, ¡Ya tienes una sesión iniciada!`,
        color: 'info',
      },
    }
  }


  // Navegación normal permitida

})

export default router
