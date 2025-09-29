// import { useState } from "react";
// import "../../../index.css";
// import { DatePicker } from "antd";
// // import { spawn } from "child_process";

// const StaysForm = () => {
//   const [value, setValue] = useState(1);
//   const { RangePicker } = DatePicker;
//   const [dates, setDates] = useState([null, null]);
//   const [dateString, setDateString] = useState(["", ""]);
//   const [noOfDates, setNoOfDates] = useState(0);
//   const onChange = (dates: any, dateStrings: any) => {
//     setDates(dates);
//     setDateString(dateStrings);
//     console.log("Selected Time: ", dates);
//     // console.log("Formatted Selected Time: ", dateStrings);
//     // No of days between the two dates(checkin and checkout) when user is going to stay
//     setNoOfDates(dates.length);
//   };


//   const [guests, setGuests] = useState(1);

//   return (
//     <>
//       <div className=" p-10 lg:px-32 lg:flex lg:gap-20 ">

//         <main>
//           <div className="flex flex-col gap-10 border-b pb-10 border-[#DEE2E6] ">
//             <h1 className="text-3xl font-semibold">Confirm and pay</h1>
//             <h1 className="text-2xl font-semibold ">Your trip</h1>
//             <div className="flex items-center" >
//               <label className="pr-2 " htmlFor="date">
//                 Dates:
//               </label>
//               <div
//                 className={` w-[220px] flex gap-1 justify-start items-center cursor-pointer p-2 px-3 border border-primary rounded-md rounded-bl-md bg-white`}
//               >
//                 <RangePicker
//                   suffixIcon={null}
//                   bordered={false}
//                   className={`w-full`}
//                   onChange={onChange}
//                   value={dates}
//                   format="YYYY-MM-DD"
//                   placeholder={["Check-in", "Check-out"]}
//                 />
//               </div>
//             </div>

//             {/* <div>
//               <p className="mb-2">Guests:</p>

//               <button
//                 onClick={() => {
//                   if (value >= 2) {
//                     setValue(value - 1);
//                   } else {
//                     null;
//                   }

//                 }}
//                 className="px-5 py-[10px] bg-[#9C59DF] rounded text-white text-xl font-semibold "
//                 type="button"
//               >
//                 -
//               </button>
//               <input
//                 className="border rounded h-11 mx-2 w-[200px] p-3 border-[#9C59DF]"
//                 type="number"
//                 min={1}
//                 value={value}
//               />
//               <button
//                 onClick={() => {
//                   setValue(value + 1);
//                 }}
//                 className="px-5 py-[10px] rounded bg-[#9C59DF] text-white text-xl font-semibold"
//                 type="button"
//               >
//                 +
//               </button>
//             </div> */}

//             <div className="mt-4">
//               <h4 className="text-[#172b4d] text-[18px] font-medium my-1">Guests</h4>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => guests >= 2 && setGuests(guests - 1)}
//                   className="h-[50px] w-[50px] p-2 bg-[#9C59DF] rounded-full text-white text-[18px] font-bold"
//                   type="button"
//                 >
//                   -
//                 </button>
//                 <input
//                   className="border rounded w-[150px] h-[35px] text-[19px] px-1 border-[#9C59DF]"
//                   type="number"
//                   min={1}
//                   value={guests}
//                   onChange={(e) => setGuests(Number(e.target.value))}
//                 />
//                 <button
//                   onClick={() => setGuests(guests + 1)}
//                   className="h-[50px] w-[50px] p-2 bg-[#9C59DF] rounded-full text-white text-[18px] font-bold"
//                   type="button"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//           </div>


