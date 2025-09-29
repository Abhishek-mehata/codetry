import { useEffect, useState } from "react";
import "../../../index.css";
import { DatePicker } from "antd";
import api from "../../../api";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { PlaceDetails } from "./StaysDetails";
import Container from "../../../components/client/shared/Container";
import dayjs, { Dayjs } from "dayjs";
import { getCurrencySymbol } from "../../../utils/currencySymbols";
import { useAppSelector } from "../../../hooks/useTypedSelectors";
import { RootAppState } from "../../../redux/store";
import { useGetPaymentPricesQuery } from '../../../redux/features/paymentSettingsApi';

// Extend Room type to allow occupancy from backend
type RoomWithOccupancy = import("../../../lib/types/stays").Room & { occupancy?: string | number };

const StaysForm = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const roomsParam = params.get("rooms");
  const reservedRoomsIds = roomsParam ? roomsParam.split(",").map(Number) : [];
  const [value, setValue] = useState<number | "">(1);
  const [guestError, setGuestError] = useState<string | null>(null);
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);
  const isAuthenticated = useAppSelector((state: RootAppState) => state.auth.isAuthenticated);
  const { data: paymentPrices } = useGetPaymentPricesQuery();
  console.log('getPaymentPrices:', paymentPrices);

  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const { id: placeId } = useParams<{ id: string }>();
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails>({});
  // Reserved Place Data 
  const reservedPlace = placeDetails?.rooms?.filter((room) => {
    return reservedRoomsIds.includes(room.id);
  });
  // Reserved Place Data 

  // Calculate total occupancy of selected rooms
  const totalOccupancy = ((reservedPlace as unknown) as RoomWithOccupancy[])?.reduce((acc, room) => acc + (Number(room.occupancy) || 0), 0) || 0;


  const fetchPlaceDetails = async () => {
    try {
      const res = await api.get(`/explore/place/${placeId}`);
      setPlaceDetails(res.data);
      console.log(res.data, "placeDetailskkkkk");
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };


  // Handle Payment Start
  // const handleConfirmAndPay = async () => {
  //   if (
  //     !value ||
  //     typeof value !== "number" ||
  //     value < 1 ||
  //     value > totalOccupancy
  //   ) {
  //     setGuestError(`Guests must be between 1 and ${totalOccupancy}`);
  //     return;
  //   }
  //   if (!isAuthenticated) {
  //     navigate("/auth/login");
  //     return;
  //   }
  //   if (!placeDetails || !dates) {
  //     alert("Please select dates and ensure room is loaded.");
  //     return;
  //   }

  //   const payload = {
  //     roomBookings: reservedRoomsIds.map(roomId => ({
  //       roomId: roomId,
  //       startDate: dates[0].format('YYYY-MM-DD'),
  //       endDate: dates[1].format('YYYY-MM-DD'),
  //       noOfGuests: value,
  //       quantity: 1
  //     }))
  //   };

  //   try {
  //     const response = await api.post("payment/order/room", payload);

  //     const { paymentUrl } = response.data;
  //     if (paymentUrl) {
  //       window.location.href = paymentUrl; // Redirect to payment gateway
  //     } else {
  //       alert("Payment URL not found.");
  //     }
  //   } catch (error) {
  //     console.log(payload);
  //     console.error("Booking failed:", error);
  //     alert("An error occurred while creating the order.");
  //   }
  // };

  const handleConfirmAndPay = () => {
      if (
        !value ||
        typeof value !== "number" ||
        value < 1 ||
        value > totalOccupancy
      ) {
        setGuestError(`Guests must be between 1 and ${totalOccupancy}`);
        return;
      }
      if (!isAuthenticated) {
        navigate("/auth/login");
        return;
      }
      if (!placeDetails || !dates) {
        alert("Please select dates and ensure room is loaded.");
        return;
      }
    alert("We're working on this feature! It will be released in a future update.");
  }
  // Handle Payment End

  useEffect(() => {
    if (placeId) {
      fetchPlaceDetails();
    }
  }, [placeId]);


  // Update calcTotal and grandTotal to include discount and extra cost
  const calcTotal = () => {
    if (!reservedPlace) return 0;
    const roomPrice = reservedPlace?.reduce((acc, room) => {
      const priceAfterDiscount = room.isDiscountAvailable && room.discount ? room.price - (room.price * (room.discount / 100)) : room.price;
      const totalRoomPrice = priceAfterDiscount + (room.extraAmount || 0);
      return acc + totalRoomPrice;
    }, 0);
    return roomPrice;
  };

  const grandTotal = () => {
    if (!reservedPlace || !dates) return 0;
    const nights = dates[1].diff(dates[0], "days");
    const roomPrice = reservedPlace?.reduce((acc, room) => {
      const priceAfterDiscount = room.isDiscountAvailable && room.discount ? room.price - (room.price * (room.discount / 100)) : room.price;
      const totalRoomPrice = priceAfterDiscount + (room.extraAmount || 0);
      return acc + totalRoomPrice;
    }, 0);
    const stayPrice = roomPrice * nights;
    return stayPrice;
  };

  // Calculate upfront payment using platformCharge from paymentPrices
  type PaymentPrice = { platformCharge: number; paymentSettingType: string };
  const getRoomPlatformCharge = () => {
    if (!paymentPrices || !Array.isArray(paymentPrices)) return 0;
    const roomSetting = (paymentPrices as PaymentPrice[]).find((p) => p.paymentSettingType === 'room');
    return roomSetting ? roomSetting.platformCharge : 0;
  };

  const upfrontPayment = () => {
    const chargePercent = getRoomPlatformCharge();
    const total = grandTotal();
    return (chargePercent / 100) * total;
  };

  const disabledDate = (current: Dayjs) => {
    // Disable all dates before today
    return current && current < dayjs().startOf('day');
  };

  return (
    <Container className="px-6 py-10">
      <div className="grid grid-cols-5 py-6 items-start gap-0 md:gap-7">
        <main className="col-span-5 md:col-span-3">
          <div className="border-b pb-10 border-[#DEE2E6]">
            <div className="text-dark-blue mb-4">
              <h1 className="text-3xl font-semibold">Confirm and Pay</h1>
              <h1 className="text-3xl font-semibold mt-2">Your trip</h1>
            </div>

            <div className="mb-3">
              <label className="pr-2 font-medium text-dark-blue" htmlFor="date">Dates:</label>
              <div className="w-[220px] flex gap-1 items-center cursor-pointer p-2 px-3 border border-primary rounded-md bg-white">
                <RangePicker
                  suffixIcon={null}
                  className="w-full border-0 focus-within:shadow-none"
                  onChange={(value) => setDates(value as [Dayjs, Dayjs] | null)}
                  disabledDate={disabledDate}
                />
              </div>
            </div>

            <div className="bg-white  rounded-xl p-[10px] ">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Guests:</h3>
              <div className="flex items-center  gap-4">
                <button
                  onClick={() => {
                    if (typeof value === "number" && value > 1) setValue(value - 1);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-lg font-bold hover:bg-purple-200 transition"
                  type="button"
                >
                  -
                </button>
                <input
                  className="w-20 text-center border border-purple-300 rounded-lg h-10 text-gray-700 font-medium"
                  type="number"
                  min={1}
                  max={totalOccupancy}
                  value={value}
                  onChange={e => {
                    const v = e.target.value;
                    if (v === "") {
                      setValue("");
                      setGuestError(null);
                      return;
                    }
                    const num = Number(v);
                    setValue(num);
                    if (num < 1 || num > totalOccupancy) {
                      setGuestError(`Guests must be between 1 and ${totalOccupancy}`);
                    } else {
                      setGuestError(null);
                    }
                  }}
                />

                <button
                  onClick={() => {
                    if (typeof value === "number" && value < totalOccupancy) setValue(value + 1);
                  }}
                  disabled={typeof value === "number" ? value >= totalOccupancy : false}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-lg font-bold hover:bg-purple-200 transition"
                  type="button"
                >
                  +
                </button>
              </div>
              <div className="text-[18px] text-gray-600 mt-2">
                Max guests: {totalOccupancy}
              </div>
              {guestError && <div className="text-sm text-danger mt-1">{guestError}</div>}
            </div>
          </div>
          <div className="py-5">
            <p className="text-sm">
              By selecting the button below, I agree to the Host's House Rules, DMT Rebooking and Refund Policy,
              and that DMT can charge my payment method if I'm responsible for damage.
            </p>
            <button
              onClick={handleConfirmAndPay}
              className="p-5 bg-[#9C59DF] rounded-md mt-5 text-white font-semibold"
              type="button"
              disabled={
                !value ||
                typeof value !== "number" ||
                value < 1 ||
                value > totalOccupancy ||
                !!guestError
              }
            >
              Confirm and pay
            </button>
          </div>
        </main>

        {/* Request to Book Desktop View Start */}
        {reservedRoomsIds?.length > 0 &&
          <div className="col-span-5 md:col-span-2 mt-7 md:mt-0 p-6 border-[0.2px] border-zinc-300 rounded-md opacity-[50] inset-shadow-[20px]">
            <h3 className="text-dark-blue font-medium text-xl mb-3">Price details</h3>
            {reservedPlace?.map((room) => {
              console.log(room, "Room Data");
              const priceAfterDiscount = room.isDiscountAvailable && room.discount ? room.price - (room.price * (room.discount / 100)) : room.price;
              const totalRoomPrice = priceAfterDiscount + (room.extraAmount || 0);
              const discountAmount = room.isDiscountAvailable && room.discount ? room.price * (room.discount / 100) : 0;
              return (
                <div key={room.id} className="mb-2">
                  <div className="flex justify-between border-b border-zinc-300">
                    <p className="font-normal text-gray">{room.title}</p>
                    <p className="py-1 font-normal text-dark-blue">{getCurrencySymbol(placeDetails?.currency || "USD")} {room.price} / nights</p>
                  </div>
                  {/* Discount and Extra Cost Info */}
                  {room.isDiscountAvailable && room.discount ? (
                    <div className="flex justify-between text-green-600 text-sm">
                      <span>Discount:</span>
                      <span>-{room.discount}% (
                        -{getCurrencySymbol(placeDetails?.currency || "USD")} {discountAmount.toFixed(2)}
                        )</span>
                    </div>
                  ) : null}
                  {room.extraAmount ? (
                    <div className="flex justify-between text-blue-600 text-sm">
                      <span>Extra cost: (Transfer Service)</span>
                      <span>+{getCurrencySymbol(placeDetails?.currency || "USD")} {room.extraAmount}</span>
                    </div>
                  ) : null}
                  {/* Final price after discount and extra cost */}
                  {(room.isDiscountAvailable && room.discount) || room.extraAmount ? (
                    <div className="flex justify-between text-dark-blue text-sm font-semibold">
                      <span>Final per night:</span>
                      <span>{getCurrencySymbol(placeDetails?.currency || "USD")} {totalRoomPrice.toFixed(2)}</span>
                    </div>
                  ) : null}
                </div>
              );
            })}

            {
              calcTotal() &&
              <>
                <div className="flex justify-between border-b border-zinc-300 ">
                  <p className="py-2 font-normal text-gray">Total Stays</p>
                  <p className="py-2 font-normal text-dark-blue">{dates && dates[1].diff(dates[0], "days") || 1} Nights</p>
                </div>
                {/* <div className="flex justify-between border-b border-zinc-300 text-lg">
                  <p className="py-2 font-semibold text-dark-blue">Total</p>
                  <p className="py-2  font-semibold text-dark-blue">{getCurrencySymbol(placeDetails?.currency || "USD")} {calcTotal()}</p>
                </div> */}

              </>
            }

            {grandTotal() ?
              <>
                <div className="flex justify-between border-b border-zinc-300 text-dark-blue">
                  <p className="py-2  font-semibold">Grand Total</p>
                  <p className="py-2 font-semibold"> {dates && dates[1].diff(dates[0], "days")} nights = <span className="font-semibold text-lg">{getCurrencySymbol(placeDetails?.currency || "USD")} {grandTotal()}</span></p>
                </div>
                <div className="flex justify-between border-b border-zinc-300">
                  <p className="py-2 font-semibold text-dark-blue">Upfront Payment</p>
                  <p className="py-2  font-bold text-dark-blue">
                    {getCurrencySymbol(placeDetails?.currency || "USD")} {upfrontPayment().toFixed(2)}
                    {getRoomPlatformCharge() ? ` (${getRoomPlatformCharge()}%)` : ''}
                  </p>
                </div>
              </>
              : <h1 className="font-normal mt-2 text-danger text-end">*Please Select Dates</h1>

            }
          </div>
        }
        {/* Request to Book Desktop View End */}

      </div>
    </Container>
  );
};

export default StaysForm;