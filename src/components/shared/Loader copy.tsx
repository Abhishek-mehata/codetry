import { Logo } from "../../assets";

const Loader = ({ loading = false }) => {
  return (
    loading && (
      <div className="flex  h-screen w-screen items-center justify-center bg-white fixed top-0 left-0 z-[999999] pb-28">
        <div className=" flex flex-col items-center">
          <img src={Logo.logo_purple} alt="" className="w-[200px] mr-8" />
          <div className="h-10 w-10 animate-ping rounded-full bg-purple border-t-transparent"></div>
        </div>
      </div>
    )
  );
};

export default Loader;
