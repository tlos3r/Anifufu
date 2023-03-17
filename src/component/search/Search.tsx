import { HiOutlineSearch } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Anime from "../../models/Anime";
import request from "../../service/request";
import LoaderImg from "../../assets/Spinner-1s-267px.gif";
import useDebounce from "../../customHook/useDebounce";
import SearchResult from "./SearchResult";
function Search() {
    const [searchText, setSearchText] = useState<string>("");
    const [listSearchResult, setListSearchResult] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const nagivate = useNavigate();
    const debounced = useDebounce(searchText, 500);
    useEffect(() => {
        if (!debounced.trim()) {
            setListSearchResult([]);
            return;
        }
        getSearch();
    }, [debounced]);

    const getSearch = async () => {
        setIsLoading(true);
        const res = await request.getAnimeSearch(debounced);
        setListSearchResult(res);
        setIsLoading(false);
    };

    const searchNameResult = (e: React.FormEvent) => {
        e.preventDefault();
        nagivate(`/search/${debounced}`);
        setSearchText("");
    };
    return (
        <>
            <div className="relative flex-1 mx-1">
                <form onSubmit={searchNameResult}>
                    <HiOutlineSearch size={20} className="absolute -translate-y-1/2 top-1/2 left-4" />
                    <input
                        type="text"
                        className="block h-10 text-xl w-full border mx-auto my-4 py-5 pl-12 p-0.5 rounded-lg border-solid border-[#464955] bg-transparent outline-none"
                        placeholder="Search anime title"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </form>
                <div
                    className={
                        searchText.length > 0
                            ? "absolute flex flex-col bg-black border rounded-lg border-solid border-[#464955] w-full z-10 h-96 overflow-y-auto overflow-x-hidden transition-all delay-100"
                            : "hidden"
                    }
                    onClick={() => setSearchText("")}
                >
                    {isLoading && <img src={LoaderImg} alt="loader img" className="block mx-auto" width={100} />}
                    <div>
                        {!isLoading && listSearchResult.length <= 0 ? (
                            <p className="font-bold text-md">Don't have anime name that</p>
                        ) : (
                            listSearchResult.map((search) => {
                                return <SearchResult {...search} key={search.animeId} />;
                            })
                        )}
                        <Link to={"/"} className="bg-[#AD241B] hover:bg-[#ad4b44] w-full rounded-b-lg py-3 block">
                            Press Enter for search
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
