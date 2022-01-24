<template>
	<v-card>
		<v-card-title>
			<span class="text-h5">Lista de productos</span>
		</v-card-title>
		<v-card-text>
			<v-row>
				<v-col
					sm="6"
					cols="12"
					class="py-0"
					v-for="producto in productos"
					:key="producto.id"
				>
					<v-row>
						<v-col cols="6" class="d-flex align-center">
							<p class="body-1 mb-0">
								<b>
									{{ producto.nombre }}
								</b>
							</p>
						</v-col>
						<v-col cols="3" class="d-flex align-center">
							<p class="body-1 mb-0">
								<span class="float-right grey--text">
									{{ producto.precio }}
									<v-icon small class="euro-icon-product-list">mdi-currency-eur</v-icon>
								</span>
							</p>
						</v-col>
						<v-col cols="3" class="d-flex justify-end">
							<v-btn icon @click="editProductoModal(producto)">
								<v-icon color="primary">mdi-pencil</v-icon>
							</v-btn>
							<v-btn icon @click="deleteProductoModal(producto)">
								<v-icon color="error">mdi-close</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
		<v-dialog v-model="editDialog" max-width="500px">

			<create-producto 
				title="Editar producto"
				:producto="productoEdit"
				:createAction="false"
				@submit="editDialog = false"
			></create-producto>

		</v-dialog>
		<v-dialog v-model="deleteDialog" max-width="500px">
			<v-card>
				<v-card-title>
					<span class="text-h5">Eliminar producto</span>
				</v-card-title>
				<v-card-text>
					<span class="text-h5">
						{{ productoEdit.nombre }}
					</span>
				</v-card-text>
				<v-card-actions class="d-flex justify-space-around">
					<v-btn color="error" @click="deleteDialog = false">Cancelar</v-btn>
					<v-btn color="error" text @click="eliminarProducto(productoEdit.id); deleteDialog = false">Eliminar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CreateProducto from '@/components/productos/createProducto'

export default {
	data() {
		return {
			deleteDialog: false,
			editDialog: false,
			productoEdit: {
				id: '',
				nombre: '',
				precio: ''
			}
		}
	},
	components: {
		CreateProducto
	},
	created() {
		this.getProductos()
	},
	methods: {
		...mapActions(['getProductos', 'eliminarProducto']),
		deleteProductoModal(producto) {
			this.productoEdit.id = producto.id
			this.productoEdit.nombre = producto.nombre
			this.productoEdit.precio = producto.precio
			this.deleteDialog = true
		},
		editProductoModal(producto) {
			this.productoEdit = producto
			this.editDialog = true
		}
	},
	computed: {
		...mapState({
			productos: 'productos'
		})
	}
}
</script>

<style>
.euro-icon-product-list {
	margin-bottom: 3px;
}
</style>