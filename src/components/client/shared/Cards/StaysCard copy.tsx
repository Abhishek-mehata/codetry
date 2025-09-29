// import { useRef } from "react";
// import stayscardImage from "./stays-card-image.jpg"
// import "./index.css"
// const stays = [
//   {
//     title: "Test",
//     subtitle: "Stays in बिराटनगर, Nepal",
//     rating: 9.6,
//     reviews: 160,
//     image: stayscardImage,
//   },
//   {
//     title: "Test",
//     subtitle: "Stays in बिराटनगर, Nepal",
//     rating: 9.6,
//     reviews: 160,
//     image: stayscardImage,
//   },
//   {
//     title: "Test",
//     subtitle: "Stays in बिराटनगर, Nepal",
//     rating: 9.6,
//     reviews: 160,
//     image: stayscardImage,
//   },
//   {
//     title: "Test",
//     subtitle: "Stays in बिराटनगर, Nepal",
//     rating: 9.6,
//     reviews: 160,
//     image: stayscardImage,
//   },
//   {
//     title: "Test",
//     subtitle: "Stays in बिराटनगर, Nepal",
//     rating: 9.6,
//     reviews: 160,
//     image: stayscardImage,
//   },
//   {
//     title: "Test",
//     subtitle: "Stays in बिराटनगर, Nepal",
//     rating: 9.6,
//     reviews: 160,
//     image: stayscardImage,
//   },
//   {
//     title: "Test",
//     subtitle: "Stays in बिराटनगर, Nepal",
//     rating: 9.6,
//     reviews: 160,
//     image: stayscardImage,
//   },
// ];

// export default function App() {
//   const carouselRef = useRef(null);

//   const scroll = (direction) => {
//     const { current } = carouselRef;
//     const scrollAmount = current.offsetWidth;

//     if (direction === "left") {
//       current.scrollLeft -= scrollAmount;
//     } else {
//       current.scrollLeft += scrollAmount;
//     }
//   };

//   return (
//     <div className="w-full h-auto px-6 py-10  " >
//       <div className="flex flex-col md:flex-row md:items-start gap-6">
//         {/* Left Label */}
//         <div className="md:w-1/4 flex justify-center items-center">
//           <h2 className="text-2xl font-bold text-center align-middle md:mt-[250px]">
//             <span className="bg-none text-center text-5xl py-1 inline-block">
//               Promoted By<br />DMT.
//             </span>
//           </h2>
//         </div>

//         {/* Carousel */}
//         <div className="relative md:w-3/4">
//           {/* <div className="flex items-center justify-around mb-4">
//             <button
//               onClick={() => scroll("left")}
//               className="bg-transparent bg-[#9c59df] rounded-full opacity-70  hover:bg-gray-400  text-white text-[30px] font-extrabold py-1 px-3  cursor-pointer"
//             >
//               ←
//             </button>
//             <button
//               onClick={() => scroll("right")}
//               className="bg-transparent bg-[#9c59df] rounded-full opacity-70  hover:bg-gray-400  text-white text-[30px] font-extrabold py-1 px-3  cursor-pointer"
//             >
//               →
//             </button>
//           </div> */}

//           <a href="http://localhost:5173/stays/3">

//             <div
//               ref={carouselRef}
//               className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
//             >
//               {stays.map((stay, index) => (
//                 <div
//                   key={index}
//                   className="snap-start shrink-0 h-[500px] w-[80%] sm:w-[60%] md:w-[45%] lg:w-[30%] bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer"
//                 >
//                   <img
//                     src={stay.image}
//                     alt={stay.title}
//                     className="rounded-t-xl w-full h-[80%] object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-sm font-medium text-purple-700">
//                       {stay.title}
//                     </h3>
//                     <p className="text-sm text-gray-600">{stay.subtitle}</p>
//                     <p className="text-sm text-gray-800 mt-1">
//                       <span className="text-purple-700 font-semibold">
//                         ★ {stay.rating}
//                       </span>{" "}
//                       ({stay.reviews})
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </a>

//           <div className="flex mt-8 items-center justify-end gap-10 mb-4 px-36">
//             <button
//               onClick={() => scroll("left")}
//               className=" bg-[#9c59df] rounded-full opacity-70  hover:bg-gray-400  text-white text-[30px] font-extrabold py-1 px-3  cursor-pointer"
//             >
//               ←
//             </button>
//             <button
//               onClick={() => scroll("right")}
//               className=" bg-[#9c59df] rounded-full opacity-70  hover:bg-gray-400  text-white text-[30px] font-extrabold py-1 px-3  cursor-pointer"
//             >
//               →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect,useState } from "react";
import "./index.css";
import api from "../../../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { HashNavigation, Navigation, Pagination } from "swiper/modules";
// import stayscardImage from "./stays-card-image.jpg";
// import { set } from "lodash";

// 1. Create type for BoostedItem
interface BoostedItem {
  id: number;
  type: "event" | "other"; // whatever types you have
  name?: string;
  title?: string;
  location?: string;
  subtitle?: string;
  price?: number;
  maxAttendances?: number;
  files?: { url: string }[];
  cover_image?: { url: string };
}

