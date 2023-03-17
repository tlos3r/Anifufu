import { createPortal } from "react-dom";
import "./Loader.scss";
function Loader() {
    return (
        <>
            {createPortal(
                <div className="fixed w-full h-full bg-[#65606099] z-50">
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="dots-4"></div>
                    </div>
                </div>,
                document.getElementById("loader") as HTMLElement
            )}
        </>
    );
}

export default Loader;
