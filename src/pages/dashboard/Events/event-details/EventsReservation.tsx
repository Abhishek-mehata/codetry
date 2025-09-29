// import { useState ,useEffect} from 'react';
// // import { DatePicker } from 'antd';
// // // import 'antd/dist/antd.css';
// // import dayjs from 'dayjs';
// // import { set } from 'lodash';
// // // import "../../../index.css";
// // import "../../../../index.css"
// // // import locationImg from "../../../../assets/svg/";
// // import { FaLocationDot } from "react-icons/fa6";
// // import { useLocation } from "react-router-dom";

// // const { RangePicker } = DatePicker;

// // const EventsReservation = () => {
// //     const location = useLocation();
// //     const eventDetails = location.state?.event;
// //     console.log(eventDetails, "event details from event reservation page");
// //     const [dates, setDates] = useState([]);
// //     const [dateStrings, setDateStrings] = useState([]); // to store formatted date strings --this is the date datte to be used for bookings in backend

// //     const [guests, setGuests] = useState(1); // to store number of guests

// //     const [eventPrice, setEventPrice] = useState(500)

// //     const handleChange = (values, dateStrings) => {
// //         setDates(values);
// //         setDateStrings(dateStrings);
// //         // alert(`Selected Dates: ${dateStrings}`);
// //         console.log('Selected Dates:', dateStrings);
// //     };
// //     return (
// //         <>
// //             {/* <main className="w-full bg-red-50 p-[15px] mx-auto gap-3 flex justify-center l flex-wrap h-auto text-[#2b2b2b] font-light text-[1.6rem] leading-[1.667] font-[Poppins]"> */}
// //             <main className="w-full  p-[15px] mx-auto my-auto flex flex-wrap gap-3 lg:justify-center  flex-col items-center lg:items-start lg:flex-row h-auto text-[#2b2b2b] font-light text-[1.6rem] leading-[1.667] font-[Poppins]">
// //                 {/* Right section */}
// //                 <section className='w-[90%] lg:w-[57%] h-[100%] px-[10px] '>
// //                     {/* Trip Dates and nuber of guests section */}
// //                     <div>
// //                         <h3 className='text-[#172b4d] text-[28px] font-medium tracking-[-.25px] leading-[37px]'>Your Trip</h3>
// //                         {/* Dates selection part */}
// //                         <div className="trip-date">
// //                             <h4 className='text-[#172b4d] text-[18px] font-medium tracking-[-.30px]'>Dates</h4>
// //                             <div>
// //                                 <RangePicker
// //                                     onChange={handleChange}
// //                                     format="YYYY-MM-DD"
// //                                     allowClear
// //                                 />

// //                                 {/* <DatePicker.RangePicker
// //                                     onChange={handleChange}
// //                                     format="YYYY-MM-DD"
// //                                     allowClear
// //                                 /> */}
// //                             </div>
// //                         </div>

// //                         {/* Number of guests section */}
// //                         <div className=''>
// //                             <h4 className='text-[#172b4d] text-[18px] font-medium tracking-[-.30px] my-1'>Guests</h4>
// //                             {/* Number of guests slider */}
// //                             <div className='flex items-center gap-2'>
// //                                 <button
// //                                     onClick={() => {
// //                                         // setGuests(guests - 1)
// //                                         if (guests >= 2) {
// //                                             setGuests(guests - 1);
// //                                         }
// //                                         else {
// //                                             null
// //                                         }
// //                                     }}
// //                                     className="h-[50px] w-[50px] p-2 bg-[#9C59DF] rounded-full  text-white text-[18px] font-bold "
// //                                     type="button"
// //                                 >-</button>

// //                                 {/* <input typ /> */}
// //                                 <input
// //                                     className="border rounded w-[150px] h-[35px] text-[19px] px-1   border-[#9C59DF]"
// //                                     type="number"
// //                                     min={1}
// //                                     value={guests}
// //                                     onChange={(e) => setGuests(Number(e.target.value))}
// //                                 />


// //                                 <button
// //                                     onClick={() => {
// //                                         setGuests(guests + 1)
// //                                     }}

// //                                     className="h-[50px] w-[50px] p-2 bg-[#9C59DF] rounded-full  text-white text-[18px] font-bold "
// //                                     type="button"
// //                                 >+</button>

// //                             </div>
// //                         </div>
// //                     </div>
// //                     {/* !!!! Trip Dates and nuber of guests section ends */}
// //                     <hr className='my-4 border-0 mt-5 border-t-[1px] border-t-black/10' />

// //                     {/* Payment Section */}
// //                     <div>
// //                         <div>

