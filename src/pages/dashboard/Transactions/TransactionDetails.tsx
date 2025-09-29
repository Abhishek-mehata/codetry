/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useLocation } from 'react-router-dom';
import { useGetRoomDetailsQuery, useGetEventDetailsQuery, useGetBoostDetailsQuery } from '../../../redux/features/transactionsApi';
import { useEffect, useState } from 'react';
import EventTransactionDetails from './EventTransactionDetails';
import RoomTransactionDetails from './RoomTransactionDetails';
import BoostPlaceTransactionDetails from './BoostPlaceTransactionDetails';
import BoostEventTransctionDetails from './BoostEventTransctionDetails';

export default function TransactionDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const context = searchParams.get('context');
    const [transactionDetails, setTransactionDetails] = useState<any>(null);



    const {data:roomDetails, isLoading: isRoomLoading} = useGetRoomDetailsQuery(id!, { skip: context !== 'customer_book_room' });
    const {data: eventOnsiteDetails, isLoading:isOnsiteEventLoading} = useGetEventDetailsQuery(id!, { skip: context !== 'customer_buy_event_onsite' });
    const {data:eventOnlineDetails,isLoading: isOnlinEventLoading} = useGetEventDetailsQuery(id!, { skip: context !== 'customer_buy_event_online' });
    const {data:boostPlaceDetails,isLoading: isBoostPlaceLoading} = useGetBoostDetailsQuery(id!, { skip: context !== 'seller_boost_place' });
    const {data: boostEventDetails, isLoading:isBoostEventLoading} = useGetBoostDetailsQuery(id!, { skip: context !== 'seller_boost_event' });

    console.log(boostEventDetails,"asldkfj");

    useEffect(() => {
        if (context === 'customer_book_room' && roomDetails) {
            setTransactionDetails(roomDetails);
        } else if (context === 'customer_buy_event_onsite' && eventOnsiteDetails) {
            setTransactionDetails(eventOnsiteDetails);
        } else if (context === 'customer_buy_event_online' && eventOnlineDetails) {
            setTransactionDetails(eventOnlineDetails);
        } else if (context === 'seller_boost_place' && boostPlaceDetails) {
            setTransactionDetails(boostPlaceDetails);
        } else if (context === 'seller_boost_event' && boostEventDetails) {
            setTransactionDetails(boostEventDetails);
        }
    }, [context, roomDetails, eventOnsiteDetails, eventOnlineDetails, boostPlaceDetails, boostEventDetails]);

    return (
        <>
            {( context === 'customer_buy_event_onsite' || context === 'customer_buy_event_online') && <EventTransactionDetails
            isLoading={isOnlinEventLoading || isOnsiteEventLoading} data={transactionDetails} />}
            {(  context === 'customer_book_room') && <RoomTransactionDetails isLoading={isRoomLoading} data={transactionDetails} />}
            {(  context === 'seller_boost_place') && <BoostPlaceTransactionDetails isLoading={isBoostPlaceLoading} data={transactionDetails} />}
            {( context === 'seller_boost_event') && <BoostEventTransctionDetails isLoading={isBoostEventLoading} data={transactionDetails}/>}
        </>
    );
}