//           <div className="pt-10 pb-5 border-b border-[#DEE2E6] ">
//             <div className="flex flex-col gap-9">
//               <h1 className="text-2xl font-semibold ">
//                 You will pay after host approval
//               </h1>
//               {/* <input
//                 className="border h-56 rounded-md border-[#DEE2E6]  px-8 text-lg "
//                 type="textfield"
//                 placeholder="Type messege to Host."
//               /> */}
//               {/* Message to Host */}
//               <div className="mt-5">
//                 {/* <h3 className="text-[#172b4d] text-[17.5px] font-medium">Message to Host</h3> */}
//                 <textarea
//                   className="w-[100%] h-[200px] px-3 py-4 border border-[#c1c7d0] rounded-md text-[16px] font-medium"
//                   placeholder="Type message to host"
//                 ></textarea>
//               </div>
//             </div>
//             <div className="mt-10 flex flex-col gap-8 border border-[#DEE2E6] rounded-md p-8">
//               <h1 className="text-2xl font-semibold ">Cancellation policy</h1>
//               <p>This reservation is refundable before May 28, 2022</p>
//               <p>
//                 Our Extenuating Circumstances policy does not cover travel
//                 disruptions caused by COVID-19.
//               </p>
//             </div>
//           </div>
//           <div className="py-5">
//             <p className=" text-sm ">
//               By selecting the button below, I agree to the Host's House Rules,
//               Airbnb's Rebooking and Refund Policy, and that Airbnb can charge
//               my payment method if I'm responsible for damage.
//             </p>
//             <button className="p-5  bg-[#9C59DF] rounded-md mt-5 text-white font-semibold " type="submit">
//               Confirm and pay
//             </button>
//           </div>
//         </main>



//         <div className="card-container lg:w-[35%] lg:min-w-[300px] flex flex-col gap-5 h-fit border  border-[#DEE2E6] rounded-xl p-5 sticky top-24 ">
//           <div className="border-b-2 border-[#DEE2E6] pb-5 ">
//             <img
//               className="object-cover h-36 w-full rounded-xl "
//               src="https://dmttourism.com/images/property/13/1740383146_promoted1.jpeg"
//               alt=""
//             />
//           </div>
//           <div className="border-b-2 border-[#DEE2E6] pb-5 flex flex-col ">
//             <h1 className="text-2xl font-semibold mb-7">Price details</h1>
//             <div className="flex items-center justify-between">
//               <h1 className="font-semibold">Test</h1>
//               <p className="opacity-90 text-sm">NPR 25</p>
//             </div>
//             <div className="flex items-center justify-between ">
//               <h1 className="font-semibold">Service fee</h1>
//               {/* <p className="opacity-90 text-sm">{noOfDates?( ):()}</p> */}
//               <p className="opacity-90 text-sm">
//                 NPR 25
//               </p>
//             </div>

//           </div>
//           <div className="flex items-center justify-between font-semibold ">
//             <h1>Total</h1>
//             {/* <h1>525</h1> */}
//             <h1>
//               {noOfDates?<span>{noOfDates*guests*25}</span>:"Please fill Dates Section"}
//             </h1>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default StaysForm;


// import { useState } from "react";
// import "../../../index.css";
// import { DatePicker } from "antd";
// import type { RangePickerProps } from "antd/es/date-picker";
// import { Dayjs } from "dayjs";

// const StaysForm = () => {
//   const { RangePicker } = DatePicker;

//   const [dates, setDates] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
//   const [dateString, setDateString] = useState<[string, string]>(["", ""]);
//   const [noOfDates, setNoOfDates] = useState<number>(0);
//   const [guests, setGuests] = useState<number>(1);

//   const onChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
//     setDates(dates as [Dayjs | null, Dayjs | null]);
//     setDateString(dateStrings as [string, string]);
//     console.log("Selected Time: ", dates);

//     if (dates && dates[0] && dates[1]) {
//       const diff = dates[1].diff(dates[0], "day");
//       setNoOfDates(diff);
//     } else {
//       setNoOfDates(0);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form Submitted");
//     // You can proceed with further logic
//   };

//   return (
//     <>
//       <div className="p-10 lg:px-32 lg:flex lg:gap-20">
//         <form onSubmit={handleSubmit} className="flex-1">
//           <div className="flex flex-col gap-10 border-b pb-10 border-[#DEE2E6]">
//             <h1 className="text-3xl font-semibold">Confirm and pay</h1>
//             <h1 className="text-2xl font-semibold">Your trip</h1>

//             {/* Date Picker */}
//             <div className="flex items-center">
//               <label className="pr-2" htmlFor="date">
//                 Dates:
//               </label>
//               <div className="w-[220px] flex gap-1 justify-start items-center cursor-pointer p-2 px-3 border border-primary rounded-md bg-white">
//                 <RangePicker
//                   allowClear
//                   bordered={false}
//                   className="w-full"
//                   onChange={onChange}
//                   value={dates}
//                   format="YYYY-MM-DD"
//                   placeholder={["Check-in", "Check-out"]}
//                 />
//               </div>
//             </div>

