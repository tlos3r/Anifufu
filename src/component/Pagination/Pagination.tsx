import ReactPaginate from "react-paginate";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import styles from "./Pagination.module.scss";
function Pagination({ pageCount, setPage }: { pageCount: number; setPage: (page: number) => void }): JSX.Element {
    const handlePageClick = (data: { selected: number }) => {
        const currentPage = data.selected + 1;
        setPage(currentPage);
    };
    return (
        <div>
            <h3 className="font-bold text-center text-xl pb-4">waiting for 5-10 seconds before the content appears</h3>
            <ReactPaginate
                previousLabel={<BiSkipPrevious size={30} />}
                pageCount={pageCount}
                nextLabel={<BiSkipNext size={30} />}
                marginPagesDisplayed={6}
                pageRangeDisplayed={4}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                activeClassName={styles.selected}
                previousClassName={styles["previous-btn"]}
                hrefAllControls={true}
            />
        </div>
    );
}

export default Pagination;
