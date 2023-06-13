import axios from "axios";
class Request {
    request = axios.create({
        baseURL: "https://webdis-vdym.onrender.com/",
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
            window.location.href = "/404notfound";
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
            window.location.href = "/404notfound";
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
            window.location.href = "/404notfound";
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
            window.location.href = "/404notfound";
        }
    }
    async getAnimeSearch(keyw: string | undefined) {
        try {
            const response = await this.request.get(`search?keyw=${keyw}`);
            return response.data;
        } catch (error) {
            console.error(error);
            window.location.href = "/404notfound";
        }
    }

    async getAnimeDetails(animeId: string | undefined) {
        try {
            const response = await this.request.get(`anime-details/${animeId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            window.location.href = "/404notfound";
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
            window.location.href = "/404notfound";
        }
    }
}

export default new Request();
