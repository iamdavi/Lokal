<template>
	<v-timeline-item small>
		<v-row>
			<v-col cols="12" md="2" class="pb-0">
				<span class="text-subtitle-1 d-block">
					{{ paso.titulo }}
				</span>
				<span class="text-subtitle-2 d-block text-uppercase">
					{{ paso.subTitulo }}
				</span>
			</v-col>
			<v-col cols="12" md="8">
				<p class="mb-0">{{ paso.texto }}</p>
			</v-col>
			<v-col cols="12" md="2">
				<v-btn outlined color="primary" :to="paso.to" class="vertical-button">
					<v-icon>{{ paso.icon }}</v-icon> 
					{{ paso .titulo }}
				</v-btn>
			</v-col>
		</v-row>
	</v-timeline-item>
</template>

<script>
export default {
	name: "TimeLineItem",
	props: {
		paso: {
			type: Object,
			required: true,
			default: {}
		},
		imagen: {
			type: String,
			required: true,
			default: ""
		}
	}
}
</script>

<style>
.vertical-button span{
	display: flex;
	flex-direction: column !important;
}
.vertical-button {
	padding: 26px 8px !important;
	min-width: 124px !important;
}

@media (max-width: 959px) {
	.vertical-button {
		width: 100%;
	}
}
</style>