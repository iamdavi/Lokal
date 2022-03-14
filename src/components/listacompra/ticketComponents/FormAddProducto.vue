<template>
	<v-card color="blue lighten-4" class="card-form-add-producto">
		<v-container>
			<v-row align="center">
				<v-col cols="12">
					<v-autocomplete
						v-model="productoEditLocal.producto.id"
						:loading="loading"
						:items="productos"
						item-text="nombre"
						item-value="id"
						cache-items
						hide-no-data
						hide-details
						label="Producto"
					></v-autocomplete>
				</v-col>
				<v-col cols="9">
					<v-text-field
						v-model="productoEditLocal.cantidad"
						placeholder="Cant."
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="3" align-self="center" class="d-flex justify-center">
					<v-btn 
						color="white"
						elevation="1"
						@click="addProductoLocal()"
						small
						fab
					>
						<v-icon color="grey">mdi-plus</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	data() {
		return {
			loading: false,
			productoEditLocal: {
				producto: {
					id: null,
					nombre: null,
					precio: null
				},
				cantidad: null,
				cantidadPrecio: null,
				cantidadPrecioString: null
			},
		}
	},
	props: {
		lista: {
			type: Object,
			required: true,
			default:  {}
		}
	},
	computed: {
		...mapState({
			productos: 'productos'
		})
	},
	created() {
		this.getProductos()
	},
	methods: {
		...mapActions(['getProductos']),
		addProductoLocal() {
			const productoId = this.productoEditLocal.producto.id
			let producto = {}
			Object.assign(producto, this.productos.find(producto => producto.id === productoId))
			producto.cantidad = this.productoEditLocal.cantidad
			const cantidadPrecio = this.multiplicacionCantidadPrecio(producto)
			producto.cantidadPrecio = parseFloat(producto.cantidad).toFixed(2)
			producto.cantidadPrecioString = cantidadPrecio.toFixed(2)
			this.lista.productos.unshift(producto)
		},
		multiplicacionCantidadPrecio(producto) {
			return producto.cantidad * producto.precio
		},
	},
}
</script>