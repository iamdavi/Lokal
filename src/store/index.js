import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase'
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
      console.log(state.personas);
    },
    setEliminarPersona(state, payload) {
      state.personas = state.personas.filter(item => item.id !== payload)
    }
  },
  actions: {
    getPersonas({ commit }) {
      const personas = []
      db.collection('personas').get()
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
        .then(() => {
          router.push('/')
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
          console.log(idPersona);
          commit('setEliminarPersona', idPersona)
        })
    }
  },
  modules: {
  }
})
