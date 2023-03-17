import axios from "axios";

class Request {
    request = axios.create({
        baseURL: "https://gogoanime.consumet.stream/",
    });

    async getRecentEpisodes(p?: number, type?: number) {
        try {
            const response = await this.request.get("recent-release", {
                params: {
                    page: p,
                    type,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getTopAiring(p?: number) {
        try {
            const response = await this.request.get(`top-airing`, {
                params: {
                    page: p,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getPopularAnime(p?: number | undefined) {
        try {
            const response = await this.request.get("popular", {
                params: {
                    page: p,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAnimeGenres(genre: string | undefined, p?: number) {
        try {
            const response = await this.request.get(`genre/${genre}`, {
                params: {
                    page: p,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    async getAnimeSearch(keyw: string | undefined) {
        try {
            const response = await this.request.get(`search?keyw=${keyw}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAnimeDetails(animeId: string | undefined) {
        try {
            const response = await this.request.get(`anime-details/${animeId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAnimeMovie(aph?: string, page?: number) {
        try {
            const response = await this.request.get("anime-movies/", {
                params: {
                    aph,
                    page,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new Request();
