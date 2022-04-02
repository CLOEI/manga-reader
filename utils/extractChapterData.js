function extractChapterData(data, PREFFERED_LANG = 'en') {
	const { id, attributes, relationships } = data;
	const { chapter, volume, title } = attributes;
	const manga = relationships.filter((item) => item.type === 'manga')[0];
	const mangaAvailLang = manga?.attributes?.availableTranslatedLanguages;
	const mangaTitleObj = manga?.attributes?.title;

	const mangaTitle =
		mangaAvailLang &&
		(mangaAvailLang.indexOf(PREFFERED_LANG) > -1
			? mangaTitleObj[PREFFERED_LANG]
			: mangaTitleObj[Object.keys(titleObj)[0]]);

	return {
		id,
		chapter,
		volume,
		title,
		mangaTitle,
	};
}

export default extractChapterData;
