import { useState, useEffect } from "react";
import Anime from "../../models/Anime";
import request from "../../service/request";
import { shortenText } from "../../genreList";
import { Link } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import Pagination from "../../component/Pagination/Pagination";
import Loader from "../../component/loader/Loader";
function Popular() {
    const [pages, setPages] = useState(1);
    const [listAnimePopular, setListAnimePopular] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getAnimePopular();
    }, [pages]);
    const getAnimePopular = async () => {
        setIsLoading(true);
        const animePopular = await request.getPopularAnime(pages);
        setListAnimePopular(animePopular);
        setIsLoading(false);
    };
    return (
        <>
            <section>
                <h1 className="pb-5 pl-3 text-4xl font-bold">Anime Popular</h1>
                {isLoading && <Loader />}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {listAnimePopular.map((listAnime) => {
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
                                    <Link to={`/details/${animeId}`} target="_blank">
                                        <AiOutlinePlayCircle size={60} color="white" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </section>
            <Pagination pageCount={504} setPage={setPages} />
        </>
    );
}

export default Popular;
