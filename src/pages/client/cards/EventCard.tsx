
import "../index.css"
import img from "../../dashboard/Events/event-details/images/l1.jpg"
import starImg from "../../../assets/svg/star.svg"

const EventCard = () => {
    return (
        <a href="#">
            <div className='w-[270px] h-auto bg-white shadow-lg'>
                <a href="/events/3">
                    <img className='rounded-t-[13px]' src={img} alt="" />
                </a>
                <div className='px-2'>
                    <a href="/events/3">
                        <h5 className='text-[#9c59df] text-[16px] font-semibold mt-[3px]'>Online Event</h5>
                    </a>

                    <a className='text-[#222325]' href="/events/3">
                        <div className='flex items-center justify-between'>
                            <p className='truncate text-[17px] text-[#172b4d] font-semibold'>Event in Kathmandu 44600, Nepal</p>
                        </div>

                        <p className='mb-0 text-[16px] text-[#8b9199] break-words leading-6 font-normal overflow-hidden custom-clamp'>On the other hand, we denounce with righteous indignation and dislike men
                            who are so beguiled and demoralized by the charms of
                            pleasure of the moment,...</p>


                        <div className='mt-2 my-2 flex items-center justify-between'>
                            <p className='text-black flex items-center justify-center gap-3 truncate text-[1.3rem]'>
                                <img className='align-middle' src={starImg} alt="" />
                                <span className='text-[#172b4d] text-[13px] font-medium tracking-tight'>9.6</span>
                            </p>

                            <p className='text-end text-[#172b4d] text-[15px] font-medium truncate'>
                                NPR 3500
                                <span className='text-[13px] font-[400]'>/person</span>
                            </p>

                        </div>
                    </a>
                </div>
            </div>
        </a>
    );
};

export default EventCard;
