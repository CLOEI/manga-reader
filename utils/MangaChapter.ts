class MangaChapter {
	id: string;
	attributes: { [x: string]: string };
	relationships: [{ [x: string]: string }];

	constructor(data: any) {
		this.id = data.id;
		this.attributes = data.attributes;
		this.relationships = data.relationships;
	}

	get title() {
		return `Vol. ${this.attributes.volume || '?'} Ch. ${this.attributes.chapter}`;
	}
	mangaID() {
		return this.relationships.filter((obj) => obj.type === 'manga')[0].id;
	}
}

export default MangaChapter;
