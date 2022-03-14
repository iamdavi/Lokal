<template>
	<div>
		<cabecera-titulo titulo="Nueva lista de la compra"></cabecera-titulo>
		<v-row justify="center">
			<v-col cols="12" lg="4" md="6" sm="12">
				<lista-compra-layout :lista="lista" />
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
import listaCompraLayout from '@/components/listacompra/ListaCompraLayout'

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
		cabeceraTitulo,
		listaCompraLayout
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