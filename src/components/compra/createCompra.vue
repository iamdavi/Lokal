<template>
	<v-card color="blue lighten-4">
    <v-form @submit.prevent="createCompra(compra); clearCompra()" v-model="valid">
			<v-card-title>
				<span class="text-h5">Nueva compra</span>
			</v-card-title>
			<v-card-text>
				<v-row justify="center">
					<v-date-picker
						v-model="compra.fecha"
						locale="es"
						elevation="3"
						first-day-of-week="0"
						year-icon="mdi-calendar-blank"
						prev-icon="mdi-skip-previous"
						next-icon="mdi-skip-next"
					></v-date-picker>
				</v-row>
				<v-row>
					<v-col cols="12" class="d-flex flex-row align-center justify-center">
						<p class="mb-0">Dinero gastado:</p>
						<v-text-field
							v-model="compra.gastado"
							class="text-h5 mx-4 mxw-30"
							append-icon="mdi-currency-eur"
							type="number"
						/>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col cols="12" class="d-flex flex-row align-center justify-center pt-0">
						<p class="mb-0">Dinero obtenido:</p>
						<v-text-field
							v-model="compra.obtenido"
							class="text-h5 mx-4 mxw-30 pt-0"
							append-icon="mdi-currency-eur"
							type="number"
						/>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions class="d-flex flex-row-reverse">
				<v-btn type="submit" color="primary">Guardar</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	data() {
		return {
			compra: {
				fecha: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
				gastado: 0,
				obtenido: 0
			},
			valid: true
		}
	},
	created() {
	},
	computed: {
	},
	methods: {
		...mapActions(['createCompra']),
		clearCompra() {
			this.compra.fecha = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
			this.compra.gastado = 0
			this.compra.obtenido = 0
		}
	}
}
</script>