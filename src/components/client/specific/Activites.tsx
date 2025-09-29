import { FC, useCallback, useEffect, useRef, useState } from "react";
import Section from "../shared/Section";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

import { Svg } from "../../../assets";
import { Place } from "../../../types/places";
import { ImageAPI } from "../../../api";
import { useNavigate } from "react-router";

const SwiperTextContent: FC<{
  rating?: number;
  ratingTotal?: number;
  title?: string;
  description?: string;
}> = ({ rating, ratingTotal, title, description }) => (
  <div className={`flex text-start flex-col items-start justify-start gap-2`}>
    <div className={`flex items-start justify-start gap-2`}>
      <img src={`${Svg.star}`} alt={`star icon`} />
      <h5 className={`text-dark-gray text-sm font-medium`}>{rating}</h5>
      <h5 className={`text-gray text-sm font-medium`}>{`(${ratingTotal})`}</h5>
    </div>
    <h3 className={`text-base text-dark-gray font-normal`}>{description}</h3>
    <h4 className={`text-gray text-sm font-normal`}>{title}</h4>
  </div>
);

const Activities: FC<{ data: Place[] }> = ({ data }) => {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState<number>(0);
  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const swiperRef = useRef<SwiperRef>(null);

  const handleScreen = () => {
    const windowWidth = window.innerWidth;
    setSmallScreen(windowWidth <= 1024 ? true : false);
  };

  useEffect(() => handleScreen(), []);

  useEffect(() => {
    window.addEventListener("resize", handleScreen);

    return () => {
      window.removeEventListener("resize", handleScreen);
    };
  }, []);

  const changeItem = useCallback(
    (align: `prev` | `next`) => {
      const availableSwipers = data.length;

      setCurrentItem(
        align === `prev`
          ? currentItem === 0
            ? availableSwipers - 1
            : currentItem - 1
          : currentItem === availableSwipers - 1
          ? 0
          : currentItem + 1
      );
    },
    [currentItem]
  );

  const handlePrev = useCallback(() => {
    if (swiperRef.current && (swiperRef.current as SwiperRef).swiper) {
      (swiperRef.current as SwiperRef).swiper.slidePrev();
      changeItem(`prev`);
    }
  }, [swiperRef, changeItem]);

  const handleNext = useCallback(() => {
    if (swiperRef.current && (swiperRef.current as SwiperRef).swiper) {
      (swiperRef.current as SwiperRef).swiper.slideNext();
      changeItem(`next`);
    }
  }, [swiperRef, changeItem]);

  return (
    <Section id="Activities" className={`relative Activitie`}>
      <div className={`relative lg:mx-[135px] w-full h-auto`}>
        <div
          className={`flex items-center lg:flex-between gap-8 md:gap-12 flex-col lg:flex-row`}
        >
          <div className={`flex flex-col w-full px-4 lg:p-0 lg:w-3/12`}>
            <h2
              className={`text-dark-blue text-center sm:text-start text-3xl md:text-5xl font-bold lead md:w-[20ch] lg:w-full`}
            >
              Unforgettable activities to do in Nepal
            </h2>
          </div>
          <div className={`relative w-full sm:px-4 lg:p-0`}>
            <Swiper
              className={`w-full lg:w-3/4 overflow-hidden`}
              ref={swiperRef}
              slidesPerView={4}
              spaceBetween={20}
              breakpoints={{
                240: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                920: {
                  slidesPerView: 3,
                },
                1600: {
                  slidesPerView: 4,
                },
              }}
              freeMode={true}
              loop={true}
              modules={[FreeMode]}
            >
              {data.map(
                ({ id, cover_image: { file_key }, title, description }, i) => (
                  <SwiperSlide
                    id={`swiper_${i}`}
                    key={i}
                    onClick={() => navigate(`/places/details/${id}`)}
                  >
                    <div
                      className={`flex flex-col sm:gap-2 relative group smooth cursor-pointer w-full`}
                    >
                      <figure
                        className={`relative sm:rounded-xl smooth overflow-hidden shadow mb-1`}
                      >
                        <img
                          src={`${ImageAPI}/${file_key}`}
                          alt={`${title}_image`}
                          className={`object-center object-cover bg-center h-[432px] xl:h-[452px] w-full lg:group-hover:scale-125 smooth sm:rounded-xl`}
                        />
                      </figure>
                      {i === currentItem && !smallScreen && (
                        <SwiperTextContent
                          rating={1}
                          title={title}
                          ratingTotal={1}
                          description={description}
                        />
                      )}

                      {smallScreen && (
                        <div
                          className={`absolute bottom-0 p-4 m-4 bg-white shadow rounded`}
                        >
                          <SwiperTextContent
                            rating={1}
                            title={title}
                            ratingTotal={1}
                            description={description}
                          />
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        </div>
      </div>
      {!smallScreen && data.length && (
        <div
          className={`absolute z-20 right-10 bottom-32 flex items-center justify-start gap-6`}
        >
          <button
            onClick={handlePrev}
            className={`flex items-center justify-center h-[34px] w-[34px] border-2 border-primary rounded-full smooth`}
          >
            <img
              src={`${Svg.arrowLeft}`}
              className={`text-3xl`}
              alt={`arrow left icon`}
            />
          </button>
          <button
            onClick={handleNext}
            className={`flex items-center justify-center h-[34px] w-[34px] border-2 border-primary rounded-full smooth`}
          >
            <img
              src={`${Svg.arrowRight}`}
              className={`text-3xl`}
              alt={`arrow right icon`}
            />
          </button>
        </div>
      )}
    </Section>
  );
};

export default Activities;
