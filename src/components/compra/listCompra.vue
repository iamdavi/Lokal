<template>
	<v-card>
		<v-card-title>
			<span class="text-h5">Compras realizadas</span>
			<v-spacer></v-spacer>
			<span class="subtitle-2">
				Profit total: 
				<span 
					class="text-h6"
					:class="{
						'success--text': profitTotal > 0,
						'error--text': profitTotal < 0,
						'grey--text': profitTotal > 0,
					}"
				>
					{{ profitTotal }}
				</span>
			</span>
		</v-card-title>
		<v-card-text>
			<v-col>
				<v-row>
					<v-col class="pb-0">
						<p class="mb-0">Fecha</p>
					</v-col>
					<v-col class="pb-0">
						<p class="mb-0">Gastado</p>
					</v-col>
					<v-col class="pb-0">
						<p class="mb-0">Obtenido</p>
					</v-col>
					<v-col class="pb-0">
						<p class="mb-0 text-center">Profit</p>
					</v-col>
				</v-row>
			</v-col>
			<v-list subheader>
				<v-list-item
					v-for="compra in compras"
					:key="compra.title"
					class="px-3"
				>
					<v-list-item-content>
						<v-row align="center">
							<v-col>
								<v-list-item-title>
									<span>{{ compra.fecha }}</span>
								</v-list-item-title>
							</v-col>
							<v-col>
								<span>{{ compra.gastado }}</span>
							</v-col>
							<v-col>
								<span>{{ compra.obtenido }}</span>
							</v-col>
							<v-col class="text-center">
								<span 
									class="text-subtitle-1"
									:class="{
										'success--text': compra.profit > 0,
										'error--text': compra.profit < 0,
										'grey--text': compra.profit > 0,
									}"
								>{{ compra.profitString }}</span>
							</v-col>
							<span class="compra-options-row"></span>
						</v-row>
					</v-list-item-content>
					<!-- <v-list-item-action>
						<v-btn icon>
							<v-icon color="grey lighten-1">mdi-information</v-icon>
						</v-btn>
					</v-list-item-action> -->
				</v-list-item>
			</v-list>
		</v-card-text>
		<v-card-actions class="d-flex flex-row-reverse">
			<v-btn color="primary">Ver todo</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	computed: {
		...mapState({
			compras: 'compras'
		}),
		profitTotal() {
			let profitTotal = 0
			this.compras.forEach(compra => {
				profitTotal += parseInt(compra.profit)
			})
			return profitTotal;
		}
	},
	created() {
		this.getCompras(9)
	},
	methods: {
		...mapActions(['getCompras'])
	},
}
</script>

<style>
.compra-options-row {
	width: 25px;
	height: 25px;
	background-color: red;
	position: absolute;
	right: 0px;
	bottom: 14px;
}
</style>