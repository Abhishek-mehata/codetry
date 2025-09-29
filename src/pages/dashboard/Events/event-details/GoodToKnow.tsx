import React from 'react'
import { formatDate } from '../../../../utils/dateTimeHelpers';
// import masterCard from "./images/mastercard.jpg"
// import visaImg from "./images/visa.jpg"
type EventDetailsType = {
    cancellationPolicy: string;
    otherInformation: string;
    guestInformation: string;
    hostInformation: string;
    hostSkillLevel: string;
    isDiscountAvailable: boolean;
    discount: number;
    business: string[];
    experiential: string[];
    healthAndWellness: string;
    specialInterest: string;
    isPaid: boolean;
    listingPaidType: string;
    noOfPromotionDays: number;
    language: string;
    location: string;
    // refundable: string;
    platform: string;
    requirements: string[];
    // Add other properties as needed
    OnsiteEvent: {
        dateRanges: {
            date: string;
        }[];
    } | null;
    OnlineEvent: {
        dateRanges: {
            date: string;
        }[];
    } | null;
    highlight: string;
};

const GoodToKnow: React.FC<{ event: EventDetailsType }> = ({ event }) => {
    console.log(event, "falksjdf;laksjd");

    return (
        <div>
            <h3 className='text-[27.34px] font-medium leading-[41px] text-dark-blue tracking-[-1px]'>Good To Know</h3>

            <div className="goodToKnow-content  w-[100%] ">
                {/* row */}
                <div className='border-t-[1.5px] border-[#dee2e6]'>
                    <div className='flex justify-start p-[10px]'>
                        <span className='font-[400] text-[18px] w-[50%] '>Event Dates</span>
                        {/* {event?.OnlineEvent?.dateRanges?.[0]?.date} */}
                        <div>
                            {event?.OnlineEvent?.dateRanges && event?.OnlineEvent?.dateRanges.map(date =>
                                <p className='font-[400] text-[18px] block'>
                                    {formatDate(date.date)}
                                </p>
                            )}
                            {event?.OnsiteEvent?.dateRanges && event?.OnsiteEvent?.dateRanges.map(date =>
                                <p className='font-[400] text-[18px] block'>
                                    {formatDate(date.date)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                {/* row */}
                <div className='border-t-[1.5px] border-[#dee2e6]'>
                    <div className='flex justify-start p-[10px]'>
                        <span className='font-[400] text-[18px] w-[50%] '>Language</span>
                        <span className='font-[400] text-[18px] w-[50%]'>{event?.language || "English"}</span>
                    </div>
                </div>

                {/* row */}
                <div className='border-t-[1.5px] border-[#dee2e6]'>
                    <div className='flex justify-start p-[10px]'>
                        <span className='font-[400] text-[18px] w-[50%]'>cancellation Policy</span>
                        <span className='font-[400] text-[18px] w-[50%]'>{event.cancellationPolicy || "No cancellation policy information available."}</span>
                    </div>
                </div>

                {/* row */}
                <div className='border-t-[1.5px] border-[#dee2e6]'>
                    <div className='flex justify-start p-[10px]'>
                        <span className='font-[400] text-[18px] w-[50%] '>Discount</span>
                        <span className='font-[400] text-[18px] w-[50%]'>{event?.isDiscountAvailable == true ? "Discount Available" : "Not Available"}</span>
                    </div>
                </div>

                {/* row */}
                <div className='border-t-[1.5px] border-[#dee2e6]'>
                    <div className='flex justify-start p-[10px]'>
                        <span className='font-[400] text-[18px] w-[50%] '>Location</span>
                        <span className='font-[400] text-[18px] w-[50%]'>{event?.location || "Kathmandu"}</span>
                    </div>
                </div>
                {/* row */}
                <div className='border-t-[1.5px] border-[#dee2e6]'>
                    <div className='flex justify-start p-[10px]'>
                        <span className='font-[400] text-[18px] w-[50%] '>Payment Method</span>
                        <span className='font-[400] text-[18px] w-[50%] '>
                            <div className='flex gap-1'>
                                <img className='w-10 h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFnGOEHtcSLfoHPNHYQG_-ULsnOj-AVveJOg&s" alt="paypal" />
                            </div>
                        </span>
                    </div>
                </div>


                {/* row */}
                <div className='border-t-[1.5px] border-[#dee2e6]'>
                    <div className='flex justify-start p-[10px]'>
                        <span className='font-[400] text-[18px] w-[50%] '>Essentials Items</span>
                        <ul className='font-[400] text-[18px] w-[50%] flex flex-wrap gap-3'>
                            {event?.requirements.length > 0 ? event?.requirements.map((requirement, index) => <li key={index}>{requirement}</li>) : "No essential items information available."}
                        </ul>
                    </div>
                </div>
                {/* row */}
                {/* <div className='border-t-[1.5px] border-[#dee2e6]'>
                    <div className='flex justify-start p-[10px]'>
                        <span className='font-[400] text-[18px] w-[50%]'>What's Included</span>
                        <span className='font-[400] text-[18px] w-[50%]'>{event?.otherInformation}</span>
                    </div>
                </div>                 */}
                {/* row */}
                {event?.hostInformation &&
                    <div className='border-t-[1.5px] border-[#dee2e6]'>
                        <div className='flex justify-start p-[10px]'>
                            <span className='font-[400] text-[18px] w-[50%] '>Important information from<br /> the host</span>
                            <span className='font-[400] text-[18px] w-[50%] '>
                                {event?.hostInformation}
                            </span>
                        </div>
                    </div>
                }

                {/* row */}
                {event.highlight &&
                    <div className='border-t-[1.5px] border-[#dee2e6]'>
                        <div className='flex justify-start p-[10px]'>
                            <span className='font-[400] text-[18px] w-[50%] '>Highlights</span>
                            <div
                                className="event-highlight font-[400] text-[18px] w-[50%]"
                                dangerouslySetInnerHTML={{ __html: event?.highlight }}
                            />
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default GoodToKnow