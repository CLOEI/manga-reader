function extractData(manga, PREFFERED_LANG) {
	const { attributes, id, relationships } = manga.data;
	const {
		availableTranslatedLanguages,
		status,
		tags,
		description,
		title: titleObj,
	} = attributes;

	const { title, desc } =
		availableTranslatedLanguages.indexOf(PREFFERED_LANG) > -1
			? {
					title: titleObj[PREFFERED_LANG],
					desc: description[PREFFERED_LANG],
			  }
			: {
					title: titleObj[Object.keys(titleObj)[0]],
					desc: description[Object.keys(description)[0]],
			  };
	const fileName = relationships.filter((item) => item.type === 'cover_art')[0]
		.attributes.fileName;
	const author = relationships.filter((item) => item.type === 'author')[0]
		.attributes.name;
	const coverURL = `https://uploads.mangadex.org/covers/${id}/${fileName}`;

	return {
		title,
		desc,
		author,
		status,
		tags,
		coverURL,
		id,
		availableTranslatedLanguages,
		language:
			availableTranslatedLanguages.indexOf(PREFFERED_LANG) > -1
				? PREFFERED_LANG
				: availableTranslatedLanguages[0],
	};
}

export default extractData;
