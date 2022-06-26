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
    path: '/pagos',
    name: 'Pagos',
    component: () => import(/* webpackChunkName: "about" */ '../views/pagos/index.vue')
  },
  {
    path: '/listas-compra',
    name: 'ListasCompra',
    component: () => import(/* webpackChunkName: "about" */ '../views/listaCompra/index.vue')
  },
  {
    path: '/listas-compra/new',
    name: 'ListasCompraNew',
    component: () => import(/* webpackChunkName: "about" */ '../views/listaCompra/new.vue')
  },
  {
    path: '/listas-compra/edit/:id',
    name: 'ListasCompraEdit',
    component: () => import(/* webpackChunkName: "about" */ '../views/listaCompra/edit.vue')
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
    path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue')
  },
  {
    path: '/agregar',
    name: 'Agragar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Agregar.vue')
  },
  {
    path: '/grupos-limpieza',
    name: 'GruposLimpieza',
    component: () => import(/* webpackChunkName: "about" */ '../views/grupoLimpieza/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
