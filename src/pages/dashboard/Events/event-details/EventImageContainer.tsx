// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import "../../../../swiper-custom.css";

// // Images for hero-container
// import Right1 from "./images/r1.jpg"
// import Right2 from "./images/r2.jpg"
// import Right3 from "./images/r3.jpg"
// import Right4 from "./images/r4.jpg"
// // import Left1 from "./images/l1.jpg"

// // Coursel Images for Mobile hero-container
// import coursel1 from "./images/coursel-images/coursel1.jpg"
// import coursel2 from "./images/coursel-images/coursel2.jpg"
// import coursel3 from "./images/coursel-images/coursel3.jpg"
// import coursel4 from "./images/coursel-images/coursel4.jpg"

// interface Event {
//     files?: { url?: string; location?: string }[];
// }

// const EventImageContainer = ({ event }: { event: Event }) => {

//     // Extract dynamic images from event.files
//     const dynamicImages = (event?.files ?? []).length > 0
//         ? (event.files ?? []).map((file: { url?: string; location?: string }) => file?.url || file?.location || '') // fallback to either key
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
//     const showMoreImages = hasDynamicImages && dynamicImages.length > 4;

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
//                         {/* Desktop Left Swiper Start */}
//                         <Swiper navigation={true} modules={[Navigation]} loop={true} className='w-full h-full'>
//                             {mobileImages.map((img: string, i: number) => (
//                                 <SwiperSlide key={i}>
//                                     <figure className='m-0 p-0 aspect-[16/9] overflow-hidden h-full w-full'>
//                                         <img key={i} className="object-cover w-full h-full" src={img} alt={`Slide ${i + 1}`} />
//                                     </figure>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                         {/* Desktop Left Swiper End */}
//                     </div>
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
//                                 <img key={i} className="object-cover h-full w-full" src={img} alt={`Slide ${i + 1}`} />
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

// export default EventImageContainer



import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../../../swiper-custom.css";

// Images for fallback
import Right1 from "./images/r1.jpg";
import Right2 from "./images/r2.jpg";
import Right3 from "./images/r3.jpg";
import Right4 from "./images/r4.jpg";
import coursel1 from "./images/coursel-images/coursel1.jpg";
import coursel2 from "./images/coursel-images/coursel2.jpg";
import coursel3 from "./images/coursel-images/coursel3.jpg";
import coursel4 from "./images/coursel-images/coursel4.jpg";

interface Event {
    files?: { url?: string; location?: string }[];
}

const EventImageContainer = ({ event }: { event: Event }) => {
    const dynamicImages =
        (event?.files ?? []).length > 0
            ? (event.files ?? []).map(
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

    const rightGridImages = hasDynamicImages
        ? dynamicImages.slice(1, 5)
        : [Right1, Right2, Right3, Right4];

    const totalImages = hasDynamicImages ? dynamicImages.length : 4;
    const showMoreImages = hasDynamicImages && dynamicImages.length > 4;

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

    // Escape key closes modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setModalOpen(false);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    // Prevent scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = modalOpen ? "hidden" : "auto";
    }, [modalOpen]);

    return (
        <div className="child2">
            {/* Desktop Version */}
            <div className="hidden lg:flex items-center justify-between w-full h-[500px] my-2">
                {/* Left: Big Swiper */}
                <div className="w-[50%] h-full pe-2">
                    <Swiper
                        navigation
                        modules={[Navigation]}
                        loop
                        className="w-full h-full rounded-xl overflow-hidden shadow-lg"
                    >
                        {mobileImages.map((img, i) => (
                            <SwiperSlide key={i}>
                                <figure className="m-0 p-0 aspect-[16/9] w-full h-full overflow-hidden">
                                    <img
                                        src={img}
                                        alt={`Slide ${i + 1}`}
                                        className="object-cover w-full h-full transition-opacity duration-500 opacity-0"
                                        onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                                    />
                                </figure>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right: Grid Images */}
                <div className="right flex flex-wrap gap-3 w-[50%] h-full">
                    {rightGridImages.map((img, i) => {
                        const isLast = i === 3 && showMoreImages;
                        const imgIdx = i + 1;

                        return (
                            <div
                                key={i}
                                className="w-[48%] h-[48%] relative cursor-pointer rounded-xl overflow-hidden 
                           shadow-md hover:shadow-lg transition-transform hover:scale-[1.01]"
                                onClick={isLast ? handleMoreImagesClick : () => handleImageClick(imgIdx)}
                            >
                                <img
                                    src={img}
                                    alt={`Thumb ${i + 1}`}
                                    className="object-cover w-full h-full"
                                />
                                {isLast && (
                                    <div className="absolute inset-0 flex items-center justify-center
                                  bg-black/50 text-white text-lg font-semibold">
                                        +{totalImages - 4} More
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Version */}
            <div className="lg:hidden w-full">
                <Swiper
                    navigation
                    modules={[Navigation]}
                    loop
                    className="rounded-lg overflow-hidden shadow-md"
                >
                    {mobileImages.map((img, i) => (
                        <SwiperSlide key={i}>
                            <figure className="m-0 p-0 aspect-[16/9] overflow-hidden">
                                <img
                                    src={img}
                                    alt={`Slide ${i + 1}`}
                                    className="object-cover w-full h-full transition-opacity duration-500 opacity-0"
                                    onLoad={(e) => (e.currentTarget.style.opacity = "1")}
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
                        className="absolute top-6 right-6 text-white text-xl bg-black/40 p-2 rounded-full 
                       hover:bg-black/60 transition-transform duration-200 hover:scale-105"
                        onClick={() => setModalOpen(false)}
                    >
                        &times;
                    </button>

                    {/* Modal Swiper */}
                    <div className="w-full max-w-5xl px-4">
                        <Swiper
                            initialSlide={modalStartIndex}
                            navigation
                            modules={[Navigation]}
                            loop
                            className="rounded-xl overflow-hidden shadow-2xl"
                        >
                            {(hasDynamicImages
                                ? dynamicImages
                                : [coursel1, coursel2, coursel3, coursel4]
                            ).map((img, i) => (
                                <SwiperSlide key={i}>
                                    <figure className="flex items-center justify-center w-full h-[75vh]">
                                        <img
                                            src={img}
                                            alt={`Modal Slide ${i + 1}`}
                                            className="object-contain max-h-full max-w-full transition-opacity duration-500 opacity-0"
                                            onLoad={(e) => (e.currentTarget.style.opacity = "1")}
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

export default EventImageContainer;