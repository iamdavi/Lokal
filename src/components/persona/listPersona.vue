<template>
	<v-data-table
			:headers="headers"
			:items="personas"
			hide-default-footer
			:items-per-page="-1"
			sort-by="nombre"
			class="elevation-1"
		>
    <template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>
					<span class="text-h5">Listado de personas</span>
				</v-toolbar-title>
			</v-toolbar>
			<v-dialog
				v-model="dialog"
				max-width="500px"
			>
				<v-card>
					<v-card-title>
						<span class="text-h5">Editar persona</span>
					</v-card-title>

					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.nombre"
										label="Nombre"
									></v-text-field>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>

					<v-card-actions class="d-flex justify-space-around">
						<v-btn
							color="primary"
							text
							@click="close"
						>
							Cancelar
						</v-btn>
						<v-btn
							color="primary"
							@click="save"
						>
							Guardar
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog v-model="dialogDelete" max-width="500px">
				<v-card>
					<v-card-title>
						<span class="text-h5">Eliminar usuario</span>
					</v-card-title>
					<v-card-text>
						<span class="text-h5">
							<v-icon>mdi-account</v-icon>
							{{ editedItem.nombre }}
						</span>
					</v-card-text>
					<v-card-actions class="d-flex justify-space-around">
						<v-btn color="error" @click="closeDelete()">Cancelar</v-btn>
						<v-btn color="error" text @click="eliminarPersona(editedItem.id);closeDelete()">Eliminar</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <p><i>- No hay personas -</i></p>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	data: () => ({
		dialog: false,
		dialogDelete: false,
		headers: [
			{
				text: 'Nombre',
				align: 'start',
				sortable: true,
				value: 'nombre',
			},
      {
				text: 'Acciones', 
				align: 'end',
				sortable: false ,
				value: 'actions', 
			},
		],
		editedIndex: -1,
		editedItem: {
			nombre: '',
		},
		defaultItem: {
			nombre: '',
		},
	}),
	computed: {
    ...mapState({
			personas: 'personas'
		}),
	},

	watch: {
		dialog (val) {
			val || this.close()
		},
		dialogDelete (val) {
			val || this.closeDelete()
		},
	},

	created () {
		this.getPersonas()
	},

	methods: {
    ...mapActions(['getPersonas', 'eliminarPersona']),

		editItem (item) {
			this.editedIndex = this.personas.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem (item) {
			this.editedIndex = this.personas.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialogDelete = true
		},

		close () {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		closeDelete () {
			this.dialogDelete = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		save () {
			if (this.editedIndex > -1) {
				Object.assign(this.personas[this.editedIndex], this.editedItem)
			} else {
				this.personas.push(this.editedItem)
			}
			this.close()
		},
	},
}
</script>