<template>
	<div>
		<v-simple-table dense>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left text-body-2">
							Total ganado: <b class="success--text">{{ getTotalSacado(pago, false) }}&euro;</b>
						</th>
						<th class="text-right">
							Nº personas
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Han pagado:</td>
						<td class="text-right">{{ numeroHanPagado(pago, true) }}</td>
					</tr>
					<tr>
						<td>Quedan por pagar:</td>
						<td class="text-right">{{ numeroHanPagado(pago, false) }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-row class="mt-2">
			<v-col cols="6">
				<span class="text-h6">Personas</span>
			</v-col>
			<v-col cols="6" class="text-right">
				<span class="text-subtitle-2 grey--text mr-3">{{ pago.precioPorPersona }}&euro; por persona</span>
				<v-dialog
					transition="dialog-bottom-transition"
					max-width="600"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-btn 
							icon 
							small 
							color="primary"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon>
								mdi-cog
							</v-icon>
						</v-btn>
					</template>
					<template v-slot:default="dialog">
						<pagos-ajustes @dismiss-modal="dialog.value = false" />
					</template>
				</v-dialog>
			</v-col>
		</v-row>
		<v-card
			class="mx-auto"
			tile
		>
			<v-list dense>
				<v-list-item-group
					color="primary"
				>
					<v-list-item
						v-for="(persona, i) in pago.personas"
						:key="i"
					>
						<v-list-item-content>{{ persona.nombre }}</v-list-item-content>
						<v-list-item-action>
							<v-checkbox v-model="persona.pagado"></v-checkbox>
						</v-list-item-action>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>
	</div>
</template>

<script>
import PagosAjustes from '@/components/pagos/PagosAjustes'

export default {
	name: "PagosInfoVista",
	data() {
		return {
			
		}
	},
	props: {
		pago: {
			type: Object,
			required: true,
			default() {
				return {
					precioPorPersona: 0,
					personas: [],
					mesPago: ''
				}
			}
		}
	},
	components: {
		PagosAjustes
	},
	created() {
	},
	methods: {
		/**
		 * Método que obtiene el número de personas que han/no han pagado el lokal
		 * ese mes.
		 * 
		 * @param 	{Object} 	pago 					Objeto de la lista de pagos del que 
		 * 																	sacaremos las personas
		 * @param 	{Boolean} pagadoPufero	Si es TRUE, se cuenta la gente que SÍ ha
		 * 																	pagado, si es FALSE, la gente que NO.
		 * 
		 * @returns	{Number} 								Número de personas que [no ]han pagado
		 */
		numeroHanPagado(pago, pagadoPufero) {
			let count = 0;
			pago.personas.map(persona => {
				if (persona.pagado === pagadoPufero) { count++; }
			})
			return count;
		},
		/**
		 * Método que obtiene tanto el dinero que se debe de obtener en ese mes, 
		 * como el dinero que realmente se ha obtenido (de la gente que ha pagado).
		 * 
		 * @param 	{Object} 	pago 					Objeto de la lista de pagos del que 
		 * 																	sacaremos las personas.
		 * @param 	{Boolean} getTotal			Si es TRUE, se cuenta la gente que SÍ ha
		 * 																	pagado, si es FALSE, la gente que NO.
		 * 
		 * @returns	{Number} 								Precio tanto de la gente que ha pagado
		 * 																	tanto el total 'ficticio'.
		 */
 		getTotalSacado(pago, getTotal) {
			if (getTotal) {
				return (pago.precioPorPersona * pago.personas.length).toString();
			}
			let count = 0;
			pago.personas.map(persona => {
				if (persona.pagado) { count += pago.precioPorPersona; }
			})
			return count;
		},
	},
}
</script>