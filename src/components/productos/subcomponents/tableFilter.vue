<template>
	<v-card>
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-header disable-icon-rotate>
					Filtro
          <template v-slot:actions>
            <v-icon>
              mdi-filter
            </v-icon>
          </template>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
          <v-text-field
						v-model="searchString"
            label="Nombre"
            prepend-icon="mdi-magnify"
						clearable
          ></v-text-field>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			searchString: ''
		}
	},
	methods: {
		filterByName(nombre) {

		}
	}
}
</script>