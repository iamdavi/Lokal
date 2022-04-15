<template>
	<v-list>
		<v-list-item 
			v-for="(producto, index) in lista.productos"
			:key="index"
			class="px-0"
		>
			<v-list-item-title>
				<v-row align="center" justify="center">
					<v-col cols="6" class="list-item-producto-nombre">
						{{ producto.nombre }} 
					</v-col>
					<v-col cols="2">
						<span class="grey--text float-right">x {{ producto.cantidad }}</span>
					</v-col>
					<v-col cols="4">
						<span class="grey--text float-right">
							<v-text-field
								class="text-field-dense mt-0 pt-0"
								style="max-width: 4.7rem;"
								v-model="producto.gastoProducto"
								:hide-details="true"
								append-icon="mdi-currency-eur"
								type="number"
							/>
						</span>
					</v-col>
				</v-row>
			</v-list-item-title>
			<v-list-item-icon class="list-item-remove-producto" @click="removeProductoLocal(index)">
					<v-icon small color="error">mdi-close</v-icon>
			</v-list-item-icon>
		</v-list-item>
	</v-list>
</template>

<script>
export default {
	props: {
		lista: {
			type: Object,
			required: true,
			default:  {}
		}
	},
	data() {
		return {
			
		}
	},
	methods: {
		removeProductoLocal(index) {
			this.lista.productos.splice(index, 1)
		}
	}
}
</script>