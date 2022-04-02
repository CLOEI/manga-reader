import { useState } from 'react';

function useLocalStorage(key, initialValue) {
	const [data, setData] = useState(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}
		try {
			const value = window.localStorage.getItem(key);
			return value ? JSON.parse(value) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(data) : value;
			setData(valueToStore);

			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return [data, setValue];
}

export default useLocalStorage;
