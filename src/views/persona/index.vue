<template>
	<div>
		<cabecera-titulo titulo="Personas"></cabecera-titulo>
		<v-row justify="center">
			<v-col cols="12" md="8" sm="12">
				<create-persona></create-persona>
			</v-col>
			<v-col cols="12" md="8" sm="12">
				<list-persona></list-persona>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import createPersona from '@/components/persona/createPersona'
import listPersona from '@/components/persona/listPersona'
import cabeceraTitulo from '@/components/common/cabeceraTitulo'

export default {
	name: 'Personas',
	components: {
		createPersona,
		listPersona,
		cabeceraTitulo
	}
}
</script>