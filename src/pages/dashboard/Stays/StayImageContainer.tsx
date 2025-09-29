// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import "../../../../src/swiper-custom.css";

// // Images for hero-container
// import Right1 from "../Events/event-details/images/r1.jpg";
// import Right2 from "../Events/event-details/images/r2.jpg"
// import Right3 from "../Events/event-details/images/r3.jpg"
// import Right4 from "../Events/event-details/images/r4.jpg"
// // import Left1 from "../Events/event-details/images/l1.jpg"

// // Coursel Images for Mobile hero-container
// import coursel1 from "../Events/event-details/images/coursel-images/coursel1.jpg"
// import coursel2 from "../Events/event-details/images/coursel-images/coursel2.jpg"
// import coursel3 from "../Events/event-details/images/coursel-images/coursel3.jpg"
// import coursel4 from "../Events/event-details/images/coursel-images/coursel4.jpg"

// interface Stay {
//     images?: { url?: string; location?: string }[];
// }

// const StayImageContainer = ({ stay }: { stay: Stay }) => {

//     // Extract dynamic images from event.files
//     const dynamicImages = (stay?.images ?? []).length > 0
//         ? (stay.images ?? []).map((file: { url?: string; location?: string }) => file?.url || file?.location || '') // fallback to either key
//         : [];

//     const hasDynamicImages = dynamicImages.length > 0;

//     const mobileImages: string[] = hasDynamicImages ? dynamicImages : [coursel1, coursel2, coursel3, coursel4];
//     // const desktopLeftImage = hasDynamicImages ? dynamicImages[0] : Left1;
//     const [modalOpen, setModalOpen] = useState(false);
//     const [modalStartIndex, setModalStartIndex] = useState(0);

//     // For desktop right grid, show up to 4 images, last is 'More Images' if more
//     const rightGridImages = hasDynamicImages
//         ? dynamicImages.slice(1, 5)
//         : [Right1, Right2, Right3, Right4];
//     const totalImages = hasDynamicImages ? dynamicImages.length : 4;
//     const showMoreImages = hasDynamicImages && dynamicImages.length > 5;

//     // Handler to open modal at specific index
//     const handleImageClick = (idx: number) => {
//         setModalStartIndex(idx);
//         setModalOpen(true);
//     };
//     // Handler for clicking 'More Images' button
//     const handleMoreImagesClick = () => {
//         setModalStartIndex(5 - 1); // 5th image (index 4)
//         setModalOpen(true);
//     };
//     // Handler for modal background click
//     const handleModalBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
//         if (e.target === e.currentTarget) setModalOpen(false);
//     };

//     return (
//         <div className="child2">
//             {/* Desktop Hero Image Section Start*/}
//             <div className="hidden lg:flex desktop-hero items-center justify-between  flex-wrap w-full h-[500px] my-2 bg-transparent">
//                 {/* Left Image */}
//                 <div className="left w-[50%] h-[99%] pe-1">
//                     <div className='w-full h-full'>
//                         <Swiper className='w-full h-full' navigation={true} modules={[Navigation]} loop={true}>
//                             {mobileImages.map((img: string, i: number) => (
//                                 <SwiperSlide key={i}>
//                                     <figure className='m-0 p-0 w-full h-full aspect-[16/9] overflow-hidden'>
//                                         <img key={i} className="object-cover w-full h-full" src={img} alt={`Slide ${i + 1}`} />
//                                     </figure>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                     {/* <img className="object-cover h-full w-full" src={desktopLeftImage} alt="Main" /> */}
//                 </div>

//                 {/* Right Grid Images */}
//                 <div className="right flex gap-1 flex-wrap justify-center items-center w-[50%] h-[99%] bg-transparent">
//                     {rightGridImages.map((img: string, i: number) => {
//                         // If this is the last grid cell and there are more images, show 'More Images' overlay
//                         const isLast = i === 3 && showMoreImages;
//                         const imgIdx = i + 1; // because left/main is index 0
//                         if (isLast) {
//                             return (
//                                 <div key={i} className="w-[49%] max-w-[90%] h-[49%] bg-white rounded-[4px] relative cursor-pointer" onClick={handleMoreImagesClick}>
//                                     <img className="object-cover h-full w-full opacity-60" src={img} alt={`Side ${i + 1}`} />
//                                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold">
//                                         <span>+{totalImages - 4} More</span>
//                                     </div>
//                                 </div>
//                             );
//                         }
//                         return (
//                             <div key={i} className="w-[49%] max-w-[90%] h-[49%] bg-white rounded-[4px] cursor-pointer" onClick={() => handleImageClick(imgIdx)}>
//                                 <img className="object-cover h-full w-full" src={img} alt={`Side ${i + 1}`} />
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//             {/* Desktop Hero Image Section End*/}

//             {/* Swiper Carosel Start */}
//             <div className='lg:hidden w-full'>
//                 <Swiper navigation={true} modules={[Navigation]} loop={true}>
//                     {mobileImages.map((img: string, i: number) => (
//                         <SwiperSlide key={i}>
//                             <figure className='m-0 p-0 aspect-[16/9] overflow-hidden'>
//                                 <img key={i} className="object-cover w-full" src={img} alt={`Slide ${i + 1}`} />
//                             </figure>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>
//             {/* Swiper Carosel End */}

