<template>
	<div class="w-100 h-100 text-center container-empty-state">
		<div v-if="loadingCreando">
			<v-progress-circular
				indeterminate
				color="primary"
			></v-progress-circular>
		</div>
		<div v-else>
			<div>
				<p class="text-subtitle-1 mb-0">- No existen pagos de este mes -</p>
				<p class="text-body-2"><i>Prueba a crear uno aquí mismo</i></p>
			</div>
			<div style="position: relative;">
				<img :src="emptyStateImg" class="mx-auto" width="80%" alt="Empty state">
				<v-overlay
					id="overlay-precio-por-persona"
					:absolute="true"
					:opacity="1"
					color="primary"
					:value="overlay"
				>
					<v-text-field
						v-model="precioPorPersonaToCreate"
						label="Euros por persona"
						placeholder="15"
						hide-details
						single-line
						type="number"
						append-icon="mdi-currency-eur"
					></v-text-field>
					<v-btn
						color="white"
						class="text--blue"
						light
						@click="overlay = false; crearMesPagoLocal();"
					>
						Guardar
					</v-btn>
				</v-overlay>
				<v-btn 
					class="w-100 primary"
					:class="{ 'd-transparent': overlay}"
					depressed
					@click="overlay = !overlay"
				>Crear pago</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: "PagosEmptyState",
	data() {
		return {
			emptyStateImg: require('@/assets/img/empty_state.jpg'),
			overlay: false,
			precioPorPersonaToCreate: null,
			loadingCreando: false
		}
	},
	props: {
		mes: {
			type: String,
			required: true
		},
	},
	methods: {
		...mapActions(['createPago', 'getPersonas']),
		async crearMesPagoLocal() {
			const precioPersona = parseInt(this.precioPorPersonaToCreate);
			if (precioPersona === NaN) { 
				alert('Pon un precio válido por persona')
				return; 
			}
			this.loadingCreando = true
			
			const pagoNuevo = {
				precioPorPersona: precioPersona,
				mesPago: this.mes,
			};

			const pagoCreado = await this.createPago(pagoNuevo);
			this.$emit('new-pago-creado', pagoCreado)
			this.loadingCreando = true
		}
	},
}
</script>

<style scoped>
.container-empty-state {
	height: 100%; 
	display: flex; 
	flex-direction: column; 
	justify-content: space-evenly;
}
</style>