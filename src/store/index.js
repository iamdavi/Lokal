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
    getProfitCompra(compra) {
      const profit = parseInt(compra.obtenido) - parseInt(compra.gastado)
      let signo = 0 < profit ? '+ ' : '- '
      if (profit === 0) { signo = '' }
      compra.profit = String(parseInt(compra.obtenido) - parseInt(compra.gastado))
      compra.profitString = String(signo + Math.abs(profit))
      return compra
    }
  },
  modules: {
  }
})
