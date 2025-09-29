/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useRef } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Svg } from "../../../../assets";
import { NavLink } from "react-router-dom";
import { ImageAPI } from "../../../../api";

interface Props {
  data: any;
  isPlace?: boolean;
}

const LocationCard: FC<Props> = ({ data, isPlace }) => {
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (swiperRef.current && (swiperRef.current as SwiperRef).swiper) {
      (swiperRef.current as SwiperRef).swiper.slidePrev();
    }
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    if (swiperRef.current && (swiperRef.current as SwiperRef).swiper) {
      (swiperRef.current as SwiperRef).swiper.slideNext();
    }
  }, [swiperRef]);

  return (
    <div className={`rounded-xl shadow-xl m-3.5 overflow-hidden`}>
      <div className={`relative`}>
        <Swiper
          ref={swiperRef}
          className={`w-full overflow-hidden`}
          slidesPerView={1}
          spaceBetween={16}
          autoplay
          loop={true}
          modules={[Autoplay, Navigation, Pagination]}
        >
          {(isPlace ? data.images : data.files).map(
            ({ file_key, original_name }: any, i: number) => (
              <SwiperSlide key={i}>
                <figure className={`relative`}>
                  <img
                    src={`${ImageAPI}/${file_key}`}
                    alt={`${original_name}_image`}
                    className={`h-[240px] w-full group-hover:scale-125 smooth rounded-t-xl object-center object-cover`}
                  />
                </figure>
              </SwiperSlide>
            )
          )}
        </Swiper>
        <div
          className={`absolute top-1/2 z-20 -translate-y-1/2 flex items-center justify-between w-full px-6`}
        >
          <button
            onClick={handlePrev}
            className={`flex items-center justify-center h-[34px] w-[34px] bg-white p-2 rounded-full smooth`}
          >
            <img
              src={`${Svg.arrowLeft}`}
              className={`text-3xl`}
              alt={`arrow left icon`}
            />
          </button>
          <button
            onClick={handleNext}
            className={`flex items-center justify-center h-[34px] w-[34px] bg-white p-2 rounded-full smooth`}
          >
            <img
              src={`${Svg.arrowRight}`}
              className={`text-3xl`}
              alt={`arrow right icon`}
            />
          </button>
        </div>
      </div>
      <NavLink
        to={`/${isPlace ? "places" : "events"}/details/${data.id}`}
        className={`flex text-start flex-col items-start justify-start p-4 gap-2`}
      >
        <div className={`flex justify-center items-start gap-4`}>
          <h3 className={`text-xl text-primary font-semibold`}>{`${
            isPlace ? data.title : data.name
          }`}</h3>
          <p
            className={`text-xs rounded uppercase text-white font-semibold py-1.5 px-4 bg-primary w-fit`}
          >
            NEW
          </p>
        </div>
        <div className={`flex justify-between items-end mt-1 w-full`}>
          <div>
            <h4
              className={`text-dark-gray text-sm font-medium`}
            >{`Semi-Olympic Swimming Pool, Sea views`}</h4>
            {isPlace && (
              <p className={`text-gray text-sm font-normal max-w-[44ch] mt-1`}>
                {data.description}
              </p>
            )}
          </div>
        </div>
        <div className={`flex justify-between items-end w-full`}>
          <div className={`flex items-center justify-start gap-2 mt-2`}>
            <img src={`${Svg.star}`} alt={`star icon`} />
            <h5 className={`text-dark-gray text-base font-medium`}>{4.9}</h5>
            <h5 className={`text-gray text-base font-medium`}>{`(123)`}</h5>
          </div>
          <h3 className={`text-dark-blue`}>
            <h4 className={`text-xl font-medium`}>
              {`$${data.price === null ? 0 : data.price}`}
              <span className={`text-lg`}>{` /night`}</span>
            </h4>
          </h3>
        </div>
      </NavLink>
    </div>
  );
};

export default LocationCard;
