import useSWR from 'swr';

import Chapter from './Chapter';
import Pagination from './Pagination';

import extractChapterData from '../utils/extractChapterData';

function ChapterList({ id, pageIndex, language, setIndex }) {
	const { data: chapterList, error } = useSWR(
		`/api/chapter?manga=${id}&translatedLanguage[]=${language}&order[volume]=desc&order[chapter]=desc&includes[]=scanlation_group&offset=${
			pageIndex * 10
		}`
	);

	if (error) {
		console.log(error);
	}

	return (
		<>
			<h2 className="text-high mb-2">
				Chapters : {chapterList ? chapterList.total : 0}
			</h2>
			{chapterList && (
				<>
					{chapterList.data.map((data) => {
						const chapterData = extractChapterData(data);
						return <Chapter data={chapterData} key={chapterData.id} />;
					})}
					<Pagination totalPage={chapterList.total} onClick={setIndex} />
				</>
			)}
		</>
	);
}

export default ChapterList;
