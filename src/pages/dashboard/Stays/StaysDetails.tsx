import { FaLocationDot, FaAngleDown, FaCheck } from "react-icons/fa6";
import { IoCaretDownOutline } from "react-icons/io5";
import { LuShare } from "react-icons/lu";
import { BiDumbbell, BiSolidWasher, BiSolidDryer, BiHandicap } from "react-icons/bi";
import { GrElevator } from "react-icons/gr";
import { MdOutlineFireplace, MdOutlinePool, MdOutlineFamilyRestroom, MdPets, MdOutlineBed } from "react-icons/md";
import { IoIosWifi } from "react-icons/io";
import { LiaHotTubSolid } from "react-icons/lia";
import { PiBowlSteamBold, PiCookingPot, PiTelevision } from "react-icons/pi";
import { RiParkingBoxLine } from "react-icons/ri";
import { FaSmoking } from "react-icons/fa";
import { BsBalloonFill } from "react-icons/bs";
// import { FaShare } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useState, useRef, useEffect } from "react";
import "../../../index.css";
import api from "../../../api";
import { useParams } from "react-router-dom";
// import user from "../../../assets/svg/user 2.svg";
import StayImageContainer from "./StayImageContainer";
import { useDispatch } from "react-redux";
// import { RootAppState } from "../../../redux/store";
import { reservedRoom } from "../../../redux/reducers/places";
import { Link } from "react-router-dom";
import Container from "../../../components/client/shared/Container";
import { getCurrencySymbol } from "../../../utils/currencySymbols";
import userP1 from "../../../../src/assets/svg/user 2.svg";


// Define interfaces
interface GoodToKnow {
  title: string;
  description: string;
  icons: JSX.Element[];
}

interface Bed {
  id: number;
  bed_type: string;
  room_id: number;
  amount: number;
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
  occupancy?: string;
  place_id: number;
  createdAt: string;
  images: string[];
  beds: Bed[];
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
  profilePicture: string;
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

export interface PlaceDetails {
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
  // const isAuthenticated = useSelector(
  //   (state: RootAppState) => state.auth.isAuthenticated
  // );

  const amenityIcons: { [key: string]: JSX.Element } = {
    "TV": <PiTelevision />,
    "Cable TV": <PiTelevision />,
    "Kitchen": <PiCookingPot />,
    "Internet": <IoIosWifi />,
    "Gym": <BiDumbbell />,
    "Elevator in Building": <GrElevator />,
    "Indoor Fireplace": <MdOutlineFireplace />,
    "Buzzer/Wireless Intercom": <FaRegCircleCheck />,
    "Doorman": <FaRegCircleCheck />,
    "Shampoo": <FaRegCircleCheck />,
    "Wireless Internet": <IoIosWifi />,
    "Hot Tub": <LiaHotTubSolid />,
    "Washer": <BiSolidWasher />,
    "Pool": <MdOutlinePool />,
    "Dryer": <BiSolidDryer />,
    "Breakfast": <PiBowlSteamBold />,
    "Free Parking on Premises": <RiParkingBoxLine />,
    "Family/Kid Friendly": <MdOutlineFamilyRestroom />,
    "Smoking Allowed": <FaSmoking />,
    "Suitable for Events": <BsBalloonFill />,
    "Pets Allowed": <MdPets />,
    "Pets live on this property": <MdPets />,
    "Wheelchair Accessible": <BiHandicap />,
    "Smoke Detector": <FaRegCircleCheck />,
    "Carbon Monoxide Detector": <FaRegCircleCheck />,
    "First Aid Kit": <FaRegCircleCheck />,
    "Safety Card": <FaRegCircleCheck />,
    "Fire Extinguisher": <FaRegCircleCheck />,
  };

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

  const [moredetails, setMoredetails] = useState<boolean>(true);
  // const [showMore, setShowMore] = useState<boolean>(true);
  const showMoreTog = useRef<HTMLDivElement>(null);

