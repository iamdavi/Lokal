<template>
	<v-row justify="center">
		<v-col cols="12" md="8" sm="12">
			<h1>Personas</h1>
		</v-col>
		<v-col cols="12" md="8" sm="12">
			<create-persona></create-persona>
		</v-col>
		<v-col cols="12" md="8" sm="12">
			<list-persona></list-persona>
		</v-col>
	</v-row>
</template>

<script>
import createPersona from '@/components/persona/createPersona'
import listPersona from '@/components/persona/listPersona'

export default {
	name: 'Personas',
	components: {
		createPersona,
		listPersona
	}
}
</script>