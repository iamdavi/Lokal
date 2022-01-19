<template>
    <div>
        <h1>Inicio</h1>
        <router-link to="/agregar">
            <button>Agregar</button>
        </router-link>
        <ul>
            <li 
                v-for="(persona, index) in personas" :key="index"
            >
                {{ persona.nombre }} - {{ persona.id }}
                <router-link 
                    :to="{name: 'Editar', params: {id: persona.id}}"
                >
                    <button>Editar</button>
                </router-link>
                <button @click="eliminarPersona(tarea.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: 'Inicio',
    created() {
        this.getPersonas()
    },
    methods: {
        ...mapActions(['getPersonas', 'eliminarPersona'])
    },
    computed: {
        ...mapState(['personas'])
    }
}
</script>

<style>

</style>