// //                             <h3 className='text-[#172b4d] text-[21.9px] font-medium tracking-[-0.25px] leading-[37px]'>Pay With</h3>
// //                             <select name="payment-methods" id="paymentMethods"
// //                                 className='w-[100%] h-[50px] p-2 border border-[#c1c7d0] rounded-md text-[16px] font-medium'
// //                             >
// //                                 <option value="bank">Bank</option>
// //                                 <option value="bank">bAnK</option>
// //                                 <option value="bank">BaNk</option>
// //                                 <option value="bank">BANK</option>
// //                             </select>
// //                             <span className='text-[16px] font-[300] leading-[1.667] text-[#2b2b2b]'>You Will be redirected to Paypal.</span>
// //                         </div>

// //                         <div>
// //                             <h3 className="text-[#172b4d] text-[17.5px] font-medium tracking-[-0.25px] leading-[37px]"
// //                             >Biling Address</h3>

// //                             <select name="country" id="billingAddress"
// //                                 className='w-[100%] h-[50px] p-2 border border-[#c1c7d0] rounded-md text-[16px] font-medium'
// //                             >
// //                                 <option value="country">Nepal</option>
// //                                 <option value="country">India</option>
// //                                 <option value="country">Poland</option>
// //                                 <option value="country">Country</option>
// //                                 <option value="country">Country</option>
// //                                 <option value="country">Country</option>
// //                                 <option value="country">Country</option>
// //                                 <option value="country">Country</option>
// //                                 <option value="country">Country</option>
// //                             </select>
// //                         </div>
// //                     </div>
// //                     {/* !!!!Payment Section ends */}

// //                     {/* Message to host section */}
// //                     <div className='mt-5'>
// //                         <h3 className="text-[#172b4d] text-[17.5px] font-medium tracking-[-0.25px] leading-[37px]"
// //                         >Message to Host</h3>
// //                         <textarea
// //                             className='w-[100%] h-[200px] p-2 border border-[#c1c7d0] rounded-md text-[16px] font-medium'
// //                             placeholder='Type message to host'
// //                         ></textarea>
// //                     </div>
// //                     {/* !!! message to host section ends here */}

// //                     <hr className='my-4 border-0 mt-5 border-t-[1px] border-t-black/10' />

// //                     {/* Cancellation policy section */}
// //                     <div>
// //                         <h3 className="text-[#172b4d] text-[17.5px] font-medium tracking-[-0.25px] leading-[37px]"
// //                         > Cancellation Policy</h3>
// //                         <div>
// //                             <p className='text-[16px] leading-[1.5] font-normal mb-[10px]'>This reservation is refundable before May 28, 2022</p>

// //                             <p className='text-[16px] leading-[1.5] font-normal mb-[10px]'>Our Extenuating Circumstances policy does not cover travel disruptions caused by COVID-19.</p>
// //                         </div>
// //                     </div>
// //                     {/* !!! Cancellation policy section ends here */}

// //                     <hr className='my-4 border-0 mt-5 border-t-[1px] border-t-black/10' />

// //                     {/* Confirm and pay section */}
// //                     <div>
// //                         {/* Event payment terms */}
// //                         <p className='py-[8px] text-[12px] font-normal leading-[1.5]'>

// //                             By selecting the button below, I agree to the Host's House Rules, DmtTourism's Rebooking and
// //                             Refund Policy, and that DmtTourism can charge my payment method if I'm responsible for damage.

// //                         </p>

// //                         <button
// //                             className='w-[100%] h-[50px] bg-[#9C59DF] text-white text-[18px] font-bold rounded-md'
// //                             type='submit'
// //                         >Confirm and Pay</button>
// //                     </div>
// //                 </section>
// //                 {/* !!! Right Section ends */}

// //                 {/* Left Section */}
// //                 <section className='w-[80%]  lg:w-[350px] h-fit  lg:sticky top-24' >
// //                     {/* <section className='min-w-[300px] w-[80%] lg:w-[300px] h-fit bg-yellow-300 sticky top-24' > */}
// //                     <div className='mt-[10px] mb-[10px] relative flex flex-col min-w-0 break-words bg-white bg-clip-border border border-black/20 rounded-md'>
// //                         <div className="card-image">
// //                             <a href="http://localhost:5173/events/cm946iv9d0001laj7if22qoxn" target='_blank'>
// //                                 <img
// //                                     className='w-[100%] h-[300px] lg:h-[auto] object-cover rounded-md p-[5px] align-middle'
// //                                     src="https://dmttourism.com/storage/css/thumbnail_images/HgMWY2L5BQpuWS5WTF4JHRWDBUSRotLWC5nJEb2o.jpg"
// //                                     alt="" />
// //                             </a>
// //                         </div>

