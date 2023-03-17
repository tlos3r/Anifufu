import styles from "./Login.module.scss";
import { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../component/loader/Loader";
function Login(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const nagivate = useNavigate();
    const signIn = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                setIsLoading(false);
                toast.success("Login successful");
                nagivate("/");
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    };
    const signInWithGoogle = (): void => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                setIsLoading(false);
                toast.success("Login with google success");
                nagivate("/");
            })
            .catch((error) => {
                setIsLoading(false);
                // The email of the user's account used.
                toast.info(error.message);
                // ...
            });
    };
    return (
        <>
            {isLoading && <Loader />}
            <section className="flex items-center justify-center h-fit">
                <div className="w-full my-32 lg:w-1/3">
                    <div className="bg-[#161616] p-10">
                        <form onSubmit={signIn}>
                            <h1 className="pb-3 text-3xl font-bold">Sign In</h1>
                            <div className="relative pb-4 mx-0 my-2">
                                <input
                                    type="text"
                                    value={email}
                                    id="email"
                                    required
                                    className="outline-none box-border w-full h-[50px] text-base bg-[#444] text-white pt-4 pb-0 px-5 rounded-md border-none"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="email" className={styles["float-text"]}>
                                    Email
                                </label>
                            </div>
                            <div className="relative pb-4 mx-0 my-2">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    required
                                    className="outline-none box-border w-full h-[50px] text-base bg-[#444] pt-4 pb-0 px-5 rounded-md border-none"
                                />
                                <label htmlFor="password" className={styles["float-text"]}>
                                    Password
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#AD241B] hover:bg-[#ad4b44] rounded-md font-bold text-xl transition-all delay-75"
                            >
                                Login
                            </button>
                            <p className="py-5 text-center text-md">-- or --</p>
                        </form>
                        <button
                            className="w-full text-xl font-bold transition-all delay-75 bg-orange-600 rounded-md hover:bg-orange-400"
                            onClick={signInWithGoogle}
                        >
                            Login with Google
                        </button>
                        <p className="pt-4 font-light text-center text-md">
                            Don't have account ?{" "}
                            <Link className="font-bold underline" to="/register">
                                Click
                            </Link>{" "}
                            here or go back{" "}
                            <Link className="font-bold underline" to="/">
                                homepage
                            </Link>
                        </p>
                        <p className="pt-4 font-light text-center text-md">
                            Forget password ?{" "}
                            <Link className="font-bold underline" to="/forget">
                                Click
                            </Link>{" "}
                            here
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
