// import React from 'react'
// import {useRef} from "react"

import shareIcon from "../../../../assets/svg/share-icon.svg"
import downArrow from "../../../../assets/svg/arrow_down_2.svg"
import { useRef, useState } from "react"



const TypeAndLocation = () => {
    const [shareBtn, setShareBtn] = useState<boolean>(true);

    const Share = useRef<HTMLUListElement>(null);

    const btn = () => {
        if (shareBtn) {
            Share.current?.classList.remove("hidden");
        } else {
            Share.current?.classList.add("hidden");
        }
    };

    return (
        <>
            <div className="relative w-fit h-fit group hidden md:block">
                <button
                    className="flex items-center mt-2 xs:mt-0 cursor-pointer select-none w-[100px] justify-center h-[40px] text-[#8b9199] border-[1.8px] border-[#9c59df] rounded-full gap-1 p-[15px] text-[14px] font-medium"
                    onClick={() => {
                        setShareBtn(!shareBtn);
                        btn();
                    }}
                >
                    <img src={shareIcon} alt="" />
                    Share
                    <img src={downArrow} alt="" />
                </button>
                <ul
                    ref={Share}
                    className="absolute right-0 mt-2 z-50 hidden flex-col min-w-[180px]
                   rounded-lg border border-[#EADFFF]/60 
                   shadow-lg overflow-hidden
                   bg-white/80 backdrop-blur-md transition-all"
                >
                    <li className="px-4 py-2 text-sm text-zinc-700 transition-all 
                       hover:bg-gradient-to-r hover:from-[#9c59df] hover:to-[#BA92E9] 
                       hover:text-white cursor-pointer">
                        <a href="https://facebook.com" target="_blan">Facebook</a>
                    </li>
                    <li className="px-4 py-2 text-sm text-zinc-700 transition-all 
                       hover:bg-gradient-to-r hover:from-[#9c59df] hover:to-[#BA92E9] 
                       hover:text-white cursor-pointer">
                        <a href="https://facebook.com" target="_blan">Twitter</a>
                    </li>
                    <li className="px-4 py-2 text-sm text-zinc-700 transition-all 
                       hover:bg-gradient-to-r hover:from-[#9c59df] hover:to-[#BA92E9] 
                       hover:text-white cursor-pointer">
                        <a href="https://facebook.com" target="_blan">LinkedIn</a>
                    </li>
                    <li className="px-4 py-2 text-sm text-zinc-700 transition-all 
                       hover:bg-gradient-to-r hover:from-[#9c59df] hover:to-[#BA92E9] 
                       hover:text-white cursor-pointer">
                        <a href="https://facebook.com" target="_blan">Whatsapp</a>
                    </li>
                    <li className="px-4 py-2 text-sm text-zinc-700 transition-all 
                       hover:bg-gradient-to-r hover:from-[#9c59df] hover:to-[#BA92E9] 
                       hover:text-white cursor-pointer">
                        <a href="https://facebook.com" target="_blan">Email</a>
                    </li>

                </ul>
            </div>
        </>
    );
};

export default TypeAndLocation