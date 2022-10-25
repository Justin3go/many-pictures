export function throttle(fn: Function, wait: number) {
	let timeout: null | number = null;
	return function () {
		let args = [...arguments];
		if (!timeout) {
			timeout = setTimeout(() => {
				fn(args);
				timeout = null;
			}, wait);
		}
	};
}

export { default as withInstall } from "./withinstall"
