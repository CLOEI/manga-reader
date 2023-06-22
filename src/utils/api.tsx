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
  data: Chapter[] | Chapter,
  limit: number,
  offset: number,
  total: number
}

export type Chapter = {
  id: string,
  type: string,
  attributes: ChapterAttribute,
  relationships: ChapterRelationship[],
}

type ChapterRelationship = {
  id: string
  type: string,
  attributes: {
    availableTranslatedLanguages: string,
    title: { [x: string]: string },
    name: string,
  }
}

type ChapterAttribute = {
  volume: string,
  chapter: string,
  title: string,
  translatedLanguage: string,
  externalUrl: string,
  publishAt: Date,
  readableAt: Date,
  createdAt: Date,
  updatedAt: Date,
  pages: number,
  version: number
}

type MangaStats = {
  result: string,
  statistics: {
    [x: string] : {
      comments: {},
      rating: {
        average: number,
        bayesian: number,
        distribution: { [x: string]: number }
      },
      follows: number,
    }
  }
}

export class API {
  static async getLatestUdates(limit = 32, offset = 0, title = ""): Promise<MangaData> {
    const data = await fetch(`/api/manga?includes[]=cover_art&limit=${limit}&offset=${offset}&title=${title}`)
    return await data.json()
  }
  static getCoverArt(mangaid: string, filename: string, size = 256) {
    return `https://uploads.mangadex.org/covers/${mangaid}/${filename}.${size}.jpg`;
  }
  static async getMangasByIds(id: string[]): Promise<MangaData> {
    const data = await fetch(`/api/manga?includes[]=cover_art&limit=100&ids[]=${id.join("&ids[]=")}`)
    return data.json()
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
  static async getChapter(id: string): Promise<ChapterData> {
    const data = await fetch(`https://api.mangadex.org/chapter/${id}?includes[]=manga`)
    return data.json()
  }
  static async getMangaStats(id: string): Promise<MangaStats> {
    const data = await fetch(`https://api.mangadex.org/statistics/manga/${id}`)
    return data.json()
  }
  static async getChapterImages(chapterId: string) {
    const chapData = await this.getChapter(chapterId);
    const manga = (chapData.data as Chapter).relationships.filter((item) => item.type === 'manga')[0];
    const home = await (await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`)).json();
    return {
      manga, images: home.chapter.data.map((file: string) => `${home.baseUrl}/data/${home.chapter.hash}/${file}`)
    }
  }
}