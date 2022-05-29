<template>
	<v-card>
		<v-toolbar
			color="primary"
			dark
		>
			Ajustes de pago
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon color="white" class="float-right" @click="$emit('dismiss-modal')">
					mdi-close
				</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text>
			<v-row>
				<v-col cols="12">
					<v-text-field
						v-model="precioPorPersonaToCreate"
						label="Euros por persona"
						placeholder="15"
						hide-details
						single-line
						type="number"
						append-icon="mdi-currency-eur"
					></v-text-field>
				</v-col>
				<v-col cols="12">
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions class="justify-space-between">
			<v-row class="mb-1">
				<v-col cols="12" class="pb-0">
					<v-btn color="error">Eliminar pago</v-btn>
					<v-btn color="primary" class="float-right">Guardar</v-btn>
				</v-col>
				<v-col cols="12" class="py-0">
					<span class="text-caption red--text text--lighten-1">
						<v-icon small color="error">mdi-alert-circle-outline</v-icon> 
						¡Eliminando el pago se perderá toda la información!
					</span>
				</v-col>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "PagosAjustes",
	data() {
		return {
			precioPorPersonaToCreate: 10
		}
	},
}
</script>