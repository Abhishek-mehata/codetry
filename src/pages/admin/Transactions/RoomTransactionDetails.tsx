import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCurrencySymbol } from "../../../utils/currencySymbols";
import { formatDate } from "../../../utils/dateTimeHelpers";
import { Link } from "react-router-dom";
import { Collapse } from "antd";

interface PyamentData {
    amount?: number;
    nextPaymentAmount?: number;
    paidAt?: string;
    updatedAt?: string;
    platformCharge?: number;
    adminCommission?: number;
    totalAmount?: number;
}

// ###############################################################
// ##################### Main Component Starts##########################
// ###############################################################

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function RoomTransactionDetails(data: any) {
    const [paymentData, setPaymentData] = useState<PyamentData>();
    const transactionData = data?.data;
    
    const { roomOrders } = transactionData || {};

    // Get context from URL parameters
    const location = useLocation();

    // Data for Room Start
    const roomDetails = transactionData && roomOrders[0]?.Room;
    const placeDetails = roomDetails?.place;
    const sellerDetails = transactionData && roomOrders[0]?.seller;
    // Data for Room End
    
    // Removed: const { data: paymentPrices } = useGetPaymentSettingsQuery();
    // Removed: currentPaymentSetting, platformCharge, adminCommission
    // Data for Buyers Start
    const buyerDetails = transactionData && roomOrders[0]?.Buyer;
    // Data for Buyers End

    // Data Being Used In this File
    const currency = "usd"; // Default currency for rooms
    const buyerPaid = paymentData && paymentData?.amount;
    const paymentDue = paymentData && paymentData?.nextPaymentAmount;
    const paidAt = paymentData && paymentData?.paidAt;
    const updatedAt = paymentData && paymentData?.updatedAt;
    // Use platformCharge and adminCommission from paymentData
    const platformCharge = paymentData?.platformCharge || 0;
    const adminCommission = paymentData?.adminCommission || 0;
    // Calculate total as amount + nextPaymentAmount (for consistency with table)
    const totalAmount = (buyerPaid ?? 0) + (paymentDue ?? 0);
    // Data Being Used In this File Ends

    // Calculate total amount from all rooms
    // (No longer used for display)
    // const totalAmount = paymentData?.totalAmount || (roomOrders?.reduce((sum: number, order: any) => sum + (order.Room?.price || 0), 0) || 0);

    // Log transaction data from state
    useEffect(() => {
        if (location.state && location.state.transaction) {
            setPaymentData(location.state.transaction);
        }
    }, [location.state]);
    console.log(paymentData,"transactionDatafff");


    // Create accordion items for rooms
    const roomAccordionItems = roomOrders?.map((order: any, index: number) => ({
        key: index.toString(),
        label: `${order.Room?.title} - ${getCurrencySymbol(currency)} ${order.Room?.price}`,
        children: (
            <div className="space-y-3">
                <div>
                    <p className="text-dark-blue font-medium">Room Name: </p>
                    <p>{order.Room?.title}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Room Type: </p>
                    <p>{order.Room?.room_type}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Price: </p>
                    <p>{getCurrencySymbol(currency)} {order.Room?.price}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Number of Guests: </p>
                    <p>{order.noOfGuests}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Check-in Date: </p>
                    <p>{formatDate(order.startDate)}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Check-out Date: </p>
                    <p>{formatDate(order.endDate)}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Booking Status: </p>
                    <p>{order.bookingStatus}</p>
                </div>
                <div>
                    <p className="text-dark-blue font-medium">Transfer Service: </p>
                    <p>{order.Room?.transferService}</p>
                </div>
            </div>
        ),
    })) || [];

    return (
        <div>
            {/* Transaction Details Start */}
            <div className='flex flex-col gap-4 w-full lg:w-1/2 mb-4'>
                <h1 className='text-2xl font-medium'>Transaction Details</h1>
                {/* Card Start */}
                <div className='shadow rounded-md p-4 w-full flex flex-col gap-2'>
                    {/*  */}
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Total Amount:</span>
                        <span className='text-dark-blue'>
                            {getCurrencySymbol(currency)} {totalAmount}
                        </span>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Buyer Paid: ({platformCharge}%)</span>
                        <span className='text-dark-blue'>
                            {getCurrencySymbol(currency)} {buyerPaid}
                        </span>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Payment Due ({(100 - platformCharge)}%):</span>
                        <span className='text-dark-blue'>
                            {getCurrencySymbol(currency)} {paymentDue}
                        </span>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>PlatForm Service Charge ({adminCommission}%):</span>
                        <span className='text-dark-blue'>
                            {getCurrencySymbol(currency)} {((totalAmount * adminCommission) / 100).toFixed(2)}
                        </span>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Seller Payout ({(platformCharge - adminCommission)}%):</span>
                        <span className='text-dark-blue'>
                            {getCurrencySymbol(currency)} {(((platformCharge - adminCommission) / 100) * totalAmount).toFixed(2)}
                        </span>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Paid At:</span>
                        <span className='text-dark-blue'>
                            {formatDate((paidAt ? paidAt.toLocaleString() : updatedAt))}
                        </span>
                    </div>
                    {/*  */}
                </div>
                {/* Card End */}
            </div>
            {/* Transaction Details End */}
            {/* Place Details Start */}
            <div className='flex flex-col gap-4 mt-9'>
                <h1 className='text-2xl font-medium'>Place Details</h1>
                {/* Card Start */}
                <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
                    <div>
                        <p className="text-dark-blue font-medium">Place Name: </p>
                        <Link className=" border-b-2 border-dark-blue" to={`/stays/${placeDetails?.id}`}>
                            {placeDetails?.title}
                        </Link>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Location: </p>
                        <p>
                            {placeDetails?.city}, {placeDetails?.country}
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Total Rooms Booked: </p>
                        <p>
                            {roomOrders?.length || 0}
                        </p>
                    </div>
                </div>
                {/* Card End */}
            </div>
            {/* Place Details End */}
            {/* Room Details Start */}
            <div className='flex flex-col gap-4 mt-9'>
                <h1 className='text-2xl font-medium'>Room Details</h1>
                {/* Card Start */}
                <div className='shadow rounded-md p-4 w-full'>
                    <Collapse 
                        items={roomAccordionItems}
                        defaultActiveKey={['0']}
                        expandIconPosition="end"
                    />
                </div>
                {/* Card End */}
            </div>
            {/* Room Details End */}
            {/* Host Details Start */}
            <div className='flex flex-col gap-4 mt-9'>
                <h1 className='text-2xl font-medium'>Host Details</h1>
                {/* Card Start */}
                <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
                    <div>
                        <p className="text-dark-blue font-medium">Host Name: </p>
                        <p>
                            {sellerDetails?.firstName} {sellerDetails?.lastName}
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Host Email: </p>
                        <p>
                            {sellerDetails?.email}
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Host Number: </p>
                        <p>
                            {sellerDetails?.phoneNumber}
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Host Payout Status: </p>
                        <p>
                            Payout Not Received
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Buyer Checkin Status: </p>
                        <p>
                            Not Checked In
                        </p>
                    </div>
                </div>
                {/* Card End */}
            </div>
            {/* Host Details End */}
            {/* Buyer Details Start */}
            <div className='flex flex-col gap-4 mt-9'>
                <h1 className='text-2xl font-medium'>Buyer Details</h1>
                {/* Card Start */}
                <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
                    <div>
                        <p className="text-dark-blue font-medium">Buyer Name: </p>
                        <p className="">
                            {buyerDetails?.firstName} {buyerDetails?.lastName}
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Buyer Email: </p>
                        <p>
                            {buyerDetails?.email}
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Buyer Number: </p>
                        <p>
                            {buyerDetails?.phoneNumber}
                        </p>
                    </div>
                </div>
                {/* Card End */}
            </div>
            {/* Buyer Details End */}
        </div>
    )
}

// ###############################################################
// ##################### Main Component Ends##########################
// ###############################################################