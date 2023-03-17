import styles from "./Login.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../component/loader/Loader";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const nagivate = useNavigate();
    const registerUser = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (password !== cPassword) {
            toast.error("The password you entered does not match");
        }
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setIsLoading(false);
                toast.success("Register success !");
                nagivate("/login");
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
                // ..
            });
    };

    return (
        <>
            {isLoading && <Loader />}
            <section className="flex items-center justify-center h-fit">
                <div className="w-full my-32 lg:w-1/3">
                    <form className="bg-[#161616] p-10" onSubmit={registerUser}>
                        <h1 className="pb-3 text-3xl font-bold">Register User</h1>
                        <div className="relative pb-4 mx-0 my-2">
                            <input
                                type="text"
                                name=""
                                id="email"
                                value={email}
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
                                name=""
                                value={password}
                                id="password"
                                required
                                className="outline-none box-border w-full h-[50px] text-base bg-[#444] pt-4 pb-0 px-5 rounded-md border-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className={styles["float-text"]}>
                                Password
                            </label>
                        </div>
                        <div className="relative pb-4 mx-0 my-2">
                            <input
                                type="password"
                                value={cPassword}
                                id="cpassword"
                                required
                                className="outline-none box-border w-full h-[50px] text-base bg-[#444] pt-4 pb-0 px-5 rounded-md border-none"
                                onChange={(e) => setCPassword(e.target.value)}
                            />
                            <label htmlFor="cpassword" className={styles["float-text"]}>
                                Confirm Password
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#AD241B] hover:bg-[#ad4b44] rounded-md font-bold text-xl transition-all delay-75"
                        >
                            Register
                        </button>
                        <p className="pt-4 font-light text-center text-md">
                            Are you have account ?{" "}
                            <Link className="font-bold underline" to="/login">
                                Click
                            </Link>{" "}
                            here
                        </p>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Register;
