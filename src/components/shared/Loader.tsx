// import { Logo } from "../../assets";
import "../../index.css";

const Loader = ({ loading = false, className = "",fullWidthLoader = false }) => {
  return (
    loading && (
      <div className={`${className} ${!fullWidthLoader ? "w-full h-full" : "fixed top-0 w-full h-dvh"} flex justify-center items-center z-50 bg-white`}>
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-purple-200"></div>
      </div>
    )
  );
};

export default Loader;
