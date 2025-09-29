import { Link, useLocation } from 'react-router-dom';
import { Loader } from '../../../components';

export default function BoostPlaceTransactionDetails({ data,isLoading }: { data: unknown,isLoading: boolean }) {
  const transactionData = data as Record<string, unknown> | undefined;
  const transaction = transactionData?.placeBoosts;
  const location = useLocation();
  const transactionPayment = location.state?.transactionPayment;
  console.log(transactionPayment, "falkhsdflkas");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transactionArr: any[] = (transaction as unknown) as any[] || [];
  const placeId = transactionArr[0]?.placeId;
  const placeDetails = transactionArr[0]?.place;
  const placeName = placeDetails?.title;
  const fullPlaceName = (placeDetails?.city ? placeDetails.city + " " : "") + (placeDetails?.country || "");

  const paidAt = transactionPayment?.paidAt || transactionPayment?.updatedAt;
  const totalPaidAmount = transactionPayment?.amount;
  const boostDays = Math.ceil(totalPaidAmount / 8);
  const boostPricePerDay = 8;


  if(isLoading){
    return <Loader loading={isLoading}/>
  }

  return (
    <div>
      {/* Transaction Details Start */}
      <div className='flex flex-col gap-4 w-full lg:w-1/2 mb-4'>
        <h1 className='text-2xl font-medium'>Boost Place Transaction Details</h1>
        <div className='shadow rounded-md p-4 w-full flex flex-col gap-2'>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Payment ID:</span>
            <span className='text-dark-blue'>{transactionPayment.id}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Paid At:</span>
            <span className='text-dark-blue'>{paidAt}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Boosting Price Per Day:</span>
            <span className='text-dark-blue'>${boostPricePerDay}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Total Boosting Days:</span>
            <span className='text-dark-blue'>{boostDays}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-dark-blue font-medium'>Total Paid Amount:</span>
            <span className='text-dark-blue'>${totalPaidAmount}</span>
          </div>
        </div>
      </div>
      {/* Place Details Start */}
      <div className='flex flex-col gap-4 mt-9'>
        <h1 className='text-2xl font-medium'>Place Details</h1>
        <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
          <div>
            <p className="text-dark-blue font-medium">Place Name: </p>
            <Link className=" border-b-2 border-dark-blue" to={`/stays/${placeId}`}>{placeName}</Link>
          </div>
          <div>
            <p className="text-dark-blue font-medium">Place Location: </p>
            <p>{fullPlaceName}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 