//             {/* Guests Section */}
//             <div className="mt-4">
//               <h4 className="text-[#172b4d] text-[18px] font-medium my-1">Guests</h4>
//               <div className="flex items-center gap-2">
//                 <button
//                   type="button"
//                   aria-label="Decrease guests"
//                   onClick={() => guests > 1 && setGuests(guests - 1)}
//                   className="h-[50px] w-[50px] p-2 bg-[#9C59DF] rounded-full text-white text-[18px] font-bold"
//                 >
//                   -
//                 </button>
//                 <input
//                   className="border rounded w-[150px] h-[35px] text-[19px] px-1 border-[#9C59DF]"
//                   type="number"
//                   min={1}
//                   value={guests}
//                   onChange={(e) => {
//                     const value = Math.max(1, Number(e.target.value));
//                     setGuests(value);
//                   }}
//                 />
//                 <button
//                   type="button"
//                   aria-label="Increase guests"
//                   onClick={() => setGuests(guests + 1)}
//                   className="h-[50px] w-[50px] p-2 bg-[#9C59DF] rounded-full text-white text-[18px] font-bold"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Payment Instructions */}
//           <div className="pt-10 pb-5 border-b border-[#DEE2E6]">
//             <div className="flex flex-col gap-9">
//               <h1 className="text-2xl font-semibold">
//                 You will pay after host approval
//               </h1>

//               {/* Message to Host */}
//               <div className="mt-5">
//                 <textarea
//                   className="w-full h-[200px] px-3 py-4 border border-[#c1c7d0] rounded-md text-[16px] font-medium"
//                   placeholder="Type message to host"
//                 />
//               </div>
//             </div>

//             {/* Cancellation Policy */}
//             <div className="mt-10 flex flex-col gap-8 border border-[#DEE2E6] rounded-md p-8">
//               <h1 className="text-2xl font-semibold">Cancellation policy</h1>
//               <p>This reservation is refundable before May 28, 2022</p>
//               <p>Our Extenuating Circumstances policy does not cover travel disruptions caused by COVID-19.</p>
//             </div>
//           </div>

//           {/* Confirm and Pay Button */}
//           <div className="py-5">
//             <p className="text-sm">
//               By selecting the button below, I agree to the Host's House Rules, Airbnb's Rebooking and Refund Policy, and that Airbnb can charge my payment method if I'm responsible for damage.
//             </p>
//             <button
//               className="p-5 bg-[#9C59DF] rounded-md mt-5 text-white font-semibold disabled:bg-gray-400"
//               type="submit"
//               disabled={!dates[0] || !dates[1]}
//             >
//               Confirm and pay
//             </button>
//           </div>
//         </form>

//         {/* Card - Price Details */}
//         <div className="card-container lg:w-[35%] lg:min-w-[300px] flex flex-col gap-5 h-fit border border-[#DEE2E6] rounded-xl p-5 sticky top-24">
//           <div className="border-b-2 border-[#DEE2E6] pb-5">
//             <img
//               className="object-cover h-36 w-full rounded-xl"
//               src="https://dmttourism.com/images/property/13/1740383146_promoted1.jpeg"
//               alt="Stay"
//             />
//           </div>

//           <div className="border-b-2 border-[#DEE2E6] pb-5 flex flex-col">
//             <h1 className="text-2xl font-semibold mb-7">Price details</h1>

//             <div className="flex items-center justify-between">
//               <h1 className="font-semibold">Test</h1>
//               <p className="opacity-90 text-sm">NPR 25</p>
//             </div>

//             <div className="flex items-center justify-between">
//               <h1 className="font-semibold">Service fee</h1>
//               <p className="opacity-90 text-sm">NPR 25</p>
//             </div>
//           </div>

//           <div className="flex items-center justify-between font-semibold">
//             <h1>Total</h1>
//             <h1>
//               {noOfDates > 0 ? (
//                 <span>NPR {noOfDates * guests * 25}</span>
//               ) : (
//                 "Please fill Dates Section"
//               )}
//             </h1>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StaysForm;
// import { useEffect, useState } from "react";
// import "../../../index.css";
// import { DatePicker } from "antd";
// import api from "../../../api";
// import { useParams } from "react-router-dom";

