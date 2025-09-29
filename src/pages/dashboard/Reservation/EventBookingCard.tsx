/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import { AxiosError } from "axios";
import { Loader } from "../../../components";
import { useGetUserByIdQuery } from "../../../redux/features/usersApi";
import userP1 from "../../../../src/assets/svg/user 2.svg";
import { RootAppState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrencySymbol } from "../../../utils/currencySymbols";
import { formatDate, formatTime } from "../../../utils/dateTimeHelpers";
import MessageCard from "./MessageCard";
import CountDownTimer from "./CountDownTimer";


export interface EventBooking {
  id: number;
  type: "EVENT";
  startDate: string;
  endDate: string;
  formattedStartDate: string;
  formattedEndDate: string;
  status: string;
  refNumber?: string;
  specialRequest?: string;
  messageForHost?: string;
  verifyBySeller: string;
  Payment?: {
    id: string;
    status: string;
    amount: number;
    paidAt?: string;
    createdAt?: string;
    nextPaymentAmount?: number;
  };
  Buyer: {
    id: number;
    name: string;
    avatar?: string;
    trips?: number;
  };
  Event: {
    id: string;
    name: string;
    sellerId: number;
    files?: { url: string }[]; // Ensure files exist for event
    price: number;
    location: string;
    startTime: string;
    endTime: string;
    eventType: "ONLINE" | "ONSITE";
    currency?: string;
    status?: string;
    OnlineEvent: {
      platform: string;
      link: string;
    };
    language?: string;
    requirements?: string[];
    cancellationPolicy?: string;
    highlight?: string;
  };
  dateRanges: [{
    date: string;
    endTime: string;
    startTime: string;
  }];
  createdAt: string;

}

