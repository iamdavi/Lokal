<template>
	<v-alert
		class="pt-2 mb-0"
		outlined
		color="primary"
	>
		<v-row>
			<v-col cols="12" class="vertical-align">
				<div class="text-h6 mb-4">
					Asignación de grupos
				</div>
				<div>
					Desde aquí podrás asignar un grupo a la semana que le corresponda.
				</div>
			</v-col>
			<v-col cols="12">
				<v-menu
					v-model="menu2"
					:close-on-content-click="false"
					:nudge-right="40"
					transition="scale-transition"
					offset-y
					min-width="auto"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="date"
							class="mt-4"
							label="Selecciona día"
							dense
							prepend-icon="mdi-calendar"
							readonly
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="date"
						@input="menu2 = false"
						year-icon="mdi-calendar-blank"
						prev-icon="mdi-skip-previous"
						next-icon="mdi-skip-next"
						first-day-of-week="1"
						locale="es-es"
					></v-date-picker>
				</v-menu>
				<span class="text-subtitle">Semana del <b>{{ this.inicioSemana }}</b> al <b>{{ this.finSemana }}</b>.</span>
				<v-select
					:items="grupos"
					v-model="grupoSeleccionado"
					label="Grupo de limpieza"
					prefix="Grupo numero "
          item-text="orden"
          item-value="id"
          persistent-hint
          return-object
          single-line
					dense
				></v-select>
				<v-row>
					<v-col cols="12" class="grey--text mb-4">
						<span>
							Al resto de grupos se les asignaran las semanas consecutivas por orden.
						</span>
					</v-col>
				</v-row>
				<v-btn @click="asignarMesGrupo()" block color="primary">Asignar grupos</v-btn>
			</v-col>
		</v-row>
    <v-snackbar
      v-model="fechaGuardada"
      color="success"
      outlined
			top
			right
    >
      Grupos asignados
      <template v-slot:action="{ attrs }">
        <v-btn
          color="success"
          text
          v-bind="attrs"
          @click="fechaGuardada = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
	</v-alert>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'asignacion',
	data() {
		return {
      date: new Date().toISOString().substr(0, 10),
			fechaGuardada: false,
			inicioSemana: 0,
			finSemana: 0,
			menu2: false,
			grupoSeleccionado: null,
			showTooltip: false
		}
	},
	computed: {
		computedDateFormatted () {
			return this.formatDate(this.date)
		},
	},

	props: {
		grupos: {
			type: Array,
			required: true,
			default: []
		}
	},

	created() {
		this.getFechaAsignacionGrupos()
		this.grupoSeleccionado = this.grupos[0];
		this.getDaysOfWeek()
	},

	watch: {
		date (val) {
			this.dateFormatted = this.formatDate(this.date)
			this.getDaysOfWeek()
		},
	},

	methods: {
		...mapActions(['setFechaAsignacionGrupos', 'getFechaAsignacionGrupos']),
		formatDate (date) {
			if (!date) return null

			const [year, month, day] = date.split('-')
			return `${month}/${day}/${year}`
		},
		parseDate (date) {
			if (!date) return null

			const [month, day, year] = date.split('/')
			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
		},
		getDaysOfWeek() {
			const today = new Date(this.date);

			const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1));
			const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7));

			this.inicioSemana = firstDay.toLocaleDateString(undefined, { day:'numeric' });
			this.finSemana = lastDay.toLocaleDateString(undefined, { day:'numeric' });
		},
		async asignarMesGrupo() {
			const daySelected = new Date(this.date);
			const firstDay = new Date(daySelected.setDate(daySelected.getDate() - daySelected.getDay() + 1)).toISOString().slice(0, 10);
			const res = await this.setFechaAsignacionGrupos({
				fecha: firstDay,
				grupoId: this.grupoSeleccionado.id
			});
			console.log(res);
			if (res) {
				this.fechaGuardada = true
			}
		}
	},
}
</script>

<style>
.vertical-align {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.small-checkbox > div > div > div > i {
	font-size: 17px !important;
}
.small-checkbox > div > div > label {
	font-size: 14px !important;
	color: rgba(0, 0, 0, 0.87) !important;
}
</style>