// const StaysForm = () => {
//   const [value, setValue] = useState(1);
//   interface Bed {
//     type: string;
//     count: number;
//   }
//   interface RoomDetails {
//     id: number;
//     title: string;
//     price: number;
//     stock: number;
//     room_type: string;
//     isDiscountAvailable: boolean;
//     discount: number | null;
//     transferService: string;
//     extraAmount: number | null;
//     place_id: number;
//     createdAt: string;
//     images: string[];
//     beds: Bed[];
//     place: {
//       id: number;
//       title: string;
//       description: string;
//       currency: string | null;
//       price: number | null;
//       // include more if needed
//     };
//   }

//   const { RangePicker } = DatePicker;
//   const { id } = useParams();
// console.log(id, "id")
//     const [roomDetails, setRoomDetails] = useState<RoomDetails>({});

//     const fetchRoomDetails = async () => {
//       try {
//         const res = await api.get(`rooms/by-id/${id}`);
//         setRoomDetails(res.data); // Axios puts the data inside res.data
//         // setSelectedRooms(res.data.rooms); // Set the rooms data to state
//       } catch (error) {
//         console.error("Error fetching event:", error);
//       }
//     };
//       useEffect(() => {
//         if (id) {
//           fetchRoomDetails();
//         }
//       }, [id]);
//       console.log(roomDetails, "roomDetails")
//   return (
//     <>
//       <div className=" p-10 lg:px-32 lg:flex lg:gap-20 ">

//         <main>
//           <div className="flex flex-col gap-10 border-b pb-10 border-[#DEE2E6] ">
//             <h1 className="text-3xl font-semibold">Confirm and pay</h1>
//             <h1 className="text-2xl font-semibold ">Your trip</h1>
//             <div className="flex items-center" >
//               <label className="pr-2 " htmlFor="date">
//                 Dates:
//               </label>
//               <div
//                 className={` w-[220px] flex gap-1 justify-start items-center cursor-pointer p-2 px-3 border border-primary rounded-md rounded-bl-md bg-white`}
//               >
//                 <RangePicker
//                   suffixIcon={null}
//                   bordered={false}
//                   className={`w-full`}
//                 />
//               </div>
//             </div>
//             <div>
//               <p className="mb-2">Guests:</p>

//               <button
//                 onClick={() => {
//                   if (value >= 2) {
//                     setValue(value - 1);
//                   } else {
//                     null;
//                   }
//                 }}
//                 className="px-5 py-[10px] bg-[#9C59DF] rounded text-white text-xl font-semibold "
//                 type="button"
//               >
//                 -
//               </button>
//               <input
//                 className="border rounded h-11 mx-2 w-[200px] p-3 border-[#9C59DF]"
//                 type="number"
//                 min={1}
//                 value={value}
//               />
//               <button
//                 onClick={() => {
//                   setValue(value + 1);
//                 }}
//                 className="px-5 py-[10px] rounded bg-[#9C59DF] text-white text-xl font-semibold"
//                 type="button"
//               >
//                 +
//               </button>
//             </div>
//           </div>


//           <div className="pt-10 pb-5 border-b border-[#DEE2E6] ">
//             <div className="flex flex-col gap-9">
//               <h1 className="text-2xl font-semibold ">
//                 You will pay after host approval
//               </h1>
//               <input
//                 className="border h-56 rounded-md border-[#DEE2E6]  px-8 text-lg "
//                 type="textfield"
//                 placeholder="Type messege to Host."
//               />
//             </div>
//             <div className="mt-10 flex flex-col gap-8 border border-[#DEE2E6] rounded-md p-8">
//               <h1 className="text-2xl font-semibold ">Cancellation policy</h1>
//               <p>This reservation is refundable before May 28, 2022</p>
//               <p>
//                 Our Extenuating Circumstances policy does not cover travel
//                 disruptions caused by COVID-19.
//               </p>
//             </div>
//           </div>
//           <div className="py-5">
//             <p className=" text-sm ">
//               By selecting the button below, I agree to the Host's House Rules,
//               Airbnb's Rebooking and Refund Policy, and that Airbnb can charge
//               my payment method if I'm responsible for damage.
//             </p>
//             <button className="p-5  bg-[#9C59DF] rounded-md mt-5 text-white font-semibold " type="submit">
//               Confirm and pay
//             </button>
//           </div>
//         </main>



