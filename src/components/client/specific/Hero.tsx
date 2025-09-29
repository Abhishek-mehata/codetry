import { ClientContainer } from "../..";
import Filter from "./Filter";
import banner from "../../../../public/banner.jpg";

const Hero = () => {
  return (
    <div
      className="relative w-full py-20 md:py-0 mt-5 md:mt-0 md:h-[70vh] max-h-[800px] flex justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(${banner})`,
        backgroundPosition: "33% 22%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <ClientContainer>
        <div
          className="absolute  left-[50%] translate-x-[-50%] h-full w-full  max-w-[1100px]"
        >
          <div className="absolute top-[50%] translate-y-[-50%] text-white md:max-w-full">
            <h2 className="font-normal md:font-normal text-3xl sm:text-4xl md:text-6xl mb-4 md:mb-3">
              Explore your <p className="font-extrabold mt-2">Dreamtime</p>
            </h2>
            <span className="text-md font-semibold">
              Tourism Marketplace for Events and Stays
            </span>
          </div>
          <Filter />
        </div>
      </ClientContainer>
    </div>
  );
};

export default Hero;
