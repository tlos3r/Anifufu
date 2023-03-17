import { useState, useEffect } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Anime from "../../../models/Anime";
import request from "../../../service/request";
import LoaderImg from "../../../assets/Spinner-1s-267px.gif";
import { shortenText } from "../../../genreList";
import ViewMoreButton from "../../ViewMoreButton/ViewMoreButton";
function AnimePopular() {
    const [listAnimePopular, setListAnimePopular] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const shortListAnimePopular = listAnimePopular.slice(0, 8);
    useEffect(() => {
        getAnimePopular();
    }, []);
    const getAnimePopular = async () => {
        setIsLoading(true);
        const animePopular = await request.getPopularAnime();
        setListAnimePopular(animePopular);
        setIsLoading(false);
    };
    return (
        <>
            <section>
                <h1 className="pb-5 pl-3 text-4xl font-bold">Anime Popular</h1>
                {isLoading && <img src={LoaderImg} alt="loader img" />}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {listAnimePopular &&
                        shortListAnimePopular.map((listAnime) => {
                            const { animeId, animeTitle, releasedDate, animeImg } = listAnime;
                            return (
                                <div
                                    key={animeId}
                                    className="relative w-3/4 m-3 border-4 border-[#908989] rounded-md border-solid h-5/6"
                                >
                                    <img src={animeImg} className="w-full h-full" />
                                    <div className="absolute bottom-0 inline-block w-full text-center h-fit bg-[#1616169e]">
                                        <b className="p-1 text-xl">{shortenText(animeTitle, 40)}</b>
                                    </div>
                                    <div className="absolute top-0 mt-3 ml-3 bg-gray-600 rounded-md">
                                        <p className="p-2 text-sm ">{releasedDate}</p>
                                    </div>
                                    <div className="absolute top-0 z-[2] w-full h-full flex justify-center items-center bg-[#2f2c2c99] transition-opacity delay-100 opacity-0 hover:opacity-100">
                                        <Link to={`/details/${animeId}`}>
                                            <AiOutlinePlayCircle size={60} color="white" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                </section>

                <ViewMoreButton param="popular" />
            </section>
        </>
    );
}

export default AnimePopular;