const EventBookingCard = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState<EventBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joinError, setJoinError] = useState("");
  const role = (useSelector((state: RootAppState) => (state as any).auth.user.role) || "BUYER") as string;

  // Timer moved to CountDownTimer component



  // Buyer Details Start
  const buyerId = bookingData?.Buyer?.id || "";
  const { data } = useGetUserByIdQuery(buyerId);
  const buyerDetails = data?.data;
  const buyerFullName = buyerDetails?.firstName + " " + buyerDetails?.lastName;
  const buyerEmail = buyerDetails?.email;
  const buyerPhoneNumber = buyerDetails?.phoneNumber;

  // const isApproved = bookingData?.isApproved;
  // Buyer Details End

  // Event Details Start
  const eventDetails = bookingData?.Event || null;
  const eventId = eventDetails?.id;
  const eventLocation = eventDetails?.location;
  const eventType = eventDetails?.eventType;
  const currency = eventDetails?.currency;
  const eventStatus = eventDetails?.status;
  const sellerId = eventDetails?.sellerId;
  // Event Details End



  // Payment Details Start
  const paymentDetails = bookingData?.Payment;
  const paymentId = paymentDetails?.id;
  const paidAmount = paymentDetails?.amount;
  const paidAt = paymentDetails?.paidAt || paymentDetails?.createdAt;
  // Payment Details End

  // Details OnsiteEvent Start
  const onlineDetails = eventDetails?.OnlineEvent;
  // const onlinePlatform = onlineDetails?.platform;
  // const onlineLink = onlineDetails?.link;
  // Details OnsiteEvent End

  const bookedDates = bookingData?.dateRanges;
  const bookingId = bookingData?.id;

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get(`events/booked-events/${id}`, { withCredentials: true });
        setBookingData(res.data.booking);
        console.log(res.data.booking, "asdfasdf");
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        setError(error.response?.data?.message || "Failed to fetch booking");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) return <Loader className="h-screen" loading={loading}></Loader>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!bookingData) return null;

  const event = bookingData.Event;

  return (
    <section className="w-full h-fit p-8 md:p-10 lg:p-20 mb-5">
      <header className="border border-[#9427F7] p-7 rounded-xl flex flex-col md:flex-row gap-6">
        <img
          src={event.files?.[0]?.url || "https://via.placeholder.com/300"}
          alt={event.name || "Event Image"}
          className="object-cover w-full md:w-[290px] h-[200px] rounded-md"
        />
        <div>
          <Link to={`/events/${eventId}`} className="text-dark-blue border-b text-xl font-semibold hover:text-[#9427F7] transition">{event.name}</Link>
          <div className="flex items-start mt-3 gap-3">
            <h1 className="font-semibold flex items-center gap-1">
              Location:
            </h1>
            <p className="max-w-[35ch]">{eventLocation}</p>
          </div>
          <div className="flex items-start mt-3 gap-3">
            <h1 className="font-semibold flex items-center gap-1">
              Event type:
            </h1>
            <p className="capitalize">{eventType?.toLocaleLowerCase()}</p>
          </div>
          <div className="flex items-start mt-3 gap-3">
            <h1 className="font-semibold flex items-center gap-1">
              Event Status:
            </h1>
            <p className="capitalize">{eventStatus?.toLocaleLowerCase()}</p>
          </div>
          {/* Booking Status / Seller Approval */}
          {(() => {
            const status = bookingData?.verifyBySeller?.toUpperCase();
            if (status === 'PENDING') {
              return (
                <div className="mt-3 flex gap-3">
                  <button disabled className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    Pending Approval
                  </button>
                </div>
              );
            } else if (status === 'CONFIRM' || status === 'CONFIRMED') {
              return (
                <div className="mt-3 flex gap-3">
                  <button disabled className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    Booking Confirmed
                  </button>
                </div>
              );
            } else if (status === 'DECLINED' || status === 'DECLINE') {
              return (
                <div className="mt-3 flex gap-3">
                  <button disabled className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    Booking Declined
                  </button>
                </div>
              );
            } else {
              return (
                <div className="mt-3 flex gap-3">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    Unknown Status
                  </button>
                </div>
              );
            }
          })()}
        </div>
        <div className="h-[140px] w-[1px] bg-dark-blue self-center hidden md:block"></div>
        <div>
          <h3 className="text-dark-blue text-xl font-semibold hover:text-[#9427F7] transition">Payment Details</h3>
          <div className="flex items-start mt-3 gap-3">
            <h1 className="font-semibold flex items-center gap-1">
              Payment Id
            </h1>
            <p>{paymentId}</p>
          </div>
          {eventType === "ONSITE" ? (
            <>
              <div className="flex items-start mt-3 gap-3">
                <h1 className="font-semibold flex items-center gap-1">
                  Paid Amount
                </h1>
                <p>{getCurrencySymbol(currency || "USD")} {paidAmount ?? 0}</p>
              </div>
              <div className="flex items-start mt-3 gap-3">
                <h1 className="font-semibold flex items-center gap-1">
                  Amount Due
                </h1>
                <p>{getCurrencySymbol(currency || "USD")} {paymentDetails?.nextPaymentAmount ?? 0}</p>
              </div>
              <div className="flex items-start mt-3 gap-3">
                <h1 className="font-semibold flex items-center gap-1">
                  Total Event Price
                </h1>
                <p>{getCurrencySymbol(currency || "USD")} {(paidAmount ?? 0) + (paymentDetails?.nextPaymentAmount ?? 0)}</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start mt-3 gap-3">
                <h1 className="font-semibold flex items-center gap-1">
                  Paid Amount
                </h1>
                <p>{getCurrencySymbol(currency || "USD")} {paidAmount ?? 0}</p>
              </div>
              <div className="flex items-start mt-3 gap-3">
                <h1 className="font-semibold flex items-center gap-1">
                  Paid At
                </h1>
                <p> {formatDate(paidAt)} - {formatTime(paidAt)}</p>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="mt-10">
        {/* Countdown + Buyer notice */}
        <section className="border border-danger/70 bg-white rounded-xl p-5 mb-6 max-w-[750px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm text-gray-600">Time left to confirm</p>
              <p className="text-2xl font-semibold text-dark-blue">
                <CountDownTimer startTimeIso={bookingData?.createdAt} />
              </p>
            </div>
            {role === "BUYER" && (
              <p className="text-gray-700 text-sm md:text-base">
                Your request is sent to. They have 2 hours to confirm your reservation directly with us. We'll notify you the second we have an answer.
              </p>
            )}

            {role === "SELLER" && (
              <p className="text-gray-700 text-sm md:text-base">
                You have a new booking request!
                Please confirm or reject it within 2 hours
              </p>
            )}

          </div>
        </section>

        <section className="border-b border-[#9427F7] pb-5 mb-5">
          <p className="text-2xl mb-4">Reservation Details</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3>Booked Dates:</h3>
              {bookedDates?.map((date, idx) => {
                // Parse event date and start/end time
                const eventDate = new Date(date.date);
                const [startHour, startMinute] = date.startTime.split(":");
                eventDate.setHours(Number(startHour), Number(startMinute), 0, 0);
                const eventEndDate = new Date(date.date);
                const [endHour, endMinute] = date.endTime.split(":");
                eventEndDate.setHours(Number(endHour), Number(endMinute), 0, 0);
                const now = new Date();
                const isToday = now.toISOString().slice(0, 10) === date.date;
                const hasStarted = isToday && (now.getTime() >= eventDate.getTime());
                const hasEnded = now.getTime() > eventEndDate.getTime();
                const canJoin = eventType === "ONLINE" && onlineDetails && eventDetails?.OnlineEvent?.link !== "" && (bookingData?.verifyBySeller?.toUpperCase() === "CONFIRM");
                return (
                  <div className="border-b py-3 flex justify-between items-center" key={idx}>
                    <p className=""><span className="font-medium">Date: </span>{formatDate(date.date)}, <span className="font-medium">Start Time: </span> {formatTime(date.startTime)}, <span className="font-medium">End Time: </span> {formatTime(date.endTime)}</p>
                    {/* SELLER can always join, BUYER only if event started, show ended if after end time */}
                    {eventType === "ONLINE" && onlineDetails && eventDetails?.OnlineEvent?.link !== "" && (
                      hasEnded ? (
                        <span className="text-red-600 font-semibold">Event has ended</span>
                      ) : role === "SELLER" ? (
                        <Link className="px-4 py-3 text-white rounded-md bg-success" to={eventDetails?.OnlineEvent?.link}>Join Event</Link>
                      ) : canJoin ? (
                        hasStarted ? (
                          <Link className="px-4 py-3 text-white rounded-md bg-success" to={eventDetails?.OnlineEvent?.link}>Join Event</Link>
                        ) : (
                          <button
                            className="px-4 py-3 text-white rounded-md bg-success cursor-not-allowed"
                            onClick={() => setJoinError("Event hasn't yet started")}
                          >Join Event</button>
                        )
                      ) : ""
                    )}
                  </div>
                );
              })}

              {joinError && (
                <div className="text-red-500 mt-2">{joinError}</div>
              )}
            </div>
          </div>
        </section>


        <section className="border-b border-[#9427F7] pb-5 mb-5">
          <p className="text-2xl semibold mb-4">Additional Info</p>

          <div className="grid gap-6 mt-4">
            <div>
              <h3>Language</h3>
              <p>{eventDetails?.language || "N/A"}</p>
            </div>
            <div>
              <h3>Cancellation Policy</h3>
              <p className="max-w-[60ch]">{eventDetails?.cancellationPolicy || "N/A"}</p>
            </div>
            <div>
              {Array.isArray(eventDetails?.requirements) && eventDetails.requirements.length > 0 ? (
                <>
                  <h3>Requirements</h3>
                  <ul className="list-disc list-inside">
                    {eventDetails.requirements.map((req: string, idx: number) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>None</p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Buyer Information Start */}
      {
        role == "SELLER" &&
        <div className="mt-10">
          <p className="text-2xl mb-3">Meet Your Guest</p>
          <div className="flex gap-3">
            <img
              src={buyerDetails?.profilePicture || userP1}
              alt="Buyer Avatar"
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <div>
              <p className="font-semibold text-dark-blue">{buyerFullName}</p>
              <p className="">{buyerEmail}</p>
              <p className="">{buyerPhoneNumber}</p>
            </div>
          </div>

          {/* <p className="font-semibold">
          <FaSuitcaseRolling className="inline" /> {bookingData.Buyer.trips || 0} trips
        </p> */}
          {/* <Input className="mt-4 border-[#9C59DF]" /> */}
          {/* <button className="bg-[#9C59DF] text-white mt-4 px-6 py-2 rounded hover:bg-white hover:text-[#9C59DF] border hover:border-[#9C59DF] transition">
          Message
        </button> */}

        </div>
      }
      {typeof bookingId !== "undefined" && typeof sellerId !== "undefined" && (
        <MessageCard bookingId={String(bookingId)} sellerId={sellerId} />
      )}
      {/* Buyer Information End */}

    </section>
  );
};

export default EventBookingCard;
