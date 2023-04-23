import { AiOutlinePlayCircle } from "react-icons/ai";
import { BsFillBookmarkXFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { shortenText } from "../../genreList";
import { REMOVE_BOOKMARK, selectBookMarkItems } from "../../redux/slice/bookMarkSlice";

function BookMark() {
    const getListBookMark: any = useSelector(selectBookMarkItems);
    const dispatch = useDispatch();
    const removeBookMark = (id: string) => {
        dispatch(REMOVE_BOOKMARK(id));
    };
    return (
        <section>
            <h1 className="py-5 text-4xl font-bold text-center">Bookmark list</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {getListBookMark.length <= 0 ? (
                    <div className="text-base w-full m-5">
                        <p className="font-bold text-xl my-3">You haven't bookmark any anime</p>
                        <button className="bg-[#AD241B] hover:bg-[#ad4b44] py-2 rounded-md">
                            <Link to={"/"}>Go to homepage</Link>
                        </button>
                    </div>
                ) : (
                    getListBookMark.map((listAnime: any) => {
                        const { details, animeId } = listAnime;
                        return (
                            <div
                                key={animeId}
                                className="relative w-3/4 m-3 border-4 border-[#908989] rounded-md border-solid h-5/6"
                            >
                                <img src={details.animeImg} className="w-full h-full" />
                                <div className="absolute bottom-0 inline-block w-full text-center h-fit bg-[#1616169e]">
                                    <b className="p-1 text-xl">{shortenText(details.animeTitle, 40)}</b>
                                </div>
                                <div className="absolute top-0 mt-3 ml-3 bg-gray-600 rounded-md">
                                    <p className="p-2 text-sm ">{details.releasedDate || "???"}</p>
                                </div>
                                <div className="absolute top-0 right-0 mt-3 mx-3 border-2 border-solid border-red-600 rounded-md w-10 p-2 z-[5] bg-red-600 hover:bg-red-400 hover:border-red-400">
                                    <BsFillBookmarkXFill
                                        size={22}
                                        className="cursor-pointer"
                                        onClick={() => removeBookMark(animeId)}
                                    />
                                </div>
                                <div className="absolute top-0 z-[2] w-full h-full flex justify-center items-center bg-[#2f2c2c99] transition-opacity delay-100 opacity-0 hover:opacity-100">
                                    <Link to={`/details/${animeId}`}>
                                        <AiOutlinePlayCircle size={60} color="white" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
            </section>
        </section>
    );
}

export default BookMark;
