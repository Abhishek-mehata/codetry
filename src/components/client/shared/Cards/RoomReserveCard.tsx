/* eslint-disable @typescript-eslint/no-explicit-any */
 

import { FC, useCallback, useRef } from "react";

// import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Swiper, SwiperRef } from "swiper/react";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import { PLACES } from "../../../../lib/constants/places";
import { Svg } from "../../../../assets";
import { useAppDispatch } from "../../../../hooks/useTypedSelectors";
import { storeBookRoomsIds } from "../../../../redux/reducers/places";
import Button from "../../../shared/Button";

interface Props {
  isSeller: boolean;
  data?: any;
}

const RoomReserveCard: FC<Props> = ({ isSeller, data }) => {
  const dispatch = useAppDispatch();
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
    <div
      className={`rounded-xl shadow-xl border hover:border-primary smooth overflow-hidden`}
    >
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
          {/* {PLACES.map(({ title, imgSrc }, i) => (
            <SwiperSlide key={i}>
              <figure className={`relative`}>
                <img
                  src={`${imgSrc}`}
                  alt={`${title}_image`}
                  className={`h-[240px] w-full group-hover:scale-125 smooth rounded-t-xl object-center object-cover`}
                />
              </figure>
            </SwiperSlide>
          ))} */}
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
      <div
        className={`flex text-start flex-col items-start justify-start p-4 gap-4`}
      >
        <h3 className={`text-lg font-medium text-dark-blue`}>{data.title}</h3>
        <div className={`flex gap-2 items-center`}>
          <img src={Svg.bed} alt="bed icon" />
          <div className={`flex gap-2`}>
            {data?.beds.map(({ bed_type, amount }: any, i: number) => (
              <div key={i}>
                <h4 className={`text-sm text-gray font-normal capitalize`}>
                  {`${amount} ${bed_type}`}
                  {i !== data?.beds.length - 1 && <span>{`,`}</span>}
                </h4>
              </div>
            ))}
          </div>
        </div>
        <div className={`flex gap-2 items-center`}>
          <img src={Svg.boxTick} alt="bed icon" />
          <h4
            className={`text-sm text-gray font-normal`}
          >{`Reserve now pay later`}</h4>
        </div>
        <div className={`flex items-center justify-between w-full`}>
          <div className={`flex gap-2 items-center`}>
            <h3
              className={`text-xl font-medium text-dark-blue`}
            >{`$${data.price}`}</h3>
            <h4 className={`text-sm text-gray font-normal`}>{`per night`}</h4>
          </div>
          <Button
            variant="filled"
            title={`Reserve`}
            disabled={isSeller}
            onClick={() => {
              if (isSeller) return;

              dispatch(storeBookRoomsIds(data.id));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomReserveCard;
