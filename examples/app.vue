<template>
	<div class="demo" style="height: 900px"></div>
	<div>
		<many-pictures :srcImgs="beijing[0]" :lazy="false" />
		<many-pictures :srcImgs="beijing[1]" :lazy="true" />
		<many-pictures :srcImgs="beijing[2]" :lazy="true" />
	</div>
</template>
<script lang="ts" setup>
// 返回补位0序号
function numGenerator(max: number, width: number): string[] {
	const res: string[] = [];
	for (let i = 1; i <= max; i++) {
		const item = i.toString();
		const sub = width - item.length;
		if (sub > 0) {
			res.push(`${"0".repeat(sub)}${item}`);
		}
	}
	return res;
}

const baseURL = "https://oss.justin3go.com/摄影/";
const beijing = [
	numGenerator(4, 3).map((item) => ({
		title: "八达岭",
		description: "八达岭长城+熊",
		link: `${baseURL}北京/北京_八达岭${item}.jpg`,
	})),
	numGenerator(15, 3).map((item) => ({
		title: "八达岭",
		description: "故宫和天安门...",
		link: `${baseURL}北京/北京_故宫${item}.jpg`,
	})),
  numGenerator(1, 3).map((item) => ({
		title: "八达岭",
		description: "八达岭长城+熊",
		link: `${baseURL}北京/北京_故宫${item}.jpg`,
	})),
];
console.log(beijing);

</script>
