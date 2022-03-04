<template>
	<div>
		<cabecera-titulo titulo="Editar lista de la compra" />
		<v-row justify="center">
			<v-col cols="12" lg="4" md="6" sm="12">
				<lista-compra-layout :lista="lista" />
				<pre>
					{{ lista }}
				</pre>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import cabeceraTitulo from '@/components/common/cabeceraTitulo'
import listaCompraLayout from '@/components/listacompra/ListaCompraLayout'

export default {
	data() {
		return {
			id: this.$route.params.id,
		}
	},
	components: {
		cabeceraTitulo,
		listaCompraLayout
	},
	computed: {
		...mapState(['listaCompra']),
		lista() {
			return Object.assign({}, this.listaCompra)
		}
	},
	methods: {
		...mapActions(['getListaCompra'])
	},
	created() {
		this.getListaCompra(this.id)
	}
}
</script>