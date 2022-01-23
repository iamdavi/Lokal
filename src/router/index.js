import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue')
  },
  {
    path: '/productos',
    name: 'Productos',
    component: () => import(/* webpackChunkName: "about" */ '../views/producto/index.vue')
  },
  {
    path: '/personas',
    name: 'Personas',
    component: () => import(/* webpackChunkName: "about" */ '../views/persona/index.vue')
  },
  {
    path: '/compras',
    name: 'Comrpas',
    component: () => import(/* webpackChunkName: "about" */ '../views/compra/index.vue')
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue')
  },
  {
    path: '/agregar',
    name: 'Agragar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Agregar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
