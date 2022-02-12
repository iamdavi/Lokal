<template>
	<div>
		<cabecera-titulo titulo="Nueva lista de la compra"></cabecera-titulo>
		<v-row justify="center">
			<v-col cols="12" lg="4" md="6" sm="12">
				<v-card>
					<v-card-title class="pb-0">
						<v-text-field
							v-model="lista.nombre"
							class="pt-0 mt-0"
							placeholder="Nombre de la lista"
							prepend-icon="mdi-pencil"
						/>
					</v-card-title>
					<v-card-text>
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
						<v-row>
							<v-col cols="12">
								<v-slide-y-transition
									group
									tag="v-list"
								>
									<v-list-item 
										v-for="(producto, index) in lista.productos"
										:key="index"
										class="px-0"
									>
										<v-list-item-title>
											<v-row align="center" justify="center">
												<v-col cols="6" class="list-item-producto-nombre">
													{{ producto.nombre }} 
												</v-col>
												<v-col cols="2">
													<span class="grey--text float-right">x {{ producto.cantidad }}</span>
												</v-col>
												<v-col cols="4">
													<span class="grey--text float-right">
														<v-text-field
															class="text-field-dense"
															v-model="producto.cantidadPrecioString"
															:hide-details="true"
															append-icon="mdi-currency-eur"
															type="number"
														/>
													</span>
												</v-col>
											</v-row>
										</v-list-item-title>
										<v-list-item-icon class="list-item-remove-producto" @click="removeProductoLocal(index)">
											<v-icon small color="error">mdi-close</v-icon>
										</v-list-item-icon>
									</v-list-item>
								</v-slide-y-transition>
							</v-col>
						</v-row>
						<v-row>
							<div class="horizontal-rule"></div>
							<v-col cols="7">
								<span class="black--text text-h6">Total:</span>
							</v-col>
							<v-col cols="5" class="text-right">
								<span class="black--text text-h6">{{ precioTotalLista() }} <v-icon color="black" small style="margin-bottom: 3px;">mdi-currency-eur</v-icon></span>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
				<v-btn 
					class="mt-3 guardar-formulario-button" 
					color="blue lighten-4" 
					@click="guardarListaCompra()"
					block
				>Guardar lista</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import cabeceraTitulo from '@/components/common/cabeceraTitulo'

export default {
	name: 'ListaCompraNew',
	data() {
		return {
			lista: {
				nombre: null,
				productos: []
			},
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
			select: null,
			loading: false,
			states: []
		}
	},
	components: {
		cabeceraTitulo
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
		...mapActions(['getProductos', 'addListaCompra']),
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
		precioTotalLista() {
			let productos = [null]
			let totalLista = 0
			Object.assign(productos, this.lista.productos)
			productos.forEach(producto => {
				if (producto) {
					totalLista += (producto.cantidad * producto.precio)
				}
			})
			return parseFloat(totalLista).toFixed(2)
		},
		removeProductoLocal(index) {
			this.lista.productos.splice(index, 1);
		},
		guardarListaCompra() {
			this.addListaCompra(this.lista);
		}
	}
}
</script>

<style scoped>
.horizontal-rule {
	height: 3px;
	background-color: grey;
	border-radius: 4px;
	width: 95%;
	margin: auto;
	margin-bottom: 12px;
}
.list-item-producto-nombre {
	word-wrap: break-word;
	white-space: pre-wrap;
	text-indent: -4px;
}
.list-item-remove-producto {
	margin: auto;
	padding-left: 5px;
}
.text-field-dense {
	margin-top: 0px;
	padding-top: 0px;
}
.card-form-add-producto {
	position: sticky;
	top: 68px;
	z-index: 5;
}
.guardar-formulario-button {
	position: sticky;
	bottom: 14px;
}
</style>