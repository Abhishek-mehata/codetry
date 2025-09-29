import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "../../../../src/swiper-custom.css";

// Images for hero-container
import Right1 from "../Events/event-details/images/r1.jpg";
import Right2 from "../Events/event-details/images/r2.jpg"
import Right3 from "../Events/event-details/images/r3.jpg"
import Right4 from "../Events/event-details/images/r4.jpg"
import Left1 from "../Events/event-details/images/l1.jpg"

// Coursel Images for Mobile hero-container
import coursel1 from "../Events/event-details/images/coursel-images/coursel1.jpg"
import coursel2 from "../Events/event-details/images/coursel-images/coursel2.jpg"
import coursel3 from "../Events/event-details/images/coursel-images/coursel3.jpg"
import coursel4 from "../Events/event-details/images/coursel-images/coursel4.jpg"

interface Stay {
    images?: { url?: string; location?: string }[];
}

const StayImageContainer = ({ stay }: { stay: Stay }) => {

    // Extract dynamic images from event.files
    const dynamicImages = (stay?.images ?? []).length > 0
        ? (stay.images ?? []).map((file: { url?: string; location?: string }) => file?.url || file?.location || '') // fallback to either key
        : [];

    const hasDynamicImages = dynamicImages.length > 0;

    const mobileImages: string[] = hasDynamicImages ? dynamicImages : [coursel1, coursel2, coursel3, coursel4];
    const desktopLeftImage = hasDynamicImages ? dynamicImages[0] : Left1;
    const desktopRightImages = hasDynamicImages
        ? dynamicImages.slice(1, 5)
        : [Right1, Right2, Right3, Right4];

    return (
        <div className="child2">
            {/* Desktop Hero Image Section Start*/}
            <div className="hidden lg:flex desktop-hero items-center justify-between  flex-wrap w-full h-[500px] my-2 bg-transparent">
                {/* Left Image */}
                <div className="left w-[50%] h-[99%] pe-1">
                    <img className="object-cover h-full w-full" src={desktopLeftImage} alt="Main" />
                </div>

                {/* Right Grid Images */}
                <div className="right flex gap-1 flex-wrap justify-center items-center w-[50%] h-[99%] bg-transparent">
                    {desktopRightImages.map((img: string, i: number) => (
                        <div key={i} className="w-[49%] max-w-[90%] h-[49%] bg-white rounded-[4px]">
                            <img className="object-cover h-full w-full" src={img} alt={`Side ${i + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Desktop Hero Image Section End*/}
            
            {/* Swiper Carosel Start */}
            <div className='lg:hidden w-full'>
                <Swiper navigation={true} modules={[Navigation]} loop={true}>
                    {mobileImages.map((img: string, i: number) => (
                        <SwiperSlide key={i}>
                            <figure className='m-0 p-0 aspect-[16/9] overflow-hidden'>
                                <img key={i} className="object-cover w-full h-full" src={img} alt={`Slide ${i + 1}`} />
                            </figure>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Swiper Carosel End */}
        </div>
    );
};

export default StayImageContainer