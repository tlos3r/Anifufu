function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="flex justify-center items-center w-full bg-[#0F0F0F]">
            <p className="text-md py-5">
                © {year} by{" "}
                <a href="https://github.com/tlos3r" target="_blank" className="underline font-bold">
                    Fu
                </a>
                . All rights reserved
            </p>
        </footer>
    );
}

export default Footer;
