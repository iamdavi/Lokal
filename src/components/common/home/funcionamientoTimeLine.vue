<template>
	<v-timeline dense class="left-time-line">
		<time-line-item 
			v-for="(paso, index) in stepsInfo"
			:key="index"
			:paso="paso"	
			:imagen="pasoUno"
			class="py-5"
		/>
	</v-timeline>
</template>

<script>
import timeLineItem from '@/components/common/home/timeLineItem'
import comofunciona from "@/data/comofunciona.json"

export default {
	name: 'funcionamientoTimeLine',
	data() {
		return {
			stepsInfo: comofunciona,
			pasoUno: require('@/assets/img/home/paso1.jpg'),
		}
	},
	components: {
		timeLineItem
	}
}
</script>

<style>
.left-time-line::before {
	left: calc(12px - 1px) !important;
}
.v-timeline-item__divider {
	min-width: 12px;
	justify-content: flex-start;
	align-items: flex-start;
}
.v-timeline-item {
	justify-content: space-between;
}
.v-timeline--dense .v-timeline-item__body {
  max-width: calc(100% - 32px);
}
.v-timeline:before {
	height: 100% !important;
	bottom: 0 !important;
	top: unset;
}
</style>