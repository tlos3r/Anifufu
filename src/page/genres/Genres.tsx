import { Link, useParams } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import request from "../../service/request";
import { useState, useEffect } from "react";
import Anime from "../../models/Anime";
import Loader from "../../component/loader/Loader";
import Pagination from "../../component/Pagination/Pagination";
function Genres() {
    const [page, setPage] = useState(1);
    const [listAnimeGenres, setListAnimeGenres] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { genre } = useParams();
    useEffect(() => {
        loadAnimeGenres();
    }, [genre, page]);

    const loadAnimeGenres = async () => {
        setIsLoading(true);
        const res = await request.getAnimeGenres(genre, page);
        setListAnimeGenres(res);
        setIsLoading(false);
    };
    const replaceSpeacial = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1).replaceAll("-", " ");
    };
    return (
        <>
            {isLoading && <Loader />}
            <h1 className="pb-4 text-4xl font-bold text-center">List of {replaceSpeacial(genre as string)}</h1>
            <hr className="h-1 text-gray-700 bg-gray-700 border-0" />
            <section className="container grid grid-cols-4 mt-4 place-items-center ">
                {listAnimeGenres.length >= 0 &&
                    listAnimeGenres.map((listAnime) => {
                        const { animeId, animeTitle, releasedDate, animeImg } = listAnime;
                        return (
                            <div
                                key={animeId}
                                className="relative w-3/4 m-3 h-5/6 border-4 border-[#908989] rounded-md border-solid"
                            >
                                <img src={animeImg} className="w-full h-full" />
                                <div className="absolute bottom-0 inline-block w-full text-center h-fit bg-[#1616169e]">
                                    <b className="text-xl">{animeTitle}</b>
                                </div>
                                <div className="absolute top-0 mt-3 ml-3 bg-gray-600 rounded-md">
                                    <p className="p-2 text-sm ">{releasedDate}</p>
                                </div>
                                <div className="absolute top-0 z-[2] w-full h-full flex justify-center items-center bg-[#2f2c2c99] transition-opacity delay-150 opacity-0 hover:opacity-100">
                                    <Link to={`/details/${animeId}`}>
                                        <AiOutlinePlayCircle size={60} color="white" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </section>
            <Pagination setPage={setPage} pageCount={28} />
        </>
    );
}

export default Genres;
