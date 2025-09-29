// import { FaLocationDot } from "react-icons/fa6";
// import { IoCaretDownOutline } from "react-icons/io5";
// import { LuShare } from "react-icons/lu";
// import { FaAngleDown } from "react-icons/fa6";
// import { FaCheck } from "react-icons/fa";
// import { useState, useRef, useEffect } from "react";
// import { BiDumbbell } from "react-icons/bi";
// import { GrElevator } from "react-icons/gr";
// import { MdOutlineFireplace } from "react-icons/md";
// import { IoIosWifi } from "react-icons/io";
// import { LiaHotTubSolid } from "react-icons/lia";
// import { BiSolidWasher } from "react-icons/bi";
// import { MdOutlinePool } from "react-icons/md";
// import { BiSolidDryer } from "react-icons/bi";
// import { PiBowlSteamBold } from "react-icons/pi";
// import { RiParkingBoxLine } from "react-icons/ri";
// import { MdOutlineFamilyRestroom } from "react-icons/md";
// import { FaSmoking } from "react-icons/fa";
// import { BsBalloonFill } from "react-icons/bs";
// import { MdPets } from "react-icons/md";
// import { BiHandicap } from "react-icons/bi";
// import { FaRegCircleCheck } from "react-icons/fa6";
// import { FaFacebook } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { MdOutlineAccessTime } from "react-icons/md";
// import "../../../index.css";
// import { RxCross2 } from "react-icons/rx";

// import api from "../../../api";
// import { useParams } from "react-router-dom";
// import { link } from "fs";
// // import StaysForm from "./StaysForm";

// const StaysDetails = () => {
//   const goodToKnow = [
//     {
//       title: "Children",
//       description: "Childern are welcome at this hotel.",
//       icons: [],
//     },
//     {
//       title: "Pets",
//       description: "No pets policy avilable.",
//       icons: [],
//     },
//     {
//       title: "Breakfast",
//       description: "	6am to 8am",
//       icons: [],
//     },
//     {
//       title: "Extra bed",
//       description: "	Child - free, Adult - Charges Apply",
//       icons: [],
//     },
//     {
//       title: "Accepts payment methods",
//       description: "The hotel accepts the following payment methods",
//       icons: [],
//     },
//     {
//       title: "Property Policy",
//       description: "	No property policies available",
//       icons: [],
//     },
//     {
//       title: "Platform Policy",
//       description: "	No description available.",
//       icons: [],
//     },
//     {
//       title: "Refundable",
//       description: "	No refundable information",
//       icons: [],
//     },
//     {
//       title: "Non Refundable",
//       description: "No non refundable information",
//       icons: [],
//     },
//     {
//       title: "Important information",
//       description:
//         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur esse enim, quo illo optio veritatis facilis accusamus. Tempore iusto odio sequi quidem natus aspernatur laboriosam aut itaque minima enim. Magnam repellat esse accusantium mollitia sunt qui illo iure excepturi? Dicta animi sequi, praesentium et nemo beatae qui obcaecati eos. Magni sapiente repudiandae, fugiat eligendi neque animi molestiae provident? Animi dolores ut mollitia distinctio est perspiciatis. ",
//       icons: [],
//     },
//   ];

//   const amenities = [
//     {
//       icon: "",
//       title: "Internet",
//     },
//     {
//       icon: <BiDumbbell />,
//       title: "Gym",
//     },
//     {
//       icon: <GrElevator />,
//       title: "Elevator in Building",
//     },
//     {
//       icon: <MdOutlineFireplace />,
//       title: "    Indoor Fireplace",
//     },
//     {
//       icon: "",
//       title: "  Buzzer/Wireless Intercom",
//     },
//     {
//       icon: "",
//       title: "  Doorman",
//     },
//     {
//       icon: "",
//       title: "  Shampoo",
//     },
//     {
//       icon: <IoIosWifi />,
//       title: "Wireless Internet",
//     },
//     {
//       icon: <LiaHotTubSolid />,
//       title: "Hot Tub",
//     },
//     {
//       icon: <BiSolidWasher />,
//       title: "Washer",
//     },
//     {
//       icon: <MdOutlinePool />,
//       title: "Pool",
//     },
//     {
//       icon: <BiSolidDryer />,
//       title: " Dryer",
//     },
//     {
//       icon: <PiBowlSteamBold />,
//       title: " Breakfast",
//     },
//     {
//       icon: <RiParkingBoxLine />,
//       title: "  Free Parking on Premises",
//     },
//     {
//       icon: <MdOutlineFamilyRestroom />,
//       title: " Family/Kid Friendly",
//     },
//     {
//       icon: <FaSmoking />,
//       title: "Smoking Allowed",
//     },
//     {
//       icon: <BsBalloonFill />,
//       title: "  Suitable for Events",
//     },
//     {
//       icon: <MdPets />,
//       title: "  Pets Allowed",
//     },
//     {
//       icon: "",
//       title: "Pets live on this property",
//     },
//     {
//       icon: <BiHandicap />,
//       title: " Wheelchair Accessible",
//     },
//     {
//       icon: <FaRegCircleCheck />,
//       title: "  Smoke Detector",
//     },
//     {
//       icon: <FaRegCircleCheck />,
//       title: "Carbon Monoxide Detector",
//     },
//     {
//       icon: <FaRegCircleCheck />,
//       title: " First Aid Kit",
//     },
//     {
//       icon: <FaRegCircleCheck />,
//       title: " Safety Card",
//     },
//     {
//       icon: <FaRegCircleCheck />,
//       title: "Fire Extinguisher",
//     },
//   ];

//   const more = [
//     {
//       title: "Property type",
//       content: "Property type: Apartment",
//     },
//     {
//       content: "Bathrooms: 1",
//     },
//     {
//       content: "Bedrooms: ",
//     },
//     {
//       content: "Accommodates: 8",
//     },
//     {
//       content: "Beds: 1",
//     },
//   ];

//   const { id } = useParams(); // fetch ID from URL

//   const [shareBtn, setShareBtn] = useState(true);
//   const Share = useRef<HTMLInputElement>(null);
//   const btn = () => {
//     {
//       shareBtn
//         ? Share.current?.classList.remove("hidden")
//         : Share.current?.classList.add("hidden");
//     }
//   };

//   const [count, setCount] = useState(true);
//   const ref = useRef<HTMLInputElement>(null);
//   const ref2 = useRef<HTMLInputElement>(null);

//   const StickyDivChange = () => {
//     {
//       count
//         ? ref2.current?.classList.add("lg:block")
//         : ref2.current?.classList.remove("lg:block");
//     }
//   };

//   const StickyDivChange2 = () => {
//     {
//       !count
//         ? ref.current?.classList.add("lg:block")
//         : ref.current?.classList.remove("lg:block");
//     }
//   };

//   const [moredetails, setMoredetails] = useState(true);
//   const [showMore, setShowMore] = useState(true);
//   const showMoreTog = useRef<HTMLInputElement>(null);

//   const toggleShowMore = () => {
//     setShowMore(!showMore);
//     {
//       showMore
//         ? showMoreTog.current?.classList.remove("h-[170px]")
//         : showMoreTog.current?.classList.add("h-[170px]");
//     }
//     {
//       showMore
//         ? showMoreTog.current?.classList.remove("md:h-[100px]")
//         : showMoreTog.current?.classList.add("md:h-[100px]");
//     }
//   };

//   const MoredetailsButton = () => {
//     if (moredetails === false) {
//       return (
//         <div className=" fixed flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-[#00000042] z-[9999]">
//           <div className=" scroll [&>h1]:text-xl overscroll-contain overflow-x-hidden  md:w-[800px] w-[100%] h-[90%] max:md:w-[98%] fixed  rounded-xl p-8 border border-[#9427F7] bg-white shadow-md shadow-[#bab9c6]">
//             <div className=" w-full flex flex-col items-end justify-end ">
//               <button
//                 onClick={() => {
//                   setMoredetails(!moredetails);
//                 }}
//                 className="p-1 text-white font-bold text-xl rounded fixed z-[99999] bg-[#9427F7] -mr-7   mt-1 opacity-80 "
//               >
//                 <RxCross2 />
//               </button>
//             </div>

//             <header className="h-[220px] mb-24 ">
//               <img
//                 src="https://dmttourism.com/images/property/13/1740383146_promoted1.jpeg"
//                 className="object-cover h-full w-full rounded-md "
//                 alt=""
//               />
//               <h1 className="mt-5 text-xl font-semibold md:text-3xl ">
//                 About this listing
//               </h1>
//             </header>

//             <body className=" overflow-hidden h-fit -mt-6 md:-mt-0 w-[98%] ">
//               <div className="border-b border-zinc-300 pb-4 md:flex md:items-end md:gap-[130px]">
//                 <h1 className="text-xl mb-4 font-semibold ">The Spaces</h1>
//                 <div className="md:columns-2">
//                   {more.map((items, i) => (
//                     <p className="pr-[50px]" key={i}>
//                       {items.content}
//                     </p>
//                   ))}
//                 </div>
//               </div>

