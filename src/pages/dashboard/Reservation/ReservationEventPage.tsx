import { MdPendingActions } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { IoLocation } from "react-icons/io5";
import { getCurrencySymbol } from "../../../utils/currencySymbols";
import { FaXmark } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { message } from "antd";
import api from "../../../api";
import ConfirmReservationModal from "../../../components/dashboard/shared/Buttons/ConfirmReservationModal";
// import { Button } from "../../../components";
import CreateOnlineMeeting from "../Events/VideoMeeting/CreateOnlineMeeting";

type ReservationEventProps = {
  data: {
    id: string;
    eventId: string; // Added for events
    name: string;
    status: string;
    verifyBySellerStatus?: string;
    refNumber: string;
    location: string;
    startDate: string;
    endDate: string;
    price: number;
    nights: number;
    imageUrl: string;
    guest: number;
    category: string;
    priceDue: number;
    currency: string;
    bookingStatus?: string; // Added for check-in/check-out status
    eventType: string;
    onlineEvent?: {
      link: string;
    };
  };
  role: string;
  onStatusUpdate?: () => void;
};

const ReservationEventPage: React.FC<ReservationEventProps> = ({ data, role, onStatusUpdate }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<"confirm" | "decline">("confirm");
  // Add check-in/check-out handler for stays
  const [checkinLoading, setCheckinLoading] = useState(false);

  const eventType = data.eventType;
  const isSeller = role === "SELLER";
  console.log(data.imageUrl,"data.imageUrl");

  const handleAction = async () => {
    setLoading(true);
    try {
      const payload = {
        verifyBySeller: action === "confirm" ? "CONFIRM" : "DECLINED"
      };
      // Choose endpoint based on reservation type
      let endpoint = '';
      if (data.category === 'stay') {
        endpoint = `rooms/seller/verify-by-seller/${data.id}`;
      } else {
        endpoint = `/event-buyer-history/${data.id}`;
      }
      await api.patch(endpoint, payload);
      message.success(`Reservation ${action === "confirm" ? "confirmed" : "declined"} successfully!`);
      
      // Close modal
      setShowConfirmModal(false);
      setShowDeclineModal(false);
      
      // Refresh the data
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : `Failed to ${action} reservation`;
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Add check-in/check-out handler for stays
  const handleCheckinCheckout = async (nextStatus: 'CHECKIN' | 'CHECKOUT') => {
    setCheckinLoading(true);
    try {
      await api.patch(`/rooms/seller/booking/status/${data.id}`, {
        bookingStatus: nextStatus
      });
      message.success(`Reservation ${nextStatus === 'CHECKIN' ? 'checked in' : 'checked out'} successfully!`);
      if (onStatusUpdate) onStatusUpdate();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : `Failed to ${nextStatus.toLowerCase()} reservation`;
      message.error(errorMessage);
    } finally {
      setCheckinLoading(false);
    }
  };

  const openConfirmModal = () => {
    setAction("confirm");
    setShowConfirmModal(true);
  };

  const openDeclineModal = () => {
    setAction("decline");
    setShowDeclineModal(true);
  };

  const renderStatusButtons = () => {
    if (!isSeller) {
      // Buyer can only view status, no actions
      if (data.verifyBySellerStatus?.toUpperCase() === 'PENDING') {
        return (
          <div className="mt-auto flex gap-3 ms-auto">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <MdPendingActions />
              Pending Approval
            </button>
          </div>
        );
      } else if (data.verifyBySellerStatus?.toUpperCase() === 'CONFIRM') {
        return (
          <div className="mt-auto flex gap-3 ms-auto">
            <button className="bg-success text-white px-4 py-2 rounded-md flex items-center gap-2">
              <FaCheck />
              Booking Confirmed
            </button>
          </div>
        );
      } else if (data.verifyBySellerStatus?.toUpperCase() === 'DECLINED') {
        return (
          <div className="mt-auto flex gap-3 ms-auto">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <FaXmark />
              Booking Declined
            </button>
          </div>
        );
      } else {
        return (
          <div className="mt-auto flex gap-3 ms-auto">
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
              Unknown Status
            </button>
          </div>
        );
      }
    } else {
      // Seller can perform actions
      if (data.verifyBySellerStatus?.toUpperCase() === 'PENDING') {
        return (
          <div className="mt-auto flex gap-3 justify-end">
            <button 
              onClick={openDeclineModal}
              className="border border-primary text-para px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-50 hover:border-red-500 transition-colors"
            >
              <FaXmark />
              Decline
            </button>
            <button 
              onClick={openConfirmModal}
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-purple-700 transition-colors"
            >
              <FaCheck />
              Confirm
            </button>
          </div>
        );
      } else if (data.verifyBySellerStatus?.toUpperCase() === 'CONFIRM') {
        return (
          <div className="mt-auto flex gap-3">
            <button className="bg-success text-white px-4 py-2 rounded-md flex items-center gap-2">
              <FaCheck />
              Booking Confirmed
            </button>
          </div>
        );
      } else if (data.verifyBySellerStatus?.toUpperCase() === 'DECLINED') {
        return (
          <div className="mt-auto flex gap-3">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <FaXmark />
              Booking Declined
            </button>
          </div>
        );
      } else {
        return (
          <div className="mt-auto flex gap-3">
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
              Unknown Status
            </button>
          </div>
        );
      }
    }
  };

  // Render check-in/check-out button for stays after confirmation
  const renderCheckinCheckoutButton = () => {
    if (
      data.category === 'stay' &&
      isSeller &&
      data.verifyBySellerStatus?.toUpperCase() === 'CONFIRM'
    ) {
      if (data.bookingStatus === 'CHECKOUT') {
        return (
          <button className="flex items-center gap-1 bg-gray-400 text-white px-4 py-2 rounded-md mt-2 bg-success" disabled>
          <FaCheck/>  Completed
          </button>
        );
      } else if (data.bookingStatus === 'CHECKIN') {
        return (
          <button
            className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition-colors"
            onClick={() => handleCheckinCheckout('CHECKOUT')}
            disabled={checkinLoading}
          >
            <FaCheck/>{checkinLoading ? 'Processing...' : 'Customer Checkout'}
          </button>
        );
      } else {
        return (
          <button
            className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-md mt-2 hover:bg-green-600 transition-colors"
            onClick={() => handleCheckinCheckout('CHECKIN')}
            disabled={checkinLoading}
          >
            <FaCheck/>{checkinLoading ? 'Processing...' : 'Customer Checkin'}
          </button>
        );
      }
    }
    return null;
  };

  return (
    <>
      <div className="w-full h-fit md:flex gap-5 border border-primary p-5 rounded-xl cursor-default">
        <div className="w-full md:w-[unset] h-[200px] aspect-square rounded-xl overflow-hidden flex-shrink-1">
          <img
            className="object-cover h-full w-full"
            src={data.imageUrl}
            alt={data.name}
          />
        </div>
        <div className="relative h-fit mt-2 md:mt-0 md:flex justify-between flex-1 ">
          <div>
            <div className="flex items-center gap-3 pb-2 pt-2 md:pt-0">
              <a
                href={data.category === 'stay' ? `/bookingsCardDetails/${data.id}` : `/eventBookingDetail/${data.id}`}
                className="font-medium text-xl hover:text-[#9427F7] transition-all underline">
                {data.name}
              </a>
              <p className="pr-3 text-[#9427F7] capitalize flex items-center gap-1">
                <span>
                  {
                    data.status?.toLowerCase() === 'pending' &&<MdPendingActions className="text-sm" />
                  }
                </span>
                {data.status?.toLowerCase()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="font-medium text-para">Ref number</h1>
              <p className="pr-3">{data.refNumber}</p>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="font-medium text-para">
                Night{data.nights > 1 ? "s" : ""}
              </h1>
              <p className="pr-3">{data.nights}</p>
            </div>
            <div className="flex items-start mt-3 gap-3">
              <p className="pr-3 pb-2 flex items-center gap-1">
                <span><IoLocation /></span>
                {data.location}
              </p>
            </div>
            <div className=" mt-5 md:mt-0 md:w-fit flex flex-col gap-3 ">
              <h1 className="text-nowrap flex items-center gap-1">
                <span><SlCalender /></span>
                {`${data.startDate} - ${data.endDate}`}
              </h1>
            </div>
          </div>
          <div className="flex flex-col  md:items-end gap-1 text-right text-nowrap">
            <h2 className="font-medium text-para">Paid {getCurrencySymbol(data.currency)} {data.price}</h2>
            {data.priceDue !== 0 && <h2 className="font-medium text-para">Price Due {getCurrencySymbol(data.currency)} {data.priceDue}</h2>}
            <h2 className="font-medium text-para">No of Guest: {data.guest}</h2>
            {/* Status buttons based on role */}
            {renderStatusButtons()}
            {/* Checkin/Checkout button for stays */}
            {renderCheckinCheckoutButton()}
            {eventType === "ONLINE" && data.verifyBySellerStatus?.toUpperCase() === 'CONFIRM' && role === "SELLER" &&
              // <Button className="mt-3">Create Meeting</Button>
              <CreateOnlineMeeting userRole={role} onlineEvent={data.onlineEvent} eventId={data.eventId} />
            }
          </div>
        </div>
      </div>

      {/* Confirmation Modal - Only show for sellers */}
      {isSeller && (
        <>
          <ConfirmReservationModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={handleAction}
            action="confirm"
            loading={loading}
          />

          {/* Decline Modal */}
          <ConfirmReservationModal
            isOpen={showDeclineModal}
            onClose={() => setShowDeclineModal(false)}
            onConfirm={handleAction}
            action="decline"
            loading={loading}
          />
        </>
      )}
    </>
  );
};

export default ReservationEventPage;
