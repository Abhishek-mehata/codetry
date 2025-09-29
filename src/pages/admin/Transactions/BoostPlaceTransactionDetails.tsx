import { formatDate } from "../../../utils/dateTimeHelpers";
import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
function BoostPlaceTransctionDetails(data: any) {
    const transactionData = data?.data;
    const { placeBoosts, paymentId } = transactionData || {};
    const boost = placeBoosts && placeBoosts[0];
    const seller = boost?.user;
    const place = boost?.place;

    return (
        <div>
            {/* Transaction Details Start */}
            <div className='flex flex-col gap-4 w-full lg:w-1/2 mb-4'>
                <h1 className='text-2xl font-medium'>Boost Place Transaction Details</h1>
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
                        <span className='text-dark-blue'>${boost?.charge}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Total Boosting Days:</span>
                        <span className='text-dark-blue'>{boost?.boostDuration} days</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Total Paid Amount:</span>
                        <span className='text-dark-blue'>${boost?.totalAmount}</span>
                    </div>
                </div>
            </div>
            {/* Transaction Details End */}
            {/* Place Details Start */}
            <div className='flex flex-col gap-4 mt-9'>
                <h1 className='text-2xl font-medium'>Place Details</h1>
                <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
                    <div>
                        <p className="text-dark-blue font-medium">Place Name: </p>
                        <Link className=" border-b-2 border-dark-blue" to={`/stays/${place?.id}`}>
                            {place?.title}
                        </Link>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Place Location: </p>
                        <p>{place?.city}, {place?.country}</p>
                    </div>
                </div>
            </div>
            {/* Place Details End */}
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

export default BoostPlaceTransctionDetails;