//               <div className=" relative overflow-hidden pt-4 border-b border-zinc-300 pb-4 md:pb-16 md:flex md:items-center md:gap-[143px]">
//                 <h1 className="text-xl font-semibold ">Amenities</h1>
//                 <div
//                   ref={showMoreTog}
//                   className=" h-[170px] md:h-[100px] overflow-hidden md:columns-2"
//                 >
//                   {amenities.map((items, i) => (
//                     <div
//                       key={i}
//                       className="flex gap-2 text-[17px] opacity-60 items-center mt-3  "
//                     >
//                       <p className="text-xl">{items.icon}</p>
//                       <h1>{items.title}</h1>
//                     </div>
//                   ))}
//                 </div>
//                 <button
//                   onClick={() => {
//                     toggleShowMore();
//                   }}
//                   className="text-xl md:absolute md:bottom-2 md:left-[510px] font-semibold text-white bg-[#9327f7de] p-2 rounded-md mt-4 mx-1 "
//                 >
//                   {showMore ? "+ More" : " Show Less"}
//                 </button>
//               </div>

//               <div className="border-b border-zinc-300 pb-4 md:py-3 md:flex md:items-center md:gap-[185px]">
//                 <h1 className="text-xl mt-5 mb-4 font-semibold ">Prices</h1>
//                 <div className=" ">
//                   <p>
//                     {" "}
//                     Extra people:<span className="opacity-80"> No Charge</span>
//                   </p>
//                   <p>
//                     Weekly discount (%) :
//                     <span className="opacity-80">NPR 0 /week</span>
//                   </p>
//                   <p>
//                     {" "}
//                     Monthly discount
//                     <span className="opacity-80">NPR 0 /month</span>
//                   </p>
//                 </div>
//               </div>
//               <div className="border-b border-zinc-300 pb-4 md:py-3 md:flex md:items-center md:gap-24">
//                 <h1 className="text-xl mt-5 mb-4 font-semibold ">
//                   Safety Features
//                 </h1>
//                 <div className="md:columns-2">
//                   {amenities.map((items, i) => (
//                     <div className="">
//                       <p key={i} className="mr-12">
//                         {items.title}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </body>
//           </div>
//         </div>
//       );
//     }
//   };

//   interface PlaceDetails {
//     title?: string;
//     description?: string;
//     currency?: string | null;
//     price?: number | null;
//     place_type?: string;
//     street?: string;
//     city?: string;
//     province?: string;
//     postal_code?: string;
//     country?: string;
//     rating?: number | null;
//     subtitle?: string;
//     listing_status?: "ACTIVE" | "INACTIVE" | string;
//     booking_policy?: "FLEXIBLE" | "STRICT" | string;
//     latitude?: number;
//     longitude?: number;
//     businessNature?: "BUSINESS" | "INDIVIDUAL" | string;
//     individualNbr?: string | null;
//     individualTaxIdNbr?: string | null;
//     businessRegistrationNbr?: string;
//     businessTaxIdNbr?: string;
//     user_id?: number;
//     cover_image_id?: number;
//     createdAt?: string;
//     updatedAt?: string;
//     amenities?: string[];
//     safetyAmenities?: string[];
//     isBoosted?: boolean;
//     images?: {
//       id: number;
//       original_name: string;
//       url: string;
//       mimetype: string;
//       uid: string;
//       file_key: string;
//       place_id: number;
//       eventListingId: number | null;
//       createdAt: string;
//     }[];
//     user?: {
//       id: number;
//       firstName: string;
//       lastName: string;
//       email: string;
//       password: string;
//       phoneNumber: string | null;
//       country: string | null;
//       role: "SELLER" | "BUYER" | string;
//       isSeller: boolean;
//       isEmailConfirmed: boolean;
//       emailVerifyToken: string | null;
//       passwordResetToken: string | null;
//       isPhoneNumberConfirmed: boolean;
//       isCountryConfirmed: boolean;
//       status: "ACTIVE" | "INACTIVE" | string;
//       createdAt: string;
//       updatedAt: string;
//     };
//     cover_image?: {
//       id: number;
//       original_name: string;
//       url: string;
//       mimetype: string;
//       uid: string;
//       file_key: string;
//       place_id: number;
//       eventListingId: number | null;
//       createdAt: string;
//     };
//     rooms?: {
//       id: number;
//       title: string;
//       price: number;
//       stock: number;
//       room_type: "SINGLE" | "DOUBLE" | "SUITE" | string;
//       isDiscountAvailable: boolean;
//       discount: number | null;
//       transferService: "INCLUDED" | "NOT_INCLUDED" | string;
//       extraAmount: number | null;
//       place_id: number;
//       createdAt: string;
//       images: string[];
//     }[];
//   }

//   const [placeDetails, setPlaceDetails] = useState<PlaceDetails>({});

//   const fetchPlaceDetails = async () => {
//     try {
//       const res = await api.get(`/explore/place/${id}`);
//       setPlaceDetails(res.data); // Axios puts the data inside res.data
//     } catch (error) {
//       console.error("Error fetching event:", error);
//     }
//   };
//   console.log(placeDetails, "placeDetails");
//   useEffect(() => {
//     if (id) {
//       fetchPlaceDetails();
//     }
//   }, [id]);

//   return (
//     <div className="relative">
//       {/* -----the sticky divs----- */}

//       <div className=" lg:h-[90%] w-full h-[90%] md:px-16 absolute top-[500px] md:top-[500px]  flex justify-between mt-6 ">
//         {/*sticky nav bar*/}
//         <div className=" bg-white w-full place-content-center pl-5  md:pl-20 lg:w-[68%] md:w-[95%] border-zinc-300 sticky top-[75px]  z-50  md:h-[90px] h-[93px] border-b border-t ">
//           <div className="font-semibold text-sm flex gap-4 transition-all md:gap-8 md:text-xl  ">
//             <a href="#description" className="hover:text-[#9427F7]  ">
//               Details
//             </a>
//             <a href="#rooms" className="hover:text-[#9427F7] ">
//               Room
//             </a>
//             <a href="#info" className="hover:text-[#9427F7] ">
//               Info
//             </a>
//             <a href="#reviews" className="hover:text-[#9427F7] ">
//               Reviews
//             </a>
//           </div>
//         </div>
//         {/* sticky nav bar end*/}

//         {/* sticky div for booking */}

//         <div
//           ref={ref}
//           className="hidden lg:block max-w-[400px] mt-7 pt-5 sticky z-50 top-[140px] w-[30%]
//          h-[120px] border-[0.2px] border-zinc-300 bg-white rounded-md shadow-md shadow-[#bab9c6] p-4 "
//         >
//           <h1 className="font-semibold text-lg ">Select room for pricing</h1>
//           <p className="pt-5 text-sm ">
//             Free cancellation until{" "}
//             <span className="text-[#9427F7]"> May 28, 2025</span>
//           </p>
//         </div>

//         <div
//           ref={ref2}
//           className=" hidden sticky top-[140px] max-w-[350px] mt-7 pt-5 z-10 w-[30%]
//          h-[330px] border-[0.2px] border-zinc-300 bg-white rounded-md shadow-md shadow-[#bab9c6] "
//         >
//           <div className=" border-b border-zinc-300 px-4">
//             <h1 className="font-semibold text-lg ">NPR500.00</h1>
//           </div>
//           <div className="flex justify-between border-b border-zinc-300 px-4 ">
//             <p className="py-2 text-sm ">test product</p>
//             <p className="py-2 text-sm ">NPR500.00</p>
//           </div>
//           <div className="flex justify-between border-b border-zinc-300 px-4 ">
//             <p className="py-2 text-sm ">Total</p>
//             <p className="py-2 text-sm ">NPR500.00</p>
//           </div>
//           <div className="flex flex-col pt-4  items-center gap-4 text-white ">
//             <a
//               href="/staysForm/6"
//               className="p-3 shadow-md shadow-[#bab9c6]  bg-[#9427F7] rounded "
//             >
//               Request to Books
//             </a>

//             <p className="w-[80%] flex text-center justify-center items-center text-black ">
//               {/* You’ll be able to review before paying. */}
//             </p>

//             <div className="inline-flex gap-4">
//               <a
//                 href=""
//                 className="bg-blue-600 shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md p-1"
//               >
//                 <FaFacebook />
//                 Share
//               </a>
//               <a
//                 href=""
//                 className="bg-black shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md p-1"
//               >
//                 <FaXTwitter />
//                 Post
//               </a>
//               <a
//                 href=""
//                 className="bg-blue-800 shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md p-1"
//               >
//                 Share
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* sticky div for booking end */}

//       {/* -----the sticky divs----- end */}

