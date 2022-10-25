/** props */
export interface srcImgsItemI {
  title: string;
  description: string;
  link: string;
}

export interface configI {
  height: number; // 图片的高度，默认300px
  noActiveWidth: number; // 未激活图片的宽度，默认50px
  activeWidth: number;  // 激活图片的宽度，默认400px
  margin: number;  // 每张图片的margin，默认5
}

export interface propsI {
  srcImgs: srcImgsItemI[];
  lazy: boolean;
  config: configI;
}
