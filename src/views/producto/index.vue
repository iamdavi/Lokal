<template>
	<div>
		<cabecera-titulo titulo="Productos"></cabecera-titulo>
		<v-row justify="center">
			<v-col sm="12" md="5" lg="4" cols="12">
				<create-producto title="Crear producto"></create-producto>
			</v-col>
			<v-col cols="12">
				<list-producto></list-producto>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import cabeceraTitulo from '@/components/common/cabeceraTitulo'
import createProducto from '@/components/productos/createProducto'
import listProducto from '@/components/productos/listProducto'

export default {
	name: 'Producto',
	components: {
		cabeceraTitulo,
		createProducto,
		listProducto
	}
}
</script>