<template>
	<div>
		<cabecera-titulo titulo="Listas de la compra"></cabecera-titulo>
		<v-dialog v-model="deleteListaModal" max-width="500px">
			<delete-dialog-card 
				title="Eliminar lista de compra" 
				icon="mdi-format-list-bulleted-square" 
				:nombreItem="listaToDelete.nombre ? listaToDelete.nombre : ''" 
				v-on:close-dialog="closeModal()"
				v-on:delete-item-dialog="eliminarListaCompra(listaToDelete.id)"
			/>
		</v-dialog>
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
						<v-card class="lista-compra-item">
							<div>
								<v-card-title class="pb-0">
									{{ lista.nombre }}
									<v-spacer></v-spacer>
									<v-icon 
										@click="showModalToDelete(lista)"
										dense
									>mdi-close</v-icon>
								</v-card-title>
								<v-card-text>
									<ul>
										<li
											v-for="(producto, index) in lista.productos"
											:key="index"
											class="grey--text"
										>{{ producto.nombre }}</li>
										<div class="lista-compra-list-item-text"></div>
									</ul>
								</v-card-text>
							</div>
							<v-card-actions>
								<v-btn 
									block 
									small 
									:to="`/listas-compra/edit/${lista.id}`"
									color="primary"
								>Ver</v-btn>
							</v-card-actions>
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
import deleteDialogCard from '@/components/common/deleteDialogCard'

export default {
	name: 'ListaCompra',
	data() {
		return {
			deleteListaModal: false,
			listaToDelete: {
				id: '',
				nombre: '',
				productos: []
			},
		}
	},
	components: {
		cabeceraTitulo,
		deleteDialogCard
	},
	created() {
		this.getListasCompras()
	},
	methods: {
		...mapActions(['getListasCompras', 'eliminarListaCompra']),
		closeModal() {
			this.deleteListaModal = false
		},
		showModalToDelete(lista) {
			this.listaToDelete = Object.assign({}, lista)
			this.deleteListaModal = true
		}
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

.lista-compra-item {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
/* .lista-compra-list-item-text {
	width: 100%;
	height: 22px;
	box-shadow: inset 2px -16px 14px -8px white;
	position: absolute;
	bottom: 30%;
	left: 0px;
}
.lista-compra-item {
	position: relative;
}
.lista-compra-item > .v-card__actions {
	width: 100%;
	position: relative;
	bottom: 0px;
} */
</style>