//             {/* Modal for fullscreen carousel */}
//             {modalOpen && (
//                 <div
//                     className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
//                     onClick={handleModalBgClick}
//                 >
//                     <div className="absolute top-4 right-4 z-60">
//                         <button
//                             className="text-white text-3xl bg-black bg-opacity-60 rounded-full px-3 py-1 hover:bg-opacity-80"
//                             onClick={() => setModalOpen(false)}
//                         >
//                             &times;
//                         </button>
//                     </div>
//                     <div className="w-full max-w-4xl mx-auto">
//                         <Swiper
//                             initialSlide={modalStartIndex}
//                             navigation={true}
//                             modules={[Navigation]}
//                             loop={true}
//                         >
//                             {(hasDynamicImages ? dynamicImages : [coursel1, coursel2, coursel3, coursel4]).map((img: string, i: number) => (
//                                 <SwiperSlide key={i}>
//                                     <figure className='m-0 p-0 w-full h-[70vh] flex items-center justify-center'>
//                                         <img className="object-contain max-h-full max-w-full mx-auto" src={img} alt={`Modal Slide ${i + 1}`} />
//                                     </figure>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StayImageContainer

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../../../src/swiper-custom.css";

// Default Fallback Images
import Right1 from "../Events/event-details/images/r1.jpg";
import Right2 from "../Events/event-details/images/r2.jpg";
import Right3 from "../Events/event-details/images/r3.jpg";
import Right4 from "../Events/event-details/images/r4.jpg";
import coursel1 from "../Events/event-details/images/coursel-images/coursel1.jpg";
import coursel2 from "../Events/event-details/images/coursel-images/coursel2.jpg";
import coursel3 from "../Events/event-details/images/coursel-images/coursel3.jpg";
import coursel4 from "../Events/event-details/images/coursel-images/coursel4.jpg";

interface Stay {
    images?: { url?: string; location?: string }[];
}

const StayImageContainer = ({ stay }: { stay: Stay }) => {
    // Extract dynamic images from stay.images
    const dynamicImages =
        (stay?.images ?? []).length > 0
            ? (stay.images ?? []).map(
                (file: { url?: string; location?: string }) =>
                    file?.url || file?.location || ""
            )
            : [];

    const hasDynamicImages = dynamicImages.length > 0;
    const mobileImages: string[] = hasDynamicImages
        ? dynamicImages
        : [coursel1, coursel2, coursel3, coursel4];

    const [modalOpen, setModalOpen] = useState(false);
    const [modalStartIndex, setModalStartIndex] = useState(0);

    // Right side thumbnails (max 4)
    const rightGridImages = hasDynamicImages
        ? dynamicImages.slice(1, 5)
        : [Right1, Right2, Right3, Right4];

    const totalImages = hasDynamicImages ? dynamicImages.length : 4;
    const showMoreImages = hasDynamicImages && dynamicImages.length > 5;

    // Event Handlers
    const handleImageClick = (idx: number) => {
        setModalStartIndex(idx);
        setModalOpen(true);
    };
    const handleMoreImagesClick = () => {
        setModalStartIndex(4);
        setModalOpen(true);
    };
    const handleModalBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) setModalOpen(false);
    };

    return (
        <div>
            {/* Desktop Layout */}
            <div className="hidden lg:flex gap-2 w-full h-[500px] my-6">
                {/* Left Large Swiper */}
                <div className="w-1/2 h-full rounded-xl overflow-hidden shadow-md">
                    <Swiper navigation modules={[Navigation]} loop className="h-full w-full">
                        {mobileImages.map((img, i) => (
                            <SwiperSlide key={i}>
                                <figure className="h-full w-full">
                                    <img
                                        src={img}
                                        alt={`Slide ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </figure>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right Thumbnail Grid */}
                <div className="w-1/2 h-full grid grid-cols-2 gap-2">
                    {rightGridImages.map((img, i) => {
                        const isLast = i === 3 && showMoreImages;
                        const imgIdx = i + 1;

                        if (isLast) {
                            return (
                                <div
                                    key={i}
                                    onClick={handleMoreImagesClick}
                                    className="relative rounded-xl overflow-hidden cursor-pointer group shadow-sm"
                                >
                                    <img
                                        src={img}
                                        className="h-full w-full object-cover opacity-70 group-hover:scale-105 transition"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-lg font-semibold">
                                        +{totalImages - 4} more
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={i}
                                onClick={() => handleImageClick(imgIdx)}
                                className="rounded-xl overflow-hidden cursor-pointer group shadow-sm"
                            >
                                <img
                                    src={img}
                                    alt={`Side ${i + 1}`}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Carousel */}
            <div className="lg:hidden w-full my-4 rounded-xl overflow-hidden shadow-md">
                <Swiper navigation modules={[Navigation]} loop>
                    {mobileImages.map((img, i) => (
                        <SwiperSlide key={i}>
                            <figure className="aspect-[16/9] w-full overflow-hidden">
                                <img
                                    src={img}
                                    alt={`Slide ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={handleModalBgClick}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setModalOpen(false)}
                        className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition"
                    >
                        ×
                    </button>

                    {/* Modal Swiper */}
                    <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                        <Swiper
                            initialSlide={modalStartIndex}
                            navigation
                            modules={[Navigation]}
                            loop
                            className="bg-black"
                        >
                            {(hasDynamicImages
                                ? dynamicImages
                                : [coursel1, coursel2, coursel3, coursel4]
                            ).map((img, i) => (
                                <SwiperSlide key={i}>
                                    <figure className="flex items-center justify-center w-full h-[75vh] bg-black">
                                        <img
                                            src={img}
                                            alt={`Modal Slide ${i + 1}`}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </figure>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StayImageContainer;