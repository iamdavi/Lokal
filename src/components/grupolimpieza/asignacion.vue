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
						locale="es-es"
					></v-date-picker>
				</v-menu>
				<v-select
					:items="grupos"
					v-model="grupoSeleccionado"
					label="Grupo de limpieza"
          :hint="`${grupoSeleccionado.nombre}`"
					prefix="Grupo numero "
          item-text="orden"
          item-value="id"
          persistent-hint
          return-object
          single-line
					dense
				></v-select>
				<v-checkbox
					class="small-checkbox mt-0"
					v-model="asignarAutomaticamente"
					label="Asignar resto de meses automáticamente a partir de este"
				></v-checkbox>
				<v-btn block color="primary">Asignar grupos</v-btn>
			</v-col>
		</v-row>
	</v-alert>
</template>

<script>
export default {
	name: 'asignacion',
	data() {
		return {
      date: new Date().toISOString().substr(0, 10),
			menu2: false,
			asignarAutomaticamente: false,
			grupoSeleccionado: null
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
		this.grupoSeleccionado = this.grupos[0];
	},

	watch: {
		date (val) {
			this.dateFormatted = this.formatDate(this.date)
		},
	},

	methods: {
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