// //                         <div className="card-body p-4">
// //                             <a href="http://localhost:5173/events/cm946iv9d0001laj7if22qoxn" target='_blank'>
// //                                 <p className='font-bold text-[16px] hover:text-[#9c59df]'>Online Event</p>
// //                             </a>

// //                             <p className='flex items-center justify-start gap-1 text-[#172b4d] text-[14px] font-medium mt-[5px]'>
// //                                 <FaLocationDot className=' text-[16px] text-[#9c59df]' />
// //                                 <span className=''> Live on Daily Platform</span>
// //                             </p>

// //                             <p className='text-[#172b4d] text-[15px] font-medium mt-[5px]'>
// //                                 Host Name : Love Roy
// //                             </p>

// //                             <div className='rounded-[5px] text-center p-[15px] mt-[15px] border border-solid border-[#dee2e6]'>
// //                                 <p className="text-[16px]">
// //                                     <strong className='text-[#9c59df] font-bold text-cente text-[16px]'>Online &nbsp;</strong>
// //                                     for
// //                                     <strong className='text-[#9c59df] font-bold text-center text-[16px]'>
// //                                         &nbsp; {guests > 1 ? `${guests} Guests` : `${guests} Guest`}
// //                                     </strong>

// //                                 </p>
// //                             </div>

// //                             <div className='rounded-[5px] text-center p-[15px] mt-[15px] border border-solid border-[#dee2e6]'>
// //                                 <p className="text-[16px] flex justify-between">
// //                                     <strong className=' font-bold text-cente text-[16px]'>Total &nbsp;</strong>
// //                                     <strong className=' font-bold text-center text-[16px]'> &nbsp; NPR {guests * eventPrice}</strong>
// //                                 </p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </section>
// //                 {/* !!! Left Section ends */}
// //             </main >
// //         </>
// //     )
// // }

// // export default EventsReservationimport React, { useState, useEffect } from 'react';







// import { DatePicker } from 'antd';
// import dayjs from 'dayjs';
// import { FaLocationDot } from 'react-icons/fa6';
// import { useLocation } from 'react-router-dom';

// const { RangePicker } = DatePicker;

// const EventsReservation = () => {
//   const location = useLocation();
//   const eventDetails = location.state?.event;
//   console.log(eventDetails, 'event details from event reservation page');

//   const [dates, setDates] = useState([]);
//   const [dateStrings, setDateStrings] = useState([]);
//   const [guests, setGuests] = useState(1);
//   const [eventPrice, setEventPrice] = useState(0);

//   useEffect(() => {
//     if (eventDetails?.price) {
//       setEventPrice(eventDetails.price);
//     }
//   }, [eventDetails]);

//   const handleChange = (values, dateStrings) => {
//     setDates(values);
//     setDateStrings(dateStrings);
//     console.log('Selected Dates:', dateStrings);
//   };

//   const eventStartDate = eventDetails?.OnlineEvent?.dateRanges?.[0]?.date
//     ? dayjs(eventDetails.OnlineEvent.dateRanges[0].date)
//     : null;

//   return (
//     <main className="w-full p-[15px] mx-auto my-auto flex flex-wrap gap-3 lg:justify-center flex-col items-center lg:items-start lg:flex-row h-auto text-[#2b2b2b] font-light text-[1.6rem] leading-[1.667] font-[Poppins]">
//       {/* Right Section */}
//       <section className="w-[90%] lg:w-[57%] h-[100%] px-[10px]">
//         <div>
//           <h3 className="text-[#172b4d] text-[28px] font-medium tracking-[-.25px] leading-[37px]">Your Trip</h3>

//           {/* Dates */}
//           <div className="trip-date">
//             <h4 className="text-[#172b4d] text-[18px] font-medium">Dates</h4>
//             <RangePicker
//               onChange={handleChange}
//               format="YYYY-MM-DD"
//               allowClear
//               value={eventStartDate ? [eventStartDate, eventStartDate] : [null, null]}
//             />
//           </div>

//           {/* Guests */}
//           <div className="mt-4">
//             <h4 className="text-[#172b4d] text-[18px] font-medium my-1">Guests</h4>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => guests >= 2 && setGuests(guests - 1)}
//                 className="h-[50px] w-[50px] p-2 bg-[#9C59DF] rounded-full text-white text-[18px] font-bold"
//                 type="button"
//               >
//                 -
//               </button>
//               <input
//                 className="border rounded w-[150px] h-[35px] text-[19px] px-1 border-[#9C59DF]"
//                 type="number"
//                 min={1}
//                 value={guests}
//                 onChange={(e) => setGuests(Number(e.target.value))}
//               />
//               <button
//                 onClick={() => setGuests(guests + 1)}
//                 className="h-[50px] w-[50px] p-2 bg-[#9C59DF] rounded-full text-white text-[18px] font-bold"
//                 type="button"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         </div>

