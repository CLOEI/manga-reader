import useSWR from 'swr';

function ChapterList(index) {
	const { data, error } = useSWR(
		`/api/chapter?manga=${id}&translatedLanguage[]=${language}&offset=${
			pageIndex * 10
		}`
	);
	return <div>ChapterList : {index}</div>;
}

export default ChapterList;
