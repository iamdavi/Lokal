<template>
	<v-alert
		class="mb-0"
		outlined
		color="grey"
	>
		<v-row>
			<v-col cols="12" v-if="loading"></v-col>
			<v-col cols="12" v-else-if="!grupoALimpiar">
				<div class="text-h6 mb-0 text-center grey--text">
					<i>- No hay grupos asignados -</i>
				</div>
			</v-col>
			<v-col cols="12" v-else>
				<div class="text-h6 mb-0">
					Siguiente grupo al que le toca limpiar: <b class="primary--text"> {{ grupoALimpiar.nombre }} (grupo número {{ grupoALimpiar.orden }})</b>
				</div>
			</v-col>
		</v-row>
	</v-alert>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: "GrupoSemana",
	data() {
		return {
      currentDate: new Date().toISOString().substr(0, 10),
			loading: true,
			grupoALimpiar: null
		}
	},
	async created() {
		const fechas = await this.getFechaAsignacionGrupos(); if (!fechas) { return; }
		const grupo = await this.getGrupoLimpieza(fechas[0].grupo); if (!grupo) { return;  }

		this.grupoALimpiar = grupo
		const firstDayCurrentWeek = new Date(this.currentDate)
		const firstDay = new Date(firstDayCurrentWeek.setDate(firstDayCurrentWeek.getDate() - firstDayCurrentWeek.getDay() + 1)).toISOString().substr(0, 10);
		const fechaAsignada = fechas[0].fecha;
		let semanasDiferencia = null
		if (this.currentDate > fechaAsignada) {
			semanasDiferencia = this.getWeeksDiff(fechaAsignada, this.currentDate)
		} else {
			semanasDiferencia = this.getWeeksDiff(this.currentDate, fechaAsignada)
		}
		const gruposOrdenados = await this.getGruposByOrden();
		const siguienteGrupo = gruposOrdenados[gruposOrdenados.length % (semanasDiferencia)]
		this.loading = false
	},
	computed: {
		...mapState(['fechaInicioGrupos'])
	},
	methods: {
		...mapActions(['getFechaAsignacionGrupos', 'getGrupoLimpieza', 'getGruposByOrden']),
		getWeeksDiff(startDate, endDate) {
			const msInWeek = 1000 * 60 * 60 * 24 * 7;
			return Math.round(Math.abs(new Date(endDate) - new Date(startDate)) / msInWeek);
		}
	}
}
</script>