//         {/* <div className="card-container lg:w-[35%] lg:min-w-[300px] flex flex-col gap-5 h-fit border  border-[#DEE2E6] rounded-xl p-5 sticky top-24 "> */}
//           {/* <div className="border-b-2 border-[#DEE2E6] pb-5 ">
//             <img
//               className="object-cover h-36 w-full rounded-xl "
//               src="https://dmttourism.com/images/property/13/1740383146_promoted1.jpeg"
//               alt=""
//             />
//           </div> */}
//           {/* <div className="border-b-2 border-[#DEE2E6] pb-5 flex flex-col ">
//             <h1 className="text-2xl font-semibold mb-7">Price details</h1>
//             <div className="flex items-center justify-between">
//               <h1 className="font-semibold">Test</h1>
//               <p className="opacity-90 text-sm">NPR 25</p>
//             </div>
//             <div className="flex items-center justify-between ">
//               <h1 className="font-semibold">Service fee</h1>
//               <p className="opacity-90 text-sm">NPR 500</p>
//             </div>
//           </div> */}
//           <div className="card-container lg:w-[35%] lg:min-w-[300px] flex flex-col gap-5 h-fit border border-[#DEE2E6] rounded-xl p-5 sticky top-24 ">
//   <div className="border-b-2 border-[#DEE2E6] pb-5">
//     <img
//       className="object-cover h-36 w-full rounded-xl"
//       src={roomDetails.images?.[0] || "https://via.placeholder.com/300x150"}
//       alt={roomDetails.title}
//     />
//   </div>
//   <div className="border-b-2 border-[#DEE2E6] pb-5 flex flex-col">
//     <h1 className="text-2xl font-semibold mb-7">Price details</h1>

//     <div className="flex items-center justify-between">
//       <h1 className="font-semibold">{roomDetails.title}</h1>
//       <p className="opacity-90 text-sm">NPR {roomDetails.price}</p>
//     </div>

//     <div className="flex items-center justify-between">
//       <h1 className="font-semibold">Service fee</h1>
//       <p className="opacity-90 text-sm">NPR 500</p>
//     </div>
//   </div>

//   <div className="flex items-center justify-between font-semibold">
//     <h1>Total</h1>
//     <h1>NPR {roomDetails.price ? roomDetails.price + 500 : 500}</h1>
//   </div>
// {/* </div> */}

//           <div className="flex items-center justify-between font-semibold ">
//             <h1>Total</h1>
//             <h1>525</h1>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default StaysForm;
import { useEffect, useState } from "react";
import "../../../index.css";
import { DatePicker } from "antd";
import api from "../../../api";
import { useParams } from "react-router-dom";
// import moment from "moment";
import { Dayjs } from 'dayjs';

