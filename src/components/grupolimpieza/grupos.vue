<template>
	<div>
		<v-row>
			<v-col 
				cols="12"
				sm="12"
				md="4"
				lg="3"
			>
				<asignacion :grupos="grupos" />
			</v-col>
			<v-col 
				cols="12"
				sm="12"
				md="8"
				lg="9"
			>
				<v-row>
					<v-col cols="10">
						<h2>
							Grupos
						</h2>
					</v-col>
					<v-col cols="2" class="text-right">
						<v-dialog
							transition="dialog-bottom-transition"
							v-model="dialogCrear"
							max-width="600"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									color="primary"
									v-bind="attrs"
									v-on="on"
								>Crear</v-btn>
							</template>
							<tarjeta-info 
								titulo="Crear grupo"
								:grupos="grupos"
								:personas="personas"
								@close-dialog="cerrarVentana"
								@grupo-creado="anadirGrupoLista"
							/>
						</v-dialog>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<v-expansion-panels
							v-model="selectorGrupos"
							multiple
						>
							<v-expansion-panel
								v-for="(grupo,i) in grupos"
								:key="i"
							>
								<v-expansion-panel-header>
									<template v-slot:default="{ open }">
										<v-row no-gutters>
											<v-col cols="12">
												Grupo {{ grupo.orden }}
												<v-fade-transition leave-absolute>
													<span
														v-if="open"
														key="0"
														class="grey--text"
													>
														- {{ grupo.nombre }}
													</span>
												</v-fade-transition>
											</v-col>
										</v-row>
									</template>
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									<v-list-item dense v-for="(persona, index) in grupo.personas" :key="index">
										<v-list-item-content>
											<v-list-item-subtitle>{{ persona.nombre }}</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
									<v-btn 
										text 
										@click="eliminarGrupo(grupo.id)"
										color="error" 
										class="float-left"
									>Eliminar</v-btn>
									<v-dialog
										transition="dialog-bottom-transition"
										v-model="dialog"
										max-width="600"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-btn
												color="primary"
												class="float-right"
												v-bind="attrs"
												v-on="on"
											>Editar</v-btn>
										</template>
										<tarjeta-info 
											titulo="Editar grupo"
											:grupos="grupos"
											:personas="personas"
											:idGrupo="grupo.id"
											@close-dialog="cerrarVentana"
											@grupo-actualizado="actualizarGrupoLista"
										/>
									</v-dialog>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import asignacion from '@/components/grupolimpieza/asignacion'
import tarjetaInfo from '@/components/grupolimpieza/tarjetaInfo'
import { mapActions } from 'vuex'

export default {
	name: 'grupos',
	data() {
		return {
			dialog: false,
			dialogCrear: false,
      date: new Date().toISOString().substr(0, 7),
			menu2: false,
			modelLista: 1,
			asignarAutomaticamente: false,
			selectorGrupos: []
		}
	},
	props: {
		personas: {
			type: Array,
			required: true,
			default: []
		},
		grupos: {
			type: Array,
			required: true,
			default: []
		}
	},
	components: {
		asignacion,
		tarjetaInfo
	},
	created() {
	},
	methods: {
		...mapActions(['eliminarGrupoLimpieza', 'editarGrupoLimpieza']),
		cerrarVentana() {
			this.dialog = false
			this.dialogCrear = false
		},
		eliminarGrupo(id) {
			this.eliminarGrupoLimpieza(id);
			this.$emit('grupo-eliminado', id);
		},
		editarGrupo(grupo) {
			this.editarGrupoLimpieza(grupo);
		},
		actualizarGrupoLista(grupo) {
			this.$emit('grupo-actualizado', grupo)
		},
		anadirGrupoLista(grupo) {
			this.$emit('grupo-creado', grupo)
		}
	},
}
</script>