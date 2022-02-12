<template>
	<div>
		<cabecera-titulo titulo="Listas de la compra"></cabecera-titulo>
		<v-row justify="center">
			<v-col cols="12" md="8" sm="12">
				<v-row>
					<v-col
						v-for="lista in listasCompras"
						:key="lista.id"
						cols="12"
						sm="6"
						md="4"
					>
						<v-card height="100%">
							<v-card-title class="pb-0">{{ lista.nombre }}</v-card-title>
							<v-card-text>
								<ul>
									<li
										v-for="(producto, index) in lista.productos"
										:key="index"
									>{{ producto.nombre }}</li>
								</ul>
								<div class="lista-compra-list-item-text"></div>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-btn
			elevation="4"
			color="primary"
			to="/listas-compra/new"
			class="float-button-create"
			fab
		>
			<v-icon>mdi-plus</v-icon>
		</v-btn>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import cabeceraTitulo from '@/components/common/cabeceraTitulo'

export default {
	name: 'ListaCompra',
	components: {
		cabeceraTitulo
	},
	created() {
		this.getListasCompras()
	},
	methods: {
		...mapActions(['getListasCompras'])
	},
	computed: {
		...mapState({
			listasCompras: 'listasCompras'
		})
	}
}
</script>

<style scoped>
.float-button-create {
	position: absolute;
	bottom: 3rem;
	right: 3rem;
}
.lista-compra-list-item-text {
	width: 100%;
	height: 22px;
	box-shadow: inset 2px -16px 14px -8px white;
	position: absolute;
	bottom: 20px;
	left: 0px;
}
</style>