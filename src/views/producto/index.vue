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
				<v-card>
					<v-expansion-panels>
						<v-expansion-panel>
							<v-expansion-panel-header>
								Filtro
								<template v-slot:actions>
									<v-icon>
										mdi-chevron-down
									</v-icon>
								</template>
							</v-expansion-panel-header>
							<v-expansion-panel-content>
								<v-text-field
									v-model="searchString"
									label="Nombre"
									prepend-icon="mdi-magnify"
									clearable
								></v-text-field>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-card>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col 
				lg="8"
			 	md="10"
				cols="12"
			>
				<list-producto :productos="productosFiltrados"></list-producto>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import cabeceraTitulo from '@/components/common/cabeceraTitulo'
import createProducto from '@/components/productos/subcomponents/createProducto'
import listProducto from '@/components/productos/listProducto'

export default {
	name: 'Producto',
	data() {
		return {
			searchString: ''
		}
	},
	components: {
		cabeceraTitulo,
		createProducto,
		listProducto,
	},
	created() {
		this.getProductos()
	},
	methods: {
		...mapActions(['getProductos']),
	},
	computed: {
		...mapState({
			productos: 'productos'
		}),
		productosFiltrados() { 
			if (!this.searchString) { return  this.productos }
			return this.productos.filter(producto => {
				return producto.nombre.toLowerCase().includes(this.searchString.toLowerCase())
			})
		}
	}
}
</script>