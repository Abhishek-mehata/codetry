import { useEffect } from "react";
import { useState, useRef } from "react";
// import { useNavigate } from 'react-router-dom';


//Sub components
import EventRewiews from "./EventsReview"
import EventImageContainer from "./EventImageContainer";
import UserProfile from "./UserProfile";
import TypeAndLocation from "./TypeAndLocation";

// importing css
import "./Details.css"

// import { ShareIcon } from "lucide-react";
import bwClock from "../../../../assets/svg/bw-clock.png"
import BoxTick from "../../../../assets/svg/box_tick.svg"

import Details from "./Details";
import RoomsCard from "./RoomsCard";
import GoodToKnow from "./GoodToKnow";
// import starImg from "../../../../assets/svg/star.svg"
import Person from "../../../../assets/svg/Person.png"
import { useParams } from "react-router-dom";
import api from "../../../../api";
// import { RootAppState } from "../../../../redux/store";
// import { useAppSelector } from "../../../../hooks/useTypedSelectors";
// type EventDetailsProps = {
//     title: string;
//     date: string;
//     location: string;
// };
// import { setUser } from "../../../../redux/reducers/auth";
// import { useDispatch, useSelector } from "react-redux";
// import { RootAppState } from "../../../../redux/store"; // Adjust the path to your store file

type FileType = {
    id: number;
    original_name: string;
    url: string;
    mimetype: string;
    uid: string;
    file_key: string;
    place_id: string | null;
    eventListingId: string;
    createdAt: string;
};

type DateRangeType = {
    date: string;
    startTime: string;
    endTime: string;
};

type OnlineEventType = {
    id: string;
    dateRanges: DateRangeType[];
    platform: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isRetired: boolean;
    sellerId: number;
    eventListingId: string;
};
type OnsiteEventType = {
    id: string;
    dateRanges: DateRangeType[];
    platform: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isRetired: boolean;
    sellerId: number;
    eventListingId: string;
};
type EventDetailsType = {
    id: string;
    // photos: any[];
    location: string;
    businessNature: string;
    currency: string;
    individualNbr: string;
    individualTaxIdNbr: string;
    businessRegistrationNbr: string | null;
    businessTaxIdNbr: string | null;
    price: number;
    eventType: string;
    isBoosted: boolean;
    maxBoostedDay: string | null;
    category: string;
    highlight: string;
    name: string;
    imageUrl: string | null;
    dateType: string;
    nbrOfDays: number;
    hoursPerDay: number;
    maxAttendances: number;
    language: string;
    status: string;
    requirements: string[];
    otherInformation: string;
    guestInformation: string;
    hostInformation: string;
    cancellationPolicy: string;
    hostSkillLevel: string;
    isDiscountAvailable: boolean;
    discount: number;
    business: string[];
    experiential: string[];
    healthAndWellness: string;
    specialInterest: string;
    isPaid: boolean;
    listingPaidType: string;
    noOfPromotionDays: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isRetired: boolean;
    sellerId: number;
    eventBoostedCategoryId: string | null;
    OnlineEvent: OnlineEventType | null;
    OnsiteEvent: OnsiteEventType | null; // define if needed
    files: FileType[];
    event: EventDetailsType;
    // refundable: boolean; // Added property
    platform: string; // Added property
};


