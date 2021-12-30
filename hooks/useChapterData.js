import useSWRInfinite from 'swr/infinite';

// better than recursive request?

const fetcher = (offset, id) =>
	fetch(
		`/api/chapter?manga=${id}&offset=${
			offset * 100
		}&limit=100&translatedLanguage[]=en&includes[]=scanlation_group`
	).then((res) => res.json());

const useChapterData = (id, onlyTotal = false) => {
	const { data, size, setSize, error } = useSWRInfinite(
		(offset, previousData) => {
			if (previousData && !previousData.data) return null;

			return [offset, id];
		},
		fetcher
	);

	let total = 0;

	if (data) {
		try {
			total = data[0].total;
			if (onlyTotal) return { total };
			const currTotal = data.reduce((pre, curr) => {
				return pre + curr.data.length;
			}, 0);

			if (parseInt(total, 10) > currTotal) {
				setSize(size + 1);
			} else if (currTotal === parseInt(total, 10)) {
				return { data, total, error };
			}
		} catch (err) {
			return { data, total, error };
		}
	}

	return { data: null, total, error };
};

export default useChapterData;
