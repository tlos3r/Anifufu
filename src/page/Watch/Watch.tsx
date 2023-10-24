import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import request from "../../service/request";
import { VideoStreamResponse } from "../../models/Anime";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import SkeletonLoading from "./../../component/loader/SkeletonLoading";
import { useSelector } from "react-redux";
import { selectAnimeTitle, selectEpisodesList } from "../../redux/slice/animeDetailSlice";

const Watch = () => {
    const [sever, setSever] = useState<string>("vidcdn");
    const [streamingDetail, setStreamingDetail] = useState<VideoStreamResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const { animeId } = useParams<string>();
    const epsisodesList = useSelector(selectEpisodesList);
    const animeTitle = useSelector(selectAnimeTitle);
    useEffect(() => {
        getStreamingVideo();
    }, [sever]);

    const getStreamingVideo = async () => {
        setIsLoading(true);
        try {
            const res = await request.getAnimeStreaming(sever, animeId);
            setStreamingDetail(res);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            toast.error(message);
        }
    };

    return (
        <>
            {isLoading ? (
                <section className="flex justify-center items-center flex-col mt-24">
                    <SkeletonLoading className="w-[500px] h-[36px]" />
                    <SkeletonLoading className="w-[650px] h-[362px] mt-10" />
                    <SkeletonLoading className="w-[450px] h-[150px] mt-10" />
                </section>
            ) : (
                <section className="container h-5/6">
                    <h2 className="text-3xl font-bold text-center mt-24"> You are watching {animeTitle}</h2>
                    <p className="text-base text-center pb-5 mb-10">
                        Maybe it's will take 5 minutes to loading the video, please patience (ㅠ﹏ㅠ)
                    </p>
                    <div className="flex justify-center text-center">
                        <ReactPlayer controls url={streamingDetail?.sources[0].file} />
                    </div>
                    <div className="flex  items-center justify-center mt-10">
                        <p className="mr-5 text-xl">Select another server : </p>
                        <button
                            onClick={() => setSever("vidcdn")}
                            className={
                                sever === "vidcdn"
                                    ? "px-3 py-2 rounded-md bg-[#AD241B] mr-5"
                                    : "px-3 py-2 rounded-md mr-5 bg-[#c5655f] hover:bg-[#AD241B]"
                            }
                        >
                            VidCDN
                        </button>
                    </div>
                    <div className="flex items-center justify-center mx-auto my-0 mt-10">
                        <div className="flex flex-wrap w-fit  overflow-y-auto ">
                            {epsisodesList
                                .map((episode: { episodeId: string; episodeNum: string }) => {
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
                                .reverse()}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Watch;