const StaysForm = () => {
  const [value, setValue] = useState(1); // number of guests
  // const [dates, setDates] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);

  interface Bed {
    type: string;
    count: number;
  }

  interface RoomDetails {
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
    beds: Bed[];
    place: {
      id: number;
      title: string;
      description: string;
      currency: string | null;
      price: number | null;
    };
  }

  const { RangePicker } = DatePicker;
  const { id } = useParams<{ id: string }>();
  const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);

  const fetchRoomDetails = async () => {
    try {
      const res = await api.get(`rooms/by-id/${id}`);
      setRoomDetails(res.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  };
  const handleConfirmAndPay = async () => {
    if (!roomDetails || !dates) {
      alert("Please select dates and ensure room is loaded.");
      return;
    }

    const payload = {
      roomId: roomDetails.id,
      startDate: dates[0].toISOString(),
      endDate: dates[1].toISOString(),
      noOfGuests: value,
    };

    try {
      const response = await api.post("payment/order/room", payload);

      const { paymentUrl } = response.data;
      if (paymentUrl) {
        window.location.href = paymentUrl; // Redirect to payment gateway
      } else {
        alert("Payment URL not found.");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("An error occurred while creating the order.");
    }
  };
  useEffect(() => {
    if (id) {
      fetchRoomDetails();
    }
  }, [id]);

  const calculateTotal = () => {
    if (!roomDetails || !dates) return 0;
    const nights = dates[1].diff(dates[0], "days");
    const roomPrice = roomDetails.price * nights;
    const guestCharge = value * 500;
    const serviceFee = 500;
    return roomPrice + guestCharge + serviceFee;
  };

  return (
    <>
      <div className="p-10 lg:px-32 lg:flex lg:gap-20">
        <main>
          <div className="flex flex-col gap-10 border-b pb-10 border-[#DEE2E6]">
            <h1 className="text-3xl font-semibold">Confirm and pay</h1>
            <h1 className="text-2xl font-semibold">Your trip</h1>

            <div className="flex items-center">
              <label className="pr-2" htmlFor="date">Dates:</label>
              <div className="w-[220px] flex gap-1 items-center cursor-pointer p-2 px-3 border border-primary rounded-md bg-white">
                <RangePicker
                  suffixIcon={null}
                  className="w-full"
                  onChange={(value) => setDates(value as [Dayjs, Dayjs] | null)}
                />
              </div>
            </div>

            <div>
              <p className="mb-2">Guests:</p>
              <button
                onClick={() => {
                  if (value > 1) setValue(value - 1);
                }}
                className="px-5 py-[10px] bg-[#9C59DF] rounded text-white text-xl font-semibold"
                type="button"
              >
                -
              </button>
              <input
                className="border rounded h-11 mx-2 w-[200px] p-3 border-[#9C59DF]"
                type="number"
                min={1}
                value={value}
                readOnly
              />
              <button
                onClick={() => setValue(value + 1)}
                className="px-5 py-[10px] rounded bg-[#9C59DF] text-white text-xl font-semibold"
                type="button"
              >
                +
              </button>
            </div>
          </div>

          {/* <div className="pt-10 pb-5 border-b border-[#DEE2E6]">
            <div className="flex flex-col gap-9">
              <h1 className="text-2xl font-semibold">You will pay after host approval</h1>
              <textarea
                className="border h-56 rounded-md border-[#DEE2E6] px-8 py-4 text-lg"
                placeholder="Type message to Host."
              />
            </div>

            {/* Cancellation Policy */}
          {/* <div className="mt-10 flex flex-col gap-8 border border-[#DEE2E6] rounded-md p-8">
              <h1 className="text-2xl font-semibold">Cancellation policy</h1>
              <p>This reservation is refundable before May 28, 2022</p>
              <p>Our Extenuating Circumstances policy does not cover travel disruptions caused by COVID-19.</p>
            </div>
          </div> */}

          <div className="py-5">
            <p className="text-sm">
              By selecting the button below, I agree to the Host's House Rules, Dmt's Rebooking and Refund Policy,
              and that Dmt can charge my payment method if I'm responsible for damage.
            </p>
            {/* <button className="p-5 bg-[#9C59DF] rounded-md mt-5 text-white font-semibold" type="submit">
              Confirm and pay
            </button> */}
            <button
              onClick={handleConfirmAndPay}
              className="p-5 bg-[#9C59DF] rounded-md mt-5 text-white font-semibold"
              type="button"
            >
              Confirm and pay
            </button>
          </div>
        </main>

        <div className="card-container lg:w-[35%] lg:min-w-[300px] flex flex-col gap-5 h-fit border border-[#DEE2E6] rounded-xl p-5 sticky top-24">
          <div className="border-b-2 border-[#DEE2E6] pb-5">
            <img
              className="object-cover h-36 w-full rounded-xl"
              src={roomDetails?.images?.[0] || "https://via.placeholder.com/300x150"}
              alt={roomDetails?.title}
            />
          </div>

          <div className="border-b-2 border-[#DEE2E6] pb-5 flex flex-col">
            <h1 className="text-2xl font-semibold mb-7">Price details</h1>

            <div className="flex justify-between">
              <span>{roomDetails?.price} x {dates ? dates[1].diff(dates[0], "days") : 0} nights</span>
              <span>NPR {roomDetails ? roomDetails.price * (dates ? dates[1].diff(dates[0], "days") : 0) : 0}</span>
            </div>

            <div className="flex justify-between">
              <span>{value} guest{value > 1 ? "s" : ""} (500 each)</span>
              <span>NPR {value * 500}</span>
            </div>

            <div className="flex justify-between">
              <span>Service fee</span>
              <span>NPR 500</span>
            </div>
          </div>

          <div className="flex items-center justify-between font-semibold">
            <h1>Total</h1>
            <h1>
              NPR{" "}
              {dates
                ? calculateTotal()
                : roomDetails?.price
                  ? roomDetails.price + 500
                  : "—"}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaysForm;
