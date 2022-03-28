function debounce(fn, ms) {
	let timer;
	return (...args) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, ms);
	};
}

export default debounce;
