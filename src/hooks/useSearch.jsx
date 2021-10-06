import { useState, useEffect } from 'react';

export default function useSearch(name, data) {
	const [favMangas, setFavMangas] = useState(null);

	useEffect(() => {
		const abortCont = new AbortController();
		if (data) {
			let query = '';
			if (data.length > 1) {
				for (let x = 1; x < data.length; x++) {
					query += `&ids[]=${data[x]}`;
				}
			}
			fetch(`/api/manga?ids[]=${data[0]}${query}`, { signal: abortCont.signal })
				.then((res) => res.json())
				.then((data) => {
					const newData = data.data.filter((val) => {
						const title = val.attributes.title[Object.keys(val.attributes.title)[0]];
						return title.toLowerCase().includes(name.toLowerCase());
					});
					data.data = newData;
					setFavMangas(data);
				})
				.catch((err) => {
					if (err.name === 'AbortError') return;
				});
		}

		return () => abortCont.abort();
	}, [name]);

	return favMangas;
}