//       <div className=" md:mx-12 mx-6 parent-div relative py-6 overflow-hidden ">
//         <header>
//           <div>
//             {/* share button div */}
//             <div className="flex justify-between lg:mx-20 ">
//               <div>
//                 <h1 className="text-xl font-semibold md:text-2xl ">
//                   {placeDetails?.title || "villa"}
//                 </h1>
//                 <p className="flex py-1 opacity-60 text-sm ">
//                   <i className="text-[#9427F7]">
//                     <FaLocationDot />
//                   </i>
//                   {placeDetails?.street || "विराटनगर"}
//                 </p>
//               </div>

//               <div className="relatrive w-fit h-fit group ">
//                 <button
//                   onClick={() => {
//                     setShareBtn(!shareBtn);
//                     btn();
//                   }}
//                   className=" shadow-md shadow-[#bab9c6]  mb-1 flex justify-center items-center border rounded-md p-[10px] px-[14px] border-[#9427F7] text-sm opacity-70
//              hover:bg-[#9427F7] hover:text-white transition-all "
//                 >
//                   <i className="mr-1.5">
//                     <LuShare />
//                   </i>
//                   Share
//                   <IoCaretDownOutline />
//                 </button>
//                 <ul
//                   ref ={Share}
//                   className=" shadow-md shadow-[#bab9c6] hidden transition-all absolute z-50  text-zinc-500 w-fit h-fit rounded-md [&>*]:rounded-md
//                bg-zinc-100 border border-[#ebd5ff] text-[13px] md:text-sm text-nowrap right-0 md:right-9 "
//                 >
//                   <li className=" hover:bg-[#BA92E9] p-1 px-2 hover:text-white ">
//                     <a href="https://facebook.com">share on Facebook</a>
//                   </li>
//                   <li className=" hover:bg-[#BA92E9] p-1 px-2 hover:text-white ">
//                     <a href="https://x.com">share on Twitter</a>
//                   </li>
//                   <li className=" hover:bg-[#BA92E9] p-1 px-2 hover:text-white ">
//                     <a href="https://linkedin.com">share on Linkedin</a>
//                   </li>
//                   <li className=" hover:bg-[#BA92E9] p-1 px-2 hover:text-white ">
//                     <a href="https://whatsapp.com">share on Whatsapp</a>
//                   </li>
//                   <li className=" hover:bg-[#BA92E9] p-1 px-2 hover:text-white ">
//                     <a href="https://email.com">share on Email</a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             {/* share button div end */}

//             {/* images for mid and large devices */}

//             {/* <div className="hidden md:block lg:flex lg:gap-10 xl: lg:justify-center lg:items-center lg:px-2  ">
//               <div className=" lg:w-[50%] ">
//                 <img
//                   className="w-full h-[400px] rounded-md object-cover mt-5 border-2 m-1 "
//                   src="https://dmttourism.com/storage/css/thumbnail_images/UD3CmjAMxqYJNjVRs0260yfyiwWYUOAg0AOSStjb.jpg"
//                   alt=""
//                 />
//               </div>
//               <div className=" flex gap-5 justify-center items-center px-1 pl-2 lg:flex lg:gap-3 lg:items-end lg:justify-evenly ">
//                 <div className=" w-[50%] ">
//                   <img
//                     className=" w-full h-[200px] rounded-md object- mt-5 object-cover border "
//                     src="https://dmttourism.com/storage/css/hotelimage/j6eNZxRrkGpHojlh5SFqYHfR2MIIYo9qPLUVXeSK.jpg"
//                     alt=""
//                   />
//                   <img
//                     className="w-full h-[200px] rounded-md object-cover mt-5 responsive "
//                     src="https://dmttourism.com/storage/css/hotelimage/CRksy8GIyEdGadqdbKRhPcALKtD6dtOSMJqIXwWH.jpg"
//                     alt=""
//                   />
//                 </div>
//                 <div className="b w-[50%]">
//                   <img
//                     className="w-full h-[200px] rounded-md object-cover mt-5 "
//                     src="https://dmttourism.com/storage/css/hotelimage/FE7sOiBp5X9Dw5wbjIuttq4Ym4IAsmLwCyf0jpTX.jpg"
//                     alt=""
//                   />

//                   <img
//                     className="w-full h-[200px] rounded-md object-cover mt-5 "
//                     src="https://dmttourism.com/storage/css/hotelimage/4C56I4oKhC0ZpmSI9bceYKnXy2xeYe13LJlIWIaW.jpg"
//                     alt=""
//                   />
//                 </div>
//               </div>
//             </div> */}
//             {/* {placeDetails?.images && placeDetails.images.length >= 0 && (
//   <div className="hidden md:block lg:flex lg:gap-10 xl: lg:justify-center lg:items-center lg:px-2">
//     <div className="lg:w-[50%]">
//       <img
//         className="w-full h-[400px] rounded-md object-cover mt-5 border-2 m-1"
//         src={placeDetails?.images[0]?.url}
//         alt="Main"
//       />
//     </div>
//     <div className="flex gap-5 justify-center items-center px-1 pl-2 lg:flex lg:gap-3 lg:items-end lg:justify-evenly">
//       <div className="w-[50%]">
//         <img
//           className="w-full h-[200px] rounded-md object-cover mt-5 border"
//           src={placeDetails?.images[1]?.url}
//           alt="Sub 1"
//         />
//         <img
//           className="w-full h-[200px] rounded-md object-cover mt-5"
//           src={placeDetails?.images[2]?.url}
//           alt="Sub 2"
//         />
//       </div>
//       <div className="w-[50%]">
//         <img
//           className="w-full h-[200px] rounded-md object-cover mt-5"
//           src={placeDetails?.images[3]?.url}
//           alt="Sub 3"
//         />
//         <img
//           className="w-full h-[200px] rounded-md object-cover mt-5"
//           src={placeDetails?.images[4]?.url}
//           alt="Sub 4"
//         />
//       </div>
//     </div>
//   </div>
// )} */}

//             {placeDetails.images && placeDetails?.images?.length > 0 && (
//               <>
//                 {placeDetails.images && placeDetails.images.length === 1 && (
//                   <div className="lg:flex lg:justify-center lg:items-center lg:px-2">
//                     <div className="lg:w-[50%] w-[99%] ">
//                       <img
//                         className="w-full h-[400px] rounded-md object-cover mt-5 border-2 m-1"
//                         src={placeDetails.images[0].url}
//                         alt="Main"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {placeDetails.images && placeDetails.images.length === 2 && (
//                   <div className="flex flex-wrap justify-center gap-4 mt-5">
//                     {placeDetails.images.slice(0, 2).map((img, index) => (
//                       <img
//                         key={index}
//                         className="w-[45%] h-[300px] rounded-md object-cover border"
//                         src={img.url}
//                         alt={`Image ${index + 1}`}
//                       />
//                     ))}
//                   </div>
//                 )}

//                 {(placeDetails.images && placeDetails.images.length === 3) ||
//                 (placeDetails.images && placeDetails.images.length === 4) ? (
//                   <div className="flex flex-wrap justify-center gap-4 mt-5">
//                     {placeDetails.images.slice(0, 4).map((img, index) => (
//                       <img
//                         key={index}
//                         className="w-[45%] h-[200px] rounded-md object-cover border"
//                         src={img.url}
//                         alt={`Image ${index + 1}`}
//                       />
//                     ))}
//                   </div>
//                 ) : null}

//                 {placeDetails.images && placeDetails.images.length >= 5 && (
//                   <div className="hidden md:block lg:flex lg:gap-10 xl: lg:justify-center lg:items-center lg:px-2">
//                     <div className="lg:w-[50%]">
//                       <img
//                         className="w-full h-[400px] rounded-md object-cover mt-5 border-2 m-1"
//                         src={placeDetails.images[0].url}
//                         alt="Main"
//                       />
//                     </div>
//                     <div className="flex gap-5 justify-center items-center px-1 pl-2 lg:flex lg:gap-3 lg:items-end lg:justify-evenly">
//                       <div className="w-[50%]">
//                         <img
//                           className="w-full h-[200px] rounded-md object-cover mt-5 border"
//                           src={placeDetails.images[1]?.url}
//                           alt="Sub 1"
//                         />
//                         <img
//                           className="w-full h-[200px] rounded-md object-cover mt-5"
//                           src={placeDetails.images[2]?.url}
//                           alt="Sub 2"
//                         />
//                       </div>
//                       <div className="w-[50%]">
//                         <img
//                           className="w-full h-[200px] rounded-md object-cover mt-5"
//                           src={placeDetails.images[3]?.url}
//                           alt="Sub 3"
//                         />
//                         <img
//                           className="w-full h-[200px] rounded-md object-cover mt-5"
//                           src={placeDetails.images[4]?.url}
//                           alt="Sub 4"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           {/* images for mid and large devices--end-- */}
//         </header>

