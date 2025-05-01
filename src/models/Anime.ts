export default interface Anime {
    id: string;
    title: string;
    url: string;
    image: string;
    duration: string;
    watchList: string;
    japaneseTitle: string;
    type: string;
    nsfw: boolean;
    sub: number;
    dub: number;
    episodes: number;
}

export interface AnimeDetails {
    id: string;
    title: string;
    malID: number;
    alID: number;
    japaneseTitle: string;
    image: string;
    description: string;
    type: string;
    url: string;
    recommendations: Anime[];
    relatedAnime: Anime[];
    subOrDub: string;
    hasSub: boolean;
    genres: string[];
    status: string;
    season: string;
    totalEpisodes: number;
    episodes: {
        id: string;
        number: number;
        title: string;
        isFiller: boolean;
        isSubbed: boolean;
        isDubbed: boolean;
        url: string;
    }[];
}
export interface VideoStreamResponse {
    Referer: string;
    sources: { file: string; label: string; type: string }[];
    sources_bk: { file: string; label: string; type: string }[];
}

export interface AnimeResponse {
    currentPage: number;
    hasNextPage: boolean;
    totalPages: number;
    results: Anime[];
}
