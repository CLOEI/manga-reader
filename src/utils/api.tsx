export type MangaData = {
  data: Manga[],
  limit: number,
  offset: number,
  response: string,
  total: number
}

export type Manga = {
  attributes: MangaAttribute,
  id: string,
  relationships: MangaRelationship[],
  type: string,
}

type MangaAttribute = {
  altTitles: {},
  availableTranslatedLanguages: {},
  chapterNumbersResetOnNewVolume: boolean,
  contentRating: string,
  createdAt: Date,
  description: { [x: string]: string },
  isLocked: boolean,
  lastChapter: string,
  lastVolume: string,
  latestUploadedChapter: string,
  links: {},
  originalLanguage: string,
  publicationDemographic: {},
  state: string,
  status: string,
  tags: Tag[],
  title: { [x: string]: string },
  updatedAt: Date,
  version: number,
  year: number,
}

type Tag = {
  attributes: TagAttribute,
  id: string,
  relationships: [], 
}

type TagAttribute = {
  name: { [x: string]: string },
  group: string,
  description: string,
  version: number,
}

type MangaRelationship = {
  id: string,
  type: string,
  attributes?: {
    name: string,
    createdAt: Date,
    description: string,
    fileName: string,
    locale: string,
    updatedAt: Date,
    version: number,
    volume: {}
  }
}

type ChapterData = {
  result: string,
  response: string,
  data: Chapter[],
  limit: number,
  offset: number,
  total: number
}

type Chapter = {
  id: string,
  type: string,
  attributes: ChapterAttribute,
  relationships: [],
}

type ChapterAttribute = {
  volume: string,
  chapter: string,
  title: string,
  translatedLanguage: string,
  externalUrl: {},
  publishAt: Date,
  readableAt: Date,
  createdAt: Date,
  updatedAt: Date,
  pages: number,
  version: number
}

export class API {
  static async getLatestUdates(limit = 32, offset = 0): Promise<MangaData> {
    const data = await fetch(`/api/manga?includes[]=cover_art&limit=${limit}&offset=${offset}`)
    return await data.json()
  }
  static getCoverArt(mangaid: string, filename: string, size = 256) {
    return `https://uploads.mangadex.org/covers/${mangaid}/${filename}.${size}.jpg`;
  }
  // Server only
  static async getManga(id: string): Promise<Manga> {
    const data = await fetch(`https://api.mangadex.org/manga/${id}?includes[]=cover_art&includes[]=author`);
    return (await data.json()).data
  }
  static async getChapters(id: string, offset: number): Promise<ChapterData> {
    const data = await fetch(`https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=en&order[volume]=desc&order[chapter]=desc&offset=${100 * (offset - 1)}`)
    return data.json()
  }
 }