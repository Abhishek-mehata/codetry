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
    const roomDetails = useGetRoomDetailsQuery(id!, { skip: context !== 'customer_book_room' });
    const eventOnsiteDetails = useGetEventDetailsQuery(id!, { skip: context !== 'customer_buy_event_onsite' });
    const eventOnlineDetails = useGetEventDetailsQuery(id!, { skip: context !== 'customer_buy_event_online' });
    const boostPlaceDetails = useGetBoostDetailsQuery(id!, { skip: context !== 'seller_boost_place' });
    const boostEventDetails = useGetBoostDetailsQuery(id!, { skip: context !== 'seller_boost_event' });

    console.log(transactionDetails,"asldkfj");

    useEffect(() => {
        if (context === 'customer_book_room' && roomDetails.data) {
            console.log('Room Details:', roomDetails.data);
            setTransactionDetails(roomDetails.data);
        } else if (context === 'customer_buy_event_onsite' && eventOnsiteDetails.data) {
            console.log('Event Onsite Details:', eventOnsiteDetails.data);
            setTransactionDetails(eventOnsiteDetails.data);
        } else if (context === 'customer_buy_event_online' && eventOnlineDetails.data) {
            setTransactionDetails(eventOnlineDetails.data);
            console.log('Event Online Details:', eventOnlineDetails.data);
        } else if (context === 'seller_boost_place' && boostPlaceDetails.data) {
            console.log('Boost Place Details:', boostPlaceDetails.data);
            setTransactionDetails(boostPlaceDetails.data);
        } else if (context === 'seller_boost_event' && boostEventDetails.data) {
            console.log('Boost Event Details:', boostEventDetails.data);
            setTransactionDetails(boostEventDetails.data);
        }
    }, [context, roomDetails.data, eventOnsiteDetails.data, eventOnlineDetails.data, boostPlaceDetails.data, boostEventDetails.data]);

    return (
        <>
            {( context === 'customer_buy_event_onsite' || context === 'customer_buy_event_online') && <EventTransactionDetails data={transactionDetails} />}
            {(  context === 'customer_book_room') && <RoomTransactionDetails data={transactionDetails} />}
            {(  context === 'seller_boost_place') && <BoostPlaceTransactionDetails data={transactionDetails} />}
            {( context === 'seller_boost_event') && <BoostEventTransctionDetails data={transactionDetails}/>}
        </>
    );
}
