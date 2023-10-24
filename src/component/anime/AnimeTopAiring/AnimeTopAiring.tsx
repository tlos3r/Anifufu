import Anime from "../../../models/Anime";
import { useState, useEffect } from "react";
import request from "../../../service/request";
import LoaderImg from "../../../assets/Spinner-1s-267px.gif";
import { shortenText } from "../../../genreList";
import { Link } from "react-router-dom";
import SkeletonLoading from "../../loader/SkeletonLoading";

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
                <ul>
                    {isLoading &&
                        Array(10)
                            .fill(0)
                            .map((item, index) => {
                                return (
                                    <li key={index} className="flex items-center mb-4 last:mb-0">
                                        <div className="grid grid-cols-2 ">
                                            <div className="w-20 mx-auto">
                                                <SkeletonLoading className="w-[80px] h-[113px]"></SkeletonLoading>
                                            </div>
                                            <div className="px-3 ">
                                                <SkeletonLoading className="w-32 h-5 mb-5 rounded-md"></SkeletonLoading>
                                                <SkeletonLoading className="w-32 h-5 mb-5 rounded-md"></SkeletonLoading>
                                                <SkeletonLoading className="w-32 h-5 mb-5 rounded-md"></SkeletonLoading>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
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
                                            <Link
                                                to={`/details/${animeId}`}
                                                className="font-bold text-md hover:text-[#a83027]"
                                            >
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
