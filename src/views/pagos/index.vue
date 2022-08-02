<template>
	<div>
		<cabecera-titulo titulo="Pagos"></cabecera-titulo>
		<v-row justify="center">
			<v-col 
				lg="8"
			 	md="10"
				cols="12"
			>
				<v-row>
					<v-col 
					 	sm="6"
						cols="12"
					>
						<v-date-picker
							v-model="mesSeleccionado"
							elevation="3"
							full-width
							type="month"
							year-icon="mdi-calendar-blank"
							prev-icon="mdi-skip-previous"
							next-icon="mdi-skip-next"
							locale="es-es"
						></v-date-picker>
					</v-col>
					<v-col 
						v-if="obteniendoInfo"
						sm="6"
						cols="12"
						class="d-flex"
					>
						<v-progress-circular
							indeterminate
							color="primary"
							class="ma-auto"
						></v-progress-circular>
					</v-col>
					<v-col 
						v-else-if="informacionPago === undefined"
						sm="6"
						cols="12"
					>
						<pagos-empty-state 
							:mes="mesSeleccionado" 
							@new-pago-creado="actualizarInformacionPago"
						/>
					</v-col>
					<v-col 
						v-else
						sm="6"
						cols="12"
					>
						<pagos-info-vista 
							:pago="informacionPago"
							@pago-eliminado="informacionPago = undefined;"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import cabeceraTitulo from '@/components/common/cabeceraTitulo'
import PagosEmptyState from '@/components/pagos/PagosEmptyState'
import PagosInfoVista from '@/components/pagos/PagosInfoVista'
import { mapActions, mapState } from 'vuex'

export default {
	data() {
		return {
			obteniendoInfo: false,
			informacionPago: undefined,
			mesSeleccionado: new Date().toISOString().substr(0, 7),
			iconoDelPrecioAMostrar: 'mdi-flip-to-front',
			mesPago: new Date().toISOString().substr(0, 7), 
			pagosPorAno: {}, // Objeto que guarda los pagos teniendo como claves los años
		}
	},
	components: {
		cabeceraTitulo,
		PagosEmptyState,
		PagosInfoVista
	},
	async created() {
		this.obteniendoInfo = true;
		await this.getPagos();
		const pago = this.getPagoLocalByMes(this.mesSeleccionado);
		this.informacionPago = pago;
		this.obteniendoInfo = false;
	},
	computed: {
		...mapState({
			pagos: "pagos",
			personas: "personas",
		}),
	},
	watch: {
		mesSeleccionado(newMesAno) {
			const pago = this.getPagoLocalByMes(newMesAno);
			this.informacionPago = pago;
		},
	},
	methods: {
		...mapActions(['getPersonas', 'createPago', 'getPagos']),
		getPagoLocalByMes(mes) {
			return this.pagos.find(pago => pago.mesPago == mes); 
		},
		actualizarInformacionPago(pago) {
			this.informacionPago = pago
		},
	}
}
</script>