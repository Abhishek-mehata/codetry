import { Loader } from '../../../components';
import { getCurrencySymbol } from '../../../utils/currencySymbols';
import { formatDate } from '../../../utils/dateTimeHelpers';
import { Link, useLocation } from 'react-router-dom';

export default function EventTransactionDetails({ data, isLoading }: { data: unknown, isLoading: boolean }) {
    const transactionData = data as Record<string, unknown> | undefined;
    const transaction = transactionData?.eventOrders;
    console.log(transaction, "falsdkleimcjf");
    
    // Transaction Details Start

    const location = useLocation();
    const transactionPayment = location.state?.transactionPayment;
    console.log(transactionPayment, "Transaction Payment");
    // Transaction Details End

    // Use transactionPayment for transaction details
    const amount = typeof transactionPayment?.amount === 'number' ? transactionPayment.amount : Number(transactionPayment?.amount) || 0;
    const nextPaymentAmount = typeof transactionPayment?.nextPaymentAmount === 'number' ? transactionPayment.nextPaymentAmount : Number(transactionPayment?.nextPaymentAmount) || 0;
    const totalAmount = transactionPayment?.amount + transactionPayment?.nextPaymentAmount;
    const platformCharge = typeof transactionPayment?.platformCharge === 'number' ? transactionPayment.platformCharge : Number(transactionPayment?.platformCharge) || 0;
    const adminCommission = typeof transactionPayment?.adminCommission === 'number' ? transactionPayment.adminCommission : Number(transactionPayment?.adminCommission) || 0;
    const paidAt = transactionPayment?.paidAt ? String(transactionPayment.paidAt) : undefined;
    const updatedAt = transactionPayment?.updatedAt ? String(transactionPayment.updatedAt) : undefined;

    // Buyer Details Start
    // @ts-expect-error Property 'Buyer' may not exist on type '{}' due to dynamic backend data
    const buyerDetails = transaction && transaction[0]?.Buyer;
    const buyerFullName = buyerDetails?.firstName + " " + buyerDetails?.lastName;
    const buyerEmail = buyerDetails?.email;
    const buyerPhoneNumber = buyerDetails?.phoneNumber;
    // Buyer Details End


    // Event Details Start
    // @ts-expect-error Property 'Event' may not exist on type '{}' due to dynamic backend data

    const eventDetails = transaction && transaction[0]?.Event;
    const eventName = eventDetails?.name;
    const eventType = eventDetails?.eventType;
    const eventLocation = eventDetails?.location;
    const eventStatus = eventDetails?.status;
    // @ts-expect-error Property 'dateRanges' may not exist on type '{}' due to dynamic backend data

    const eventDates = transaction && transaction[0]?.dateRanges;
    // @ts-expect-error Property 'numberOfGuests' may not exist on type '{}' due to dynamic backend data
    const eventNumberOfGuests = transaction && transaction[0]?.numberOfGuests
    // Event Details End

    const currency = eventDetails?.currency ? String(eventDetails.currency) : 'usd';

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
            {/* Event Details Start */}
            <h1 className='text-2xl font-medium'>Event Details</h1>
            <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
                <div>
                    <p className="text-dark-blue font-medium">Event Name: </p>
                    <Link className=" border-b-2 border-dark-blue" to={`/events/${eventDetails?.id}`}>{eventName}</Link>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Event status: </p>
                    <p>{eventStatus}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Event Location: </p>
                    <p>{eventLocation}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Event Type: </p>
                    <p>{eventType}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Event Dates: </p>
                    {eventDates?.map((date: Record<string, unknown>, idx: number) => (
                        <p key={idx}>{formatDate(date.date as string)}, {date.startTime as string} to {date.endTime as string}</p>
                    ))}
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Number of Guests: </p>
                    <p>{eventNumberOfGuests}</p>
                </div>
            </div>
            {/* Buyer Details Start */}
            <h1 className='text-2xl font-medium mt-9'>Buyer Details</h1>
            <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
                <div>
                    <p className="text-dark-blue font-medium">Buyer Name: </p>
                    <p>
                        {buyerFullName}
                    </p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Buyer Email: </p>
                    <p>{buyerEmail}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Buyer Number: </p>
                    <p>{buyerPhoneNumber}</p>
                </div>
            </div>
        </div>
    );
} 