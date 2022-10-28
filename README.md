# many-pictures

## 前言

​	`many-pictures`是一个基于`vue3`的小组件，主要是自己在使用`vitepress`开发个人博客时，不仅仅只想分享技术文章，同样自己也有拍照的爱好，想要将自己平常拍摄的照片分享在个人博客中，但是一般来说图片较多，我自己也没找到合适的容器去容纳组件这些大量的图片，所以就自己开发了一个`vue3`小组件满足我这个需求，顺便就封装发布了出来，希望对大家也有所帮助。

## 功能

+ 支持不同数量的图片容纳
+ 支持大图预览
+ 支持懒加载

具体效果可以参考下面的图片或者直接点开我的个人博客/图集中查看

![ScreenRecorderProject1](C:\Users\21974\Desktop\ScreenRecorderProject1.gif)

<img src="https://oss.justin3go.com/photography/image-20221026171605581.png" alt="image-20221026171605581" style="zoom:67%;" />

<img src="https://oss.justin3go.com/photography/image-20221026171632239.png" alt="image-20221026171632239" style="zoom: 67%;" />

<img src="https://oss.justin3go.com/photography/image-20221026171712830.png" alt="image-20221026171712830" style="zoom: 33%;" />

## 使用

### 安装

```shell
npm i many-pictures
yarn add many-pictures
pnpm i many-pictures
```

### Vue3 

step1：在`main.ts`里面导入并使用

```ts
// main.ts
import 'many-pictures/es/style.css'
import manyPictures from 'many-pictures';
// ... other code
app.use(manyPictures);
```

step2：在某个vue组件中使用该组件

```vue
// XXX.vue
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
```

### Vitepress

本组件的初衷就是为了在`vitepress`中使用，`vitepress`支持使用`vue`编写的组件，所以这里简单介绍一下在`vitepress`中如何使用该组件，基本和上面`vue3`的使用一致。

```js
// docs/.vitepress/theme/index.js
// ...other code
// many-pictures
import 'many-pictures/es/style.css'
import manyPictures from 'many-pictures';

export default {
	// other code...
  enhanceApp({ app, router, siteData }) {
    // 注册组件
    app.use(manyPictures); // many-pictures
  },
};
```

然后在任意一个你要使用的该组件的`markdown`文件中直接使用该组件就可以了[更多参考](https://vitepress.vuejs.org/guide/using-vue)

```md
<script setup>
import { useData } from 'vitepress'
const base = 'https://oss.justin3go.com/photography/'
const srcImgs = [
  {
    title: '故宫',
    description: 'some description',
    link: `${base}47d03d9595af438bf63faad67d87e09.jpg`
  },
  {
    title: '故宫',
    description: 'some description',
    link: `${base}47f61b6a606c72122399861b7cb523e.jpg`
  },
  {
    title: '故宫',
    description: 'some description',
    link: `${base}596496e209caf88d1580a1e27779728.jpg`
  },
  {
    title: '故宫',
    description: 'some description',
    link: `${base}799af92418066c549c0b6103fc7bf83.jpg`
  },
  {
    title: '故宫',
    description: 'some description',
    link: `${base}97282cb511d990137566527350c01e9.jpg`
  },
  {
    title: '故宫',
    description: 'some description',
    link: `${base}9c01f6f36fad0f3ba9f68c9f0bdb8f1.jpg`
  },
]

</script>

<many-pictures :srcImgs='srcImgs' :lazy='false' />
```

### 相关配置

在该组件中，我暴露了可能需要自定义的属性出来，具体如下：

```ts
// 组件支持定义的属性
interface propsI {
	srcImgs: srcImgsItemI[];
	lazy: boolean;  // 默认false
	config: configI;
}

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
	zIndex: number; // 大图展示的层级 默认背景为100，展示的图片为zIndex+1
}
```

## 感谢

主要思路参考自该链接https://codepen.io/z-/pen/OBPJKK