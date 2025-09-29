import { useEffect, useState } from "react";
import "../../../index.css";
import api from "../../../api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootAppState } from "../../../redux/store";
// import { setUser } from "../../../redux/reducers/auth";
import { useNavigate } from 'react-router-dom';
import { getCurrencySymbol } from "../../../utils/currencySymbols";
import Container from "../../../components/client/shared/Container";
import { formatDate, formatTime } from "../../../utils/dateTimeHelpers";
import { useGetPaymentPricesQuery } from "../../../redux/features/paymentSettingsApi";

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
interface PaymentPriceSetting {
  platformCharge: number;
  paymentSettingType: string;
}

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
  extraAmount?: number;
};

type OnsiteEventType = OnlineEventType;

type EventDetailsType = {
  id: string;
  location: string;
  price: number;
  name: string;
  imageUrl: string | null;
  dateType: string;
  maxAttendances: number;
  isPaid: boolean;
  listingPaidType: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  currency: string;
  isRetired: boolean;
  sellerId: number;
  OnlineEvent: OnlineEventType | null;
  OnsiteEvent: OnsiteEventType | null;
  files: FileType[];
  platform: string;
  discount?: number;
  actualPrice?: number;
  remainingAttendances?: number;
  platformCharge?: number;
  eventType: string; // Added property
};

