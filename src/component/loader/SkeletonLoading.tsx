import "./Loader.scss";
const SkeletonLoading = ({ className = "" }: { className: string }) => {
    return <div className={`skeleton ${className}`}></div>;
};

export default SkeletonLoading;
