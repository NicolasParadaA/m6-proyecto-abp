import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import { useLoginStore } from '@/stores/login.store.js'

const loginStore = useLoginStore()

export const useBooksStore = defineStore('books', () => {
  //ESTADOS
  const categorias = ref([
    'Realismo mágico',
    'Distopía',
    'Novela clásica',
    'Romance',
    'Novela experimental',
    'Ciencia ficción',
    'Fantasía',
    'Misterio',
    'Histórica',
    'Aventura',
  ])

  const libros = ref([
    {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      categoria: 'Realismo mágico',
    },
    {
      id: 2,
      titulo: '1984',
      autor: 'George Orwell',
      categoria: 'Distopía',
    },
    {
      id: 3,
      titulo: 'Don Quijote de la Mancha',
      autor: 'Miguel de Cervantes',
      categoria: 'Novela clásica',
    },
    {
      id: 4,
      titulo: 'El amor en los tiempos del cólera',
      autor: 'Gabriel García Márquez',
      categoria: 'Romance',
    },
    {
      id: 5,
      titulo: 'Rayuela',
      autor: 'Julio Cortázar',
      categoria: 'Novela experimental',
    },
  ])

  //GETTERS

  const cantidadLibros = computed(() => libros.value.length)

  //ACTIONS

  const crearLibro = (titulo, autor, categoria) => {
    if (loginStore.currentUser.admin) {
      const nuevoLibro = { id: uuidv4(), titulo, autor, categoria }

      libros.value.push(nuevoLibro)

      return { success: 'Libro creado correctamente.' }
    } else {
      return { error: 'Usuario sin permisos para crear libros' }
    }
  }

  const eliminarLibro = (id) => {
    let indice = libros.value.findIndex((libro) => libro.id == id)

    if (indice > -1) {
      libros.value.splice(indice, 1)
      return { success: 'Libro eliminado correctamente.' }
    } else {
      return { error: 'Libro no encontrado.' }
    }
  }

  //RETORNAMOS LOS ESTADOS Y FUNCIONES QUE PERMITIRÁN MANIPULAR EL STORE
  return { categorias, libros, cantidadLibros, crearLibro, eliminarLibro }
})
