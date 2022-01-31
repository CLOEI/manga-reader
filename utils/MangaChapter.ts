class MangaChapter {
	id: string;
	createdAt: string;
	title?: string;
	volume?: string;
	chapter?: string;

	constructor(data: any) {
		const { attributes, relationships, id } = data;
		this.id = id;
		this.chapter = attributes.chapter;
		this.title = attributes.title;
		this.createdAt = attributes.createdAt;
		this.volume = attributes.volume;
	}
}

export default MangaChapter;
