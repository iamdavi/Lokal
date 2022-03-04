<template>
	<v-card color="blue lighten-4">
    <v-form @submit.prevent="guardarFormulario(nombre)" v-model="valid">
			<v-card-title>
				<span class="text-h5">Crear persona</span>
			</v-card-title>
			<v-card-text>
				<v-row>
					<v-col md="9" cols="12">
						<v-text-field
							v-model="nombre"
							label="Nombre"
							clearable
						></v-text-field>
					</v-col>
					<v-col md="3" cols="12" class="text-center">
						<v-btn 
							class="primary" 
							type="submit"
							:block="windowWidth < 960"
						>Añadir</v-btn>
					</v-col>
				</v-row>
			</v-card-text>
		</v-form>
	</v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	data() {
		return {
			nombre: '',
			valid: true,
      windowWidth: window.innerWidth,
		}
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener('resize', this.onResize);
		})
	},
	beforeDestroy() { 
		window.removeEventListener('resize', this.onResize); 
	},
	methods: {
		...mapActions(['agregarPersona']),
		onResize() {
			this.windowWidth = window.innerWidth
		},
		guardarFormulario(nombre) {
			this.agregarPersona(nombre)
			this.nombre = ''
		}

	}
}
</script>