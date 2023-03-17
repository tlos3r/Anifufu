import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/AniFuFu.png";
import Search from "../search/Search";
import { genreList } from "../../genreList";
import { AiOutlineClose } from "react-icons/ai";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ACTIVE_USER, selectIsLoggedIn, SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import { Confirm } from "notiflix";
import { LoginRoute, LogoutRoute } from "../LoginRoute/LoginRoute";
const Header = (): JSX.Element => {
    const [username, setUsername] = useState<string | null>("");
    const [showGenreMenu, setShowGenreMenu] = useState(false);
    const [showSideBar, setShowSideBar] = useState(true);

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const replaceSpeacial = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1).replaceAll("-", " ");
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.displayName === null) {
                    const getEmailName: string | undefined | null = user.email?.substring(0, user.email?.indexOf("@"));
                    // @ts-ignore
                    const uName = getEmailName?.charAt(0)?.toUpperCase() + getEmailName?.slice(1);

                    setUsername(uName);
                } else setUsername(user.displayName);
                dispatch(
                    SET_ACTIVE_USER({
                        email: user.email,
                        userName: user.displayName,
                        userId: user.uid,
                    })
                );
            } else {
                setUsername("");
                dispatch(REMOVE_ACTIVE_USER());
            }
        });
    }, [dispatch]);

    function showModalSignOut(): void {
        Confirm.show(
            "Sign Out",
            "Are you want to sign out now ?",
            "Yes",
            "No",
            () => {
                signOutUser();
            },
            () => {
                toast.info("Cancel sign out !");
            },
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

    function signOutUser() {
        signOut(auth)
            .then(() => {
                toast.success("Sign out successful !");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }
    const showMenuGen = () => {
        setShowGenreMenu(!showGenreMenu);
    };
    return (
        <>
            <header
                id="header"
                className={
                    showSideBar
                        ? "inline-block fixed h-full z-10 lg:top-0 lg:z-10 lg:grid lg:w-full lg:h-fit l lg:grid-cols-4 bg-[#0F0F0F] text-center items-center transition-all opacity-100 delay-100"
                        : "opacity-0 fixed z-10"
                }
            >
                <div>
                    <Link to="/">
                        <img src={logoImg} alt="this is a logo from Anifufu" width={"200px"} />
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <p className="relative px-4 cursor-pointer" onClick={showMenuGen}>
                        {showGenreMenu ? `Genre ⬇` : "Genre"}
                    </p>
                    <Link to={isLoggedIn ? "/bookmark" : "/login"} className="cursor-pointer">
                        Bookmark
                    </Link>
                    <div
                        className={
                            showGenreMenu
                                ? "absolute grid grid-cols-4 w-fit h-fit bg-black top-24 transition-all delay-150 z-10"
                                : "hidden absolute grid-cols-4  h-fit bg-black top-24 transition-all delay-150 z-10"
                        }
                    >
                        {genreList.map((gen, index) => {
                            const { genre } = gen;
                            return (
                                <Link
                                    to={`/genres/${genre}`}
                                    key={index}
                                    className="p-2 hover:bg-[#86837E]"
                                    onClick={() => setShowGenreMenu(false)}
                                >
                                    {replaceSpeacial(genre)}
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <Search />
                </div>
                <div className="flex items-center justify-center">
                    <LogoutRoute>
                        <button className="bg-[#AD241B] hover:bg-[#ad4b44] transition-all delay-75 mx-4 py-2 rounded-md">
                            <Link to="/login">Login</Link>
                        </button>
                        <button className="bg-[#AD241B] hover:bg-[#ad4b44] transition-all delay-75  py-2 rounded-md">
                            <Link to="/register">Register</Link>
                        </button>
                    </LogoutRoute>
                    <LoginRoute>
                        <p className="px-2 cursor-default text-md">
                            Welcome back, <b>{username}</b>
                        </p>
                        <button
                            className=" bg-[#AD241B] hover:bg-[#ad4b44] transition-all delay-75 rounded-md py-2 px-3 mx-3"
                            onClick={showModalSignOut}
                        >
                            <BiLogOut size={20} />
                        </button>
                    </LoginRoute>
                </div>
            </header>
            <div className="fixed z-10 right-5 top-5 lg:hidden">
                <button
                    className="bg-[#AD241B] hover:bg-[#ad4b44] transition-all delay-75 rounded-md py-2 px-3 mx-3 "
                    onClick={() => setShowSideBar(!showSideBar)}
                >
                    {showSideBar ? <AiOutlineClose size={20} /> : <BiMenu size={20} />}
                </button>
            </div>
        </>
    );
};

export default Header;
