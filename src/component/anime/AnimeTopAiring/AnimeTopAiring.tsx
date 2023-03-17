import Anime from "../../../models/Anime";
import { useState, useEffect } from "react";
import request from "../../../service/request";
import LoaderImg from "../../../assets/Spinner-1s-267px.gif";
import { shortenText } from "../../../genreList";
import { Link } from "react-router-dom";
function AnimeTopAiring() {
    const [listTopAiring, setListTopAiring] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getTopAiring();
    }, []);
    const getTopAiring = async () => {
        setIsLoading(true);
        try {
            const listAnime = await request.getTopAiring();
            setIsLoading(false);
            setListTopAiring(listAnime);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };
    return (
        <>
            <div className="flex flex-col justify-center">
                <h1 className="pb-5 text-4xl font-bold text-center">Top Airing</h1>
                {isLoading && <img src={LoaderImg} alt="this is a loading img" />}
                <ul>
                    {listTopAiring &&
                        listTopAiring.map((listItem, index) => {
                            const { animeImg, animeTitle, latestEp, genres, animeId } = listItem;
                            return (
                                <li key={index} className="flex items-center mb-4">
                                    <p className="pr-3 text-xl font-bold">{index + 1}</p>
                                    <div className="grid grid-cols-2 ">
                                        <div className="w-20 mx-auto">
                                            <img src={animeImg} alt="" />
                                        </div>
                                        <div className="px-3 ">
                                            <Link to={`/details/${animeId}`} className="font-bold text-md">
                                                {" "}
                                                {shortenText(animeTitle, 20)}
                                            </Link>
                                            <p className="text-sm">{latestEp}</p>
                                            <p className="text-sm">
                                                <b>Genre: </b>
                                                {shortenText(genres.join(","), 20)}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
}

export default AnimeTopAiring;
