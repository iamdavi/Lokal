<template>
	<v-row justify="center">
		<v-col cols="12" md="8" sm="12" class="text-centerf">
			<h1>{{ titulo }}</h1>
		</v-col>
	</v-row>
</template>

<script>
export default {
	props: {
		titulo: {
			type: String,
			required: true,
			deault: 'Titulo'
		}
	}
}
</script>