export interface propsI {
  imgLink: string;
  modelValue: boolean;
}

export interface emitsI {
  (e: 'close'): void;
  (e: 'open'): void;
  (e: 'update:modelValue', newVal: boolean): void;
}
