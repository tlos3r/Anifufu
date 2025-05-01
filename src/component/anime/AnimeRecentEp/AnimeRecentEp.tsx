import { useState, useEffect } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AnimeResponse } from "../../../models/Anime";
import request from "../../../service/request";
import { shortenText } from "../../../genreList";
import ViewMoreButton from "../../ViewMoreButton/ViewMoreButton";
import SkeletonLoading from "../../loader/SkeletonLoading";
function AnimeRecentEp() {
    const [listAnimeRecentEp, setListAnimeRecentEp] = useState<AnimeResponse>();
    const [isLoading, setIsLoading] = useState(false);

    // const shortListAnimeRecentEp = listAnimeRecentEp.slice(0, 8);
    useEffect(() => {
        getAnimeRecentEpisode();
    }, []);
    const getAnimeRecentEpisode = async () => {
        setIsLoading(true);
        const animeRecentEpisode = await request.getRecentEpisodes();
        setListAnimeRecentEp(animeRecentEpisode);
        setIsLoading(false);
    };

    return (
        <section>
            <h1 className="py-5 text-4xl font-bold">Recent Update</h1>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {isLoading &&
                    Array(8)
                        .fill(0)
                        .map((item, index) => {
                            return (
                                <div key={index} className="relative w-3/4 m-3 border-4 h-5/6">
                                    <SkeletonLoading className="w-full h-72"></SkeletonLoading>
                                </div>
                            );
                        })}
                {listAnimeRecentEp &&
                    listAnimeRecentEp.results.map((listAnime) => {
                        const { id, japaneseTitle, image, episodes, nsfw } = listAnime;
                        return (
                            <div
                                key={id}
                                className="relative w-3/4 m-3 border-4 border-[#908989] rounded-md border-solid h-5/6"
                            >
                                <img src={image} className="w-full h-full" />
                                <div className="absolute bottom-0 inline-block w-full text-center h-fit bg-[#1616169e]">
                                    <b className="p-1 text-xl">{shortenText(japaneseTitle, 40)}</b>
                                </div>
                                <div className="absolute top-0 mt-3 ml-3 bg-gray-600 rounded-md">
                                    <p className="p-2 text-sm ">{episodes === 0 ? `Unreleased` : `Ep: ${episodes}`}</p>
                                </div>
                                {nsfw ? (
                                    <div className="absolute top-0 right-0 mt-3 mr-3 bg-red-600 rounded-md">
                                        <p className="p-2 text-sm ">NSFW</p>
                                    </div>
                                ) : null}
                                <div className="absolute top-0 z-[2] w-full h-full flex justify-center items-center bg-[#2f2c2c99] transition-opacity delay-100 opacity-0 hover:opacity-100">
                                    <Link to={`/details/${id}`}>
                                        <AiOutlinePlayCircle size={60} color="white" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </section>
            <ViewMoreButton param="recent-update" />
        </section>
    );
}

export default AnimeRecentEp;
