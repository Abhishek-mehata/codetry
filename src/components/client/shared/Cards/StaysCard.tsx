import { useEffect, useState } from "react";
import "./index.css";
import "../../../../index.css";
import api from "../../../../api";
import { getCurrencySymbol } from "../../../../utils/currencySymbols";
// import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { HashNavigation, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
// import stayscardImage from "./stays-card-image.jpg";
// import { set } from "lodash";

// 1. Create type for BoostedItem
interface BoostedItem {
  id: number | string;
  type: "event" | "other"; // whatever types you have
  name?: string;
  title?: string;
  location?: string;
  specialInterest?: string;
  subtitle?: string;
  price?: number;
  maxAttendances?: number;
  files?: { url: string }[];
  images?: { url: string }[];
  cover_image?: { url: string };
  lowestRoomPrice?: number;
  currency?: string;
  eventType?: "ONLINE" | "ONSITE"; // for events only
}

export default function App() {
  const [loading, setLoading] = useState(true)
  // 2. Type the state,
  const [boostedItems, setBoostedItems] = useState<BoostedItem[]>([]);

  console.log(boostedItems, "Boosted Items");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    api.get("explore/boosted")
      .then((res) => {
        setLoading(false);
        setBoostedItems(res.data);
        console.log(res.data, "Hereore")
      })
      .catch((err) => console.error(err,"Error fetching boosted items"));
  }, []);


  return (
    <div id="promoted-section" className="w-full h-auto md:py-section-padding py-sm-section-padding">
      <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-10">
        {/* <div className="w-[50px] h-[30px]"> <img src={stayscardImage} alt="" /></div> */}

        {/* Left Label */}
        <div className="min-w-[340px] flex h-full items-center mt-12 md:mt-0 text-dark-blue">
          <h2 className="font-bold">
            <div className="md:text-5xl text-2xl md:block inline">Promoted </div>
            <div className="md:text-5xl text-2xl mt-[15px] md:block inline">Picks.</div>
          </h2>
        </div>

        {loading ? (
          <div className="mx-auto">
            <div className="w-full md:w-fit h-[250px] md:h-[500px] flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-purple-200"></div>
              <p className="text-sm text-gray-600 text-center max-w-xs">
                Please wait while the resources are being loaded...
              </p>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden promoted_sec">
            <div className="">
              <Swiper
                navigation={true}
                loop={boostedItems.length >= 3}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                }}
                loopAddBlankSlides={true}
                modules={[Navigation, HashNavigation, Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    centeredSlides: boostedItems.length === 1
                  },
                  600: {
                    slidesPerView: boostedItems.length >= 2 ? 2 : 1,
                    centeredSlides: boostedItems.length === 1
                  },
                  787: {
                    slidesPerView: 1,
                    centeredSlides: boostedItems.length === 1
                  },
                  1024: {
                    slidesPerView: boostedItems.length >= 2 ? 2 : 1,
                    centeredSlides: boostedItems.length === 1
                  },
                  1200: {
                    slidesPerView: boostedItems.length >= 3 ? 3 : boostedItems.length >= 2 ? 2 : 1,
                    centeredSlides: boostedItems.length === 1
                  }
                }}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {boostedItems.map((item, index) => {
                  console.log(item.type, "Itemssss type");
                  const isEvent = item.type == "event";
                  const title = isEvent ? item.name : item.title;
                  const subtitle = isEvent ? item?.specialInterest || "Exploring Ideas Beyond the Edge of Imagination" : item.subtitle;
                  const imageUrl = item.images?.[0]?.url
                    || item.files?.[0]?.url
                    || item.cover_image?.url;

                  const reviews = 0;
                  // const reviews = isEvent && item.maxAttendances ? item.maxAttendances : 100;
                  const isFirstSlide = activeIndex === index;
                  return (
                    <SwiperSlide className="staysCard" key={item.id ?? index}>
                      {imageUrl && (
                        <Link to={isEvent ? `/events/${item.id}` : `/stays/${item.id}`}>
                          <figure className="overflow-hidden rounded-md">
                            <img
                              src={imageUrl}
                              alt={title ?? "Boosted Item"}
                              className="rounded-t-xl h-[432px] w-full object-cover"
                            />
                          </figure>
                        </Link>
                      )}
                      {isFirstSlide &&
                        <Link to={isEvent ? `/events/${item.id}` : `/stays/${item.id}`}>
                          <div className="p-4 md:p-0 pt0 md:pt-2 staysDetailsCard">
                            <h3 className="text-[16px] font-medium text-dark-blue dmsans leading-none my-1">{title}</h3>
                            <p className="text-[14px] font-normal text-gray dmsans leading-5">
                              {subtitle}
                            </p>
                            <p className="text-base text-gray-800 mt-2 flex justify-between items-end">
                              <span className="text-purple-700 font-semibold">
                                ★
                                <span className="text-dark-blue font-semibold"> {0}</span>
                                <span className="text-gray font-normal"> ({reviews})</span>
                              </span>
                              {
                                (item?.lowestRoomPrice || item?.price) && (
                                  <span className="text-dark-blue font-semibold text-base">
                                    {getCurrencySymbol(item?.currency || "USD")} {isEvent ? item?.price : item?.lowestRoomPrice}
                                    <span className="text-gray text-sm font-normal">
                                      {isEvent
                                        ? (item.eventType === "ONLINE" ? "/device" : "/person")
                                        : "/night"
                                      }
                                    </span>
                                  </span>
                                )
                              }
                            </p>
                          </div>
                        </Link>
                      }
                    </SwiperSlide>
                  );
                })}

              </Swiper>
            </div>
            {/* Scroll buttons */}
          </div>
        )}
      </div>
    </div>
  );
}
