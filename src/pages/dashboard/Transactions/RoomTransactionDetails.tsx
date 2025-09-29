/* eslint-disable @typescript-eslint/no-explicit-any */


import { Collapse } from 'antd';
import { getCurrencySymbol } from '../../../utils/currencySymbols';
import { formatDate } from '../../../utils/dateTimeHelpers';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Loader } from '../../../components';




export default function RoomTransactionDetails({ data: transactionData, isLoading }: { data: any, isLoading: boolean }) {

  const currency = 'usd';
  const location = useLocation();
  const transactionPayment = location.state?.transactionPayment;
  const transaction = transactionData?.roomOrders;

  // Use transactionPayment for transaction details
  const amount = typeof transactionPayment?.amount === 'number' ? transactionPayment.amount : Number(transactionPayment?.amount) || 0;
  const nextPaymentAmount = typeof transactionPayment?.nextPaymentAmount === 'number' ? transactionPayment.nextPaymentAmount : Number(transactionPayment?.nextPaymentAmount) || 0;
  const totalAmount = amount + nextPaymentAmount;
  const platformCharge = typeof transactionPayment?.platformCharge === 'number' ? transactionPayment.platformCharge : Number(transactionPayment?.platformCharge) || 0;
  const adminCommission = typeof transactionPayment?.adminCommission === 'number' ? transactionPayment.adminCommission : Number(transactionPayment?.adminCommission) || 0;
  const paidAt = transactionPayment?.paidAt ? String(transactionPayment.paidAt) : undefined;
  const updatedAt = transactionPayment?.updatedAt ? String(transactionPayment.updatedAt) : undefined;
  // Transactions Details End 

  // Place Details Start
  const placeDetails = transaction && transaction[0]?.Room?.place;
  const placeName = transaction && placeDetails?.title;
  const placeCity = placeDetails?.city;
  const placeCountry = placeDetails?.country;
  const totalRooms = transaction?.length;
  // Place Details End

  // Buyer Details Start
  const buyerDetails = transaction && transaction[0]?.Buyer;
  const buyerFullName = buyerDetails?.firstName + " " + buyerDetails?.lastName;
  const buyerEmail = buyerDetails?.email;
  const buyerPhoneNumber = buyerDetails?.phoneNumber;
  // Buyer Details End


  // Accordion for rooms

  const roomAccordionItems = transaction?.length > 0 && transaction?.map((order: any, idx: number) => {
    const room = (order.Room as Record<string, unknown>) || {};
    return {
      key: idx.toString(),
      label: `${room.title || 'Room'} - ${getCurrencySymbol(currency)} ${typeof room.price === 'number' ? room.price : room.price ? Number(room.price) : 'N/A'}`,
      children: (
        <div className="space-y-3">
          <div>
            <p className="text-dark-blue font-medium">Room Name: </p>
            <p>{String(room.title ?? 'N/A')}</p>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Room Type: </p>
            <p>{String(room.room_type ?? 'N/A')}</p>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Price: </p>
            <p>{getCurrencySymbol(currency)} {typeof room.price === 'number' ? room.price : room.price ? Number(room.price) : 'N/A'}</p>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Number of Guests: </p>
            <p>{typeof order.noOfGuests === 'number' ? order.noOfGuests : order.noOfGuests ? Number(order.noOfGuests) : 'N/A'}</p>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Check-in Date: </p>
            <p>{order.startDate ? formatDate(String(order.startDate)) : 'N/A'}</p>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Check-out Date: </p>
            <p>{order.endDate ? formatDate(String(order.endDate)) : 'N/A'}</p>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Booking Status: </p>
            <p>{String(order.bookingStatus ?? 'N/A')}</p>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Transfer Service: </p>
            <p>{String(room.transferService ?? 'N/A')}</p>
          </div>
        </div>
      ),
    };
  });

  if(isLoading){
    return <Loader loading={isLoading}/>
  }

  return (
    <div>
      {/* Transaction Details Start */}
      <div className='flex flex-col gap-4 w-full lg:w-1/2 mb-4'>
        <h1 className='text-2xl font-medium'>Transaction Details</h1>
        <div className='shadow rounded-md p-4 w-full flex flex-col gap-2'>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Total Amount:</span>
            <span className='text-dark-blue'>
              {getCurrencySymbol(currency)} {totalAmount}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Buyer Paid: ({platformCharge}%)</span>
            <span className='text-dark-blue'>
              {getCurrencySymbol(currency)} {amount}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Payment Due ({100 - platformCharge}%):</span>
            <span className='text-dark-blue'>
              {getCurrencySymbol(currency)} {nextPaymentAmount}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>PlatForm Service Charge ({adminCommission}%):</span>
            <span className='text-dark-blue'>
              {getCurrencySymbol(currency)} {((totalAmount * adminCommission) / 100).toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>My Payout ({platformCharge - adminCommission}%):</span>
            <span className='text-dark-blue'>
              {getCurrencySymbol(currency)} {(((platformCharge - adminCommission) / 100) * totalAmount).toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Paid At:</span>
            <span className='text-dark-blue'>
              {paidAt ? formatDate(paidAt) : (updatedAt ? formatDate(updatedAt) : 'N/A')}
            </span>
          </div>
        </div>
      </div>
      {/* Place Details Start */}
      <h1 className='text-2xl font-medium'>Place Details</h1>
      <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
        <div>
          <p className="text-dark-blue font-medium">Place Name: </p>
          <Link className='border-b border-dark-blue' to={`/stays/${placeDetails?.id}`}>{String(placeName)}</Link>
        </div>
        <div>
          <p className="text-dark-blue font-medium">Location: </p>
          <p>{String(placeCity ?? 'N/A')}, {String(placeCountry ?? 'N/A')}</p>
        </div>
        <div>
          <p className="text-dark-blue font-medium">Total Rooms Booked: </p>
          <p>{totalRooms}</p>
        </div>
      </div>
      {/* Room Details Start */}
      <div className='flex flex-col gap-4 mt-9'>
        <h1 className='text-2xl font-medium'>Room Details</h1>
        <div className='shadow rounded-md p-4 w-full'>
          <Collapse items={roomAccordionItems} defaultActiveKey={['0']} expandIconPosition="end" />
        </div>
      </div>
      {/* Buyer Details Start */}
      <h1 className='text-2xl font-medium mt-9'>Buyer Details</h1>
      <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
        <div>
          <p className="text-dark-blue font-medium">Buyer Name: </p>
          <p>{buyerFullName || "N/A"}</p>
        </div>
        <div>
          <p className="text-dark-blue font-medium">Buyer Email: </p>
          <p>{buyerEmail || "N/A"}</p>
        </div>
        <div>
          <p className="text-dark-blue font-medium">Buyer Number: </p>
          <p>{buyerPhoneNumber || "N/A"}</p>
        </div>
      </div>
    </div>
  );
} 