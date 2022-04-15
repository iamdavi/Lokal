<template>
	<v-card color="blue lighten-4" class="card-form-add-producto">
		<v-container>
			<v-row align="center">
				<v-dialog v-model="createProductoDialog" max-width="500px">
					<create-add-producto-compra
						@submit="createProductAndAddToList"
					></create-add-producto-compra>
				</v-dialog>
				<v-col cols="10">
					<v-combobox
						v-model="productoSeleccionado"
						:loading="loading"
						:items="productos"
						:value="productoSeleccionado"
						item-text="nombre"
						item-value="id"
						cache-items
						hide-no-data
						hide-details
						label="Producto"
					></v-combobox>
				</v-col>
				<!-- Botón lanzar modal crear producto -->
				<div 
					class="button-create-producto-to-list elevation-4"
					@click="createProductoDialog = true"
				>
					<v-icon
						color="white"
						small
					>mdi-plus</v-icon>
					<v-icon
						color="white"
					>mdi-food-drumstick</v-icon>
					<div class="sombra-producto"></div>
				</div>
				<!--/ Botón lanzar modal crear producto -->
				<v-col cols="10">
					<v-text-field
						v-model="productoEditLocal.cantidad"
						placeholder="Cant."
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="2" align-self="center" class="d-flex justify-center">
					<v-btn 
						color="white"
						elevation="1"
						@click="formAddProductoLocal()"
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
import { createLogger, mapActions, mapState } from 'vuex'
import CreateAddProductoCompra from '@/components/listacompra/ticketComponents/CreateAddProductoCompra'

export default {
	data() {
		return {
			loading: false,
			createProductoDialog: false,
			// En caso de que selecciona un producto de los disponibles, carga todo el
			// objeto, en caso contrario, solo contiene el nombre introducido
			productoSeleccionado: '',
			productoEditLocal: {
				producto: {
					id: null,
					nombre: null,
					precio: null
				},
				cantidad: null
			},
		}
	},
	components: {
		'CreateAddProductoCompra': CreateAddProductoCompra
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
			productos: 'productos',
			productoCreateAdd: 'productoCreateAdd'
		})
	},
	created() {
		this.getProductos()
	},
	methods: {
		...mapActions(['getProductos', 'addProducto', 'clearProductoCreateAdd']),
		formAddProductoLocal() {
			if (!this.productoSeleccionado) { return; }
			let producto = {}
			Object.assign(producto, this.productos.find(producto => {
				return producto.id == this.productoSeleccionado.id
			}));
			if (!producto.hasOwnProperty('id')) {
				producto = this.productoCreateAdd
			}
			producto.cantidad = this.productoEditLocal.cantidad
			producto.gastoProducto = (producto.cantidad * producto.precio).toFixed(2)
			producto.beneficioProducto = (producto.cantidad * producto.venta).toFixed(2)
			this.lista.productos.unshift(producto)
		},
		createProductAndAddToList() {
			this.productos.unshift(this.productoCreateAdd)
			this.productoSeleccionado = this.productoCreateAdd
			this.createProductoDialog = false
		},
	},
}
</script>