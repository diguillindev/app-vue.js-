import { createRouter, createWebHistory } from 'vue-router'
import CalculoCalificaciones from '../views/CalculoCalificaciones.vue'
import FormularioRegistro from'../views/FormularioRegistro.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/CalculoCalificaciones',
      name: 'CalculoCalificaciones',
      component: CalculoCalificaciones,
    },
    {
      path: '/FormularioRegistro',
      name: 'FormularioRegistro',
      component: FormularioRegistro,
    },
  ],
})

export default router
