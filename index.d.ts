declare class Manga {
	static locale: string;
	availableLocales: string[];
	id: string;
	originalLanguage: string;
	tags: Object[];
	status: string;
	description: { [x: string]: string };
	fileName: string | undefined;
	author?: string | undefined;

	constructor(context: { [x: string]: string });

	get title(): string;
	get desc(): string;
}

declare class MangaChapters {
	id: string;
	createdAt: string;
	title?: string;
	volume?: string;
	chapter?: string;
	constructor(data: any);
}

interface IManga {
	id: string;
	type: string;
	attributes: {
		title: { [x: string]: string };
		altTitles: Object[];
		description: { [x: string]: string };
		isLocked: boolean;
		links: Object;
		originalLanguage: string;
		lastVolume: string;
		lastChapter: string;
		publicationDemographic: 'shounen' | 'shoujo' | 'josei' | 'seinen';
		status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
		contentRating: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
		tags: Tag[];
	};
	relationships: Relation[];
}

type tag = {
	attributes: {
		name: Object;
	};
};

type Relation = {
	attributes?: {
		name?: string;
		createdAt: Date;
		description: string;
		fileName: string;
		updatedAt: string;
		version: number;
		volume: number;
	};
	id: string;
	type:
		| 'manga'
		| 'chapter'
		| 'cover_art'
		| 'author'
		| 'artist'
		| 'scanlation_group'
		| 'tag'
		| 'user'
		| 'custom_list';
};

interface IMangaList {
	data: Array<IManga>;
	limit: number;
	offset: number;
	response: string;
	result: string;
	total: number;
}

interface IMangaData extends IMangaList {
	data: IManga;
}