//         <body className="lg:w-[75%] overflow-hidden h-[100%]">
//           {/* img & description */}
//           <div className="md:px-20 pt-28 md:pt-36 ">
//             <img
//               className=" absolute scale-[0.17] -left-[89px] top-[40px]
//             md:-left-[9px] md:top-[49px] md:pt-3  md:scale-[0.2]"
//               src="https://dmttourism.com/images/default-profile.png"
//               alt=""
//             />
//             <div
//               id="description"
//               className="md:-mt-[90px] pt-44 -mt-[90px] md:pt-48 flex flex-col gap-3  "
//             >
//               <h1 className="text-xl font-semibold md:text-2xl ">
//                 Description
//               </h1>
//               <p className="w-[90%] opacity-70">
//                 {placeDetails?.description ||
//                   "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esseamet at, quam enim repellendus numquam harum aperiam debitis asapiente?"}
//               </p>
//             </div>
//           </div>
//           {/* img & description end */}

//           {/* -----card1----- */}
//           {placeDetails.rooms && placeDetails.rooms.length >= 0 && (
//             <div
//               id="rooms"
//               className="card-wrapper -mt-36 pt-36 md:-mt-40 md:pt-40 md:px-20 md:pr-24"
//             >
//               <h1 className="text-xl font-semibold md:text-3xl pt-9 ">
//                 Choose your room
//               </h1>
//               {/* <div className="flex flex-col gap-3 mt-5 md:flex-row md:gap-5 md:w-[95%] ">
//               <div
//                 className=" bg-[#F4F4F4] border-[#9427F7] border h-auto max-w-[520px] w-[90%] lg:w-[85%] md:w-[80%] md:h-[310px] p-4 xl:h-[410px]
//            rounded-md px-3 text-sm flex flex-col gap-2 md:pt-5 "
//               >
//                 <ul className="list-disc list-inside flex flex-col gap-2 ">
//                   <li>No bed types available. </li>

//                   <li>
//                     {" "}
//                     <span className=" hover:text-[#9427F7] transition-all inline-flex items-center ">
//                       <button>More details</button>
//                       <i className="scale-[0.8]">
//                         <FaAngleDown />{" "}
//                       </i>
//                     </span>
//                   </li>
//                 </ul>
//                 <div className="flex justify-between items-center ">
//                   <span>
//                     <h1>NPR 0</h1>
//                     <p>per night</p>
//                   </span>
//                   <button className="border-red-600 text-red-600 font-semibold border rounded-xl p-[10px] px-[14px] text-sm">
//                     Sold Out
//                   </button>
//                 </div>
//               </div>

//               <div
//                 className=" bg-[#F4F4F4] border-[#9427F7] border max-w-[520px] h-auto w-[90%] lg:w-[85%] md:w-[80%] md:h-[310px] xl:h-[410px] p-4
//             rounded-md px-3 text-sm flex flex-col gap-2 "
//               >
//                 <img
//                   className="object-cover w-full h-[200px] rounded-md md:h-[140px] xl:h-[220px] "
//                   src="https://dmttourism.com/images/property/13/1740383146_promoted1.jpeg"
//                   alt=""
//                 />
//                 <h1 className="text-[16px] font-semibold pt-2 ">
//                   test product
//                 </h1>
//                 <ul className="list-disc list-inside flex flex-col gap-2 ">
//                   <li>Bed Type: king - Quantity: 1 </li>

