export default interface Anime {
    animeId: string;
    animeImg: string;
    animeTitle: string;
    animeUrl: string;
    genres: string[];
    releasedDate: string;
    episodeId: string;
    episodeNum: string;
    episodeUrl: string;
    latestEp: string;
    status: string;
    details: [];
}

export interface AnimeDetails {
    otherNames: string[];
    animeImg: string;
    animeTitle: string;
    synopsis: string;
    genres: string[];
    releasedDate: string;
    status: string;
    totalEpisodes: string;
    type: string;
    episodesList: { episodeId: string; episodeNum: string; episodeUrl: string }[];
}

export interface VideoStreamResponse {
    Referer: string;
    sources: { file: string; label: string; type: string }[];
    sources_bk: { file: string; label: string; type: string }[];
}
