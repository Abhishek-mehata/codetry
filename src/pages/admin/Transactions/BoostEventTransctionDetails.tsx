import { formatDate } from "../../../utils/dateTimeHelpers";
import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
function BoostEventTransctionDetails(data: any) {
    const transactionData = data?.data;
    const { eventBoosts, paymentId ,paymentDetails} = transactionData || {};
    const boost = eventBoosts && eventBoosts[0];
    const seller = boost?.Seller;
    const event = boost?.Event;
    const totalAmount =  paymentDetails?.totalAmount;
    const totalDays = totalAmount / 8;
    return (
        <div>
            {/* Transaction Details Start */}
            <div className='flex flex-col gap-4 w-full lg:w-1/2 mb-4'>
                <h1 className='text-2xl font-medium'>Boost Event Transaction Details</h1>
                <div className='shadow rounded-md p-4 w-full flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Payment ID:</span>
                        <span className='text-dark-blue'>{paymentId}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Paid At:</span>
                        <span className='text-dark-blue'>{formatDate(boost?.updatedAt)}</span>
                    </div>
                    {/* <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Is Approved:</span>
                        <span className='text-dark-blue'>{boost?.isApproved === null ? 'Pending' : boost?.isApproved ? 'Yes' : 'No'}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Is Refunded:</span>
                        <span className='text-dark-blue'>{boost?.isRefunded === null ? 'Pending' : boost?.isRefunded ? 'Yes' : 'No'}</span>
                    </div> */}
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Boosting Price Per Day:</span>
                        <span className='text-dark-blue'>${8}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Total Days:</span>
                        <span className='text-dark-blue'>{Math.ceil(totalDays)} days</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Received Amount:</span>
                        <span className='text-dark-blue'>${totalAmount}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Total Amount:</span>
                        <span className='text-dark-blue'>${8 * Math.ceil(totalDays)}</span>
                    </div>
                </div>
            </div>
            {/* Transaction Details End */}
            {/* Event Details Start */}
            <div className='flex flex-col gap-4 mt-9'>
                <h1 className='text-2xl font-medium'>Event Details</h1>
                <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
                    <div>
                        <p className="text-dark-blue font-medium">Event Name: </p>
                        <Link className=" border-b-2 border-dark-blue" to={`/events/${event?.id}`}>
                            {event?.name}
                        </Link>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Event Location: </p>
                        <p>{event?.location}</p>
                    </div>
                </div>
            </div>
            {/* Event Details End */}
            {/* Seller Details Start */}
            <div className='flex flex-col gap-4 mt-9'>
                <h1 className='text-2xl font-medium'>Seller Details</h1>
                <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
                    <div>
                        <p className="text-dark-blue font-medium">Seller Name: </p>
                        <p>{seller?.firstName} {seller?.lastName}</p>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Seller Email: </p>
                        <p>{seller?.email}</p>
                    </div>
                </div>
            </div>
            {/* Seller Details End */}
        </div>
    );
}

export default BoostEventTransctionDetails;