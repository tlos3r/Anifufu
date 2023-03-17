import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../component/loader/Loader";
import { auth } from "../../firebase/config";
import styles from "./Login.module.scss";
function Forget() {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const resetPassword = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false);
                toast.success("Reset password link has send");
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    };
    return (
        <>
            {isLoading && <Loader />}
            <section className="flex items-center justify-center h-fit">
                <div className="w-full my-32 lg:w-1/3">
                    <div className="bg-[#161616] p-10">
                        <form onSubmit={resetPassword}>
                            <h1 className="pb-3 text-3xl font-bold">Reset Password</h1>
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
                            <button
                                type="submit"
                                className="w-full bg-[#AD241B] hover:bg-[#ad4b44] rounded-md font-bold text-xl transition-all delay-75"
                            >
                                Send reset password link
                            </button>
                            <p className="pt-4 font-light text-center text-md">
                                Go back to{" "}
                                <Link className="font-bold underline" to="/login">
                                    Login
                                </Link>{" "}
                                page
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Forget;
