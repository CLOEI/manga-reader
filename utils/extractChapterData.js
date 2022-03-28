function extractChapterData(data) {
	const { id, attributes, relationships } = data;
	const { chapter, volume, title } = attributes;

	return {
		id,
		chapter,
		volume,
		title,
	};
}

export default extractChapterData;
