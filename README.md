# many-pictures

## 前言

​	`many-pictures`是一个基于`vue3`的小组件，主要是自己在使用`vitepress`开发个人博客时，不仅仅只想分享技术文章，同样自己也有拍照的爱好，想要将自己平常拍摄的照片分享在个人博客中，但是一般来说图片较多，我自己也没找到合适的容器去容纳组件这些大量的图片，所以就自己开发了一个`vue3`小组件满足我这个需求，顺便就封装发布了出来，希望对大家也有所帮助。

## 功能

+ 支持不同数量的图片容纳
+ 支持大图预览
+ 支持自适应懒加载（横向竖向滚动，通过`IntersectionObserver`api实现，有兼容问题的话请设置`lazy: false`）

具体效果可以参考下面的图片或者直接点开我的[个人博客/图集](https://justin3go.com/%E5%9B%BE%E9%9B%86/%E6%A0%A1%E5%9B%AD.html)中查看

![demo-many-pictures](https://oss.justin3go.com/blogs/demo-many-pictures.gif)

![image-20221030220010738](https://oss.justin3go.com/blogs/image-20221030220010738.png)

![image-20221030220031914](https://oss.justin3go.com/blogs/image-20221030220031914.png)

![image-20221030220050169](https://oss.justin3go.com/blogs/image-20221030220050169.png)

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

背景图的颜色我也暴露了出来：

```css
--many-img-bg-color
// 背景颜色使用的是上述变量，你可以在:root中定义该变量
// 比如在vitepress中想要兼容切换明暗模式就这样 
```

![image-20221030221955576](https://oss.justin3go.com/blogs/image-20221030221955576.png)

## TODO 

- 优化多个组件同时显示造成的卡顿
- 增加loading动画或者骨架图优化体验

## 感谢

主要思路参考自该链接https://codepen.io/z-/pen/OBPJKK