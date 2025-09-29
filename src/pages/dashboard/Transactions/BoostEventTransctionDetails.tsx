import { Loader } from '../../../components';
import { formatDate } from '../../../utils/dateTimeHelpers';
import { Link, useLocation } from 'react-router-dom';

export default function BoostEventTransctionDetails({ data,isLoading}: { data: unknown,isLoading: boolean }) {

  const location = useLocation();
  const transactionPayment = location.state?.transactionPayment;

  console.log(transactionPayment, "fafasf")

  const transactionData = data as Record<string, unknown> | undefined;
  const transaction = transactionData?.eventBoosts;
  // @ts-expect-error Property 'Event' may not exist on type '{}' due to dynamic backend data
  const eventDetails = transaction && transaction[0]?.Event;
  const eventName = eventDetails?.name;
  const eventLocation = eventDetails?.location;
  console.log(transaction,"fasdfsss")

  // Use transactionPayment for transaction-level fields
  const paymentId = transactionPayment?.id;
  const totalBoostAmount = typeof transactionPayment?.amount === 'number' ? transactionPayment.amount : Number(transactionPayment?.amount) || 0;
  const receivedAmount = transactionPayment?.totalAmount;
  const boostDays = Math.ceil(totalBoostAmount / 8);
  const paidAt = transactionPayment?.paidAt ? String(transactionPayment.paidAt) : undefined;
  const updatedAt = transactionPayment?.updatedAt ? String(transactionPayment.updatedAt) : undefined;

  if(isLoading){
    return <Loader loading={isLoading} />
  }

  return (
    <div>
      {/* Transaction Details Start */}
      <div className='flex flex-col gap-4 w-full lg:w-1/2 mb-4'>
        <h1 className='text-2xl font-medium'>Boost Event Transaction Details</h1>
        <div className='shadow rounded-md p-4 w-full flex flex-col gap-2'>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Payment ID:</span>
            <span className='text-dark-blue'>{String(paymentId ?? 'N/A')}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Paid At:</span>
            <span className='text-dark-blue'>{paidAt ? formatDate(paidAt) : (updatedAt ? formatDate(updatedAt) : 'N/A')}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Boosting Price Per Day:</span>
            <span className='text-dark-blue'>${8}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Total Days:</span>
            <span className='text-dark-blue'>{boostDays} days</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Admin Received Amount:</span>
            <span className='text-dark-blue'>${receivedAmount}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Total Paid Amount:</span>
            <span className='text-dark-blue'>${8 * boostDays}</span>
          </div>
        </div>
      </div>
      {/* Event Details Start */}
      <div className='flex flex-col gap-4 mt-9'>
        <h1 className='text-2xl font-medium'>Event Details</h1>
        <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
          <div>
            <p className="text-dark-blue font-medium">Event Name: </p>
            <Link className=" border-b-2 border-dark-blue" to={`/events/${eventDetails?.id}`}>{eventName}</Link>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Event Location: </p>
            <p>{eventLocation}</p>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Event Boost Days: </p>
            <p>{boostDays}</p>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Total Boost Amount: </p>
            <p>{totalBoostAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 