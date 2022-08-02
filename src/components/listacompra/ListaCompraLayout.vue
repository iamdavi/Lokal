<template>
	<v-card>
		<span>
			<v-btn 
				class="mt-2 ml-2 pl-0"
				to="/listas-compra#"
				text 
				small
			>
				<v-icon>mdi-chevron-left</v-icon>
				Volver a lista
			</v-btn>
		</span>
		<v-card-title class="pb-0">
			<v-text-field
				v-model="lista.nombre"
				class="pt-0 mt-0"
				placeholder="Nombre de la lista"
				prepend-icon="mdi-pencil"
			/>
		</v-card-title>
		<v-card-text>
			<form-add-producto :lista="lista" />
			<v-row>
				<v-col cols="12">
					<lista-productos-ticket :lista="lista" />
				</v-col>
			</v-row>
			<div class="horizontal-rule"></div>
			<v-row>
				<v-col cols="12" class="pb-0">
					<v-row>
						<v-col cols="7">
							<span class="black--text text-h6">Total:</span>
						</v-col>
						<v-col cols="5" class="text-right">
							<span class="black--text text-h6">{{ precioTotalLista() }} <v-icon color="black" small style="margin-bottom: 3px;">mdi-currency-eur</v-icon></span>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-row>
						<v-col cols="7">
							<span class="black--text text-h6">Venta:</span>
						</v-col>
						<v-col cols="5" class="text-right">
							<span class="black--text text-h6">{{ precioVentaTotalLista() | dosdecimales }} <v-icon color="black" small style="margin-bottom: 3px;">mdi-currency-eur</v-icon></span>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12">
					<v-row>
						<v-col cols="7">
							<span class="black--text text-h6">Profit:</span>
						</v-col>
						<v-col cols="5" class="text-right">
							<span class="success--text text-h6">{{ profitTotalLista() }} <v-icon color="success" small style="margin-bottom: 3px;">mdi-currency-eur</v-icon></span>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
import FormAddProducto from '@/components/listacompra/ticketComponents/FormAddProducto'
import ListaProductosTicket from '@/components/listacompra/ticketComponents/ListaProductosTicket'

export default {
	data() {
		return {
      id: this.$route.params.id,
			select: null,
			states: []
		}
	},
	components: {
		FormAddProducto,
		ListaProductosTicket
	},
	props: {
		lista: {
			type: Object,
			required: true,
			default() {
				return {
					nombre: '',
					productos: []
				}
			}
		}
	},
	methods: {
		precioVentaTotalLista() {
			let totalVenta = 0
			const productosLista = this.lista.productos
			if (!productosLista) { return 0 }
			productosLista.forEach(producto => {
				totalVenta += parseFloat(producto.beneficioProducto)
			})
			return totalVenta.toFixed(2)
		},
		precioTotalLista() {
			let totalLista = 0
			const productosLista = this.lista.productos
			if (!productosLista) { return 0 }
			productosLista.forEach(producto => {
				totalLista += producto.gastoProducto
			})
			return parseFloat(totalLista).toFixed(2)
		},
		profitTotalLista() {
			return (this.precioVentaTotalLista() - this.precioTotalLista()).toFixed(2);
		}
	}
}
</script>