  // const toggleShowMore = () => {
  //   setShowMore(!showMore);
  //   if (showMore) {
  //     showMoreTog.current?.classList.remove("h-[170px]");
  //     showMoreTog.current?.classList.remove("md:h-[100px]");
  //   } else {
  //     showMoreTog.current?.classList.add("h-[170px]");
  //     showMoreTog.current?.classList.add("md:h-[100px]");
  //   }
  // };

  const MoredetailsButton = () => {
    if (!moredetails) {
      // const totalBeds =
      //   placeDetails.rooms?.reduce(
      //     (acc, room) =>
      //       acc +
      //       room.beds.reduce((bedAcc, bed) => bedAcc + (bed.amount || 0), 0),
      //     0
      //   ) ?? 0;
      // const totalAccommodates =
      //   placeDetails.rooms?.reduce(
      //     (acc, room) => acc + parseInt(room.occupancy || "0", 10),
      //     0
      //   ) ?? 0;

      // const spaceDetails = [
      //   { title: "Property type", value: placeDetails.place_type },
      //   { title: "Bedrooms", value: placeDetails.rooms?.length },
      //   { title: "Accommodates", value: totalAccommodates },
      //   { title: "Beds", value: totalBeds },
      // ];
      return (
        <div className="fixed  flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-[#00000042] z-[9999]">
          <div className="scroll  [&>h1]:text-xl overscroll-contain overflow-x-hidden md:w-[800px] w-[100%] h-[90%] max:md:w-[98%] fixed rounded-xl p-8 bg-white">
            <div className="w-full flex flex-col items-end justify-end">
              <button
                onClick={() => setMoredetails(!moredetails)}
                className="p-1 text-white font-bold text-xl rounded fixed z-[99999] bg-[#9427F7] -mr-7 mt-1 opacity-80"
              >
                <RxCross2 />
              </button>
            </div>
            <p className="mb-8 text-2xl font-medium text-dark-blue  md:text-3xl">
              About this listings
            </p>
            <div className="overflow-hidden h-fit -mt-6 md:-mt-0 w-[98%]">
              {/* <div className="border-b border-zinc-300 pb-4 md:flex md:items-end md:gap-[130px]">
                <h1 className="text-lg mb-4 font-semibold">The Spaces</h1>
                <div className="md:columns-2">
                  {spaceDetails.map((items, i) => (
                    <p className="text-para pr-[50px]" key={i}>
                      <span className="font-medium">{items.title}:</span> {items.value || "N/A"}
                    </p>
                  ))}
                </div>
              </div> */}

              <div className="relative overflow-hidden pt-4 border-b border-zinc-300 pb-6  md:flex md:items-center md:gap-[143px]">
                <h1 className="text-lg font-semibold">Amenities</h1>
                <div
                  ref={showMoreTog}
                  className="flex gap-3 flex-wrap"
                >
                  {placeDetails.amenities?.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex gap-2 text-sm items-center mt-2"
                    >
                      <p className="text-lg">{amenityIcons[amenity] || <FaRegCircleCheck />}</p>
                      <h1 className="text-para">{amenity}</h1>
                    </div>
                  ))}
                </div>
                {/* <button
                  onClick={toggleShowMore}
                  className="text-lg md:absolute md:bottom-2 md:left-[510px] font-medium text-white bg-[#9327f7de] p-2 rounded-md mt-4"
                >
                  {showMore ? "+ More" : "Show Less"}
                </button> */}
              </div>

              <div className="border-b border-zinc-300 pb-4 md:py-3 md:flex md:items-center md:gap-24">
                <h1 className="text-lg mt-5 mb-4 font-semibold">Safety Features</h1>
                <div className="flex flex-wrap gap-3">
                  {placeDetails.safetyAmenities?.map((item, i) => (
                    <p key={i} className="mr-12">
                      {item}
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

  const dispatch = useDispatch();
  const [reserveOn, setreserveOn] = useState(false);
  const BookReqRef = useRef<HTMLDivElement | null>(null);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails>({});
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);

  const toggleRoomSelection = (roomId: number) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    );
  };

  const goodToKnow: GoodToKnow[] = [
    {
      title: "Booking Policy",
      description: placeDetails?.booking_policy
        ? placeDetails.booking_policy.replace(/_/g, " ")
        : "Not available",
      icons: [],
    },
    {
      title: "Pets",
      description: placeDetails.amenities?.includes("Pets Allowed")
        ? "Pets are allowed"
        : "Not specified",
      icons: [],
    },
    {
      title: "Breakfast",
      description: placeDetails.amenities?.includes("Breakfast")
        ? "Breakfast is available"
        : "Not specified",
      icons: [],
    },
    {
      title: "Refundable",
      description:
        placeDetails.booking_policy === "FLEXIBLE"
          ? "Conditional refund"
          : "Not specified",
      icons: [],
    },
    // {
    //   title: "Non Refundable",
    //   description:
    //     placeDetails.booking_policy === "NON_REFUNDABLE"
    //       ? "This booking is non-refundable."
    //       : "Not specified",
    //   icons: [],
    // },
  ];

  const fetchPlaceDetails = async () => {
    try {
      const res = await api.get(`/explore/place/${id}`);
      setLoader(false);
      setPlaceDetails(res.data);
      console.log(res.data, "placeDetailskkkkk");
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const user = placeDetails?.user;
  console.log(user, "fadfasdfasdf")


  useEffect(() => {
    if (id) {
      fetchPlaceDetails();
    }
  }, [id]);

  // Dispatching selectedRooms Start
  useEffect(() => {
    dispatch(reservedRoom(selectedRooms));
  }, [selectedRooms])
  // Dispatching selectedRooms End

  const handleReserveToggle = () => {
    setreserveOn(true);
  }

  useEffect(() => {
    if (reserveOn) {
      BookReqRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [reserveOn]);

  const selectedRoomData = placeDetails?.rooms?.filter(room =>
    selectedRooms.includes(room.id)
  ) || [];
  // console.log(placeDetails,"Place Detailas")
  // console.log(selectedRoomData,"Selected Rooms");
  console.log(selectedRooms, "Selected Rooms");
  const totalPrice = selectedRoomData.reduce((acc, room) => acc + room.price, 0);



  return (
    <Container className="px-6  md:px-0">
      <div className="relative px-[50px]">
        <div className="parent-div relative py-6 overflow-hidden">
          {/* Title section Start */}
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl font-semibold md:text-2xl">{placeDetails?.title || "villa"}</h1>
              <p className="flex items-center py-1 opacity-60 text-sm">
                <i className="text-[#9427F7] hidden md:block">
                  <FaLocationDot />
                </i>
                {placeDetails?.street}
              </p>
            </div>
            {/* share part */}
            {/* <div className="relative w-fit  h-fit group">
              <button
                onClick={() => {
                  setShareBtn(!shareBtn);
                  btn();
                }}
                className="shadow-md shadow-[#bab9c6] flex justify-center items-center border rounded-md p-[10px] px-[14px] border-[#9427F7] text-sm opacity-70 hover:bg-[#9427F7] hover:text-white transition-all"
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
            </div> */}
            <div className="relative w-fit h-fit group">
              {/* Share Button */}
              <button
                onClick={() => {
                  setShareBtn(!shareBtn);
                  btn();
                }}
                //   className="flex items-center gap-2 rounded-full border border-[#9427F7] text-[#9427F7] 
                //  px-4 py-2 text-sm font-medium bg-white shadow-sm hover:bg-[#9427F7] hover:text-white 
                //  transition-all duration-200"
                className="flex items-center mt-2 xs:mt-0 cursor-pointer select-none w-[100px] justify-center h-[40px] text-[#8b9199] border-[1.8px] border-[#9c59df] rounded-full gap-1 p-[15px] text-[14px] font-medium"

              >
                <LuShare className="text-[30px]" />
                Share
                <IoCaretDownOutline className="text-[25px] opacity-70" />
              </button>

              {/* Dropdown Menu */}
              <ul
                ref={Share}
                className="absolute right-0 mt-2 hidden flex-col overflow-hidden rounded-lg border border-purple-200 
               bg-white shadow-lg w-44 text-gray-700 text-sm z-50"
              >
                <li>
                  <a
                    href="https://facebook.com"
                    className="block px-4 py-2 hover:bg-purple-50 hover:text-[#9427F7] transition"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    className="block px-4 py-2 hover:bg-purple-50 hover:text-[#9427F7] transition"
                  >
                    Twitter (X)
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    className="block px-4 py-2 hover:bg-purple-50 hover:text-[#9427F7] transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://whatsapp.com"
                    className="block px-4 py-2 hover:bg-purple-50 hover:text-[#9427F7] transition"
                  >
                    Whatsapp
                  </a>
                </li>
                <li>
                  <a
                    href="https://email.com"
                    className="block px-4 py-2 hover:bg-purple-50 hover:text-[#9427F7] transition"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Title section End */}

          {/* Image Container Section Start  */}
          <div>
            {loader ? (
              // Loader goes here
              <div>
                <div className=" p1">
                  <div className="lg:w-[96vw] mx-auto h-[310px]  lg:h-[410px] flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-purple-200"></div>
                    <p className="text-sm text-gray-600 text-center max-w-xs">
                      Please wait while the resources are being loaded...
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <StayImageContainer stay={placeDetails} />
            )}
          </div>
          {/* Image Container Section Start  */}

          {/* Flex Start  */}
          <section className="mx-auto">
            <div className="wrapper flex flex-wrap">
              <div className="column1 w-[100%] sc:w-[67%] overflow-auto">

                {/* Profile start */}

                <div className="profile mt-[10px] border-b border-[#c1c7d0] pb-4">
                  <div className="flex items-center">
                    <div className="user-image relative">
                      {user?.profilePicture ?
                        <img className="w-[40px] h-[40px] object-cover rounded-full align-middle" src={user?.profilePicture} alt="" /> :
                        <img className="w-[40px] h-[40px] object-cover rounded-full align-middle" src={userP1} alt="" />
                      }
                      {/* Status Indicator */}
                      {/* <span className="status-indicator w-[15px] h-[15px] bg-green-500 absolute  bottom-0 right-0 rounded-full border-[2px] border-solid border-[#fff]"></span> */}
                    </div>
                    <p className="ml-3 capitalize text-black font-semibold">Hosted By {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                </div>

                {/* Profile end */}

                {/* Sub Header Tabs Start */}
                <nav className="w-full z-10 flex items-center justify-between bg-white border-b border-[#c1c7d0] py-[15px] my-0 px-2 overflow-x-scroll max-w-full lg:overflow-hidden">
                  <ul className="flex gap-[18px]">
                    <li className="min-w-max"><a href="#description" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Details</a></li>
                    <li className="min-w-max"><a href="#rooms" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Room</a></li>
                    <li className="min-w-max"><a href="#info" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Info</a></li>
                    <li className="min-w-max"><a href="#reviews" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Reviews</a></li>
                  </ul>
                </nav>
                {/* Sub Header Tabs End */}

                <div id="description" className="mt-10">
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
                    Description
                  </h1>

                  <p className="mt-4 text-base leading-relaxed text-gray-700">
                    {placeDetails?.description ||
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esseamet at, quam enim repellendus numquam harum aperiam debitis asapiente?"}
                  </p>
                </div>

                {placeDetails.rooms && placeDetails.rooms.length >= 0 && (
                  <div id="rooms" className="card-wrapper md:pr-24">
                    <h1 className="text-xl font-medium md:text-2xl mt-8">Choose your room</h1>
                    <div className="flex flex-col gap-5 mt-5 md:flex-row md:w-[95%] flex-wrap md:grid md:grid-cols-2 w-full">
                      {placeDetails?.rooms?.map((room) => (
                        <div
                          key={room.id}
                          className="bg-[#f4f4f4] backdrop-blur-[-15px] w-full md:w-full rounded-md text-sm overflow-hidden shadow"
                        >
                          <img
                            className="object-cover w-full h-[200px]"
                            src={room.images[0] || "/fallback-image.jpg"}
                            alt={room.title}
                          />
                          <div className="p-4">
                            <div className="flex justify-between items-center">
                              <h1 className="text-lg font-medium text-dark-blue">{room?.title.length > 35 ? room.title.substring(0, 35) + "..." : room?.title}</h1>
                              <span className="text-sm bg-light-primary text-white font-medium p-1 rounded-md">{room.stock} left</span>
                            </div>
                            <ul className="list-none text-sm text-gray list-inside my-3">
                              <li className="mb-2 capitalize">
                                {room?.beds?.map((bed, index) => (
                                  <p key={index} className="capitalize font-normal text-dark-blue flex items-center gap-2">
                                    <MdOutlineBed className="text-dark-blue text-xl font-semibold" />
                                    {bed?.amount} {bed?.bed_type.split("_").join(" ").toLowerCase()}
                                  </p>
                                ))}

                              </li>
                              <li>
                                <span className="hover:text-[#9427F7] transition-all text-dark-blue">
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
                            <div className="flex justify-between items-center">
                              <span>
                                <h1 className="text-dark-blue text-xl font-semibold">{getCurrencySymbol(placeDetails?.currency || "USD")} {room.price}</h1>
                                <p className="text-xs font-normal text-dark-blue">per night</p>
                              </span>
                              {selectedRooms.includes(room.id) ? (
                                <button
                                  onClick={() => {
                                    toggleRoomSelection(room.id);
                                  }}
                                  className="bg-[#ffffff] text-[#9427F7] font-normal shadow-md shadow-[#bab9c6] rounded-md p-[10px] px-[14px] text-sm flex justify-center items-center gap-1"
                                >
                                  <FaCheck />
                                  Selected
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    toggleRoomSelection(room.id);
                                    handleReserveToggle();
                                  }}
                                  className="bg-primary shadow-md shadow-[#bab9c6] text-white font-normal rounded-md p-[10px] px-[14px] text-sm"
                                >
                                  Reserve
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="w-full">
                  <h1 className="text-xl font-medium md:text-2xl mt-8">Amenities (Public Area)</h1>
                  <div className="flex flex-wrap gap-2 w-full mt-4 [&>*]:bg-zinc-100 [&>*]:rounded-md [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:p-2 [&>*]:text-dark-blue">
                    {placeDetails.amenities?.map((amenity, index) => (
                      <h1 className="text-sm flex flex-nowrap gap-1" key={index}>
                        <p>{amenityIcons[amenity] || <FaRegCircleCheck />}</p>
                        <p>{amenity}</p>
                      </h1>
                    ))}
                  </div>
                </div>

                <div className="w-full mt-8">
                  <h1 className="text-xl font-medium md:text-2xl">Safety Features</h1>
                  <div className="flex flex-wrap gap-2 w-full mt-4 [&>*]:bg-zinc-100 [&>*]:rounded-md [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:p-2 [&>*]:text-dark-blue">
                    {placeDetails.safetyAmenities?.map((amenity, index) => (
                      <h1 className="text-sm flex flex-nowrap gap-1" key={index}>
                        <p>{amenityIcons[amenity] || <FaRegCircleCheck />}</p>
                        <p>{amenity}</p>
                      </h1>
                    ))}
                  </div>
                </div>

                <div id="info" className="w-[90%] overflow-hidden text-wrap mt-8">
                  {/* <h1 className="text-xl font-semibold md:text-2xl pt-9">Policies</h1> */}
                  <h1 className="text-[27.34px] font-medium leading-[41px] text-[#172B4D] tracking-[-1px]">Good To Know</h1>
                </div>
                {goodToKnow.map((item, index) => (
                  // <div key={index} className="mr-[50px] text-wrap overflow-hidden">
                  //   <div className="grid grid-cols-2 border-b border-zinc-300 ">
                  //     <p className="py-2 text-sm">{item.title}</p>
                  //     <p className="py-2 text-sm">{item.description}</p>
                  //   </div>
                  // </div>
                  <div key={index} className='border-t-[1.5px] border-[#dee2e6]'>
                    <div className='flex justify-start p-[10px]'>
                      <span className='font-[400] text-[18px] w-[50%]'>{item.title}</span>
                      <span className='font-[400] text-[18px] w-[50%]'>{item.description || "No cancellation policy information available."}</span>
                    </div>
                  </div>
                ))}

                {/* Reviews Start */}
                {/* <div id="reviews" className="mt-8">
                  <h1 className="text-xl font-medium md:text-2xl pb-4">Reviews</h1>
                  <div className="flex items-center gap-2">
                    <img className="object-cover w-[40px] h-[40px]" src={user} alt="user" />
                    <div className="">
                      <h1 className="text-lg text-para font-medium">Anupam</h1>
                      <p className="opacity-50 text-sm font-medium">May 2022</p>
                    </div>
                  </div>
                  <div className="pt-3">
                    <p className="text-sm text-para font-medium">
                      Highlight of my trip. I learned so much about the real local culture and its development,...
                    </p>
                  </div>
                </div> */}
                {/* Reviews End */}

              </div>
              <div className="column2 relative tetx-[18px] font-bold w-[100%] px-[15px] sc:w-[33%] bg-green-0">
                {selectedRooms.length <= 0 &&
                  <div
                    className="mt-7 pt-5 h-[120px]  bg-white rounded-md shadow p-4 font-medium"
                  >
                    <h1 className="text-lg text-dark-blue text-center">Select room for pricing</h1>
                    <p className="pt-5 text-md font-normal text-center">
                      Full refund until <span className="text-[#9427F7]">host's approval</span>
                    </p>
                  </div>
                }

                {/* Request to Book Desktop View Start */}
                {selectedRooms.length > 0 &&
                  <div ref={BookReqRef} className="mt-7 p-6 border-[0.2px] border-zinc-300 bg-white rounded-md shadow-md shadow-[#bab9c6]">
                    <div className="border-b border-zinc-300 ">
                      <h1 className="font-medium text-lg text-dark-blue">Total: {getCurrencySymbol(placeDetails?.currency || "USD")} {totalPrice}</h1>
                    </div>

                    {selectedRoomData.map((room) => (
                      <div key={room.id} className="flex justify-between border-b border-zinc-300 ">
                        <p className="py-2 text-sm font-normal text-gray">{room.title}</p>
                        <p className="py-2 text-sm font-semibold text-dark-blue">{getCurrencySymbol(placeDetails?.currency || "USD")} {room.price}</p>
                      </div>
                    ))}

                    <div className="flex justify-between border-b border-zinc-300 ">
                      <p className="py-2 text-md font-semibold text-dark-blue">Grand Total</p>
                      <p className="py-2 text-md font-semibold text-dark-blue">{getCurrencySymbol(placeDetails?.currency || "USD")} {totalPrice}</p>
                    </div>

                    <div className="flex flex-col items-center mt-4 gap-4 text-white">
                      <Link
                        to={`/staysForm/${id ?? ''}?rooms=${selectedRooms.join(',')}`}
                        className="p-3 w-full text-center shadow-md shadow-[#bab9c6] bg-[#9427F7] rounded font-medium"
                      >
                        Request to Book
                      </Link>

                      <p className="text-center text-para font-medium">
                        You’ll be able to review before paying.
                      </p>

                      {/* <div className="inline-flex gap-4 font-medium">
                        <a
                          href=""
                          className="bg-blue-600 shadow-md shadow-[#bab9c6] flex items-center justify-center gap-1 rounded-md p-1 px-2"
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
                          <FaShare />
                          Share
                        </a>
                      </div> */}
                    </div>
                  </div>
                }
                {/* Request to Book Desktop View End */}
              </div>
            </div>
          </section>
          {/* Flex End */}
        </div>
      </div>
    </Container>
  );
};

export default StaysDetails;