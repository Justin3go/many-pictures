<template>
	<div class="many-pictures" ref="mark">
		<div class="container">
			<div class="options">
				<div
					v-for="(item, index) in props.srcImgs"
					class="option"
					:class="{ active: index === defaultActive }"
					:data-img="item.link"
					@click="handleClick(index)"
				>
					<div class="shadow"></div>
					<div class="label">
						<div class="info">
							<div class="main">{{ item.title }}</div>
							<div class="sub">{{ item.description }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<pic-viewer
			v-model="isShowImageViewer"
			:img-link="curImg"
			:z-index="props.config.zIndex"
			@close="reset"
		></pic-viewer>
	</div>
</template>
<script lang="ts">
export default {
	name: "ManyPictures",
};
</script>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import picViewer from "./pic-viewer.vue";
// import { propsI, srcImgsItemI } from "./types/many-pictures";
// vue3 现在还不支持复杂的类型和从其他文件进行类型导入，但我们有计划在将来支持。
// TODO 后续vue支持导入外部文件后这边再切换
interface srcImgsItemI {
	title: string;
	description: string;
	link: string;
}

interface configI {
	height: number; // 图片的高度，默认300px
	noActiveWidth: number; // 未激活图片的宽度，默认50px
	activeWidth: number; // 激活图片的宽度，默认400px
	margin: number; // 每张图片的margin，默认5
	zIndex: number; // 大图展示的层级
}

interface propsI {
	srcImgs: srcImgsItemI[];
	lazy: boolean;
	config: configI;
}

const props = withDefaults(defineProps<propsI>(), {
	config: () => ({
		height: 300,
		noActiveWidth: 50,
		activeWidth: 400,
		margin: 5,
		zIndex: 100,
	}),
	lazy: false,
});
// css属性
const { height, noActiveWidth, activeWidth, margin } = props.config;
const finalHeight = height + margin * 2 + "px";
const finalActiveWidth = activeWidth + "px";
const finalNoActiveWidth = noActiveWidth + "px";
const optionsWidth = (props.srcImgs.length - 1) * (noActiveWidth + 2 * margin) + (activeWidth + 2 * margin) + "px";
// 初始
const mark = ref();
const defaultActive = ref(0);
const isLoad = ref(!props.lazy);
let isShowImageViewer = ref(false);
let prevOverflow = "";
// 图片链接，区分是否懒加载
const curImg = computed((): string => (isLoad.value ? props.srcImgs[defaultActive.value]?.link : ""));
onMounted(() => {
	if (props.lazy) {
		const ioImg = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio <= 0) return;
					const option = entry.target;
					const imgUrl = option.getAttribute("data-img");
					option.setAttribute("style", `background-image: url(${imgUrl})`);
					ioImg.unobserve(option);
				});
			},
			{
				root: mark.value, // 横向懒加载
			}
		);
		const ioContainer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio <= 0) return;
				const container = entry.target;
				const list = container.querySelectorAll(".option");
				list.forEach((item) => {
					ioImg.observe(item);
				});
				isLoad.value = true;
				ioContainer.unobserve(container);
			});
		});
		ioContainer.observe(mark.value);
	} else {
		const list: NodeListOf<Element> = mark.value.querySelectorAll(".option");
		list.forEach((item) => {
			const imgUrl = item.getAttribute("data-img");
			item.setAttribute("style", `background-image: url(${imgUrl})`);
		});
	}
});

function handleClick(index: number) {
	// 如果已激活则浏览大图
	if (isLoad.value && defaultActive.value === index) {
		prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		isShowImageViewer.value = true;
	}
	// 激活
	defaultActive.value = index;
}

function reset() {
	document.body.style.overflow = prevOverflow;
}
</script>
<style lang="scss" scoped>
.many-pictures {
	.container {
		overflow-x: auto;
		width: 100%;
		margin: auto;
		background-color: var(--many-img-bg-color);
		border-radius: 10px;

		.options {
			display: flex;
			flex-direction: row;
			align-items: stretch;
			overflow: hidden;

			min-width: v-bind(optionsWidth);
			max-width: v-bind(optionsWidth);
			width: calc(100%);

			height: v-bind(finalHeight);

			.option {
				position: relative;
				overflow: hidden;

				width: v-bind(finalNoActiveWidth);
				margin: 5px;
				background-size: cover;
				background-position: center;

				cursor: pointer;

				transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95);

				&.active {
					cursor: zoom-in;

					flex-grow: 10000;
					transform: scale(1);

					max-width: v-bind(finalActiveWidth);
					border-radius: 10px;

					background-size: cover;
					background-repeat: no-repeat;
					.shadow {
						box-shadow: inset 0 -80px 80px -80px black, inset 0 -80px 80px -75px black;
					}
					.label {
						bottom: 20px;
						left: 20px;
						.info > div {
							left: 0px;
							opacity: 1;
						}
					}
				}
				&:not(.active) {
					flex-grow: 1;

					border-radius: 10px;
					.shadow {
						bottom: -40px;
						box-shadow: inset 0 -120px 0px -120px black, inset 0 -120px 0px -100px black;
					}
					.label {
						bottom: 10px;
						left: 10px;
						.info > div {
							left: 20px;
							opacity: 0;
						}
					}
				}
				.shadow {
					position: absolute;
					bottom: 0px;
					left: 0px;
					right: 0px;

					height: 120px;

					transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95);
				}
				.label {
					display: flex;
					position: absolute;
					right: 0px;

					height: 40px;
					transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95);
					.info {
						display: flex;
						flex-direction: column;
						justify-content: center;

						margin-left: 10px;

						color: white;

						white-space: pre;
						> div {
							position: relative;

							transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95), opacity 0.5s ease-out;
						}
						.main {
							font-weight: bold;
							font-size: 1.2rem;
						}
						.sub {
							transition-delay: 0.1s;
						}
					}
				}
			}
		}
	}
}
</style>
