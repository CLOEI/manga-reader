class Manga {
	static locale: string = 'en'; // Default to EN
	availableLocales: string[] = [];
	id: string;
	originalLanguage: string;
	tags: Object[];
	status: string;
	description: { [x: string]: string };
	fileName: string | undefined;

	constructor(manga: IManga) {
		const { attributes, relationships } = manga;
		this.id = manga.id;
		this.originalLanguage = attributes.originalLanguage;
		this.tags = attributes.tags.map((tag) => tag.attributes.name[Manga.locale]);
		this.status = attributes.status;
		this.description = attributes.description;
		this.availableLocales = Object.keys(attributes.title);
		this.fileName = relationships.filter(
			(item) => item.type === 'cover_art'
		)[0].attributes?.fileName;
		this.author = relationships.filter(
			(item) => item.type === 'author'
		)[0].attributes?.name;

		for (let item in attributes.title) this[item] = attributes.title[item];
	}

	get title() {
		if (Manga.locale in this) return this[Manga.locale];
		for (let item in this.availableLocales) if (item in this) return this[item];
		return null;
	}
	get desc() {
		if (Manga.locale in this.description) return this.description[Manga.locale];
		for (let item in this.availableLocales)
			if (item in this.description) return this[item];
		return null;
	}

	[key: string]: any;
}

export default Manga;
