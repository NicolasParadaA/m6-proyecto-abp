import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore(
  'login',
  () => {
    //ESTADOS
    const sesion = ref(false)

    const currentUser = ref({
      id: '',
      nombre: '',
      email: '',
      admin: false,
    })

    //GETTERS

    //   const doubleCount = computed(() => count.value * 2)
    //   function increment() {
    //     count.value++
    //   }

    //ACTIONS

    const $reset = () => {
      sesion.value = false

      currentUser.value.id = ''
      currentUser.value.nombre = ''
      currentUser.value.email = ''
      currentUser.value.admin = false

      return true
    }

    const usuarios = [
      { id: 1, nombre: 'Pedro', email: 'pedro@gmail.com', password: '123456', admin: false },
      { id: 2, nombre: 'Marta', email: 'marta@gmail.com', password: '123456', admin: false },
      { id: 3, nombre: 'Admin', email: 'admin@admin.com', password: 'admin', admin: true },
    ]

    const login = (email, password) => {
      let usuario = usuarios.find((u) => u.email == email && u.password == password)

      if (usuario) {
        sesion.value = true

        currentUser.value.id = usuario.id
        currentUser.value.nombre = usuario.nombre
        currentUser.value.email = usuario.email
        currentUser.value.admin = usuario.admin

        return { success: 'Login correcto.' }
      } else {
        return { error: 'Email o password incorrectos' }
      }
    }

    //RETORNAMOS LOS ESTADOS Y FUNCIONES QUE PERMITIRÁN MANIPULAR EL STORE
    return { sesion, currentUser, login, $reset }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['sesion', 'currentUser'],
    },
  },
)