const boostedItems: BoostedItem[] = [
  {
    id: 1,
    type: "event",
    name: "Summer Music Festival",
    title: "Music Extravaganza 2025",
    location: "Agra, India",
    subtitle: "Experience the rhythms of summer",
    price: 150,
    maxAttendances: 5000,
    files: [
      { url: "https://example.com/files/festival-brochure.pdf" },
      { url: "https://example.com/files/festival-poster.jpg" }
    ],
    cover_image: {
      url: "https://example.com/images/festival-cover.jpg"
    }
  },
  {
    id: 2,
    type: "other",
    name: "Traditional Villa Stay",
    title: "Villa house",
    location: "Agra, India",
    subtitle: "The villa house provide authentic traditional culture",
    price: 200,
    files: [
      { url: "https://example.com/files/villa-brochure.pdf" }
    ],
    cover_image: {
      url: "https://example.com/images/villa-cover.jpg"
    }
  },
  {
    id: 3,
    type: "event",
    name: "Art Exhibition 2025",
    title: "Artistic Visions",
    location: "Delhi, India",
    subtitle: "Explore the contemporary art world",
    price: 100,
    maxAttendances: 2000,
    files: [
      { url: "https://example.com/files/exhibition-info.pdf" }
    ],
    cover_image: {
      url: "https://example.com/images/exhibition-cover.jpg"
    }
  },
  {
    id: 4,
    type: "other",
    name: "Business Conference 2025",
    title: "Innovate & Lead",
    location: "Mumbai, India",
    subtitle: "Join the leaders of tomorrow",
    price: 300,
    maxAttendances: 1000,
    files: [
      { url: "https://example.com/files/conference-agenda.pdf" }
    ],
    cover_image: {
      url: "https://example.com/images/conference-cover.jpg"
    }
  }
];


// import Left1 from "./images/left1.jpg";
export default function App() {
  const [loading, setLoading] = useState(true)
  // 2. Type the state,
  // const [boostedItems, setBoostedItems] = useState<BoostedItem[]>([]);
  console.log(boostedItems, "fasdfsfdasdfasdfasfdalkjf;lakjsfd;lk ")


  // 3. Type the ref
  // const carouselRef = useRef<HTMLDivElement>(null);

  // const isMobile = useMediaQuery({ maxWidth: 767 });


  // const scroll = (direction: "left" | "right") => {
  //   const { current } = carouselRef;
  //   if (!current) return; // 4. Safe check

  //   const scrollAmount = current.offsetWidth;

  //   if (direction === "left") {
  //     current.scrollLeft -= scrollAmount;
  //   } else {
  //     current.scrollLeft += scrollAmount;
  //   }
  // };

  useEffect(() => {
    api.get("explore/boosted")
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        // setBoostedItems(res.data);
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className="w-full h-auto md:py-section-padding py-sm-section-padding">
      <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-20">
        {/* <div className="w-[50px] h-[30px]"> <img src={stayscardImage} alt="" /></div> */}

        {/* Left Label */}
        <div className="md:w-1/4 flex justify-start items-center">
          <h2 className="font-bold md:mt-[250px]">
            <div className="md:text-5xl text-2xl md:block inline">Promoted By</div>
            <div className="md:text-5xl text-2xl mt-[15px] md:block inline">DMT.</div>
          </h2>
        </div>

        {loading ? (
          <div>
            <div className="w-full md:w-fit h-[250px] md:h-[500px] flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-purple-200"></div>
              <p className="text-sm text-gray-600 text-center max-w-xs">
                Please wait while the resources are being loaded...
              </p>
            </div>
          </div>
        ) : (
        
          <div className="relative  w-full md:w-fit overflow-hidden ">
              <div className="">
                <Swiper
                  navigation={true}
                  loop={true}
                  spaceBetween={50}
                    pagination={{
                    clickable: true,
                  }}
                  slidesPerView={3}
                  modules={[Pagination, Navigation, HashNavigation]}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {boostedItems.map((item, index) => {
                    const isEvent = item.type === "event";
                    const title = isEvent ? item.name : item.title;
                    const subtitle = isEvent ? item.location : item.subtitle;
                    const imageUrl = isEvent
                      ? item.files?.[0]?.url
                      : item.cover_image?.url;
                    const rating = isEvent && item.price ? item.price / 1000 : 9.0;
                    const reviews = isEvent && item.maxAttendances ? item.maxAttendances : 100;

                    return (
                    <SwiperSlide key={item.id ?? index}>
                      <div
                        className=""
                      >
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            // src={stayscardImage}
                            alt={title ?? "Boosted Item"}
                            className="rounded-t-xl w-full h-[75%] object-cover rounded-md"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-purple-700">{title}</h3>
                          <p className="text-sm font-medium text-[#8b9199]">{subtitle}</p>
                          <p className="text-sm text-gray-800 mt-1">
                            <span className="text-purple-700 font-semibold">
                              ★ {rating}
                            </span>{" "}
                            ({reviews})
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    );
                  })}

                </Swiper>                
              </div>
              {/* Scroll buttons */}

              {/* {isMobile ? boostedItems.length > 1 &&
                <div className="flex mt-8 items-center justify-center gap-10 mb-4  ">
                  <button
                    onClick={() => scroll("left")}
                    className="border border-[#9c59df] rounded-full text-[#9c59df] text-[25px] h-[50px] w-[50px]"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    className="border border-[#9c59df] rounded-full text-[#9c59df] text-[25px] h-[50px] w-[50px]"
                  >
                    →
                  </button>
                </div> :
                  boostedItems.length > 3 &&
                    <div className="flex mt-8 items-center justify-center gap-10 mb-4  ">
                      <button
                        onClick={() => scroll("left")}
                        className="border border-[#9c59df] rounded-full text-[#9c59df] text-[25px] h-[50px] w-[50px]"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => scroll("right")}
                        className="border border-[#9c59df] rounded-full text-[#9c59df] text-[25px] h-[50px] w-[50px]"
                      >
                        →
                      </button>
                    </div>
              } */}

          </div>
        )}
      </div>
    </div>
  );
}
