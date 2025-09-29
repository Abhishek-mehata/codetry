import { useEffect } from "react";
import { useState, useRef } from "react";
// import { useNavigate } from 'react-router-dom';


//Sub components
// import EventRewiews from "./EventsReview"
import EventImageContainer from "./EventImageContainer";
import TypeAndLocation from "./TypeAndLocation";

// importing css
import "./Details.css"

import bwClock from "../../../../assets/svg/bw-clock.png"
import BoxTick from "../../../../assets/svg/box_tick.svg"
import userP1 from "../../../../../src/assets/svg/user 2.svg"

// import Details from "./Details";
// import RoomsCard from "./RoomsCard";
import GoodToKnow from "./GoodToKnow";
import Person from "../../../../assets/svg/Person.png"
import { useParams } from "react-router-dom";
import api from "../../../../api";
import locationImg from "../../../../assets/svg/marker.svg"
import { useDispatch } from "react-redux";
// import { RootAppState } from "../../../../redux/store";
import Container from "../../../../components/client/shared/Container";
import { getCurrencySymbol } from "../../../../utils/currencySymbols";
import { formatTime, formatDate } from "../../../../utils/dateTimeHelpers";
import { storeSelectedDates } from "../../../../redux/reducers/events";
import { useGetUserByIdQuery } from "../../../../redux/features/usersApi";

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
    // const isAuthenticated = useSelector(
    //     (state: RootAppState) => state.auth.isAuthenticated
    // );
    const { id } = useParams(); // fetch ID from URL
    const [eventDetails, setEventDetails] = useState<EventDetailsType | null>(null);
    const sellerId = eventDetails?.sellerId || 0;
    const { data: userData } = useGetUserByIdQuery(sellerId);
    const user = userData?.data;

    const [loader, setLoader] = useState(true);
    const [reserveOn, setreserveOn] = useState(false);
    const BookReqRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const [selectedDates, setSelectedDates] = useState<DateRangeType[]>([]);

    const fetchEventDetails = async () => {
        try {
            const res = await api.get(`/explore/event/${id}`);
            setEventDetails(res.data); // Axios puts the data inside res.data
            setLoader(false);
            console.log(res.data, "Event Details")
        } catch (error) {
            console.error("Error fetching event:", error);
        }
    };
    useEffect(() => {
        if (id) {
            fetchEventDetails();
        }
    }, [id]);

    useEffect(() => {
        if (reserveOn) {
            BookReqRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [reserveOn]);

    console.log(selectedDates, "alksjf;alsdf;");
    const handleDateToggle = (dateObj: DateRangeType) => {
        setSelectedDates((prev) => {
            const exists = prev.some(
                (d) => d.date === dateObj.date && d.startTime === dateObj.startTime && d.endTime === dateObj.endTime
            );
            if (exists) {
                return prev.filter(
                    (d) => !(d.date === dateObj.date && d.startTime === dateObj.startTime && d.endTime === dateObj.endTime)
                );
            } else {
                return [...prev, dateObj];
            }
        });
        setreserveOn((prev) => !prev);
    };

    // Helper functions

    return (
        <>
            <Container className="px-6 md:px-0">
                <div className="parent h-auto  w-[calc(100vw - 81px)] bg-green-0 my-7 px-[40px] ">
                    {/* Event Type and location start */}
                    <div className="child1 flex justify-between items-center flex-col xs:flex-row mt-20px">
                        {loader && (
                            <div className="">
                                <div className=" w-[90vw] lg:w-[96vw] mx-auto h-[820px] lg:h-[520px] flex flex-col items-center justify-center space-y-4">
                                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-purple-200"></div>
                                    <p className="text-sm text-gray-600 text-center max-w-xs">
                                        Please wait while the resources are being loaded...
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Event Type and location end */}

                    <div className="flex items-center justify-between ">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#575b60]">{eventDetails?.eventType === "ONLINE" ? 'Online Event' : 'Onsite Event'} </h2>
                            <h2 className="text-[20px] font-medium text-[#172b4d] py-[5px]">{eventDetails?.name} </h2>
                            <div className="flex items-center">
                                <img className="w-15px hidden md:block" src={locationImg} alt="" />
                                <span className="font-normal text-[#8b9199] text-md">{eventDetails?.location}</span>
                            </div>
                        </div>
                        {eventDetails && <TypeAndLocation />}
                    </div>
                    <div>
                        {/* Image Container start */}
                        {eventDetails && <EventImageContainer event={eventDetails} />}
                        {/* Image Container End */}
                    </div>
                    <section className="mx-auto">
                        <div className="wrapper flex flex-wrap">
                            {/* column1 */}
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

                                {/* sub-navbar*/}
                                <nav className="w-full z-10 flex items-center justify-between bg-white border-b border-[#c1c7d0] py-[15px] my-0 px-2 overflow-x-scroll max-w-full lg:overflow-hidden">
                                    <ul className="flex gap-[18px]">
                                        <li className="min-w-max"><a href="#details" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Details</a></li>
                                        <li className="min-w-max"><a href="#dateandtime" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Availability</a></li>
                                        <li className="min-w-max"><a href="#info" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Info</a></li>
                                        <li className="min-w-max"><a href="#reviews" className="text-[#172b4d] hover:text-[#9c59df] text-[16px] xss:text-[18px] font-medium xss:font-semibold">Reviews</a></li>
                                    </ul>
                                </nav>

                                {eventDetails?.healthAndWellness && (
                                    <section id="details" className="mt-10">
                                        {/* Section Heading */}
                                        <h1
                                            className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight"
                                        >
                                            Description
                                        </h1>

                                        {/* Main Description */}
                                        <p 
                                        className="mt-4 text-base leading-relaxed text-gray-700"
                                        >
                                            {eventDetails?.healthAndWellness}
                                        </p>

                                        {/* What's Included */}
                                        {eventDetails?.otherInformation && (
                                            <div className="mt-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/70 p-6 shadow-sm border border-purple-200/60">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                                    What’s Included
                                                </h3>
                                                <p className="text-base text-gray-700 leading-relaxed">
                                                    {eventDetails?.otherInformation}
                                                </p>
                                            </div>
                                        )}
                                    </section>
                                )}


                                {/* Event Dates */}

                                <div id="dateandtime" className="my-[30px]">
                                    <h3 className="text-xl font-medium md:text-2xl leading-[40px] tracking-[-1px] mb-5">Event Dates</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {/* Event Cards */}
                                        {eventDetails?.OnlineEvent?.dateRanges && eventDetails?.OnlineEvent?.dateRanges.map((date) => {
                                            const isSelected = selectedDates.some(
                                                (d) => d.date === date.date && d.startTime === date.startTime && d.endTime === date.endTime
                                            );
                                            return (
                                                <div className="choose-dates bg-[#F4F4F4] rounded-lg border border-zinc-300 py-[1.75rem] px-[1.5rem] max-w-96" key={date.date + date.startTime + date.endTime}>
                                                    <h4 className="text-[17.5px] text-[#172B4D] font-medium leading-[26.25px] mb-[5px]">
                                                        {formatDate(date.date)}
                                                    </h4>
                                                    <div className="row2 flex flex-wrap py-1 mx-0">
                                                        <div className="w-full flex items-center pr-[15px]">
                                                            <img className="h-[20px] w-[20px]" src={bwClock} alt="clock" />
                                                            <span className="text-sm text-gray leading-[21px] ml-2">
                                                                {date.startTime && date.endTime
                                                                    ? `${formatTime(date.startTime)} - ${formatTime(date.endTime)}`
                                                                    : "Time not available"}
                                                            </span>
                                                        </div>
                                                        <div className="py-[5px] flex items-center">
                                                            <img className="w-[20px] h-[20px]" src={BoxTick} alt="event-type" />
                                                            <span className="text-sm text-gray leading-[21px] ml-2">
                                                                {eventDetails?.eventType?.toLowerCase() || "event"}
                                                            </span>
                                                        </div>
                                                        <div className="w-full flex my-2 justify-between items-center pt-[5px]">
                                                            <div className="left">
                                                                <span>
                                                                    <h1 className="text-dark-blue text-xl font-semibold">{getCurrencySymbol(eventDetails?.currency || "USD")} {eventDetails?.price}</h1>
                                                                    <p className="text-xs font-normal text-dark-blue">per device</p>
                                                                </span>
                                                            </div>
                                                            <div className="right">
                                                                <button
                                                                    onClick={() => handleDateToggle(date)}
                                                                    className={`${isSelected
                                                                        ? "bg-white text-primary flex items-center gap-1 border border-primary"
                                                                        : "bg-primary text-white"
                                                                        } font-semibold rounded-md px-[14px] py-[10px] text-sm shadow-md shadow-[#bab9c6]`}
                                                                >
                                                                    {isSelected ? "Selected" : "Reserve"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {/* Event Cards */}
                                        {eventDetails?.OnsiteEvent?.dateRanges && eventDetails?.OnsiteEvent?.dateRanges.map(date => {
                                            const isSelected = selectedDates?.some(
                                                (d) => d.date === date.date && d.startTime === date.startTime && d.endTime === date.endTime
                                            );
                                            return (
                                                <div className="choose-dates bg-[#F4F4F4] rounded-lg border border-zinc-300 py-[1.75rem] px-[1.5rem] max-w-96" key={date.date + date.startTime + date.endTime}>
                                                    <h4 className="text-[17.5px] text-[#172B4D] font-medium leading-[26.25px] mb-[5px]">
                                                        {formatDate(date.date)}
                                                    </h4>
                                                    <div className="row2 flex flex-wrap py-1 mx-0">
                                                        <div className="w-full flex items-center pr-[15px]">
                                                            <img className="h-[20px] w-[20px]" src={bwClock} alt="clock" />
                                                            <span className="text-sm text-gray leading-[21px] ml-2">
                                                                {date.startTime && date.endTime
                                                                    ? `${formatTime(date.startTime)} - ${formatTime(date.endTime)}`
                                                                    : "Time not available"}
                                                            </span>
                                                        </div>
                                                        <div className="py-[5px] flex items-center">
                                                            <img className="w-[20px] h-[20px]" src={BoxTick} alt="event-type" />
                                                            <span className="text-sm text-gray leading-[21px] ml-2">
                                                                {eventDetails?.eventType?.toLowerCase() || "event"}
                                                            </span>
                                                        </div>
                                                        <div className="w-full flex my-2 justify-between items-center pt-[5px]">
                                                            <div className="left">
                                                                <span>
                                                                    <h1 className="text-dark-blue text-xl font-semibold">{getCurrencySymbol(eventDetails?.currency || "USD")} {eventDetails?.price}</h1>
                                                                    <p className="text-xs font-normal text-dark-blue">per person</p>
                                                                </span>
                                                            </div>
                                                            <div className="right">
                                                                <button
                                                                    onClick={() => handleDateToggle(date)}
                                                                    className={`${isSelected
                                                                        ? "bg-white text-primary flex items-center gap-1 border border-primary"
                                                                        : "bg-primary text-white"
                                                                        } font-semibold rounded-md px-[14px] py-[10px] text-sm shadow-md shadow-[#bab9c6]`}
                                                                >
                                                                    {isSelected ? "Selected" : "Reserve"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Highlight Section */}
                                {/* {eventDetails?.highlight && (
                                  <div className="my-5">
                                    <h3 className="text-[27.34px] font-medium leading-[41px] text-[#172B4D] tracking-[-1px]">What you will do in this Event</h3>
                                    <div
                                      className="event-highlight text-gray-800"
                                      dangerouslySetInnerHTML={{ __html: eventDetails.highlight }}
                                    />
                                  </div>
                                )} */}


                                {/* Good To Know */}
                                <div id="info" className="my-5">
                                    {eventDetails && <GoodToKnow event={eventDetails} />}
                                </div>
                                {/* Good To Know End */}


                                {/* Reviews section start */}
                                {/* <div id="reviews" className="bg-red-00 px-[15px] py-[10px] mb-[32px] border-b-[1.5px] border-solid border-[#96969640]">
                                <EventRewiews />
                            </div> */}
                                {/* Reviews section end */}



                            </div>
                            {/* Column 1 end */}
                            {/* column2 */}
                            <div className="column-2 relative tetx-[18px] font-bold w-[100%] px-[15px] sc:w-[33%] bg-green-0">
                                {/* RoomCard is for Event Cardss*/}
                                {selectedDates?.length <= 0 && <div className="h-[min-content] my-2 bg-white flex flex-col items-center justify-center gap-6 rounded-[7px] 
                                shadow p-4">
                                    <h2 className="text-dark-blue text-lg font-medium">Select event for pricing</h2>
                                    <p className="text-[#172b4d] text-md font-[400]">Full refund until <span className="text-[#9c59df]">host's approval</span></p>
                                </div>}


                                {selectedDates?.length > 0 && (
                                    <div>
                                        <div ref={BookReqRef} className="relative p-[15px] mt-[10px] flex flex-col items- bg-clip-border border border-solid border-[#00000020] text-para">
                                            {/* Event Booking Form */}
                                            <div className="booking-form w-[100%] p-4 mx-[5px] border-[1.5px] border-[#9c59df] rounded-bl-[7px] rounded-br-[7px] bg-[#fff] text-[#8b9199] flex items-center gap-2">
                                                <img src={Person} alt="" />
                                                <span className="text-sm font-light leading-[12px] text-para">{eventDetails?.maxAttendances} Total Attendances</span>
                                            </div>
                                            {/* Booking Details */}
                                            <div className="w-[100%] p-[15px]">
                                                {/* detail-1 (date,time ...) */}
                                                <div className="border-b border-[#96969640] p-[15px]">
                                                    <div className="rows flex flex-wrap text-dark-blue">
                                                        <div className="pt1 w-full">
                                                            <ul className="list-disc pl-6 mt-[5px]">
                                                                {selectedDates.map((d, idx) => (
                                                                    <li key={d.date + d.startTime + d.endTime + idx} className="text-sm font-[300] text-[#8B9199]">
                                                                        {formatDate(d.date)}
                                                                        {" | "}
                                                                        {d.startTime && d.endTime
                                                                            ? `${formatTime(d.startTime)} - ${formatTime(d.endTime)}`
                                                                            : "Time not available"}
                                                                        {` | Language: ${eventDetails?.language}`}
                                                                    </li>
                                                                ))}
                                                            </ul>
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
                                                            Total includes fees, not tax.
                                                        </p>
                                                    </div>
                                                    <div className="pt2 relative w-[42%] pr-[15px] pl-[15px]">
                                                        <h5 className="text-lg font-semibold leading-[26.25px] text-[#172B4D] text-right">{getCurrencySymbol(eventDetails?.currency || "USD")} {(eventDetails?.price ?? 0) * selectedDates.length}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="request-to-book py-5">
                                                <a
                                                    href={`/bookevents/${eventDetails?.id ?? ''}`}
                                                    className="p-3 shadow-md shadow-[#bab9c6] bg-[#9427F7] rounded text-white w-full block text-center font-medium"
                                                    onClick={() => dispatch(storeSelectedDates(selectedDates))}
                                                >
                                                    Request to Book
                                                </a>
                                            </div>
                                            {/* request to book ends */}
                                            {/* Contact Host */}
                                            {/* <div className="text-center p-7 border-t border-b border-[#96969640]">
                                            <a className="text-[14px] font-normal leading-[21px] text-[#9C59DFC4]" href="#">Contact Host</a>
                                        </div> */}
                                        </div>
                                    </div>
                                )}
                                {/* Div for bookings end*/}
                            </div>
                            {/* Column 2 end */}
                        </div>
                    </section>
                </div>
            </Container>
        </>
    );
}

export default EventDetails;












