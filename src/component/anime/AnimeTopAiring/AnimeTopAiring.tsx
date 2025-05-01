import { AnimeResponse } from "../../../models/Anime";
import { useState, useEffect } from "react";
import request from "../../../service/request";
import { shortenText } from "../../../genreList";
import { Link } from "react-router-dom";
import SkeletonLoading from "../../loader/SkeletonLoading";

function AnimeTopAiring() {
    const [listTopAiring, setListTopAiring] = useState<AnimeResponse>();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getTopAiring();
    }, []);
    const getTopAiring = async () => {
        setIsLoading(true);
        try {
            const listAnime = await request.getTopAiring();
            console.log(listAnime);

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
                <h1 className="pb-5 text-4xl font-bold ">Most Views</h1>
                <table className="table-fixed">
                    <tbody>
                        {isLoading &&
                            Array(10)
                                .fill(0)
                                .map((item, index) => {
                                    return (
                                        <tr key={index} className="flex items-center mb-4 last:mb-0">
                                            <td className="grid grid-cols-2 ">
                                                <div className="w-20 mx-auto">
                                                    <SkeletonLoading className="w-[80px] h-[113px]"></SkeletonLoading>
                                                </div>
                                                <div className="px-3 ">
                                                    <SkeletonLoading className="w-32 h-5 mb-5 rounded-md"></SkeletonLoading>
                                                    <SkeletonLoading className="w-32 h-5 mb-5 rounded-md"></SkeletonLoading>
                                                    <SkeletonLoading className="w-32 h-5 mb-5 rounded-md"></SkeletonLoading>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        {listTopAiring &&
                            listTopAiring.results
                                .map((listItem, index) => {
                                    return (
                                        <tr key={index} className="flex items-center mb-4">
                                            <td>
                                                <p className="pr-3 text-xl font-bold">{index + 1}</p>
                                            </td>
                                            <td>
                                                <div className="w-20 mx-auto">
                                                    <img src={listItem.image} alt="" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="px-3 ">
                                                    <Link
                                                        to={`/details/${listItem.id}`}
                                                        className="font-bold text-md hover:text-[#a83027]"
                                                    >
                                                        {" "}
                                                        {shortenText(listItem.japaneseTitle, 20)}
                                                    </Link>
                                                    <p className="text-sm">{listItem.sub}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                                .slice(0, 10)}
                    </tbody>
                </table>
                {/* <p className="text-sm">
                                                <b>Genre: </b>
                                                {shortenText(genres.join(","), 20)}
                                            </p> */}
            </div>
        </>
    );
}

export default AnimeTopAiring;
