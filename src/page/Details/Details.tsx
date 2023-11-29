import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimeDetails } from "../../models/Anime";
import request from "../../service/request";
import { BsBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { ADD_BOOKMARK } from "../../redux/slice/bookMarkSlice";
import { Confirm } from "notiflix";
import SkeletonLoading from "../../component/loader/SkeletonLoading";
import { toast } from "react-toastify";
import { SET_DETAIL } from "../../redux/slice/animeDetailSlice";
function Details(): JSX.Element {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const { animeId } = useParams<string>();
    // @ts-ignore
    const [details, setDetails] = useState<AnimeDetails>({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getAnimeDetails();
    }, [animeId]);
    const getAnimeDetails = async () => {
        setIsLoading(true);
        try {
            const getListDetails = await request.getAnimeDetails(animeId);
            setDetails(getListDetails);
            dispatch(SET_DETAIL({ animeTitle: getListDetails.animeTitle, episodesList: getListDetails.episodesList }));
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            toast.error(message);
        }
    };
    const bookMarkAnime = () => {
        isLoggedIn ? dispatch(ADD_BOOKMARK({ details, animeId })) : showModalLogin();
    };
    function showModalLogin(): void {
        Confirm.show(
            "Not login",
            "You must login for using this feature",
            "Login",
            "Close",
            () => {
                nagivate("/login");
            },
            () => {},
            {
                width: "350px",
                fontFamily: "Nunito",
                borderRadius: "5px",
                backgroundColor: "#434343",
                cssAnimationStyle: "zoom",
                okButtonBackground: "#AD241B",
                titleFontSize: "25px",
                titleColor: "white",
                messageFontSize: "20px",
                messageColor: "white",
            }
        );
    }
    return (
        <>
            {isLoading ? (
                <section className="container w-5/6 m-32 rounded-xl">
                    <div className="flex bg-[#070707] m-5 justify-start bg shadow-lg items-center">
                        <div className="w-1/6 m-5 mx-auto flex flex-col justify-center items-center">
                            <SkeletonLoading className="w-56 h-64"></SkeletonLoading>
                            <SkeletonLoading className="w-32 h-12 rounded-lg mt-5"></SkeletonLoading>
                        </div>
                        <div className="justify-start w-4/6 pl-10 m-5 text-md">
                            <SkeletonLoading className="w-72 h-10 my-5 rounded-md"></SkeletonLoading>
                            <SkeletonLoading className="w-[770px] h-48 my-5 rounded-md"></SkeletonLoading>
                            {Array(4)
                                .fill(0)
                                .map((item, index) => {
                                    return (
                                        <SkeletonLoading
                                            key={index}
                                            className="w-48 h-3 my-3 rounded-md"
                                        ></SkeletonLoading>
                                    );
                                })}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="container w-5/6 m-32 rounded-xl">
                    <div className="flex bg-[#070707] m-5 justify-start bg shadow-lg items-center">
                        <div className="w-1/6 m-5 mx-auto">
                            <img src={details.animeImg} alt="" width={400} />
                            <button
                                onClick={bookMarkAnime}
                                className="flex items-center mx-auto mt-5 bg-[#AD241B] hover:bg-[#ad4b44] py-2 rounded-lg"
                            >
                                <BsBookmarkFill size={30} className="pr-3" /> Bookmark
                            </button>
                        </div>
                        <div className="justify-start w-4/6 pl-10 m-5 text-md">
                            <p>
                                <b className="text-4xl ">{details.animeTitle}</b>
                            </p>
                            <p className="mb-10">{details.otherNames && `Other name : ${details.otherNames}`}</p>

                            <p className="mb-5 h-36 overflow-y-scroll">{details.synopsis}</p>

                            <p>
                                <b>Genres:</b>
                                {` ${details.genres}`}
                            </p>
                            <p>
                                <b>Released Date: </b>
                                {details.releasedDate}
                            </p>
                            <p>
                                <b>Status: </b>
                                {details.status}
                            </p>
                            <p>
                                <b>Total Episodes : </b> {details.totalEpisodes}
                            </p>
                            <p>
                                <b>Type : </b> {details.type}
                            </p>

                            <div className="flex flex-wrap w-full h-24 overflow-y-auto ">
                                {details.episodesList
                                    ? details.episodesList.map((episode: { episodeId: string; episodeNum: string }) => {
                                          const { episodeId, episodeNum } = episode;
                                          return (
                                              <Link
                                                  key={episodeId}
                                                  to={`/watch/${episodeId}`}
                                                  className="m-2 p-3 w-14 text-sm bg-[#AD241B] hover:bg-[#ad4b44] text-center h-fit rounded-md"
                                              >
                                                  {episodeNum}
                                              </Link>
                                          );
                                      })
                                    : ""}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default Details;
