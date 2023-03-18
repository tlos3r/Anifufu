import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import "./Slide.scss";
import request from "../../service/request";
import Anime from "../../models/Anime";
import spinnerImg from "../../assets/Spinner-1s-267px.gif";
function Slide() {
    const [listMovies, setListMovies] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadTopAiring();
    }, []);

    const loadTopAiring = async () => {
        setIsLoading(true);
        const lists = await request.getTopAiring();
        setListMovies(lists);
        setIsLoading(false);
    };
    var settings: {} = {
        customPaging: function () {
            return <span className="inline-block w-4 h-4 border-2 border-white border-solid rounded-full"></span>;
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        lazyLoad: true,
        autoplay: true,
        speed: 1000,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1550,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
        ],
    };
    return (
        <div className="hidden w-4/6 mx-auto my-0 lg:block">
            {isLoading && <img src={spinnerImg} width={100} className="mx-auto" />}
            <Slider {...settings}>
                {listMovies.map((item, index) => {
                    const { animeImg, animeTitle, animeId, genres } = item;
                    return (
                        <div key={index} className="container flex items-center justify-center my-10">
                            <div className="flex flex-row justify-center h-1/2 bg-[#070707] px-5 rounded-3xl border border-solid border-[#070707] ">
                                <div className="w-2/3 h-full">
                                    <div className="p-10">
                                        <h1 className="text-2xl font-bold ">{animeTitle}</h1>
                                        <p className="py-5">
                                            <b> Genre: </b>
                                            {`${genres.join(", ")}`}
                                        </p>
                                        <a
                                            className="bg-[#AD241B] hover:bg-[#ad4b44] px-4 py-2 rounded-lg"
                                            href={`/details/${animeId}`}
                                        >
                                            View More
                                        </a>
                                    </div>
                                </div>
                                <div className="flex justify-end w-full m-8 overflow-hidden">
                                    <img src={animeImg} alt={animeTitle} className="w-1/2 h-auto" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default Slide;
