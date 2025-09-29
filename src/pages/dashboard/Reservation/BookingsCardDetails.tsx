
// import user from "../../../assets/svg/user.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootAppState } from '../../../redux/store';
import { useParams } from "react-router-dom";
import api from "../../../api";
import { AxiosError } from "axios";
import Loader from "../../../components/shared/Loader";
import { Link } from "react-router-dom";
import { getCurrencySymbol } from "../../../utils/currencySymbols";
import MessageCard from "./MessageCard";
import CountDownTimer from "./CountDownTimer";

export interface Seller {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string | null;
  role: string;
  isSeller: boolean;
  isEmailConfirmed: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  profilePicture?: string;
  bankname?: string | null;
  accountNumber?: string | null;
  accountHolderName?: string | null;
  ifsccode?: string | null;
  ibannumber?: string | null;
  swiftcode?: string | null;
  address?: string | null;
  paypalEmail?: string | null;
}

export interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  formattedStartDate: string;
  formattedEndDate: string;
  numberOfNights: number;
  status: string;
  refNumber?: string;
  specialRequest?: string;
  noOfGuests: number;
  verifyBySeller: "PENDING" | "CONFIRM" | "DECLINE";
  paymentId: string;
  Room: {
    id: number;
    title: string;
    images?: string[];
    price: number;
    place: {
      title: string;
      name: string;
      location: string;
      city: string;
      country: string;
    };
    beds: {
      type: string;
      quantity: number;
    }[];
  };
  Payment?: {
    id: string;
    status: string;
    amount: number;
    nextPaymentAmount: number;
    totalAmount?: number;
    currency?: string;
  };
  Buyer: {
    id: number;
    name: string;
    avatar?: string;
    trips?: number;
    firstName: string;
    lastName: string;
  };
  seller?: Seller;
  createdAt?: string;
}