//                   <li>
//                     {" "}
//                     <span className=" hover:text-[#9427F7] transition-all inline-flex items-center ">
//                       <button>More details</button>
//                       <i className="scale-[0.8]">
//                         <FaAngleDown />{" "}
//                       </i>
//                     </span>
//                   </li>
//                 </ul>
//                 <div className="flex justify-between items-center ">
//                   <span>
//                     <h1>NPR 0</h1>
//                     <p>per night</p>
//                   </span>
//                   {count ? (
//                     <button
//                       onClick={() => {
//                         {
//                           count ? setCount(false) : setCount(true);
//                           StickyDivChange();
//                           StickyDivChange2();
//                         }
//                       }}
//                       className="bg-[#9427F7] shadow-md shadow-[#bab9c6] text-white font-semibold rounded-xl p-[10px] px-[14px] text-sm"
//                     >
//                       Reserve
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         {
//                           count ? setCount(false) : setCount(true);
//                           StickyDivChange();
//                           StickyDivChange2();
//                         }
//                       }}
//                       className="bg-[#ffffff] text-[#9427F7] font-semibold shadow-md shadow-[#bab9c6] rounded-xl p-[10px] px-[14px] text-sm flex justify-center items-center gap-1 "
//                     >
//                       {" "}
//                       <FaCheck />
//                       Selected
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div> */}
//               <div className=" flex flex-col gap-5 mt-5 md:flex-row md:w-[95%] flex-wrap md:grid md:grid-cols-2 w-full">
//                 {placeDetails?.rooms?.map((room) => (
//                   <div
//                     key={room.id}
//                     className="bg-[#F4F4F4] border-[#9427F7] border max-w-[520px] min-h-[350px] w-[87.5%]  md:w-full p-4 rounded-md  text-sm flex flex-col gap-2"
//                   >
//                     <img
//                       className="object-cover w-full h-[200px] rounded-md md:h-[140px] xl:h-[220px]"
//                       src={room.images[0] || "/fallback-image.jpg"} // fallback if image is missing
//                       alt={room.title}
//                     />
//                     <h1 className="text-[16px] font-semibold pt-2">
//                       {room.title}
//                     </h1>
//                     <ul className="list-disc list-inside flex flex-col gap-2 h-full justify-end">
//                       <li>
//                         Room Type: {room.room_type} - Stock: {room.stock}
//                       </li>
//                       <li>
//                         <span className="hover:text-[#9427F7] transition-all">
//                           <button
//                             onClick={() => {
//                               setMoredetails(!moredetails);
//                             }}
//                           >
//                             More details
//                             <i className="scale-[0.8] inline-flex items-center justify-center ">
//                               <br /> <FaAngleDown />
//                             </i>
//                           </button>
//                         </span>
//                       </li>
//                     </ul>
//                     <div className="">{MoredetailsButton()}</div>
//                     <div className="flex justify-between items-end ">
//                       <span>
//                         <h1>NPR {room.price}</h1>
//                         <p>per night</p>
//                       </span>
//                       {count ? (
//                         <button
//                           onClick={() => {
//                             setCount(false);
//                             StickyDivChange();
//                             StickyDivChange2();
//                           }}
//                           className="bg-[#9427F7] shadow-md shadow-[#bab9c6] text-white font-semibold rounded-xl h-fit p-[10px] px-[14px] text-sm"
//                         >
//                           Reserve
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => {
//                             setCount(true);
//                             StickyDivChange();
//                             StickyDivChange2();
//                           }}
//                           className="bg-[#ffffff] text-[#9427F7] font-semibold shadow-md shadow-[#bab9c6] rounded-xl p-[10px] px-[14px] text-sm flex justify-center items-center gap-1"
//                         >
//                           <FaCheck />
//                           Selected
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//           {/* -----card2----- end  */}

//           {/* Amenities ( Public Area ) */}
//           <div className="md:px-20">
//             <h1 className="text-xl font-semibold md:text-3xl pt-9 ">
//               Amenities ( Public Area )
//             </h1>

//             <div className="flex flex-wrap gap-2 w-[90%] mt-4 [&>*]:bg-zinc-100 [&>*]:rounded-md [&>*]:flex [&>*]:flex-col [&>*]:items-center [&>*]:justify-center [&>*]:p-2 [&>*]:text-zinc-400 ">
//               {amenities.map((items, index) => (
//                 <h1 key={index}>
//                   {items.icon}
//                   {items.title}
//                 </h1>
//               ))}
//             </div>
//           </div>
//           {/* Amenities ( Public Area ) end */}

//           {/* Reviews */}
//           <div
//             id="reviews"
//             className=" pt-36 -mt-36 md:pt-40 md:-mt-40 md:px-20"
//           >
//             <h1 className=" text-xl font-semibold md:text-3xl pt-9 ">
//               Rewiews
//             </h1>
//             <div className="flex items-center gap-4">
//               <img src="" alt="" />
//               <div className="text-sm ">
//                 <h1 className="">Anupam</h1>
//                 <p className="opacity-50 text-[12px] ">May 2022</p>
//               </div>
//             </div>
//             <div className="text-[12px] ">
//               <p>Highly recommended</p>

//               <p className="mt-5">
//                 Highlight of my trip. I learned so mutch about the real local
//                 culture and its development,....
//               </p>
//             </div>
//           </div>
//           {/* Reviews end */}

//           {/* Policies */}
//           <div
//             id="info"
//             className="  pt-36 -mt-36 md:pt-40 md:-mt-40 md:px-20 w-[90%] overflow-hidden text-wrap "
//           >
//             <h1 className=" text-xl font-semibold md:text-3xl pt-9 ">
//               Policies
//             </h1>
//             <h1 className=" font-semibold pt-2 ">Good To Know</h1>
//           </div>
//           {goodToKnow.map((item, index) => (
//             <div className="md:px-20 mr-[50px] text-wrap overflow-hidden ">
//               <div className=" grid grid-cols-2  border-b border-zinc-300 px-4">
//                 <p key={index} className="py-2 text-sm ">
//                   {item.title}
//                 </p>
//                 <p className="py-2 text-sm ">{item.description}</p>
//               </div>
//             </div>
//           ))}
//           {/* Policies end */}

//           <div className="md:px-20 w-[80%] ">
//             <h1 className=" font-semibold pt-8 px-4 ">
//               Check in and check out
//             </h1>
//             <div className="flex items-center gap-24 text-nowrap md:gap-36 mt-3 ml-7 font-semibold ">
//               <p className="flex items-center gap-6">
//                 {" "}
//                 <span className="scale-[3]">
//                   <MdOutlineAccessTime />
//                 </span>{" "}
//                 Check in: <br />
//                 01:28 PM
//               </p>
//               <p className="flex items-center gap-6">
//                 {" "}
//                 <span className="scale-[3]">
//                   <MdOutlineAccessTime />
//                 </span>{" "}
//                 Check in: <br />
//                 01:28 PM
//               </p>
//             </div>
//           </div>
//         </body>

//         <div className="block lg:hidden mt-5 ">
//           <div
//             className={
//               count ? `w-full h-[120px] mt-5  ` : `w-full h-[320px] mt-5 `
//             }
//           >
//             {count ? (
//               <div
//                 className="block md:block lg:hidden max-w-[350px] mt-10 pt-5 md:w-[50%] w-[75%] ml-5 md:ml-20
//                            h-[120px] border-[0.2px] border-zinc-300 bg-white rounded-md shadow-md shadow-[#bab9c6] p-4 "
//               >
//                 <h1 className="font-semibold text-lg ">
//                   Select room for pricing
//                 </h1>
//                 <p className="pt-5 text-sm ">
//                   <span className="text-[#9427F7]"> May 28, 2025</span>
//                 </p>
//               </div>
//             ) : (
//               <div
//                 className=" block md:block lg:hidden max-w-[350px] mt-10 pt-5 md:w-[50%] w-[75%] ml-5 md:ml-20
//                            h-[320px] border-[0.2px] border-zinc-300 bg-white rounded-md shadow-md shadow-[#bab9c6] "
//               >
//                 <div className=" border-b border-zinc-300 px-4">
//                   <h1 className="font-semibold text-lg ">NPR500.00</h1>
//                 </div>
//                 <div className="flex justify-between border-b border-zinc-300 px-4 ">
//                   <p className="py-2 text-sm ">test product</p>
//                   <p className="py-2 text-sm ">NPR500.00</p>
//                 </div>
//                 <div className="flex justify-between border-b border-zinc-300 px-4 ">
//                   <p className="py-2 text-sm ">Total</p>
//                   <p className="py-2 text-sm ">NPR500.00</p>
//                 </div>
//                 <div className="flex flex-col  items-center  mt-4 gap-4 text-white ">
//                   <a
//                     href="/staysForm/6"
//                     className="p-3 shadow-md shadow-[#bab9c6]  bg-[#9427F7] rounded "
//                   >
//                     Request to Book
//                   </a>

//                   <p className="w-[80%] flex text-center justify-center items-center text-black ">
//                     You’ll be able to review before paying.
//                   </p>

//                   <div className="inline-flex gap-4">
//                     <a
//                       href=""
//                       className="bg-blue-600 shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md px-1 py-1"
//                     >
//                       <FaFacebook />
//                       Share
//                     </a>
//                     <a
//                       href=""
//                       className="bg-black shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md px-1 "
//                     >
//                       <FaXTwitter />
//                       Post
//                     </a>
//                     <a
//                       href=""
//                       className="bg-blue-800 text-nowrap shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md px-1"
//                     >
//                       in Share
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaysDetails;

import { FaLocationDot, FaAngleDown, FaCheck, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { IoCaretDownOutline } from "react-icons/io5";
import { LuShare } from "react-icons/lu";
import { BiDumbbell, BiSolidWasher, BiSolidDryer, BiHandicap } from "react-icons/bi";
import { GrElevator } from "react-icons/gr";
import { MdOutlineFireplace, MdOutlinePool, MdOutlineFamilyRestroom, MdPets, MdOutlineAccessTime } from "react-icons/md";
import { IoIosWifi } from "react-icons/io";
import { LiaHotTubSolid } from "react-icons/lia";
import { PiBowlSteamBold } from "react-icons/pi";
import { RiParkingBoxLine } from "react-icons/ri";
import { FaSmoking } from "react-icons/fa";
import { BsBalloonFill } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useState, useRef, useEffect } from "react";
import "../../../index.css";
import api from "../../../api";
import { useParams } from "react-router-dom";
import user from "../../../assets/svg/user 2.svg";

// Define interfaces
interface GoodToKnow {
  title: string;
  description: string;
  icons: JSX.Element[];
}

interface Amenity {
  icon: JSX.Element | string;
  title: string;
}

interface MoreInfo {
  title?: string;
  content: string;
}

interface Room {
  id: number;
  title: string;
  price: number;
  stock: number;
  room_type: string;
  isDiscountAvailable: boolean;
  discount: number | null;
  transferService: string;
  extraAmount: number | null;
  place_id: number;
  createdAt: string;
  images: string[];
}

interface Image {
  id: number;
  original_name: string;
  url: string;
  mimetype: string;
  uid: string;
  file_key: string;
  place_id: number;
  eventListingId: number | null;
  createdAt: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  country: string | null;
  role: string;
  isSeller: boolean;
  isEmailConfirmed: boolean;
  emailVerifyToken: string | null;
  passwordResetToken: string | null;
  isPhoneNumberConfirmed: boolean;
  isCountryConfirmed: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface PlaceDetails {
  title?: string;
  description?: string;
  currency?: string | null;
  price?: number | null;
  place_type?: string;
  street?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country?: string;
  rating?: number | null;
  subtitle?: string;
  listing_status?: string;
  booking_policy?: string;
  latitude?: number;
  longitude?: number;
  businessNature?: string;
  individualNbr?: string | null;
  individualTaxIdNbr?: string | null;
  businessRegistrationNbr?: string;
  businessTaxIdNbr?: string;
  user_id?: number;
  cover_image_id?: number;
  createdAt?: string;
  updatedAt?: string;
  amenities?: string[];
  safetyAmenities?: string[];
  isBoosted?: boolean;
  images?: Image[];
  user?: User;
  cover_image?: Image;
  rooms?: Room[];
}

const StaysDetails: React.FC = () => {
  const goodToKnow: GoodToKnow[] = [
    {
      title: "Children",
      description: "Children are welcome at this hotel.",
      icons: [],
    },
    {
      title: "Pets",
      description: "No pets policy available.",
      icons: [],
    },
    {
      title: "Breakfast",
      description: "6am to 8am",
      icons: [],
    },
    {
      title: "Extra bed",
      description: "Child - free, Adult - Charges Apply",
      icons: [],
    },
    {
      title: "Accepts payment methods",
      description: "The hotel accepts the following payment methods",
      icons: [],
    },
    {
      title: "Property Policy",
      description: "No property policies available",
      icons: [],
    },
    {
      title: "Platform Policy",
      description: "No description available.",
      icons: [],
    },
    {
      title: "Refundable",
      description: "No refundable information",
      icons: [],
    },
    {
      title: "Non Refundable",
      description: "No non refundable information",
      icons: [],
    },
    {
      title: "Important information",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur esse enim, quo illo optio veritatis facilis accusamus. Tempore iusto odio sequi quidem natus aspernatur.",
      icons: [],
    },
  ];

  const amenities: Amenity[] = [
    { icon: "", title: "Internet" },
    { icon: <BiDumbbell />, title: "Gym" },
    { icon: <GrElevator />, title: "Elevator in Building" },
    { icon: <MdOutlineFireplace />, title: "Indoor Fireplace" },
    { icon: "", title: "Buzzer/Wireless Intercom" },
    { icon: "", title: "Doorman" },
    { icon: "", title: "Shampoo" },
    { icon: <IoIosWifi />, title: "Wireless Internet" },
    { icon: <LiaHotTubSolid />, title: "Hot Tub" },
    { icon: <BiSolidWasher />, title: "Washer" },
    { icon: <MdOutlinePool />, title: "Pool" },
    { icon: <BiSolidDryer />, title: "Dryer" },
    { icon: <PiBowlSteamBold />, title: "Breakfast" },
    { icon: <RiParkingBoxLine />, title: "Free Parking on Premises" },
    { icon: <MdOutlineFamilyRestroom />, title: "Family/Kid Friendly" },
    { icon: <FaSmoking />, title: "Smoking Allowed" },
    { icon: <BsBalloonFill />, title: "Suitable for Events" },
    { icon: <MdPets />, title: "Pets Allowed" },
    { icon: "", title: "Pets live on this property" },
    { icon: <BiHandicap />, title: "Wheelchair Accessible" },
    { icon: <FaRegCircleCheck />, title: "Smoke Detector" },
    { icon: <FaRegCircleCheck />, title: "Carbon Monoxide Detector" },
    { icon: <FaRegCircleCheck />, title: "First Aid Kit" },
    { icon: <FaRegCircleCheck />, title: "Safety Card" },
    { icon: <FaRegCircleCheck />, title: "Fire Extinguisher" },
  ];

  const more: MoreInfo[] = [
    { title: "Property type", content: "Property type: Apartment" },
    { content: "Bathrooms: 1" },
    { content: "Bedrooms: " },
    { content: "Accommodates: 8" },
    { content: "Beds: 1" },
  ];

  const { id } = useParams<{ id: string }>();
  const [shareBtn, setShareBtn] = useState<boolean>(true);
  const [loader, setLoader] = useState(true)
  const Share = useRef<HTMLUListElement>(null);
  const btn = () => {
    if (shareBtn) {
      Share.current?.classList.remove("hidden");
    } else {
      Share.current?.classList.add("hidden");
    }
  };

  const [count, setCount] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const StickyDivChange = () => {
    if (count) {
      ref2.current?.classList.add("lg:block");
    } else {
      ref2.current?.classList.remove("lg:block");
    }
  };

  const StickyDivChange2 = () => {
    if (!count) {
      ref.current?.classList.add("lg:block");
    } else {
      ref.current?.classList.remove("lg:block");
    }
  };

  const [moredetails, setMoredetails] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(true);
  const showMoreTog = useRef<HTMLDivElement>(null);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    if (showMore) {
      showMoreTog.current?.classList.remove("h-[170px]");
      showMoreTog.current?.classList.remove("md:h-[100px]");
    } else {
      showMoreTog.current?.classList.add("h-[170px]");
      showMoreTog.current?.classList.add("md:h-[100px]");
    }
  };

  const MoredetailsButton = () => {
    if (!moredetails) {
      return (
        <div className="fixed flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-[#00000042] z-[9999]">
          <div className="scroll [&>h1]:text-xl overscroll-contain overflow-x-hidden md:w-[800px] w-[100%] h-[90%] max:md:w-[98%] fixed rounded-xl p-8 border border-[#9427F7] bg-white shadow-md shadow-[#bab9c6]">
            <div className="w-full flex flex-col items-end justify-end">
              <button
                onClick={() => setMoredetails(!moredetails)}
                className="p-1 text-white font-bold text-xl rounded fixed z-[99999] bg-[#9427F7] -mr-7 mt-1 opacity-80"
              >
                <RxCross2 />
              </button>
            </div>

            <header className="h-[220px] mb-24">
              <img
                src="https://dmttourism.com/images/property/13/1740383146_promoted1.jpeg"
                className="object-cover h-full w-full rounded-md"
                alt=""
              />
              <h1 className="mt-5 text-xl font-semibold md:text-3xl">
                About this listing
              </h1>
            </header>

            <div className="overflow-hidden h-fit -mt-6 md:-mt-0 w-[98%]">
              <div className="border-b border-zinc-300 pb-4 md:flex md:items-end md:gap-[130px]">
                <h1 className="text-xl mb-4 font-semibold">The Spaces</h1>
                <div className="md:columns-2">
                  {more.map((items, i) => (
                    <p className="pr-[50px]" key={i}>
                      {items.content}
                    </p>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden pt-4 border-b border-zinc-300 pb-4 md:pb-16 md:flex md:items-center md:gap-[143px]">
                <h1 className="text-xl font-semibold">Amenities</h1>
                <div
                  ref={showMoreTog}
                  className="h-[170px] md:h-[100px] overflow-hidden md:columns-2"
                >
                  {amenities.map((items, i) => (
                    <div
                      key={i}
                      className="flex gap-2 text-[17px] opacity-60 items-center mt-3"
                    >
                      <p className="text-xl">{items.icon}</p>
                      <h1>{items.title}</h1>
                    </div>
                  ))}
                </div>
                <button
                  onClick={toggleShowMore}
                  className="text-xl md:absolute md:bottom-2 md:left-[510px] font-semibold text-white bg-[#9327f7de] p-2 rounded-md mt-4 mx-1"
                >
                  {showMore ? "+ More" : "Show Less"}
                </button>
              </div>

              <div className="border-b border-zinc-300 pb-4 md:py-3 md:flex md:items-center md:gap-[185px]">
                <h1 className="text-xl mt-5 mb-4 font-semibold">Prices</h1>
                <div>
                  <p>
                    Extra people: <span className="opacity-80">No Charge</span>
                  </p>
                  <p>
                    Weekly discount (%): <span className="opacity-80">NPR 0 /week</span>
                  </p>
                  <p>
                    Monthly discount <span className="opacity-80">NPR 0 /month</span>
                  </p>
                </div>
              </div>
              <div className="border-b border-zinc-300 pb-4 md:py-3 md:flex md:items-center md:gap-24">
                <h1 className="text-xl mt-5 mb-4 font-semibold">Safety Features</h1>
                <div className="md:columns-2">
                  {amenities.map((items, i) => (
                    <p key={i} className="mr-12">
                      {items.title}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const [placeDetails, setPlaceDetails] = useState<PlaceDetails>({});
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const toggleRoomSelection = (roomId: number) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    );

  };
  const fetchPlaceDetails = async () => {
    try {
      const res = await api.get(`/explore/place/${id}`);
      setLoader(false);
      setPlaceDetails(res.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPlaceDetails();
    }
  }, [id]);
  const selectedRoomData = placeDetails?.rooms?.filter(room =>
    selectedRooms.includes(room.id)
  ) || [];
  const totalPrice = selectedRoomData.reduce((acc, room) => acc + room.price, 0);

  return (
    <div className="relative">
      <div className="lg:h-[82%] w-full h-[90%] md:px-16 absolute top-[500px] md:top-[500px] flex justify-between mt-6">
        <div className="bg-white w-full place-content-center pl-5 md:pl-20 lg:w-[68%] md:w-[95%] xl:w-[75%] border-zinc-300 sticky top-[75px] z-50 md:h-[90px] h-[93px] border-b border-t">
          <div className="font-semibold text-sm flex gap-4 transition-all md:gap-8 md:text-xl">
            <a href="#description" className="hover:text-[#9427F7]">
              Details
            </a>
            <a href="#rooms" className="hover:text-[#9427F7]">
              Room
            </a>
            <a href="#info" className="hover:text-[#9427F7]">
              Info
            </a>
            <a href="#reviews" className="hover:text-[#9427F7]">
              Reviews
            </a>
          </div>
        </div>

        <div
          ref={ref}
          className="hidden lg:block max-w-[400px] mt-7 pt-5 sticky z-50 top-[140px] w-[30%] h-[120px] border-[0.2px] border-zinc-300 bg-white rounded-md shadow-md shadow-[#bab9c6] p-4"
        >
          <h1 className="font-semibold text-lg">Select room for pricing</h1>
          <p className="pt-5 text-sm">
            Free cancellation until <span className="text-[#9427F7]">May 28, 2025</span>
          </p>
        </div>

        {/* <div
          ref={ref2}
          className="hidden sticky top-[140px] max-w-[350px] mt-7 pt-5 z-10 w-[30%] h-[330px] border-[0.2px] border-zinc-300 bg-white rounded-md shadow-md shadow-[#bab9c6]"
        >
          <div className="border-b border-zinc-300 px-4">
            <h1 className="font-semibold text-lg">NPR500.00</h1>
          </div>
          <div className="flex justify-between border-b border-zinc-300 px-4">
            <p className="py-2 text-sm">test product</p>
            <p className="py-2 text-sm">NPR500.00</p>
          </div>
          <div className="flex justify-between border-b border-zinc-300 px-4">
            <p className="py-2 text-sm">Total</p>
            <p className="py-2 text-sm">NPR500.00</p>
          </div>
          <div className="flex flex-col pt-4 items-center gap-4 text-white">
            <a href="/staysForm/6" className="p-3 shadow-md shadow-[#bab9c6] bg-[#9427F7] rounded">
              Request to Book
            </a>
            <div className="inline-flex gap-4">
              <a
                href=""
                className="bg-blue-600 shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md p-1"
              >
                <FaFacebook />
                Share
              </a>
              <a
                href=""
                className="bg-black shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md p-1"
              >
                <FaXTwitter />
                Post
              </a>
              <a
                href=""
                className="bg-blue-800 shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md p-1"
              >
                Share
              </a>
            </div>
          </div>
        </div> */}
        <div
          ref={ref2}
          className=" hidden sticky top-[140px] max-w-[350px] mt-7 pt-5 z-10 w-[30%]
         h-[330px] border-[0.2px] border-zinc-300 bg-white rounded-md shadow-md shadow-[#bab9c6] "
        >
          <div className="border-b border-zinc-300 px-4">
            <h1 className="font-semibold text-lg">Total: NPR {totalPrice}</h1>
          </div>

          {selectedRoomData.map((room) => (
            <div key={room.id} className="flex justify-between border-b border-zinc-300 px-4">
              <p className="py-2 text-sm">{room.title}</p>
              <p className="py-2 text-sm">NPR {room.price}</p>
            </div>
          ))}

          <div className="flex justify-between border-b border-zinc-300 px-4">
            <p className="py-2 text-sm font-semibold">Grand Total</p>
            <p className="py-2 text-sm font-semibold">NPR {totalPrice}</p>
          </div>

          <div className="flex flex-col items-center mt-4 gap-4 text-white">
            <a
              href={`/staysForm/${selectedRoomData[0]?.id ?? ''}`}
              className="p-3 shadow-md shadow-[#bab9c6] bg-[#9427F7] rounded"
            >
              Request to Book
            </a>

            <p className="w-[80%] text-center text-black">
              You’ll be able to review before paying.
            </p>

            <div className="inline-flex gap-4">
              <a
                href=""
                className="bg-blue-600 shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md p-1"
              >
                <FaFacebook />
                Share
              </a>
              <a
                href=""
                className="bg-black shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md p-1"
              >
                <FaXTwitter />
                Post
              </a>
              <a
                href=""
                className="bg-blue-800 shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md p-1"
              >
                Share
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="md:mx-12 mx-6 parent-div relative py-6 overflow-hidden">
        <header>
          <div>
            <div className="flex justify-between lg:mx-20">
              <div>
                <h1 className="text-xl font-semibold md:text-2xl">{placeDetails?.title || "villa"}</h1>
                <p className="flex py-1 opacity-60 text-sm">
                  <i className="text-[#9427F7]">
                    <FaLocationDot />
                  </i>
                  {placeDetails?.street || "विराटनगर"}
                </p>
              </div>

              <div className="relative w-fit  h-fit group">
                <button
                  onClick={() => {
                    setShareBtn(!shareBtn);
                    btn();
                  }}
                  className="shadow-md shadow-[#bab9c6] mb-1 flex justify-center items-center border rounded-md p-[10px] px-[14px] border-[#9427F7] text-sm opacity-70 hover:bg-[#9427F7] hover:text-white transition-all"
                >
                  <i className="mr-1.5">
                    <LuShare />
                  </i>
                  Share
                  <IoCaretDownOutline />
                </button>

                <ul
                  ref={Share}
                  className="shadow-md shadow-[#bab9c6] hidden transition-all absolute z-50 text-zinc-500 w-fit h-fit rounded-md [&>*]:rounded-md bg-zinc-100 border border-[#ebd5ff] text-[13px] md:text-sm text-nowrap right-0 "
                >
                  <li className="hover:bg-[#BA92E9] p-1 px-2 hover:text-white">
                    <a href="https://facebook.com">share on Facebook</a>
                  </li>
                  <li className="hover:bg-[#BA92E9] p-1 px-2 hover:text-white">
                    <a href="https://x.com">share on Twitter</a>
                  </li>
                  <li className="hover:bg-[#BA92E9] p-1 px-2 hover:text-white">
                    <a href="https://linkedin.com">share on Linkedin</a>
                  </li>
                  <li className="hover:bg-[#BA92E9] p-1 px-2 hover:text-white">
                    <a href="https://whatsapp.com">share on Whatsapp</a>
                  </li>
                  <li className="hover:bg-[#BA92E9] p-1 px-2 hover:text-white">
                    <a href="https://email.com">share on Email</a>
                  </li>
                </ul>
              </div>
            </div>

            {loader ? (
              // Loader goes here
              <div>
                <div className="">
                  <div className="lg:w-[96vw] mx-auto h-[310px]  lg:h-[410px] flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-purple-200"></div>
                    <p className="text-sm text-gray-600 text-center max-w-xs">
                      Please wait while the resources are being loaded...
                    </p>
                  </div>
                </div>
              </div>
            ) : (

              // Stays Image container goes here
              <div>
                {placeDetails.images && placeDetails.images.length > 0 && (
                  <>
                    {placeDetails.images.length === 1 && (
                      <div className="lg:flex lg:justify-center lg:items-center lg:px-2">
                        <div className="lg:w-[50%] w-[99%]">
                          <img
                            className="w-full h-[400px] rounded-md object-cover mt-5 m-1"
                            src={placeDetails.images[0].url}
                            alt="Main"
                          />
                        </div>
                      </div>
                    )}

                    {placeDetails.images.length === 2 && (
                      <div className="flex flex-wrap justify-center gap-4 mt-5">
                        {placeDetails.images.slice(0, 2).map((img, index) => (
                          <img
                            key={index}
                            className="w-[45%] h-[300px] rounded-md object-cover border"
                            src={img.url}
                            alt={`Image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}

                    {(placeDetails.images.length === 3 || placeDetails.images.length === 4) && (
                      <div className="flex flex-wrap justify-center gap-4 mt-5">
                        {placeDetails.images.slice(0, 4).map((img, index) => (
                          <img
                            key={index}
                            className="w-[45%] h-[200px] rounded-md object-cover border"
                            src={img.url}
                            alt={`Image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}

                    {placeDetails.images.length >= 5 && (
                      <div className="hidden md:block lg:flex lg:gap-10 xl: lg:justify-center lg:items-center lg:px-2">
                        <div className="lg:w-[50%]">
                          <img
                            className="w-full h-[400px] rounded-md object-cover mt-5 m-1"
                            src={placeDetails.images[0].url}
                            alt="Main"
                          />
                        </div>
                        <div className="flex gap-5 justify-center items-center px-1 pl-2 lg:flex lg:gap-3 lg:items-end lg:justify-evenly">
                          <div className="w-[50%]">
                            <img
                              className="w-full h-[200px] rounded-md object-cover mt-5"
                              src={placeDetails.images[1]?.url}
                              alt="Sub 1"
                            />
                            <img
                              className="w-full h-[200px] rounded-md object-cover mt-5"
                              src={placeDetails.images[2]?.url}
                              alt="Sub 2"
                            />
                          </div>
                          <div className="w-[50%]">
                            <img
                              className="w-full h-[200px] rounded-md object-cover mt-5"
                              src={placeDetails.images[3]?.url}
                              alt="Sub 3"
                            />
                            <img
                              className="w-full h-[200px] rounded-md object-cover mt-5"
                              src={placeDetails.images[4]?.url}
                              alt="Sub 4"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            {/* {placeDetails.images && placeDetails.images.length > 0 && (
              <>
                {placeDetails.images.length === 1 && (
                  <div className="lg:flex lg:justify-center lg:items-center lg:px-2">
                    <div className="lg:w-[50%] w-[99%]">
                      <img
                        className="w-full h-[400px] rounded-md object-cover mt-5 border-2 m-1"
                        src={placeDetails.images[0].url}
                        alt="Main"
                      />
                    </div>
                  </div>
                )}

                {placeDetails.images.length === 2 && (
                  <div className="flex flex-wrap justify-center gap-4 mt-5">
                    {placeDetails.images.slice(0, 2).map((img, index) => (
                      <img
                        key={index}
                        className="w-[45%] h-[300px] rounded-md object-cover border"
                        src={img.url}
                        alt={`Image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {(placeDetails.images.length === 3 || placeDetails.images.length === 4) && (
                  <div className="flex flex-wrap justify-center gap-4 mt-5">
                    {placeDetails.images.slice(0, 4).map((img, index) => (
                      <img
                        key={index}
                        className="w-[45%] h-[200px] rounded-md object-cover border"
                        src={img.url}
                        alt={`Image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {placeDetails.images.length >= 5 && (
                  <div className="hidden md:block lg:flex lg:gap-10 xl: lg:justify-center lg:items-center lg:px-2">
                    <div className="lg:w-[50%]">
                      <img
                        className="w-full h-[400px] rounded-md object-cover mt-5 border-2 m-1"
                        src={placeDetails.images[0].url}
                        alt="Main"
                      />
                    </div>
                    <div className="flex gap-5 justify-center items-center px-1 pl-2 lg:flex lg:gap-3 lg:items-end lg:justify-evenly">
                      <div className="w-[50%]">
                        <img
                          className="w-full h-[200px] rounded-md object-cover mt-5 border"
                          src={placeDetails.images[1]?.url}
                          alt="Sub 1"
                        />
                        <img
                          className="w-full h-[200px] rounded-md object-cover mt-5"
                          src={placeDetails.images[2]?.url}
                          alt="Sub 2"
                        />
                      </div>
                      <div className="w-[50%]">
                        <img
                          className="w-full h-[200px] rounded-md object-cover mt-5"
                          src={placeDetails.images[3]?.url}
                          alt="Sub 3"
                        />
                        <img
                          className="w-full h-[200px] rounded-md object-cover mt-5"
                          src={placeDetails.images[4]?.url}
                          alt="Sub 4"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )} */}
          </div>
        </header>

        <div className="lg:w-[75%] overflow-hidden h-[100%] px-12 md:px-0 ">
          <div className="md:px-20 pt-32 md:pt-36">
            <>
            </>
            <img
              className=" object-contain w-[40px] md:w-[50px]"
              src={user}
              alt="user"
            />
            <div id="description" className="md:-mt-[90px]-mt-[90px] flex flex-col gap-3 pt-5">
              <h1 className="text-xl font-semibold md:text-2xl">Description</h1>
              <p className="w-[90%] opacity-70">
                {placeDetails?.description ||
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esseamet at, quam enim repellendus numquam harum aperiam debitis asapiente?"}
              </p>
            </div>
          </div>

          {placeDetails.rooms && placeDetails.rooms.length >= 0 && (
            <div id="rooms" className="card-wrapper -mt-36 pt-36 md:-mt-40 md:pt-40 md:px-20 md:pr-24">
              <h1 className="text-xl font-semibold md:text-3xl pt-9">Choose your room</h1>
              <div className="flex flex-col gap-5 mt-5 md:flex-row md:w-[95%] flex-wrap md:grid md:grid-cols-2 w-full">
                {placeDetails?.rooms?.map((room) => (
                  <div
                    key={room.id}
                    className="bg-[#F4F4F4] border-[#9427F7] border lg: min-h-[350px] w-full md:w-full p-4 rounded-md text-sm flex flex-col gap-2"
                  >
                    <img
                      className="object-cover w-full h-[200px] rounded-md md:h-[140px] xl:h-[220px]"
                      src={room.images[0] || "/fallback-image.jpg"}
                      alt={room.title}
                    />
                    <h1 className="text-[16px] font-semibold pt-2">{room.title}</h1>
                    <ul className="list-disc list-inside flex flex-col gap-2 h-full justify-end">
                      <li>
                        Room Type: {room.room_type} - Stock: {room.stock}
                      </li>
                      <li>
                        <span className="hover:text-[#9427F7] transition-all">
                          <button onClick={() => setMoredetails(!moredetails)}>
                            More details
                            <i className="scale-[0.8] inline-flex items-center justify-center">
                              <br />
                              <FaAngleDown />
                            </i>
                          </button>
                        </span>
                      </li>
                    </ul>
                    <div>{MoredetailsButton()}</div>
                    {/* <div className="flex justify-between items-end">
                      <span>
                        <h1>NPR {room.price}</h1>
                        <p>per night</p>
                      </span>
                      {count ? (
                        <button
                          onClick={() => {
                            setCount(false);
                            StickyDivChange();
                            StickyDivChange2();
                          }}
                          className="bg-[#9427F7] shadow-md shadow-[#bab9c6] text-white font-semibold rounded-xl h-fit p-[10px] px-[14px] text-sm"
                        >
                          Reserve
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setCount(true);
                            StickyDivChange();
                            StickyDivChange2();
                          }}
                          className="bg-[#ffffff] text-[#9427F7] font-semibold shadow-md shadow-[#bab9c6] rounded-xl p-[10px] px-[14px] text-sm flex justify-center items-center gap-1"
                        >
                          <FaCheck />
                          Selected
                        </button>
                      )}
                    </div> */}
                    <div className="flex justify-between items-center">
                      <span>
                        <h1>NPR {room.price}</h1>
                        <p>per night</p>
                      </span>
                      {selectedRooms.includes(room.id) ? (
                        <button
                          onClick={() => {
                            toggleRoomSelection(room.id);
                            StickyDivChange();
                            StickyDivChange2();
                          }}
                          className="bg-[#ffffff] text-[#9427F7] font-semibold shadow-md shadow-[#bab9c6] rounded-xl p-[10px] px-[14px] text-sm flex justify-center items-center gap-1"
                        >
                          <FaCheck />
                          Selected
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            toggleRoomSelection(room.id);
                            StickyDivChange();
                            setCount(false);
                            StickyDivChange2();
                          }}
                          className="bg-[#9427F7] shadow-md shadow-[#bab9c6] text-white font-semibold rounded-xl p-[10px] px-[14px] text-sm"
                        >
                          Reserve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="md:px-20 w-full">
            <h1 className="text-xl font-semibold md:text-3xl pt-9">Amenities (Public Area)</h1>
            <div className="flex flex-wrap gap-2 w-full mt-4 [&>*]:bg-zinc-100 [&>*]:rounded-md [&>*]:flex [&>*]:flex-col [&>*]:items-center [&>*]:justify-center [&>*]:p-2 [&>*]:text-zinc-400">
              {amenities.map((items, index) => (
                <h1 key={index}>
                  {items.icon}
                  {items.title}
                </h1>
              ))}
            </div>
          </div>

          <div id="reviews" className="pt-36 -mt-36 md:pt-40 md:-mt-40 md:px-20">
            <h1 className="text-xl font-semibold md:text-3xl pt-9 pb-5">Reviews</h1>
            <div className="flex items-center gap-4">
              <img className="object-cover w-10" src={user} alt="user" />
              <div className="text-sm">
                <h1>Anupam</h1>
                <p className="opacity-50 text-[12px]">May 2022</p>
              </div>
            </div>
            <div className="text-[12px] pt-3">
              <p>Highly recommended</p>
              <p className="pt-3">
                Highlight of my trip. I learned so much about the real local culture and its development,...
              </p>
            </div>
          </div>

          <div id="info" className="pt-36 -mt-36 md:pt-40 md:-mt-40 md:px-20 w-[90%] overflow-hidden text-wrap">
            <h1 className="text-xl font-semibold md:text-3xl pt-9">Policies</h1>
            <h1 className="font-semibold pt-2">Good To Know</h1>
          </div>
          {goodToKnow.map((item, index) => (
            <div key={index} className="md:px-20 mr-[50px] text-wrap overflow-hidden">
              <div className="grid grid-cols-2 border-b border-zinc-300 px-4">
                <p className="py-2 text-sm">{item.title}</p>
                <p className="py-2 text-sm">{item.description}</p>
              </div>
            </div>
          ))}

          <div className="md:px-20 w-[80%]">
            <h1 className="font-semibold pt-8 px-4">Check in and check out</h1>
            <div className="flex items-center gap-24 text-nowrap md:gap-36 mt-3 ml-7 font-semibold">
              <p className="flex items-center gap-6">
                <span className="scale-[3]">
                  <MdOutlineAccessTime />
                </span>
                Check in: <br />
                01:28 PM
              </p>
              <p className="flex items-center gap-6">
                <span className="scale-[3]">
                  <MdOutlineAccessTime />
                </span>
                Check out: <br />
                01:28 PM
              </p>
            </div>
          </div>
        </div>

        <div className="block lg:hidden mt-5 pl-8">
          <div className={count ? `w-full h-[120px] mt-5` : `w-full h-[320px] mt-5`}>
            {count ? (
              <div className="block md:block lg:hidden max-w-[350px] mt-10 pt-5 md:w-[50%] w-[75%] ml-5 md:ml-20 h-[120px] border-[0.2px] border-zinc-300 bg-white rounded-md shadow-md shadow-[#bab9c6] p-4">
                <h1 className="font-semibold text-lg">Select room for pricing</h1>
                <p className="pt-5 text-sm">
                  <span className="text-[#9427F7]">May 28, 2025</span>
                </p>
              </div>
            ) : (
              <div className="block md:block lg:hidden max-w-[350px] mt-10 pt-5 md:w-[50%] w-[75%] ml-5 md:ml-20 h-[320px] border-[0.2px] border-zinc-300 bg-white rounded-md shadow-md shadow-[#bab9c6]">
                <div className="border-b border-zinc-300 px-4">
                  <h1 className="font-semibold text-lg">NPR500.00</h1>
                </div>
                <div className="flex justify-between border-b border-zinc-300 px-4">
                  <p className="py-2 text-sm">test product</p>
                  <p className="py-2 text-sm">NPR500.00</p>
                </div>
                <div className="flex justify-between border-b border-zinc-300 px-4">
                  <p className="py-2 text-sm">Total</p>
                  <p className="py-2 text-sm">NPR500.00</p>
                </div>
                <div className="flex flex-col items-center mt-4 gap-4 text-white">
                  <a href="/staysForm/6" className="p-3 shadow-md shadow-[#bab9c6] bg-[#9427F7] rounded">
                    Request to Book
                  </a>
                  <p className="w-[80%] flex text-center justify-center items-center text-black">
                    You’ll be able to review before paying.
                  </p>
                  <div className="inline-flex gap-4">
                    <a
                      href=""
                      className="bg-blue-600 shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md px-1 py-1"
                    >
                      <FaFacebook />
                      Share
                    </a>
                    <a
                      href=""
                      className="bg-black shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md px-1"
                    >
                      <FaXTwitter />
                      Post
                    </a>
                    <a
                      href=""
                      className="bg-blue-800 text-nowrap shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md px-1"
                    >
                      in Share
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaysDetails;