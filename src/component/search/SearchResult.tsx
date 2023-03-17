import { Link } from "react-router-dom";
import Anime from "../../models/Anime";
import { shortenText } from "../../genreList";
function SearchResult({ animeId, animeImg, animeTitle, status }: Anime) {
    return (
        <ul className="p-3">
            <li>
                <div className="flex items-center justify-start">
                    <div className="w-20">
                        <img src={animeImg} alt="" />
                    </div>
                    <div className="pl-5">
                        <Link to={`/details/${animeId}`} className="font-bold text-md text-left hover:text-[#AD241B]">
                            {shortenText(animeTitle, 25)}
                        </Link>
                        <p className="font-extralight text-left">{status}</p>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default SearchResult;