//         <hr className="my-4 border-0 border-t-[1px] border-t-black/10" />

//         {/* Payment */}
//         <div>
//           <h3 className="text-[#172b4d] text-[21.9px] font-medium">Pay With</h3>
//           <select className="w-[100%] h-[50px] p-2 border border-[#c1c7d0] rounded-md text-[16px] font-medium">
//             <option value="bank">Bank</option>
//             <option value="paypal">Paypal</option>
//             <option value="card">Credit Card</option>
//           </select>
//           <span className="text-[16px] font-[300]">You will be redirected to Paypal.</span>
//         </div>

//         {/* Billing Address */}
//         <div className="mt-4">
//           <h3 className="text-[#172b4d] text-[17.5px] font-medium">Billing Address</h3>
//           <select className="w-[100%] h-[50px] p-2 border border-[#c1c7d0] rounded-md text-[16px] font-medium">
//             <option>Nepal</option>
//             <option>India</option>
//             <option>Poland</option>
//           </select>
//         </div>

//         {/* Message to Host */}
//         <div className="mt-5">
//           <h3 className="text-[#172b4d] text-[17.5px] font-medium">Message to Host</h3>
//           <textarea
//             className="w-[100%] h-[200px] p-2 border border-[#c1c7d0] rounded-md text-[16px] font-medium"
//             placeholder="Type message to host"
//           ></textarea>
//         </div>

//         <hr className="my-4 border-0 border-t-[1px] border-t-black/10" />

//         {/* Cancellation Policy */}
//         <div>
//           <h3 className="text-[#172b4d] text-[17.5px] font-medium">Cancellation Policy</h3>
//           <p className="text-[16px] leading-[1.5]">This reservation is refundable before May 28, 2025.</p>
//         </div>

//         <hr className="my-4 border-0 border-t-[1px] border-t-black/10" />

//         {/* Confirm & Pay */}
//         <div>
//           <p className="py-[8px] text-[12px] font-normal">
//             By selecting the button below, you agree to the Host's House Rules, DmtTourism's Rebooking and Refund Policy.
//           </p>
//           <button
//             className="w-[100%] h-[50px] bg-[#9C59DF] text-white text-[18px] font-bold rounded-md"
//             type="submit"
//           >
//             Confirm and Pay
//           </button>
//         </div>
//       </section>

//       {/* Left Section */}
//       <section className="w-[80%] lg:w-[350px] h-fit lg:sticky top-24">
//         <div className="mt-[10px] mb-[10px] relative flex flex-col min-w-0 bg-white border border-black/20 rounded-md">
//           <div className="card-image">
//             <a href={`http://localhost:5173/events/${eventDetails?.id}`} target="_blank">
//               <img
//                 className="w-[100%] h-[300px] object-cover rounded-md p-[5px]"
//                 src={
//                   eventDetails?.imageUrl ||
//                   'https://dmttourism.com/storage/css/thumbnail_images/HgMWY2L5BQpuWS5WTF4JHRWDBUSRotLWC5nJEb2o.jpg'
//                 }
//                 alt={eventDetails?.name}
//               />
//             </a>
//           </div>

//           <div className="card-body p-4">
//             <a href={`http://localhost:5173/events/${eventDetails?.id}`} target="_blank">
//               <p className="font-bold text-[16px] hover:text-[#9c59df]">
//                 {eventDetails?.eventType || 'Event'}
//               </p>
//             </a>

//             <p className="flex items-center gap-1 text-[#172b4d] text-[14px] font-medium mt-[5px]">
//               <FaLocationDot className="text-[16px] text-[#9c59df]" />
//               <span>{eventDetails?.location}</span>
//             </p>

//             {/* <p className="text-[#172b4d] text-[15px] font-medium mt-[5px]">
//               Host Name: Love Roy
//             </p> */}

//             <div className="rounded-[5px] text-center p-[15px] mt-[15px] border border-solid border-[#dee2e6]">
//               <p className="text-[16px]">
//                 <strong className="text-[#9c59df]">Online</strong>
//                 &nbsp; for
//                 <strong className="text-[#9c59df]">
//                   &nbsp;{guests > 1 ? `${guests} Guests` : `${guests} Guest`}
//                 </strong>
//               </p>
//             </div>

//             <div className="rounded-[5px] text-center p-[15px] mt-[15px] border border-solid border-[#dee2e6]">
//               <p className="text-[16px] flex justify-between">
//                 <strong>Total</strong>
//                 <strong>NPR {guests * eventPrice}</strong>
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default EventsReservation;
