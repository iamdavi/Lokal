<template>
	<div>
		<cabecera-titulo titulo="Compras"></cabecera-titulo>
		<v-row>
			<v-col md="4" cols="12">
				<create-compra></create-compra>
			</v-col>
			<v-col md="8" cols="12">
				<list-compra></list-compra>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import cabeceraTitulo from '@/components/common/cabeceraTitulo'
import createCompra from '@/components/compra/createCompra'
import listCompra from '@/components/compra/listCompra'

export default {
	name: 'Compra',
	data() {
		return {
		}
	},
	components: {
		cabeceraTitulo,
		createCompra,
		listCompra
	}
}
</script>