const EventBookingForm = () => {
  const [guestValue, setGuestValue] = useState(1); // Number of guests
  const [isPaymentCaptured, setIsPaymentCaptured] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [eventDetails, setEventDetail] = useState<EventDetailsType | null>(null);
  const eventType = eventDetails?.eventType;
  const [messageForHost, setMessageForHost] = useState<string>(""); // State to capture the message
  const [platformCharge, setPlatformCharge] = useState<number>(0);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  // const { user, isAuthenticated } = useSelector((state: RootAppState) => state.auth);
  const [guestInputValue, setGuestInputValue] = useState<string>("1");
  const selectedDates = useSelector((state: RootAppState) => state.events.selectedDates);
  const { data: paymentPrices } = useGetPaymentPricesQuery();

  useEffect(() => {
    if (!Array.isArray(paymentPrices) || !eventType) return;
    if (eventType === "ONLINE") {
      const price = paymentPrices.filter((price: PaymentPriceSetting) => price.paymentSettingType === "online_event");
      setPlatformCharge(price[0]?.platformCharge || 0);
    } else {
      const price = paymentPrices.filter((price: PaymentPriceSetting) => price.paymentSettingType === "onsite_event");
      setPlatformCharge(price[0]?.platformCharge || 0);
    }
  }, [paymentPrices, eventType]);

  // console.log(eventType,paymentPrices,  "eventDetails",platformCharge);


  // console.log('Selected Dates from Redux:', selectedDates);

  // Function to calculate actual price
  const calculateActualPrice = (event: EventDetailsType): number => {
    let actualPrice = event.price;

    // Subtract discount if available
    if (event.discount && event.discount > 0) {
      actualPrice = event.price - event.discount;
    }

    // Add extra amount if available
    if (event.OnsiteEvent?.extraAmount && event.OnsiteEvent.extraAmount > 0) {
      actualPrice += event.OnsiteEvent.extraAmount;
    }

    return actualPrice;
  };

  // Get calculated actual price
  const getActualPrice = (): number => {
    if (!eventDetails) return 0;
    return calculateActualPrice(eventDetails);
  };

  const fetchEventDetails = async () => {
    try {
      const res = await api.get(`/explore/event/${id}`);
      setEventDetail(res.data);
      console.log(res.data, "eventDetailsssssssss");

    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    if (id) fetchEventDetails();
  }, [id]);

  useEffect(() => {
    setGuestInputValue(String(guestValue));
  }, [guestValue]);

  // const handleRequestToBook = async () => {
  //   if (!isAuthenticated) {
  //     navigate('/auth/login');
  //     return;
  //   }

  //   if (guestInputValue === "" || guestInputValue === "0" || parseInt(guestInputValue, 10) < 1) {
  //     setError("Please enter a valid number of guests");
  //     return;
  //   }

  //   // Switch role to BUYER if not already
  //   if (user && user.role !== "BUYER") {
  //     const updatedUser = { ...user, role: "BUYER" };
  //     dispatch(setUser(updatedUser));
  //   }

  //   try {
  //     const res = await api.post('payment/order/event', {
  //       eventId: id,
  //       messageForHost,
  //       numberOfGuests: guestValue,
  //       dateRanges: selectedDates
  //     });
  //     const paymentRecord = res.data;
  //     console.log(paymentRecord, 'paymentRecord');
  //     window.location.href = paymentRecord.paymentUrl;
  //   } catch (error) {
  //     console.error('Error creating payment:', error);
  //     alert('Something went wrong while processing your payment request.');
  //   }
  // };

  const handleRequestToBook = () => {
    alert("We're working on this feature! It will be released in a future update.");
  }
  useEffect(() => {
    // Check if the URL contains an orderID (i.e., after PayPal redirects back)
    const queryParams = new URLSearchParams(window.location.search);
    const orderID = queryParams.get('orderID');

    if (orderID && !isPaymentCaptured) {
      capturePayment(orderID);
    }
  }, [isPaymentCaptured]);

  const capturePayment = async (orderID: string) => {
    try {
      // Call your backend to capture the payment
      const response = await api.post(`/payment/capture-order/${orderID}`);
      console.log(response);
      alert('Payment successfully captured!');
      setIsPaymentCaptured(true); // Flag to indicate that payment has been captured
      navigate('/app/events'); // Redirect user to the success page
    } catch (error) {
      console.error('Error capturing payment:', error);
      // alert('Something went wrong while capturing your payment.');
    }
  };


  const upfrontPayment = (platformCharge || 0) / 100 * (eventDetails?.actualPrice || getActualPrice()) * guestValue * selectedDates?.length;

  return (
    <Container>
      <div className="lg:flex lg:gap-20 py-10 px-10 md:px-0  ">
        <main className="px-4 md:px-8 max-w-3xl mx-auto">
          {/* Section Heading */}
          <div className="border-b border-gray-200 pb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Confirm and Pay
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-1">
              Your Trip
            </h2>
          </div>

          <div className="mt-8 space-y-6">
            {/* Event Info */}
            <div className="bg-white  p-6 ">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Event Name</p>
                  <p className="font-medium">{eventDetails?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>{eventDetails?.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  {selectedDates?.length > 0 ? (
                    selectedDates.map((range, idx) => (
                      <p key={idx} className="mt-1">
                        <strong>{formatDate(range.date)}</strong>, {formatTime(range.startTime)} – {formatTime(range.endTime)}
                      </p>
                    ))
                  ) : (
                    <p className="mt-1">No date selected.</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Remaining Slots</p>
                  <p>{eventDetails?.remainingAttendances}</p>
                </div>
              </div>
            </div>

            <hr className="w-full h-[1px] opacity-[0.4] text-gray-200" />

            {/* Message to Host */}
            <div className="bg-white  rounded-xl p-[10px]">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Message to Host</h3>
              <textarea
                className="w-full border border-purple-300 focus:ring-2 focus:ring-purple-400 rounded-lg p-3 resize-none text-gray-700"
                placeholder="Add a message for your host..."
                value={messageForHost}
                onChange={(e) => setMessageForHost(e.target.value)}
                maxLength={300}
                rows={4}
              />
              <div className="text-xs text-gray-500 text-right mt-1">
                {messageForHost.length}/300 characters
              </div>
            </div>

            {/* Guest Selector */}
            <div className="bg-white  rounded-xl p-[10px] ">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Guests</h3>
              <div className="flex items-center  gap-4 ">
                <button
                  type="button"
                  onClick={() => {
                    if (guestValue > 1) {
                      setGuestValue(guestValue - 1)
                      setError("")
                    } else {
                      setError("At least 1 guest is required")
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-lg font-bold hover:bg-purple-200 transition"
                >
                  –
                </button>

                <input
                  className="w-20 text-center border border-purple-300 rounded-lg h-10 text-gray-700 font-medium"
                  type="number"
                  min={1}
                  value={guestInputValue}
                  onFocus={() => setGuestInputValue("")}
                  onChange={(e) => {
                    const value = e.target.value
                    setGuestInputValue(value)
                    if (value === "") {
                      setError("")
                      return
                    }
                    const num = parseInt(value, 10)
                    if (isNaN(num) || num < 1) {
                      setError("Please enter a valid number greater than 0")
                    } else if (
                      eventDetails?.remainingAttendances !== undefined &&
                      num > eventDetails.remainingAttendances
                    ) {
                      setError("No slots available")
                    } else {
                      setError("")
                    }
                  }}
                  onBlur={() => {
                    if (guestInputValue === "" || guestInputValue === "0") {
                      setGuestValue(1)
                    } else {
                      const num = parseInt(guestInputValue, 10)
                      setGuestValue(isNaN(num) || num < 1 ? 1 : num)
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    if (
                      eventDetails?.remainingAttendances !== undefined &&
                      guestValue >= eventDetails.remainingAttendances
                    ) {
                      setError("No slots available")
                    } else {
                      setGuestValue(guestValue + 1)
                      setError("")
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-lg font-bold hover:bg-purple-200 transition"
                >
                  +
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </div>

          {/* Terms & Confirm */}
          <div className="mt-10 bg-gray-50 rounded-xl p-6">
            <p className="text-sm text-gray-600">
              By selecting the button below, I agree to the Host’s House Rules, Dmt’s Rebooking and Refund Policy,
              and that Dmt can charge my payment method if I’m responsible for damage.
            </p>
            <button
              onClick={handleRequestToBook}
              type="button"
              className="w-full mt-6 py-4 text-lg font-semibold rounded-lg bg-purple-600 text-white shadow-md transition hover:bg-purple-700"
            >
              Confirm and Pay
            </button>
          </div>
        </main>

        <div className=" text-para card-container lg:w-[70%] lg:min-w-[300px] flex flex-col gap-5 h-fit border border-[#DEE2E6] rounded-lg p-5 pb-2 sticky top-32 ">
          <div className="flex gap-4">
            <figure className="w-1/3 rounded-md overflow-hidden">
              <img src={eventDetails?.files[0]?.url} alt={eventDetails?.files[0]?.original_name} className="h-full object-cover" />
            </figure>
            <div>
              <p className="text-lg font-medium text-dark-blue">{eventDetails?.name}</p>
              <p className="text-md font-normal text-dark-blue capitalize">{eventDetails?.eventType.toLowerCase()} event</p>
              {/* <div>{eventDetails?.location}</div> */}
            </div>
          </div>
          <div className="pb-5 flex flex-col border-t border-zinc-300">
            <h1 className="text-xl font-medium my-3 text-dark-blue">Price details</h1>
            <div className="flex justify-between border-b border-zinc-300 pb-2">
              <span className="font-normal text-para">Event Price</span>
              <span className={`font-medium text-dark-blue`}>{getCurrencySymbol(eventDetails?.currency || "")} {eventDetails?.price} {eventDetails?.eventType === "ONLINE" ? "/device" : "/person"}</span>
            </div>
            {eventDetails?.discount ? (
              <div className="flex justify-between border-b border-zinc-300 pb-2 text-green-600 text-sm">
                <span className="font-norma">Discount Price</span>
                <span className="font-medium">-{getCurrencySymbol(eventDetails?.currency || "")} {eventDetails?.discount}</span>
              </div>
            ) : ""}
            {eventDetails?.OnsiteEvent?.extraAmount ? (
              <div className="flex justify-between border-b border-zinc-300 pb-2">
                <span className="font-normal text-para">Extra Cost</span>
                <span className="font-medium text-dark-blue">{getCurrencySymbol(eventDetails?.currency || "")} {eventDetails?.OnsiteEvent?.extraAmount}</span>
              </div>
            ) : ""}
            <div className="flex justify-between border-b border-zinc-300 pb-2">
              <span className="font-normal text-para">Number of Events Dates</span>
              <span className="font-medium text-dark-blue">{getCurrencySymbol(eventDetails?.currency || "")} {eventDetails?.actualPrice && eventDetails?.actualPrice} x {selectedDates?.length || 0}</span>
            </div>
            <div className="flex justify-between mt-4 text-lg">
              <span className="font-semibold py-2 text-dark-blue">Total</span>
              <span className="font-semibold py-2 text-dark-blue">{getCurrencySymbol(eventDetails?.currency || "")} {(eventDetails?.actualPrice && eventDetails?.actualPrice * selectedDates?.length || getActualPrice()) * guestValue}</span>
            </div>
            {eventDetails?.eventType == "ONSITE" && eventDetails?.platformCharge ? (
              <div className="flex justify-between border-b border-zinc-300 pb-2">
                <span className="font-semibold text-dark-blue">Upfront Payment</span>
                <span className="font-semibold text-dark-blue">{getCurrencySymbol(eventDetails?.currency || "")} {upfrontPayment.toFixed(2)} ({platformCharge}%)</span>
              </div>
            ) : ""}
          </div>
        </div>
      </div>
    </Container>

  );
};

export default EventBookingForm;
