import AnimeMovie from "./AnimeMovie/AnimeMovie";
import AnimePopular from "./AnimePopular/AnimePopular";
import AnimeRecentEp from "./AnimeRecentEp/AnimeRecentEp";
import AnimeTopAiring from "./AnimeTopAiring/AnimeTopAiring";

function Anime() {
    return (
        <section className="container flex flex-col justify-between sm:justify-center sm:flex-col md:flex-row ">
            <div className="w-3/4">
                <AnimeRecentEp />
            </div>
            <div className="w-1/4">
                <AnimeTopAiring />
            </div>
        </section>
    );
}

export default Anime;