const EventDetails = () => {
    // const navigate = useNavigate();
    // const goToEventsForm = () => {
    //     navigate('/eventsForm' ,{ state: { event: eventDetails }})
    // }
    // const navigate = useNavigate();

    // const dispatch = useDispatch();
    // const { user, isAuthenticated } = useSelector((state: RootAppState) => state.auth);


    const { id } = useParams(); // fetch ID from URL
    const [eventDetails, setEventDetails] = useState<EventDetailsType | null>(null);
    const [loader, setLoader] = useState(true);
    const [reserveOn, setreserveOn] = useState(false);
    const BookReqRef = useRef<HTMLDivElement | null>(null);

    const fetchEventDetails = async () => {
        try {
            const res = await api.get(`/explore/event/${id}`);
            setEventDetails(res.data); // Axios puts the data inside res.data
            setLoader(false);
        } catch (error) {
            console.error("Error fetching event:", error);
        }
    };
    useEffect(() => {
        if (id) {
            fetchEventDetails();
        }
    }, [id]);

    useEffect(()=>{
        if(reserveOn){
            BookReqRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    },[reserveOn]);

    const ref1 = useRef<HTMLInputElement>(null)
    const [count, setCount] = useState(true)
    // const [isPaymentCaptured, setIsPaymentCaptured] = useState(false);
    // const [numberOfEvents, setNumberOfEvents] = useState(0)
    // const handleRequestToBook = async () => {
    //     if (!isAuthenticated) {
    //         window.location.href = '/auth/login';
    //         return;
    //     }

    //     // Switch role to BUYER if not already
    //     if (user && user.role !== "BUYER") {
    //         const updatedUser = { ...user, role: "BUYER" };
    //         dispatch(setUser(updatedUser));
    //     }

    //     try {
    //         const res = await api.post('payment/order/event', { eventId: id });
    //         console.log(res.data, 'paymentRecord')
    //         const paymentRecord = res.data;
    //         console.log(paymentRecord, 'paymentRecord')
    //         window.location.href = paymentRecord.paymentUrl;
    //     } catch (error) {
    //         console.error('Error creating payment:', error);
    //         alert(

    //             'Something went wrong while processing your payment request.'
    //         );
    //     }
    // };
    // useEffect(() => {
    //     // Check if the URL contains an orderID (i.e., after PayPal redirects back)
    //     const queryParams = new URLSearchParams(window.location.search);
    //     const orderID = queryParams.get('orderID');

    //     if (orderID && !isPaymentCaptured) {
    //         capturePayment(orderID);
    //     }
    // }, [isPaymentCaptured]);

    // const capturePayment = async (orderID: string) => {
    //     try {
    //         // Call your backend to capture the payment
    //         const response = await api.post(`/payment/capture-order/${orderID}`);
    //         console.log(response)
    //         // Handle success
    //         alert('Payment successfully captured!');
    //         setIsPaymentCaptured(true); // Flag to indicate that payment has been captured
    //         navigate('/app/events'); // Redirect user to the success page
    //     } catch (error) {
    //         console.error('Error capturing payment:', error);
    //         alert('Something went wrong while capturing your payment.');
    //     }
    // };

    const StickyDivChange2 = () => {
        if (!count === true) {
            return ref1.current?.classList.add("lg:block");
        } else if (!count === false) {
            return ref1.current?.classList.remove("lg:block");
        }
    };

    const handleReserveToggle = () => {
        setreserveOn((e)=> !e);
    }

    // function formatTime(endTime: string | undefined): string {
    //     if (!endTime) return "N/A";
    //     const [hours, minutes] = endTime.split(":").map(Number);
    //     const period = hours >= 12 ? "PM" : "AM";
    //     const formattedHours = hours % 12 || 12;
    //     return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    // }
    // function formatDate(dateStr: string | number | Date) {
    //     const date = new Date(dateStr);
    //     const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    //     return date.toLocaleDateString('en-GB', options); // Example: "Thu, 20 Feb 2025"
    // }
    // Helper functions
    const formatTime = (time?: string): string => {
        if (!time) return "N/A";
        const [hourStr, minuteStr] = time.split(":");
        let hour = parseInt(hourStr, 10);
        const minute = minuteStr || "00";
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    };

    const formatDate = (date?: string): string => {
        if (!date) return "N/A";
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    const date =
        eventDetails?.OnlineEvent?.dateRanges?.[0]?.date ??
        eventDetails?.OnsiteEvent?.dateRanges?.[0]?.date;

    const startTime =
        eventDetails?.OnlineEvent?.dateRanges?.[0]?.startTime ??
        eventDetails?.OnsiteEvent?.dateRanges?.[0]?.startTime;

    const endTime =
        eventDetails?.OnlineEvent?.dateRanges?.[0]?.endTime ??
        eventDetails?.OnsiteEvent?.dateRanges?.[0]?.endTime;

    return (
        <>
            <div className="parent h-auto  w-[calc(100vw - 81px)] p-[32px] overflow-y-scroll my-1 bg-green-0">
                {/* Event Type and location start */}
                <div className="child1 flex justify-between items-center flex-col xs:flex-row mt-20px">
                    {loader ? (
                        <div className="">
                            <div className=" w-[90vw] lg:w-[96vw] mx-auto h-[820px] lg:h-[520px] flex flex-col items-center justify-center space-y-4">
                                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-purple-200"></div>
                                <p className="text-sm text-gray-600 text-center max-w-xs">
                                    Please wait while the resources are being loaded...
                                </p>
                            </div>
                        </div>
                    ) : (
                        eventDetails && <TypeAndLocation />

                    )}
                    {/* {eventDetails && <TypeAndLocation event={{ location: eventDetails.location, eventType: eventDetails.eventType, event: eventDetails }} />} */}
                </div>
                {/* Event Type and location end */}


                {/* Image Container start */}
                <div>
                    <h2 className="text-[28px] text-center xs:text-left font-medium text-[#172b4d]">{eventDetails?.name} </h2>
                    {eventDetails && <EventImageContainer event={eventDetails} />}
                </div>
                {/* Image Container End */}


                <section className="mx-[auto]">
                    <div className="wrapper flex flex-wrap">
                        {/* column1 */}
                        <div className="column1 w-[100%] sc:w-[67%] px-[15px] overflow-auto h-[100vh]">
                            {/* sub-navbar*/}
                            <nav className="sticky top-[0] w-full z-10 flex items-center justify-between bg-white border-y border-[#c1c7d0] py-[15px] my-0 px-2 overflow-x-scroll max-w-full lg:overflow-hidden">
                                <ul className="flex gap-[18px]">
                                    <li className="min-w-max"><a href="#details" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Details</a></li>
                                    <li className="min-w-max"><a href="#dateandtime" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Available Date & Time</a></li>
                                    <li className="min-w-max"><a href="#info" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Info</a></li>
                                    <li className="min-w-max"><a href="#reviews" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Reviews</a></li>
                                </ul>
                            </nav>

                            {/* Profile start */}
                            <div className="profile mt-[10px]">
                                <UserProfile />
                            </div>
                            {/* Profile end */}

                            {/* Details Div */}
                            <div id="details" className="scroll-mt-[83px] pb-[40px] mt-[30px] border-b-[2px]   border-solid border-[#96969640]">
                                <Details />
                            </div>
                            {/* Details  End */}

                            {/* Event Dates */}
                            <div id="dateandtime" className="my-[30px] pb-[40px] border-b-[1.5px] border-solid border-[#96969640]">
                                <h3 className="text-[27.34px] font-medium leading-[40px] tracking-[-1px]">Event Dates</h3>

                                <div className="row flex flex-wrap pt-[15px] mx-0">
                                    <div className="pl-0 mb-[15px] w-full md:w-1/2">
                                        <div className="choose-dates bg-[#F4F4F4] rounded-7px py-[1.75rem] px-[1.5rem]">
                                            <h4 className="text-[17.5px] text-[#172B4D] font-medium leading-[26.25px] mb-[5px]">
                                                {formatDate(date)}
                                            </h4>

                                            <div className="row2 flex flex-wrap py-1 mx-0">
                                                <div className="w-full flex items-center pr-[15px]">
                                                    <img className="h-[20px] w-[20px]" src={bwClock} alt="clock" />
                                                    <span className="text-[14px] font-[300] leading-[21px] text-[#434859] ml-2">
                                                        {startTime && endTime
                                                            ? `${formatTime(startTime)} - ${formatTime(endTime)}`
                                                            : "Time not available"}
                                                    </span>
                                                </div>

                                                <div className="py-[5px] flex items-center">
                                                    <img className="w-[20px] h-[20px]" src={BoxTick} alt="event-type" />
                                                    <span className="text-[14px] font-[300] leading-[21px] text-[#434859] ml-2">
                                                        {eventDetails?.eventType?.toLowerCase() || "event"}
                                                    </span>
                                                </div>

                                                <div className="w-full flex gap-3 my-2 justify-center xsss:justify-between flex-wrap py-[5px]">
                                                    <div className="left">
                                                        <p className="m-0 text-[21.88px] font-medium leading-[32px] text-[#172B4D]">
                                                            {/* You can show price with currency here */}
                                                        </p>
                                                        <span className="text-[12px] leading-[12px] font-[300] text-[#172B4D]">
                                                            {eventDetails?.price} / Per Person
                                                        </span>
                                                    </div>

                                                    <div className="right">
                                                        <button
                                                            onClick={() => {
                                                                setCount(!count);
                                                                StickyDivChange2();
                                                                handleReserveToggle();
                                                            }}
                                                            className={`${count
                                                                    ? "bg-[#9427F7] text-white"
                                                                    : "bg-white text-[#9427F7] flex items-center gap-1"
                                                                } font-semibold rounded-xl px-[14px] py-[10px] text-sm shadow-md shadow-[#bab9c6]`}
                                                        >
                                                            {count ? "Reserve" : "Selected"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Good To Know */}
                            <div id="info" className="my-5">
                                {eventDetails && <GoodToKnow event={eventDetails} />}
                            </div>
                            {/* Good To Know End */}

                            {/* Reviews section start */}
                            <div id="reviews" className="bg-red-00 px-[15px] py-[10px] mb-[32px] border-b-[1.5px] border-solid border-[#96969640]">
                                <EventRewiews />
                            </div>
                            {/* Reviews section end */}



                        </div>
                        {/* Column 1 end */}


                        {/* column2 */}
                        <div className="column-2 relative tetx-[18px] font-bold w-[100%] px-[15px] sc:w-[33%] bg-green-0">
                            {/* RoomCard */}
                            <div ref={ref1} className="hidden">
                                <RoomsCard />
                            </div>

                            {/* Div for bookings when reserve button is clicked*/}

                            {reserveOn &&
                            <div>
                                <div ref={BookReqRef} className="relative p-[15px] mt-[10px] flex flex-col items- bg-clip-border border border-solid border-[#00000020]">
                                    {/* Event Pricing Banner */}
                                    <div className="booking-banner rounded-[3px]">
                                        <div className=" px-[15px]">
                                            <span className="text-[22px] leading-[32px] font-medium">{eventDetails?.price}</span>
                                            <span className="font-semibold leading-[24px]">/per person</span>
                                        </div>
                                    </div>

                                    {/* Event Booking Form */}
                                    <div className="booking-form w-[100%] h-[5rem] p-4 mx-[5px] border-[1.5px] border-[#9c59df] rounded-bl-[7px] rounded-br-[7px] bg-[#fff] text-[#8b9199]">
                                        <img src={Person} alt="" />
                                        <span className="text-[12px] font-light leading-[12px] text-[#172B4D]">{eventDetails?.maxAttendances} Total Attendances</span>
                                        {/* <select name="" id=""></select> */}
                                    </div>

                                    {/* Booking Details */}
                                    <div className="w-[100%] border-b-[1px] border-[#96969640] p-[15px] ">
                                        {/* detail-1 (date,time ...) */}
                                        <div className="border-b border-[#96969640] p-[15px]">
                                            <div className="rows flex flex-wrap ">
                                                <div className="pt1 w-2/3">
                                                    {/* <p className="text-[12px] font-light leading-[12px] underline text-[#172B4D]">Thu, 20th Feb 2025</p> */}
                                                    {/* {eventDetails?.OnlineEvent?.dateRanges?.[0]?.date
                                                        ? formatDate(eventDetails.OnlineEvent.dateRanges[0].date)
                                                        : ""} */}      {formatDate(date)}

                                                    <ul className="list-disc pl-6 mt-[5px]">
                                                        <li className="text-[12px] font-[300] leading-[12px] text-[#8B9199]"> {startTime && endTime
                                                            ? `${formatTime(startTime)} - ${formatTime(endTime)}`
                                                            : "Time not available"}</li>
                                                        <li className="text-[12px] font-[300] leading-[12px] text-[#8B9199]">Language: HIndi</li>
                                                    </ul>
                                                </div>

                                                <div className="pt2 w-1/3 pr-0">
                                                    <p className=" text-[12px] font-light leading-[12px] text-right text-[#172B4D]">NPR {eventDetails?.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Booking Details End */}

                                    {/* Total */}
                                    <div className="total py-4 px-2">
                                        <div className="row flex flex-wrap">
                                            <div className="pt1 w-[58%]">
                                                <h5 className="text-[17.5px] font-medium leding-[27px] text-[#172B4D] mb-[5px] ">Total</h5>
                                                <p className="text-[14px] leading-[21px] font-[400] text-[#434859]">
                                                    Total incudes fees, not tax.
                                                </p>
                                            </div>

                                            <div className="pt2 relative w-[42%] pr-[15px] pl-[15px]">
                                                <h5 className="text-[17.5px] font-medium leading-[26.25px] text-[#172B4D] text-right">NPR {eventDetails?.price || 3500}</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="request-to-book py-5">
                                        {/* <button
                                            onClick={handleRequestToBook}
                                            type="button"
                                            className="w-[100%] bg-[#9c59df] cursor-pointer select-none font-bold text-[14px] text-[#fff] py-[1rem] px-[3rem] mt-[1rem]"
                                        >
                                            Request to Book
                                        </button> */}
                                        <a
                                            href={`/bookevents/${eventDetails?.id ?? ''}`}
                                            className="p-3 shadow-md shadow-[#bab9c6] bg-[#9427F7] rounded text-white"
                                        >
                                            Request to Book
                                        </a>
                                    </div>
                                    {/* request to book ends */}
                                    {/* Contact Host */}
                                    <div className="text-center p-7 border-t border-b border-[#96969640]">
                                        <a className="text-[14px] font-normal leading-[21px] text-[#9C59DFC4]" href="#">Contact Host</a>
                                    </div>
                                </div>
                            </div> }
                            {/* Div for bookings end*/}
                        </div>
                        {/* Column 2 end */}
                    </div>
                </section>
            </div>
        </>
    );
}

export default EventDetails;












