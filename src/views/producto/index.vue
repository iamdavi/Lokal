<template>
	<div>
		<cabecera-titulo titulo="Productos"></cabecera-titulo>
		<v-row justify="center">
			<v-col 
				lg="8"
			 	md="10"
				cols="12"
			>
				<create-producto title="Crear producto"></create-producto>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col 
				lg="8"
			 	md="10"
				cols="12"
			>
				<table-filter></table-filter>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col 
				lg="8"
			 	md="10"
				cols="12"
			>
				<list-producto></list-producto>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import cabeceraTitulo from '@/components/common/cabeceraTitulo'
import createProducto from '@/components/productos/subcomponents/createProducto'
import tableFilter from '@/components/productos/subcomponents/tableFilter'
import listProducto from '@/components/productos/listProducto'

export default {
	name: 'Producto',
	components: {
		cabeceraTitulo,
		createProducto,
		listProducto,
		tableFilter
	}
}
</script>