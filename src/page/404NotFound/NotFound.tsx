import { Link } from "react-router-dom";
import notFoundGif from "../../assets/404notfound.gif";
const NotFound = () => {
    return (
        <>
            <section className="container mt-5 w-3/4 mb-52">
                <div className="flex justify-center items-center">
                    <img src={notFoundGif} alt="404 not found" />
                </div>
                <p className="text-center text-xl py-5">
                    There was an error while loading the content. Please try again later
                </p>
                <p className="text-center text-xl py-3">
                    You can watch demo website from{" "}
                    <a
                        className="font-bold underline"
                        href="https://wph25-my.sharepoint.com/:v:/g/personal/fu_wph25_onmicrosoft_com/EWZqpzbsuvVIjJ_xpBx5LMQBHdbunb_I4fNeGmGP6I8xZw?e=siofoB"
                        target="_blank"
                    >
                        here
                    </a>
                </p>
                <div className="flex justify-center items-center">
                    <button className="bg-[#AD241B] hover:bg-[#ad4b44] rounded-lg py-3">
                        <Link to={"/"}>Go back homepage</Link>
                    </button>
                </div>
            </section>
        </>
    );
};

export default NotFound;
