<template>
	<div>
		<cabecera-titulo titulo="Grupos de limpieza"></cabecera-titulo>
		<v-row justify="center">
			<v-col cols="12">
				<!-- Loagind -->
				<div v-if="cargando" class="text-center">
					<v-progress-circular
						indeterminate
						color="primary"
					></v-progress-circular>
				</div>
				<!-- Existen grupos -->
				<grupos 
					v-else-if="existenGrupos && gruposLimpieza" 
					:personas="personas"
					:grupos="gruposLimpieza"
					@grupo-eliminado="eliminarGrupoDeLista"
					@grupo-actualizado="actualizarGrupoLista"
					@grupo-creado="crearGrupoLista"
				/>
				<!-- Empty state -->
				<div v-else class="text-center">
					<h2 class="grey--text text-h6"><i> - ¡No hay grupos creados! - </i></h2>
					<div style="max-width: 400px;" class="mx-auto">
						<img :src="emptyStateImg"  width="100%" alt="Empty state">
					</div>
					<br>
					<v-dialog
						transition="dialog-bottom-transition"
						v-model="dialog"
						max-width="600"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								color="primary"
								v-bind="attrs"
								v-on="on"
							>Crear grupo</v-btn>
						</template>
						<tarjeta-info 
							titulo="Crear grupo"
							:grupos="gruposLimpieza"
							:personas="personas"
							@close-dialog="cerrarVentana"
						/>
					</v-dialog>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import cabeceraTitulo from '@/components/common/cabeceraTitulo'
import grupos from '@/components/grupolimpieza/grupos'
import tarjetaInfo from '@/components/grupolimpieza/tarjetaInfo'
import { mapActions } from 'vuex'

export default {
	name: 'grupoLimpieza',
	data() {
		return {
			cargando: true,
			dialog: false,
			existenGrupos: false,
			personas: [],
			emptyStateImg: require('@/assets/img/empty_state.jpg'),
			gruposLimpieza: []
		}
	},
	components: {
		cabeceraTitulo,
		grupos,
		tarjetaInfo
	},
	async created() {
		const grupos = await this.getGruposLimpieza();
		const personas = await this.getPersonas();
		this.gruposLimpieza = grupos.sort((a, b) => a.orden - b.orden)
		this.personas = personas
		this.existenGrupos = grupos.length > 0;
		// this.existenGrupos = false // Descomentar para probar el empyState
		this.cargando = false;
	},
	methods: {
		...mapActions(['getGruposLimpieza', 'getPersonas']),
		cerrarVentana() {
			this.dialog = false;
			this.existenGrupos = true
		},
		eliminarGrupoDeLista(id) {
      const nuevosGrupos = this.gruposLimpieza.filter(item => item.id !== id);
			this.gruposLimpieza = nuevosGrupos;
		},
		actualizarGrupoLista(grupo) {
			const newGrupos = this.gruposLimpieza.map(grupoLimpieza => {
				if (grupoLimpieza.id == grupo.id) {
					return grupo;
				}
				return grupoLimpieza
			})
			this.gruposLimpieza = newGrupos.sort((a, b) => a.orden - b.orden)
		},
		crearGrupoLista(grupo) {
			console.log(grupo);
			console.log(this.gruposLimpieza);
			const nuevaLista = this.gruposLimpieza.push(grupo)
			console.log(nuevaLista);
			this.gruposLimpieza = nuevaLista.sort((a, b) => a.orden - b.orden)
		}
	}
}
</script>