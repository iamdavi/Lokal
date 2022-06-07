import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase'
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    compras: [],
    compra: {
      gastado: 0,
      obtenido: 0
    },
    personas: [],
    persona: {
      id: '',
      nombre: ''
    },
    productos: [],
    // Producto usado para crearlo y añadirlo a la lista de la compra.
    //// ¡Este producto no se crea en la colección de productos! ////
    productoCreateAdd: {}, 
    producto: {
      nombre: '',
      precio: 0
    },
    listasCompras: [],
    listaCompra: {
      nombre: '',
      productos: []
    },
    pagos: [],
    pago: {
      precioPorPersona: 0,
      mesPago: '',
      personas: []
    },
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
    setProductoCreateAdd(state, payload) {
      state.productoCreateAdd = payload
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
    },
    addPago(state, payload) {
      state.pagos.push(payload)
    },
    setPago(state, payload) {
      state.pago = payload
    },
    setPagos(state, payload) {
      state.pagos = payload
    },
  },
  actions: {
    // PERSONAS
    async getPersonas({ commit }, limit=-1) {
      const qry = db.collection('personas')
      if (limit > -1) {
        qry.limit(limit)
      }
      const res = await qry.orderBy('nombre').get();
      const personas = res.docs.map(doc => {
        let persona = doc.data()
        persona.id = doc.id;
        return persona;
      });
      commit('setPersonas', personas)
      return personas
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
      persona.fechaCreacion = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
        .toISOString()
        .substr(0, 10);
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
      compra.fechaCreacion = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
        .toISOString()
        .substr(0, 10);
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
    clearProductoCreateAdd({ commit }) {
      commit('setProductoCreateAdd', {})
    },
    addProducto({ commit }, productoData) {
      let producto = {}
      Object.assign(producto, productoData)
      producto.fechaCreacion = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
        .toISOString()
        .substr(0, 10);
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
      lista.fechaCreacion = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
        .toISOString()
        .substr(0, 10);
      db.collection('listas-compras').add(lista)
        .then(doc => {
          listaCompra.id = doc.id
          commit('addListaCompra', listaCompra)
          router.push('/listas-compra')
        })
    },
    eliminarListaCompra({ commit }, id) {
      db.collection('listas-compras').doc(id).delete()
        .then(() => {
          commit('setEliminarListaCompra', id)
        })
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
    },
    updateListaCompra({ commit }, listaCompra) {
      db.collection('listas-compras').doc(listaCompra.id).update(listaCompra)
        .then(res => {
          router.push('/listas-compra')
        })
    },
    // PAGO 
    async createPago({ commit, dispatch }, pagoCreate) {
      let pago = {}
      Object.assign(pago, pagoCreate)
      pago.fechaCreacion = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
        .toISOString()
        .substr(0, 10);

      const personas = await dispatch('getPersonas');
      personas.map(persona => persona.pagado = false);
      pago.personas = personas;

      const res = await db.collection('pagos').add(pago);
      pago.id = res.id
      commit('addPago', pago)
      return pago;
    },
    async getPagos({ commit }) {
      const res = await db.collection('pagos').get();
      const pagos = res.docs.map(doc => {
        let pago = doc.data()
        pago.id = doc.id;
        return pago;
      });
      commit('setPagos', pagos)
      return pagos
    },
    async updatePago({ commit }, pago) {
      const res = await db.collection('pagos').doc(pago.id).update(pago)
    },
  },
  modules: {
  }
})
