<template>
	<div v-show="modelValue" class="pic-viewer">
		<svg id="svg-blur">
			<filter id="blur">
				<feGaussianBlur stdDeviation="100"></feGaussianBlur>
			</filter>
		</svg>
		<div id="background" :style="{ backgroundImage: `url(${props.imgLink})` }" @click="close"></div>
		<img :src="props.imgLink" id="main-image" />
	</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

interface propsI {
	imgLink: string;
	modelValue: boolean;
	zIndex: number;
}

interface emitsI {
	(e: "close"): void;
	(e: "open"): void;
	(e: "update:modelValue", newVal: boolean): void;
}

const props = defineProps<propsI>();
const emit = defineEmits<emitsI>();
const zIndex = props.zIndex;
const zIndexPlus = props.zIndex + 1;

const modelValue = computed({
	get: (): boolean => props.modelValue,
	set: (newVal) => {
		emit("update:modelValue", newVal);
		if (newVal) {
			emit("open");
		} else {
			emit("close");
		}
	},
});

function close() {
	modelValue.value = false;
}
</script>
<style lang="scss" scoped>
.pic-viewer {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: v-bind(zIndex);
}
#background {
	cursor: zoom-out;

	position: fixed;
	left: 0;
	top: 0;
	z-index: v-bind(zIndex);
	height: 100%;
	width: 100%;

	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover;

	-webkit-filter: blur(100px);
	-moz-filter: blur(100px);
	-o-filter: blur(100px);
	-ms-filter: blur(100px);
	filter: blur(100px);
	filter: url(#blur);
	filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='100');
}

#svg-blur {
	height: 0;
}

#main-image {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	/* width: 80vw; */
	height: 80vh;
	z-index: v-bind(zIndexPlus);
}
</style>
