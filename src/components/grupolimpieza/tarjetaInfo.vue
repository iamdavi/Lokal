<template>
	<div>
    <v-col class="pa-0" cols="auto">
			<v-card>
				<v-toolbar
					color="primary"
					dark
				>{{ titulo }}</v-toolbar>
				<!-- CARD TEXT -->
				<v-card-text class="pt-3">
					<v-text-field
						label="Nombre de grupo"
						v-model="nombreGrupo"
						placeholder="p.e.: Grupo de 'Nombre persona'"
					></v-text-field>
					<v-text-field
						label="Número del grupo"
						type="number"
						v-model="ordenGrupo"
						placeholder="p.e.: 1"
						hint="Los grupos se ordenarán a la hora de asignarlos según este valor."
						persistent-hint
					></v-text-field>
					<span class="text-h6">Personas</span>
					<v-list dense max-height="300px" class="overflow-y-auto">
						<v-list-item-group
							color="primary"
						>
							<v-list-item
								v-for="(persona, i) in listaPersonas"
								:key="i"
							>
								<v-list-item-content>{{ persona.nombre }}</v-list-item-content>
								<v-list-item-action>
									<v-checkbox v-model="persona.seleccionada"></v-checkbox>
								</v-list-item-action>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card-text>
				<!-- ACRTIONS -->
				<v-card-actions class="justify-end">
					<v-btn
						@click="guardar()"
						color="primary"
      			:loading="cargando"
					>Guardar</v-btn>
				</v-card-actions>
			</v-card>
    </v-col>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'tarjetaInfo',
	data() {
		return {
			listaPersonas: [],
			nombreGrupo: '',
			ordenGrupo: 0,
			cargando: false
		}
	},
	props: {
		titulo: {
			type: String,
			required: true
		},
		personas: {
			type: Array,
			required: true
		},
		grupos: {
			type: Array,
			required: true
		},
		idGrupo: {
			type: String,
			required: false,
			default: ''
		}
	},
	created() {
		if (this.idGrupo) {
			this.setDataToUpdate(this.idGrupo);
		} else { 
			this.listaPersonas = this.personas.map(persona => {
				const personaLista = {
					id: persona.id,
					nombre: persona.nombre,
					seleccionada: false
				}
				return personaLista
			})
		}
	},
	watch: {
		idGrupo(nv, ov) {
			setDataToUpdate(nv);
		}
	},
	methods: {
		...mapActions(['createGrupoLimpieza', 'actualizarGrupoLimpieza']),
		setDataToUpdate(idGrupo) {
			const { nombre, orden, personas } = this.grupos.find(grupo => grupo.id == idGrupo)
			this.nombreGrupo = nombre
			this.ordenGrupo = orden
			const idsPersonasSeleccionadas = personas.map(persona => persona.id)
			this.listaPersonas = this.personas.map(per => {
				if (idsPersonasSeleccionadas.includes(per.id)) {
					per.seleccionada = true
				}
				return per
			})
		},
		getPersonasSeleccionadas() {
			return this.listaPersonas.filter(persona => persona.seleccionada);
		},
		desmarcarPersonasSeleccionadas() {
			this.listaPersonas = this.listaPersonas.map(persona => persona.seleccionada = false)
		},
		async guardar() {
			this.cargando = true
			const personasSeleccionadas = this.getPersonasSeleccionadas()
			if (this.idGrupo) { // EDITAR
				const grupo = {
					personas: personasSeleccionadas,
					orden: this.ordenGrupo,
					nombre: this.nombreGrupo,
					id: this.idGrupo
				}
				const res = await this.actualizarGrupoLimpieza(grupo)
				this.$emit('grupo-actualizado', grupo)
			} else { // CREAR
				const grupo = {
					personas: personasSeleccionadas,
					orden: this.ordenGrupo,
					nombre: this.nombreGrupo
				}
				const res = await this.createGrupoLimpieza(grupo)
				this.$emit('grupo-creado', grupo)
			}
			// this.desmarcarPersonasSeleccionadas()
			this.$emit('close-dialog')
			this.cargando = false

		}
	},
}
</script>