// Remove role prop, get from redux
const BookingsCardDetails = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Get role from auth redux
  const role = useSelector((state: RootAppState) => state.auth?.user?.role || "BUYER");
  const buyerPayment = bookingData?.Payment;
  const roomDetails = bookingData?.Room;
  const placeDetails = roomDetails?.place;
  const fullLocation = placeDetails?.city + ", " + placeDetails?.country;
  const numberOfNights = bookingData?.numberOfNights;
  const numberOfGuests = bookingData?.noOfGuests;

  console.log(bookingData, "fasdfasdf");

  const bookingId = bookingData?.paymentId;
  // Use sellerId from payload if available, fallback to 86
  const sellerId = bookingData?.seller?.id;

  useEffect(() => {
    const fetchBooking = async () => {
      const endpoint = role === "SELLER"
        ? `rooms/seller/booked-rooms/${id}`
        : `rooms/buyer/my-booked-rooms/${id}`;
      try {
        const res = await api.get(endpoint, {
          withCredentials: true,
        });
        setBookingData(res.data);
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        setError(error.response?.data?.message || "Failed to fetch booking");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id, role]);

  if (loading) {
    return <Loader className="h-screen" loading={loading} />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }


  return (
    <section className="relative w-full h-fit p-8 md:p-10 lg:p-20 mb-5">
      <header>
        <div className="w-full h-fit md:flex border border-[#9427F7] py-7 px-5 rounded-xl cursor-default items-start">
          <div>
            <img
              className="object-cover w-full md:w-[290px] md:h-[200px] h-[180px] rounded-md"
              src={bookingData?.Room.images?.[0] || "https://dmttourism.com/images/property/13/1740383146_promoted1.jpeg"}
              alt={bookingData?.Room.title || "Room Image"}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2 md:px-8">
            <div>
              <div className="flex items-center justify-between gap-3 pb-2 pt-2 md:pt-0">
                <Link to={`/stays/${bookingData?.Room?.id}`} className="font-semibold text-xl hover:text-[#9427F7] transition-all border-b">
                  {bookingData?.Room.title}
                </Link>
              </div>
              <div className="flex items-center justify-between gap-3">
                <h1 className="font-[400] text-dark-blue">
                  <span className="font-medium"> Place Name: </span >
                  {roomDetails?.place?.title || "Test Product"}
                </h1>
              </div>
              <div className="">
                <h1 className="font-[400] text-dark-blue">
                  <span className="font-medium">Location: </span >  {fullLocation}
                </h1>
              </div>
              <div className="font-[400] text-dark-blue">
                <span className="font-medium"> Number of Guests: </span > {numberOfGuests}
              </div>
              <p className="mr-4 font-[400]"><span className="font-medium">Nights: </span > {numberOfNights} days</p>
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
                } else if (status === 'DECLINED') {
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
          </div>
          {/* Vertical Line Start */}
          <div className="h-[140px] hidden lg:block w-[1px] bg-dark-blue self-center"></div>
          {/* Vertical Line End */}
          <div className="p-0 lg:px-8">
            <div className="flex items-center justify-between gap-3 pb-2 pt-2 md:pt-0">
              <p className="font-semibold text-xl hover:text-[#9427F7] transition-all">
                Payment Details
              </p>
            </div>
            {/* Payment breakdown */}
            {buyerPayment && (
              <div className="flex flex-col gap-2 mt-2">
                <div>
                  <span className="font-medium">Payment Id:</span> {getCurrencySymbol(buyerPayment?.id)}
                </div>
                <div>
                  <span className="font-medium">Paid Upfront:</span> {getCurrencySymbol(buyerPayment.currency || 'USD')} {buyerPayment.amount ?? 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Amount Left to Pay Onsite:</span> {getCurrencySymbol(buyerPayment.currency || 'USD')} {buyerPayment.nextPaymentAmount ?? 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Total Price:</span> {getCurrencySymbol(buyerPayment.currency || 'USD')} {buyerPayment?.amount + buyerPayment?.nextPaymentAmount}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative mt-10 w-full h-fit mb-10">
        {/* Status-based section */}
        {(() => {
          const status = bookingData?.verifyBySeller?.toUpperCase();
          
          if (status === 'CONFIRM' || status === 'CONFIRMED') {
            // CONFIRMED - Success section (no timer)
            return (
              <section className="border border-green-500 bg-green-50 rounded-xl p-8 mb-6 max-w-[600px] mx-auto">
                <div className="flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      {role === "BUYER" ? "Booking Confirmed!" : "Booking Confirmed!"}
                    </h3>
                    <p className="text-green-700">
                      {role === "BUYER" 
                        ? "Your booking has been successfully confirmed. You're all set!" 
                        : "You have successfully confirmed this booking request."
                      }
                    </p>
                  </div>
                </div>
              </section>
            );
          } else if (status === 'DECLINED') {
            // DECLINED - Decline section (no timer)
            return (
              <section className="border border-red-500 bg-red-50 rounded-xl p-8 mb-6 max-w-[600px] mx-auto">
                <div className="flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-800 mb-2">
                      {role === "BUYER" ? "Booking Declined" : "Booking Declined"}
                    </h3>
                    <p className="text-red-700">
                      {role === "BUYER" 
                        ? "Unfortunately, your booking request has been declined by the host." 
                        : "You have declined this booking request."
                      }
                    </p>
                  </div>
                </div>
              </section>
            );
          } else {
            // PENDING - Original countdown section
            return (
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
                      Your request is sent. They have 2 hours to confirm your reservation directly with us. We'll notify you the second we have an answer.
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
            );
          }
        })()}
        <div>
          <div className="border-b border-[#9427F7] pb-5 md:flex md:items-center">
            <h1 className="font-semibold text-xl lg:text-xl w-[250px] lg:w-[350px]">
              Reservation Details
            </h1>
            <div className="md:flex md:items-center md:justify-center md:w-full md:-ml-20 lg:-ml-40">
              <div className="flex flex-col gap-5 mt-5 md:grid md:grid-cols-2 md:gap-x-28 lg:gap-x-56">
                <div>
                  <h1 className="font-semibold lg:text-xl">Check-in</h1>
                  <p>{bookingData?.formattedStartDate || "N/A"}</p>
                </div>
                <div>
                  <h1 className="font-semibold lg:text-xl">Check-out</h1>
                  <p>{bookingData?.formattedEndDate || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
          {typeof bookingId !== "undefined" && typeof sellerId !== "undefined" && (
            <MessageCard bookingId={String(bookingId)} sellerId={sellerId} />
          )}
        </div>
      </main>
    </section>
  );
};

export default BookingsCardDetails;
