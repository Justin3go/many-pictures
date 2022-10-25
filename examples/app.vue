<template>
	<div>
		<many-pictures :srcImgs="srcImgs" :lazy="true" />
	</div>
</template>
<script lang="ts" setup>
// import manyPictures from "many-pictures";
import { reactive } from "vue";

const base = "https://oss.justin3go.com/photography/";
const srcImgs = reactive([
	{
		title: "故宫",
		description: "some description",
		link: `${base}47d03d9595af438bf63faad67d87e09.jpg`,
	},
	{
		title: "故宫",
		description: "some description",
		link: `${base}47f61b6a606c72122399861b7cb523e.jpg`,
	},
	{
		title: "故宫",
		description: "some description",
		link: `${base}596496e209caf88d1580a1e27779728.jpg`,
	},
	{
		title: "故宫",
		description: "some description",
		link: `${base}799af92418066c549c0b6103fc7bf83.jpg`,
	},
	{
		title: "故宫",
		description: "some description",
		link: `${base}97282cb511d990137566527350c01e9.jpg`,
	},
	{
		title: "故宫",
		description: "some description",
		link: `${base}9c01f6f36fad0f3ba9f68c9f0bdb8f1.jpg`,
	},
]);
</script>
