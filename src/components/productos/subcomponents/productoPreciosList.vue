<template>
	<div class="producto-precios-list">
		<span v-if="producto.venta" class="caption">
			{{ producto.venta }}
			<v-icon small color="success">mdi-arrow-up-thin</v-icon>
		</span>
		<span class="caption producto-precios-list-profit justify-self-start">
			<v-icon class="mr-2" small>mdi-currency-eur</v-icon>
			<b :class="{ 'error--text': producto.profit < 0, 'success--text': producto.profit > 0 }">
				{{ producto.profit | dosdecimales }}
			</b>
		</span>
		<span class="caption">
			{{ producto.precio }}
			<v-icon small color="error">mdi-arrow-down-thin</v-icon>
		</span>
	</div>
</template>

<script>
export default {
	name: 'ProductoPreciosList',
	props: {
		producto: {
			type: Object,
			required: true,
			deault: {
				venta: 0,
				precio: 0,
				profit: 0
			}
		}
	},
	computed: {
		profitColor() {
			if (this.producto.profit > 0) { return { class: 'text--error' } }
			return { class: 'success--text'}
		}
	}
}
</script>