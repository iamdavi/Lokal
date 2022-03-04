<template>
	<v-card color="blue lighten-4">
		<v-form @submit.prevent="submitForm(producto)">
			<v-card-title>
				<span class="text-h5">{{ title }}</span>
			</v-card-title>
			<v-card-text class="py-0">
				<v-row class="d-flex flex-row align-center justify-center">
					<v-col cols="12" class="py-0">
						<v-text-field
							v-model="producto.nombre"
							class="mx-4"
							label="Nombre producto"
							placeholder="Coca-Cola"
							type="text"
						/>
					</v-col>
					<v-col cols="12" md="5" class="py-0">
						<v-text-field
							v-model="producto.precio"
							class="mx-4"
							label="Se compra por"
							append-icon="mdi-currency-eur"
							placeholder="0,50"
							step="0.01"
							type="number"
						/>
					</v-col>
					<v-col cols="12" md="1" class="py-0 hidden-sm-and-down">
						<v-icon color="error">mdi-arrow-down-thin</v-icon>
					</v-col>
					<v-col cols="12" md="1" class="py-0 hidden-sm-and-down">
						<v-icon color="success">mdi-arrow-up-thin</v-icon>
					</v-col>
					<v-col cols="12" md="5" class="py-0">
						<v-text-field
							v-model="producto.venta"
							class="mx-4"
							label="Se vende por"
							append-icon="mdi-currency-eur"
							placeholder="1,00"
							step="0.01"
							type="number"
						/>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions class="d-flex flex-row-reverse">
				<v-btn block type="submit" color="primary">Guardar</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	data() {
		return {
		}
	},
	props: {
		title: {
			type: String,
			required: false,
			default: "Crear producto"
		},
		producto: {
			type: Object,
			required: false,
			default: () => ({})
		},
		createAction: { // Si es FALSE, se actualiza el producto
			type: Boolean,
			require: false,
			default: true
		}
	},
	computed: {
	},
	methods: {
		...mapActions(['addProducto', 'editProducto']),
		submitForm(producto) {
			if (this.createAction) {
				this.addProducto(producto)
			} else {
				this.editProducto(producto)
			}
			this.producto.nombre = ''
			this.producto.precio = ''
			this.producto.venta = ''
			this.$emit('submit')
		}
	},
}
</script>