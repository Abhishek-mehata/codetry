import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCurrencySymbol } from "../../../utils/currencySymbols";
import { formatDate } from "../../../utils/dateTimeHelpers";
import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../../../redux/features/usersApi";
import {useGetPaymentSettingsQuery } from "../../../redux/features/paymentSettingsApi";

interface PyamentData {
    amount?: number;
    nextPaymentAmount?: number;
    paidAt?: string;
    updatedAt?: string;
}

interface PaymentSetting {
    id: number;
    platformCharge: number;
    platformCurrency: string;
    platformCountryCode: string;
    domesticTransactionFee: number;
    internationalTransactionFee: number;
    payoutDomesticFee: number;
    payoutInternationalFee: number;
    currencyFixRate: number;
    adminCommission: number;
    paymentSettingType: string;
    createdAt: string;
    updatedAt: string;
}

// ###############################################################
// ##################### Main Component Starts##########################
// ###############################################################

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function EventTransactionDetails(data: any) {
    const [paymentData, setPaymentData] = useState<PyamentData>();
    const transactionData = data?.data;
    const { eventOrders } = transactionData || {};

    // Get context from URL parameters
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const context = searchParams.get('context');

    // Data for Event Start
    const eventDetails = transactionData && eventOrders[0]?.Event;
    // Data for Event End
    const { data: userData } = useGetUserByIdQuery(eventDetails?.sellerId);
    const sellerDetails = userData?.data;
    const {data: paymentPrices} = useGetPaymentSettingsQuery();
    
    // Filter payment settings based on context/event type
    const getPaymentSettingByContext = (): PaymentSetting | null => {
        if (!paymentPrices) return null;
        
        const settings = paymentPrices as PaymentSetting[];
        
        // Map context to payment setting type
        if (context === 'customer_buy_event_onsite') {
            return settings.find(setting => setting.paymentSettingType === 'onsite_event') || null;
        } else if (context === 'customer_buy_event_online') {
            return settings.find(setting => setting.paymentSettingType === 'online_event') || null;
        } else if (context === 'customer_book_room') {
            return settings.find(setting => setting.paymentSettingType === 'room') || null;
        }
        
        // Default fallback
        return settings[0] || null;
    };

    const currentPaymentSetting = getPaymentSettingByContext();
    const platformCharge = currentPaymentSetting?.platformCharge || 0;
    const adminCommission = currentPaymentSetting?.adminCommission || 0;
    // Data for Buyers Start
    const buyerDetails = transactionData && eventOrders[0]?.Buyer;
    // Data for Buyers End

    // Data Being Used In this  File
    const eventId = transactionData && eventOrders[0]?.eventId;
    const actualPrice = transactionData && eventOrders[0]?.Event?.actualPrice || 0;
    const currency = transactionData && eventOrders[0]?.Event?.currency || "usd";
    const buyerPaid = paymentData?.amount ?? 0;
    const paymentDue = paymentData?.nextPaymentAmount ?? 0;
    const totalAmount = buyerPaid + paymentDue;
    const paidAt = paymentData && paymentData?.paidAt;
    const updatedAt = paymentData && paymentData?.updatedAt;
    const dateRanges = transactionData && eventOrders[0]?.dateRanges;
    const numberOfGuests = transactionData && eventOrders[0]?.numberOfGuests;
    // Data Being Used In this  File Ends

    // Log transaction data from state
    useEffect(() => {
        if (location.state && location.state.transaction) {
            setPaymentData(location.state.transaction);
        }
    }, [location.state]);
    console.log(paymentData,"transactionDatafff");


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
                        <span className='text-dark-blue font-medium'>PlatForm Charge ({adminCommission}%):</span>
                        <span className='text-dark-blue'>
                            {getCurrencySymbol(currency)} {((actualPrice * adminCommission) / 100).toFixed(2)}
                        </span>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className='flex justify-between'>
                        <span className='text-dark-blue font-medium'>Seller Payout ({(platformCharge - adminCommission)}%):</span>
                        <span className='text-dark-blue'>
                        {getCurrencySymbol(currency)} {(((platformCharge - adminCommission) / 100) * actualPrice).toFixed(2)}
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
            {/* Event Details Start */}
            <div className='flex flex-col gap-4 mt-9'>
                <h1 className='text-2xl font-medium'>Event Details</h1>
                {/* Card Start */}
                <div className='shadow rounded-md p-4 w-full flex flex-col gap-4'>
                    <div>
                        <p className="text-dark-blue font-medium">Event Name: </p>
                        <Link className=" border-b-2 border-dark-blue" to={`/events/${eventId}`}>
                            {eventDetails?.name}
                        </Link>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Event status: </p>
                        <p>
                            Pending
                        </p>
                    </div>                    
                    <div>
                        <p className="text-dark-blue font-medium">Event Location: </p>
                        <p>
                            {eventDetails?.location}
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Event Type: </p>
                        <p>
                            {eventDetails?.eventType.toLowerCase()}
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Event Dates: </p>
                        {dateRanges?.map((date: { date: string; endTime: string; startTime: string }, idx: number) => (
                            <p key={idx}>{formatDate(date.date) } , {date.startTime} to {date.endTime}</p>
                        ))}

                    </div>
                    <div>
                        <p className="text-dark-blue font-medium">Number of Guests: </p>
                        <p>{numberOfGuests}</p>

                    </div>                    
                </div>
                {/* Card End */}
            </div>
            {/* Event Details End */}
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

