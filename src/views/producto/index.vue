<template>
	<div>
		<cabecera-titulo titulo="Productos"></cabecera-titulo>
		<v-row justify="center">
			<v-col cols="12" md="8" sm="12">
			</v-col>
			<v-col cols="12" md="8" sm="12">
			</v-col>
		</v-row>
	</div>
</template>

<script>
import cabeceraTitulo from '@/components/common/cabeceraTitulo'

export default {
	name: 'Producto',
	components: {
		cabeceraTitulo
	}
}
</script>