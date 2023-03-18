import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Footer, Header } from "./component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home, Login, Genres, Register, Forget, SearchPage, Popular, Movie, RecentUpdate, BookMark } from "./page";
import "./App.scss";
import Details from "./page/Details/Details";
function App() {
    return (
        <>
            <BrowserRouter>
                <ToastContainer theme="dark" />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forget" element={<Forget />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <Header /> <Home />
                            </>
                        }
                    />

                    <Route
                        path="/genres/:genre"
                        element={
                            <>
                                <Header /> <Genres />
                            </>
                        }
                    />
                    <Route
                        path="/popular"
                        element={
                            <>
                                <Header /> <Popular />
                            </>
                        }
                    />
                    <Route
                        path="/search/:keyw"
                        element={
                            <>
                                <Header /> <SearchPage />
                            </>
                        }
                    />
                    <Route
                        path="/movie"
                        element={
                            <>
                                <Header /> <Movie />
                            </>
                        }
                    />
                    <Route
                        path="/recent-update"
                        element={
                            <>
                                <Header /> <RecentUpdate />
                            </>
                        }
                    />
                    <Route
                        path="/details/:animeId"
                        element={
                            <>
                                <Header /> <Details />
                            </>
                        }
                    />
                    <Route
                        path="/bookmark"
                        element={
                            <>
                                <Header /> <BookMark />
                            </>
                        }
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
