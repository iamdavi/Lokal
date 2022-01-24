<template>
	<div>
		<cabecera-titulo titulo="Listas de la compra"></cabecera-titulo>
		<v-row justify="center">
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
import cabeceraTitulo from '@/components/common/cabeceraTitulo'

export default {
	name: 'ListaCompra',
	components: {
		cabeceraTitulo
	}
}
</script>

<style scoped>
.float-button-create {
	position: absolute;
	bottom: 3rem;
	right: 3rem;
}
</style>