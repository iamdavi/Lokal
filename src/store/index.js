import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase'
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    compras: [],
    compra: {
      fecha: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      gastado: 0,
      obtenido: 0
    },
    personas: [],
    persona: {
      id: '',
      nombre: ''
    },
    productos: [],
    producto: {
      nombre: '',
      precio: 0
    },
    listasCompras: [],
    listaCompra: {
      nombre: '',
      productos: []
    }
  },
  mutations: {
    setPersonas(state, payload) {
      state.personas = payload
    },
    setPersona(state, payload) {
      state.persona =  payload
    },
    addPersona(state, payload) {
      state.personas.push(payload)
    },
    setEliminarPersona(state, payload) {
      state.personas = state.personas.filter(item => item.id !== payload)
    },
    addCompra(state, payload) {
      state.compras.unshift(payload)
    },
    setCompras(state, payload) {
      state.compras = payload
    },
    setProductos(state, payload) {
      state.productos = payload
    },
    addProducto(state, payload) {
      state.productos.unshift(payload)
    },
    setEliminarProducto(state, payload) {
      state.productos = state.productos.filter(item => item.id !== payload)
    },
    addListaCompra(state, payload) {
      state.listasCompras.unshift(payload)
    },
    setListasCompras(state, payload) {
      state.listasCompras = payload
    },
    setListaCompra(state, payload) {
      state.listaCompra = payload
    },
    setEliminarListaCompra(state, payload) {
      state.listasCompras = state.listasCompras.filter(item => item.id !== payload)
    }
  },
  actions: {
    // PERSONAS
    getPersonas({ commit }, limit=-1) {
      const personas = []
      const qry = db.collection('personas')
      if (limit > -1) {
        qry.limit(limit)
      }
      qry.orderBy('nombre').get()
        .then(res => {
          res.forEach(doc => {
            let persona = doc.data()
            persona.id = doc.id
            personas.push(persona)
          });
          commit('setPersonas', personas)
        })
    },
    getPersona({ commit }, id) {
      db.collection('personas').doc(id).get()
        .then(doc => {  
          let persona = doc.data()
          persona.id = doc.id
          commit('setPersona', persona)
        })
    },
    editarPersona({ commit }, persona) {
      db.collection('personas').doc(persona.id).update({
        nombre: persona.nombre
      })
    },
    agregarPersona({ commit }, nombrePersona) {
      let persona = {
        nombre: nombrePersona
      }
      db.collection('personas').add(persona)
        .then(doc => {
          persona.id = doc.id
          commit('addPersona', persona)
        })
    },
    eliminarPersona({ commit }, idPersona) {
      db.collection('personas').doc(idPersona).delete()
        .then(() => {
          commit('setEliminarPersona', idPersona)
        })
    },
    // FIN -> PERSONA
    // COMPRA
    createCompra({ commit }, compraData) {
      let compra = {
        fecha: compraData.fecha,
        obtenido: parseInt(compraData.obtenido),
        gastado: parseInt(compraData.gastado)
      }
      db.collection('compras').add(compra)
        .then(doc => {
          compra.id = doc.id
          compra = Vue.getCompraProfits(compra)
          commit('addCompra', compra)
        })
    },
    /** 
     * Método que obtiene las compras 
     * @param   {string}  limit - El número de registros a devolver, en caso de
     *                            que no se pase ningún valor, devuelve los 1000
     *                            primeros registros (= todos)
     */
    getCompras({ commit }, limit=1000) {
      const compras = []
      db.collection('compras').limit(limit).orderBy('fecha').get()
        .then(res => {
          res.forEach(doc => {
            let compra = doc.data()
            compra.id = doc.id
            compra = Vue.getCompraProfits(compra)
            compras.unshift(compra)
          });
          commit('setCompras', compras)
        })
    },
    // FIN -> COMPRA
    // PRODUCTO
    getProductos({ commit }) {
      const productos = []
      db.collection('productos').get()
        .then(res => {
          res.forEach(doc => {
            let producto = doc.data()
            producto.id = doc.id
            productos.push(producto)
          });
          productos.sort((a, b) => a.nombre.localeCompare(b.nombre))
          commit('setProductos', productos)
        })
    },
    addProducto({ commit }, productoData) {
      let producto = {}
      Object.assign(producto, productoData)
      db.collection('productos').add(producto)
        .then(doc => {
          producto.id = doc.id
          commit('addProducto', producto)
        })
    },
    editProducto({ commit }, producto) {
      db.collection('productos').doc(producto.id).update({
        nombre: producto.nombre,
        precio: producto.precio
      })
    },
    eliminarProducto({ commit }, id) {
      db.collection('productos').doc(id).delete()
        .then(() => {
          commit('setEliminarProducto', id)
        })
    },
    // FIN -> PRODUCTO
    // LISTA-COMPRA
    addListaCompra({ commit }, listaCompra) {
      let lista = {}
      Object.assign(lista, listaCompra)
      db.collection('listas-compras').add(lista)
        .then(doc => {
          listaCompra.id = doc.id
          commit('addListaCompra', listaCompra)
        })
    },
    eliminarListaCompra({ commit }, id) {
      console.log(id);
      // db.collection('listas-compras').doc(id).delete()
      //   .then(() => {
      //     commit('setEliminarListaCompra', id)
      //   })
    },
    getListaCompra({ commit }, id) {
      db.collection('listas-compras').doc(id).get()
        .then(doc => {  
          let listaCompra = doc.data()
          listaCompra.id = doc.id
          commit('setListaCompra', listaCompra)
          return listaCompra
        })
    },
    getListasCompras({ commit }) {
      let listasCompras = []
      db.collection('listas-compras').get()
        .then(res => {
          res.forEach(doc => {
            let lista = doc.data()
            lista.id = doc.id
            listasCompras.unshift(lista)
          });
          commit('setListasCompras', listasCompras)
        })
    }
    // FIN -> LISTA-COMPRA
  },
  modules: {
  }
})
