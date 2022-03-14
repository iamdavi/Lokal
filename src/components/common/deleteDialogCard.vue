<template>
	<v-card>
		<v-card-title>
			<span class="text-h5">{{ title }}</span>
		</v-card-title>
		<v-card-text>
			<span class="text-h5">
				<v-icon v-if="icon">{{ icon }}</v-icon>
				{{ nombreItem }}
			</span>
		</v-card-text>
		<v-card-actions class="d-flex justify-space-between">
			<v-btn color="primary" @click="closeDelete()">Ir atrás</v-btn>
			<v-btn color="error" @click="deleteElemento()">Eliminar</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
			default: 'Título'
		},
		icon: {
			type: String,
			required: false,
			default: ''
		},
		nombreItem: {
			type: String,
			required: true,
			default: 'Elemento a eliminar'
		}
	},
	methods: {
		closeDelete() {
			this.$emit('close-dialog')
		},
		deleteElemento() {
			this.$emit('delete-item-dialog')
			this.$emit('close-dialog')
		}
	},
}
</script>