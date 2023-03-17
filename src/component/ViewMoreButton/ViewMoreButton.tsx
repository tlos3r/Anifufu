import { BiPlusCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

function ViewMoreButton({ param }: { param: string }) {
    return (
        <div className="flex justify-end w-full">
            <Link
                to={`/${param}`}
                className="flex items-center bg-[#AD241B] hover:bg-[#ad4b44] mr-14 px-3 py-2 rounded-md"
            >
                <BiPlusCircle size={22} className="mr-1" /> View More
            </Link>
        </div>
    );
}

export default ViewMoreButton;
